import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: false,
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, ...args: unknown[]): unknown {
    if (isNaN(bytes) || bytes === 0) return '0 B';

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', '?'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i < sizes.length - 1 ? i : sizes.length - 1]}`;
  }
}
