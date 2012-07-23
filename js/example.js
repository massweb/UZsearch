$(function () {
    var obj={"success":false,"text":"{\"value\":[{\"title\":\"\\u0414\\u043d\\u0456"};
	//var obj=JSON.parse(string);
	console.log(obj);
	var obj2=JSON.parse(obj.text);
	console.log(obj2);
	

});