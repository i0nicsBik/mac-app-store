var head_og = "<div id='head'> <div class='head_txt' id='head_one'  draggable='false'> <img  draggable='false' style='margin-right: 8px;' src='Images/logo.png' alt='logo' height='30px'> Mac App Store </div> <a href='home.html'  draggable='false'> <div class='head_txt'  draggable='false'> Home </div> </a> <a href='music.html'  draggable='false'> <div class='head_txt'  draggable='false'> Music </div> </a> <a href='purchased.html'  draggable='false'> <div class='head_txt'  draggable='false'> Purchased </div> </a> <form method='post' action='sign_out.php'  draggable='false'> <input  draggable='false' type='submit' style='background: none; border: none;' onclick='localStorage.clear();' class='head_txt' value='Sign Out'> </form> <a href='' id='search_a' draggable='false'> <div class='head_txt' id='search_app' draggable='false'> <img style='margin-right: 8px' draggable='false' src='Images/search.png' alt='logo' height='19px'> Search </div> </a> </div>";
var head_search = "<div id='search_div' draggable='false'> <img id='search_icon' draggable='false' style='margin-left: 21px; margin-right: 8px' src='Images/search.png' alt='logo' height='19px'> <input id='search_input' draggable='false' placeholder='Search Mac App Store'> <img id='cross' draggable='false' style='margin-left: 4px' src='Images/cross.png' alt='logo' height='19px'> </div>";
var main_search = "<div id='search_head_container'><div id='search_head'></div></div><div id='search_results'></div>";
var main_html = '';

function search_apps(search_value) {
	$('main').html(main_search);
	$('#search_head').html('Search results for "' + search_value + '"' + "<hr>");
	url = 'http://itunes.apple.com/search?entity=macSoftware&callback=?&term=' + search_value;
	$.getJSON(url, function (data) {
		if (data.results.length == 0) {
			$('main').append("<div style='display: flex; height: 800px; width:100%; justify-content: center; align-items: center;'><p style='font-size: 20px; '>No Results Found!</p>");
		} else {
			$.each(data.results, function (i, field) {
				div = "<div class='search_results_elems'><input type='hidden' name='app_id' value='" + field.trackId + "' /><img class='search_app_icon'  draggable='false' src='";
				div += field.artworkUrl512 + "' alt='app_icon'> <a style='width:200px' href=''><div class='app_search_name'>";
				div += field.trackName + "<p class='app_search_sub'>" + field.primaryGenreName + "</p> <p class='app_search_dev'>";
				div += field.artistName + "</p></div><a href='app.html'></a><button class='view_app' value='" + field.trackId + "'>VIEW</button></a></div>";
				if (i % 2 == 0) {
					div += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				}
				$('#search_results').append(div);
			});
		}
	});

	$('header').on('click', '#cross', function () {
		$('#head').html(head_og);
		$('main').html(main_html);
	});
}

function start() {
	var url = 'https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topsongs/limit=50/json?callback-?';
	var html_data = ''
	$.getJSON(url, function (data) {
		console.log(data);
		html_data += "   <p id='music_header'>Latest Songs<hr style='margin-bottom: 30px'></p><div id='music_main'>"
		if (data.length == 0) {
			html_data += "<div style='display: flex; height: 800px; width:100%; justify-content: center; align-items: center;'><p style='font-size: 20px; '>No Results Found!</p></div>";
			$('music').append(html_data);
			console.log(html_data);
		} else {
			var counter = 0;
			$.each(data.feed.entry, function (i, field) {
				counter++;
				if (counter == 1) {
					html_data += "<div id='music_main_content'>"

				}
				html_data += "<div class='music_content' id='play" + i + "'> <img class='album_art' src='" + field["im:image"][2].label + "'> <p class='song_title'>" + field["im:name"].label + "</p> <p class='artist'>" + field['im:artist'].label + "</p></div>";
				if (counter == 5) {
					html_data += "</div>";
					counter = 0;
				}

			});
			html_data += "</div>";
			$('music').html(html_data);
			main_html = $('main').html();
		}
	});
}

function search_song(song) {

	var url = 'https://itunes.apple.com/search?media=music&entity=musicTrack&sort=recent&callback=?&term=' + song;
	var html_data = ''
	$.getJSON(url, function (data) {
		console.log(data);
		html_data += "   <p id='music_header'>Latest Songs<hr style='margin-bottom: 30px'></p><div id='music_main'>"
		if (data.length == 0) {
			html_data += "<div style='display: flex; height: 800px; width:100%; justify-content: center; align-items: center;'><p style='font-size: 20px; '>No Results Found!</p></div>";
			$('music').append(html_data);
			console.log(html_data);
		} else {
			var counter = 0;
			$.each(data.results, function (i, field) {
				counter++;
				if (counter == 1) {
					html_data += "<div id='music_main_content'>"

				}
				html_data += "<div class='music_content' id='play" + i + "'> <img class='album_art' src='" + field.artworkUrl100 + "'> <p class='song_title'>" + field.trackName + "</p> <p class='artist'>" + field.artistName + "</p></div>";
				if (counter == 5) {
					html_data += "</div>";
					counter = 0;
				}

			});
			html_data += "</div>";
			$('music').html(html_data);
			main_html = $('main').html();
		}
	});
}

$(function () {
	start();

	$('main').on('click', '#search_m', function () {
		console.log('done');
		search_song($('#music_search').val().replace(/<\/?[^>]+(>|$)/g, ""));
	});

	$('main').on('keyup', '#music_search', function (e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			console.log('done');
			search_song($('#music_search').val().replace(/<\/?[^>]+(>|$)/g, ""));
		}
	});

	$('header').on('click', '#search_a', function (e) {
		e.preventDefault();
		$('#head').html(head_search);
		$('#search_input').focus();
	});

	$('header').on('click', '#cross', function () {
		$('#head').html(head_og);
	});

	// Sanitize Input
	$('header').on('click', '#search_icon', function () {
		search_apps($('#search_input').val().replace(/<\/?[^>]+(>|$)/g, ""));
	});

	$('header').on('keyup', '#search_input', function (e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			search_apps($('#search_input').val().replace(/<\/?[^>]+(>|$)/g, ""));
		}
	});

	$('main').on('click', '.view_app', function (e) {
		localStorage.setItem('app_id', this.value);
	});

	$('main').on('click', '.search_results_elems', function () {
		console.log($(this).find('input').attr('value'));
		localStorage.setItem('app_id', $(this).find('input').attr('value'));
		document.location.href = 'app.html';
	})
});