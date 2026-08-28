import request from "supertest";
import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/utils/sendMail.js", () => ({
    default: jest.fn(),
}));

const { default: sendEmail } =
    await import("../src/utils/sendMail.js");

const { default: app } =
    await import("../src/server.js");


describe("Email API", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("should send email successfully", async () => {

        sendEmail.mockResolvedValue({
            messageId: "test-message-id",
        });

        const response = await request(app)
            .post("/api/email/send/default-email")
            .send({
                to: "test@example.com",
                subject: "Test Email",
                text: "This is a test email",
            });


        expect(response.statusCode).toBe(201);

        expect(response.body).toEqual({
            success: true,
            message: "Email Sent successfully",
        });

        expect(sendEmail).toHaveBeenCalledWith(
            "test@example.com",
            "Test Email",
            "This is a test email"
        );

        expect(sendEmail).toHaveBeenCalledTimes(1);
    });


    test("should return 400 when destination email is missing", async () => {

        const response = await request(app)
            .post("/api/email/send/default-email")
            .send({
                subject: "Test Email",
                text: "This is a test email",
            });


        expect(response.statusCode).toBe(400);

        expect(response.body).toEqual({
            message:
                "No Destianton Email Was Provided. Please Add A Destioantion Email",
        });

        expect(sendEmail).not.toHaveBeenCalled();
    });


    test("should return 400 when subject is missing", async () => {

        const response = await request(app)
            .post("/api/email/send/default-email")
            .send({
                to: "test@example.com",
                text: "This is a test email",
            });


        expect(response.statusCode).toBe(400);

        expect(response.body).toEqual({
            message:
                "Subject Is Missing. Please Provide A Subject",
        });

        expect(sendEmail).not.toHaveBeenCalled();
    });


    test("should return 400 when email body is missing", async () => {

        const response = await request(app)
            .post("/api/email/send/default-email")
            .send({
                to: "test@example.com",
                subject: "Test Email",
            });


        expect(response.statusCode).toBe(400);

        expect(response.body).toEqual({
            message:
                "Email Body Is Missing. Please Provide An Email Body",
        });

        expect(sendEmail).not.toHaveBeenCalled();
    });


    test("should return 500 when email sending fails", async () => {

        sendEmail.mockRejectedValue(
            new Error("SMTP connection failed")
        );

        const response = await request(app)
            .post("/api/email/send/default-email")
            .send({
                to: "test@example.com",
                subject: "Test Email",
                text: "This is a test email",
            });


        expect(response.statusCode).toBe(500);

        expect(response.body).toEqual({
            success: false,
            message: "SMTP connection failed",
        });

        expect(sendEmail).toHaveBeenCalledTimes(1);
    });

});