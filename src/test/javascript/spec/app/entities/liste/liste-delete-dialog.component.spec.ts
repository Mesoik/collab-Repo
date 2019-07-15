/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CollabTestModule } from '../../../test.module';
import { ListeDeleteDialogComponent } from 'app/entities/liste/liste-delete-dialog.component';
import { ListeService } from 'app/entities/liste/liste.service';

describe('Component Tests', () => {
  describe('Liste Management Delete Component', () => {
    let comp: ListeDeleteDialogComponent;
    let fixture: ComponentFixture<ListeDeleteDialogComponent>;
    let service: ListeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [ListeDeleteDialogComponent]
      })
        .overrideTemplate(ListeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListeService);
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
