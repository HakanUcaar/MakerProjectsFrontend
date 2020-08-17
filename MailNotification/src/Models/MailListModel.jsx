import { v4 as uuidv4 } from 'uuid';

class MailListModel{
    constructor(
        Id = uuidv4(),
        MailList = []
    ){
        this.Id = Id;
        this.MailList =MailList;
    }
}

export default MailListModel;