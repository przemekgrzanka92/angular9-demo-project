import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'paginatedListCell'
})
export class PaginatedListCellPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }

  transform(value: any, ...args: unknown[]): string {
    if (value instanceof Array) {
      return value.map(val => {
        return this.translateService.instant(val);
      }).join(', ');
    } else {
      return this.translateService.instant(value);
    }
  }

}
