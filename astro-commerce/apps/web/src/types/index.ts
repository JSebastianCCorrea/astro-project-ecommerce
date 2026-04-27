export type userRole = "customer" | "admin";

export interface user {    
    id : string;
    name : string;
    email : string;
    password : string;
    role : userRole;
}

export interface product {
    id : string;
    slug : string;
    name : string;
    description : string;
    price : number;
    stock : number;
    category : string;
    imageUrl : string;
    featured : boolean;
}

export interface authResponse {
    token : string;
    user : user;
}
