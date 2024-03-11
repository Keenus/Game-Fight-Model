import {Component, Input} from '@angular/core';
import {UserStatsModel} from "../../models/userStats.model";

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent {

  @Input() fighter: UserStatsModel = new UserStatsModel();
  @Input() health: number = 0;

  healthPercentage: number = 0;

  calculateHealthPercentage() {
    this.healthPercentage = (this.health / this.fighter.maxHealth) * 100;
  }

  ngOnChanges() {
    this.calculateHealthPercentage();
  }

}
