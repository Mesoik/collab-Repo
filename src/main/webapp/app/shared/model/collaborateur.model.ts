import { Moment } from 'moment';
import { IListe } from 'app/shared/model/liste.model';
import { ICertifie } from 'app/shared/model/certifie.model';

export interface ICollaborateur {
  id?: number;
  name?: string;
  content?: any;
  date?: Moment;
  liste?: IListe;
  certifie?: ICertifie;
}

export class Collaborateur implements ICollaborateur {
  constructor(
    public id?: number,
    public name?: string,
    public content?: any,
    public date?: Moment,
    public liste?: IListe,
    public certifie?: ICertifie
  ) {}
}
