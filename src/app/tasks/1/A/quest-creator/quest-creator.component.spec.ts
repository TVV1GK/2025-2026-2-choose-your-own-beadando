import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestCreatorComponent } from './quest-creator.component';

describe('QuestCreatorComponent', () => {
  let component: QuestCreatorComponent;
  let fixture: ComponentFixture<QuestCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestCreatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
