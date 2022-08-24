export interface IBpJson {
  producer_account_name: string;
  org: any[];
  nodes: IBpJsonNode[];
}

export interface IBpJsonOrg {
  candidate_name: string;
  website: string;
  email: string;
  branding: IBpJsonBranding;
  location: IBpJsonLocation;
}

export interface IBpJsonBranding {
  logo_256: string;
}

export interface IBpJsonLocation {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface IBpJsonNode {
  location: IBpJsonLocation2;
  node_type: string;
  p2p_endpoint?: string;
  api_endpoint?: string;
  ssl_endpoint?: string;
  bnet_endpoint?: string;
}

export interface IBpJsonLocation2 {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
