import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import imageHandler from "../4-utils/image-handler";

// Get all vacations ---- to home-page for login or admin 
async function getAllVacation(userId: number): Promise<VacationModel[]> {

    // Create sql: 
    const sql = `SELECT DISTINCT
    V.*,CONCAT('${appConfig.imagesUrl}', V.imageName) AS imageUrl,
    EXISTS(SELECT * FROM follows WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN follows as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate`;

    const vacations = await dal.execute(sql, [userId]);

    return vacations;
}

//Get one vacation by vacationId
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    //get one vacation by id
    const sql = `SELECT
                        vacationId,
                        destination,
                        description,
                        startDate,
                        endDate,
                        price ,
                        CONCAT('${appConfig.imagesUrl}', imageName) AS imageUrl
                        FROM vacations
                        WHERE vacationId = ?`;

    const vacations = await dal.execute(sql, [vacationId]);

    const vacation = vacations[0];

    // validate if the vacation was returned:
    if (!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation;

};

//Add new vacation option to admin : 
async function addNewVacation(vacation: VacationModel): Promise<VacationModel> {

    //Validation: - Joi - about post 
    vacation.validatePost();

    let imageName = null;

    if (vacation.image) {

        //Save image:
        imageName = await imageHandler.saveImage(vacation.image);

        //Save back image url
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    //Create query----
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.startDate,
        vacation.endDate, vacation.price, imageName])

    vacation.vacationId = result.insertId;

    delete vacation.image;

    return vacation;

}

//Update vacation option to admin 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    //TODO : Validation joi
    vacation.validatePut();

    //Take original image name:
    let imageName = await getVacationImageName(vacation.vacationId);

    //If user send image to update
    if (vacation.image) {

        //Update image:
        imageName = await imageHandler.updateImage(vacation.image, imageName)

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

    //If vacation not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    //Remove image file from returned vacation:
    delete vacation.image;

    return vacation;

}

//Delete from array of vacation - option to admin  
async function deleteVacation(id: number): Promise<void> {

    //Take original image name:
    let imageName = await getVacationImageName(id);

    const sql = `DELETE FROM vacations WHERE vacationId = ? `;

    const result: OkPacket = await dal.execute(sql, [id]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);

    await imageHandler.deleteImage(imageName);

}

// Get product image name from db:
async function getVacationImageName(id: number): Promise<string> {

    // Create query: 
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ? `;

    // Get products: 
    const vacations = await dal.execute(sql, [id]);

    // Extract first product: 
    const vacation = vacations[0];

    // If id not found: 
    if (!vacation) return null;

    // Get image name: 
    const imageName = vacation.imageName;

    // Return: 
    return imageName;
}

export default {
    getAllVacation,
    getOneVacation,
    addNewVacation,
    updateVacation,
    deleteVacation,
};

