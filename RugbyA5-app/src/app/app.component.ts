import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>
          <img 
            [src]='rugbya5LogoUrl'
            [title]='title'
            [style.width.px]='rugbya5LogoWidth'
            [style.margin.px]='rugbya5LogoMargin'></a> 
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/welcome'>Home</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/players'>Player List</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/sheetMatch'>Sheet Match</a></li>
        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RugbyA5-app';
  rugbya5LogoUrl= 'assets/images/logo_rugbya5.jpeg';
  rugbya5LogoWidth='60';
  rugbya5LogoMargin='1';
}
