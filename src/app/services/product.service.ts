import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {io} from'socket.io-client';

const baseUrl = 'http://localhost:8080/api/products';
const SOCKET_ENDPOINT = baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   socket;

   HTTPOptions:Object = {
    responseType: 'text',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl,this.HTTPOptions);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`,this.HTTPOptions);
  }

  create(data) {

    return this.http.post(baseUrl, data);
  }

  update(id, data) {
   
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`,this.HTTPOptions);
  }

  deleteAll() {
    return this.http.delete(baseUrl,this.HTTPOptions);
  }


  setupSocketConnexion(){
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('product', (data: string) => {
    console.log(data);
   });
   }
 

}