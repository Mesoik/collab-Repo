import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CollabSharedModule } from 'app/shared';
import {
  CollaborateurComponent,
  CollaborateurDetailComponent,
  CollaborateurUpdateComponent,
  CollaborateurDeletePopupComponent,
  CollaborateurDeleteDialogComponent,
  collaborateurRoute,
  collaborateurPopupRoute
} from './';

const ENTITY_STATES = [...collaborateurRoute, ...collaborateurPopupRoute];

@NgModule({
  imports: [CollabSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CollaborateurComponent,
    CollaborateurDetailComponent,
    CollaborateurUpdateComponent,
    CollaborateurDeleteDialogComponent,
    CollaborateurDeletePopupComponent
  ],
  entryComponents: [
    CollaborateurComponent,
    CollaborateurUpdateComponent,
    CollaborateurDeleteDialogComponent,
    CollaborateurDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollabCollaborateurModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
