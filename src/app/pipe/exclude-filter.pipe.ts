import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeFilter'
})
export class ExcludeFilterPipe implements PipeTransform {

  transform(list, index): Object {
    return list.filter(item => list.indexOf(item) !== index);
  }
}
