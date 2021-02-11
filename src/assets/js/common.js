// Окошко куки убирает эта функция
// Для временного использования
if (document.getElementById('cookies')) {
  document.getElementById('cookies-close').addEventListener('click', function () {
    document.getElementById('cookies').classList.remove('open')
  })
}
// Burger menu
let burgerBtn = document.getElementById('burgerBtn')
let burger = document.getElementById('burger')

burgerBtn.addEventListener('click', function () {
  burger.classList.toggle('open');
  if (burger.classList.contains('open')) {
    document.getElementById('reg-auth').checked = false
  }
})

// Темный режим
let mode = false;
let toggleArr = document.querySelectorAll('.toggle')

function checkToggle() {
  toggleArr.forEach(el => {
    if (mode) {
      el.classList.add('true')
    } else {
      el.classList.remove('true')
    }
  })
}
toggleArr.forEach(el => {
  el.addEventListener('click', function () {
    mode = !mode;
    checkToggle();
  })
});

// Фиксированная шапка на странице карты
const header = document.getElementById('header')
const headerMap = document.querySelector('.header__main--map')
if (document.getElementById('mainMap')) {
  header.classList.add("fixed");
  headerMap.style.display = "none"
} else if (document.getElementById('posad')) {
  header.classList.add("fixed", "min-style");
  headerMap.style.display = "none"
}
// Добавление маски телефона на карточку
let telArr = document.querySelectorAll('.tel')
telArr.forEach(element => {
  var phoneMask = IMask(element, {
    mask: '+{7}(000)000-00-00'
  });
});
// Нужно для корректного выявления высоты экрана
let events = ['load', 'resize']
for (var i = 0; i < events.length; i++) {
  // We listen to the resize event
  window.addEventListener(events[i], () => {
    // We execute the same script as before
    let vh = window.visualViewport.height * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })
}
// М0Д@Ло4КА
function openModal(element) {
  let elementOpen;
  const buttonClose = element.querySelector('.modal--close')

  element.style.display = 'flex'
  setTimeout(() => {
    element.classList.toggle('open')
    elementOpen = true;
  }, 10);

  // Закрытие
  buttonClose.addEventListener("click", function () {
    element.classList.remove('open')
    setTimeout(() => {
      element.style.display = 'none'
    }, 300);
    elementOpen = false;
  });


  //I'm using "click" but it works with any event
  document.addEventListener('click', function (event) {
    let elementChild = element.querySelector('.modal__content')
    var isClickInside = elementChild.contains(event.target);
    if (!isClickInside && elementOpen == true) {
      element.classList.remove('open')
      setTimeout(() => {
        element.style.display = 'none'
      }, 300);
      elementOpen = false;
    }
  });

}
// Кнопка скрола Наверх на странице с картой
if (document.getElementById('scroll-top')) {
  let scrollbtn = document.getElementById('scroll-top')
  scrollbtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

if (document.getElementsByClassName('filter')) {
  let chkboxArr = document.querySelectorAll('#type input')
  chkboxArr.forEach(el => {
    el.checked = true
  });
  let elArr = [];
  let lastEl = undefined;

  function checkboxListener(e) {
    if (lastEl == undefined || lastEl !== e) {
      lastEl = e
      chkboxArr.forEach(el => {
        el.checked = false
      });
      e.checked = true
    } else if (lastEl == e) {
      chkboxArr.forEach(el => {
        el.checked = true
      });
      lastEl = undefined
    }
  }
  // Массив вариантов выпадашки
  let cityOpt = [{
      label: 'Красноярск',
      value: 'krasnoyarsk'
    },
    {
      label: 'Москва',
      value: 'Moscow'
    },
    {
      label: 'Саратов',
      value: 'Saratov'
    },
    {
      label: 'Another one',
      value: 'etc'
    }
  ];
  let costOpt = [{
      label: '1млн. - 10млн.',
      value: '12'
    },
    {
      label: '10млн. - 20млн.',
      value: 'Moscow'
    },
    {
      label: '20млн. - 30млн.',
      value: 'Saratov'
    },
    {
      label: '30млн. - 50млн.',
      value: 'etc'
    },
    {
      label: '50млн. - 100млн.',
      value: 'etc'
    }
  ];
  let distOpt = [{
      label: 'Центральный р-н',
      value: 'krasnoyarsk'
    },
    {
      label: 'Ленинский р-н',
      value: 'Moscow'
    },
    {
      label: 'Косой переулок',
      value: 'Saratov'
    },
    {
      label: 'Октябрьский',
      value: 'etc'
    }
  ];
  let sqOpt = [{
      label: '30кв.м - 50кв.м',
      value: 'krasnoyarsk'
    },
    {
      label: '50кв.м - 150кв.м',
      value: 'Moscow'
    },
    {
      label: '150кв.м - 300кв.м',
      value: 'Saratov'
    },
    {
      label: 'больше 300кв.м',
      value: 'etc'
    }
  ];

  // Инициализация выпадашек
  VirtualSelect.init({
    ele: '#city',
    options: cityOpt,
    placeholder: 'Город'
  });
  VirtualSelect.init({
    ele: '#cost',
    options: costOpt,
    multiple: true,
    placeholder: 'Стоимость',
    search: false
  });
  VirtualSelect.init({
    ele: '#dist',
    options: distOpt,
    multiple: true,
    placeholder: 'Район',
    search: false
  });
  VirtualSelect.init({
    ele: '#sq',
    options: sqOpt,
    multiple: true,
    placeholder: 'Площадь',
    search: false
  });

  // https://sa-si-dev.github.io/virtual-select/#/methods
  // ПОЛУЧЕНИЕ ИНФОРМАЦИИ ИЗ СЕЛЕКТОВ
  // document.querySelector('#city').value;
  // document.querySelector('#cost').value;
  // document.querySelector('#dist').value;
  // document.querySelector('#sq').value;
}

// Добавление в избранное
let bookmarks = document.querySelectorAll('.mark')
bookmarks.forEach(element => {
  let saved = false;
  element.addEventListener('click', function () {
    saved = !saved
    if (saved) {
      element.classList.add('saved')
    } else {
      element.classList.remove('saved')
    }
  })
});


if (document.querySelector('.slider-for') && document.querySelector('.slider-nav')) {
  $(document).ready(function () {
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      asNavFor: '.slider-nav',
      adaptiveHeight: true
    });
    $('.slider-nav').slick({
      slidesToShow: 6,
      centerMode: true,
      arrows: false,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      infinite: false,
      focusOnSelect: true,
      useTransform: false,
      useCSS: false,
      speed: 0,
      responsive: [{
        breakpoint: 575,
        settings: {
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          useTransform: true,
          useCSS: true,
        }
      }]
    });
  });
}
