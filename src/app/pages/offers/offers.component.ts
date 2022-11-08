import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OffersService } from 'src/app/services/offers/offers.service';
import { Offer } from 'src/app/models/offer';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CattleService } from 'src/app/services/cattle/cattle.service';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  public displayedColumnsPendingTable: string[] = ['id', 'batch', 'offer', 'name', 'date', 'action'];
  public displayedColumnsAcceptedTable: string[] = ['id', 'batch', 'offer', 'name', 'date'];
  public displayedColumnsDeclinedTable: string[] = ['id', 'batch', 'offer', 'name', 'date', 'action'];
  public pendingDataSource!: MatTableDataSource<Offer>;
  public acceptedDataSource!: MatTableDataSource<Offer>;
  public declinedDataSource!: MatTableDataSource<Offer>;
  public searching: boolean = true;

  constructor(
    private service: OffersService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData() {
    this.searching = true;
    try {
      var res = await this.service.getAllOffers();

      var pendingFilter = res.data.filter((offer: any) => offer.status === 'pending');
      this.pendingDataSource = new MatTableDataSource(pendingFilter);
      console.log(this.pendingDataSource);


      var acceptedFilter = res.data.filter((offer: any) => offer.status === 'accepted');
      this.acceptedDataSource = new MatTableDataSource(acceptedFilter);

      var declinedFilter = res.data.filter((offer: any) => offer.status === 'declined');
      this.declinedDataSource = new MatTableDataSource(declinedFilter);

      this.searching = false;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  acceptOffer(offerId: string) {
    Swal.fire({
      title: 'Accept Offer?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes, accept',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#008000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Accepting offer...');
        Swal.showLoading();
        try {
          await this.service.acceptOffer(offerId);
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Offer accepted successfully',
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

  declineOffer(offerId: string) {
    Swal.fire({
      title: 'Decline Offer?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes, decline',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#008000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Declining offer...');
        Swal.showLoading();
        try {
          await this.service.declineOffer(offerId);
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Offer declined successfully',
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

  deleteOffer(offerId: string) {
    Swal.fire({
      title: 'Delete Offer?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes, delete',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#008000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleting offer...');
        Swal.showLoading();
        try {
          await this.service.deleteOffer(offerId);
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Offer deleted successfully',
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

  navigateToOfferInformationPage(offerId: any) {
    this.router.navigate(['offers/info/' + offerId  ])
  }


}
