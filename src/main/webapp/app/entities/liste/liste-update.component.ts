import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IListe, Liste } from 'app/shared/model/liste.model';
import { ListeService } from './liste.service';

@Component({
  selector: 'jhi-liste-update',
  templateUrl: './liste-update.component.html'
})
export class ListeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(2)]]
  });

  constructor(protected listeService: ListeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ liste }) => {
      this.updateForm(liste);
    });
  }

  updateForm(liste: IListe) {
    this.editForm.patchValue({
      id: liste.id,
      name: liste.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const liste = this.createFromForm();
    if (liste.id !== undefined) {
      this.subscribeToSaveResponse(this.listeService.update(liste));
    } else {
      this.subscribeToSaveResponse(this.listeService.create(liste));
    }
  }

  private createFromForm(): IListe {
    return {
      ...new Liste(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListe>>) {
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
