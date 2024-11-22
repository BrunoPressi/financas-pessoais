import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  private dbPath = "despesas";

  private despesasSubject = new BehaviorSubject<any[]>([]); // Armazenando os itens aqui
  public despesas$ = this.despesasSubject.asObservable(); // Observable para ser consumido pelos componentes

  private despesasTotalSubject = new BehaviorSubject<number>(0); // Armazenando os itens aqui
  public despesasTotal$ = this.despesasTotalSubject.asObservable(); // Observable para ser consumido pelos componentes

  constructor(private crud: CrudService) {
    this.path();
    this.listarDespesas();
    this.despesasTotal();
  }

  path() {
    this.crud.withPath(this.dbPath);
  }

  cadastrarDespesa(data:any, categoria:any, descricao:any, valor:any) {

    const dataValida = new Date(data);

    const dataCorreta = new Date(dataValida.getTime() + dataValida.getTimezoneOffset() * 60000);

    const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(dataCorreta);

    const novaDespesa = {
      data: dataFormatada,
      categoria: categoria,
      descricao: descricao,
      valor: valor
    }

    this.crud.createItem(novaDespesa, this.dbPath);
  }

  listarDespesas() {
    this.crud.getItems(this.dbPath).subscribe((data => {
      const despesas = data.map((item => {
        const key = item.key;
        const value = item.payload.val();
        return { key, ...value }
      }));
      this.despesasSubject.next(despesas);
    }));
  }

  despesasTotal() {
    this.crud.getItems(this.dbPath).subscribe((data => {
      const receitas = data.map((item => {
        const key = item.key;
        const value = item.payload.val();
        return { key, ...value }
      }));
      let somaValor:number = 0;
      receitas.forEach((data)=> {
        somaValor += Number(data.valor);
      })
      this.despesasTotalSubject.next(somaValor);
    }));
  }


}
