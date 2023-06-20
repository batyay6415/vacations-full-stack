import Joi from "joi";
import { ValidationError } from "./client-errors";

class FollowerModel {

    public userId: number;
    public vacationId: number;

    public constructor(userId: number, vacationId: number) {

        this.userId = userId;
        this.vacationId = vacationId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().optional().positive().integer()
    })

    public validate(): void {
        const result = FollowerModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

export default FollowerModel;