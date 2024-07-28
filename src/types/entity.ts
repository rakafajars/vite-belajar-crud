export interface IContact {
  _id: string;
  name: string;
  phone: number;
}

export interface IContactResult {
  data: IContact[];
}
