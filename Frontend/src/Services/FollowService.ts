import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class FollowService {

    //Add follower
    public async AddFollow(vacationId: number): Promise<void> {

        // Send follower to backend:
        await axios.post<FollowerModel>(appConfig.followsUrl + vacationId);

        //Send follower to redux
        vacationsStore.dispatch({ type: VacationsActionType.addFollow, payload: vacationId });
     
    }

    //Delete follower
    public async deleteFollow(vacationId: number): Promise<void> {

        //Delete vacation from server.
        await axios.delete(appConfig.followsUrl + vacationId);

        //Delete follower from redux
        vacationsStore.dispatch({ type: VacationsActionType.removeFollow, payload: vacationId });
    }

}

const followService = new FollowService();

export default followService;
