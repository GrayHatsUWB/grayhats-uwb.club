var popUp = {
	echoMyNumber: {
		title: 'Echo My Number',
		summary: 'nc 107.170.192.50 2506',
		answer: 'FLAG_{GRAY_PASSWORD_123_HATS}'
	},
	addMyNumber: {
		title: 'Add My Numbers',
		summary: 'nc 107.170.192.50 1900',
		answer: 'FLAG_{GRAY_BUBBLE_BUS_HATS}'
	},
	convertMyNumber: {
		title: 'Base16 Math',
		summary: 'nc 107.170.192.50 2210',
		answer: 'FLAG_{GRAY_HEX_HATS}'
	},
	jsCorrectPassword: {
		title: 'Do U Know JS?',
		summary: 'Enter the correct username and password',
		href: 'http://107.170.192.50/PassJs/login.html',
		answer: 'FLAG_{GRAY_SOMET0000HING_HATS}'
	},
	sqlCorrectPassword: {
		title: 'Dr.Injection',
		summary: 'SQL',
		href: 'http://107.170.192.50/PassSQL/login.php',
		answer: 'flag_{GRAY_FEDORA_HATS}'
	},
	stringsCorrectPassword: {
		title: 'Constant and ROM',
		summary: 'Enter the correct password into the executable.',
		download: 'http://107.170.192.50/stringspass',
		answer: 'FLAG_{GRAY_WY881W3XF7_HAT}'
	},
	bufferOverflowPassword: {
		title: 'Flow with the buffer.',
		summary: 'Enter the correct password into the executable.',
		href: 'http://107.170.192.50/overf/example.html',
		download: 'http://107.170.192.50/overf/flawed',
		answer: 'FLAG_{GRAY_VC89FU23_HAT}'
	},
	jpgCorrectPassword: {
		title: 'A new invoice for the investigator',
		summary: 'A disgruntled worker was found sneaking in a flash drive into the server rack. You have been given the files found in the workers flash drive. It is believed the worker was stealing company data. You can use "tar xvzf your_tar -C /path_to_save_files" to get the files out of the tar.',
		download: 'http://107.170.192.50/OddImageOut.tar',
		answer: 'FLAG_{GRAY_FOOP-POOF_HATS}'
	},
	netSniffPassword: {
		title: 'A shark that can walk on a wire.',
		summary: 'The password is not saved in the binary.',
		download: 'http://107.170.192.50/client',
		answer: 'FLAG_{GRAY_J3812X_HAT}'
	},
	mountRecover: {
		title: 'Job for cyber forensics scientist.',
		summary: 'An image was made of a confiscated flash drive out in the field. This image has been sent to you for analysis.',
		download: 'http://107.170.192.50/flash_dump',
		answer: 'FLAG_{GRAY_H2PWN_HAT}'
	}
}

function createCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function updateCards() {
	$('.column > div').each(function () {
		var card = $(this);
		if (readCookie(card.attr('id'))) {
			card.find('.completed').show();
		} else {
			card.find('.completed').hide();
		}
	});
}

$(document).ready(function () {
	updateCards();
});

$('.card').click(function () {
	var elem = $(this)[0];
	var pop = $('.pop-up');
	pop.find('.title').html(popUp[elem.id].title || '');
	pop.find('.summary').html(popUp[elem.id].summary || '');
	pop.find('.img').attr('src', popUp[elem.id].image || '');
	pop.find('.ip').html(popUp[elem.id].ip || '');
	pop.find('.link').html(popUp[elem.id].href || '').attr('href', popUp[elem.id].href || '');
	pop.find('.download').html(popUp[elem.id].download || '')
	pop.find('.download').attr('href', popUp[elem.id].download || '');
	pop.find('input').val('');
	pop.addClass('show-pop-up');
	selectedPop = elem.id;
});

var selectedPop = null;

$('.pop-up-form').submit(function (e) {
	e.preventDefault();
	if ($(this).find('.submit-input').val() === popUp[selectedPop].answer) {
		$('.pop-up-error').hide();
		createCookie(selectedPop, parseInt(readCookie(selectedPop) || 0) + 1, 364);
		updateCards();
		selectedPop = null;
		$('.pop-up').click();
	} else {
		$('.pop-up-error').show();
	}
});

$('.pop-up').click(function (e) {
	var parent = e.target;
	while (parent) {
		if (parent == $('.pop-up .center')[0]) {
			return;
		}
		parent = parent.parentNode;
	}
	selectedPop = null;
	$('.pop-up-error').hide();
	$('.pop-up').removeClass('show-pop-up');
})