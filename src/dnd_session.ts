import { reactive } from "vue";
import { Character } from "./character";

export class DndSession {
  readonly characters: Character[] = reactive([]);
  mapSize: [number, number] = [0, 0];

  removeCharacter(id: string) {
    let character = session.characters.find((v) => v.id == id);
    if (!character) return;
    this.characters.splice(this.characters.indexOf(character), 1);
  }

  public addCharacterToMap(id: string) {
    let character = session.characters.find((v) => v.id == id);
    if (!character) return;
    if (!character.wasOnMapBefore) character.mapPosition = this.getRelativeMapPosition(character.mapPosition[0], character.mapPosition[1]);
    character.wasOnMapBefore = character.isOnMap = true;
  }

  public removeFromMap(id: string) {
    let character = this.characters.find((v) => v.id == id);
    if (!character) return;
    character.isOnMap = false;
  }

  public addCharacterToCombat(id: string, initiative: number) {
    let character = session.characters.find((v) => v.id == id);
    if (!character) return;
    character.initiative = initiative;
    character.isInCombat = true;
  }

  public removeFromCombat(id: string) {
    let character = this.characters.find((v) => v.id == id);
    if (!character) return;
    character.isInCombat = false;
  }

  public removeAllCharactersFromMap(reset: boolean) {
    this.characters.forEach((character) => {
      if (reset) {
        character.wasOnMapBefore = false;
        character.resetMapPosition();
      }
      character.isOnMap = false;
    });
  }

  private getRelativeMapPosition(percX: number, percY: number): [number, number] {
    return [(this.mapSize[0] * percX) / 100, (this.mapSize[1] * percY) / 100];
  }
}

/**
 * Our global DND session!
 */
export let session = new DndSession();

// Hardcoded default session stuff
let characterA = new Character();
characterA.name = "Hellraiser";
characterA.isOnMap = false;
characterA.maxHealth = 666;
characterA.currentHealth = 255;
characterA.initiative = 10;
session.characters.push(characterA);

let characterB = new Character();
characterB.name = "Deathbringer";
characterB.isOnMap = false;
characterB.maxHealth = 69;
characterB.currentHealth = 69;
characterB.initiative = 5;
session.characters.push(characterB);

let characterC = new Character();
characterC.name = "Edgelord";
characterC.isOnMap = false;
characterC.charType = 2;
characterC.maxHealth = 9001;
characterC.currentHealth = 42;
characterC.initiative = 15;
session.characters.push(characterC);

let characterD = new Character();
characterD.name = "Orrin the Bloodmonger";
characterD.isOnMap = false;
characterD.charType = 3;
characterD.maxHealth = 501;
characterD.currentHealth = 66;
characterD.initiative = 20;
session.characters.push(characterD);
