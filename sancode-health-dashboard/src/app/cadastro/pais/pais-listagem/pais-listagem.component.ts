import { Component, OnInit } from '@angular/core';
import { Pais, PaisService } from '../service/pais.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pais-listagem',
  standalone: true,  
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pais-listagem.component.html',
  styles: ``
})
export class PaisListagemComponent implements OnInit {
  // paises: Pais[] = [];
  paises: any[] = [
    { id: 1, nome: 'Brasil', sigla: 'BR', codigo: '55' },
    { id: 2, nome: 'Estados Unidos', sigla: 'EUA', codigo: '1' },
    { id: 3, nome: 'Canadá', sigla: 'CAN', codigo: '1' },
    { id: 4, nome: 'México', sigla: 'MEX', codigo: '52' },
    { id: 5, nome: 'Argentina', sigla: 'ARG', codigo: '54' },
    { id: 6, nome: 'Chile', sigla: 'CHI', codigo: '56' },
    { id: 7, nome: 'Colômbia', sigla: 'COL', codigo: '57' },
    { id: 8, nome: 'Peru', sigla: 'PER', codigo: '51' },
    { id: 9, nome: 'Uruguai', sigla: 'URU', codigo: '598' },
    { id: 10, nome: 'Paraguai', sigla: 'PAR', codigo: '595' },
    { id: 11, nome: 'Venezuela', sigla: 'VEN', codigo: '58' },
    { id: 12, nome: 'Equador', sigla: 'EQU', codigo: '593' },
    { id: 13, nome: 'Bolívia', sigla: 'BOL', codigo: '591' },
    { id: 14, nome: 'Guiana', sigla: 'GUI', codigo: '592' },
    { id: 15, nome: 'Suriname', sigla: 'SUR', codigo: '597' },
    { id: 16, nome: 'Guiana Francesa', sigla: 'GUF', codigo: '594' },
    { id: 17, nome: 'Ilhas Malvinas', sigla: 'MAL', codigo: '500' },
    { id: 18, nome: 'Ilhas Geórgia do Sul e Sandwich do Sul', sigla: 'GEO', codigo: '500' },
  ];

  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 4;
  paginasVisiveis: number[] = [];
  maxPaginasVisiveis: number = 5; // Número máximo de páginas a exibir no paginador
  paginaIrPara: number | null = null; // Página para ir diretamente
  
  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe((data) => {
      this.paises = data;
      this.calcularPaginas();
    });
  }

  deletePais(id: number): void {
    this.paisService.deletePais(id).subscribe(() => {
      this.paises = this.paises.filter(p => p.id !== id);
      this.calcularPaginas();
    });
  }

  calcularPaginas(): void {
    this.totalPaginas = Math.ceil(this.paises.length / this.itensPorPagina);
    this.atualizarPaginasVisiveis();
  }

  atualizarPaginasVisiveis(): void {
    const inicio = Math.max(1, this.paginaAtual - Math.floor(this.maxPaginasVisiveis / 2));
    const fim = Math.min(this.totalPaginas, inicio + this.maxPaginasVisiveis - 1);
    this.paginasVisiveis = Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
  }

  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.atualizarPaginasVisiveis();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginasVisiveis();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginasVisiveis();
    }
  }
}
