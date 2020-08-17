import BaseAction from './BaseActionModel';

class HotKeyAction extends BaseAction{
    constructor(
        CtrlKey = false,
        AltKey = false,
        Shiftkey = false,
        Keys=[]
    ){
        super();

        this.Keys = Keys;
    }
}

export default HotKeyAction;
