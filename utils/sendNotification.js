
const { admin } = require("./pushNotificationFirebase");
const APP_CONSTANTS = require("../appConstants");
const responseMessages = require("../resources/response.json");
const universalFunctions = require("./universalFunctions");
const sendNotification=(userDetails,status)=>{

    userDetails && userDetails &&
          userDetails.token &&
          userDetails.token.map((val1) => {
            val1.deviceType.map((ele) => {
              console.log("this is device type", ele)
              if (ele == "3") {
                if(status=="confirmed")
                {
                message = {
                  notification: {
                    title: APP_CONSTANTS.pushNotificationMessage.title,
                    body: APP_CONSTANTS.pushNotificationMessage.acceptedRequestByExpert,
                  },
                }
               }
            else if(status=="rejected"){
                
                    message = {
                      notification: {
                        title: APP_CONSTANTS.pushNotificationMessage.title,
                        body: APP_CONSTANTS.pushNotificationMessage.expertRejetedAppointment,
                      },
                    }
              }
              else if(status=="cancelled")
              {
                message = {
                    notification: {
                      title: APP_CONSTANTS.pushNotificationMessage.title,
                      body: APP_CONSTANTS.pushNotificationMessage.expertCancelAppointment,
                    },
                  }
              }
              else
              {
                console.log("No status")
              }

                admin
                  .messaging()
                  .sendToDevice(val1.deviceToken, message)
                  .then((response) => {
                    console.log("Send Notification Success", response)
                    // return null;
                   
                  })
                  .catch((error) => {
                    console.log("Error sending message:", error);
                  });
              }
              else {
                if(status=="confirmed")
                {
                message = {
                  data: {
                    title: APP_CONSTANTS.pushNotificationMessage.title,
                    body: APP_CONSTANTS.pushNotificationMessage.acceptedRequestByExpert,
                  },
                }
               }
             else if(status=="rejected"){
                
                    message = {
                      data: {
                        title: APP_CONSTANTS.pushNotificationMessage.title,
                        body: APP_CONSTANTS.pushNotificationMessage.expertRejetedAppointment,
                      },
                    }
              }
              else if(status=="cancelled")
              {
                message = {
                    data: {
                      title: APP_CONSTANTS.pushNotificationMessage.title,
                      body: APP_CONSTANTS.pushNotificationMessage.expertCancelAppointment,
                    },
                  }
              }
              else
              {
                console.log("No Status")
              }
                admin
                  .messaging()
                  .sendToDevice(val1.deviceToken, message)
                  .then((response) => {
                    console.log("Send Notification Success", response)
                    return null;
                  })
                  .catch((error) => {
                    console.log("Error sending message:", error);
                  });

              }
            })

          })
}
module.exports = {sendNotification}

