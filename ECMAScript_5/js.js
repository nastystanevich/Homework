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
            reg = /^(windows|linux|ios|(mac\s*os)|другая)$/i;
            break;
        case 'screenSize': 
            reg = /^(1[\d]|20)$/;
            break;
        case 'RAM':
            reg = /^(1|2|4|8|16|32|64)$/;
            break;
        case 'processorAmount':
            reg = /^([1-9]|10)$/;
            break;
        case 'clock':
            reg = /^([1-2][0-9]00|3[0-7]00)$/; 
            break;
        case 'powerSupplyAmount':
            reg = /^([1-9]|10)$/;
            break;
        case 'portsAmount':
            reg = /^([1-9]|10)$/;
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
    };
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
        _hyper = hyper.checked;
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
        _touchScreen = touchScreen.checked;
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
        _cd_dvd = cd_dvd.checked;
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
            obj.setOS(document.getElementById("OS").value);
            obj.setScreenSize(document.getElementById("screenSize").value);
            obj.setTouchScreen(document.getElementById("touchScreen"));
            obj.setProcessorModel(document.getElementById("processorModel").value);
            obj.setRAM(document.getElementById("RAM").value);
            obj.setVideoCardType(document.getElementById("videoCardType").value);
            obj.setCD_DVD(document.getElementById("cd_dvd"));
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
    obj.setHyperThreading(document.getElementById("hyper"));

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
    var td1 = row.insertCell(0);
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
            document.getElementById("screenSize").value =
                            parseInt(obj.getScreenSize());
            if (obj.getTouchScreen() == 'есть'){
                document.getElementById("touchScreen").checked = true;
            }
            else{
                document.getElementById("touchScreen").checked = false;
            };
            document.getElementById("processorModel").value = obj.getProcessorModel();
            document.getElementById("RAM").value = parseInt(obj.getRAM());
            document.getElementById("videoCardType").value = obj.getVideoCardType();
            if (obj.getCD_DVD() == 'есть'){
                document.getElementById("cd_dvd").checked = true;
            }
            else{
                document.getElementById("cd_dvd").checked = false;
            };
            break;
        case 'Вычислительный сервер':
            document.getElementById("processorAmount").value = 
                        parseInt(obj.getProcessorAmount());
            document.getElementById("powerSupplyAmount").value =
                        parseInt(obj.getPowerSupplyAmount());
            document.getElementById("portsAmount").value = 
                        parseInt(obj.getPortsAmount());
            document.getElementById("height").value = obj.getHeight(); //list
            break;
    };
    document.getElementById("producer").value = obj.getProducer();
    document.getElementById("clock").value = parseInt(obj.getClockFrequency());
    document.getElementById("bitCapacity").value = obj.getBitCapacity().replace(/^\D+$/gi , "");
    if (obj.getHyperThreading() == 'есть'){
        document.getElementById("hyper").checked = true;
    }
    else{
        document.getElementById("hyper").checked = false;
    };

    change.onclick = function(){//переписывает св-ва объекта
        switch (obj.getType()) {
        case 'Ультрабук':
            obj.setOS(document.getElementById("OS").value);
            obj.setScreenSize(document.getElementById("screenSize").value);
            obj.setTouchScreen(document.getElementById("touchScreen").value);
            obj.setProcessorModel(document.getElementById("processorModel").value);
            obj.setRAM(document.getElementById("RAM").value);
            obj.setCD_DVD(document.getElementById("cd_dvd").value);
            break;
        case 'Вычислительный сервер':
            obj.setProcessorAmount(document.getElementById("processorAmount").value);
            obj.setPowerSupplyAmount(document.getElementById("powerSupplyAmount").value);
            obj.setPortsAmount(document.getElementById("portsAmount").value);
            obj.setHeight(document.getElementById("height").value); 
            break;
        };
        obj.setType(document.getElementById("computerType").value);
        obj.setProducer(document.getElementById("producer").value);
        obj.setClockFrequency(document.getElementById("clock").value);
        obj.setBitCapacity(document.getElementById("bitCapacity").value);
        obj.setHyperThreading(document.getElementById("hyper").value);

        //РЕДАКТИРУЕТ ТАБЛИЦУ
        var row = r.parentNode.parentNode.id;
        var tds = document.getElementById(row).getElementsByTagName("td");
        
        tds[0].innerHTML = obj.getType();
        tds[1].innerHTML = obj.getProducer();
        tds[2].innerHTML = obj.getClockFrequency(); 
        tds[3].innerHTML = obj.getBitCapacity();
        tds[4].innerHTML = obj.getHyperThreading();
    };
};
        
