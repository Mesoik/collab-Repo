import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Collaborateur } from 'app/shared/model/collaborateur.model';
import { CollaborateurService } from './collaborateur.service';
import { CollaborateurComponent } from './collaborateur.component';
import { CollaborateurDetailComponent } from './collaborateur-detail.component';
import { CollaborateurUpdateComponent } from './collaborateur-update.component';
import { CollaborateurDeletePopupComponent } from './collaborateur-delete-dialog.component';
import { ICollaborateur } from 'app/shared/model/collaborateur.model';

@Injectable({ providedIn: 'root' })
export class CollaborateurResolve implements Resolve<ICollaborateur> {
  constructor(private service: CollaborateurService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICollaborateur> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Collaborateur>) => response.ok),
        map((collaborateur: HttpResponse<Collaborateur>) => collaborateur.body)
      );
    }
    return of(new Collaborateur());
  }
}

export const collaborateurRoute: Routes = [
  {
    path: '',
    component: CollaborateurComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.collaborateur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CollaborateurDetailComponent,
    resolve: {
      collaborateur: CollaborateurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.collaborateur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CollaborateurUpdateComponent,
    resolve: {
      collaborateur: CollaborateurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.collaborateur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CollaborateurUpdateComponent,
    resolve: {
      collaborateur: CollaborateurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.collaborateur.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const collaborateurPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CollaborateurDeletePopupComponent,
    resolve: {
      collaborateur: CollaborateurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.collaborateur.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
