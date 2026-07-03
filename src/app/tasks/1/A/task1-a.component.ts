import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './_services/user.service';
import { LocalStorageService } from './_services/local-storage.service';

export enum FunctionType {
  StaffManager,
  QuestCreator,
  QuestSelector,
  QuestController,
}

export enum UserRole {
  Admin,
  Staff,
}

export const functionLabels: { [key in FunctionType]: string } = {
  [FunctionType.StaffManager]: 'Személyzetkezelő',
  [FunctionType.QuestCreator]: 'Küldetés létrehozása',
  [FunctionType.QuestSelector]: 'Küldetések kiosztása',
  [FunctionType.QuestController]: 'Küldetésvezérlő',
};

export const roleLabels: { [key in UserRole]: string } = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Staff]: 'Személyzet',
};

export const roleIcons: { [key in UserRole]: string } = {
  [UserRole.Admin]: 'font-colors',
  [UserRole.Staff]: 'user',
};

export interface StaffMember {
  id: string;
  name: string;
  image: string | null;
}

@Component({
    selector: 'app-task1-a',
    templateUrl: './task1-a.component.html',
    styleUrls: ['./task1-a.component.less'],
    standalone: false
})
export class Task1AComponent {
  readonly FunctionType = FunctionType;
  readonly UserRole = UserRole;
  readonly functionTypes = Object.values(FunctionType).filter(v => typeof v === 'number') as FunctionType[];
  readonly userRoles = Object.values(UserRole).filter(v => typeof v === 'number') as UserRole[];
  readonly functionLabels = functionLabels;
  readonly roleLabels = roleLabels;
  readonly roleIcons = roleIcons;

  readonly userService = inject(UserService);
  private readonly localStorageService = inject(LocalStorageService);

  selectedFunction: FunctionType | null = null;
  staffList = this.localStorageService.staffList;

  selectFunction(func: FunctionType): void {
    if (this.selectedFunction === func) {
      this.selectedFunction = null;
    } else {
      this.selectedFunction = func;
    }
  }

  selectRole(role: UserRole): void {
    if (this.userService.role() === role) {
      return;
    }

    this.userService.setRole(role);
    this.selectedFunction = null;
  }

  selectStaffMember(staffId: string): void {
    this.userService.setStaffMember(this.staffList().find(s => s.id === staffId) || null);
  }
}
