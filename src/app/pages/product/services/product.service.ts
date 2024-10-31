import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(skip: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?skip=${skip}&limit=${limit}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, productData);
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, productData);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${query}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
