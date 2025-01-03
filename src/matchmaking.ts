import { Player } from "./player";
import { expectedGainType, expectedGainTypeReturn } from "./types/types";

// Implementing 1v1 MatchMaking
export class EloCalculator {
  //scaling factor that determines how much influence each particular match can have on the overall Elo rating of the player
  private K: number = 32;
  private readonly arbitraryPoweredNumber: number = 2;
  // rating of both player in the MatchMaking
  private ra: number;
  private rb: number;
  constructor(playerA: Player, playerB: Player, K?: number) {
    this.ra = playerA.rating;
    this.rb = playerB.rating;
    if (K) {
      this.K = K;
    }
    const expeted = this.calculatePoints();
    this.test(expeted);
  }

  private probalilityToWin(
    ratingA: number,
    ratingB: number,
    player: string
  ): number {
    console.log(`probity to win of ${player}:`, ratingA / (ratingA + ratingB));
    const ratingAPowered = Math.pow(this.arbitraryPoweredNumber, ratingA / 100);
    const ratingBPowered = Math.pow(this.arbitraryPoweredNumber, ratingB / 100);
    return ratingAPowered / (ratingAPowered + ratingBPowered);
  }

  private calculatePoints(): expectedGainTypeReturn {
    console.log("elo de joueur 1", this.ra);
    console.log("elo de joueur 2", this.rb);
    const probalityA = this.probalilityToWin(this.ra, this.rb, "playerA");
    const probalityB = this.probalilityToWin(this.rb, this.ra, "playerB");

    const expectedGainA: expectedGainType = {
      wins: this.K * (1 - probalityA),
      loses: this.K * (0 - probalityA),
    };

    const expectedGainB: expectedGainType = {
      wins: this.K * (1 - probalityB),
      loses: this.K * (0 - probalityB),
    };

    console.log("gain / lose du joueur b", expectedGainB);

    this.ra =
      this.ra + expectedGainA.wins > 0 ? (this.ra += expectedGainA.wins) : 0;
    this.rb =
      this.rb + expectedGainB.loses > 0 ? (this.rb += expectedGainB.loses) : 0;
    return {
      playerA: expectedGainA,
      playerB: expectedGainB,
    };
  }

  // test multiple matches between 2 player
  public test(expected: expectedGainTypeReturn) {
    for (let i = -1; i < 20; i++) {
      this.calculatePoints();
    }
  }
}
