//HOMEWORK 4

window.onload = generate;

function generate(){ //генерирует элементы страницы (кнопки, таблицу)
    const body =  document.getElementsByTagName("body")[0];

    const h1 = document.createElement("h1");
    h1.innerHTML = "Homework 4";
    body.append(h1);

    //КНОПКИ
    let btns = ['','', ''];
    let inner = [
        'Создать',
        'Загрузить объекты в базу',
        'Показать объекты в базе'
    ]
    btns.forEach((element, i) => {
        element = document.createElement("button");
        element.classList.add('btn', 'btn-sm');
        element.innerHTML = inner[i];
        body.appendChild(element);
        if (i == 0){
            element.classList.add('btn-success');
            element.type = 'submit'; 
            element.setAttribute("data-toggle", "modal");
            element.setAttribute("data-target", "#newRecord");
        }
        else{
            element.classList.add('btn-secondary');
            i == 1 ? element.setAttribute("onclick", "loadToServer()") :
                    element.setAttribute("onclick", "downloadFromServer()");
        };
    });

    //ВЕРСТКА ТАБЛИЦЫ
    const table = document.createElement("table");
    table.classList.add("table","table-bordered");
    table.id = "infoTable";
   body.appendChild(table);

    const [thead, tbody] = [
        document.createElement("thead"),
        document.createElement("tbody")];

    table.appendChild(thead);
    table.appendChild(tbody);
    let cell = [];
    inner = ['Тип компьютера', 
                    'Производитель',
                    'Тактовая частота',
                    'Разрядность архитектуры',
                    'Наличие Hyper-Threading'];
    for (let i = 0; i <= 5; i++){
        cell[i] = document.createElement("th");
        thead.appendChild(cell[i]);
        i != 5 ? cell[i].innerHTML = inner[i] : '';
    };
};

//HOMEWORK 1-2
function selectType(){ //ОТОБРАЖЕНИЕ ПОЛЕЙ СООТВ. ТИПА
    const type = $("#computerType option:selected").text();
    const serverElem = document.getElementsByClassName("server");
    const ultrabElem = document.getElementsByClassName("ultrabook");

    if (type === "Ультрабук"){
        for (let i = 0; i < serverElem.length; i++){
            serverElem[i].classList.add("d-none");
        }
        for (let i = 0; i < ultrabElem.length; i++){
            ultrabElem[i].classList.remove("d-none");
        }
    }
    else{
        for (let i = 0; i < ultrabElem.length; i++){
            ultrabElem[i].classList.add("d-none");
        }
        for (let i = 0; i < serverElem.length; i++){
            serverElem[i].classList.remove("d-none");
        };
    };
};
const cleanForm = () => {
    const elems = document.getElementsByTagName("input");
    for (let i = 0; i < elems.length; i++){
        if (elems[i].type == 'checkbox'){
            $('input:checked').prop('checked', false);
        }
        else{
            elems[i].value = "";
        };
    };
};
const validate = (inputField) => {
    let reg;
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

    const type = $("#computerType option:selected").text();
    let t;
    switch (type) {
        case 'Ультрабук':
            t = 'ultrabook';
            break;
        case 'Вычислительный сервер':
            t = 'server';
            break;
    };
    t += ' has-danger';
    if (document.getElementsByClassName(t).length == 0){
        document.getElementById("save").removeAttribute("disabled");
    };
};
//КЛАССЫ
function Computer(){
    let _producer;
    let _type;
    let _clock;
    let _bitCapacity;
    let _hyper;

    this.setProducer = (producer) => {
        _producer = producer;
    }
    this.setType = (type) => {
        _type = type;
    }
    this.setClockFrequency = (clock) => {
        _clock = clock;
    };
    this.setBitCapacity = (bitCapacity) => {
       _bitCapacity = bitCapacity;
    };
    this.setHyperThreading = (hyper) => {
        _hyper = hyper.checked;
    };
    //геттеры
    this.getProducer = () => {
        return _producer;
    }
    this.getType = () => {
        return _type;
    }
    this.getClockFrequency = () => {
        return _clock + ' ' + 'МГц'
    };
    this.getBitCapacity = () => {
        return 'x' + _bitCapacity;
    };
    this.getHyperThreading = () => {
        if(_hyper){
            return 'есть';
        }
        else 
            return 'нет';
    };
};
function Ultrabook(){
    Computer.call(this);
    let _OS;
    let _screenSize;
    let _touchScreen;
    let _processorModel;
    let _RAM;
    let _videoCardType;
    let _cd_dvd;

    this.setOS = (OS) => {
        _OS = OS;
    };
    this.setScreenSize = (screenSize) => {
        _screenSize = screenSize;
    };
    this.setTouchScreen = (touchScreen) => {
        _touchScreen = touchScreen.checked;
    };
    this.setProcessorModel = (processorModel) => {
        _processorModel = processorModel;
    };
    this.setRAM  = (RAM) => {
        _RAM = RAM;
    };
    this.setVideoCardType  = (videoCardType) => {
        _videoCardType = videoCardType;
    };
    this.setCD_DVD = (cd_dvd) => {
        _cd_dvd = cd_dvd.checked;
    };
    ///геттреры
    this.getOS = () => {
        return _OS;
    };
    this.getScreenSize = () => {
        return _screenSize + "''";
    };
    this.getTouchScreen = () => {
        if(_touchScreen){
            return "есть";
        }
        else
            return "нет";
    };
    this.getProcessorModel = () => {
        return _processorModel;
    };
    this.getRAM  = () => {
        return _RAM + " GB";
    };
    this.getVideoCardType  = () => {
        return _videoCardType;
    };
    this.getCD_DVD = () => {
        if(_cd_dvd){
            return "есть";
        }
        else
            return "нет";
    };
};
function Server(){
    Computer.call(this);
    let _processorAmount;
    let _powerSupplyAmount;
    let _portsAmount;
    let _height;

    this.setProcessorAmount = (processorAmount) => {
        _processorAmount = processorAmount;
    };
    this.setPowerSupplyAmount = (powerSupplyAmount) => {
         _powerSupplyAmount = powerSupplyAmount;
    };
    this.setPortsAmount= (portsAmount) => {
        _portsAmount = portsAmount;
    };
    this.setHeight = (height) => {
        _height = height;
    };
    //геттеры
    this.getProcessorAmount = () => {
        return _processorAmount + 'шт';
    };
    this.getPowerSupplyAmount = () => {
        return _powerSupplyAmount;
    };
    this.getPortsAmount= () => {
        return _portsAmount;
    };
    this.getHeight = () => {
        return _height;
    };
};
var arrObjects = []; // МАССИВ ОБЪЕКТОВ

