import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm: FormGroup
  public loader: boolean = false;
  public currentPassword: string = '';
  private currentUserUid: string = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) { 
    this.passwordForm = new FormGroup({
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      currentPassword: new FormControl('',[Validators.required]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getCurrentUser()
  }

  async getCurrentUser(){
    try {
      let response =  await this.authService.isAuthenticated()
      let user =  await this.authService.getUser(response.user as string)
      this.currentPassword = user.password
      this.currentUserUid = user.uid
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async updatePassword(){
    try {
      this.loader = true
      await Swal.fire({
        icon: 'warning',
        title: 'Are You shure?',
        text: 'When you change your password, you will need to log in again with your new password.',
        confirmButtonText: 'Ok',
        showCancelButton: true,
        customClass:{
          container: 'vaqueroAlert'
        }
      }).then( async (result) => {
        if(result.isConfirmed){
          let form = this.passwordForm.value;
          let newPassword = form.newPassword
          let currentPassword = form.currentPassword
          if(currentPassword != this.currentPassword){
            this.loader = false
            await this.currentPasswordDiferentAlert()
          } else {
            let response = await this.userService.updatePassword(newPassword, this.currentUserUid)
            if(response?.code == 200){
              this.loader = false
              this.dialogRef.close()
              await this.authService.logout()
            }
          }
        }
      })
    } catch (error: any) {
      console.log(error);
      this.loader = false
      throw Swal.fire({
        icon: 'error',
        title: 'An error has occurred',
        text: 'Try again later',
        confirmButtonText: 'Ok',
        iconColor: "#fff",
        customClass: {
          container: 'vaqueroAlert'
        }
      })
    }
  }

  async validateSamePasswords(uid: string, newPassword: string){
    try {
      let response = await this.authService.getUser(uid);
      if(response.password === newPassword) return true;
      return false;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  currentPasswordDiferentAlert(){
    return Swal.fire({
      icon: 'error',
      title: 'Current password is incorrect!',
      text: 'Make sure you type your current password correctly',
      confirmButtonText: 'Ok',
      iconColor: "#fff",
      customClass: {
        container: 'vaqueroAlert'
      }
    })
  }

}
