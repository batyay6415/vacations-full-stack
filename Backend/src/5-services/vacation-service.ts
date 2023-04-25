import { ResourceNotFoundError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import imageHandler from "../4-utils/image-handler";

// Get all vacation ---- to home-page
async function getAllVacation(): Promise<VacationModel[]> {

    const sql = `SELECT
                    vacationId,
                    destination,
                    description ,
                    startDate,
                    endDate,
                    price,
                    CONCAT('${appConfig.imagesUrl}', imageName) AS imageUrl
                FROM vacations`;

    const vacations = await dal.execute(sql);

    return vacations;

}

//Add new vacation option to admin : 
async function addNewVacation(vacation: VacationModel): Promise<VacationModel> {

    //Validation: - Joi - about post 
    vacation.validatePost();

    let imageName = null;

    if(vacation.image){

        //Save image:
        imageName = await imageHandler.saveImage(vacation.image);

        //Save back image url
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    //Create query
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.startDate,
             vacation.endDate, vacation.price, imageName])

    vacation.vacationId = result.insertId;

    delete vacation.image;

    return vacation;

}

//Update vacation 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    //TODO : Validation joi
    vacation.validatePut();

    //Take original image name:
    let imageName = await getVacationImageName(vacation.vacationId);

    //If user send image to update
    if(vacation.image){

        //Update image:
        imageName = await imageHandler.updateImage(vacation.image , imageName)

    }
    //Set back Image url:
    vacation.imageUrl = appConfig.imagesUrl + imageName;
    
    // Create query: 
    const sql = `UPDATE vacations SET
        destination = ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ?
        WHERE vacationId = ? `;

    //Execute:
    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.startDate,
        vacation.endDate, vacation.price, imageName, vacation.vacationId])
    
    //If vacation not found
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    //Remove image file from returned vacation
    delete vacation.image;

    return vacation;

}
//Delete from array 
async function deleteVacation(id: number): Promise<void> {

    //Take original image name:
    let imageName = await getVacationImageName(id);

    const sql = `DELETE FROM vacations WHERE vacationId = ? `;

    const result: OkPacket = await dal.execute(sql, [id]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);

    await imageHandler.deleteImage(imageName);

}


async function getVacationImageName(id: number): Promise<string>{

    const sql = `SELECT imageName FROM vacations WHERE vacationId = ? `;

    const vacations = await dal.execute(sql , [id]);

    const vacation = vacations[0];

    if(!vacation) return null;

    const imageName = vacation.imageName;

    return imageName;

}


async function getVacationNotStart(date: string): Promise<VacationModel[]>{

    const sql = `SELECT * FROM vacations WHERE startDate > CURDATE()`;

    const vacations = await dal.execute(sql , [date]);

    return vacations;
}

async function gatVacationActive(): Promise<VacationModel[]>{

    const sql = `SELECT * FROM vacations WHERE startDate < CURDATE() AND endDate > CURDATE()`;

    const vacations = await dal.execute(sql);

    return vacations;
 
}

async function getVacationFollow(): Promise<VacationModel[]>{

    const sql = `SELECT * FROM vacations
    INNER JOIN followers ON items.id = followers.item_id
    WHERE followers.follower_id = 1 `;


    return null;
}


export default {
    getAllVacation,
    addNewVacation,
    updateVacation,
    deleteVacation,
    getVacationNotStart,
    gatVacationActive,
    getVacationFollow
};

