import { Component, OnChanges, OnInit, inject, input, output } from '@angular/core';
import { Quest } from '../../quest-creator/quest-creator.component';
import { Staff } from '../../staff-manager/staff-manager.component';
import { statusLabels } from '../../quest-creator/quest-creator.component';
import { LocalStorageService } from '../../_services/local-storage.service';

interface StaffAssignment {
  staff: Staff;
  selected: boolean;
}

@Component({
  selector: 'app-quest-modal',
  templateUrl: './quest-modal.component.html',
  styleUrl: './quest-modal.component.less',
  standalone: false
})
export class QuestModalComponent implements OnChanges {
  readonly statusLabels = statusLabels;

  private readonly localStorageService = inject(LocalStorageService);

  quest = input<Quest>();
  isVisible = input(false);
  closeModal = output<void>();
  saveAssignments = output<string[]>();

  staffAssignments: StaffAssignment[] = [];
  selectedCount = 0;

  ngOnChanges(): void {
    this.buildStaffAssignments();
  }

  private buildStaffAssignments(): void {
    const staffList = this.localStorageService.staffList();
    this.staffAssignments = staffList.map(staff => ({
      staff,
      selected: this.quest()?.assignedStaff.includes(staff.id) ?? false,
    }));
    this.updateSelectedCount();
  }

  onStaffToggle(assignment: StaffAssignment): void {
    if (assignment.selected) {
      assignment.selected = false;
    } else if (this.selectedCount < (this.quest()?.requiredStaff ?? 0)) {
      assignment.selected = true;
    }
    this.updateSelectedCount();
  }

  private updateSelectedCount(): void {
    this.selectedCount = this.staffAssignments.filter(a => a.selected).length;
  }

  onSave(): void {
    const selectedStaffIds = this.staffAssignments
      .filter(a => a.selected)
      .map(a => a.staff.id);
    this.saveAssignments.emit(selectedStaffIds);
    this.handleClose();
  }

  handleClose(): void {
    this.closeModal.emit();
  }
}
