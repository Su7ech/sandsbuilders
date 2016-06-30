(function(code) {
  code(window.jQuery, window, document);
}(function($, window, document) {
  $(function() {
    initialize();
  });

  function initialize() {
    $.getJSON('/assets/js/images.json', function(json) {
      $.each(json.albums, function(i, item) {
        var photos = item.photos,
            name   = item.name,
            id     = item.id;

        showAlbums(photos, name, id);
      });  
    });
  }
  function showAlbums(p, n, i) {
    var albums    = $('.albums'),
        gallery   = $('.gallery'),
        album     = $('#templates #album .thumb').clone(true),
        thumbnail = album.find('.thumbnail'),
        image     = album.find('.image'),
        caption   = album.find('.caption h4');

    thumbnail.attr('href', '#' + n);
    image.attr('src', p[0].href).attr('alt', n);
    caption.html(n);

    albums.append(album);

    album.on('click', 'a', function(e) {
      e.preventDefault();
      albums.hide();
      gallery.empty().show();
      $.each(p, function(i, item) {
        var photo = item.href;
        showGallery(photo, n);
      });
    });
  }
  function showGallery(p, n) {
    var gallery = $('.gallery'),
        images  = $('#templates #gallery .thumb').clone(),
        link    = images.find('.thumbnail'),
        image   = images.find('.thumbnail img');

    link.attr('href', p).attr('title', n).attr('data-gallery', '');
    image.attr('src', p).attr('alt', n);

    gallery.append(images);
  }
}));