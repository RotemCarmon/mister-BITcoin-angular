import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {
  @Input() moves: Move[];
  @Input() general: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
