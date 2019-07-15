/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CollabTestModule } from '../../../test.module';
import { CertifieUpdateComponent } from 'app/entities/certifie/certifie-update.component';
import { CertifieService } from 'app/entities/certifie/certifie.service';
import { Certifie } from 'app/shared/model/certifie.model';

describe('Component Tests', () => {
  describe('Certifie Management Update Component', () => {
    let comp: CertifieUpdateComponent;
    let fixture: ComponentFixture<CertifieUpdateComponent>;
    let service: CertifieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CertifieUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CertifieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertifieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertifieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Certifie(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Certifie();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
