import { FilterChip } from './filter-chip.model';
import { GroupMember } from './group-member-model';
import { Matches } from './matches.model';
import { Param } from './param-model';
import { User } from './user.model';

export class Group {
  _id?: number;
  name: string;
  owner: User;
  members?: User[];
  filters: {
    foodTypes: FilterChip[];
    foodPrices: FilterChip[];
    kids: boolean;
    distance: number;
    matchThreshhold?: number;
  };
  matches?: Matches[];
  avatar?: string;
}
