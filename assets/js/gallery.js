function getAlbums(){"use strict";$.getJSON("/assets/js/images.json",function(t){$.each(t.albums,function(t,i){var a=i.name,n=i.photos,e=i.id;displayAlbums(a,n,e)})})}function displayAlbums(t,i,a){"use strict";var n=$(".templates .albums .thumb").clone(!0),e=n.find(".thumbnail"),l=n.find(".thumbnail .image"),r=n.find(".thumbnail .caption h4");r.html(t),e.attr("id",a),l.attr("src",i[0].href),l.attr("alt",i[0].href),n.on("click",function(){$(".img-container .row").html(""),$.each(i,function(i,a){var n=a.href;displayGallery(n,t)})}),$(".img-container .row").append(n)}function displayGallery(t,i){"use strict";var a=$(".templates .blueimp-gallery .thumb").clone(!0),n=a.find(".thumbnail"),e=a.find(".thumbnail img");n.attr("href",t),n.attr("title",i),e.attr("src",t),e.attr("alt",i),$(".img-container .row").attr("id","links"),$(".img-container .row").append(a)}$(function(){"use strict";getAlbums()});