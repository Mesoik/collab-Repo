import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertifie } from 'app/shared/model/certifie.model';
import { CertifieService } from './certifie.service';

@Component({
  selector: 'jhi-certifie-delete-dialog',
  templateUrl: './certifie-delete-dialog.component.html'
})
export class CertifieDeleteDialogComponent {
  certifie: ICertifie;

  constructor(protected certifieService: CertifieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.certifieService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'certifieListModification',
        content: 'Deleted an certifie'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-certifie-delete-popup',
  template: ''
})
export class CertifieDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ certifie }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CertifieDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.certifie = certifie;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/certifie', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/certifie', { outlets: { popup: null } }]);
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
