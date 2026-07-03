import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

export interface Quest {
  id: string;
  name: string;
  description?: string;
  difficulty: Difficulty;
  status: Status;
  requiredStaff: number;
  assignedStaff: string[];
}

export enum Difficulty {
  Easy,
  Normal,
  Hard,
}

export enum Status {
  Open,
  InProgress,
  Completed,
  Failed,
}

export const difficultyLabels: { [key in Difficulty]: string } = {
  [Difficulty.Easy]: 'Könnyű',
  [Difficulty.Normal]: 'Normál',
  [Difficulty.Hard]: 'Nehéz',
};

export const statusLabels: { [key in Status]: string } = {
  [Status.Open]: 'Nyitott',
  [Status.InProgress]: 'Folyamatban',
  [Status.Completed]: 'Befejezett',
  [Status.Failed]: 'Sikertelen',
};

@Component({
  selector: 'app-quest-creator',
  templateUrl: './quest-creator.component.html',
  styleUrl: './quest-creator.component.less',
  standalone: false
})
export class QuestCreatorComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  form!: FormGroup;
  readonly difficulties = Object.values(Difficulty).filter(v => typeof v === 'number') as Difficulty[];
  readonly difficultyLabels = difficultyLabels;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        description: [''],
        difficulty: ['', Validators.required],
        requiredStaff: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
      },
      { validators: this.validateDifficulty.bind(this) }
    );
  }

  private validateDifficulty(formGroup: AbstractControl): ValidationErrors | null {
    const difficultyControl = formGroup.get('difficulty');
    const staffControl = formGroup.get('requiredStaff');

    if (!difficultyControl || !staffControl) {
      return null;
    }

    if (difficultyControl.value === Difficulty.Hard && staffControl.value < 2) {
      return { staffMinimumForHard: true };
    }

    return null;
  }

  submitForm(): void {
    if (this.form.valid) {
      const quest: Quest = {
        id: crypto.randomUUID(),
        name: this.form.value.name,
        description: this.form.value.description || undefined,
        difficulty: this.form.value.difficulty,
        requiredStaff: this.form.value.requiredStaff,
        status: Status.Open,
        assignedStaff: [],
      };

      this.saveQuestToCookie(quest);
      this.form.reset();
      this.form.patchValue({ requiredStaff: 1 });
    }
  }

  private saveQuestToCookie(quest: Quest): void {
    const existingQuests = this.getQuestsFromCookie();
    existingQuests.push(quest);
    this.cookieService.set('quests', JSON.stringify(existingQuests), { path: '/' });
  }

  private getQuestsFromCookie(): Quest[] {
    const quests = this.cookieService.get('quests');
    return quests ? JSON.parse(quests) : [];
  }
}
