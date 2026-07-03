import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Quest, Status } from '../quest-creator/quest-creator.component';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { statusLabels } from '../quest-creator/quest-creator.component';
import { QuestStatusPipe } from '../_pipes/quest-status.pipe';

@Component({
  selector: 'app-quest-selector',
  templateUrl: './quest-selector.component.html',
  styleUrl: './quest-selector.component.less',
  standalone: false
})
export class QuestSelectorComponent implements OnInit {

  private readonly cookieService = inject(CookieService);

  quests: Quest[] = [];
  selectedQuest: Quest | null = null;
  modalVisible = false;
  treeData: NzTreeNodeOptions[] = [];
  readonly statusLabels = statusLabels;
  readonly Status = Status;
  readonly statuses = Object.values(Status).filter(v => typeof v === 'number') as Status[];

  ngOnInit(): void {
    this.loadQuestsFromCookie();
    this.buildTreeData();
  }

  private loadQuestsFromCookie(): void {
    const questsJson = this.cookieService.get('quests');
    this.quests = questsJson ? JSON.parse(questsJson) : [];
  }

  private buildTreeData(): void {
    this.treeData = this.statuses.map(status => ({
      title: this.statusLabels[status],
      key: `status-${status}`,
      children: this.getQuestsByStatus(status).map(quest => ({
        title: quest.name,
        key: quest.id,
        isLeaf: true,
      })),
    }));
  }

  private getQuestsByStatus(status: Status): Quest[] {
    return QuestStatusPipe.prototype.transform(this.quests, status);
  }

  onNodeClick(event: NzFormatEmitEvent): void {
    const { node } = event;
    if (node?.isLeaf) {
      const questId = node.key as string;
      const selected = this.quests.find(q => q.id === questId);
      if (selected) {
        this.selectedQuest = selected;
        this.modalVisible = true;
      }
    }
  }

  onModalClose(): void {
    this.modalVisible = false;
    this.selectedQuest = null;
  }

  onSaveAssignments(staffIds: string[]): void {
    if (this.selectedQuest) {
      this.selectedQuest.assignedStaff = staffIds;
      this.cookieService.set('quests', JSON.stringify(this.quests), { path: '/' });
    }
  }
}

