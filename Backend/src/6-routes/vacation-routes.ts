import express, { Request, Response, NextFunction } from "express";
import vacationService from "../5-services/vacation-service";
import VacationModel from "../2-models/vacation-model";
import imageHandler from "../4-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

//GET http://localhost:4000/api/vacations
router.get("/vacations", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationService.getAllVacation();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

//POST http://localhost:4000/api/vacations
router.post("/vacations", verifyAdmin ,  async (request: Request, response: Response, next: NextFunction) => {
    try {

        //Take image if exist - ? not sure that user send 
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);

        const addedVacation = await vacationService.addNewVacation(vacation);

        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//PUT http://localhost:4000/api/vacations/:id
router.put("/vacations/:id([0-9]+)", verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;

        //Take image if exist - ? not sure that user send 
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);

        const updateVacation = await vacationService.updateVacation(vacation);

        response.json(updateVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//DELETE http://localhost:4000/api/vacations/:id
router.delete("/vacations/:id([0-9]+)", verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;

        const vacation = new VacationModel(request.body);

        await vacationService.deleteVacation(id);

        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

//Get a image  
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);//To get full path and send me the file
        
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
