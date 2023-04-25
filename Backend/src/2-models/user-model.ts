import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./client-errors";

class UserModel {

public userId: number;
public firstName: string;
public lastName: string;
public email: string;
public password: string;
public roleId: RoleModel;

public constructor(user: UserModel){

    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;

}

private static validationSchema = Joi.object({
    userId: Joi.number().forbidden().positive().integer().optional(),
    firstName: Joi.string().required().min(2).max(50),
    lastName:Joi.string().required().min(2).max(100),
    email:Joi.string().required().email(),
    password:Joi.string().min(4).required(),
    roleId: Joi.number().forbidden().required()

})


public validateRegister(): void {
    
        const result = UserModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);

    };  

}

export default UserModel;