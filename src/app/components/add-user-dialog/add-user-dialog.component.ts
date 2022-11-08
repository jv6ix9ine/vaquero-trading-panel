import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnInit {
  public form_group!: FormGroup;
  public loader: boolean = false;
  constructor(
    public fb: FormBuilder,
    public service: UsersService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: number; userId?: string }
  ) {
    this.form_group = this.fb.group({
      uid: [''],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      userType: ['', Validators.required]
    });
  }

  async ngOnInit() {
    console.log('data type', this.data.type);
    
    if (this.data.type == 2) {
      try {
        var data = await this.service.getUserInformation(this.data.userId!);
        this.form_group.patchValue(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async create() {
    this.loader = true;
    if (this.form_group.valid) {
      try {
        var response = await this.service.create(this.form_group.value);
        this.dialogRef.close(response!.code);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Data successfully saved',
          showConfirmButton: false,
          timer: 1200,
        });
      } catch (error) {
        this.loader = false;
        Swal.fire({
          title: 'Ups...',
          icon: 'error',
          text: 'An error occurred, please try again later',
          confirmButtonText: 'Accept',
          customClass: {
            container: 'iosAlert',
            confirmButton: 'blue',
          },
        });
      }
    } else {
      this.loader = false;
      Swal.fire({
        title: 'Ups...',
        icon: 'warning',
        text: 'All fields are required',
        confirmButtonText: 'Accept',
        customClass: {
          container: 'iosAlert',
          confirmButton: 'blue',
        },
      });
    }
  }

  async update() {
    this.loader = true;
    if (this.form_group.valid) {
      try {
        var response = await this.service.update(this.form_group.value);
        this.dialogRef.close(response!.code);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Data successfully saved',
          showConfirmButton: false,
          timer: 1200,
        });
      } catch (error) {
        this.loader = false;
        Swal.fire({
          title: 'Ups...',
          icon: 'error',
          text: 'An error occurred, please try again later',
          confirmButtonText: 'Accept',
          customClass: {
            container: 'iosAlert',
            confirmButton: 'blue',
          },
        });
      }
    } else {
      this.loader = false;
      Swal.fire({
        title: 'Ups...',
        icon: 'warning',
        text: 'All fields are required',
        confirmButtonText: 'Accept',
        customClass: {
          container: 'iosAlert',
          confirmButton: 'blue',
        },
      });
    }
  }
}
