import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableTruncate',
  standalone: true,
})
export class TableTruncatePipe implements PipeTransform {
  transform(value: string, limit = 100, trail= '...'): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
