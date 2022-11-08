import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Offer } from 'src/app/models/offer';
import { environment } from 'src/environments/environment.prod';

interface Response {
  code: number,
  message: string,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private getAllOffers_URL: string = `${environment.URL_API}/offer/get-all`;
  private acceptOffer_URL: string = `${environment.URL_API}/offer/accept`;
  private declineOffer_URL: string = `${environment.URL_API}/offer/decline`;
  private deleteOffer_URL: string = `${environment.URL_API}/offer/`;

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  async getAllOffers() {
    try {
      let response = await this.http.get<any>(this.getAllOffers_URL).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async acceptOffer(offerId: string) {
    try {
      const response = await this.http.put<any>(this.acceptOffer_URL, {offerId}).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async declineOffer(offerId: string) {
    try {
      const response = await this.http.put<any>(this.declineOffer_URL, {offerId}).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteOffer(offerId: string) {
    try {
      const response = await this.http.delete<any>(this.deleteOffer_URL + offerId).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getOfferById(offerId: string) {
    try {
      const response = await this.http.post<Response>(this.deleteOffer_URL + 'get-by-id', { offerId }).toPromise();
      return response?.data as Offer;
    } catch (error) {
      throw error;
    }
  }
}
