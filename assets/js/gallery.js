/*jslint browser: true*/
/*global $, jQuery, alert, console, getAlbums, displayAlbums, displayGallery, blueimp*/

$(function () {
  'use strict';
  getAlbums();

});

function getAlbums() {
  'use strict';
  $.getJSON('/assets/js/images.json', function (data) {
    $.each(data.albums, function (i, item) {
      var name   = item.name,
          photos = item.photos,
          id     = item.id;

      displayAlbums(name, photos, id);
    });
  });
}

function displayAlbums(name, photos, id) {
  'use strict';

  var albumTemplate    = $('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb"><a class="thumbnail" href="javascript:;" data-name=""><img class="image" src="" alt="" /><div class="caption"><h4></h4></div></a></div>'),
      album       = albumTemplate.clone(true),
      thumbnail   = album.find('.thumbnail'),
      image       = album.find('.thumbnail .image'),
      caption     = album.find('.thumbnail .caption h4');

  caption.html(name);
  thumbnail.attr('data-name', name);
  image.attr('src', photos[0].href);
  image.attr('alt', photos[0].href);

  album.on('click', function() {
    $('.img-container .row').html('');
    $.each(photos, function(i, item) {
      var photo = item.href;
      displayGallery(photo, name);
    });
  });  
  $('.img-container .row').append(album);
}

function displayGallery(photo, name) {
  'use strict';
  var galleryTemplate = $('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb"><a class="thumbnail" href="" title="" data-gallery><img class="image" src="" alt="" /></a></div>'),
      gallery         = galleryTemplate.clone(),
      link            = gallery.find('.thumbnail'),
      image           = gallery.find('.thumbnail img');

  link.attr('href', photo);
  link.attr('title', name);

  image.attr('src', photo);
  image.attr('alt', name);

  $('.img-container .row').attr('id', 'links');
  $('.img-container .row').append(gallery);
}
