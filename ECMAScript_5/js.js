function selectType(){ //ОТОБРАЖЕНИЕ ПОЛЕЙ СООТВ. ТИПА
    var type = $("#computerType option:selected").text();
    var serverElem = document.getElementsByClassName("server");
    var ultrabElem = document.getElementsByClassName("ultrabook");

    if (type === "Ультрабук"){
        for (var i=0; i < serverElem.length; i++){
            serverElem[i].classList.add("d-none");
        }
        for (var i=0; i < ultrabElem.length; i++){
            ultrabElem[i].classList.remove("d-none");
        }
    }
    else{
        for (var i=0; i < ultrabElem.length; i++){
            ultrabElem[i].classList.add("d-none");
        }
        for (var i=0; i < serverElem.length; i++){
            serverElem[i].classList.remove("d-none");
        }
    }
};
function cleanForm(){
    var elems = document.getElementsByTagName("input");
    for (var i = 0; i < elems.length; i++){
        if (elems[i].type == 'checkbox'){
            $('input:checked').prop('checked', false);
        }
        else{
            elems[i].value = "";
        };
    };
};
function validate(inputField){
    var reg;
    switch (inputField.id) {
        case 'producer':
            reg = /\w+|[а-я]/i;
            break;
        case 'OS':
            reg = /windows|linux|ios|(mac\s*os)|другая/i;
            break;
        case 'screenSize':
            reg = /[10-20]\d/;
            break;
        case 'RAM':
            reg = /1|2|4|8|16|32|64/;
            break;
        case 'processorAmount':
            reg = /[1-10]/;
            break;
        case 'clock':
            reg = /[1100-3700]/;
            break;
        case 'powerSupplyAmount':
            reg = /[1-10]/;
            break;
        case 'portsAmount':
            reg = /[1-10]\d/;
            break;    
    };
    if (!reg.test(inputField.value)){
        inputField.parentElement.classList.remove("has-success");
        inputField.parentElement.classList.add("has-danger");
        inputField.classList.remove("is-valid")
        inputField.classList.add("is-invalid");
    }
    else{
        inputField.parentElement.classList.add("has-success");
        inputField.parentElement.classList.remove("has-danger");
        inputField.classList.remove("is-invalid");
        inputField.classList.add("is-valid");
    };

    var type = $("#computerType option:selected").text();
    switch (type) {
        case 'Ультрабук':
            var t = 'ultrabook';
            break;
        case 'Вычислительный сервер':
            var t = 'server';
            break;
    };
    t += ' has-danger';
    if (document.getElementsByClassName(t).length == 0){
        document.getElementById("save").removeAttribute("disabled");
    }
};
//КЛАССЫ
function Computer(){
    var _producer;
    var _type;
    var _clock;
    var _bitCapacity;
    var _hyper;

    this.setProducer = function(producer){
        _producer = producer;
    }
    this.setType = function(type){
        _type = type;
    }
    this.setClockFrequency = function(clock){
        _clock = clock;
    };
    this.setBitCapacity = function(bitCapacity){
       _bitCapacity = bitCapacity;
    };
    this.setHyperThreading = function(hyper){
        _hyper = hyper;
    };
    //геттеры
    this.getProducer = function(){
        return _producer;
    }
    this.getType = function(){
        return _type;
    }
    this.getClockFrequency = function(){
        return _clock + ' ' + 'МГц'
    };
    this.getBitCapacity = function(){
        return 'x' + _bitCapacity;
    };
    this.getHyperThreading = function(){
        if(_hyper){
            return 'есть';
        }
        else 
            return 'нет';
    };
};
function Ultrabook(){
    Computer.call(this);
    var _OS;
    var _screenSize;
    var _touchScreen;
    var _processorModel;
    var _RAM;
    var _videoCardType;
    var _cd_dvd = cd_dvd;

    this.setOS = function(OS){
        _OS = OS;
    };
    this.setScreenSize = function(screenSize){
        _screenSize = screenSize;
    };
    this.setTouchScreen = function(touchScreen){
        _touchScreen = touchScreen;
    };
    this.setProcessorModel = function(processorModel){
        _processorModel = processorModel;
    };
    this.setRAM  = function(RAM){
        _RAM = RAM;
    };
    this.setVideoCardType  = function(videoCardType){
        _videoCardType = videoCardType;
    };
    this.setCD_DVD = function(cd_dvd){
        _cd_dvd = cd_dvd;
    };
    ///геттреры
    this.getOS = function(){
        return _OS;
    };
    this.getScreenSize = function(){
        return _screenSize + "''";
    };
    this.getTouchScreen = function(){
        if(_touchScreen){
            return "есть";
        }
        else
            return "нет";
    };
    this.getProcessorModel = function(){
        return _processorModel;
    };
    this.getRAM  = function(){
        return _RAM + " GB";
    };
    this.getVideoCardType  = function(){
        return _videoCardType;
    };
    this.getCD_DVD = function(){
        if(_cd_dvd){
            return "есть";
        }
        else
            return "нет";
    };
};
function Server(){
    Computer.call(this);
    var _processorAmount;
    var _powerSupplyAmount;
    var _portsAmount;
    var _height;

    this.setProcessorAmount = function(processorAmount){
        _processorAmount = processorAmount;
    };
    this.setPowerSupplyAmount = function(powerSupplyAmount){
         _powerSupplyAmount = powerSupplyAmount;
    };
    this.setPortsAmount= function(portsAmount){
        _portsAmount = portsAmount;
    };
    this.setHeight = function(height){
        _height = height;
    };
    //геттеры
    this.getProcessorAmount = function(){
        return _processorAmount + 'шт';
    };
    this.getPowerSupplyAmount = function(){
        return _powerSupplyAmount;
    };
    this.getPortsAmount= function(){
        return _portsAmount;
    };
    this.getHeight = function(){
        return _height;
    };
};
var arrObjects = []; // МАССИВ ОБЪЕКТОВ

