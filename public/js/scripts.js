Modernizr.load([{
  test: Modernizr.borderradius,
}]);
jQuery(document).ready(function($) {
  var isNavStick = false;
  if ($(window).width() > 768) {
    $('#search-header').css('marginTop', ((($('#logo').height()) / 2) - ($('#search-header').height() / 2)) + 'px');
    $('#sidebar-top').css('marginTop', ((($('#logo').height()) / 2) - ($('#sidebar-top').height() / 2)) + 'px');
  }
  $(".widget_video").fwCarousel();
  $('.tabs').fwTabs();
  $('.post_content, .video-post-wrap').fitVids();
  $('ul.menu li').mouseenter(function() {
    $('ul:first', this).css('visibility', 'visible').css('opacity', '0').stop(true, false).animate({
      'opacity': 1
    }, 300);
  }).mouseleave(function() {
    $('ul:first', this).css('visibility', 'visible').css('opacity', '1').stop(true, false).animate({
      'opacity': 0
    }, 300);
  });
  $('ul.menu li ul li').each(function() {
    if ($(this).has('.sub-menu').length > 0) $(this).addClass('has-child');
  });
  $(window).resize(function() {
    flexControlPosition();
    if ($(window).width() > 768) {
      $('#search-header').css('marginTop', ((($('#logo').height()) / 2) - ($('#search-header').height() / 2)) + 'px');
      $('#sidebar-top').css('marginTop', ((($('#logo').height()) / 2) - ($('#sidebar-top').height() / 2)) + 'px');
    } else {
      $('#search-header').css('marginTop', '0');
      $('#sidebar-top').css('marginTop', '0');
    }
  });
  //if (!disableStickyMenu) {
    $(window).scroll(function() {
      if (($(document).scrollTop() > 80) && !isNavStick) {
        $('#inner-header').addClass('sticky-nav');
        $('.sticky-nav .nav').hide().slideDown('fast');
        isNavStick = true;
      }
      if (($(document).scrollTop() <= 80) && isNavStick) {
        $('#inner-header').removeClass('sticky-nav');
        $('.sticky-nav .nav').slideUp('fast');
        isNavStick = false;
      }
    });
  //}
  if (!Modernizr.input.placeholder) {
    $(this).find('[placeholder]').each(function() {
      $(this).val($(this).attr('placeholder'));
      if ($(this).val() == $(this).attr('placeholder')) {
        $(this).addClass('placeholder');
      }
    });
    $('[placeholder]').focus(function() {
      if ($(this).val() == $(this).attr('placeholder')) {
        $(this).val('');
        $(this).removeClass('placeholder');
      }
    }).blur(function() {
      if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
        $(this).val($(this).attr('placeholder'));
        $(this).addClass('placeholder');
      }
    });
    $('[placeholder]').closest('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        if ($(this).val() == $(this).attr('placeholder')) {
          $(this).val('');
        }
      });
    });
  }
});

function flexControlPosition() {
  titlePos = jQuery('#featured-slider .flex-active-slide article').position().top;
  jQuery('#featured-slider .flex-direction-nav').css('top', titlePos + 5 + 'px').stop();
}

