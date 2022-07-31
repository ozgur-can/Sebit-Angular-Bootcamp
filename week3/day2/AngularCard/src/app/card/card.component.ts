import { Component, Input, OnInit } from '@angular/core';
import { Card } from './model/card';

// internal interface

// interface Card {
//   title: string;
//   imageUrl: string;
//   username: string;
//   content: string;
// }

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() titleChild: string = '';
  @Input() imageUrlChild: string = '';
  @Input() usernameChild: string = '';
  @Input() contentChild: string = '';
  @Input() post: Card = { content: '', imageUrl: '', username: '', title: '' };

  constructor() {}

  ngOnInit(): void {}
}
