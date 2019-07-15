import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListe } from 'app/shared/model/liste.model';

@Component({
  selector: 'jhi-liste-detail',
  templateUrl: './liste-detail.component.html'
})
export class ListeDetailComponent implements OnInit {
  liste: IListe;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ liste }) => {
      this.liste = liste;
    });
  }

  previousState() {
    window.history.back();
  }
}
