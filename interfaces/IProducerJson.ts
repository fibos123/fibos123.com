export interface IProducerJson {
  rows: Row[];
  more: boolean;
}

export interface Row {
  owner: string;
  json: string;
}
