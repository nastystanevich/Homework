function nextPage(){ //открытие страницы в гугле
	location.href = "https://www.google.by/search?q=%D0%BA%D0%BE%D1%82%D0%B8%D0%BA%D0%B8&rlz=1C1GGRV_enBY751BY751&oq=%D0%BA%D0%BE%D1%82%D0%B8%D0%BA%D0%B8&aqs=chrome..69i57j0l5.3403j0j7&sourceid=chrome&ie=UTF-8"
}
function changeStyle(){ //изменение стиля страницы
	document.body.style.backgroundColor = prompt('Напишите цвет для фона:', 'lightseagreen');
	var btn = document.getElementsByTagName("button");
	for (var i = 0; i <= btn.length; i++){
		btn[i].style.height = "160px";
		btn[i].style.backgroundColor = document.body.style.backgroundColor;
		btn[i].style.borderRadius = "50%";
	}
}
function deleteAll(){
	destroyChildren(document.body);
	var div = document.createElement("div");
	div.className = "flexboxContainer";
	var parentElem = document.body;
	parentElem.appendChild(div);

	var elem1 = document.createElement("h1");
	var elem2 = document.createElement("p");
	var elem3 = document.createElement("img");
	var elem4 = document.createElement("img");

	document.body.appendChild(elem1);
	div.appendChild(elem2);
	div.appendChild(elem3);
	div.appendChild(elem4);

	elem1.innerText = "Лев чихнул и появилась кошка"
	elem2.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere mi sed ipsum accumsan, vitae rutrum est ultricies. In at lacus eget enim bibendum pulvinar quis consequat velit. Donec nec sollicitudin odio, a ornare nibh. Praesent at volutpat tellus. Morbi rutrum finibus lacinia. Suspendisse nibh massa, consequat at lacus et, aliquam venenatis dolor. Pellentesque eget sem rhoncus lectus ultrices volutpat. Nulla neque ipsum, congue vitae tellus non, rutrum tristique enim. Praesent mattis ligula ac varius semper. Fusce rhoncus mi ut vestibulum porta. Phasellus nec vehicula neque. Nunc sagittis leo dapibus risus rhoncus, in bibendum mauris feugiat."
	elem3.src = "https://data.whicdn.com/images/63704067/original.jpg";
	elem4.src = "http://www.silver.ru/upload/medialibrary/fec/fece262b3dea43fcd545049024a41895.jpg";

	elem1.style.fontSize = "64px";
	elem1.style.textAlign = "center";
	elem2.style.width = "400px";
	elem3.style.height = "300px";
	div.style = "display: flex; flex-flow: row wrap; align-items: center; justify-content: center;"
}
	function destroyChildren(node){ //удаляет все дочерние эл-ты body
  		while (node.firstChild){
      		node.removeChild(node.firstChild);
		}
	}