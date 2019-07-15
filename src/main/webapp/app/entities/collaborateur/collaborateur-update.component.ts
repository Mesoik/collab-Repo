import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ICollaborateur, Collaborateur } from 'app/shared/model/collaborateur.model';
import { CollaborateurService } from './collaborateur.service';
import { IListe } from 'app/shared/model/liste.model';
import { ListeService } from 'app/entities/liste';
import { ICertifie } from 'app/shared/model/certifie.model';
import { CertifieService } from 'app/entities/certifie';

@Component({
  selector: 'jhi-collaborateur-update',
  templateUrl: './collaborateur-update.component.html'
})
export class CollaborateurUpdateComponent implements OnInit {
  isSaving: boolean;

  listes: IListe[];

  certifies: ICertifie[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    content: [null, [Validators.required]],
    date: [null, [Validators.required]],
    liste: [],
    certifie: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected collaborateurService: CollaborateurService,
    protected listeService: ListeService,
    protected certifieService: CertifieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ collaborateur }) => {
      this.updateForm(collaborateur);
    });
    this.listeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IListe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IListe[]>) => response.body)
      )
      .subscribe((res: IListe[]) => (this.listes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.certifieService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICertifie[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICertifie[]>) => response.body)
      )
      .subscribe((res: ICertifie[]) => (this.certifies = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(collaborateur: ICollaborateur) {
    this.editForm.patchValue({
      id: collaborateur.id,
      name: collaborateur.name,
      content: collaborateur.content,
      date: collaborateur.date != null ? collaborateur.date.format(DATE_TIME_FORMAT) : null,
      liste: collaborateur.liste,
      certifie: collaborateur.certifie
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const collaborateur = this.createFromForm();
    if (collaborateur.id !== undefined) {
      this.subscribeToSaveResponse(this.collaborateurService.update(collaborateur));
    } else {
      this.subscribeToSaveResponse(this.collaborateurService.create(collaborateur));
    }
  }

  private createFromForm(): ICollaborateur {
    return {
      ...new Collaborateur(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      content: this.editForm.get(['content']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      liste: this.editForm.get(['liste']).value,
      certifie: this.editForm.get(['certifie']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICollaborateur>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackListeById(index: number, item: IListe) {
    return item.id;
  }

  trackCertifieById(index: number, item: ICertifie) {
    return item.id;
  }
}
