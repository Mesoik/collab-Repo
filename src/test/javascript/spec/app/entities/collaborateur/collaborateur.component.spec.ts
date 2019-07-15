/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CollabTestModule } from '../../../test.module';
import { CollaborateurComponent } from 'app/entities/collaborateur/collaborateur.component';
import { CollaborateurService } from 'app/entities/collaborateur/collaborateur.service';
import { Collaborateur } from 'app/shared/model/collaborateur.model';

describe('Component Tests', () => {
  describe('Collaborateur Management Component', () => {
    let comp: CollaborateurComponent;
    let fixture: ComponentFixture<CollaborateurComponent>;
    let service: CollaborateurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CollaborateurComponent],
        providers: []
      })
        .overrideTemplate(CollaborateurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CollaborateurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CollaborateurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Collaborateur(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.collaborateurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
