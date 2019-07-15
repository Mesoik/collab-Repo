/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CollabTestModule } from '../../../test.module';
import { ListeDetailComponent } from 'app/entities/liste/liste-detail.component';
import { Liste } from 'app/shared/model/liste.model';

describe('Component Tests', () => {
  describe('Liste Management Detail Component', () => {
    let comp: ListeDetailComponent;
    let fixture: ComponentFixture<ListeDetailComponent>;
    const route = ({ data: of({ liste: new Liste(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [ListeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ListeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.liste).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
