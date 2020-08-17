const notifier = window.require('mail-notifier');

class StartUp{
    IsConnected = false;

    constructor(){
        if (StartUp.instence instanceof StartUp) {
            return StartUp.instence;
        }

        StartUp.instence = this;
    }    

    StartImapServices(ImapModel) {
        if (ImapModel != null) {
            notifier(
                {
                    user: ImapModel.UserName,
                    password: ImapModel.Password,
                    host: ImapModel.Host,
                    port: 993, // imap port
                    tls: true,// use secure connection
                    tlsOptions: { rejectUnauthorized: false }
                }
            )
            .on('end', () => notifier.start()) 
            .on('mail', mail => console.log(mail))
            .start();

            notifier.on('error',function(err){
                this.IsConnected = false;
            });

            this.IsConnected = true;
            console.log(this.IsConnected);
        }
        return notifier;
    
    }
    StopImapServices(){
        notifier.stop();
    }
    // StartSerialPort(){
    //     const port = new SerialPort("COM3", { baudRate: 9600 });
    //     port.open(function (err) {
    //         if (err) {
    //           return console.log('Error opening port: ', err.message)
    //         }
          
    //         // Because there's no callback to write, write errors will be emitted on the port:
    //         port.write('main screen turn on')
    //       })
    // }
}

export default StartUp;

// module.exports = {
//     StartUp :"StartUp"
// }