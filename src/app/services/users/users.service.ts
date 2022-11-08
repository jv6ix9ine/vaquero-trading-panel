import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private URLS = {
    create: `${environment.URL_API}/admin/create`,
    update: `${environment.URL_API}/admin/update`,
    delete: `${environment.URL_API}/admin/delete`,
  };
  private ADMIN_URI: string = `${environment.URL_API}/admin/`;

  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  public async getUserInformation(userId: string) {
    try {
      var data = await this.afs.collection('admins').doc(userId).ref.get();
      return data.data() as User;
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers() {
    try {
      var data = await this.afs.collection('admins').ref.orderBy('name').get();
      var users = await Promise.all(
        data.docs.map((user) => {
          var info = user.data();
          return info as User;
        })
      );
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async create(data: any) {
    try {
      var response = await this.http.post<{ code: number; message: string; data: any }>(this.URLS.create, { data, }).toPromise();  
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async update(data: any) {
    try {
      var response = await this.http.post<{ code: number; message: string; data: any }>(this.URLS.update, { data,}).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(uid: any) {
    try {
      var response = await this.http.post<{ code: number; message: string; data: any }>(this.URLS.delete, { uid }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  } 

  async updatePassword(password: string, id: string){
    try {
      let response = await this.http.post<{code: number, message: number}>(this.ADMIN_URI + 'update-password', { password, id }).toPromise();
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
