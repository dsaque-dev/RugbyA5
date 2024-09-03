import { Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'players',
    loadChildren: () => import('./players/player.routes').then(r => r.PLAYER_ROUTES)
  },
  {
    path:'sheetMatch',
    loadChildren: () => import('./sheetMatch/sheetMatch.route').then(r => r.SHEET_MATCH_ROUTES)
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
