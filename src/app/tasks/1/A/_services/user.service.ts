import { Injectable, signal } from '@angular/core';
import { StaffMember, UserRole } from '../task1-a.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly roleSignal = signal<UserRole>(UserRole.Admin);
  private readonly staffMemberSignal = signal<StaffMember | null>(null);

  readonly role = this.roleSignal.asReadonly();
  readonly staffMember = this.staffMemberSignal.asReadonly();

  setRole(role: UserRole): void {
    this.roleSignal.set(role);
    if (role === UserRole.Admin) {
      this.staffMemberSignal.set(null);
    }
  }

  isAdmin(): boolean {
    return this.roleSignal() === UserRole.Admin;
  }

  setStaffMember(staffMember: StaffMember | null): void {
    this.staffMemberSignal.set(staffMember);
  }
}
