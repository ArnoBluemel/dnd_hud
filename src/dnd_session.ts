import { reactive } from "vue";
import { Character } from "./character";

export class DndSession {
  characters: Character[] = reactive([]);
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
