export interface ICertifie {
  id?: number;
  name?: string;
}

export class Certifie implements ICertifie {
  constructor(public id?: number, public name?: string) {}
}
