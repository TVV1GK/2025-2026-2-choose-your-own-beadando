import { QuestStatusPipe } from './quest-status.pipe';

describe('QuestStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new QuestStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
