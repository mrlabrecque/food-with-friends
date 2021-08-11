import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePice implements PipeTransform {

  transform(value: number) {
    switch (value) {
      case 1: {
        return `<i class="fas fa-dollar-sign fa-sm"></i>`;
      }
      case 2: {
        return `<i class="fas fa-dollar-sign fa-sm"></i><i class="fas fa-dollar-sign fa-sm"></i>`;
      }
      case 3: {
        return `<i class="fas fa-dollar-sign fa-sm"></i><i class="fas fa-dollar-sign fa-sm"></i><i class="fas fa-dollar-sign fa-sm"></i>`;
      }
      case 4: {
        return `<i class="fas fa-dollar-sign fa-sm"></i><i class="fas fa-dollar-sign fa-sm"></i><i class="fas fa-dollar-sign fa-sm"></i><i class="fas fa-dollar-sign fa-sm"></i>`;
      }
      default: {
        return '';
      }
    }
  }

}
