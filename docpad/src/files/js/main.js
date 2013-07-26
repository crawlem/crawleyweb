function loadPhotos(date) {
	console.log(date);
	if ($("#photos")) {
		var jqxhr = $.ajax({
			url: "http://ycpi.api.flickr.com/services/rest/?method=flickr.photos.search&user_id=90014740@N00&min_taken_date=" + date + " 00:00:00&max_taken_date=" + date + " 23:59:59&sort=date-taken-asc&format=json&nojsoncallback=1&api_key=6b44b7eaf862acb6abf898f5bc3882fb",
			dataType: "json"
		})
		.done(function(data) {
			var photoType = "s"; // small square
			// if (data.photos.photo.length <= 5) {
			//   photoType = "q"; // larger square
			// }
			var list = $("<ul></ul>");
			$.each(data.photos.photo, function (i, photo) {
				var img = $("<img/>")
				.attr("src", "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + photoType + ".jpg")
				.attr("width", "75")
				.attr("height", "75")
				.attr("alt", photo.title);
				var link = $("<a/>")
				.attr("href", "http://www.flickr.com/photos/crawlem/" + photo.id);
				var fullLink = link.append(img);
				var li = $("<li/>").append(fullLink);
				$(list).append(li);
			});
			if (data.photos.photo.length > 0) {
				$("#photos").append("<h2>Photos</h2>");
				$("#photos").append(list);
			}
		})
		.fail(function(o, s) {
			alert(s);
		});
	}
}