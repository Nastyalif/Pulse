$(document).ready(function(){
  $('.carousel__inner').slick({
    // dots: true, /* кружочки, которые можно подставить и застилизовать - будут в навигации по доному слайду */
    speed: 1200, /* как быстро один слайд переключался на другой */
    // adaptiveHeight: true, /* будут картинки разной высоты */
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
    responsive: [ /* [] - обозначает масив даних */
      {
        breakpoint: 992, /* на каком промежутке устанавливают правила */
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
    });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this) /* .closest - команда, которая говорит, что нужно найти ближайший элемент */
        .index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
          $(item).each(function(i) {
              $(this).on('click', function(e) {
                  e.preventDefault();
                  $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                  $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
              })
          });
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modal

  $('[data-modal=consultation]').on('click', function(){ /* fadeOut() - красивое/анимированное скрытие элементов на странице */
      $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');/* сначала закрываються все неинтересуюшийся элементы и говорит, что эта часть будет fadeOut и выполняться оно будет медленно*/
  });


  $('.button_mini').each(function(i) {
    $(this).on('click',function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); /* внутри модального окна есть класс. Во внутрь помешяеться текст. eq - позволяют брать элементы попорядку  */
      $('.overlay, #order').fadeIn('slow');
    })
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');


  $('input[name=phone]').mask("+380 (99) 999-99-99")

  $('form').submit(function(e) {
    e.precventDefault();/* отменить стандарстное поведения браузера */
  });
});
