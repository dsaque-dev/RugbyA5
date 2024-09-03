import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { IPlayer } from "../players/player";
import { PlayerService } from "../players/player.service";
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    templateUrl: './sheetMatch.component.html',
    styleUrls: ['./sheetMatch.component.css'],
    standalone: true,
    imports: [ 
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        RouterLink]
})

export class SheetMatchComponent implements OnInit, OnDestroy {
  pageTitle = 'Sheet Match';
  
  /*listOfPlayers: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];*/

  private _formBuilder = inject(FormBuilder);
  private _liveAnnouncer = inject(LiveAnnouncer);  

  errorMessage = '';
  sub!: Subscription;

  listOfPlayers: IPlayer[] = []
  Referentselected = new SelectionModel<IPlayer>(true, []);

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.sub = this.playerService.getPlayers().subscribe({
      next: listOfPlayers => {
        this.listOfPlayers = listOfPlayers;
        /*this.dataSource.data = this.players;*/
      },
      error: err => this.errorMessage = err
    });
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  
  isLinear = false;
  maxPlayers = 11;
  maxReferees = 2;
  maxReferents = 1;
 


}