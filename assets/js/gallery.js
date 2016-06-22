;(function() {
  var Viewer = {
    init: function() {
      Viewer.getData();
    },
    getData: function() {
      $.getJSON('/assets/js/images.json', function(data) {
        $.each(data.albums, function(i, item) {
          var name   = item.name,
              photos = item.photos,
              id     = item.id;

          Viewer.displayAlbums(name, photos, id);
        });
      });
    },
    displayAlbums: function(name, photos, id) {
      var album     = $('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb"><a class="thumbnail" href="javascript:;" title=""><img class="image" src="" alt="" /><div class="caption"><h4></h4></div></a></div>').clone(true),
          thumbnail = album.find('.thumbnail'),
          image     = album.find('.thumbnail .image'),
          caption   = album.find('.thumbnail .caption h4');

      image.attr('src', photos[0].href).attr('alt', name);
      caption.html(name);
      
      $('.albums').append(album);

      album.on('click', 'a', function() {
        $('.content').empty().removeClass('albums').addClass('gallery').show();
        $.each(photos, function(i, item) {
          var photo = item.href;
          Viewer.displayGallery(photo, name); 
        });
      });
    },
    displayGallery: function(photo, name) {
      var gallery = $('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb"><a class="thumbnail" href="" title="" data-gallery><img class="image" src="" alt="" /></a></div>').clone(),
          link    = gallery.find('.thumbnail'),
          image   = gallery.find('.thumbnail img');

      link.attr('href', photo).attr('title', name);
      image.attr('src', photo).attr('alt', name);

      $('.gallery').append(gallery);
    }
  };

  Viewer.init();
})();