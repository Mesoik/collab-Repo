import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CollabSharedModule } from 'app/shared';
import {
  ListeComponent,
  ListeDetailComponent,
  ListeUpdateComponent,
  ListeDeletePopupComponent,
  ListeDeleteDialogComponent,
  listeRoute,
  listePopupRoute
} from './';

const ENTITY_STATES = [...listeRoute, ...listePopupRoute];

@NgModule({
  imports: [CollabSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ListeComponent, ListeDetailComponent, ListeUpdateComponent, ListeDeleteDialogComponent, ListeDeletePopupComponent],
  entryComponents: [ListeComponent, ListeUpdateComponent, ListeDeleteDialogComponent, ListeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollabListeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
