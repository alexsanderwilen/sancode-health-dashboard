import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {    
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['signin']);
    }    
  }
} 
