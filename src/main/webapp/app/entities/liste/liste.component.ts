import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListe } from 'app/shared/model/liste.model';
import { AccountService } from 'app/core';
import { ListeService } from './liste.service';

@Component({
  selector: 'jhi-liste',
  templateUrl: './liste.component.html'
})
export class ListeComponent implements OnInit, OnDestroy {
  listes: IListe[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected listeService: ListeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.listeService
      .query()
      .pipe(
        filter((res: HttpResponse<IListe[]>) => res.ok),
        map((res: HttpResponse<IListe[]>) => res.body)
      )
      .subscribe(
        (res: IListe[]) => {
          this.listes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListe) {
    return item.id;
  }

  registerChangeInListes() {
    this.eventSubscriber = this.eventManager.subscribe('listeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
