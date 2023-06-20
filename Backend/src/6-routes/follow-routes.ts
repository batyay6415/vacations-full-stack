import express, { Request, Response, NextFunction } from "express";
import FollowerModel from "../2-models/follower-model";
import followService from "../5-services/follow-service";
import cyber from "../4-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-logged-in";

const router = express.Router();

//add follow to this vacation---
//POST http://localhost:3001/api/vacations/follow/:vacationId 
router.post("/vacations/follow/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = cyber.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const follow = new FollowerModel(userId, vacationId);
        const addedFollow = await followService.addFollow(follow);
        response.status(201).json(addedFollow);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/vacations/follow/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = cyber.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const deleteFollow = new FollowerModel(userId, vacationId);
        await followService.deleteFollow(deleteFollow);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;