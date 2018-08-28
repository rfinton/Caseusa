function slideDownIn(el) {
  $(el).velocity('transition.slideDownIn');
}

function slideLeftIn(el) {
  $(el).velocity('transition.slideLeftIn');
}

$(document).ready(function() {
  $('.read').click(function() {
    $(this).hide();
    $(this).next('span').velocity('fadeIn');
  });

  $('#feat-prop > div > div > a').click(function(event) {
    event.preventDefault();
    var ifr = document.createElement('iframe');
    ifr.style.display = 'none';
    ifr.src = event.currentTarget.href;
    document.body.appendChild(ifr);
  });

  $('#modal-gallery .modal-footer, #feat-prop button').click(function() {
    var ifr = document.createElement('iframe');
    ifr.style.display = 'none';
    ifr.style.border = 'none';
    ifr.style.width = '100%';
    ifr.style.height = '400px';
    ifr.src = 'http://' + location.host + '/RichmondPlaza.html';
    ifr.onload = function() {
      this.style.display = 'block';
      $('#refresh-icon').hide();
    };
    $('#refresh-icon').css('display', 'inline-block');
    $('#modal-tour .modal-body').append(ifr);
  });

  $('#modal-tour .close').click(function() {
    $('#modal-tour iframe').remove();
  });
});