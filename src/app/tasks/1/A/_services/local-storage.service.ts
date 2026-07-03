import { Injectable, signal } from '@angular/core';
import { StaffMember } from '../task1-a.component';
import { Staff } from '../staff-manager/staff-manager.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private readonly staffListSignal = signal<Staff[]>(this.getStaffList());
  readonly staffList = this.staffListSignal.asReadonly();

  private getStaffList(): StaffMember[] {
    return this.getItem('staff_list') || [];
  }

  setStaffList(staffList: StaffMember[]): void {
    this.setItem('staff_list', staffList);
    this.staffListSignal.set(staffList);
  }

  private getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }

  private setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
