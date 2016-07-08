(function(code) {
  code(window.jQuery, window, document);
}(function($, window, document) {
  $(function() {
    initialize();
  });

  var $data = {},
      albums    = $('.albums'),
      gallery   = $('.gallery');

  function initialize() {
    $.getJSON('/assets/js/images.json', function(json) {
      showAlbums(json.albums);
    });
  }

  function showAlbums(data) {
    $.each(data, function(i, item) {
      var photos = item.photos,
          name = item.name,
          id = item.id,
          album = $('#templates #album .thumb').clone(true),
          thumbnail = album.find('.thumbnail'),
          image = album.find('.image'),
          caption = album.find('.caption h4');

      $data[id] = item; 

      thumbnail.attr('href', name).attr('title', name).attr('data-url', id);
      image.attr('src', photos[0].href).attr('alt', name);
      caption.html(name);

      albums.append(album);

      album.on('click', 'a', function(e) {
        e.preventDefault();
        updateHistory(this);
        showGallery(id);
      });
    });
    handleState();
  }

  function showGallery(id) {
    var album = $data[id],
        photos = album.photos,
        name = album.name,
        header = $('.page-header'),
        goBack = $('.back'),
        backButton = '<a class="btn btn-default" href="' + location.pathname + '" roll="button">Back to Albums</a>';

    albums.hide();
    header.html(name);
    gallery.empty().show();
    goBack.show();
    document.title = "Schultz | " + name;
    $.each(photos, function(i, item) {
      var images  = $('#templates #gallery .thumb').clone(),
      link    = images.find('.thumbnail'),
      image   = images.find('.thumbnail img');

      link.attr('href', item.href).attr('title', name).attr('data-gallery', '');
      image.attr('src', item.href).attr('alt', name);

      gallery.append(images);
    });
    goBack.append(backButton);
  }

  function updateHistory(data) {
    dataToSave = {
      title: data.title,
      href: data.href,
      url: data.dataset.url
    };

    history.pushState(dataToSave, null, '?gallery=' + data.dataset.url);
  }

  function handleState() {
    window.onpopstate = function(e) {
      if (e.state == null) {
        location.reload();
      }
    }
  }
}));