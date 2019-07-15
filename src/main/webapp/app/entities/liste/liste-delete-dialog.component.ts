import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListe } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';

@Component({
  selector: 'jhi-liste-delete-dialog',
  templateUrl: './liste-delete-dialog.component.html'
})
export class ListeDeleteDialogComponent {
  liste: IListe;

  constructor(protected listeService: ListeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.listeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'listeListModification',
        content: 'Deleted an liste'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-liste-delete-popup',
  template: ''
})
export class ListeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ liste }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ListeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.liste = liste;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/liste', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/liste', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
