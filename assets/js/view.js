$(document).ready(function() {
  touchEvent = { x0: 0, x1: 0, timestamp: '' }; //variable for swipe event

  $('img').on('dragstart', function() {
    return false;
  });

  $('#prop-1').click(function() {
    noscroll();
    achieveGoalViewProp('#southernhills');
    $('#propertyA').css('display', 'block');
  });

  $('#prop-2').click(function() {
    noscroll();
    achieveGoalViewProp('#parktower');
    $('#propertyB').css('display', 'block');
  });

  $('#prop-3').click(function() {
    noscroll();
    achieveGoalViewProp('#richmondplaza');
    $('#propertyC').css('display', 'block');
  });

  $('.exit').click(addScroll);

  $('.control').click(function(e) {
    e.preventDefault();
    var d = $(e.target).data('direction');
    var el = $(e.target).data('prop');

    if(d == 'right') {
      rightClickArrow(el);
    } else {
      leftClickArrow(el);
    }
  });

  $('#tourModal #close-modal').click(resetModal);
  
  // this is a hack for old samsung browsers not updating radio input onchange
  $('input[type=radio]').on('change', function(ev) {
    $('label').css('display', 'inline-block');
  });

  addSwipeListener();
  
  try {
    setupReferalModalHandler();
  } catch (e) {}
});

window.onload = function() {
  $('.prop').css({
    height: $('.prop:first').innerWidth() + 'px'
  });
  $('.container-fluid').css('opacity', 1);
}


// FUNCTIONS

function swipeLeft(e) {
  if($(e).hasClass('start')) {
    return;
  }

  $(e).velocity({
    translateX: ['-130%', '0%'],
    translateZ: [0,0]
  }, { duration: 800 });

  $(e).removeClass('inView');

  $(e.previousElementSibling).velocity({
    translateX: ['0%', '130%'],
    translateZ: [0,0]
  }, { duration: 800 });

  $(e.previousElementSibling).addClass('inView');
}

function swipeRight(e) {
  if($(e).hasClass('end')) {
    return;
  }

  $(e).velocity({
    translateX: ['130%', '0%'],
    translateZ: [0,0]
  }, { duration: 800 });

  $(e).removeClass('inView');

  $(e.nextElementSibling).velocity({
    translateX: ['0%', '-130%'],
    translateZ: [0,0]
  }, { duration: 800 });

  $(e.nextElementSibling).addClass('inView');
}

function rightClickArrow(el) {
  var a = document.querySelectorAll('#' + el + ' .floorplan');

  for(var i = 0; i < a.length; i++) {
    if($(a[i]).hasClass('inView')) {
      if($(a[i]).hasClass('start') == false) {
        $(a[i]).velocity({
          translateX: ['-130%', '0%'],
          translateZ: [0,0]
        }, { duration: 800 });

        $(a[i]).removeClass('inView');
        
        $(a[i-1]).velocity({
          translateX: ['0%', '130%'],
          translateZ: [0,0]
        }, { duration: 800 });

        $(a[i-1]).addClass('inView');
      }
      break;
    }
  }
}

function leftClickArrow(el) {
  var a = document.querySelectorAll('#' + el + ' .floorplan');

  for(var i = 0; i < a.length; i++) {
    if($(a[i]).hasClass('inView')) {
      if($(a[i]).hasClass('end') == false) {
        $(a[i]).velocity({
          translateX: ['130%', '0%'],
          translateZ: [0,0]
        }, { duration: 800 });

        $(a[i]).removeClass('inView');

        $(a[i+1]).velocity({
          translateX: ['0%', '-130%'],
          translateZ: [0,0]
        }, { duration: 800 });

        $(a[i+1]).addClass('inView');
      }
      break;
    }
  }
}

