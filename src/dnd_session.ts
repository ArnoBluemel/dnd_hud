import { reactive } from "vue";
import { Character } from "./character";

export class DndSession {
  characters: Character[] = reactive([]);
  mapSize: [number, number] = [0, 0];

  public addCharacterToMap(id: string) {
    //selectedCharacter.value;
    let character = session.characters.find((v) => v.id == id);
    if (!character) return;
    character.mapPosition = this.getRelativeMapPosition(character.mapPosition[0], character.mapPosition[1]);
    character.isOnMap = true;
    //characterIsSelected.value = false;
  }

  public removeFromMap(id: string) {
    let character = session.characters.find((v) => v.id == id);
    if (!character) return;
    character.isOnMap = false;
  }

  public removeAllCharactersFromMap() {
    this.characters.forEach((character) => {
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
session.characters.push(characterA);

let characterB = new Character();
characterB.name = "Deathbringer";
characterB.isOnMap = false;
characterB.maxHealth = 69;
characterB.currentHealth = 69;
session.characters.push(characterB);

let characterC = new Character();
characterC.name = "Edgelord";
characterC.isOnMap = false;
characterC.charType = 1;
characterC.maxHealth = 9001;
characterC.currentHealth = 42;
session.characters.push(characterC);

let characterD = new Character();
characterD.name = "Orrin the Bloodmonger";
characterD.isOnMap = false;
characterD.charType = 2;
characterD.maxHealth = 501;
characterD.currentHealth = 66;
session.characters.push(characterD);
