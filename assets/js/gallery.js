/*jslint browser: true*/
/*global $, jQuery, alert, console, loadAlbums, showAlbums, launchGallery, showGallery, blueimp*/

$(function () {
  'use strict';
  getAlbums();
});

function getAlbums() {
  'use strict';
  var name = '',
    photos = '',
    id = '',
    displayAlbum = '',
    albumThumb = '',
    albumImage = '',
    albumCaption = '';
  $.getJSON('/assets/js/images.json', function (data) {
    var album = data.albums;
    $.each(album, function (i, item) {
      name = item.name;
      id = item.id;
      photos  = item.photos;

      displayAlbums(name, id, photos);
    });
  });
}

function displayAlbums(name, id, photos) {
  var displayAlbum = $('.templates .albums .thumb').clone(true),
      thumbnail    = displayAlbum.find('.thumbnail'),
      image        = displayAlbum.find('.thumbnail .image'),
      caption      = displayAlbum.find('.thumbnail .caption h4');

  caption.html(name);
  thumbnail.attr('id', id);
  image.attr('src', photos[0].href);
  image.attr('alt', photos[0].href);

  $('.img-container .row').append(displayAlbum);
}

function displayGallery(request) {
  'use strict';
  var test = $(request).attr('id'),
      gallery = '',
      displayImages = '';

  $('.img-container').hide();
}
