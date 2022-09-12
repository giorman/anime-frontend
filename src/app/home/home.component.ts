import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Anime } from '../model/anime';
import { AnimeService } from '../service/anime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  pageSize: number = 4;
  collectionSize!: number;
  animes!: Anime[];
  animesRecibidos!: Anime[];
  anime: Anime = new Anime();
  closeResult: string = '';
  modalReferencia!: NgbModalRef;

  constructor(
    private animeServicio: AnimeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.actualizarTabla();
  }

  accion() {
    if (!this.anime.id) {
      console.log('guarde');
      this.guardar();

    } else {
      console.log('actualize');
      this.editar();

    }
  }

  guardar() {

    this.animeServicio.guardar(this.anime).subscribe((resultado) => {
      Swal.fire(
        'Guardar',
        `El anime ${this.anime.nombre} se guardo correctamente`,
        'success'
      )
      this.cerrar();
      this.actualizarTabla();
    });

  }

  editar() {
    this.animeServicio.actualizar(this.anime).subscribe((resultado) => {
      Swal.fire(
        'Editar',
        `El anime ${this.anime.nombre} se edito correctamente`,
        'success'
      )
      this.cerrar();
      this.actualizarTabla();
    });
  }

  eliminar(anime: Anime) {
    this.animeServicio.eliminar(anime.id).subscribe((resultado) => {
      Swal.fire(
        'Eliminar',
        `El anime ${anime.nombre} se elimino correctamente`,
        'success'
      )
      this.actualizarTabla();
    });

  }

  actualizarTabla() {
    this.animeServicio.consultar().subscribe((resultado) => {
      this.animesRecibidos = resultado;
      this.collectionSize = this.animesRecibidos.length;
      this.animes = this.animesRecibidos
        .map((anime, i) => ({ id: i + 1, ...anime }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    });
  }

  open(content: any) {
    this.modalReferencia = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });

  }

  cerrar() {
    this.modalReferencia.close();
    this.anime = new Anime();
  }

  cargarDatos(animeSeleccionado: Anime, content: any) {
    this.anime = animeSeleccionado;
    this.open(content);
  }
}
