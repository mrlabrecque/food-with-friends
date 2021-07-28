import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss'],
})
export class MatchPageComponent implements OnInit {
  restaurants: any;

  constructor(private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurants = this.restaurantService.filteredRestaurants$.value;
  }

}
