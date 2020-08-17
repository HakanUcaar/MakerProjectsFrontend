const SystemComponentsKeys = {
    HotKey : 1,
    SwitchHotkey : 2,
    WebSite : 3,
    FileOpen : 4,
    Multimedia : 5
}

const SystemComponentsKeysTurkce = {
    "Kısayol" : 1,
    "Seçimli Kısayol": 2,
    "Website" : 3,
    "Aç" : 4,
    "Multimedya" : 5
}

const MultimediaActions={
    Next : 1,
    Back : 2,
    Start : 3,
    Stop : 4,
    Pause : 5
}

const ComPorts ={
    COM1 : 1,
    COM2 : 2,
    COM3 : 3,
    COM4 : 4,
    COM5 : 5,
    COM6 : 6,
}

const Paritys={
    None : 0,
    Odd : 1,
    Even : 2,
    Mark : 3,
    Space : 4
}

module.exports={
    'SystemComponentsKeys':SystemComponentsKeys,
    'SystemComponentsKeysTurkce':SystemComponentsKeysTurkce,
    'MultimediaActions':MultimediaActions,
    'ComPorts':ComPorts,
    'Paritys':Paritys,

}