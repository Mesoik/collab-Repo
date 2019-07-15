/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CollabTestModule } from '../../../test.module';
import { CertifieDetailComponent } from 'app/entities/certifie/certifie-detail.component';
import { Certifie } from 'app/shared/model/certifie.model';

describe('Component Tests', () => {
  describe('Certifie Management Detail Component', () => {
    let comp: CertifieDetailComponent;
    let fixture: ComponentFixture<CertifieDetailComponent>;
    const route = ({ data: of({ certifie: new Certifie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CertifieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CertifieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertifieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.certifie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
