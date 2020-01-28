document.addEventListener("DOMContentLoaded", function () {
  
  // Custom JS
  
  //Добавление и удаление классов по ширене экрана  ----------
  var windowWidth = $(window).width();
  if (windowWidth < 1200) $("header").addClass("mob-header");
  else $("header").removeClass("mob-header");
  
  $(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth < 1200) $("header").addClass("mob-header");
    else $("header").removeClass("mob-header");
  });
  //----------------------------------------------------------
  // Hamburger -----------------------------------------
  // drop down the menu, and swap the icon to the close icon ----------
  $('#nav-menu').click(function () {
    $('#nav-menu>.bar').toggleClass('animate');
    $('nav').toggleClass('nav-mob-visible');
  });
  //Make sure the menu icon behaves correctly when the menu is open
  $('.content').click(function () {
    $('#nav-menu>.bar').removeClass('animate');
    $('nav').removeClass('nav-mob-visible');
  });
//-------------------------------------------------------------------------
//-- Инициализация owl-carousel -------------------------------------------
  $('#slider-home').owlCarousel({
    items: 1,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    dotsSpeed: 250,
    nav: true,
    loop: true,
    margin: 10,
    // autoHeight:true,
  });
  //-------------------------------------------------------------------------
  $('#owl-car-recent').owlCarousel({
    items: 4,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    loop: true,
    margin: 0,
    // autoHeight:true,
    responsive : {
      // breakpoint from 0 up
      0 : {
        items: 1,
      },
      // breakpoint from 480 up
      480 : {
        items: 2,
      },
      // breakpoint from 768 up
      768 : {
        items: 3,
      },
      1023 : {
        items: 4,
      }
    },
  });
  
  $('#video-reviews__list').owlCarousel({
    items: 4,
    lazyLoad: true,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    // loop: true,
    // margin: 10,
    // autoHeight:true,
    responsive : {
      // breakpoint from 0 up
      0 : {
        items: 1,
      },
      // breakpoint from 480 up
      480 : {
        items: 2,
      },
      // breakpoint from 768 up
      768 : {
        items: 3,
      },
      1023 : {
        items: 4,
      }
    },
  });
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-- Вызов модального окна подписки на Youtube ----------------------------
  $("#popup_setCookie").click(function () {
    $.cookie("media_popup", "24house", {expires: 0});
    $("#media_bg_popup").hide();
  });
  
  if ($.cookie("media_popup") == null) {
    setTimeout(function () {
      $("#media_bg_popup").show();
    }, 4000)
  } else {
    $("#media_bg_popup").hide();
  }
//-------------------------------------------------------------------------
//--- <Вызов модального окна кнопок 'Купить эскизный проект' и получения сертификата>
  $("#callback-btn-open-popup").click(function() {
    $("#callback-overlay").toggleClass("open");
    $("#callback-container").toggleClass("open");
  });
  
  $("#discount-btn-open-popup").click(function() {
    $("#discount-overlay").toggleClass("open");
    $("#discount-container").toggleClass("open");
  });
  
  $("#buy-sketch-btn-open-popup").click(function() {
    $("#buySketch-overlay").toggleClass("open");
    $("#buySketch-container").toggleClass("open");
  });
  
  $(".modalCloseImg").click(function() {
    $(".simplemodal-overlay").removeClass("open");
    $(".simplemodal-container").removeClass("open");
  });
  
  $(".manager-call .hidden-btn").click(function() {
    $(".manager-call .hidden-text").toggleClass("active");
    $(".manager-call .hidden-btn").toggleClass("active");
  });
//--- </Вызов модального окна кнопок 'Купить эскизный проект' и получения сертификата> --

