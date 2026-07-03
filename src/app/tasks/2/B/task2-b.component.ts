import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-task2-b',
    templateUrl: './task2-b.component.html',
    styleUrls: ['./task2-b.component.less'],
    standalone: false
})
export class Task2BComponent {

  private readonly messageService = inject(NzMessageService);

  file?: NzUploadFile;
  fileContent: string = '';
  fileName: string = '';
  fileSize: number = 0;
  searchExpression: string = '';

  beforeUpload = (file: NzUploadFile): boolean => {
    const isTextFile = file?.type === 'text/plain' && file?.name.endsWith('.txt');
    if (!isTextFile) {
      this.messageService.error('Csak .txt kiterjesztésű fájl tölthető fel!');
    } else {
      this.file = file;
      this.readFile();
    }
    return false;
  }

  readFile = (): void => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.fileContent = e.target?.result as string;
      this.mostCommonWords();
      this.fileName = this.file?.name || 'unknown';
      this.fileSize = this.file?.size || 0;
      this.messageService.success(`"${this.fileName}" sikeresen betöltve!`);
    };
    reader.onerror = () => {
      this.messageService.error('Hiba a fájl olvasása során!');
    };
    reader.readAsText(this.file as unknown as Blob);
  }

  async mostCommonWords(): Promise<void> {
    if (!this.fileContent) {
      this.messageService.warning('Nincs fájltartalom a feldolgozáshoz!');
      return;
    }

    const wordCounts: Record<string, number> = {};
    const words = this.fileContent.toLowerCase().match(/\b\w+\b/g) || [];

    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    const sortedWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);

    console.log('10 leggyakorábban előforduló szó:', sortedWords);
  }

  clearFile(): void {
    this.file = undefined;
    this.fileContent = '';
    this.fileName = '';
    this.fileSize = 0;
    this.searchExpression = '';
  }
}
