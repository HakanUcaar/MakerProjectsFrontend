import BaseAction from './BaseActionModel';

class WebSiteAction extends BaseAction{
    constructor(
        Website = ""
    ){
        super();

        this.Website = Website;
    }
}

export default WebSiteAction;
