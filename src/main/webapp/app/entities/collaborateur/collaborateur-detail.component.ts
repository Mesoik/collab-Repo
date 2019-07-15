import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICollaborateur } from 'app/shared/model/collaborateur.model';

@Component({
  selector: 'jhi-collaborateur-detail',
  templateUrl: './collaborateur-detail.component.html'
})
export class CollaborateurDetailComponent implements OnInit {
  collaborateur: ICollaborateur;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ collaborateur }) => {
      this.collaborateur = collaborateur;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
