import sendEmail from "../utils/sendMail.js";

export const defaultEmailSend = async (req, res) => {

    try {
        //get email information
        const { to, subject, text } = req.body;

        //destination email check
        if (!to) {
            return res.status(404).json({
                message: "No Destianton Email Was Provided. Please Add A Destioantion Email"
            })
        }

        //email subject check
        if (!subject) {
            return res.status(404).json({
                message: "Subject Is Missing. Please Provide A Subject"
            })
        }

        //email body check
        if (!text) {
            return res.status(404).json({
                message: "Email Body Is Missing. Please Provide An Email Body"
            })
        }

        //send email 
        await sendEmail(
            to,
            subject,
            text
        )

        res.status(201).json({
            success: true,
            message: "Email Sent successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}