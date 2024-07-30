import * as sesProvider from "../libs/ses/index.js";
import * as Logger from "../utils/logger.js";


const sendNotification = async (req, res) => {
  try {

    const { sourceEmailAddress, toEmailAddresses, messageBody, emailSubject } = req.body;
    console.log("REQUEST_BODY::", req.body)

    const result = await sesProvider.sendEmailHandler({ sourceEmailAddress, toEmailAddresses, messageBody, emailSubject });

    Logger.writeLog({
      url: req.url,
      body: req.body,
      result: result,
    });

    res.status(200).json({
      message: `Notification to ${toEmailAddresses} sent out successfully!`,
    });

  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};


const healthCheck = async(req, res) => {
  Logger.writeLog({
    url: req.url,
    result: "OK",
    msg: "Notifications service is healthy",
  });
  res.status(200).json({
    message: "OK",
  });
}


export default {
  sendNotification,
  healthCheck
};
