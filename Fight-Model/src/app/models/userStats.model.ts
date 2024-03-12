import {CharacterStatsModel} from "./characterStats.model";

export class UserStatsModel {
  id: number = 1;
  picture: string = 'assets/images/wizard.jpg';
  name: string = 'Player';
  maxHealth: number = 1000;
  stats: CharacterStatsModel = new CharacterStatsModel();
}
