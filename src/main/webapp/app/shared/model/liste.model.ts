export interface IListe {
  id?: number;
  name?: string;
}

export class Liste implements IListe {
  constructor(public id?: number, public name?: string) {}
}
