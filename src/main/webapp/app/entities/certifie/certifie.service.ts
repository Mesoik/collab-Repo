import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICertifie } from 'app/shared/model/certifie.model';

type EntityResponseType = HttpResponse<ICertifie>;
type EntityArrayResponseType = HttpResponse<ICertifie[]>;

@Injectable({ providedIn: 'root' })
export class CertifieService {
  public resourceUrl = SERVER_API_URL + 'api/certifies';

  constructor(protected http: HttpClient) {}

  create(certifie: ICertifie): Observable<EntityResponseType> {
    return this.http.post<ICertifie>(this.resourceUrl, certifie, { observe: 'response' });
  }

  update(certifie: ICertifie): Observable<EntityResponseType> {
    return this.http.put<ICertifie>(this.resourceUrl, certifie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICertifie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICertifie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
