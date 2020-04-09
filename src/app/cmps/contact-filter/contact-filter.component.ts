import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {
  @Input() filterBy;
  @Output() setFilterBy = new EventEmitter()
  filterByCopy = null;
  constructor() { }

  ngOnInit(): void {
    this.filterByCopy = {... this.filterBy}
  }

  onChange() {
    this.setFilterBy.emit(this.filterByCopy)
  }

}
