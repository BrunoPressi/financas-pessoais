import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private dbPath = '';

  constructor(private db: AngularFireDatabase) {}

  withPath(path:string){
    this.dbPath = path
    return this
  }

  createItem(item: any, dbPath:any): void {
   this.db.list(this.dbPath = dbPath).push(item);
  }

  getItems(dbPath:any): Observable<any[]> {
    return this.db.list(this.dbPath = dbPath).snapshotChanges();
  }
  
  updateItem(key: string, value: any): Promise<void> {
    return this.db.list(this.dbPath).update(key, value);
  }

  deleteItem(key: string): Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }

  deleteAll(): Promise<void> {
    return this.db.list(this.dbPath).remove();
  }

}