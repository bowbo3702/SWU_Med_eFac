
export class Schedule {
    constructor(
        public sResult: string,
        public sMsg1: string,
        public sMsg2: string,
        public sMsg3: string, 
        public lstSchedule : Schedule_Calendar[]
    ){}
}
export class Schedule_Calendar {
    constructor(
        public nScheduleID: number,
        public nClass: number, 
        public cCanSwap: string, 
        public sCourseCode: string, 
        public sCourseName: string,
        public dDateTimeStart: Date,
        public dDateTimeEnd: Date,
        public sHospitalName: string,
        public sUniversityName: string,
        public sBuildingName: string, 
        public sRoomName: string,
        public nLearnTypeID: string,
        public sScheduleType: string,
        public sLearnTypeName: string,
        public sGroupName: string,
        public sPersonnel_ID_PBL: string,
        public sPersonnelName_PBL: string,
    ){}
}
export class ScheduleEvent {
    constructor(
        public title:String,
        public startTime: Date, 
        public endTime:  Date,
        public allDay: boolean,
        public cEventType: string,
        public sCourseCode:string,
        public sCourseName:string ,
        public sTeacherName:string,
        public sScheduleType:string,
        public sLernType:string,
        public sScheduleID:string,
        public markDisabled :any,
        public sUniversity:string,
        public sBuilding:string,
        public sClassRoom:string,
    ){}
}

export class ST_Schedule_Calendar_Topic {
    constructor(
        public nTopicNo : number,
        public sTopicName:String,
        public lstTopicFile:ST_Schedule_Calendar_Topic_File[],
    ){}
}
export class ST_Schedule_Calendar_Personnel {
    constructor(
        public sPersonnelName:String,
        public sPersonnelID:String,
    ){}
}
export class ST_Schedule_Calendar_Topic_File {
    constructor(
         public nScheduleTopicFileID : number,
        public nTopicNo : number,
        public nTopicFileNo : number,
        public sFileName:String,
        public sSysFileName:String,
        public sPath:String,
        public sLink:String,
        public cType:String,
    ){}
}
export class Schedule_Detail {
    constructor(
        public sResult: string,
        public sMsg1: string,
        public sMsg2: string,
        public sMsg3: string,  
        public Schedule : Schedule_Calendar,
        public lstSchedulePerson : ST_Schedule_Calendar_Personnel[],
        public lstSchedulePersonReplace : ST_Schedule_Calendar_Personnel[],
        public lstScheduleTopic : ST_Schedule_Calendar_Topic[],
    ){}
}