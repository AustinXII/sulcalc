export const Gens = {
  RBY: 1,
  GSC: 2,
  ADV: 3,
  HGSS: 4,
  B2W2: 5,
  ORAS: 6,
  SM: 7
};

export const maxGen = Math.max(...Object.values(Gens));

export const Stats = {
  HP: 0,
  ATK: 1,
  DEF: 2,
  SATK: 3,
  SDEF: 4,
  SPD: 5,
  ACC: 6,
  EVA: 7,
  SPC: 3
};

export const Genders = {
  NO_GENDER: 0,
  MALE: 1,
  FEMALE: 2
};

export const DamageClasses = {
  OTHER: 0,
  PHYSICAL: 1,
  SPECIAL: 2
};

export const Statuses = {
  NO_STATUS: 0,
  POISONED: 1,
  BADLY_POISONED: 2,
  BURNED: 3,
  PARALYZED: 4,
  ASLEEP: 5,
  FROZEN: 6
};

export const Types = {
  NORMAL: 0,
  FIGHTING: 1,
  FLYING: 2,
  POISON: 3,
  GROUND: 4,
  ROCK: 5,
  BUG: 6,
  GHOST: 7,
  STEEL: 8,
  FIRE: 9,
  WATER: 10,
  GRASS: 11,
  ELECTRIC: 12,
  PSYCHIC: 13,
  ICE: 14,
  DRAGON: 15,
  DARK: 16,
  FAIRY: 17,
  CURSE: 18
};

export const Weathers = {
  CLEAR: 0,
  SUN: 4,
  RAIN: 2,
  SAND: 3,
  HAIL: 1,
  HARSH_SUN: 6,
  HEAVY_RAIN: 5,
  STRONG_WINDS: 7
};

export const Natures = {
  HARDY: 0,
  LONELY: 1,
  BRAVE: 2,
  ADAMANT: 3,
  NAUGHTY: 4,
  BOLD: 5,
  DOCILE: 6,
  RELAXED: 7,
  IMPISH: 8,
  LAX: 9,
  TIMID: 10,
  HASTY: 11,
  SERIOUS: 12,
  JOLLY: 13,
  NAIVE: 14,
  MODEST: 15,
  MILD: 16,
  QUIET: 17,
  BASHFUL: 18,
  RASH: 19,
  CALM: 20,
  GENTLE: 21,
  SASSY: 22,
  CAREFUL: 23,
  QUIRKY: 24
};

export function cmpStrs(num1, num2) {
  if (num1.length !== num2.length) {
    // simple case
    return num1.length - num2.length;
  }
  for (let i = 0; i < num1.length; i++) {
    // check digits LtR
    if (num1.charCodeAt(i) !== num2.charCodeAt(i)) {
      return num1.charCodeAt(i) - num2.charCodeAt(i);
    }
  }
  return 0;
}

export function addStrs(num1, num2) {
  let carry = 0;
  let sum = "";
  if (num1.length < num2.length) {
    num1 = "0".repeat(num2.length - num1.length) + num1;
  }
  if (num2.length < num1.length) {
    num2 = "0".repeat(num1.length - num2.length) + num2;
  }
  for (let i = num1.length - 1; i >= 0; i--) {
    // proceed RtL
    // (char1 - 48) + (char2 - 48) + carry
    const s = num1.charCodeAt(i) + num2.charCodeAt(i) + carry - 96;
    carry = s > 9 ? 1 : 0;
    sum = s % 10 + sum; // not += as we find the digits RtL
  }
  return carry ? carry + sum : sum;
}

export function subtractStrs(num1, num2) {
  let borrow = 0;
  let diff = "";
  if (num2.length < num1.length) {
    num2 = "0".repeat(num1.length - num2.length) + num2;
  }
  for (let i = num1.length - 1; i >= 0; i--) {
    // (char1 - 48) - (char2 - 48) - borrow
    const d = num1.charCodeAt(i) - num2.charCodeAt(i) - borrow;
    borrow = d < 0 ? 1 : 0;
    diff = (d < 0 ? d + 10 : d) + diff;
  }
  let i = 0;
  while (diff.charAt(i) === "0") i++;
  return diff.slice(i) || "0";
}

export function multiplyStrs(num1, num2) {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }
  // standard looking RtL division
  let zeros = "";
  let carry = 0;
  let digits = "";
  let product = "0";
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const p = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48) + carry;
      carry = Math.trunc(p / 10);
      digits = p % 10 + digits; // append digit to the left
    }
    product = addStrs((carry || "") + digits + zeros, product);
    zeros += "0";
    digits = "";
    carry = 0;
  }
  return product;
}

export function divideStrs(num1, num2) {
  // long division based algorithm
  if (num2 === "0") {
    return [num1 === "0" ? "NaN" : "Infinity", "NaN"];
  }
  if (cmpStrs(num1, num2) < 0) {
    return ["0", num1];
  }
  // we start our r a digit short as the iteration lends
  // itself more naturally to append the digit at its head
  let quotient = "";
  let r = num1.slice(0, num2.length - 1);
  for (let i = num2.length - 1; i < num1.length; i++) {
    // bring down the next digit
    if (r === "0") {
      r = num1.charAt(i);
    } else {
      r += num1.charAt(i);
    }
    let q = 0;
    while (cmpStrs(r, num2) >= 0) {
      r = subtractStrs(r, num2);
      q++; // count how many times b is subtracted ("goes into")
    }
    // append digit right, skip trailing-left zeros
    if (q || quotient) {
      quotient += q;
    }
  }
  // we safeguarded left zeros already
  return [quotient, r]; // [quotient, remainder]
}

export function gcdStrs(num1, num2) {
  let a = num1;
  let b = num2;
  while (b !== "0") {
    [a, b] = [b, divideStrs(a, b)[1]];
  }
  return a;
}

export const roundHalfToZero = n =>
  Math.trunc(n) + Math.sign(n) * (Math.abs(n - Math.trunc(n)) > 0.5);

export const chainMod = (modifier1, modifier2) =>
  (modifier1 * modifier2 + 0x800) >> 12;

export const applyMod = (modifier, value) =>
  Array.isArray(value)
    ? value.map(v => roundHalfToZero(v * modifier / 0x1000))
    : roundHalfToZero(value * modifier / 0x1000);

export function damageVariation(baseDamage, min, max) {
  const damages = [];
  for (let i = min; i <= max; i++) {
    damages.push(Math.trunc(baseDamage * i / max));
  }
  return damages;
}

export const needsScaling = (...stats) => stats.some(stat => stat > 255);

export const scaleStat = (stat, bits = 2) => (stat >> bits) & 0xff;
