import { OkPacket } from "mysql";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import FollowerModel from "../2-models/follower-model";
import dal from "../4-utils/dal";


//Add follower
async function addFollow(follow: FollowerModel): Promise<FollowerModel> {

    //Validation: - Joi - about post 
    follow.validate();

    // add the follower connection in the DB
    const sql = `INSERT INTO follows VALUES (?, ?)`;

    await dal.execute(sql, [follow.userId, follow.vacationId]);

    return follow;
};


//Delete follower
async function deleteFollow(follow: FollowerModel): Promise<void> {

    // delete the follower connection in the DB
    const sql = `DELETE FROM follows WHERE userId = ? AND vacationId =?`;

    const result: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId]);

    // make sure the update was registered
    if (result.affectedRows === 0) throw new ResourceNotFoundError(follow.vacationId);
};



export default {
    addFollow,
    deleteFollow
}

