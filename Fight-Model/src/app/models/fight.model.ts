import {AttackHistoryItem} from "../interfaces/AttackHistoryItem";
import {UserStatsModel} from "./userStats.model";

export class FightModel {
  activeFighterID: number = 0;
  winnerID: number = 0;
  attackHistory: AttackHistoryItem[] = [];
  fighters: UserStatsModel[] = [
    {
      id: 0,
      picture: 'assets/Wizard.jpg',
      name: 'Player',
      maxHealth: 500,
      stats: {
        strength: 10,
        agility: 5,
        luck: 5
      }
    },
    {
      id: 1,
      picture: 'assets/Dwarf.jpg',
      name: 'Opponent',
      maxHealth: 500,
      stats: {
        strength: 10,
        agility: 5,
        luck: 5
      }
    }
  ];
}
