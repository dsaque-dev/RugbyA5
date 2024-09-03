import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from './player';
import { PlayerService } from './player.service';
import { NgIf, UpperCasePipe, TitleCasePipe } from '@angular/common';

@Component({
    templateUrl: './player-detail.component.html',
    styleUrls: ['./player-detail.component.css'],
    standalone: true,
    imports: [NgIf, UpperCasePipe, TitleCasePipe]
})
export class PlayerDetailComponent implements OnInit {
  pageTitle = 'Player Detail';
  errorMessage = '';
  
  player: IPlayer | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService
            ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPlayer(id);
    }
  }

  getPlayer(id: number): void {
    this.playerService.getPlayer(id).subscribe({
      next: player => this.player = player,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/players']);
  }
}
