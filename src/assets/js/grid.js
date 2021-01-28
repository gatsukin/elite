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
let pageEvents = ['load', 'DOMContentLoaded']
for (let i = 0; i < pageEvents.length; i++) {
  const event = pageEvents[i];
  window.addEventListener(event, function () {
    gridFunc()
  })
}
// Исправляем баги с grid сеткой при загрузке стилей

// Добавляем возможность открытия карточек посредством клика
let cardMassive = document.querySelectorAll('.card')
for (let i = 0; i < cardMassive.length; i++) {
  const el = cardMassive[i];
  el.addEventListener('click', function (event) {
    // change size of item via class
    // if (non links item)
    if (!el.classList.contains('nonopen')) {
      el.classList.toggle('opened');
      // resize grid layout
      setIntervalX(function () {
        gridFunc()
      }, 100, 3);
    }
  })
}
