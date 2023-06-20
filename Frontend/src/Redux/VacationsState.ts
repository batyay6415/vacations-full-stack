import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

//- לנהל אותם ברמת אפליקציה - כי כמה קומפוננטות צריכות אותו 
// - מה המידע של החופשות שומר בצורה גלובלית שלא נלך שוב לשרת
// 1. Vacations State - The application level state regarding vacations: 
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Vacations Action Type - Which actions we can perform on our vacations global state
export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    addFollow,
    removeFollow,
    UpdateVacation,
    DeleteVacation
}

// 3. Vacations Action - Interface describing an object for performing one action on our vacations global state:
export interface VacationsAction {
    type: VacationsActionType; // Which operation we're going to perform. from list enum 
    payload: any; // What is the data related to that operation. - that go to state
}

//4.Vacations Reducer - The main function performing the needed action. - new for only first call - that redux enter undefined for first time 
export function vacationReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate current state into a new state: - because must not to reducer change the original state
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here, the payload is all vacations for saving -
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation://Here , the payload is a new vacation object  for adding - that the user send to me
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here, the payload is a vacation object for updating
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: //Here , the payload is a id of vacation to delete this vacation 
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
        case VacationsActionType.addFollow:
            const indexFollowToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexFollowToUpdate !== -1) {
                newState.vacations[indexFollowToUpdate].isFollowing = true;
                newState.vacations[indexFollowToUpdate].followersCount += 1;
            }
            break;
        case VacationsActionType.removeFollow:
            const indexUnfollowToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexUnfollowToUpdate !== -1) {
            newState.vacations[indexUnfollowToUpdate].isFollowing = false;
            newState.vacations[indexUnfollowToUpdate].followersCount -= 1;
            }
            break;
    }
    
    // Return the newState: 
    return newState;

};

// 5. Vacations Store - The manager object handling redux:
export const vacationsStore = createStore(vacationReducer);

