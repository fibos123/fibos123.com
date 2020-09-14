export interface Global {
  rows: Row[];
  more: boolean;
}

export interface Row {
  max_block_net_usage: number;
  target_block_net_usage_pct: number;
  max_transaction_net_usage: number;
  base_per_transaction_net_usage: number;
  net_usage_leeway: number;
  context_free_discount_net_usage_num: number;
  context_free_discount_net_usage_den: number;
  max_block_cpu_usage: number;
  target_block_cpu_usage_pct: number;
  max_transaction_cpu_usage: number;
  min_transaction_cpu_usage: number;
  max_transaction_lifetime: number;
  deferred_trx_expiration_window: number;
  max_transaction_delay: number;
  max_inline_action_size: number;
  max_inline_action_depth: number;
  max_authority_depth: number;
  max_ram_size: string;
  total_ram_bytes_reserved: string;
  total_ram_stake: string;
  last_producer_schedule_update: string;
  last_pervote_bucket_fill: string;
  pervote_bucket: number;
  perblock_bucket: number;
  total_unpaid_blocks: number;
  total_activated_stake: string;
  thresh_activated_stake_time: string;
  last_producer_schedule_size: number;
  total_producer_vote_weight: string;
  last_name_close: string;
}