function createObject(){
    var type = document.getElementById("computerType").value;
    switch (type) {
        case 'Ультрабук':
            var obj = new Ultrabook();
            obj.setOS(document.getElementById("OS").value),
            obj.setScreenSize(document.getElementById("screenSize").value),
            obj.setTouchScreen(document.getElementById("touchScreen").value),
            obj.setProcessorModel(document.getElementById("processorModel").value),
            obj.setRAM(document.getElementById("RAM").value),
            obj.setCD_DVD(document.getElementById("cd_dvd").value)
            break;
        case 'Вычислительный сервер':
            var obj = new Server();
            obj.setProcessorAmount(document.getElementById("processorAmount").value);
            obj.setPowerSupplyAmount(document.getElementById("powerSupplyAmount").value);
            obj.setPortsAmount(document.getElementById("portsAmount").value);
            obj.setHeight(document.getElementById("height").value);
            break;
    };
    obj.setType(type);
    obj.setProducer(document.getElementById("producer").value);
    obj.setClockFrequency(document.getElementById("clock").value);
    obj.setBitCapacity(document.getElementById("bitCapacity").value);
    obj.setHyperThreading(document.getElementById("hyper").value);

    arrObjects[arrObjects.length] = obj;

    addRow(arrObjects.length-1,
           arrObjects[arrObjects.length-1].getType(),
           arrObjects[arrObjects.length-1].getProducer(),
           arrObjects[arrObjects.length-1].getClockFrequency(),
           arrObjects[arrObjects.length-1].getBitCapacity(),
           arrObjects[arrObjects.length-1].getHyperThreading());
};
function addRow(id, type, producer, clock, capacity, hyper){ //добавляет объект в главную таблицу
    var row = document.getElementById("infoTable").insertRow();
    row.id = id;
    var td1=row.insertCell(0);
    var td2 = row.insertCell(1);
    var td3 = row.insertCell(2);
    var td4 = row.insertCell(3);
    var td5 = row.insertCell(4);
    var td6 = row.insertCell(5);
    td1.innerHTML = type;
    td2.innerHTML = producer;
    td3.innerHTML = clock; 
    td4.innerHTML = capacity;
    td5.innerHTML = hyper;
    td6.innerHTML = "<button class='btn btn-link text-success' onclick = 'editObject(this)'>Редактировать</button>" +
                    "<button class='btn btn-link' onclick='openInformation(this)'>Подробнее</button>" +
                    "<button class='btn btn-link text-danger' onclick = 'deleteRow(this);'>Удалить</button>";
    
};
function deleteRow(r){
    var row = r.parentNode.parentNode.rowIndex;
    document.getElementById("infoTable").deleteRow(row);
};
function editObject(r){
    document.getElementById("save").classList.add("d-none");
    document.getElementById("clean").classList.add("d-none");
    document.getElementById("change").classList.remove("d-none");

    var objId = r.parentNode.parentNode.id;
    var obj = arrObjects[objId];
   
    document.getElementById("computerType").value = obj.getType();
    selectType()
    $('#newRecord').modal('show');

    switch (obj.getType()) {
        case 'Ультрабук':
            document.getElementById("OS").value = obj.getOS();
            document.getElementById("screenSize").value = obj.getScreenSize();
            document.getElementById("touchScreen").value = obj.getTouchScreen();
            document.getElementById("processorModel").value = obj.getProcessorModel();
            document.getElementById("RAM").value = obj.getRAM();
            document.getElementById("cd_dvd").value = obj.getCD_DVD();
            break;
        case 'Вычислительный сервер':
            document.getElementById("processorAmount").value = obj.getProcessorAmount();
            document.getElementById("powerSupplyAmount").value = obj.getPowerSupplyAmount();
            document.getElementById("portsAmount").value = obj.getPortsAmount();
            document.getElementById("height").value = obj.getHeight();
            break;
    };
    document.getElementById("producer").value = obj.getProducer();
    document.getElementById("clock").value = obj.getClockFrequency();
    document.getElementById("bitCapacity").value = obj.getBitCapacity();
    document.getElementById("hyper").value = obj.getHyperThreading();

};
function changeObject(){
    //?
};



