/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CollabTestModule } from '../../../test.module';
import { CollaborateurUpdateComponent } from 'app/entities/collaborateur/collaborateur-update.component';
import { CollaborateurService } from 'app/entities/collaborateur/collaborateur.service';
import { Collaborateur } from 'app/shared/model/collaborateur.model';

describe('Component Tests', () => {
  describe('Collaborateur Management Update Component', () => {
    let comp: CollaborateurUpdateComponent;
    let fixture: ComponentFixture<CollaborateurUpdateComponent>;
    let service: CollaborateurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CollaborateurUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CollaborateurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CollaborateurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CollaborateurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Collaborateur(123);
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
        const entity = new Collaborateur();
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
