class AppConfig {

    public registerUrl = "http://localhost:4000/api/register/";
    public loginUrl = "http://localhost:4000/api/login/";

    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public followsUrl = "http://localhost:4000/api/vacations/follow/";

}

const appConfig = new AppConfig();

export default appConfig;
