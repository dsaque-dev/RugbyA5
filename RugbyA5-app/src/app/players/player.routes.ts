import { Routes } from "@angular/router";
import { PlayerListComponent } from "./player-list.component";
import { PlayerDetailComponent } from "./player-detail.component";
import { PlayerDetailGuard } from "./player-detail.guard";

export const PLAYER_ROUTES: Routes = [
  { path: '', component: PlayerListComponent },
  {
    path: ':id',
    canActivate: [PlayerDetailGuard],
    component: PlayerDetailComponent
}
];