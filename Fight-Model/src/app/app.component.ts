import {Component, ElementRef, ViewChild} from '@angular/core';
import {AttackHistoryItem} from "./interfaces/AttackHistoryItem";
import {EnemyStatsModel} from "./models/enemyStats.model";
import {UserStatsModel} from "./models/userStats.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('historyList') list!: ElementRef
  mutationObserver!: MutationObserver;

  ngAfterViewInit() {
    this.mutationObserver = new MutationObserver(mutations => {
      this.scrollToBottom();
    });

    this.mutationObserver.observe(this.list.nativeElement, {
      childList: true,
    });
  }

  scrollToBottom(): void {
    const element = this.list.nativeElement;
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    });
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect(); // Stop observing when the component is destroyed
  }

  userStats: UserStatsModel = new UserStatsModel();
  enemyStats: EnemyStatsModel = new EnemyStatsModel();
  fightHistory: AttackHistoryItem[] = [];

  attackValue: number = 0;
  userHealth: number = 0;
  opponentHealth: number = 0;

  showAttack: boolean = false;
  fightIsActive: boolean = true;
  userWin: boolean = false;

 ngOnInit() {
    this.userHealth = this.userStats.maxHealth;
    this.opponentHealth = this.enemyStats.maxHealth;
 }

  attackOpponent($event: any) {
    this.showAttack = true;
    if (this.fightIsActive) {
      this.attackValue = $event;
      if (this.attackValue > 50) {
        this.attackValue -= 100;
        this.attackValue = Math.abs(this.attackValue);
      }
      if (this.opponentHealth - this.attackValue <= 0) {
        this.userWin = true;
        this.fightIsActive = false;
        this.opponentHealth = 0;
        this.fightHistory.push({
          attackerID: 0,
          attackValue: this.attackValue,
          leaveHealth: this.opponentHealth
        });
        return;
      }
      setTimeout(() => {
        this.opponentHealth -= this.attackValue;
        this.fightHistory.push({
          attackerID: 0,
          attackValue: this.attackValue,
          leaveHealth: this.opponentHealth
        });
      }, 500);
      setTimeout(() => {
        this.showAttack = false;
        this.setOpponentAttack();
      }, 2000);
    }
  }


  playAgain() {
    this.fightIsActive = true;
    this.opponentHealth = 200;
    this.userHealth = 200;
    this.fightHistory = [];
  }

  setOpponentAttack() {
    if (!this.fightIsActive) {
      return;
    }
    let attackValue = Math.floor(Math.random() * 49) + 1;
    if (this.userHealth - attackValue <= 0) {
      this.userWin = false;
      this.fightIsActive = false;
      this.userHealth = 0;
      return;
    }
    setTimeout(() => {
      this.userHealth -= attackValue;
      this.fightHistory.push({
        attackerID: 1,
        attackValue: attackValue,
        leaveHealth: this.userHealth
      });
    }, 500);
    setTimeout(() => {
      this.showAttack = false;
    }, 2000);
  }
}
