import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Extract the last segment of the URL for the breadcrumb
      this.currentRoute = event.urlAfterRedirects.split('/').pop();
    });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
