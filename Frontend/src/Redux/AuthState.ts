import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

//1. Global Auth State:
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = sessionStorage.getItem("token");//First one return null
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user//Extract user from token
        }
    }
}

//2.Auth ActionType:
export enum AuthActionType {
    Register,
    Login,
    Logout
}

//3.Auth Action - one 
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

//4. Auth Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    //Create new state
    const newState = { ...currentState };

    //option about type of action 
    switch (action.type) {

        case AuthActionType.Register://Here , the payload is the token
        case AuthActionType.Login://Here , the payload is the token
            newState.token = action.payload; //token from back-end
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;//Extract user from token
            sessionStorage.setItem("token", newState.token);//Save the token in storage
            break;

        case AuthActionType.Logout://Here we don't have any payload 
            newState.token = null;// I case to lost this token
            newState.user = null;
            sessionStorage.removeItem("token");//Remove token from storage
            break;
    }

    return newState
}

//5. Auth Store:
export const authStore = createStore(authReducer);



