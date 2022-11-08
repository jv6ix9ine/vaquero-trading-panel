import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CattleService } from 'src/app/services/cattle/cattle.service';
import { MediaService } from 'src/app/services/mediaService/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cattle-update',
  templateUrl: './cattle-update.component.html',
  styleUrls: ['./cattle-update.component.scss']
})
export class CattleUpdateComponent implements OnInit {

  public uploadProgress!: Observable<number>;
  public urlImgListado: any;
  public loader: boolean = false;
  public initLoader: boolean = true;
  public cover: any = [];
  public items: any = [];
  public cattle!: any;

  public cattleId: any = '';
  public actualItems: any[] = [];

  public removeItems: any[] = [];

  private deletedItems: any[] = [];

  //Form components
  public batch: string = '';
  public quantityAndType: string = '';
  public slide: string = '';
  public averageWT: string = '';
  public weighningCond: string = '';
  public breedType: string = '';
  public frame: string = '';
  public currentLocation: string = '';
  public comments: string = '';
  public feed: string = '';
  public deliveryMethod: string = '';
  public askingPrice: string = '';

  constructor(
    private route: ActivatedRoute,
    private cattleService: CattleService,
    private mediaService: MediaService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cattleId = await this.route.snapshot.paramMap.get('id');
    await this.setEdit(this.cattleId);
  }

  private async setEdit(cattleId: string | null) {
    try {
      let cattleRes: any = await this.cattleService.getCattle(cattleId);
      this.cattle = cattleRes!.data;
      console.log(this.cattle);
      this.batch = this.cattle.batch
      this.quantityAndType = this.cattle.quantityAndType
      this.slide = this.cattle.slide
      this.averageWT = this.cattle.averageWT
      this.weighningCond = this.cattle.weighningCond
      this.breedType = this.cattle.breedType
      this.frame = this.cattle.frame
      this.currentLocation = this.cattle.currentLocation
      this.comments = this.cattle.comments
      this.feed = this.cattle.feed
      this.deliveryMethod = this.cattle.deliveryMethod
      this.askingPrice = this.cattle.askingPrice

      this.actualItems = this.cattle.items
      this.initLoader = false;

    } catch (e: any) {
      console.error(e);
      this.initLoader = false;
    }
  }

  save() {
    this.editQuestion();
  }

  public async editQuestion() {
    Swal.fire({
      title: '¿Save changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await this.edit();
      }
    })
  }

  async edit() {
    try {
      Swal.fire('Saving...', 'info');
      Swal.showLoading();
      this.loader = true;

      let itemsImages = (await this.mediaService.createCattleList(this.items, this.cattleId, "cattle"));
      itemsImages.push(...this.actualItems);

      let cattle: any = {
        _id : this.cattleId,
        batch: this.batch,
        quantityAndType: this.quantityAndType,
        slide: this.slide,
        averageWT: this.averageWT,
        weighningCond: this.weighningCond,
        breedType: this.breedType,
        frame: this.frame,
        currentLocation: this.currentLocation,
        comments: this.comments,
        feed: this.feed,
        deliveryMethod: this.deliveryMethod,
        askingPrice: this.askingPrice,
        items: itemsImages,
        created: new Date(),
        createdISO: new Date().toISOString()
      }
      
      await this.cattleService.updateCattle(cattle);

      if (this.deletedItems.length > 0) await this.mediaService.removeImages(this.deletedItems);

      this.loader = false;
      Swal.close();

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cattle updated',
        text: 'Cattle updated succesfully',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: "modal-warning"
        }
      })
      this.router.navigateByUrl('/cattle');
    } catch (e) {
      console.error(e);
    }
  }

  async onUploadItems(event: any) {
    if (event.rejectedFiles[0]) {
      event.rejectedFiles[0].reason == 'size' ? this.imgSizeError('La imagen excede el tamaño permitido (2mb)') : null;
      return
    }
    this.items.push(...event.addedFiles);
  }

  onRemoveItems(event: any) {
    this.items.splice(this.items.indexOf(event), 1);
    this.removeItems.push(this.items);
  }

  imgSizeError(text: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Tamaño excedido',
      text,
      confirmButtonText: 'Entendido',
      customClass: {
        container: "modal-warning"
      }
    })
  }

  deleteItem(item: any, index: number) {
    Swal.fire({
      title: '¿Remove image?',
      text: 'Please make sure you click on the save button',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deletedItems.push(item)
        this.actualItems.splice(index, 1)
      }
    })
  }


}
