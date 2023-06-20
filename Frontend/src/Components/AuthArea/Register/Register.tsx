import UserModel from "../../../Models/UserModel";
import { NavLink} from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

const {register, handleSubmit} = useForm<UserModel>();

const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <form onSubmit={handleSubmit(send)}>

            <h2>Register</h2>

            <label>First name</label>
            <input type="text" {...register("firstName")} required />

            <label>Last name</label>
            <input type="text" {...register("lastName")} required />

            <label>Email</label>
            <input type="email" {...register("email")} required />

            <label>Password</label>
            <input type="password" {...register("password")} required min="4" />

            <br />
            <button>Register</button>
            <br />
            
            <span>already a member?</span>
            <br/>
            <NavLink to="/login">Login</NavLink>
            
            </form>
			
        </div>
    );
}

export default Register;
