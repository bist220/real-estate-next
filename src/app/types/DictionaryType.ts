export type Dictionary = {
    $schema: string;
    app: string;
    homePage: {
        title: string;
    };
    auth: Auth;
    button: Button;
    property: PropertyDict
}

export type Auth = {
    email: string;
    name: string;
    loginTitle: string;
    loginDescription: string;
    signupTitle: string;
    signupTDescription: string;
    password: string;
}

export type Button = {
    createProperty: string;
    login: string;
    logout: string;
    signup: string,
    back: string;
    edit: string;
};

export type PropertyDict = {
    name: string;
    builder: string;
    description: string;
    location: string;
    price: string;
    images: string;
    created_at: string;
    updated_at: string;
};