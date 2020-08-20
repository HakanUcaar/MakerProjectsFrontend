import { v4 as uuidv4 } from 'uuid';
import ImapModel from './ImapModel';
import MailListModel from './MailListModel';
import MailModel from './MailModel';
import ArduinoInfoModel from './ArduinoInfoModel';

class SettingsModel{
    constructor(
        Id = uuidv4(),
        Imap = new ImapModel(),
        Maillist = new MailListModel(),
        CurrentMail = new MailModel(),
        ArduinoInfo = new ArduinoInfoModel()
    ){
        this.Id = Id;
        this.Imap = Imap;
        this.Maillist = Maillist;
        this.CurrentMail = CurrentMail;
        this.ArduinoInfo = ArduinoInfo;
    }
}

export default SettingsModel;