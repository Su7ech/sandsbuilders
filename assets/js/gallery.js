/*jslint browser: true*/
/*global $, jQuery, alert, console, getImages, showImages*/

$(function () {
  'use strict';
  getImages();
});

function getImages() {
  'use strict';
  $.getJSON('/assets/js/images.json', function (data) {
    $.each(data.images.bathrooms, function (key, val) {
      showImages(val.url, val.caption);
    });
    $.each(data.images.specialty, function (key, val) {
      showImages(val.url, val.caption);
    });
  });
}

function showImages(url, caption) {
  'use strict';
  var imgContainer = $('.gallery');

  imgContainer.append("<div class='col-xs-6 col-md-3'><a href='" + url + "' class='thumbnail'><img src='" + url + "' class='image img-responsive' alt='" + caption + "'></a><div>");
}
