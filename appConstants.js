const firmEmployeeModules = [
    'user_management',
    'case_management',
    'activity_management'
];

const role = {
    admin: "admin",
    expert: "expert",
    borhanuser: "borhanuser",
    firmadmin: "firmadmin"
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
    testing_url: "https://uatcheckout.thawani.om",
};

const paymentType = {
    subscription: "subscription",
    oneTimePayment: "adHoc",
};

const subscriptionType = {
    silver: {name: "silver", duration: "1month", value: 1000},
    gold: {name: "gold", duration: "2months", value: 1500},
    platinum: {name: "platinum", duration: "3months", value: 1700},
};

const userTransactionType = {
    credit: "credit",
    debit: "debit",
};

const userPlanPaymentType = {
    subscription: "subscription",
    oneTimePayment: "oneTimePayment",
};

const currency = {
    display: "$",
    value: "USD",
};

const userPlanPaymentStatus = {
    cancelled: "cancelled",
    unpaid: "unpaid",
    paid: "paid",
};

const paymentStatus = {
    Success: "success",
    Failed: "failed",
    Processing: "processing",
    Pending: "pending",
};

let nodemailerAuth = {
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "sequeer@outlook.com",
        pass: "Tushar2022?",
    },
};

let emailFrom = "sequeer@outlook.com";

let contactUs = {subject: "Thanks For Contacting Us"};

let callType = {
    audio: {display: "Audio Call", value: "audio"},
    video: {display: "Video Call", value: "video"},
    chat: {display: "Chat", value: "chat"},
};

let callTimings = {
    quarterHour: {display: "15 Minutes", value: "15minutes"},
    halfHour: {display: "30 Minutes", value: "30minutes"},
    fullHour: {display: "1 Hour", value: "60minutes"},
};

let expertAndAdminEarning = {
    withoutSubscription: {expertInPercentage: 70, expertInDecimal: 0.7, adminInPercentage: 30, adminInDecimal: 0.3},
    withSubscription: {expertInPercentage: 75, expertInDecimal: 0.75, adminInPercentage: 25, adminInDecimal: 0.25}
}

const caseStatus = {
    opened: "opened",
    closed: "closed"
};

const firmEmployeeStatus = {
    active: "active",
    inactive: "inactive"
};

const contactTypes = [
    "Personal", "Business"
];

const courtTypes = [
    "Session Court", "High Court", "Supreme Court"
];

const officeTypes = [
    "Primary", "Secondary"
];

const caseBillingMethods = {
    hourly: "Hourly",
    contingency: "Contingency",
    flat: "Flat Fee",
    mixed: "Mix of Flat Fee and Hourly",
    pro_bono: "Pro Bono"
};

const activityRateTypes = [
    'hourly',
    'flat',
];

const PER_PAGE = 10;

module.exports = {
    courtTypes,
    officeTypes,
    PER_PAGE,
    role,
    contactTypes,
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
    caseStatus,
    currency,
    paymentStatus,
    nodemailerAuth,
    emailFrom,
    contactUs,
    callType,
    callTimings,
    userTransactionType,
    userPlanPaymentType,
    userPlanPaymentStatus,
    firmEmployeeStatus,
    expertAndAdminEarning,
    firmEmployeeModules,
    activityRateTypes
};
