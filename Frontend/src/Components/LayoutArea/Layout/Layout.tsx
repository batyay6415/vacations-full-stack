import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (

        <div className="Layout">
            
            <header>

                <Header/>

                <AuthMenu />

            </header>

            <main>
                <Routing />
            </main>

            
        </div>
    );
}

export default Layout;
