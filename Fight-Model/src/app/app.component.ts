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
  userAttackLocked: boolean = false;

  ngOnInit() {
    this.startFight();
  }

  randomizeFirstAttacker() {
    this.fightHistory.activeFighterID = Math.floor(Math.random() * 2);
  }

  startFight() {
    this.fightIsActive = true;
    this.randomizeFirstAttacker();
    if(this.fightHistory.activeFighterID === 0) {
      this.unlockUserAttack();
    }
    else {
      this.lockUserAttack();
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
      this.makeAttack(attackerId,attack,enemyHealth,enemyId);
      this.singleAttackValue = attack;
      this.showAttack = true;
      this.lockUserAttack();
    }
  }

  getAttackValue(attack: number) {
    return Math.abs(attack);
  }

  reset() {
    this.fightIsActive = true;
    this.opponentHealth = this.opponent.maxHealth;
    this.userHealth = this.user.maxHealth;
    this.fightHistory = new FightModel();
    this.startFight();
  }

  makeOpponentAttack() {
    let attack = this.getAttackValue(Math.floor(Math.random() * 50));
    if (this.fightIsActive) {
      if (this.userHealth - attack <= 0) {
        this.setWinner(1);
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
      if (enemyHealth - attack <= 0) {
        enemyHealth = 0;
        this.setWinner(attackerId);
      } else
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
    if(opponentID === 0) {
      this.userHealth = health;
    }
    else {
      this.opponentHealth = health;
    }
  }


}
