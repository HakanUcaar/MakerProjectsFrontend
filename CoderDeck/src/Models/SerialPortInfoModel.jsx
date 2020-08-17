import {ComPorts,Paritys} from '../Constants/CoderDeckConstants';

class SerialPort{
    constructor(
        PortName = ComPorts.COM3,
        BaudRate = 9600,
        Parity = Paritys.None,
        Image = "",
    ){
        this.PortName = PortName;
        this.BaudRate = BaudRate;
        this.Parity = Parity;
    }
}

export default SerialPort;
