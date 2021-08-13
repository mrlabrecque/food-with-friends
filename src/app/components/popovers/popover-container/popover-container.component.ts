import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-container',
  templateUrl: './popover-container.component.html',
  styleUrls: ['./popover-container.component.scss'],
})
export class PopoverContainerComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() { }

}