function createObject(){
    const type = document.getElementById("computerType").value;
    switch (type) {
        case 'Ультрабук':
            var obj = new Ultrabook()
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
function addRow(id, type, producer, clock, capacity, hyper, ...spread){ //добавляет объект в главную таблицу
    const row = document.getElementById("infoTable").insertRow();
    row.id = id;
    //ДИСТРУКТУРИЗАЦИЯ МАССИВА
    const [td1, td2, td3, td4, td5, td6] = [row.insertCell(0),
                                            row.insertCell(1),
                                            row.insertCell(2),
                                            row.insertCell(3),
                                            row.insertCell(4),
                                            row.insertCell(5)];
    td1.innerHTML = type;
    td2.innerHTML = producer;
    td3.innerHTML = clock; 
    td4.innerHTML = capacity;
    td5.innerHTML = hyper;
    td6.innerHTML = "<button class='btn btn-link text-success' onclick = 'editObject(this)'>Редактировать</button>" +
                    "<button class='btn btn-link' onclick='openInformation(this)'>Подробнее</button>" +
                    "<button class='btn btn-link text-danger' onclick = 'deleteRow(this);'>Удалить</button>";
    //HOMEWORK 4
    //логики использования spread в данном случае нет
    //просто пример применения
    spread[0] != undefined ? alert(spread[0]) : '';
};
function deleteRow(r){
    const row = r.parentNode.parentNode.rowIndex;
    document.getElementById("infoTable").deleteRow(row);
};
function editObject(r){
    document.getElementById("save").classList.add("d-none");
    document.getElementById("clean").classList.add("d-none");
    document.getElementById("change").classList.remove("d-none");

    const objId = r.parentNode.parentNode.id;
    const obj = arrObjects[objId];
   
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
        const row = r.parentNode.parentNode.id;
        const tds = document.getElementById(row).getElementsByTagName("td");
        
        tds[0].innerHTML = obj.getType();
        tds[1].innerHTML = obj.getProducer();
        tds[2].innerHTML = obj.getClockFrequency(); 
        tds[3].innerHTML = obj.getBitCapacity();
        tds[4].innerHTML = obj.getHyperThreading();
    };
};
        
//HOMEWORK 3
function openInformation(r){
    const rowObj = r.parentNode.parentNode.id;
    const obj = arrObjects[rowObj];

    const  newWin = window.open();
    
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
    const xhr = new XMLHttpRequest();
    var obj = [];
    for (let i = 0; i < arrObjects.length; i++){
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
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/objects', false);
    xhr.send();

    if (xhr.status != 200) { //проверка соединения с сервером
	  alert( xhr.status + ': ' + xhr.statusText ); // вывод ошибки
	} else {
	  var obj = JSON.parse(xhr.responseText);
    };

    var  newWin = window.open();
    newWin.document.write("<br><br><h3>Объекты из БД</h3>");

    for (let i = 0; i < obj.length; i++){
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