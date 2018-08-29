export class UserAccount {
    constructor(
        public sUserID: string,//student code
        public sUserName: string,
        public sPassword: string,
        public sUserCode: string,//user code from TM_User
        public sFullName: string,
        public sFirstName: string,
        public sLastName: string,
        public sSex: string,
        public cUserType: string,
        public sClassNo: string,
        public sEmail: string,
        public sTel: string,
        public sSysFileNameImage: string,
        public cStatus: string,
        public cStatusEducation: string,
        public cStatusEduated: string,
        public isEduated: boolean,
        public sPIN: string,
        public sSession: string,
        public sToken: string,
        public sPlatform: string,
        //result
        public sResult: string,
        public sMsg1: string,
        public sMsg2: string,
        public sMsg3: string,
    ) { }
}
export class PersonProfile {
    constructor(
         public Code:string,
         public Fullname :string,
         public DepartmentName :string,
         public Email :string ,
         public ImagePath :string,
    ){}
}
export class StudentProfile {
    constructor(
        public Code:string,
        public Fullname :string,
        public ClassNo :string,
        public Email :string,
        public ImagePath :string
    ){}
}
export class Notification {
    constructor(
        public nNotiID: string,
        public sUserCode: string,
        public sTitle: string,
        public sMsg: string,
        public cNotiType: string,
        public cSend: string,
        public cRead: string,
        public dDatate: Date,
    ){}
}