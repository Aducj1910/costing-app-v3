let flowers = new Image();
flowers.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/flowers.png";
let polka = new Image();
polka.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/polka.png";

let stripes = new Image();
stripes.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/stripes.png";

const patternArray = [
  { comp: flowers, cost: 300, name: "Flowers" },
  { comp: polka, cost: 190, name: "Polka" },
  { comp: stripes, cost: 225, name: "Stripes" },
];

let pocketNone = new Image();
pocketNone.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/pocket_none.png";
let pocketFlap = new Image();
pocketFlap.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/pocket_flap.png";
let pocketMock = new Image();
pocketMock.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/pocket_mock.png";
let pocketRound = new Image();
pocketRound.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/pocket_round.png";

const pocketArray = [
  { comp: pocketNone, cost: 0, name: "None" },
  { comp: pocketFlap, cost: 65, name: "Flap" },
  { comp: pocketMock, cost: 90, name: "Mock" },
  { comp: pocketRound, cost: 100, name: "Round" },
];

let collarRegular = new Image();
collarRegular.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/collar_regular.png";
let collarButtonDown = new Image();
collarButtonDown.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/collar_buttondown.png";
let collarStanding = new Image();
collarStanding.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/collar_standing.png";

let collarArray = [
  { comp: collarRegular, cost: 80, name: "Regular" },
  { comp: collarButtonDown, cost: 120, name: "Button-down" },
  { comp: collarStanding, cost: 180, name: "Standing" },
];

let halfSleeve = new Image();
let halfSleeveMask = new Image();
halfSleeve.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/torso_half_sleeve.png";
halfSleeveMask.src =
  "https://raw.githubusercontent.com/Aducj1910/costnew/master/source/mask_half_sleeve.png";

const shirtArray = [{ comp: halfSleeve, cost: 500, name: "Half-sleeve" }];

const shirtMaskArray = [halfSleeveMask];

export function getPatterns() {
  return patternArray;
}

export function getShirts() {
  return shirtArray;
}

export function getShirtMasks() {
  return shirtMaskArray;
}

export function getPockets() {
  return pocketArray;
}

export function getCollars() {
  return collarArray;
}
