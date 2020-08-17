import { v4 as uuidv4 } from 'uuid';

class MailModel{
    constructor(
        Id = uuidv4(),
        Subject = "" ,
        Html = "",
        FromName = "",
        FromAdress = "",
        Date = ""
    ){
        this.Id = Id;
        this.Subject =Subject;
        this.Html = Html;
        this.FromName = FromName;
        this.FromAdress = FromAdress;
        this.Date = Date;
    }
}

export default MailModel;