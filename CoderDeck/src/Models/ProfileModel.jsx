import { v4 as uuidv4 } from 'uuid';

class Profile{
    constructor(
        Id = uuidv4(),
        Name = "",
        Buttons = []
    ){
        this.Id = Id;
        this.Name = Name;
        this.Buttons = Buttons;
    }
}

export default Profile;