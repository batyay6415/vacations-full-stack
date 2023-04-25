import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

// import Joi = BaseJoi.extend(ImageExtension);
// import BaseJoi  from "joi";
// import ImageExtension from "joi-image-extension"

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

    //משתנה שישרת רק את המודל  - לכן הוא פרטי והוא מגדיר את חוקי הולידאציה 
    private static postValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden().positive().integer().optional(),
        destination: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required().iso().min('now'),
        endDate: Joi.date().required().iso().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        imageUrl: Joi.string(),
        image: Joi.binary()
    .encoding('base64')
    .max(5 * 1024 * 1024) // 5MB max size
    .required()
    .messages({
      'any.required': 'Please select an image',
      'binary.max': 'The image size should be less than 5MB',
    }),
  contentType: Joi.string()
    .valid('image/jpeg', 'image/png', 'image/gif')
    .required()
    .messages({
      'any.required': 'Please select a valid image',
      'string.valid': 'The image should be in JPEG, PNG or GIF format',
    }),
  fileName: Joi.string()
    .regex(/.(jpg|jpeg|png|gif)$/i)
    .required()
    .messages({
      'any.required': 'Please select an image file',
      'string.regex.base': 'The image file should have a valid extension',
    }),

        // image: Joi.any(),
        // image: Joi.alternatives().try(Joi.string(),Joi.binary()).required()
        //image: Joi.string().min(1).max(1024 * 1024).required().regex(/^data:image\/(png|jpeg|jpg);base64,/)
        // image: Joi.alternatives().try(Joi.string().base64(),Joi.binary().encoding('base64')).required()
        // image: Joi.binary().encoding('base64').min(1).max(5 * 1024 * 1024).optional(),
        // format: Joi.string().valid('jpeg', 'png', 'bmp').required()
    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden().positive().integer().required(),
        destination: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().iso().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.binary().encoding('base64').min(1).max(5 * 1024 * 1024).optional(),
        format: Joi.string().valid('jpeg', 'png', 'bmp').required() 
        
    });


    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}

export default VacationModel;