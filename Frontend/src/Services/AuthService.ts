import axios from "axios";
import appConfig from "../Utils/AppConfig";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import jwtDecode from "jwt-decode";


class AuthService {

    public async register(user: UserModel): Promise<void> {

        // Send user to backend to register: and get token from server
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract token:
        const token = response.data;

        // Save token in global state:
        authStore.dispatch({type: AuthActionType.Register , payload: token});
     }

    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend to login:
        const response = await axios.post<string>(appConfig.loginUrl , credentials);

        // Extract token:
        const token = response.data;

        // Save token in global state: 
        authStore.dispatch({ type: AuthActionType.Login , payload: token});  
    }

    public logout(): void {

        // Logout in global state: - we don't need to arrive in server
        authStore.dispatch({ type: AuthActionType.Logout });// don't have payload

    }
    
    // // Check if user has admin privileges
    public isAdmin(user: UserModel = null): boolean {
        if (!user) {
            user = authStore.getState().user;
            if (!user) return false;
        }
        return user.roleId === 1;
    }

    // // Check if a valid token exists;
    public isLoggedIn(): boolean {
        if (authStore.getState().token === null) return false;
        const container: { exp: number } = jwtDecode(authStore.getState().token);
        const now = new Date();
        //token.exp is in seconds, while Date.getTime is in milliseconds
        return container.exp * 1000 > now.getTime();
    }


}

const authService = new AuthService();

export default authService;