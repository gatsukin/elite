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
  let chkboxArr = document.querySelectorAll('.filter__checkbox-btn input')

  chkboxArr.forEach(el => {
    el.checked = true
  });


  function checkboxListener(e) {
    e.checked = true
    // Создаем массив без выбранного элемента
    let elArr = [];
    for (let i = 0; i < chkboxArr.length; i++) {
      const el = chkboxArr[i];
      if (el !== e) {
        elArr.push(el)
      }
    }
    // выключаем у массива флажки
    elArr.forEach(element => {
      element.checked = !element.checked
      console.log(element.checked, element.id)
    });
  }

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

  VirtualSelect.init({
    ele: '#city',
    options: cityOpt,
    placeholder: 'Город'
  });

  VirtualSelect.init({
    ele: '#cost',
    options: cityOpt,
    multiple: true,
    placeholder: 'Стоимость',
    search: false
  });

  VirtualSelect.init({
    ele: '#dist',
    options: cityOpt,
    multiple: true,
    placeholder: 'Район',
    search: false
  });

  VirtualSelect.init({
    ele: '#sq',
    options: cityOpt,
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
