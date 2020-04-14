import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'move-preview',
  templateUrl: './move-preview.component.html',
  styleUrls: ['./move-preview.component.scss']
})
export class MovePreviewComponent implements OnInit {
  @Input() move: Move;
  @Input() general: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
