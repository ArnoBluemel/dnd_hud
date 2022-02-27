import { v4 as uuid } from "uuid";

export class Character {
  constructor() {}

  id: string = uuid().replaceAll("-", "");
  name: string = "";
  charType: number = 0; // 0: Player, 1: Monster, 2: NPC
  isOnMap: boolean = false;
  wasOnMapBefore: boolean = false;
  mapPosition: [number, number] = [50, 50];
  mapColor: string = "#000000";
  initiative: number = 0;
  currentHealth: number = 0;
  editingHealth: boolean = false;
  maxHealth: number = 0;

  public editHealth(val: boolean) {
    this.editingHealth = val;
  }

  public resetMapPosition() {
    this.mapPosition = [50, 50];
  }
}
