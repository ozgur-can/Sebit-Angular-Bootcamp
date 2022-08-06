export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
    phone: string;
    website: string;
    company: ICompany;
}

export interface IGeo {
    lat: string;
    lng: string;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IPost {
    title: string;
    body: string;
    imageId: number;
    userId: number;
    id: number;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
    userId: number;
}