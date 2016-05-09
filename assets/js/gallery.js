/*jslint browser: true*/
/*global $, jQuery, alert, console, loadAlbums, showAlbums, launchGallery, showGallery, blueimp*/

$(function () {
  'use strict';
  loadAlbums();
});

function loadAlbums() {
  'use strict';
  var name = '',
    photos = '',
    id = '';
  $.getJSON('/assets/js/images.json', function (data) {
    var album = data.albums;
    $.each(album, function (k, v) {
      var displayAlbum = $('.templates .albums .thumb').clone(),
        albumThumb = displayAlbum.find('.thumbnail'),
        albumImage = displayAlbum.find('.thumbnail .image'),
        albumCaption = displayAlbum.find('.thumbnail .caption h4');
      name = v.name;
      id = v.id;
      photos  = v.photos;

      albumCaption.html(name);
      albumThumb.attr('id', id);
      albumImage.attr('src', photos[0].href);
      albumImage.attr('alt', photos[0].title);

      $('.img-container .row').append(displayAlbum);
    });
  });
}

function loadGallery(request) {
  'use strict';

}
