import { UploadedFile } from "express-fileupload";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageUrl: string; // Image full url
    public image: UploadedFile; //Image file

    public constructor(vacation: VacationModel){

        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image; 
}



}

export default VacationModel;