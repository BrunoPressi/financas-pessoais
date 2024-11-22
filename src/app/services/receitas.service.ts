import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class receitasService {
  private dbPath = "receitas";
  private receitasSubject = new BehaviorSubject<any[]>([]); // Armazenando os itens aqui
  public receitas$ = this.receitasSubject.asObservable(); // Observable para ser consumido pelos componentes

  private receitasTotalSubject = new BehaviorSubject<number>(0); // Armazenando os itens aqui
  public receitasTotal$ = this.receitasTotalSubject.asObservable(); // Observable para ser consumido pelos componentes

  constructor(private crud: CrudService) {
    this.path();
    this.listarReceitas();
    this.receitasTotal();
  }

  path() {
    this.crud.withPath(this.dbPath);
  }

  cadastrarReceita(data:any, categoria:any, descricao:any, valor:number) {

    const dataValida = new Date(data);

    const dataCorreta = new Date(dataValida.getTime() + dataValida.getTimezoneOffset() * 60000);

    const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(dataCorreta);

    const novaReceita = {
      data: dataFormatada,
      categoria: categoria,
      descricao: descricao,
      valor: valor
    }

    this.crud.createItem(novaReceita, this.dbPath);
  }

  listarReceitas() {
    this.crud.getItems(this.dbPath).subscribe((data => {
      const receitas = data.map((item => {
        const key = item.key;
        const value = item.payload.val();
        return { key, ...value }
      }));
      this.receitasSubject.next(receitas);
    }));
  }

  receitasTotal() {
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
      this.receitasTotalSubject.next(somaValor);
    }));
  }

}
