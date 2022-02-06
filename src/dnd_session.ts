import { reactive } from "vue";
import { character } from "./character";

export class DndSession {
  characters: character[] = reactive([]);
}

/**
 * Our global DND session!
 */
export let session = new DndSession();

// Hardcoded default session stuff
let characterA = new character();
characterA.name = "Hellraiser";
characterA.isOnMap = true;
characterA.mapPosition = [0, 0];
characterA.maxHealth = 666;
characterA.currentHealth = 255;
session.characters.push(characterA);

let characterB = new character();
characterB.name = "Deathbringer";
characterB.isOnMap = false;
characterB.mapPosition = [50, 50];
characterB.maxHealth = 69;
characterB.currentHealth = 69;

session.characters.push(characterB);
