import { v4 as uuid } from "uuid";

export class Character {
  constructor() {}

  id: string = uuid().replaceAll("-", "");
  name: string = "";
  charType: number = 1; // 1: Player, 2: Monster, 3: NPC
  isOnMap: boolean = false;
  wasOnMapBefore: boolean = false;
  mapPosition: [number, number] = [50, 50];
  mapColor: string = "#000000";
  currentHealth: number = 0;
  editingHealth: boolean = false;
  maxHealth: number = 0;
  isInCombat: boolean = false;
  initiative: number = 0;

  public editHealth(val: boolean) {
    this.editingHealth = val;
  }

  public resetMapPosition() {
    this.mapPosition = [50, 50];
  }
}
