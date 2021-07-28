import { Component, OnInit, Input, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { indexOf } from 'underscore';

@Component({
  selector: 'app-chip-select-array',
  templateUrl: './chip-select-array.component.html',
  styleUrls: ['./chip-select-array.component.scss'],
})
export class ChipSelectArrayComponent implements OnChanges {
  @Input() availableChips;
  @Input() selectedChips;
  @Output() chipSelectionChanged: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnChanges() {
    _.each(this.selectedChips, (incomingChip, key) => {
      const found = _.findWhere(this.availableChips, { value: incomingChip.name });
      if (found) {
        found.selected = incomingChip.selected;
      }
    });
  }
  updateSelections(i) {
    i.selected = !i.selected;
    const found = _.findWhere(this.selectedChips, { name: i.value });
    if (found) {
      found.selected = i.selected;
      this.chipSelectionChanged.emit(this.selectedChips);
    }
  }
}
