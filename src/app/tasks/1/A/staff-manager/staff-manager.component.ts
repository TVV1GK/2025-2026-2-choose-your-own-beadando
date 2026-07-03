import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LocalStorageService } from '../_services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { Quest } from '../quest-creator/quest-creator.component';

export interface Staff {
  id: string;
  name: string;
  image: string | null;
}

@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff-manager.component.html',
  styleUrl: './staff-manager.component.less',
  standalone: false
})
export class StaffManagerComponent implements OnInit {
  
  private readonly fb = inject(FormBuilder);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly cookieService = inject(CookieService);

  initLoading = true;
  form!: FormGroup;
  staffList: Staff[] = [];
  showCropper = false;
  imageFile: any = null;
  imageBase64: string | null = null;
  id: string | undefined = undefined;

  ngOnInit(): void {
    this.createForm();
    this.staffList = this.localStorageService.staffList();
    this.initLoading = false;
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, this.nameValidator.bind(this)]],
      image: [null],
    });
  }

  private nameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const value = (control.value as string).trim();

    if (value.length < 5 || value.length > 16) {
      return { nameLengthInvalid: true };
    }

    const words = value.trim().split(/\s+/);
    if (words.length < 2 || words.length > 4) {
      return { wordCountInvalid: true };
    }

    return null;
  }

  onImageSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;

        const img = new Image();
        img.onload = () => {
          this.imageFile = result;
          this.showCropper = true;
        };
        img.onerror = () => {
          this.resetImageValues();
          this.form.controls['image'].setErrors({ loadError: true });
        };
        img.src = result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onImageConfirmed(croppedImage: string): void {
    this.showCropper = false;
    this.imageBase64 = croppedImage;
  }

  onImageCancelled(): void {
    this.showCropper = false;
    this.resetImageValues();
  }

  resetImageValues(): void {
    this.form.patchValue({ image: null });
    this.imageBase64 = null;
    this.imageFile = null;
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.id) {
        const staffIndex = this.staffList.findIndex(s => s.id === this.id);
        if (staffIndex !== -1) {
          this.staffList[staffIndex] = {
            id: this.id,
            name: this.form.value.name,
            image: this.imageBase64 || null
          };
        }
        this.id = undefined;
      } else {
        const newStaff: Staff = {
          id: crypto.randomUUID(),
          name: this.form.value.name,
          image: this.imageBase64 || null
        };
        this.staffList.push(newStaff);
      }
      this.saveStaffToStorage();
      this.form.reset();
      this.resetImageValues();
    }
  }

  editStaff(staff: Staff): void {
    this.id = staff.id;
    this.form.patchValue({ name: staff.name });
    this.imageBase64 = staff.image;
  }

  deleteStaff(id: string): void {
    if (id === this.id) {
      this.form.reset();
      this.resetImageValues();
      this.id = undefined;
    }

    this.staffList = this.staffList.filter(s => s.id !== id);
    this.saveStaffToStorage();

    const questsJson = this.cookieService.get('quests');
    const quests: Quest[] = questsJson ? JSON.parse(questsJson) : [];
    const updatedQuests = quests.map(quest => ({
      ...quest,
      assignedStaff: quest.assignedStaff.filter(staffId => staffId !== id)
    }));
    this.cookieService.set('quests', JSON.stringify(updatedQuests), { path: '/' });
  }

  private saveStaffToStorage(): void {
    this.localStorageService.setStaffList(this.staffList);
  }
}
