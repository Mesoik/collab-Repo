import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICertifie } from 'app/shared/model/certifie.model';
import { AccountService } from 'app/core';
import { CertifieService } from './certifie.service';

@Component({
  selector: 'jhi-certifie',
  templateUrl: './certifie.component.html'
})
export class CertifieComponent implements OnInit, OnDestroy {
  certifies: ICertifie[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected certifieService: CertifieService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.certifieService
      .query()
      .pipe(
        filter((res: HttpResponse<ICertifie[]>) => res.ok),
        map((res: HttpResponse<ICertifie[]>) => res.body)
      )
      .subscribe(
        (res: ICertifie[]) => {
          this.certifies = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCertifies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICertifie) {
    return item.id;
  }

  registerChangeInCertifies() {
    this.eventSubscriber = this.eventManager.subscribe('certifieListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
