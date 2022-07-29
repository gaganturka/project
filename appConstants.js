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
  rescheduled:"rescheduled",
  completed:"completed",
  rejected:"rejected"
};

const chatRoomStatus = {
  cancelled: "cancelled",
  confirmed: "confirmed",
  pending: "pending",
};
const pushNotificationMessage={
  title:"Send Notification From Borhan",
  bookAppointmentByUser:"Your request to book an appointment has successfully been sent to the expert.",
  bookAppointementsMessage:"Expert has accepted your request. Click and see the details.",
  expertCancelAppointment:"Appointment has been cancelled by the Expert.",
  expertRejetedAppointment:" Expert has rejected your request to book an appointment. Please try another slot or expert.",
  WhenUserCancelsAnAppointment:"Appointment has been cancelled by the user.",
  WhenUserRequestsToRescheduleAnAppointment:"Your request has been successfully sent to reschedule an appointment"
}

module.exports = {
  role,
  activityStatus,
  accountType,
  appointmentType,
  appointmentStatus,
  chatRoomStatus,
  checkfavExpert,
  pushNotificationMessage,
};
