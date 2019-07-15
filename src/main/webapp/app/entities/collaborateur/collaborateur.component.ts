import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICollaborateur } from 'app/shared/model/collaborateur.model';
import { AccountService } from 'app/core';
import { CollaborateurService } from './collaborateur.service';

@Component({
  selector: 'jhi-collaborateur',
  templateUrl: './collaborateur.component.html'
})
export class CollaborateurComponent implements OnInit, OnDestroy {
  collaborateurs: ICollaborateur[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected collaborateurService: CollaborateurService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.collaborateurService
      .query()
      .pipe(
        filter((res: HttpResponse<ICollaborateur[]>) => res.ok),
        map((res: HttpResponse<ICollaborateur[]>) => res.body)
      )
      .subscribe(
        (res: ICollaborateur[]) => {
          this.collaborateurs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCollaborateurs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICollaborateur) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInCollaborateurs() {
    this.eventSubscriber = this.eventManager.subscribe('collaborateurListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
