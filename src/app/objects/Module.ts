export interface Module {
  readonly id: number;
  name: string;
  category: string;
  page: string;
  fav: boolean;
  readonly creator: string;
  maintainer: string;
  version: string;
  created: Date;
  updated: Date;
  last_access: Date;
}