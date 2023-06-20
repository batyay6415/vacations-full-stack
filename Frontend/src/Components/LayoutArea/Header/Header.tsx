import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">

            <AuthMenu />
            
            <h2>Welcome To The Best Vacation Deals Website</h2>
            
        </div>
    );
}

export default Header;
