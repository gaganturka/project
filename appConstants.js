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
};

const chatRoomStatus = {
  cancelled: "cancelled",
  confirmed: "confirmed",
  pending: "pending",
};

module.exports = {
  role,
  activityStatus,
  accountType,
  appointmentType,
  appointmentStatus,
  chatRoomStatus,
  checkfavExpert,
};
