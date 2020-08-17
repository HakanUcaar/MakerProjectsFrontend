import { v4 as uuidv4 } from 'uuid';

class BaseAction{
    constructor(
        Id = uuidv4(),
        Name = "",
        Position = -1,
        Image = "",
    ){
        this.Id = Id;
        this.Name = Name;
        this.Position = Position;
        this.Image = Image;
    }
}

export default BaseAction;