//HOMEWORK 3
function openInformation(r){
    var rowObj = r.parentNode.parentNode.id;
    /* alert(rowObj); */
    var obj = arrObjects[rowObj];
    var  newWin = window.open("info.html");

    
    alert(documentm.getElementById("type").innerHTML);
    /* document.getElementById("prod").innerHTML = obj.getProducer();
    document.getElementById("clock").innerHTML = obj.getClockFrequency();
    document.getElementById("capacity").innerHTML = obj.getBitCapacity();
    document.getElementById("hyper").innerHTML = obj.getHyperThreading(); */
    


    

    


    /* var row = document.getElementById("fullInfoTable").insertRow(); */
   /* var td1 = row.insertCell(0);
    var td2 = row.insertCell(1);
    td1.innerHTML = ""
    var td3 = row.insertCell(2);
    var td4 = row.insertCell(3);
    var td5 = row.insertCell(4);
    td1.innerHTML = obj.getType();
    td2.innerHTML = obj.getProducer();
    td3.innerHTML = obj.getClockFrequency(); 
    td4.innerHTML = obj.getBitCapacity();
    td5.innerHTML = obj.getHyperThreading();

    if (obj.getType == "Ультрабук"){
        var td6 = row.insertCell(5);
        var td7 = row.insertCell(6);
        var td8 = row.insertCell(7);
        var td9 = row.insertCell(8);
        var td10 = row.insertCell(9);
        var td11 = row.insertCell(10);
        var td12 = row.insertCell(11);

        td6.innerHTML = obj.getOS();
        td7.innerHTML = obj.getScreenSize();
        td8.innerHTML = obj.getTouchScreen();
        td9.innerHTML = obj.getProcessorModel();
        td10.innerHTML = obj.getRAM();
        td11.innerHTML = obj.getVideoCardType();
        td12.innerHTML = obj.getCD_DVD();

    }
    else{

    } */
}