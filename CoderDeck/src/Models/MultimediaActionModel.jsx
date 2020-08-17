import BaseAction from './BaseActionModel';
import MultimediaActions from '../Constants/CoderDeckConstants';

class MultimediaAction extends BaseAction{
    constructor(
        MediaAction = MultimediaActions
    ){
        super();

        this.MediaAction = MediaAction;
    }
}

export default MultimediaAction;
