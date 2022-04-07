export interface User {
    id: number;
    name: string; // same as in laravel
    email: string;
    password: string;
    password_confirmation: string; //this name because of laravel sanctum
}

export interface UserLogin {
    email: string;
    password: string;
}
