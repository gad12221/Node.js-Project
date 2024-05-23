export type Cat = {
  name: string;
};

export type IName = {
  first: string;
  middle?: string;
  last: string;
};

export type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

export type IImage = {
  alt: string;
  url: string;
};

export type IUser = {
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  isBusiness: boolean;
  isAdmin: boolean;

  address: IAddress;
  name: IName;
  image?: IImage;
};

export type ILogin = {
  email: string;
  password: string
};
