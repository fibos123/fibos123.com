export interface ISiteRaw {
  id: string;
  text: string;
}

export interface ISite {
  icon: string;
  name: string;
  sub: ISiteSub[];
}

export interface ISiteSub {
  name: string;
  child: ISiteChild[];
  icon?: string;
}

export interface ISiteChild {
  name: string;
  desc: string;
  url: string;
  icon?: string;
  more?: ISiteMore;
}

export interface ISiteMore {
  icon?: string;
  name: string;
  url: string;
  color?: string;
}
