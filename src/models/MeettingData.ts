export class MeettingData {
    constructor(
        public nMeetingID, public nProjectID, public sMeetingName, public cMeetingCategory, public cMeetingType, public cMeetingTerm
        , public cMeetingInvite, public cPoster, public sDescription, public cRegistrationFee, public nRegistrationFee, public sTelephone
        , public sEmail, public cStatus, public cDel, public sCreate, public dCreate, public sUpdate, public dUpdate, public cDuplicate
        , public cFood, public nHour

        , public nMeetingDetailID, public dMeeting, public tStart, public tEnd, public sMeetingDetailName
        , public nRoom_ID, public nGuestAll, public nGuestIslam, public nGuestVegetarian
        , public cRest, public sRestName, public sPath, public sFileName, public sSysFileName, public cSendMailAll, public cCar
        , public sDescription_Detail, public cTeleconference, public nTeleconferenceHead, public nTeleconferenceRoom

        , public nMeetingDetailGuestID, public sGuestID, public sGuestName
        , public nRoleType, public nDepartmentType, public nMajorID, public nSubMajorID, public sMajorName, public sGuestEmail
        , public nPostponeID, public cGuestStatus, public sDetailDescription, public cStatusSendMail, public cInviteByAdmin
        , public dSignIn, public dSignOut, public sPartner, public sDelegateID, public sDelegateName, public sDelegateEmail
        , public cDelegateStatus, public sDelegateDescription, public nFoodID, public nDessertID, public cJoinCar
        , public nPreTest_Score, public nPreTest_ScoreMax, public nPostTest_Score, public nPostTest_ScoreMax
    ) { }

}

export class Person_Meeting {
    constructor(
        public Personnel_ID, public Name
    ) { }

}