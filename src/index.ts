import express from "express";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { Resend } from "resend";
import { mailTemplate } from "./utils/utils";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Sushans Londhe Contact api is up and running");
});

app.post(
  "/api/send-email",
  [
    body("email").notEmpty().isEmail(),
    body("message").notEmpty().isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, message } = await req.body;

      await resend.emails.send({
        from: "sushans portfolio site <onboarding@resend.dev>",
        to: "ballylondhe20@gmail.com",
        subject: "hello world",
        html: mailTemplate({ Email: email, Message: message }),
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Email sending failed please try again");
    }
  }
);

app.listen(8080, () => {
  console.log("Server is up and running on port 8080");
});
