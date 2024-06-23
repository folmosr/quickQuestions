import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCapitalizeFirstWord',
  standalone: true
})
export class GetCapitalizeFirstWordPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').map(n => n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()).join(' ');
  }

}
