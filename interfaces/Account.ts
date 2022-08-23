export interface Account {
  account_name: string;
  head_block_num: number;
  head_block_time: string;
  privileged: boolean;
  last_code_update: string;
  created: string;
  ram_quota: number;
  net_weight: number;
  cpu_weight: number;
  net_limit: NetLimit;
  cpu_limit: CpuLimit;
  ram_usage: number;
  permissions: Permission[];
  total_resources: TotalResources;
  self_delegated_bandwidth: SelfDelegatedBandwidth;
  refund_request: any;
  voter_info: VoterInfo;
}

export interface NetLimit {
  used: number;
  available: number;
  max: number;
}

export interface CpuLimit {
  used: number;
  available: number;
  max: number;
}

export interface Permission {
  perm_name: string;
  parent: string;
  required_auth: RequiredAuth;
}

export interface RequiredAuth {
  threshold: number;
  keys: Key[];
  accounts: any[];
  waits: any[];
}

export interface Key {
  key: string;
  weight: number;
}

export interface TotalResources {
  owner: string;
  net_weight: string;
  cpu_weight: string;
  ram_bytes: number;
}

export interface SelfDelegatedBandwidth {
  from: string;
  to: string;
  net_weight: string;
  cpu_weight: string;
}

export interface VoterInfo {
  owner: string;
  proxy: string;
  producers: any[];
  staked: number;
  last_vote_weight: string;
  proxied_vote_weight: string;
  is_proxy: number;
}
