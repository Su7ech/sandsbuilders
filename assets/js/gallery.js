/*jslint browser: true*/
/*global $, jQuery, alert, console, getImages, showAlbums, blueimp*/

$(function () {
  'use strict';
  getImages();
});

function getImages() {
  'use strict';
  var name = '',
    url = '',
    id = '',
    caption = '';
  $.getJSON('/assets/js/images.json', function (data) {
    var imgUrl = [],
      album = data.albums;
    $.each(data.albums, function (k, v) {
      name = v.name;
      id = v.id;
      url  = v.photos[0].url;
      caption = v.photos[0].caption;
      showAlbums(name, url, caption, id);
      $.each(v.photos, function (i, item) {
        console.log(item.url);
      });
    });
  });
}

function showAlbums(name, url, caption, id) {
  'use strict';
  var displayImage = $('.templates .albums .thumb').clone(),
    albumThumb = displayImage.find('.thumbnail .image'),
    albumCaption = displayImage.find('.thumbnail .caption h4'),
    albumBtn = displayImage.find('.thumbnail .caption p a');

  albumCaption.html(name);
  albumBtn.attr('href', '#' + id);
  albumThumb.attr('src', url);
  albumThumb.attr('alt', caption);

  $('.img-container .row').append(displayImage);
}

function blueimpGallery() {
  'use strict';
  var gallery = blueimp.Gallery([

  ]);
}
