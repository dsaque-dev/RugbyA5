import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild, inject, Component, OnDestroy, OnInit, computed, signal, model } from "@angular/core";
import { Subscription } from "rxjs";
import { IPlayer } from "./player";
import { PlayerService } from "./player.service";
import { RouterLink } from "@angular/router";
import { NgIf, NgFor, TitleCasePipe, UpperCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css'],
    standalone: true,
    imports: [FormsModule, NgIf, NgFor, RouterLink, MatCheckboxModule, MatTableModule, MatSortModule, TitleCasePipe, UpperCasePipe ]
})

export class PlayerListComponent implements OnInit, OnDestroy, AfterViewInit {
  pageTitle = 'Player List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  players: IPlayer[] = []

  constructor(private playerService: PlayerService) {}

  private _liveAnnouncer = inject(LiveAnnouncer);
  /** dataSource = this.players;*/
  dataSource = new MatTableDataSource<IPlayer>(this.players);
  
  displayedColumns: string[] = ['select', 'gender', 'firstName', 'lastName', 'birthDate', 'licenceId', 'licenceTypes'];

  selection = new SelectionModel<IPlayer>(true, []);

  @ViewChild(MatSort)
   sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IPlayer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
   // This example uses English messages. If your application supports
   // multiple language, you would internationalize these strings.
   // Furthermore, you can customize the message to add additional
   // details about the values being sorted.
   if (sortState.direction) {
     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
   } else {
     this._liveAnnouncer.announce('Sorting cleared');
   }
  }



  ngOnInit(): void {
    this.sub = this.playerService.getPlayers().subscribe({
      next: players => {
        this.players = players;
        this.dataSource.data = this.players;
      },
      error: err => this.errorMessage = err
    });
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  
}
