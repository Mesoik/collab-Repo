import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICertifie } from 'app/shared/model/certifie.model';

@Component({
  selector: 'jhi-certifie-detail',
  templateUrl: './certifie-detail.component.html'
})
export class CertifieDetailComponent implements OnInit {
  certifie: ICertifie;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ certifie }) => {
      this.certifie = certifie;
    });
  }

  previousState() {
    window.history.back();
  }
}
