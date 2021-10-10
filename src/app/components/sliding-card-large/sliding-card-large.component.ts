import { Component, OnInit, Input, AfterViewInit, SimpleChanges, SimpleChange, OnChanges, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Matches } from 'src/app/models/matches.model';
import { RestaurantType } from 'src/app/models/restaurant-type.enum';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-sliding-card-large',
  templateUrl: './sliding-card-large.component.html',
  styleUrls: ['./sliding-card-large.component.scss'],
})
export class SlidingCardLargeComponent implements OnInit, OnChanges {
  @Input() cardData: any[] = [];

  @Input() dataType: RestaurantType;
  dataTypeName = 'Likes';
  dataLoading = true;
  slideOpts = {
    spaceBetween: 10,
    slidesPerView: 1.15,
    direction: 'horizontal',
    pager: true,
    pagination: {
      el: 'swiper-pagination'
    }
  };
  constructor(private modalController: ModalController,
    private routerOutlet: IonRouterOutlet, private router: Router, private userService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    if (this.dataType === RestaurantType.Like) {
      this.userService.currentUserLikes$.subscribe(res => {
        this.cardData = res;
      });
    }
    if (this.dataType === RestaurantType.Match) {
      this.groupService.currentGroupMatches$.subscribe(res => {
        const trueMatches = _.filter(res, match => match.trueMatch);
        this.cardData = _.pluck(trueMatches, 'restaurant');
        this.dataTypeName = 'Matches';
      });
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataLoading = false;
  }
  onShareClicked(item) {
    console.log('share clicked' + item);
  }
  onFavoriteClicked(item) {
    console.log('favorite clicked' + item);
  }
  async onAdditionalDetailsClicked(card) {
    this.router.navigateByUrl(`/restaurant/${card.id}`, { state: { restaurant: card } });
  }
}