function addSwipeListener() {
  var fp = document.querySelectorAll('.floorplan');

  for(var i = 0; i < fp.length; i++) {
    fp[i].addEventListener('touchstart', function(e) {
      if(e.touches.length == 1) { // get ready for possible swipe
        touchEvent.timestamp = e.timeStamp;
        touchEvent.x0 = e.touches[0].screenX;
        touchEvent.x1 = 0;
      } else { // reset 
        touchEvent.x0 = 0;
        touchEvent.x1 = 0;
      }
    });

    fp[i].addEventListener('touchend', function(e) {
      if(touchEvent.x0 == 0) {
        return;
      }

      if((e.timeStamp - touchEvent.timestamp) > 1500) {
        return;
      }

      var el = e.target;
      
      
      if(e.target.tagName == 'IMG') {
        el = e.target.parentElement;
      }

      touchEvent.x1 = e.changedTouches[0].screenX;
      var distance = Math.abs(touchEvent.x1 - touchEvent.x0);

      if(distance < 80) {
        return;
      }

      if(touchEvent.x1 < touchEvent.x0) {
        swipeLeft(el);
        touchEvent.x0 = 0;
        touchEvent.x1 = 0;
        return;
      }

      if(touchEvent.x1 > touchEvent.x0) {
        swipeRight(el);
        touchEvent.x0 = 0;
        touchEvent.x1 = 0;
        return;
      }
    });
  }
}

function noscroll() {
  $('body').css({ overflow: 'hidden' });
  $('.screen').css({
    height: innerHeight + 32 + 'px',
    display: 'block'
  });
}

function addScroll() {
  $('body').css({ overflow: 'auto' });
  $('.screen').css({ display: 'none' });
  $('.popup-window').css({ display: 'none' });
}

function resetModal() {
  $('#tourModal iframe').remove();
  $('.glyphicon-refresh').css('display', 'inline-block');
}

function initform(purl, str, index) {
  $('.glyphicon-refresh').velocity({ rotateZ: [360,0]}, { duration: 1000, loop: true });
  var ifr = document.createElement('iframe');
  var sources = [
    "http://" + purl + ".caseinpointok.com/SouthernHills.html",
    "http://" + purl + ".caseinpointok.com/ParkTower.html",
    "http://" + purl + ".caseinpointok.com/RichmondPlaza.html",
    "http://www.caseinpointok.com/gurlSouthernHills.html",
    "http://www.caseinpointok.com/gurlParkTower.html",
    "http://www.caseinpointok.com/gurlRichmondPlaza.html"
  ];

  $('.modal-title').html('Request a tour of ' + str);

  ifr.addEventListener('load', function() {
    $('.glyphicon-refresh').css('display', 'none');
    $(ifr).css({
      display: 'block',
      width: '100%',
      height: '400px',
      border: 'none'
    });
  });

  ifr.frameBorder = 0;

  if(purl != "") {
    ifr.src = sources[index];
  }
  else if(index == 0) {
    ifr.src = sources[3];
  }
  else if(index == 1) {
    ifr.src = sources[4];
  }
  else if(index == 2) {
    ifr.src = sources[5];
  }
  
  $('#tourModal .modal-body').append(ifr);
}

function showIframe() {
  $('.glyphicon-refresh').css('display', 'none');
  $('iframe').css('display', 'block');
}

function achieveGoalViewProp(prop) {
  var ifr = document.querySelector('.properties iframe');
  var content = ifr.contentDocument || ifr.contentWindow;
  
  if(purl != '' && purl != 'facebook') content.querySelector('#purls ' + prop).click();
  else if(purl == 'facebook') content.querySelector('#facebook ' + prop).click();
  else content.querySelector('#gurls ' + prop).click();
}

function setupReferalModalHandler() {
  var ifr = document.querySelector('#referModal iframe');
  var src = ifr.src;
  var referralButtons = document.querySelectorAll('.popup button');

  referralButtons.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
      var content = ifr.contentDocument || ifr.contentWindow;
      if(content) {
        content.querySelector('input[name=referrer_property]').value = this.dataset.prop;
      }
    });
  });

  $('#referModal #close-modal').click(function() {
    ifr.src = src;
  });
}