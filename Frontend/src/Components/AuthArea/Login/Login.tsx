import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  async function login(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome Back!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Login Box">
      <form onSubmit={handleSubmit(login)}>
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" {...register("email")} required />

        <label>Password</label>
        <input type="password" {...register("password")} required min="4" />

        <br />
        <button>Login</button>
        <br />
        <p>don't have account?</p>
        <br />
        <NavLink to="/register">register now</NavLink>
      </form>
    </div>
  );
}

export default Login;
