function getImages(){"use strict";$.getJSON("/assets/js/images.json",function(s){$.each(s.images.Bathrooms,function(s,a){$(".gallery").append("<div class='col-xs-6 col-md-3'><a href='"+a.url+"' class='thumbnail'><img src='"+a.url+"' class='image img-responsive' alt='"+a.caption+"'></a><div>")})})}$(function(){"use strict";getImages()});