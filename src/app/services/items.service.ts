import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
   private apiUrl = 'http://localhost:3000/items';

   private selectedItemSubject: BehaviorSubject<any>;
   constructor(private http: HttpClient, private router: Router) { 
    const savedItem = localStorage.getItem('selectedItem');
    this.selectedItemSubject = new BehaviorSubject<any>(savedItem ? JSON.parse(savedItem) : null);
   }

   private dataSubject = new BehaviorSubject<string>('');
   fetchData(): Observable<any> {
      this.http.get<any>(this.apiUrl).subscribe((data)=>{
       this.dataSubject.next(data);
     });
     return this.dataSubject.asObservable();
   }


   get selectedItem$() {
    return this.selectedItemSubject.asObservable();
  }

  setSelectedItem(item: any) {
    localStorage.setItem('selectedItem', JSON.stringify(item));
    this.selectedItemSubject.next(item);
  }


  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
}
