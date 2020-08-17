import BaseAction from './BaseActionModel';

class OpenFileAction extends BaseAction{
    constructor(
        FilePath = ""
    ){
        super();

        this.FilePath = FilePath;
    }
}

export default OpenFileAction;
