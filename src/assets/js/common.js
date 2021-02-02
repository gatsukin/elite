// Фиксированная шапка
const header = document.getElementById('header')
const headerMap = document.querySelector('.header__main--map')
if (document.getElementById('map')) {
  header.classList.add("fixed");
  headerMap.style.display = "none"
} else if (header.classList.contains('fixed')) {
  header.classList.remove("fixed");
}
// Добавление маски телефона на карточку
if (document.getElementById('tel')) {
  var phoneMask = IMask(
    document.getElementById('tel'), {
      mask: '+{7}(000)000-00-00'
    });
}
// Добавление маски телефона в модалке
if (document.getElementById('modal-tel')) {
  var phoneMask = IMask(
    document.getElementById('modal-tel'), {
      mask: '+{7}(000)000-00-00'
    });
}
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
if (document.getElementById('modal')) {
  const modal = document.getElementById('modal')
  const button = document.querySelectorAll('.modalOpen')
  const buttonClose = document.getElementById('modal-close')

  for (let i = 0; i < button.length; i++) {
    const el = button[i];

    // Открытие
    el.addEventListener("click", function () {
      modal.style.display = 'flex'
      setTimeout(() => {
        modal.classList.toggle('open')
      }, 10);
    });
  }
  // Закрытие
  buttonClose.addEventListener("click", function () {
    modal.classList.remove('open')
    setTimeout(() => {
      modal.style.display = 'none'
    }, 300);
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
// Галлерея фотографий
if (document.getElementById('lightgallery')) {
  lightGallery(document.getElementById('lightgallery'), {
    selector: '.item',
    actualSize: false
  });
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
