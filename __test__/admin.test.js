import request from "supertest";
import { server } from "../src/";
test("should register admin account", async () => {
    await request(server)
        .post("/api/v1/admin/login")
        .send({
            username: "admin",
            password: "123456",
        })
        .expect(200);
});
