import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import moment from "moment";
import { UserModel } from "../models/userModel.js";
import { doctorModel } from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { appointmentMail, sendMail } from "../helpers/sendMail.js";
//router object
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "User Already Exists" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  sendMail(
    email,
    "Welcome to Calendly!!!",
    `Hi, ${username}. Thank you for registering with us`,
    `<!DOCTYPE html>

    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css?family=Lato"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lora"
          rel="stylesheet"
          type="text/css"
        />
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
    
          body {
            margin: 0;
            padding: 0;
          }
    
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
    
          p {
            line-height: inherit;
          }
    
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
    
          .image_block img + div {
            display: none;
          }
    
          @media (max-width: 620px) {
            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
              display: inline-block !important;
            }
    
            .icons-inner {
              text-align: center;
            }
    
            .icons-inner td {
              margin: 0 auto;
            }
    
            .mobile_hide {
              display: none;
            }
    
            .row-content {
              width: 100% !important;
            }
    
            .stack .column {
              width: 100%;
              display: block;
            }
    
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
    
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      <body
        style="
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7f6f5;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #072b52;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <div
                                  class="spacer_block block-1"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <div
                                  class="spacer_block block-2"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7f6f5;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #fff;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <div
                                  class="spacer_block block-1"
                                  style="
                                    height: 35px;
                                    line-height: 35px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="heading_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="text-align: center; width: 100%"
                                    >
                                      <h1
                                        style="
                                          margin: 0;
                                          color: #072b52;
                                          direction: ltr;
                                          font-family: 'Lora', Georgia, serif;
                                          font-size: 42px;
                                          font-weight: normal;
                                          letter-spacing: 1px;
                                          line-height: 120%;
                                          text-align: center;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                          mso-line-height-alt: 60px;
                                        "
                                      >
                                        <strong>Registration Successful</strong>
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-3"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7f6f5;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #fff;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <div
                                  class="spacer_block block-1"
                                  style="
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="paragraph_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 15px;
                                        padding-right: 15px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #222222;
                                          font-family: 'Lato', Tahoma, Verdana,
                                            Segoe, sans-serif;
                                          font-size: 16px;
                                          line-height: 150%;
                                          text-align: center;
                                          mso-line-height-alt: 24px;
                                        "
                                      >
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span><strong>Hey there,</strong></span>
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span
                                            >Thank you for choosing calendly in
                                            booking your dream appointment.</span
                                          >
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span
                                            >It's a pleasure to have you as our
                                            user.</span
                                          >
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                           
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span
                                            >To login to your account you can refer
                                            to the login section and book your dream
                                            appointment with us.</span
                                          >
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div
                                  class="spacer_block block-3"
                                  style="
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-4"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7f6f5;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #fff;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <div
                                  class="spacer_block block-1"
                                  style="
                                    height: 25px;
                                    line-height: 25px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <table
                                  border="0"
                                  cellpadding="5"
                                  cellspacing="0"
                                  class="heading_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <h1
                                        style="
                                          margin: 0;
                                          color: #072b52;
                                          direction: ltr;
                                          font-family: 'Lora', Georgia, serif;
                                          font-size: 19px;
                                          font-weight: normal;
                                          letter-spacing: 1px;
                                          line-height: 120%;
                                          text-align: center;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                          mso-line-height-alt: 22.8px;
                                        "
                                      >
                                        <span class="tinyMce-placeholder"
                                          >Keep sharing with us by tagging
                                          <strong>#calendly</strong></span
                                        >
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                                <div
                                  class="spacer_block block-3"
                                  style="
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-5"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7f6f5;
                  "
                  width="100%"
                ></table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-6"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #f7f6f5;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-color: #072b52;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="paragraph_block block-1"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #f7f6f5;
                                          font-family: 'Lato', Tahoma, Verdana,
                                            Segoe, sans-serif;
                                          font-size: 12px;
                                          line-height: 120%;
                                          text-align: left;
                                          mso-line-height-alt: 14.399999999999999px;
                                        "
                                      >
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                           
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="paragraph_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #f7f6f5;
                                          font-family: 'Lato', Tahoma, Verdana,
                                            Segoe, sans-serif;
                                          font-size: 12px;
                                          line-height: 120%;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        "
                                      >
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <a
                                            href="http://www.example.com/"
                                            rel="noopener"
                                            style="
                                              text-decoration: underline;
                                              color: #f7f6f5;
                                            "
                                            target="_blank"
                                            title="http://www.example.com/"
                                            >Terms & Conditions</a
                                          >
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span style="color: #c0c0c0"
                                            ><br /><br
                                          /></span>
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          Calendly does the hard work for you!
                                          Everything you need to know is on one
                                          platform. You will receive guidance
                                          throughout the whole application
                                          process-all completely free. Get Started
                                          Now
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span style="color: #c0c0c0"
                                            ><br /><br
                                          /></span>
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          © Copyright 2024. All Rights Reserved.
                                        </p>
                                        <p
                                          style="margin: 0; word-break: break-word"
                                        >
                                          <span style="color: #c0c0c0"> </span>
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>
    
    
    `
  );
  return res.json({ status: true, message: "Registration Successful" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not Registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is Incorrect" });
  }
  const token = jwt.sign({ id: user._id }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Logged In Successfully", token });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your email@gmail.com",
        pass: "your pass key",
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: "your email@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error in sending Mail" });
      } else {
        return res.json({ status: true, message: "Email Sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/applyDoctor", authMiddleware, async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await UserModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "applyDoctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied for Interviewer Role`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    console.log(notification);
    await UserModel.findByIdAndUpdate(adminUser._id, { notification });
    res.json({ status: true, message: "Application Sent Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in applying for Interviewer Role",
    });
  }
});

