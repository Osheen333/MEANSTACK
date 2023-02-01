export interface InstituteList {
  _id?: string;
  name: string;
  city: string;
  province: string;
  sector: string;
  level: string;
}

export interface InstituteCreateOrUpdate {
  name: string;
  city: string;
  province: string;
  sector: string;
  level: string;
}
