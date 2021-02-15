// Показать текушии куки
function nowCookie(){

}

// Сохранить куки
function setCookie(){

}

// Вывести новые куки
function showNewCookie(){

}

// Анимация после наэатия на ОК
function animationBlockCookie() {
	var divCookie = document.getElementById('div_cookie')
	var linkAccept = document.getElementById("btn_accept_cookie");
	linkAccept.onclick = function (){
		divCookie.classList.remove("animate__backInUp");
		divCookie.classList.add("animate__backOutDown");
		document.cookie = "AcceptCookie=Yes; path=/; max-age=3600";
	  return true;
	  }
}
