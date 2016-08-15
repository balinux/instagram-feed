var instagramURL = 'https://api.instagram.com/v1/users/' + user + '/media/recent?access_token=' + accessToken;

var getJSONP = function (source, callback) {
	var reference = window.document.getElementsByTagName('script')[0];
	var script = window.document.createElement('script');
	script.src = source + (source.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback;
	script.async = true;

	reference.parentNode.insertBefore(script, reference);

	script.onload = function () {
		this.remove();
	};
};
var getInstagramMedia = function (data) {
	var media = data.data;
	
	console.log(media);

	for (var a = 0, al = media.length; a < al; a++) {
		var mediaElement = document.createElement('div');
		mediaElement.className = 'media';
		if (media[a].type === 'video') {
			mediaElement.className += ' ' + media[a].type;
		}
		document.getElementById('instagram-media').appendChild(mediaElement);
		
		console.log(mediaElement);

		var linkElement = document.createElement('a');
		linkElement.href = media[a].link;
		linkElement.target = '_blank';
		if (media[a].caption !== null && media[a].caption.text !== null) {
			linkElement.title = media[a].caption.text;
		}
		mediaElement.appendChild(linkElement);

		var imageElement = document.createElement('img');
		imageElement.src = media[a].images.low_resolution.url;
		if (media[a].caption !== null && media[a].caption.text !== null) {
			imageElement.alt = media[a].caption.text;
		}
		linkElement.appendChild(imageElement);

		var userElement = document.createElement('div');
		userElement.className = 'user';
		mediaElement.appendChild(userElement);

		var userImageElement = document.createElement('img');
		userImageElement.src = media[a].user.profile_picture;
		userElement.appendChild(userImageElement);
	}

	if (data.pagination.next_url !== undefined) {
		instagramURL = data.pagination.next_url;
	} else {
		document.querySelector('.load-more').parentNode.removeChild(document.querySelector('.load-more'));
	}
};

getJSONP(instagramURL, 'getInstagramMedia');

document.querySelector('.load-more').addEventListener('click', function () {
	getJSONP(instagramURL, 'getInstagramMedia');
});