import { expect } from "chai";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config();
const apiHost = process.env.API_HOST;
const endpoint = "ratings";

describe("POST", function () {
  it("POST add a new rating entry", async function () {
    return request(apiHost)
      .post(`${endpoint}?page=1&limit=2`)
      .set("Accept", "application/json")
      .send({
        company_name: "La Mater",
        //we set the salary to zero to avoid breaking the average-ratings tests
        //as the salary set -1 are not counted in the calculation of the average
        salary: 0,
        //we set the rating to zero to avoid breaking the average-ratings tests
        //as the rating set -1 are not counted in the calculation of the average
        rating: 0,
        comment: "my comment",
        seniority: "Seniority",
        city: "Maroua",
        //the country field is omitted here as we always set it to Cameroon for now
      })
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  it("POST add a new rating entry with lowercase cities, company_name, and jobtitle", async function () {
    return request(apiHost)
      .post(`${endpoint}?page=1&limit=2`)
      .set("Accept", "application/json")
      .send({
        company_name: "la mater",
        job_title: "technicien de surface",
        //we set the salary to zero to avoid breaking the average-ratings tests
        //as the salary set -1 are not counted in the calculation of the average
        salary: 0,
        //we set the rating to zero to avoid breaking the average-ratings tests
        //as the rating set -1 are not counted in the calculation of the average
        rating: 0,
        comment: "my comment",
        seniority: "Seniority",
        city: "maroua",
        //the country field is omitted here as we always set it to Cameroon for now
      })
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then(async () => {
        return request(apiHost)
          .get(`${endpoint}?limit=200`)
          .set("Accept", "application/json")
          .send()
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8")
          .then((res) => {
            const lastElem = res.body.hits.length - 1;
            const rating = JSON.stringify(res.body.hits[lastElem]);
            expect(rating).contains("La Mater");
            expect(rating).contains("Technicien De Surface");
            expect(rating).contains("Maroua");
          });
      });
  });
});
