import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestControllerComponent } from './quest-controller.component';

describe('QuestControllerComponent', () => {
  let component: QuestControllerComponent;
  let fixture: ComponentFixture<QuestControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestControllerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestControllerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
