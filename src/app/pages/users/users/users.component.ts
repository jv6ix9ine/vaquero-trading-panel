import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserDialogComponent } from 'src/app/components/add-user-dialog/add-user-dialog.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public dataSource!: MatTableDataSource<User>;
  public searching: boolean = true;

  constructor(
    private service: UsersService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData() {
    this.searching = true;
    try {
      var res = await this.service.getAllUsers();
      var currentUser: any = await this.auth.isLoggedIn();
      var filter = res.filter((user) => user.uid != currentUser.uid);
      this.dataSource = new MatTableDataSource(filter);
      this.searching = false;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      maxWidth: '800px',
      width: '500px',
      maxHeight: '85vh',
      data: { type: 1 },
    });

    dialogRef.afterClosed().subscribe((info) => {
      if (info != undefined) {
        this.getData();
      }
    });
  }

  update(userId: string) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      maxWidth: '800px',
      width: '500px',
      maxHeight: '85vh',
      data: { type: 2, userId: userId},
    });

    dialogRef.afterClosed().subscribe((info) => {
      if (info != undefined) {
        this.getData();
      }
    });
  }

  deleteItem(userId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: "This action can't be undone",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes, delete',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#61b466',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleting user...');
        Swal.showLoading();
        try {
          await this.service.deleteUser(userId);
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User deleted successfully',
            showConfirmButton: false,
            timer: 1200,
          });
          this.getData();
        } catch (error) {
          console.log(error);
          Swal.close();
        }
      }
    });
  }
}
