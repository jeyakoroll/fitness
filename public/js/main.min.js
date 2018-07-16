$(document).ready(function() {
  var reviews = $('.reviews__slider');
  
  // reviews
  reviews.owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    autoplay: true,
    navContainer: '.reviews__navs',
    autoplayTimeout: 10000,
    responsiveClass:true,
    center: true,
    autoWidth: true,
    loop:true,
    items: 3,
    nav: false,
    dots: true,
    responsive:{
        0:{
          margin: 150,
          items: 1
        },
        1010:{
          margin: 20
        }
    }
  });

  $(window).on('scroll', function() {
    var menu = $('.menu');

    if ( $(this).scrollTop() <= 75 && menu.hasClass("move") ) {
        menu.removeClass("move").addClass("top");
    }
    else if ( $(this).scrollTop() > 75 && menu.hasClass("top") ){
        menu.removeClass("top").addClass("move");
    } 

  }); 

 
  //open popup
  $('.cd-popup-trigger').on('click', function(event){
    event.preventDefault();
    $('.cd-popup').addClass('is-visible');
  });
  
  //close popup
  $('.cd-popup').on('click', function(event){
    if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
      event.preventDefault();
      $(this).removeClass('is-visible');
    }
  });
  //close popup when clicking the esc keyboard button
  $(document).keyup(function(event){
    if(event.which=='27'){
      $('.cd-popup').removeClass('is-visible');
    }
  });

  // check what kind of sport you can
  var 
      name = $('.header__bottom-form_wrap input[name=name_first]'),
      weight = $('.header__bottom-form_wrap input[name=weight]'),
      floor = $('.header__bottom-form_wrap input[name=floor]'),
      age = $('.header__bottom-form_wrap input[name=age]'),
      checkbox = $('.sports__list-item input[type="checkbox"]'),
      button = $('.footer__form-button'),
      text = $('.choose__sport'),
      // kinds
      box = $('.sports__list-item input[name="box"]'),
      swim = $('.sports__list-item input[name="swimming"]'),
      simulator = $('.sports__list-item input[name="simulators"]'),
      yoga = $('.sports__list-item input[name="yoga"]'),
      alpinism = $('.sports__list-item input[name="alpinism"]'),
      diving = $('.sports__list-item input[name="diving"]'),
      skydiving = $('.sports__list-item input[name="skydiving"]'),
      karate = $('.sports__list-item input[name="karate"]');
      
  var kinds = [box, swim, simulator, yoga, alpinism, diving, skydiving, karate];
  
  kinds.map(function(name) {
    name.attr('disabled', 'disabled');
  });
  
  var data = store.get('data');

  if (data) {
    
    name.val(data.name);
    weight.val(data.weight);
    floor.val(data.floor);
    age.val(data.age);
    checkbox.each(function(key, elem) {
      var name = elem.name;
      elem.checked = data[name];
    });

  }
  

    age.on('input keyup', function(e) {
    
      if ( e.target.value < 14 ) {
        checkbox.prop('disabled', true);
        text.text('Вам должно быть больше 14');
      } else if ( e.target.value >= 14 && e.target.value <= 28 ) {
        checkbox.prop('disabled', true);
        text.text('Выберите ваш спорт');
        box.prop('disabled', false);
        alpinism.prop('disabled', false);
        karate.prop('disabled', false);
      } else if ( e.target.value >= 28 && e.target.value <= 42 ) {
        checkbox.prop('disabled', true);
        text.text('Выберите ваш спорт');
        skydiving.prop('disabled', false);
        simulator.prop('disabled', false);
        diving.prop('disabled', false);
      } else if ( e.target.value >= 42 && e.target.value <= 60 ) {
        checkbox.prop('disabled', true);
        text.text('Выберите ваш спорт');
        swim.prop('disabled', false);
        yoga.prop('disabled', false);
        diving.prop('disabled', false);
      } else {
        checkbox.prop('disabled', true);
        text.text('занимайтесь спортивной ходьбой');
      }
      
  });

  checkbox.change(function () {
    var checked = $( "input:checked" ).length;
    if ( !checked ) {
      button.removeClass('obvious').addClass('latent');    
    } else if ( checked ) {
      button.removeClass('latent').addClass('obvious');
    }
  })


  button.on('click', function(e) {
    e.preventDefault();
    var form = {
      name : name.val(),
      weight : weight.val(),
      floor : floor.val(),
      age : age.val()
    }
    
  checkbox.each(function(key, elem) {
    var name = elem.name;
    form[name] = elem.checked;
  });

  store.set('data', form);
  
  $('.cd-popup').removeClass('is-visible');
  })
  // save data

  
})
