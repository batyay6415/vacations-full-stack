import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";


class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile; //Image file
    
    public imageUrl: string; // Image full url
    public isFollowing: boolean;
    public followersCount: number;

    public constructor(vacation: VacationModel) {

        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
    }

    //משתנה שישרת רק את המודל  - לכן הוא פרטי והוא מגדיר את חוקי הולידאציה 
    private static postValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden().positive().integer().optional(),
        destination: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().iso().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().required(),

    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden().positive().integer().required(),
        destination: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().iso().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().optional(),

    });

    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

export default VacationModel;