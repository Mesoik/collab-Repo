import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICollaborateur } from 'app/shared/model/collaborateur.model';
import { CollaborateurService } from './collaborateur.service';

@Component({
  selector: 'jhi-collaborateur-delete-dialog',
  templateUrl: './collaborateur-delete-dialog.component.html'
})
export class CollaborateurDeleteDialogComponent {
  collaborateur: ICollaborateur;

  constructor(
    protected collaborateurService: CollaborateurService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.collaborateurService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'collaborateurListModification',
        content: 'Deleted an collaborateur'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-collaborateur-delete-popup',
  template: ''
})
export class CollaborateurDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ collaborateur }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CollaborateurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.collaborateur = collaborateur;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/collaborateur', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/collaborateur', { outlets: { popup: null } }]);
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
