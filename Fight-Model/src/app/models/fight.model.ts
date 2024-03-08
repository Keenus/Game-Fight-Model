import {AttackHistoryItem} from "../interfaces/AttackHistoryItem";
import {UserStatsModel} from "./userStats.model";

export class FightModel {
  activeFighterID: number = 0;
  winnerID: number = 0;
  attackHistory: AttackHistoryItem[] = [];
  fighters: UserStatsModel[] = [
    {
      id: 0,
      name: 'Player',
      maxHealth: 200
    },
    {
      id: 1,
      name: 'Opponent',
      maxHealth: 200
    }
  ];
}
