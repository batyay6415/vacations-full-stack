import { describe } from "mocha";
import app from "../src/app";
import supertest from "supertest";
import { expect } from "chai";

//Multiple this is function that collect all my test 
describe("Testing vacations-routes.ts", () => {

    //Single testing--
    // it("should return vacations when logged in" , async () => {
    //     const credentials = {
    //         email: 'noa215@gmail.com',
    //         password: 'noa215',
    //     };

    //     const response = await supertest(app.server)
    //     .get("/api/vacations")
    //     .set(credentials);
    //     const vacations = response.body
    //     expect(vacations.length).to.be.greaterThanOrEqual(12);
    //     expect(response.statusCode).to.be.equal(200);
    // })

    it("should return one vacation", async () => {
        const response = await supertest(app.server)
        .get("/api/vacations/3")
        .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkJhdHlhIiwibGFzdE5hbWUiOiJZZXJ1c2hhbG1pIiwiZW1haWwiOiJiYXR5YTY0MTVAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjg2MDc2MzA0LCJleHAiOjE2ODYwODcxMDR9.IiIs4U5CBwp9cZt_hInF45IsbfHSoesFEQR0cjJlFCo")
        // .auth("batya6415@gmail.com", "by3698");
        const vacation = response.body;
        expect(vacation).to.not.be.empty;
        expect(response.statusCode).to.be.equal(200);
    });



})




