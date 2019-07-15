import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CollabSharedModule } from 'app/shared';
import {
  CertifieComponent,
  CertifieDetailComponent,
  CertifieUpdateComponent,
  CertifieDeletePopupComponent,
  CertifieDeleteDialogComponent,
  certifieRoute,
  certifiePopupRoute
} from './';

const ENTITY_STATES = [...certifieRoute, ...certifiePopupRoute];

@NgModule({
  imports: [CollabSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CertifieComponent,
    CertifieDetailComponent,
    CertifieUpdateComponent,
    CertifieDeleteDialogComponent,
    CertifieDeletePopupComponent
  ],
  entryComponents: [CertifieComponent, CertifieUpdateComponent, CertifieDeleteDialogComponent, CertifieDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollabCertifieModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
