import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Liste } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';
import { ListeComponent } from './liste.component';
import { ListeDetailComponent } from './liste-detail.component';
import { ListeUpdateComponent } from './liste-update.component';
import { ListeDeletePopupComponent } from './liste-delete-dialog.component';
import { IListe } from 'app/shared/model/liste.model';

@Injectable({ providedIn: 'root' })
export class ListeResolve implements Resolve<IListe> {
  constructor(private service: ListeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IListe> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Liste>) => response.ok),
        map((liste: HttpResponse<Liste>) => liste.body)
      );
    }
    return of(new Liste());
  }
}

export const listeRoute: Routes = [
  {
    path: '',
    component: ListeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListeDetailComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListeUpdateComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListeUpdateComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const listePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ListeDeletePopupComponent,
    resolve: {
      liste: ListeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.liste.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
