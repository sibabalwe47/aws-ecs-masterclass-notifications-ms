import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

export const SES_CLIENT = new SESClient({
  region: process.env.ENVIRONMENT_REGION,
});

export const sendEmailHandler = async ({ sourceEmailAddress, toEmailAddresses, messageBody, emailSubject }) => {
  try {

    console.log("sourceEmailAddress::", sourceEmailAddress);
    console.log("toEmailAddresses::", toEmailAddresses);
    console.log("messageBody::", messageBody);
    console.log("emailSubject::", emailSubject)

    const result = await SES_CLIENT.send(
      new SendEmailCommand({
        Source: sourceEmailAddress,
        Destination: {
          ToAddresses: [
            toEmailAddresses
          ]
        },
        Message: {
          Subject: {
            Data: emailSubject,
            Charset: "UTF-8"
          },
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: messageBody
            }
          }
        }
      })
    )

    return {
      statusCode: result["$metadata"].httpStatusCode,
      success: true,
    };
  } catch (error) {
    throw {
      statusCode: error["$metadata"].httpStatusCode,
      message: error && error.message ? error.message : "Unknown error.",
      type: error && error.__type,
    };
  }
};
