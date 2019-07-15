import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Certifie } from 'app/shared/model/certifie.model';
import { CertifieService } from './certifie.service';
import { CertifieComponent } from './certifie.component';
import { CertifieDetailComponent } from './certifie-detail.component';
import { CertifieUpdateComponent } from './certifie-update.component';
import { CertifieDeletePopupComponent } from './certifie-delete-dialog.component';
import { ICertifie } from 'app/shared/model/certifie.model';

@Injectable({ providedIn: 'root' })
export class CertifieResolve implements Resolve<ICertifie> {
  constructor(private service: CertifieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICertifie> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Certifie>) => response.ok),
        map((certifie: HttpResponse<Certifie>) => certifie.body)
      );
    }
    return of(new Certifie());
  }
}

export const certifieRoute: Routes = [
  {
    path: '',
    component: CertifieComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.certifie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CertifieDetailComponent,
    resolve: {
      certifie: CertifieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.certifie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CertifieUpdateComponent,
    resolve: {
      certifie: CertifieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.certifie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CertifieUpdateComponent,
    resolve: {
      certifie: CertifieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.certifie.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const certifiePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CertifieDeletePopupComponent,
    resolve: {
      certifie: CertifieResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'collabApp.certifie.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
