import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserStatsModel} from "./models/userStats.model";
import {FightModel} from "./models/fight.model";

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

  fightHistory: FightModel = new FightModel();

  user: UserStatsModel = this.fightHistory.fighters[0];
  opponent: UserStatsModel = this.fightHistory.fighters[1];

  userHealth: number = this.user.maxHealth;
  opponentHealth: number = this.opponent.maxHealth;
  singleAttackValue: number = 0;

  showAttack: boolean = false;
  fightIsActive: boolean = true;
  userWin: boolean = false;
  userAttackLocked: boolean = false;

  ngOnInit() {
    this.randomizeFirstAttacker();
  }

  randomizeFirstAttacker() {
    this.fightHistory.activeFighterID = Math.floor(Math.random() * 2);
    console.log(this.fightHistory.activeFighterID)
  }

  startFight() {
    this.fightIsActive = true;
    this.randomizeFirstAttacker();
    if(this.fightHistory.activeFighterID === 1) {
      this.makeOpponentAttack();
    }
    else {
      this.unlockUserAttack();
      console.log('user attack unlocked')
    }
  }

  lockUserAttack() {
     this.fightHistory.activeFighterID = 1;
     this.userAttackLocked = true;
     setTimeout(() => {
        this.makeOpponentAttack();
     }, 1000);
  }

  unlockUserAttack() {
    this.fightHistory.activeFighterID = 0;
    this.userAttackLocked = false;
  }

  attackOpponent(attackerId: number, $event: number , enemyHealth: number ,enemyId: number) {
    let attack = $event;
    if (this.fightIsActive) {
      if (attack > 50) {
        attack = this.getAttackValue(attack -= 100);
      }
      if (enemyHealth - attack <= 0) {
        this.setWinner(attackerId);
        return;
      }
      this.makeAttack(attackerId,attack,enemyHealth,enemyId);
      this.singleAttackValue = attack;
      this.showAttack = true;
      this.lockUserAttack();
    }
  }

  getAttackValue(attack: number) {
    return Math.abs(attack);
  }


  playAgain() {
    this.fightIsActive = true;
    this.opponentHealth = 200;
    this.userHealth = 200;
    this.fightHistory.attackHistory = [];
  }

  makeOpponentAttack() {
    let attack = this.getAttackValue(Math.floor(Math.random() * 100));
    if (this.fightIsActive) {
      if (this.userHealth - attack <= 0) {
        this.setWinner(0);
        return;
      }
      this.makeAttack(1,attack,this.userHealth, 0);
    }
    this.singleAttackValue = attack;
    this.showAttack = true;
    this.unlockUserAttack();
  }

  private setWinner(number: number) {
    this.fightHistory.winnerID = number;
    this.turnOffFight();
  }

  private turnOffFight() {
    this.fightIsActive = false;
  }

  private makeAttack(attackerId: number, attack: number ,enemyHealth: number , enemyId: number) {

    setTimeout(() => {
      enemyHealth -= attack;
      this.fightHistory.attackHistory.push({
        attackerID: attackerId,
        attackValue: attack,
        leaveHealth: enemyHealth
      });
      this.updateStats(enemyId, enemyHealth);
    }, 500);
    setTimeout(() => {
      this.showAttack = false;
    }, 2000);

  }

  private updateStats(opponentID: number, health: number) {
    if (opponentID && health) {
      if (opponentID === 0) {
        this.userHealth = health;
        return;
      }
      if (opponentID === 1) {
        this.opponentHealth = health;
        return;
      }
    }
  }


}
