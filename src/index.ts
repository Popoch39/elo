import { EloCalculator } from "./matchmaking";
import { Player } from "./player";

export * from "./SayHello";

// types
export * from "./types/types";

console.log("match 1");
const player = new Player(150);
const playerB = new Player(100);
const match = new EloCalculator(player, playerB);
