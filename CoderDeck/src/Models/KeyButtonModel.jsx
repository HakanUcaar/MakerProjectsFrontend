import { v4 as uuidv4 } from 'uuid';

class KeyButton{
    constructor(
        Id = uuidv4(),
        Name = "",
        ActionType = -1,
        Action = null
    ){
        this.Id = Id;
        this.Name = Name;
        this.ActionType = ActionType;
        this.Action = Action;
    }
}

export default KeyButton;