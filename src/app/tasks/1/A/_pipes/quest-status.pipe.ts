import { Pipe, PipeTransform } from '@angular/core';
import { Quest, Status } from '../quest-creator/quest-creator.component';

@Pipe({
  name: 'questStatus',
  standalone: false,
})
export class QuestStatusPipe implements PipeTransform {
  transform(quests: Quest[] | null, status: Status): Quest[] {
    if (!quests) {
      return [];
    }
    return quests.filter(quest => quest.status === status);
  }
}
