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

  ngOnInit() {
    console.log(this.health)
  }
}
