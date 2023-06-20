import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";


class VacationsService {

    //Get all vacations 
    public async getAllVacations(): Promise<VacationModel[]> {

        //Take from global state
        let vacations = vacationsStore.getState().vacations;

        //If we don't have vacations - get them from backend
        if (vacations.length === 0) {

            // Get from REST API vacations: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Extract vacations: 
            vacations = response.data;

            //Update global store 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations })

        }

        // Return:
        return vacations;
    }

    // Get one vacation: 
    public async getOneVacation(id: number): Promise<VacationModel> {

        // Take vacations from global state:
        let vacations = vacationsStore.getState().vacations;

        // Find the needed vacation: 
        let vacation = vacations.find(v => v.vacationId === id);

        // If vacation doesn't exist - get it from backend:
        if (!vacation) {

            // Get vacation from REST API:
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);

            // Extract vacation:
            vacation = response.data;

            // No need to update global state
            console.log(vacation);
        }

        // Return:
        return vacation;
    }

    //Filter vacations:only for user get vacation that he follow about that
    public async getMyVacations(): Promise<VacationModel[]> {

        //get all the vacations
        let vacations = await this.getAllVacations();

        //Filter only the vacations if the user follows them - 
        vacations = vacations.filter(v => v.isFollowing);

        // Return vacations:
        return vacations;

    }

    //Filter vacations not - start :only for user get vacation that startDate> now
    public async getVacationsNotStart(): Promise<VacationModel[]> {

        //get all the vacations
        let vacations = await this.getAllVacations()

        const dateObject = new Date();

        const now = dateObject.toISOString();

        //Filter only the vacations if startDate > now 
        vacations = vacations.filter(el => el.startDate > now);

        // Return vacations:
        return vacations;
    }

    //Filter vacations not - start :only for user get vacation active now
    public async getVacationsActive(): Promise<VacationModel[]> {

        //get all the vacations
        let vacations = await this.getAllVacations();

        const dateObject = new Date();

        const now = dateObject.toISOString();

        //Filter only the vacations if startDate < now and 
        vacations = vacations.filter(el => el.startDate <= now && el.endDate >= now);

        // Return vacations:
        return vacations;
    }

    //add new vacation 
    public async addNewVacation(vacation: VacationModel): Promise<void> {

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" };

        //send vacation to server - i  need to send specific headers that content image
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, { headers });

        //Get addedVacation - that include id that server get to this vacation. 
        const addedVacation = response.data;

        //Add to global- state
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }


    // Edit vacation:
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.patch<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, { headers });

        // Get the updated vacation:
        const updateVacation = response.data;

        // Update global store with the updatedVacation: 
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updateVacation });
    }

    //Delete vacation 
    public async deleteVacation(id: number): Promise<void> {

        //Delete vacation from server.
        await axios.delete(appConfig.vacationsUrl + id);

        //Delete vacation from our global store
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });

    }

}

const vacationService = new VacationsService();

export default vacationService;
