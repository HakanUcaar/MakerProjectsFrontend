import BaseAction from './BaseActionModel';
import HotKeyAction from './HotKeyActionModel';

class HotKeySwitchAction extends BaseAction{
    constructor(
        HotKey1 = new HotKeyAction(),
        HotKey2 = new HotKeyAction()
    ){
        super();
        this.HotKey1 = HotKey1;
        this.HotKey2 = HotKey2;
    }
}

export default HotKeySwitchAction;
