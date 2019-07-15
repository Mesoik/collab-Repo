/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CollabTestModule } from '../../../test.module';
import { CollaborateurDetailComponent } from 'app/entities/collaborateur/collaborateur-detail.component';
import { Collaborateur } from 'app/shared/model/collaborateur.model';

describe('Component Tests', () => {
  describe('Collaborateur Management Detail Component', () => {
    let comp: CollaborateurDetailComponent;
    let fixture: ComponentFixture<CollaborateurDetailComponent>;
    const route = ({ data: of({ collaborateur: new Collaborateur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CollaborateurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CollaborateurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CollaborateurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.collaborateur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
