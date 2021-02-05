// Добавление grid сетки библеотекой Masonry
// https://masonry.desandro.com/
// На главной
if (document.getElementById('IndexGrid')) {
  var IndexGridMsnry = new Masonry('#IndexGrid', {
    itemSelector: '.card',
    horizontalOrder: true,
    transitionDuration: '.2s',
  });
}
// Часто просматривают на детальной странице
if (document.getElementById('OftenViewed')) {
  var OftenViewedMsnry = new Masonry('#OftenViewed', {
    itemSelector: '.card',
    horizontalOrder: true,
    transitionDuration: '.2s',
  });
}
// Вы смотрели на детальной странице
if (document.getElementById('PreviouslyViewed')) {
  var PreviouslyViewedMsnry = new Masonry('#PreviouslyViewed', {
    itemSelector: '.card',
    horizontalOrder: true,
    transitionDuration: '.2s',
  });
}
// Функция интервала с поддержкой определенных повторений
function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    callback();
    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
};
// Функция инициализации на страницах
function gridFunc() {
  if (document.getElementById('IndexGrid')) {
    IndexGridMsnry.layout();
  }
  if (document.getElementById('OftenViewed')) {
    OftenViewedMsnry.layout();
  }
  if (document.getElementById('PreviouslyViewed')) {
    PreviouslyViewedMsnry.layout();
  }
}
// Исправляем баги с grid сеткой при загрузке стилей
let pageEvents = ['load', 'DOMContentLoaded']
for (let i = 0; i < pageEvents.length; i++) {
  const event = pageEvents[i];
  gridFunc()
  window.addEventListener(event, function () {
    setIntervalX(function () {
      gridFunc()
    }, 300, 3);
  })
}

// скрол до элемента
function niceJoing(selection) {
  var events = ['load', 'scroll', 'resize']
  var show = true;
  var selector = document.querySelector(selection, events);
  for (var i = 0; i < events.length; i++) {

    window.addEventListener(events[i],
      function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        var elRect = selector.getBoundingClientRect()
        var w_top = window.pageYOffset; // Количество пикселей на которое была прокручена страница
        var e_top = elRect.top + window.pageYOffset // Расстояние от блока со счетчиками до верха всего документа
        var w_height = document.documentElement.clientHeight // Высота окна браузера
        var d_height = scrollHeight // Высота всего документа
        var e_height = selector.offsetHeight; // Полная высота блока со счетчиками

        if (w_top + w_height >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
          show = false
          console.log('asdas')
          gridFunc()
        }
      })
  }
}
if (document.getElementById('IndexGrid')) {
  niceJoing('#IndexGrid')
}
if (document.getElementById('OftenViewed')) {
  niceJoing('#OftenViewed')
}
if (document.getElementById('PreviouslyViewed')) {
  niceJoing('#PreviouslyViewed')
}
// Добавляем возможность открытия карточек посредством клика
let cardMassive = document.querySelectorAll('.card')
for (let i = 0; i < cardMassive.length; i++) {
  const el = cardMassive[i];

  function openCard() {
    if (!el.classList.contains('nonopen')) {
      el.classList.toggle('opened');
      // resize grid layout
      setIntervalX(function () {
        gridFunc()
      }, 100, 3);
    }
  };

  if (el.querySelector('.card--img')) {
    let openImgCard = el.querySelector('.card--img')
    openImgCard.addEventListener('click', openCard);
  }
  if (el.querySelector('.card__main--title')) {
    let openTitleCard = el.querySelector('.card__main--title')
    openTitleCard.addEventListener('click', openCard);
  }
}
