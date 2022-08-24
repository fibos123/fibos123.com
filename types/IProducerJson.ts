export interface IProducerJson {
  rows: IProducerJsonRow[];
  more: boolean;
}

export interface IProducerJsonRow {
  owner: string;
  json: string;
}
