import { v4 as uuidv4 } from 'uuid';

class User{
    constructor(
        Id = uuidv4(),
        Name = "",
        Token = "",
        CurrentProfile = null,
        Profiles = [],        
    ){
        this.Id = Id;
        this.Name = Name;
        this.Token = Token;
        this.CurrentProfile = CurrentProfile;
        this.Profiles = Profiles;
    }
}

export default User;