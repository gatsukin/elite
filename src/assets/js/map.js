// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
if (document.getElementById('map')) {
  ymaps.ready(mapInit);
}

if (document.getElementById('posadMap')) {
  ymaps.ready(posadMapInit);
}

function mapInit() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [56.010563, 92.852572],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 5,
    // Убираем все лишние кнопки
    controls: []
  });

  //////////////////////
  // КОЛЛЕКЦИЯ ТОЧЕК //
  ////////////////////

  // МАССИВ ДЛЯ ОБРАБОТАННОГО ЦИКЛА
  let points = []
  // ТЕСТОВЫЙ  МАССИВ ДАННЫХ
  let pointsArr = [{
      coordinates: [56.02057, 92.85253],
      type: 'house',
      name: 'Ультрасовременный коттедж в стиле Hi-tech в Сочи',
      price: '23 млн. руб',
      link: '/detail.html',
      city: 'г. Сочи',
      image: '/assets/img/temp/temp1.jpg',
      sq: '23',
      views: '390'
    },
    {
      coordinates: [51.02057, 92.85253],
      type: 'house',
      name: 'tested',
      price: '23 млн. руб',
      link: '/detail.html',
      city: 'г. Сочи',
      image: '/assets/img/temp/temp2.jpg',
      sq: '23',
      views: '100'
    }
  ]
  // ЦИКЛ ДЛЯ ОБРАБОТКИ МАССИВА
  for (var i = 0; i < pointsArr.length; i++) {
    let pointLayout = ymaps.templateLayoutFactory.createClass(`
      <div class="point" id="point-${i}">
      </div>
    `);
    let item = {
      "type": "Feature",
      "id": `${i+1}`,
      "info": {
        type: `${pointsArr[i].type}`,
        name: `${pointsArr[i].name}`,
        price: `${pointsArr[i].price}`,
        link: `${pointsArr[i].link}`,
        city: `${pointsArr[i].city}`,
        image: `${pointsArr[i].image}`,
        sq: `${pointsArr[i].sq}`,
        views: `${pointsArr[i].views}`,
      },
      "geometry": {
        "type": "Point",
        "coordinates": pointsArr[i].coordinates,
      },
      "properties": {
        "balloonContent": `123`,
        "clusterCaption": "нежилое готовое",
        "hintContent": "нежилое готовое",
      },
      options: {
        "id": `${i+1}`,
        hasBalloon: false,
        hasHint: false,
        zIndex: 3000,
        iconLayout: pointLayout,
        iconShape: {
          type: 'Circle',
          coordinates: [10, 10],
          radius: 15
        }
      }
    }
    points.push(item)
  }


  // ОТОБРАЖЕНИЕ МАССИВА "POINTS" НА КАРТЕ
  window.myObjects = ymaps.geoQuery({
    type: "FeatureCollection",
    features: points
  }).addToMap(myMap);


  // ВЫВОД КАРТОЧЕК ОБЪЕКТОВ
  const mapHTMLInner = document.getElementById('HTMLInner')
  for (let i = 0; i < points.length; i++) {
    const el = points[i];
    let id = `point-${i}`

    let template = `
      <div class="card ${el.info.type} opened">
          <div class="card--wrap">
            <div class="card--img">
              <img src="${el.info.image}" alt="">
            </div>
            <div class="card__main">
              <button class="mark">
                <svg>
                  <use xlink:href="#star" />
                </svg>
              </button>
              <div class="card__main--title">
                ${el.info.name}
              </div>
              <div class="card__main--city">
                ${el.info.city}
              </div>
              <div class="card__main--price">
                ${el.info.price}
              </div>
              <a href="${el.info.link}" class="card__main--link link">
                Перейти
              </a>
              <div class="info">
                <div class="square">
                  <span>${el.info.sq}</span> м<sup>2</sup>
                </div>
                <div class="review">
                  <span>${el.info.views}</span>
                  <svg>
                    <use xlink:href="#views" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    // ОТСЛЕЖИВАЕМ КЛИК ПО ТОЧКЕ НА КАРТЕ
    window.myObjects.search(`options.id="${el.id}"`).addEvents('click', function () {
      // ОБНУЛЯЕМ РАНЕЕ ВЫБРАННОЕ
      // стили
      document.querySelectorAll('.point').forEach(element => {
        element.classList.remove('open')
      });
      mapHTMLInner.classList.remove('scrolled')
      // вывод данных
      mapHTMLInner.innerHTML = '';

      // ВЫВОДИ НАЖАТУЮ ТОЧКУ
      // задаем стили точке
      let point = document.getElementById(`${id}`)
      point.classList.add('open')
      // Вставляем шаблон
      mapHTMLInner.insertAdjacentHTML("afterBegin", template)
      mapHTMLInner.classList.add('scrolled')
      // Плавно скролим до этого элемента (для мобилок)
      setTimeout(() => {
        mapHTMLInner.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      }, 50);
    });
  }
}


function posadMapInit() {
  // Создание карты.
  var myMap = new ymaps.Map("posadMap", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [56.010563, 92.852572],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 5,
      // Убираем все лишние кнопки
      controls: [],
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div>$[properties.iconContent]</div>'
    ),

    myPlacemarkWithContent = new ymaps.Placemark([56.010563, 92.852572], {
      hintContent: 'Наш офис'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: '/assets/img/icons/map-point.svg',
      // Размеры метки.
      iconImageSize: [25, 25],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-12, -12],
      // Смещение слоя с содержимым относительно слоя с картинкой.
      iconContentOffset: [15, 15],
      // Макет содержимого.
      iconContentLayout: MyIconContentLayout
    });

  myMap.geoObjects
    .add(myPlacemarkWithContent);

}
