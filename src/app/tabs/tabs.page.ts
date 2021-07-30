import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public tabs: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.tabs = this.activatedRoute.snapshot.paramMap.get('_id');
  }

}
