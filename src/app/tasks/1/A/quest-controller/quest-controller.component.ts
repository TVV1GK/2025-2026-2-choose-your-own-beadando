import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { difficultyLabels, Quest, Status, statusLabels } from '../quest-creator/quest-creator.component';
import { UserService } from '../_services/user.service';
import { UserRole } from '../task1-a.component';

@Component({
  selector: 'app-quest-controller',
  templateUrl: './quest-controller.component.html',
  styleUrl: './quest-controller.component.less',
  standalone: false
})
export class QuestControllerComponent implements OnInit {

  private readonly cookieService = inject(CookieService);
  private readonly message = inject(NzMessageService);
  readonly userService = inject(UserService);

  readonly UserRole = UserRole;
  readonly Status = Status;
  readonly statusLabels = statusLabels;
  readonly statuses = Object.values(Status).filter(v => typeof v === 'number') as Status[];

  readonly difficultyLabels = difficultyLabels;
  
  questsByStatus: { [key in Status]: Quest[] } = {
    [Status.Open]: [],
    [Status.InProgress]: [],
    [Status.Completed]: [],
    [Status.Failed]: [],
  };

  ngOnInit(): void {
    this.loadQuestsFromCookie();
  }

  private loadQuestsFromCookie(): void {
    const questsJson = this.cookieService.get('quests');
    const allQuests: Quest[] = questsJson ? JSON.parse(questsJson) : [];
    
    Object.keys(this.questsByStatus).forEach(key => {
      this.questsByStatus[key as unknown as Status] = [];
    });
    
    allQuests.forEach(quest => {
      this.questsByStatus[quest.status].push(quest);
    });
  }

  drop(event: CdkDragDrop<Quest[]>): void {
    const movedQuest = event.previousContainer.data[event.previousIndex];
    const previousStatus = this.getStatusFromContainer(event.previousContainer);
    const newStatus = this.getStatusFromContainer(event.container);

    const validationError = this.validateQuestMovement(movedQuest, previousStatus, newStatus);
    if (validationError) {
      this.message.error(validationError);
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      movedQuest.status = newStatus;
    }
    
    this.saveQuestsToCookie();
  }

  private validateQuestMovement(quest: Quest, fromStatus: Status, toStatus: Status): string | null {
    if (quest.assignedStaff.length < quest.requiredStaff) {
      return `A "${quest.name}" küldetéshez nincs meg a szükséges létszám (${quest.assignedStaff.length}/${quest.requiredStaff}).`;
    }

    if (fromStatus === toStatus) {
      return null;
    }

    const allowedTransitions: { [key in Status]?: Status[] } = {
      [Status.Open]: [Status.InProgress],
      [Status.InProgress]: [Status.Completed, Status.Failed],
      [Status.Completed]: [],
      [Status.Failed]: [],
    };

    const allowedTargets = allowedTransitions[fromStatus] || [];
    if (allowedTargets.length === 0) {
      return `"${statusLabels[fromStatus]}" státuszból nem lehet küldetést mozgatni.`;
    } else if (!allowedTargets.includes(toStatus)) {
      return `"${statusLabels[fromStatus]}" státuszból csak "${allowedTargets.map(s => statusLabels[s]).join('" vagy "')}"-ba lehet küldetést mozgatni.`;
    }

    return null;
  }

  private getStatusFromContainer(container: any): Status {
    for (const status of this.statuses) {
      if (this.questsByStatus[status] === container.data) {
        return status;
      }
    }
    return Status.Open;
  }

  private saveQuestsToCookie(): void {
    const allQuests: Quest[] = [];
    this.statuses.forEach(status => {
      allQuests.push(...this.questsByStatus[status]);
    });
    this.cookieService.set('quests', JSON.stringify(allQuests), { path: '/' });
  }

  getConnectedLists(currentStatus: Status): string[] {
    return this.statuses
      .filter(status => status !== currentStatus)
      .map(status => `list-${status}`);
  }
}
