import { v4 as uuidv4 } from 'uuid';

class ImapModel{
    constructor(
        Id = uuidv4(),
        Host = "" ,
        UserName = "",
        Password = ""
    ){
        this.Id = Id;
        this.Host = Host;
        this.UserName = UserName;
        this.Password = Password;
    }
}

export default ImapModel;