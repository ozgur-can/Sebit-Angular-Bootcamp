import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() count: number = 0;
  @Output() counterIncreaseEvent = new EventEmitter<number>();

  increase() {
    this.counterIncreaseEvent.emit(++this.count);
  }

}
