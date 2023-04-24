import RoleModel from "./role-model";

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

//TO DO validation

}

export default UserModel;