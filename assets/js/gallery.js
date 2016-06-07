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

function updateHistory(data) {
  var dataToSave = {
    title: data.title,
    href: data.href,
    url: data.dataset.url
  }

  history.pushState(
    dataToSave,
    data.title,
    data.dataset.url
  );
}

function handleState() {
  $(window).on('popstate', function(e) {
    if (!e.originalEvent.state) {
      $('.img-container .gallery').hide();
      $('.img-container .albums').show();
    }
    console.log(e);
  });
}

function displayAlbums(name, photos, id) {
  'use strict';
  var albumTemplate    = $('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb"><a class="thumbnail" href="javascript:;" title="" data-url=""><img class="image" src="" alt="" /><div class="caption"><h4></h4></div></a></div>'),
      album       = albumTemplate.clone(true),
      thumbnail   = album.find('.thumbnail'),
      image       = album.find('.thumbnail .image'),
      caption     = album.find('.thumbnail .caption h4');

  caption.html(name);
  thumbnail.attr('title', name);
  thumbnail.attr('data-url', name);
  image.attr('src', photos[0].href);
  image.attr('alt', photos[0].href);

  album.on('click', 'a', function() {
    $('.img-container .albums').hide();
    $('.img-container .gallery').empty().show();
    updateHistory(this);
    handleState();
    $.each(photos, function(i, item) {
      var photo = item.href;
      displayGallery(photo, name);
    });
  });  
  $('.img-container .albums').append(album);
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

  $('.img-container .gallery').append(gallery);
}
