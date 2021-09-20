import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePice implements PipeTransform {

  transform(value: string) {
    switch (value) {
      case "$": {
        return `<i class="fas fa-dollar-sign"></i>`;
      }
      case "$$": {
        return `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
      }
      case "$$$": {
        return `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
      }
      case "$$$$": {
        return `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
      }
      default: {
        return '';
      }
    }
  }

}
