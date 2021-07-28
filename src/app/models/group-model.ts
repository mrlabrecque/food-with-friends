import { FilterChip } from './filter-chip.model';
import { GroupMember } from './group-member-model';
import { Matches } from './matches.model';
import { Param } from './param-model';

export class Group {
  _id?: number;

  name: string;
  ownerId: number;
  members?: number[];
  filters: {
    foodTypes: FilterChip[];
    foodPrices: FilterChip[];
    kids: boolean;
    distance: number;
    matchThreshhold?: number;
  };
  matches?: Matches[];
}
