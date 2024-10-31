import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  firstName: string = 'John'; // Default value, should be dynamically set
  lastName: string = 'Doe';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.firstName = user?.firstName || this.firstName;
    this.lastName = user?.lastName || this.lastName;
  }
}
