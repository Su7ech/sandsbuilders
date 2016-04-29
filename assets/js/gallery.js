/*jslint browser: true*/
/*global $, jQuery, alert, console, getImages, showImages*/

$(function () {
  'use strict';
  getImages();
});

function getImages() {
  'use strict';
  $.getJSON('/assets/js/images.json', function (data) {
    $.each(data.images.Bathrooms, function (key, val) {
//      console.log(val.caption);
      $('.gallery').append("<div class='col-xs-6 col-md-3'><a href='" + val.url + "' class='thumbnail'><img src='" + val.url + "' class='image img-responsive' alt='" + val.caption + "'></a><div>");
    });
  });
}
