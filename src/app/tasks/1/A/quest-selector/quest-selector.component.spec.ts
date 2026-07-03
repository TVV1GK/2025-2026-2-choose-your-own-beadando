import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestSelectorComponent } from './quest-selector.component';

describe('QuestSelectorComponent', () => {
  let component: QuestSelectorComponent;
  let fixture: ComponentFixture<QuestSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
