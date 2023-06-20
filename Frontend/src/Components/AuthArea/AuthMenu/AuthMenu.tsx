import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => unsubscribe();
  }, []);

  function logout(): void {
    authService.logout();
    notifyService.success("Bye Bye...");
  }

  return (
    <div className="AuthMenu">
      {!user && (
        <>
          <span>Hello Guest | </span>
          <NavLink to="/login">Login</NavLink>
          <span> | </span>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName} |{" "}
          </span>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
