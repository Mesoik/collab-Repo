/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CollabTestModule } from '../../../test.module';
import { CertifieComponent } from 'app/entities/certifie/certifie.component';
import { CertifieService } from 'app/entities/certifie/certifie.service';
import { Certifie } from 'app/shared/model/certifie.model';

describe('Component Tests', () => {
  describe('Certifie Management Component', () => {
    let comp: CertifieComponent;
    let fixture: ComponentFixture<CertifieComponent>;
    let service: CertifieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CollabTestModule],
        declarations: [CertifieComponent],
        providers: []
      })
        .overrideTemplate(CertifieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertifieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertifieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Certifie(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.certifies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
