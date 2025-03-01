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
  });
