import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";



//Create global secretKey - use in create token and check token
const secretKey = "The Amazing Vacation Project!!";

//create new token:- Give me your user and I get you the token.
function createToken(user: UserModel): string {

    // create container containing the user: אובייקט שבתוכו יש את היוזר - container
    const container = { user };

    //Create options:
    const options = { expiresIn: "3h"};

    //Create token: - 3 items:container, secretKey, options: I need in secretKey to be sure that is token שייך to my server:
    //I need library to create token
    const token = jwt.sign(container, secretKey, options);

    //Return token 
    return token;

}

//The token is in a header named authorization that in a request
//Check if token is correct
async function verifyToken(request: Request): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {

        //Extract header
        const header = request.header("authorization");//"Bearer the-token"
        
        //If not header
        if(!header) {
            reject(new UnauthorizedError("Incorrect email or password"));
            return;
        };

        //Extract token
        const token = header.substring(7);

        //If not token
        if(!token) {
            reject(new UnauthorizedError("Incorrect email or password"));
            return;
        }
        //verify - when I check the token i need to give a secret key
        jwt.verify(token, secretKey, err => {
            if(err){
                reject (new UnauthorizedError("Invalid token"));
                return;
            }
            //All is good:
            resolve(true);
        });

    });

};

//function to check the token what is the role if admin or user
async function verifyAdmin(request: Request): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {

            //Extract header
            const header = request.header("authorization");

            //If no header - validation
            if(!header) {
                reject(new UnauthorizedError("Incorrect email or password"));
                return;
            };

            //Extract token - from seven index
            const token = header.substring(7);
            
            //If not token
            if(!token) {
                reject(new UnauthorizedError("Incorrect email or password"));
                return;
            };

            //verify token - 1. פג תוקף 2. לא תקין
            jwt.verify(token, secretKey,(err , container: { user: UserModel }) => {
                if(err) {
                    reject(new UnauthorizedError("Invalid token"));
                    return;
                }
                //Extract user from token
                const user = container.user;

                //Extract roleId 
                if(user.roleId !== RoleModel.Admin) {
                    reject(new UnauthorizedError("Access denied"));
                    return;
                }
                //All good 
                resolve(true);
            })
            
        })
}


export default {
    createToken,
    verifyToken,
    verifyAdmin

}