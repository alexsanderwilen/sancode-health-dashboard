import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'Cadastro', content: 'Módulo Cadastro', color: 'text-bg-primary', link: 'cadastro' },
    { title: 'Financeiro', content: 'Módulo Financeiro', color: 'text-bg-success', link: 'financeiro' },
    { title: 'Contas a Pagar', content: 'Módulo Contas a Pagar', color: 'text-bg-warning', link: 'contas-pagar' },
    { title: 'Plano', content: 'Módulo Plano', color: 'text-bg-white', link: '/plano' },
  ];  
  
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {            
      this.router.navigate(['signin']);
    }
    this.authService.getToken();    
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  cardClicked(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }
}