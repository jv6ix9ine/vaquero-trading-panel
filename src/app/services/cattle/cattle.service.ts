import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Cattle } from 'src/app/models/cattle'

interface Response {
  code: number,
  message: string,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class CattleService {

  private getAllCattles_URL: string = `${environment.URL_API}/cattle/get-all`;
  private createCattle_URL: string = `${environment.URL_API}/cattle/create`;
  private updateImages_URL: string = `${environment.URL_API}/cattle/update-images`;
  private getCattle_URL: string = `${environment.URL_API}/cattle/get/`;
  private updateCattle_URL: string = `${environment.URL_API}/cattle/update`;
  private deleteCattle_URL: string = `${environment.URL_API}/cattle/`;

  constructor(private http: HttpClient) { }

  async getAllCattles() {
    try {
      let response = await this.http.get<any>(this.getAllCattles_URL).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async createCattle(cattle: any) {
    console.log('Create cattle', cattle);

    try {
      const response = await this.http.post<any>(this.createCattle_URL, { cattle }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async updateImagesCattle(cattleId: string, cattle: any) {
    try {
      const response = await this.http.put<any>(this.updateImages_URL, { cattleId, cattle }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getCattle(cattleId: string | null) {
    try {
      const response = await this.http.get<any>(this.getCattle_URL + cattleId).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async updateCattle(cattle: any) {
    console.log(cattle);
    
    try {
      const response = await this.http.put<any>(this.updateCattle_URL, { cattle }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCattle(cattleId: string) {
    try {
      const response = await this.http.delete<any>(this.deleteCattle_URL + cattleId).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getCattleById(cattleId: string){
    try {
      const response = await this.http.post<Response>(this.deleteCattle_URL + 'get-by-id', { cattleId }).toPromise()
      console.log(response);
      return response?.data as Cattle
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  
  public async getCattleByBatch(cattleBatch: string){
    try {
      const response = await this.http.post<Response>(this.deleteCattle_URL + 'get-by-batch', { cattleBatch }).toPromise()
      console.log(response);
      return response?.data as Cattle
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
