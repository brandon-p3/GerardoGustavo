import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, ObservedValueOf, of, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private API_BASE_URL = 'http://localhost:3000/persona';


  constructor(
    private http: HttpClient,
  ) {
  }
  getUsuario(id_Persona: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/${id_Persona}`);
  }
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.API_BASE_URL}`, usuario);
  }
  UpdateUsuario(usuario: any, id_Persona: string): Observable<any> {
    return this.http.put<any>(`${this.API_BASE_URL}/${id_Persona}`, usuario);
  }
  DeleteUsuario(id_Persona: string) {
    return this.http.delete(`${this.API_BASE_URL}/${id_Persona}`);
  }
  getUsuariosPDF(): Observable<Blob> {
    return this.http.get(`${this.API_BASE_URL}/descargar/pdf`, {
      responseType: 'blob'
    });
  }


}