import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = '';
  date: string = '';
  money: string = '';
  height: number = 0;

  onNameChange(value: string) {
    this.name = value;
  }

  onDateChange(value: string) {
    this.date = value;
  }

  onMoneyChange(value: string) {
    this.money = value;
  }

  onHeightChange(value: string) {
    this.height = parseFloat(value);
  }
}
