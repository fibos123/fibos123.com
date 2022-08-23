export interface ProducerJson {
  rows: Row[];
  more: boolean;
}

export interface Row {
  owner: string;
  json: string;
}
