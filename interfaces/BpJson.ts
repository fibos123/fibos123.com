export interface BpJson {
  producer_account_name: string;
  org: any[];
  nodes: Node[];
}

export interface Org {
  candidate_name: string;
  website: string;
  email: string;
  branding: Branding;
  location: Location;
}

export interface Branding {
  logo_256: string;
}

export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Node {
  location: Location2;
  node_type: string;
  p2p_endpoint?: string;
  api_endpoint?: string;
  ssl_endpoint?: string;
  bnet_endpoint?: string;
}

export interface Location2 {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
