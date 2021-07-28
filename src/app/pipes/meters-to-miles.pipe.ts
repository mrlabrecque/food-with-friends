import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToMiles'
})
export class MetersToMilesPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value * 0.000621371);
  }

}