//HOMEWORK 3
function openInformation(r){
    var rowObj = r.parentNode.parentNode.id;
    var obj = arrObjects[rowObj];

    var  newWin = window.open();
    
    newWin.document.write("<h3>Подробная информация</h3>");

    newWin.document.write("Тип: " + obj.getType() + "<br>");
    newWin.document.write("Производитель: " + obj.getProducer() + "<br>");
    newWin.document.write("Тактовая частота: " + obj.getClockFrequency() + "<br>");
    newWin.document.write("Разрядность архитектуры: " + obj.getBitCapacity() + "<br>");
    newWin.document.write("Наличие технологии Hyper-Threading: " + obj.getHyperThreading() + "<br>");

    switch (obj.getType()) {
        case 'Ультрабук':
            newWin.document.write("Операционная система: " 
                                + obj.getOS() + "<br>");
            newWin.document.write("Размер экрана: "
                                + obj.getScreenSize() + "<br>");
            newWin.document.write("Сенсорный экран: " 
                                + obj.getTouchScreen() + "<br>");
            newWin.document.write("Модель процессора: " 
                                + obj.getProcessorModel() + "<br>");
            newWin.document.write("Объем операционной памяти: " 
                                + obj.getRAM() + "<br>");
            newWin.document.write("Наличие CD/DVD дисковода: " 
                                + obj.getCD_DVD() + "<br>");
            break;
        case 'Вычислительный сервер':
            newWin.document.write("Количество процессоров: " 
                                + obj.getProcessorAmount() + "<br>");
            newWin.document.write("Количество блоков питания: " 
                                + obj.getPowerSupplyAmount() + "<br>");
            newWin.document.write("Количество портов: " 
                                + obj.getPortsAmount() + "<br>");
            newWin.document.write("Высота: " 
                                + obj.getHeight() + "<br>");
            break;
    };
};
function loadToServer(){
    var xhr = new XMLHttpRequest();
    var obj = [];
    for (var i = 0; i < arrObjects.length; i++){
        obj[i] = {
            type : arrObjects[i].getType(),
            producer : arrObjects[i].getProducer(),
            clock : arrObjects[i].getClockFrequency(),
            bitCapacity : arrObjects[i].getBitCapacity(),
            hyper : arrObjects[i].getHyperThreading(),

            OS : arrObjects[i].getType() == "Ультрабук" ? 
                            arrObjects[i].getOS() : "",
            screenSize : arrObjects[i].getType() == "Ультрабук" ? 
                            arrObjects[i].getScreenSize() : "",
            touchScreen : arrObjects[i].getType() == "Ультрабук" ? 
                            arrObjects[i].getTouchScreen() : "",
            proccesorModel : arrObjects[i].getType() == "Ультрабук" ? 
                            arrObjects[i].getProcessorModel() : "",
            RAM : arrObjects[i].getType() == "Ультрабук" ? 
                            arrObjects[i].getRAM() : "",
            videoCard : arrObjects[i].getType() == "Ультрабук" ?
                            arrObjects[i].getVideoCardType() : "",
            cddvd : arrObjects[i].getType() == "Ультрабук" ? 
                            arrObjects[i].getCD_DVD() : "",

            processorAmount: arrObjects[i].getType() == "Вычислительный сервер" ? 
                            arrObjects[i].getProcessorAmount() : "",
            powerSupplyAmount: arrObjects[i].getType() == "Вычислительный сервер" ? 
                            arrObjects[i].getPowerSupplyAmount() : "",                
            portsAmount: arrObjects[i].getType() == "Вычислительный сервер" ? 
                            arrObjects[i].getPortsAmount() : "",
            height: arrObjects[i].getType() == "Вычислительный сервер" ? 
                            arrObjects[i].getHeight() : ""
        };
        xhr.open('POST', '/objects', true);
	    xhr.setRequestHeader("Content-type","application/json");
        xhr.send(JSON.stringify(obj[i]));
    };
};
function downloadFromServer(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/objects', false);
    xhr.send();

    if (xhr.status != 200) { //проверка соединения с сервером
	  alert( xhr.status + ': ' + xhr.statusText ); // вывод ошибки
	} else {
	  var obj = JSON.parse(xhr.responseText);
    };

    var  newWin = window.open();
    newWin.document.write("<br><br><h3>Объекты из БД</h3>");

    for (var i = 0; i < obj.length; i++){
            newWin.document.write(`<br><br>Тип: ${obj[i].type}<br>`);
            newWin.document.write(`Производитель: ${obj[i].producer}<br>`);
            newWin.document.write(`Тактовая частота: ${obj[i].clock}<br>`);
            newWin.document.write(`Разрядность архитектуры: ${obj[i].capacity}<br>`);
            newWin.document.write(`Наличие технологии Hyper-Threading: ${obj[i].hyper}<br>`);
        
        switch (obj[i].type) {
            case 'Ультрабук':
                newWin.document.write(`Операционная система: ${obj[i].OS}<br>`);
                newWin.document.write(`Размер экрана: ${obj[i].screenSize}<br>`);
                newWin.document.write(`Сенсорный экран: ${obj[i].touchScreen}<br>`);
                newWin.document.write(`"Модель процессора: ${obj[i].processorModel}<br>`);
                newWin.document.write(`Объем операционной памяти: ${obj[i].RAM}<br>`);
                newWin.document.write(`Тип видеокарты: ${obj[i].videoCard}<br>`);
                newWin.document.write(`Наличие CD/DVD дисковода: ${obj[i].cddvd}<br>`);
            break;
            case 'Вычислительный сервер':
                newWin.document.write(`Количество процессоров: ${obj[i].processorAmount}<br>`);
                newWin.document.write(`Количество блоков питания: ${obj[i].powerSupplyAmount}<br>`);
                newWin.document.write(`Количество портов: ${obj[i].portsAmount}<br>`);
                newWin.document.write(`Высота: ${obj[i].height}<br>`);
            break;

        };
    };
};   