router.post("/getUserData", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.json({ message: "User not registered" });
    } else {
      res.send({
        status: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error in userRoute middleware", error });
  }
});

router.post("/getNotifications", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    return res.json({
      status: true,
      message: "All Notifications Marked as Read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in sending Notifications",
    });
  }
});

router.post("/deleteNotifications", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    return res.json({
      status: true,
      message: "All Notifications Deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in deleting Notifications",
    });
  }
});

router.get("/getDoctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.send({
      status: true,
      message: "Interviewers List Data Found",
      data: doctors,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in getting all interviewers for user",
      error,
    });
  }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.date = moment(req.body.date).format("DD-MM-YYYY");
    const mailDate = req.body.date;
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await UserModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New Appointment request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    appointmentMail(
      "Your Booking was Successful",
      `Hello, your appointment for the date ${mailDate} and time ${req.body.time} was successful`,
      `<!DOCTYPE html>

      <html
        lang="en"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:v="urn:schemas-microsoft-com:vml"
      >
        <head>
          <title></title>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <!--[if mso
            ]><xml
              ><o:OfficeDocumentSettings
                ><o:PixelsPerInch>96</o:PixelsPerInch
                ><o:AllowPNG /></o:OfficeDocumentSettings></xml
          ><![endif]-->
          <!--[if !mso]><!-->
          <link
            href="https://fonts.googleapis.com/css?family=Lato"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lora"
            rel="stylesheet"
            type="text/css"
          />
          <!--<![endif]-->
          <style>
            * {
              box-sizing: border-box;
            }
      
            body {
              margin: 0;
              padding: 0;
            }
      
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
      
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
      
            p {
              line-height: inherit;
            }
      
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
      
            .image_block img + div {
              display: none;
            }
      
            @media (max-width: 620px) {
              .desktop_hide table.icons-inner,
              .social_block.desktop_hide .social-table {
                display: inline-block !important;
              }
      
              .icons-inner {
                text-align: center;
              }
      
              .icons-inner td {
                margin: 0 auto;
              }
      
              .mobile_hide {
                display: none;
              }
      
              .row-content {
                width: 100% !important;
              }
      
              .stack .column {
                width: 100%;
                display: block;
              }
      
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
      
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        <body
          style="
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
          "
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="nl-container"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #ffffff;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #f7f6f5;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #072b52;
                              color: #000000;
                              width: 600px;
                              margin: 0 auto;
                            "
                            width="600"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <div
                                    class="spacer_block block-1"
                                    style="
                                      height: 20px;
                                      line-height: 20px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                  <div
                                    class="spacer_block block-2"
                                    style="
                                      height: 20px;
                                      line-height: 20px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-2"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #f7f6f5;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #fff;
                              color: #000000;
                              width: 600px;
                              margin: 0 auto;
                            "
                            width="600"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <div
                                    class="spacer_block block-1"
                                    style="
                                      height: 35px;
                                      line-height: 35px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="heading_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="text-align: center; width: 100%"
                                      >
                                        <h1
                                          style="
                                            margin: 0;
                                            color: #072b52;
                                            direction: ltr;
                                            font-family: 'Lora', Georgia, serif;
                                            font-size: 50px;
                                            font-weight: normal;
                                            letter-spacing: 1px;
                                            line-height: 120%;
                                            text-align: center;
                                            margin-top: 0;
                                            margin-bottom: 0;
                                            mso-line-height-alt: 60px;
                                          "
                                        >
                                          <strong>thank you.</strong>
                                        </h1>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-3"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #f7f6f5;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #fff;
                              color: #000000;
                              width: 600px;
                              margin: 0 auto;
                            "
                            width="600"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <div
                                    class="spacer_block block-1"
                                    style="
                                      height: 30px;
                                      line-height: 30px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-bottom: 10px;
                                          padding-left: 15px;
                                          padding-right: 15px;
                                          padding-top: 10px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #222222;
                                            font-family: 'Lato', Tahoma, Verdana,
                                              Segoe, sans-serif;
                                            font-size: 16px;
                                            line-height: 150%;
                                            text-align: center;
                                            mso-line-height-alt: 24px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span><strong>Hey there,</strong></span>
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span
                                              >thank you for choosing calendly in
                                              booking your dream appointment.</span
                                            >
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span
                                              >It's a pleasure to have you as our
                                              user.</span
                                            >
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                             
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span
                                              >Your appointment for the date
                                              ${mailDate} of time ${req.body.time}
                                              was successful</span
                                            >
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span
                                              >and we hope to see you again
                                              soon.</span
                                            >
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <div
                                    class="spacer_block block-3"
                                    style="
                                      height: 30px;
                                      line-height: 30px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-4"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #f7f6f5;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #fff;
                              color: #000000;
                              width: 600px;
                              margin: 0 auto;
                            "
                            width="600"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <div
                                    class="spacer_block block-1"
                                    style="
                                      height: 25px;
                                      line-height: 25px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                  <table
                                    border="0"
                                    cellpadding="5"
                                    cellspacing="0"
                                    class="heading_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td class="pad">
                                        <h1
                                          style="
                                            margin: 0;
                                            color: #072b52;
                                            direction: ltr;
                                            font-family: 'Lora', Georgia, serif;
                                            font-size: 19px;
                                            font-weight: normal;
                                            letter-spacing: 1px;
                                            line-height: 120%;
                                            text-align: center;
                                            margin-top: 0;
                                            margin-bottom: 0;
                                            mso-line-height-alt: 22.8px;
                                          "
                                        >
                                          <span class="tinyMce-placeholder"
                                            >Keep sharing with us by tagging
                                            <strong>#calendly</strong></span
                                          >
                                        </h1>
                                      </td>
                                    </tr>
                                  </table>
                                  <div
                                    class="spacer_block block-3"
                                    style="
                                      height: 30px;
                                      line-height: 30px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-5"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #f7f6f5;
                    "
                    width="100%"
                  ></table>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row row-6"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #f7f6f5;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="row-content stack"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              background-color: #072b52;
                              color: #000000;
                              width: 600px;
                              margin: 0 auto;
                            "
                            width="600"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="column column-1"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    font-weight: 400;
                                    text-align: left;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    vertical-align: top;
                                    border-top: 0px;
                                    border-right: 0px;
                                    border-bottom: 0px;
                                    border-left: 0px;
                                  "
                                  width="100%"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-1"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-left: 10px;
                                          padding-right: 10px;
                                          padding-top: 10px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #f7f6f5;
                                            font-family: 'Lato', Tahoma, Verdana,
                                              Segoe, sans-serif;
                                            font-size: 12px;
                                            line-height: 120%;
                                            text-align: left;
                                            mso-line-height-alt: 14.399999999999999px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                             
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="paragraph_block block-2"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      word-break: break-word;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="pad"
                                        style="
                                          padding-bottom: 10px;
                                          padding-left: 10px;
                                          padding-right: 10px;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #f7f6f5;
                                            font-family: 'Lato', Tahoma, Verdana,
                                              Segoe, sans-serif;
                                            font-size: 12px;
                                            line-height: 120%;
                                            text-align: center;
                                            mso-line-height-alt: 14.399999999999999px;
                                          "
                                        >
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <a
                                              href="http://www.example.com/"
                                              rel="noopener"
                                              style="
                                                text-decoration: underline;
                                                color: #f7f6f5;
                                              "
                                              target="_blank"
                                              title="http://www.example.com/"
                                              >Terms & Conditions</a
                                            >
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span style="color: #c0c0c0"
                                              ><br /><br
                                            /></span>
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            Calendly does the hard work for you!
                                            Everything you need to know is on one
                                            platform. You will receive guidance
                                            throughout the whole application
                                            process-all completely free. Get Started
                                            Now
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span style="color: #c0c0c0"
                                              ><br /><br
                                            /></span>
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            © Copyright 2024. All Rights Reserved.
                                          </p>
                                          <p
                                            style="margin: 0; word-break: break-word"
                                          >
                                            <span style="color: #c0c0c0"> </span>
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End -->
        </body>
      </html>
      `
    );
    res.send({ status: true, message: "Appointment Booked Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in booking the appointments",
      error,
    });
  }
});

router.post("/booking-availability", authMiddleware, async (req, res) => {
  try {
    const date = req.body.date;
    const fromTime = moment(req.body.time, "HH:mm a").subtract(1, "hours");
    const toTime = moment(req.body.time, "HH:mm a").add(1, "hours");
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      res.send({ status: true, message: "Appointment Not Available " });
    } else {
      res.send({ status: true, message: "Appointment Available" });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in checking availability",
      error,
    });
  }
});

router.get("/userAppointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.send({
      status: true,
      message: "Your Appointments Fetched",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in fetching user appointments",
      error,
    });
  }
});

export { router as UserRouter };
