import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IPlayer } from "./player";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  //private playerUrl = 'api/players/players.json';
  private playerUrl = 'http://localhost:5096/players';

  players: IPlayer[] = [];

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<IPlayer[]> {

    return this.http.get<IPlayer[]>(this.playerUrl, httpOptions)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one player
  // Since we are working with a json file, we can only retrieve all players
  // So retrieve all players and then find the one we want using 'map'
  getPlayer(id: number): Observable<IPlayer | undefined> {
    return this.getPlayers()
      .pipe(
        map((players: IPlayer[]) => players.find(p => p.playerId === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
