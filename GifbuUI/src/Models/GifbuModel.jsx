import ArduinoMachine from '../Models/ArduinoMachineModel';

class Gifbu{
    constructor(
        Message = "",
        ImagePath = "",
        Machine = new ArduinoMachine(), 
    ){
        this.Message = Message;
        this.ImagePath = ImagePath;
        this.Machine = Machine;
    }   
}

export default Gifbu;