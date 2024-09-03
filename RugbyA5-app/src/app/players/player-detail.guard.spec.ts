import { TestBed } from '@angular/core/testing';

import { PlayerDetailGuard } from './player-detail.guard';

describe('PlayerDetailGuard', () => {
  let guard: PlayerDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
