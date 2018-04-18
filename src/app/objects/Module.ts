export interface Module {
  name: string;
  category: string;
  fav: boolean;
  page: string;
  readonly creator: string;
  maintainer: string;
  version: string;
  created: Date;
  update: Date;
  access: Date;
}