function flexControlHide() {
  jQuery('#featured-slider .flex-direction-nav').stop();
}
(function(w) {
  if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1)) {
    return;
  }
  var doc = w.document;
  if (!doc.querySelector) {
    return;
  }
  var meta = doc.querySelector("meta[name=viewport]"),
    initialContent = meta && meta.getAttribute("content"),
    disabledZoom = initialContent + ",maximum-scale=1",
    enabledZoom = initialContent + ",maximum-scale=10",
    enabled = true,
    x, y, z, aig;
  if (!meta) {
    return;
  }

  function restoreZoom() {
    meta.setAttribute("content", enabledZoom);
    enabled = true;
  }

  function disableZoom() {
    meta.setAttribute("content", disabledZoom);
    enabled = false;
  }

  function checkTilt(e) {
    aig = e.accelerationIncludingGravity;
    x = Math.abs(aig.x);
    y = Math.abs(aig.y);
    z = Math.abs(aig.z);
    if (!w.orientation && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
      if (enabled) {
        disableZoom();
      }
    } else if (!enabled) {
      restoreZoom();
    }
  }
  w.addEventListener("orientationchange", restoreZoom, false);
  w.addEventListener("devicemotion", checkTilt, false);
})(this);
(function($) {
  $.fn.fwTabs = function(options) {
    var settings = $.extend({}, $.fn.fwTabs.defaults, options);
    var active = 0;
    var tabs = $(this);
    $('.nav-tab li', tabs).click(function() {
      idx = $(this).index();
      if (idx == $('.nav-tab li.tab-active', tabs).index()) return false;
      startTab(tabs, idx);
      return false;
    });

    function startTab(tabs, idx) {
      $('.active', tabs).fadeOut().removeClass('active').addClass('hide');
      $('.tab-content', tabs).eq(idx).removeClass('hide').addClass('active').fadeIn();
      $('li.tab-active', tabs).removeClass('tab-active');
      $('.nav-tab li', tabs).eq(idx).addClass('tab-active');
    }

    function resizeTab(tabs) {
      $('.nav-tab li', tabs).css({
        'padding-left': '0px',
        'padding-right': '0px'
      });
      total = tabs.width();
      firstTab = $('.nav-tab li', tabs).eq(0).width();
      secondTab = $('.nav-tab li', tabs).eq(1).width() - 1;
      thirdTab = $('.nav-tab li', tabs).eq(2).width() - 1;
      totalTab = firstTab + secondTab + thirdTab;
      thePad = (total - totalTab) / 6;
      if (total >= totalTab) {}
    }
  };
  $.fn.fwCarousel = function(options) {
    defaults = {
      autoPlay: false,
      delay: 5000,
      onScreen: 1,
      fixedHeight: true
    };
    $.extend(defaults, options);
    var settings = defaults;
    var active = 1;
    var carousel = $(this);
    var numberItem = $('.item', carousel).length;
    if (numberItem <= settings.onScreen) {
      $('.slider-prev, .slider-next', carousel).hide();
    }
    $('.slider-prev', carousel).click(function() {
      if (active > 1) carouselSlide(active - 1);
      return false;
    });
    $('.slider-next', carousel).click(function() {
      if (active < (numberItem - (settings.onScreen - 1))) carouselSlide(active + 1);
      else carouselSlide(1);
      return false;
    });
    $('.nav-index', carousel).click(function() {
      var ths = $(this);
      step = $('.custom-loop nav .nav-index', carousel).index(ths) + 1;
      if (active != step) {
        carouselSlide(step);
      }
      return false;
    });
    $(window).resize(function() {
      carouselSlide(active);
    });
    var timer = 0;
    if (settings.autoPlay) {
      timer = setInterval(function() {
        if (active < (numberItem - (settings.onScreen - 1)))
          carouselSlide(active + 1);
        else
          carouselSlide(1);
      }, settings.delay);
    }

    function carouselSlide(idx) {
      padding = $('.item', carousel).eq(active).css('paddingRight');
      if (typeof padding == 'undefined') padding = '0px';
      padding = padding.replace('px', '') * 2;
      margin = (Math.round($('.item', carousel).eq(active - 1).width()) + Math.round(padding)) * (idx - 1);
      $('.loop-items', carousel).animate({
        marginLeft: '-' + margin + 'px'
      });
      active = idx;
      $('.active-index', carousel).removeClass('active-index');
      $('.nav-index', carousel).eq(active - 1).addClass('active-index');
    }
  }
})(jQuery);

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);
  if (delta < 60) {
    return 'less than a minute ago';
  } else if (delta < 120) {
    return 'about a minute ago';
  } else if (delta < (60 * 60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if (delta < (120 * 60)) {
    return 'about an hour ago';
  } else if (delta < (24 * 60 * 60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if (delta < (48 * 60 * 60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}