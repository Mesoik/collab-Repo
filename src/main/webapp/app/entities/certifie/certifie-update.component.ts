import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICertifie, Certifie } from 'app/shared/model/certifie.model';
import { CertifieService } from './certifie.service';

@Component({
  selector: 'jhi-certifie-update',
  templateUrl: './certifie-update.component.html'
})
export class CertifieUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(2)]]
  });

  constructor(protected certifieService: CertifieService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ certifie }) => {
      this.updateForm(certifie);
    });
  }

  updateForm(certifie: ICertifie) {
    this.editForm.patchValue({
      id: certifie.id,
      name: certifie.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const certifie = this.createFromForm();
    if (certifie.id !== undefined) {
      this.subscribeToSaveResponse(this.certifieService.update(certifie));
    } else {
      this.subscribeToSaveResponse(this.certifieService.create(certifie));
    }
  }

  private createFromForm(): ICertifie {
    return {
      ...new Certifie(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICertifie>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
