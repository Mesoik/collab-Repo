import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CollabSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CollabSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CollabSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollabSharedModule {
  static forRoot() {
    return {
      ngModule: CollabSharedModule
    };
  }
}