//--- <Расчетать с учётом дополнительной комплектации> -------------------
  $('.calculator-house .filter-item .item').bind('click', function (e) {
    var sum = 828865;
    var els = 0;
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
    } else {
      if ($(this).hasClass('brus')) {
        $('.item.brus.active').removeClass('active')
      }
      if ($(this).hasClass('blok')) {
        $('.item.blok.active').removeClass('active')
      }
      if ($(this).hasClass('soft') || $(this).hasClass('ruberoid')) {
        $('.item.soft.active,.item.ruberoid.active').removeClass('active')
      }
      if ($(this).hasClass('lenta') || $(this).hasClass('rosverk') || $(this).hasClass('vint') || $(this).hasClass('monolit')) {
        $('.item.lenta.active,.item.rosverk.active,.item.vint.active,.item.monolit.active').removeClass('active')
      }
      if ($(this).hasClass('calc2')) {
        $('.item.calc2.active').removeClass('active')
      }
      $(this).addClass('active');
    }
    
    var asd = getPrice(this, e);
    
    $('.calculator-house .filter-item .item.active').each(function (i) {
      sum += ($(this).attr('data') * 1);
      els += 1;
    })
    
    
    $('.totalels').html(els);
    sum = sum + '';
    var str = (sum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
    
    $('.totalsum').html(str + ' руб');
    
    if (els == 0) {
      $('.sklskl').html('ов');
    } else
      $('.sklskl').html(getNumEnding(els, ['', 'а', 'ов']));
  });
  
  
  function getNumEnding(iNumber, aEndings) {
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber >= 11 && iNumber <= 19) {
      sEnding = aEndings[2];
    } else {
      i = iNumber % 10;
      switch (i) {
        case (1):
          sEnding = aEndings[0];
          break;
        case (2):
        case (3):
        case (4):
          sEnding = aEndings[1];
          break;
        default:
          sEnding = aEndings[2];
      }
    }
    return sEnding;
  }
  
  
  function getPrice(element, event) {
    if (window.location.pathname.search("doma-iz-kleenogo-brusa") != -1) {
      elem = event.currentTarget;
      if ($(elem).find('.pull-left').text().search('Cтены') != -1) {
        
        var res = getResource($('h1.style-1').text());
        var rosverk = $('.rosverk ');
        var current_price_rosverk = parseInt($(rosverk).attr('price2'))
        var rosverk_price = 0;
        if (res != undefined) rosverk_price = parseInt(res[2]['св-рост - '])
        
        var lenta = $('.lenta');
        var current_price_lenta = parseInt($(lenta).attr('price2'))
        var lenta_price = 0;
        if (res != undefined) lenta_price = parseInt(res[1]['лента - '])
        
        var elem_price = parseInt($(elem).find('strong').text().replace(' ', ''))
        
        if ($(elem).is('.active')) {
          
          if ($(elem).find('.pull-left').text().search('Cтены 240') != -1) {
            $(rosverk).find('strong').text(thousandSeparator(current_price_rosverk + rosverk_price))
            $(rosverk).attr('data', current_price_rosverk + rosverk_price)
            $(lenta).find('strong').text(thousandSeparator(current_price_lenta + lenta_price))
            $(lenta).attr('data', current_price_lenta + lenta_price)
          } else {
            $(rosverk).find('strong').text(thousandSeparator(current_price_rosverk))
            $(rosverk).attr('data', current_price_rosverk)
            
            $(lenta).find('strong').text(thousandSeparator(current_price_lenta))
            $(lenta).attr('data', current_price_lenta)
          }
          
          if ($(rosverk).is('.active')) {
            current_price_rosverk1 = parseInt($(rosverk).attr('price2'))
            var total_price = parseInt($('.total').find('strong').text().replace(' ', ''))
            total = total_price - elem_price - current_price_rosverk
            $('.total').find('strong').text(current_price_rosverk1 + elem_price + total + " руб");
          }
          
          if ($(lenta).is('.active')) {
            current_price_lenta1 = parseInt($(lenta).attr('price2'))
            var total_price = parseInt($('.total').find('strong').text().replace(' ', ''))
            total = total_price - elem_price - current_price_lenta
            $('.total').find('strong').text(current_price_lenta1 + elem_price + total + " руб");
          }
        } else {
          
          
          $(rosverk).find('strong').text(thousandSeparator(current_price_rosverk))
          $(rosverk).attr('data', current_price_rosverk)
          
          $(lenta).find('strong').text(thousandSeparator(current_price_lenta))
          $(lenta).attr('data', current_price_lenta)
          
        }
        
      }
      
    }
  }
  
  
  function getResource(name) {
    var data = {};
    return data[name];
  }
  
  
  var thousandSeparator = function (str) {
    var parts = (str + '').split('.'),
      main = parts[0],
      len = main.length,
      output = '',
      i = len - 1;
    
    while (i >= 0) {
      output = main.charAt(i) + output;
      if ((len - i) % 3 === 0 && i > 0) {
        output = ' ' + output;
      }
      --i;
    }
    
    if (parts.length > 1) {
      output += '.' + parts[1];
    }
    return output;
  };
