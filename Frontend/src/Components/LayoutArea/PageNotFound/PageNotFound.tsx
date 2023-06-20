import "./PageNotFound.css";
import imageSource from "../../../Assets/images/not found.webp";

function PageNotFound(): JSX.Element {

    return (
        <div className="PageNotFound">

        <p>The page you are looking for doesn't exist.</p>

        <br />
        <br />

        <img src={imageSource} alt="" />
        
        	
        </div>
    );
}

export default PageNotFound;
