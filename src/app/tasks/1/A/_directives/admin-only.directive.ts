import { Directive, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserRole } from '../task1-a.component';

@Directive({
  selector: '[appAdminOnly]',
  standalone: false,
})
export class AdminOnlyDirective {
  private readonly userService = inject(UserService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const newRole = this.userService.role();
      this.updateVisibility(newRole);
    });
  }

  private updateVisibility(newRole: UserRole): void {
    if (newRole === UserRole.Admin) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
