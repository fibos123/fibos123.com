export interface Site {
  icon: string;
  name: string;
  sub: Sub[];
}

export interface Sub {
  name: string;
  child: Child[];
  icon?: string;
}

export interface Child {
  name: string;
  desc: string;
  url: string;
  icon?: string;
  more?: More;
}

export interface More {
  icon?: string;
  name: string;
  url: string;
  color?: string;
}
