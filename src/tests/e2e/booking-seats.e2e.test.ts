import { Application } from "express";
import request from "supertest";
import { container } from "../../infrastructure/config/dependency-injection";
import { testConferences } from "../unit/seeds/seeds-conference";
import { e2eConferences } from "./seeds/conference-e2e-seed";
import { e2eUsers } from "./seeds/user-e2e-seed";
import { TestApp } from "./utils/test-app";

describe("Usecase: Book a Seats", () => {
//   const conferenceRepository = container("conferenceRepository");

  let testApp: TestApp;
  let app: Application;

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup();
    await testApp.loadFixtures([e2eConferences.conference, e2eUsers.johnDoe]);
    app = testApp.expressApp;
  });

  afterAll(async () => {
    testApp.tearDown();
  });

  it("should book seat successfully", async () => {
    const response = await request(app)
      .post("/conference/book")
      .set("Authorization", e2eUsers.johnDoe.createAuthorizationToken())
      .send({
        conferenceId: testConferences.conference.props.id,
      });

    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual({ id: expect.any(String) });
  });
});
