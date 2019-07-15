/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CollabTestModule } from '../../../test.module';
import { CertifieDeleteDialogComponent } from 'app/entities/certifie/certifie-delete-dialog.component';
import { CertifieService } from 'app/entities/certifie/certifie.service';

describe('Component Tests', () => {
  describe('Certifie Management Delete Component', () => {
    let comp: CertifieDeleteDialogComponent;
    let fixture: ComponentFixture<CertifieDeleteDialogComponent>;
    let service: CertifieService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CertifieDeleteDialogComponent]
      })
        .overrideTemplate(CertifieDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertifieDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertifieService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
