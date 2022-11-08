import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CattleService } from '../../services/cattle/cattle.service';
import { MediaService } from '../../services/mediaService/media.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cattle-form',
  templateUrl: './cattle-form.component.html',
  styleUrls: ['./cattle-form.component.scss']
})
export class CattleFormComponent implements OnInit {

  public uploadProgress!: Observable<number>;
  public urlImgListado: any;
  public loader: boolean = false;
  public items: File[] = [];
  public cattleForm: FormGroup;

  constructor(
    private cattleService: CattleService,
    private mediaService: MediaService,
    private router: Router
  ) {
    this.cattleForm = new FormGroup({
      batch: new FormControl('', Validators.required),
      quantityAndType: new FormControl('', Validators.required),
      slide: new FormControl('', Validators.required),
      averageWT: new FormControl('', Validators.required),
      weighingCond: new FormControl('', Validators.required),
      breedType: new FormControl('', Validators.required),
      frame: new FormControl('', Validators.required),
      currentLocation: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required),
      feed: new FormControl('', Validators.required),
      deliveryMethod: new FormControl('', Validators.required),
      askingPrice: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  async saveCattle() {
    try {
      Swal.fire('¡Guardando!', 'Se está cargando la información...', 'info');
      Swal.showLoading();
      this.loader = true;
      var form = this.cattleForm.value;
      console.log('Form', this.cattleForm.value);

      let cattle: any = {
        batch: form.batch,
        quantityAndType: form.quantityAndType,
        slide: form.slide,
        averageWT: form.averageWT,
        weighingCond: form.weighingCond,
        breedType: form.breedType,
        frame: form.frame,
        currentLocation: form.currentLocation,
        comments: form.comments,
        feed: form.feed,
        deliveryMethod: form.deliveryMethod,
        askingPrice: form.askingPrice,
        items: [],
        created: new Date(),
        createdISO: new Date().toISOString()
      }

      let response = await this.cattleService.createCattle(cattle);
      cattle.items = await (await this.mediaService.createCattleList(this.items, response.data, "cattle"));


      await this.cattleService.updateImagesCattle(response.data, cattle);

      this.loader = false;
      Swal.close()
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cattle created succesfully',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: "modal-warning"
        }
      })
      this.router.navigateByUrl('/cattle');
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Please try again later'
      })
    }
  }

  async onUploadItems(event: any) {
    // Validate just 1 image
    // if (this.cover.length >= 1) {
    //   this.imgSizeError('Se ha excedido el número maximo de imagenes aceptadas');
    //   return;
    // }
    if (event.rejectedFiles[0]) {
      event.rejectedFiles[0].reason == 'size' ? this.imgSizeError('La imagen excede el tamaño permitido (2mb)') : null;
      return
    }
    this.items.push(...event.addedFiles);
  }

  onRemoveItems(event: any) {
    this.items.splice(this.items.indexOf(event), 1);
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

}
