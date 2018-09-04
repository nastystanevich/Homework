function reverseString(str){ //переворот строки
	var arr = str.split("");
	var reverseArr = arr.reverse();
	str = reverseArr.join("");
	return str;
}
function changeRegister(str){ //изменяет регистр на верхний/нижний через символ
	var newStr = "";
	for (var i = 0; i < str.length; i+=2){
		newStr += str.charAt(i).toUpperCase();
		newStr += str.charAt(i+1).toLowerCase();
	};
	return newStr;
}

var username = prompt("Write user name:");
if (/\d/.test(username)){
	alert(changeRegister(username));
}
else{
	alert(reverseString(username));
}