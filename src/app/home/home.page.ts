import { Component, OnInit } from '@angular/core';
import { receitasService } from '../services/receitas.service';
import { DespesasService } from '../services/despesas.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  receitasItems: any[] = [];

  receitaData: any;
  receitaCategoria:any;
  receitaDesc:any;
  receitaValor:number = 0;

  //---------------------------------//

  despesasItems: any[] = [];

  despesaData: any;
  despesaCategoria:any;
  despesaDesc: any;
  despesaValor: any;

  //---------------------------------//

  receitasTotal:number = 0;
  despesasTotal:number = 0;

  constructor(private receita: receitasService, private despesa: DespesasService, private crud:CrudService) {}

  ngOnInit() {

    this.receita.receitas$.subscribe(data => {
      this.receitasItems = data;
    })

    this.despesa.despesas$.subscribe(data => {
      this.despesasItems = data;
    })

    this.receita.receitasTotal$.subscribe(data => {
      this.receitasTotal = data;
    })

    this.despesa.despesasTotal$.subscribe(data => {
      this.despesasTotal = data;
    })

  }

  cadastroReceita() {
    this.receita.cadastrarReceita(this.receitaData, this.receitaCategoria, this.receitaDesc, this.receitaValor);
  }

  cadastroDespesa() {
    this.despesa.cadastrarDespesa(this.despesaData, this.despesaCategoria, this.despesaDesc, this.despesaValor);
  };

}
