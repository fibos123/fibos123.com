export interface IBpStatus {
  rows: any[];
  rows2: Rows2[];
  head_block_num: number;
  head_block_time: string;
  head_block_producer: string;
  bp_status_refresh_time: string;
  start_time: string;
}

export interface Rows2 {
  bpname: string;
  number: number;
  date: any;
}
