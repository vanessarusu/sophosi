(function(){

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
			list.classList.remove('active');
			currentSelection.classList.remove('active');
		}
	});





})();