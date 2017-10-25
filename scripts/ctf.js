var popUp = {
	echoMyNumber: {
		title: 'Echo My Number',
		ip: 'nc 107.170.192.50 2506',
		answer: 'FLAG_{GRAY_PASSWORD_123_HATS}'
	},
	addMyNumber: {
		title: 'Add My Number',
		ip: 'nc 107.170.192.50 1900',
		answer: 'FLAG_{GRAY_BUBBLE_BUS_HATS}'
	},
	convertMyNumber: {
		title: 'Base16 Math',
		ip: 'nc 107.170.192.50 2210',
		answer: 'FLAG_{GRAY_HEX_HATS}'
	},
	jsCorrectPassword: {
		title: 'Enter the correct password',
		href: 'http://107.170.192.50/login',
		answer: 'FLAG_{GRAY_SOMET0000HING_HATS}'
	},
	sqlCorrectPassword: {
		title: 'Enter the correct password',
		href: 'http://107.170.192.50/dblogin.php',
		answer: 'flag_{GRAY_FEDORA_HATS}'
	},
	stringsCorrectPassword: {
		title: 'Enter the correct password',
		download: 'http://107.170.192.50/stringspass',
		answer: 'FLAG_{GRAY_WY881W3XF7_HAT}'
	},
	bufferOverflowPassword: {
		title: 'Enter the correct password',
		image: 'http://107.170.192.50/snip.jpg',
		download: 'http://107.170.192.50/overf',
		answer: 'FLAG_{GRAY_VC89FU23_HAT}'
	},
	jpgCorrectPassword: {
		title: 'File With Data Appended',
		text: 'A disgruntled worker was found sneaking in a flash drive into the server rack. You have been given the files found in the workers flash drive. It is believed the worker was stealing company data.',
		download: 'http://107.170.192.50/imageszip',
		answer: ''
	},
	netSniffPassword: {
		title: 'Wireshark',
		text: 'The password is not saved in the binary.',
		download: 'http://107.170.192.50/abc.zip',
		answer: ''
	},
	mountRecover: {
		title: 'Saved Drive, Deleted File',
		text: 'An image was made of a confiscated flash drive out in the field. This image has been sent to you for analysis.',
		download: 'http://107.170.192.50/fdirveimage',
		answer: ''
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

$('.card').click(function () {
	var elem = $(this)[0];
	var pop = $('.pop-up');
	pop.find('.title').html(popUp[elem.id].title);
	pop.find('.text').html(popUp[elem.id].text);
	pop.find('.img').html(popUp[elem.id].img);
	pop.find('.ip').html(popUp[elem.id].ip);
	pop.find('.download').html(popUp[elem.id].download);
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