export interface ICompany {
  id: string;
  name: string;
}

export interface IUser {
  fullName: string;
  email: string;
  userKey: string;
  token: string;
  company: ICompany;
  permissions: string[];
  availableCustomers: ICompany[];
  availablePayers?: ICompany[];
}