//--- </Расчетать с учётом дополнительной комплектации> -------------------
  
  // $('#productGallery').fotorama({
  //   maxheight: '389',
  //   nav: "thumbs",
  //   thumbHeight: "70",
  //   thumbWidth: "110",
  //   fit: "contain",
  //   thumbFit: "cover",
  //   // maxHeight: "100%",
  //   allowfullscreen: true,
  //   transition: 'crossfade',
  //   autoplay: "true",
  //   autoplay: "5000",
  //   stopautoplayontouch: "true",
  //   arrows: "true",
  //   // click: "true",
  //   swipe: "true",
  //   data: [
  //     {img: 'img/@2x/project-tver/tver.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/tver2.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/tver3.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/tver4.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/tver5.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/tver6.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/tver7.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08698.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08701.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08702.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08703.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08704.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08705.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08706.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08707.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08709.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08710.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc08711.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0275_1.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0276_1.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0347.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0349.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0352.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0353.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0356.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0358.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0363.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0365_1.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0393.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/dsc_0395.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2431.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2440.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2450.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2457.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2458.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2460.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2462.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2465.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2468.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2473.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     {img: 'img/@2x/project-tver/sam_2475.cc0c5fbd938ff173cd4b44f8a524e417102.jpg', thumb: ''},
  //     // {img: '', thumb: ''},
  //
  //   ]
  // });
  
  // $('#productGallery-kaliningrad').fotorama({
  //   maxheight: '389',
  //   nav: "thumbs",
  //   thumbHeight: "70",
  //   thumbWidth: "110",
  //   fit: "contain",
  //   thumbFit: "cover",
  //   // maxHeight: "100%",
  //   allowfullscreen: true,
  //   transition: 'crossfade',
  //   autoplay: "true",
  //   autoplay: "5000",
  //   stopautoplayontouch: "true",
  //   arrows: "true",
  //   // click: "true",
  //   swipe: "true",
  //   data: [
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41-1.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41-2.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41-3.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41-4.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41-p1.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/kaliningrad-41-41-p2.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/7.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/28.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/32.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/48.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/51.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0062-1.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0290-1.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0371.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0404.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0918.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0967.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-0981.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-1241.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //     {img: 'https://vitoslavica.ru/assets/components/phpthumbof/cache/dsc-1335.cc0c5fbd938ff173cd4b44f8a524e4172454.jpg', thumb: ''},
  //
  //   ]
  // });
  
  
  // --- <Инициализация fancybox для открытия видео в модальном окне> ----------
  $('.video-reviews__list li a').fancybox({
  });
  $('.grid-item a').fancybox({
  });
  // --- </Инициализация fancybox для открытия видео в модальном окне> ----------
  
  
  // $('#grid').masonry({
  //   // options
  //   itemSelector: '.grid-item',
  //   columnWidth: '.grid-sizer',
  //   percentPosition: true,
  //   gutter: 5,
  //   fitWidth: true
  // });
  
  // $('img.lazy').lazyLoad({
  //   effect: 'fadeIn',
  //   // effectspeed: 1000,
  //   // threshold: 200,
  //   load: function () {
  //     $('#grid').masonry('layout');
  //   }
  // });
  
  
  
  
  
  
  


  
  
  
  
  
  
  
  $(function() {
    $( ".mse2_number_slider" ).slider({
      range: true,
      min: 750000,
      max: 4364000,
      values: [ 750000, 4364000 ],
      slide: function( event, ui ) {
        $( "#minCost" ).val(ui.values[ 0 ]);
        $("#maxCost").val(ui.values[1]); }
    });
    // $( "#minCost" ).val($( ".mse2_number_slider" ).slider( "values", 0 ));
    // $("#maxCost").val($(".mse2_number_slider").slider( "values", 1 ));
  });
  
  
  
  
  //-------------------------------------------------------------------------
  //-------------------------------  $ end  ---------------------------------
  //-------------------------------------------------------------------------
});
