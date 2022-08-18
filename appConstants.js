const role = {
  admin: "admin",
  expert: "expert",
  borhanuser: "borhanuser",
};
const activityStatus = {
  active: "Active",
  busy: "Busy",
  unavailable: "Unavailable",
};
const accountType = {
  freelancer: "freelancer",
  expert: "expert",
};

const appointmentType = {
  audio: "audio",
  video: "video",
};
const checkfavExpert = 1;

const appointmentStatus = {
  cancelled: "cancelled",
  confirmed: "confirmed",
  pending: "pending",
  rescheduled: "rescheduled",
  completed: "completed",
  rejected: "rejected",
};

const chatRoomStatus = {
  cancelled: "cancelled",
  confirmed: "confirmed",
  pending: "pending",
};
const pushNotificationMessage = {
  title: "Send Notification From Borhan",
  bookAppointmentByUser:
    "Your request to book an appointment has successfully.",
  acceptedRequestByExpert:
    "Expert has accepted your request. Click and see the details.",
  expertCancelAppointment: "Appointment has been cancelled by the Expert.",
  expertRejetedAppointment:
    " Expert has rejected your request to book an appointment. Please try another slot or expert.",
  WhenUserCancelsAnAppointment: "Appointment has been cancelled by the user.",
  WhenUserRequestsToRescheduleAnAppointment:
    "Your request has been successfully sent to reschedule an appointment",
};

const thwani = {
  testing_secret_key: "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et",
  testing_publishable_key: "HGvTMLDssJghr9tlN9gr4DVYt0qyBy",
  testing_url: "https://uatcheckout.thawani.om/api/v1/",
};

const paymentType = {
  subscription: "subscription",
  oneTimePayment: "adHoc",
};

const subscriptionType = {
  silver: { name: "silver", duration: "1month", value: 1000 },
  gold: { name: "gold", duration: "2months", value: 1500 },
  platinum: { name: "platinum", duration: "3months", value: 1700 },
};

const currency = {
  display: "$",
  value: "USD",
};

const paymentStatus = {
  Success: "success",
  Failed: "failed",
  Processing: "processing",
};

let nodemailerAuth = {
  host: "smtp.office365.com",
  port: 587,
  secure: true,
  auth: {
    user: "manpreetgoga2000@gmail.com",
    pass: "goga0001",
  },
};

let emailFrom = "manpreetgoga2000@gmail.com";

let contactUs = { subject: "Thanks For Contacting Us" };

let callType = {
  audio: { display: "Audio Call", value: "audio" },
  video: { display: "Video Call", value: "video" },
  chat: { display: "Chat", value: "chat" },
};

let callTimings = {
  quarterHour: { display: "15 Minutes", value: "15minutes" },
  halfHour: { display: "30 Minutes", value: "30minutes" },
  fullHour: { display: "1 Hour", value: "60minutes" },
};

module.exports = {
  role,
  activityStatus,
  accountType,
  appointmentType,
  appointmentStatus,
  chatRoomStatus,
  checkfavExpert,
  pushNotificationMessage,
  thwani,
  paymentType,
  subscriptionType,
  currency,
  paymentStatus,
  nodemailerAuth,
  emailFrom,
  contactUs,
  callType,
  callTimings
};
