// recaptcha callback in global scope

var enableBtn = function() {
	document.querySelector('#submit').disabled = false;
};


(function(){

	// custom select -----------------------------

	var select = document.querySelector('select');
	var options = select.options;

	var list = document.createElement('ul');
	var styledSelect = document.createElement("div");

	var currentSelection = document.createElement('div');
	currentSelection.setAttribute('tabindex', '0');
	currentSelection.innerHTML = select.options[select.selectedIndex].innerHTML;

	styledSelect.classList.add('select-styled');  

	select.parentNode.insertBefore(styledSelect, select.nextSibling);
	styledSelect.appendChild(currentSelection);
	styledSelect.appendChild(list);

	for (var i = 0; i < options.length; i++) {
		if (options[i].disabled) {
			continue;
		}
		var li = '<li tabindex="-1" data-val="'+options[i].getAttribute('value')+'">'+options[i].innerHTML+'</li>';
		list.innerHTML+= li;
	}
	var styledSelectList = list.querySelectorAll('li');

	for (var i = 0; i < styledSelectList.length; i++) {
		styledSelectList[i].addEventListener('click', selectEvent);
	}

	function selectEvent(el) {
		currentSelection.innerHTML = this.innerHTML;
		select.value = this.getAttribute('data-val');
		toggleOptions();
	}

	function toggleOptions() {

		if(list.classList.contains('active')) {
			list.classList.remove('active');
			currentSelection.classList.remove('active');
		}

		else {
			list.classList.add('active');
			currentSelection.classList.add('active');
		}
	}

	currentSelection.addEventListener('click', toggleOptions);
	document.addEventListener('click', function(e) {
		if(e.target != currentSelection && list.classList.contains('active')) {
			toggleOptions();
		}
	});



	// form javascript -----------------------------


	var body = document.querySelector('body');
	var getStarted = document.querySelector('#getStarted');
	var popup = document.querySelector('#popup');
	var closeLightbox = document.querySelector('.close-lightbox');
	var inputs = document.querySelectorAll('#signupForm .validation-one');
	var submitButton = document.querySelector('#submit');

	var password = document.querySelector('#password');
	var confirmPassword = document.querySelector('#confirmPassword');

	function openLightbox() {
		body.classList.add('open-modal');
		popup.classList.add('active');
	}
	
	function closeLightbox() {
		body.classList.remove('open-modal');
		popup.classList.remove('active');
	}

	function matchingPasswords() {

		if(password.value != confirmPassword.value) {
			confirmPassword.setCustomValidity('Passwords do not match');
			return false;
		}
		else {
			confirmPassword.setCustomValidity('');
			return true;
		}
	}


	getStarted.addEventListener('click', function(e) {
		e.preventDefault();
		var formInvalid = false;
		for (var i = 0; i < inputs.length; i++) {
			if(inputs[i].checkValidity() == false) {
				document.querySelector('#submit').click();
				formInvalid = true;
				break;
			}
		}
		if(!formInvalid) {
			openLightbox();
			submitButton.disabled = true;
			password.removeAttribute('novalidate');
			password.removeAttribute('novalidate');

			confirmPassword.required = true;
			confirmPassword.required = true;
		}

	});


	popup.addEventListener('click', function(e){
		console.log(e);
		if(e.target == popup) {
			 closeLightbox();
		}
	});


	closeLightbox.addEventListener('click', function(e) {
		document.querySelector('body').classList.remove('open-modal');
		popup.classList.remove('active');
	});
	submitButton.addEventListener('click', function(e) {
		if(! matchingPasswords()) {
			return false;
		}
	})




})();



