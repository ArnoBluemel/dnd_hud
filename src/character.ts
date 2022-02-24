import { v4 as uuid } from "uuid";

export class Character {
  constructor() {}

  id: string = uuid();
  name: string = "";
  charType: number = 0; // 0: Player, 1: Monster, 2: NPC
  isOnMap: boolean = false;
  mapPosition: [number, number] = [0, 0];
  mapColor: string = "#000000";
  initiative: number = 0;
  currentHealth: number = 0;
  editingHealth: boolean = false;
  maxHealth: number = 0;
  stats = {
    monster: "",
    alignment: "",
    type: "",
    ac: 0,
    hp: 0,
    speed: 0,
    abilityScores: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
    challenge: 0,
    other: [
      {
        key: "",
        val: "",
      },
    ],
    feats: [
      {
        feat: "",
        desc: "",
      },
    ],
    actions: [
      {
        action: "",
        desc: "",
      },
    ],
  };

  public editHealth(val: boolean) {
    this.editingHealth = val;
  }
}
