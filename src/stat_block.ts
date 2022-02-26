import { v4 as uuid } from "uuid";

export class Character {
  constructor() {}

  id: string = uuid();
  monster: string = "";
  alignment: string = "";
  type: string = "";
  ac: number = 0;
  hp: number = 0;
  speed: number = 0;
  abilityScores: { [key: string]: number } = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  challenge: number = 0;
  other: { [key: string]: string } = { "": "" };
  feats: { [key: string]: string } = { "": "" };
  actions: { [key: string]: string } = { "": "" };
}
