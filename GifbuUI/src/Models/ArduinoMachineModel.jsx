import { v4 as uuidv4 } from 'uuid';
import {ComPorts,Paritys} from './SerialPortConstants';

class ArduinoMachine{
    constructor(
        Id = uuidv4(),
        PortName = "COM"+ComPorts.COM3.toString(),
        BaudRate = 9600,
        Parity = Paritys.None
    ){
        this.Id = Id;
        this.PortName = PortName;
        this.BaudRate = BaudRate;
        this.Parity = Parity;
    }
}

export default ArduinoMachine;