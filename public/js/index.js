// Swiper js scripts

  var swiper = new Swiper(".mySwiper", {
    infinite:true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      450: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      820: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween:0,
      },
    },
  });


  $('.s-checkbox').on('change', function() {
        $('.s-checkbox').not(this).prop('checked', false);  
    });


  // Navbar Scroll down solid, scroll up hide jquery
  $(function(){
    let scroll = $(document).scrollTop();
    let navHeight = $('.nav-area').outerHeight();

    // console.log(navHeight);

    $(window).scroll(function(){
      let scrolled = $(document).scrollTop();

      // console.log(scrolled)
      if(scrolled > navHeight){
        $('.nav-area').addClass('animate');
      }else{
        $('.nav-area').removeClass('animate');
      }

      if(scrolled > scroll){
        $('.nav-area').removeClass('sticky');
      }else{
        $('.nav-area').addClass('sticky');
      }

      scroll = $(document).scrollTop();

      // console.log(scroll)
    })
  })


  // responsive navbar

  const body = document.querySelector('body');
  const navbar = document.querySelector('.nav-area');
  const menuBtn = document.querySelector('.menu-btn');
  const cancelBtn = document.querySelector('.cancel-btn');

  menuBtn.onclick = () => {
    navbar.classList.add('show');
    menuBtn.classList.add('hide');
    body.classList.add('disabled');
  }

  cancelBtn.onclick = () => {
    navbar.classList.remove('show');
    menuBtn.classList.remove('hide');
    body.classList.remove('disabled');
  }





  // Hero banner Slick

  $('.hero-slick').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    prevArrow :".prevarrow-banner",
    nextArrow : ".nextarrow-banner",
    speed: 500,
    fade: true,
    cssEase: 'linear',
  })


  // Similar products slick slider js script 
  
$('.smiliar-product-slick').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 4,
  prevArrow :".prevarrow",
  nextArrow : ".nextarrow",
  pauseOnHover: true,
  dots : true,
  pauseOnDotsHover : true,
  mobileFirst : true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }      
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }      
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }      
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});



// Featured catagory- homepage

$('.featured-catagory-slick').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 4,
  prevArrow :".prevarrow-featured",
  nextArrow : ".nextarrow-featured",
  pauseOnHover: true,
  dots : true,
  pauseOnDotsHover : true,
  mobileFirst : true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }      
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }      
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }      
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


// MAgnify Image on Hover

$('.similar-img').extm({
  squareOverlay:true,
  // zoomElement:$('.product-text'),
  position:'right',
  rightPad: 20,
  zoomLevel: 3

})
