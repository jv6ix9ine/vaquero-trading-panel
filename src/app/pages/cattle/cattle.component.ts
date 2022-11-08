import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cattle } from 'src/app/models/cattle';
import { CattleService } from 'src/app/services/cattle/cattle.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cattle',
  templateUrl: './cattle.component.html',
  styleUrls: ['./cattle.component.scss']
})
export class CattleComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'batch', 'breed', 'action'];
  public dataSource!: MatTableDataSource<Cattle>;
  public searching: boolean = true;

  constructor(
    private service: CattleService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    this.searching = true;
    try {
      var res = await this.service.getAllCattles();
      this.dataSource = new MatTableDataSource(res.data);
      console.log(this.dataSource.data);
      this.searching = false;
    } catch (error: any) {
      console.log(error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(docId: string) {
    this.router.navigate([`cattle/update/${docId}`])
  }

  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Yes, delete.`,
      denyButtonText: `No, cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        })

        Swal.fire({
          title: 'Deleting data...',
          icon: 'info',
          timer: 6000
        });
        Swal.showLoading();

        try {
          //codigo para eliminación
          await this.service.deleteCattle(id);
        } catch (error) {
          Swal.fire('Something went wrong, please try again later', 'error');
        }

        Swal.close();

        Toast.fire({
          icon: 'success',
          title: 'Item deleted successfully'
        })
        this.ngOnInit()
      }
    })
  }

}
