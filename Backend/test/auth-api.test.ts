// import { describe } from "mocha";
// import app from "../src/app";
// import supertest from "supertest";
// import { expect } from "chai";


// describe("Testing auth-routes.ts", () => {

//     it("should register a new user and return a token", async () => {

//         const user = {
//             firstName: "bart",
//             lastName: "simpson",
//             email: "barts@gmail.com",
//             password: "bar123"
//         };
//         const response = await supertest(app.server)
//             .post('/api/register')
//             .send(user);
//         expect(response.statusCode).to.be.equal(201);
//         expect(response.body).to.be.not.empty;

//     })

//     it('should authenticate a user and return a token', async () => {
//         const credentials = {
//             email: 'noa215@gmail.com',
//             password: 'noa215',
//         };

//         const response = await supertest(app.server)
//             .post('/api/login')
//             .send(credentials);

//         const token = response.body;
//         expect(response.statusCode).to.be.equal(201);
//         expect(token).to.not.be.empty;
//     });


// });







