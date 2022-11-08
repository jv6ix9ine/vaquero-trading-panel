import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cattle } from 'src/app/models/cattle';
import { Offer } from 'src/app/models/offer';
import { CattleService } from 'src/app/services/cattle/cattle.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offer-information',
  templateUrl: './offer-information.component.html',
  styleUrls: ['./offer-information.component.scss']
})
export class OfferInformationComponent implements OnInit {

  public offerId: string = '';
  public offer!: Offer;
  public loader: boolean = false
  public image: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg'
  public cattle!: Cattle

  constructor(
    private route: ActivatedRoute,
    private cattleService: CattleService,
    private offerService: OffersService,
    private router: Router
  ) { 
    this.route.params.subscribe( (route: any) => {
      this.offerId = route.id
      console.log(this.offerId);
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getOfferById()
    await this.getCattleByBatch()
  }

  async getOfferById(){
    try {
      this.loader = true
      let response = await this.offerService.getOfferById(this.offerId)
      console.log(response);
      this.offer = response
      this.loader = false
    } catch (error) {
      this.loader = false
      console.log(error);
      
    }
  }

  async acceptOffer(offerId: string){
    Swal.fire({
      icon: 'warning',
      title: 'Accept Offer?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes, accept',
      denyButtonText: `Cancel`,
      // confirmButtonColor: '#008000',
      customClass: {
        container: 'vaqueroAlert'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Swal.fire('Deleting offer...');
        // Swal.showLoading();
        try {
          await this.offerService.acceptOffer(offerId)
          .then( (result:any) => {
            this.loader = false
            this.router.navigate(['/offers/all'])
          });;
          // Swal.close();
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'Offer deleted successfully',
          //   showConfirmButton: false,
          //   timer: 1200,
          // });
        } catch (error) {
          console.log(error);
          // Swal.close();
        }
      }
    });
  }

  async declineOffer(offerId: string){
      Swal.fire({
        icon: 'warning',
        title: 'Decline Offer?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes, delete',
        denyButtonText: `Cancel`,
        // confirmButtonColor: '#008000',
        customClass: {
          container: 'vaqueroAlert'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Swal.fire('Deleting offer...');
          // Swal.showLoading();
          try {
            await this.offerService.declineOffer(offerId)
            .then( (result:any) => {
              this.loader = false
              this.router.navigate(['/offers/all'])
            });
            // Swal.close();
            // Swal.fire({
            //   position: 'top-end',
            //   icon: 'success',
            //   title: 'Offer deleted successfully',
            //   showConfirmButton: false,
            //   timer: 1200,
            // });
          } catch (error) {
            console.log(error);
            // Swal.close();
          }
        }
      });
  }

  async getCattleByBatch(){
    try {
      let response = await this.cattleService.getCattleByBatch(this.offer.lot)
      console.log(response);
      this.cattle = response
    } catch (error) {
      console.log(error);
      
    }
  }


}
