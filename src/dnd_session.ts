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
characterA.isOnMap = true;
characterA.mapPosition = [0, 0];
characterA.maxHealth = 666;
characterA.currentHealth = 255;
session.characters.push(characterA);

let characterB = new Character();
characterB.name = "Deathbringer";
characterB.isOnMap = false;
characterB.mapPosition = [100, 100];
characterB.maxHealth = 69;
characterB.currentHealth = 69;

session.characters.push(characterB);
