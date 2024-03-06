import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-mat-slider-example',
  templateUrl: './mat-slider.component.html',
  styleUrls: ['./mat-slider.component.scss']
})
export class MatSliderComponent {

  @Output() attackValue = new EventEmitter<number>();

  value: number = 1;
  action: string = 'increment';

  max: number = 100;
  min: number = 0;

  gameInterval: any;
  stopInterval: boolean = false;

  gameStarted: boolean = false;
  isButtonDisabled: boolean = false;


  changeValue() {
   this.stopInterval = false;
   this.gameInterval = setInterval(() => {
     if (this.stopInterval) {
       return;
     }
      if (this.value < this.max && this.action === 'increment') {
        this.increment();
      } else
        if (this.value > this.min && this.action === 'decrement') {
        this.decrement();
      } else
        if(this.value === this.max) {
          this.action = 'decrement';
        }
        else
          if(this.value === this.min) {
            this.action = 'increment';
          }
   }, 10);
  }

  stopSlider() {
    clearInterval(this.gameInterval);
    this.stopInterval = true;
    this.attackValue.emit(this.value);
    this.gameStarted = false;
  }

 increment() {
   this.stopInterval = false;
    this.value++;
  }

  decrement() {
    this.stopInterval = false;
    this.value--;
  }

  makeAttack() {
    if(this.gameStarted) {
      this.stopSlider();
      this.changeButtonDisable()
      return;
    }
    if(!this.gameStarted) {
      this.changeValue();
      this.gameStarted = true;
    }
  }

  changeButtonDisable() {
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
    console.log(this.isButtonDisabled)
  }
}
