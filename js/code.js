console.log('hello world');

var pageInfos = [
  //{imgSrc: 'img/01.jpg', wordsImgSrc: 'img/T01.png', wordsPos: '20%'},
  //{imgSrc: 'img/02.jpg', wordsImgSrc: 'img/T02.png', wordsPos: '26%'},
  //{imgSrc: 'img/03.jpg', wordsImgSrc: 'img/T03.png', wordsPos: '20%'},
  //{imgSrc: 'img/05.jpg', wordsImgSrc: 'img/T05.png', wordsPos: '50%'},
  //{imgSrc: 'img/06.jpg', wordsImgSrc: 'img/T06.png', wordsPos: '60%'},
  //{imgSrc: 'img/07.jpg', wordsImgSrc: 'img/T07.png', wordsPos: '48%'},
  //{imgSrc: 'img/08.jpg', wordsImgSrc: 'img/T08.png', wordsPos: '24%'},
  //{imgSrc: 'img/09.jpg', wordsImgSrc: 'img/T09.png', wordsPos: '20%'},
  {imgSrc: 'img/10.jpg', wordsImgSrc: 'img/T10.png', wordsPos: '20%'}
]

var logMap = {};

// TODO: 先初始化swiper
// 初始化swiper
var mySwiper = new Swiper('.swiper-container', {
  mode: 'vertical'
});

// 添加页面
function addSlides() {
  var pageTemplate = '  <div class="swiper-slide page">' +
    '  <div class="words">' +
    '  <img src="$wordsImgSrc">' +
    '  </div>' +
    '  <img class="main-img" data-original="$imgSrc">' +
    '  </div>';

  var formPart = $('.form-part');

  var i, len;
  for (i = 0, len = pageInfos.length; i < len; i++) {
    var pageInfo = pageInfos[i];

    // TODO: 改用正则
    var pageHtml;
    pageHtml = pageTemplate.split('$imgSrc').join(pageInfo.imgSrc);
    pageHtml = pageHtml.split('$wordsImgSrc').join(pageInfo.wordsImgSrc);

    var pageElm = $(pageHtml);
    var wordsElm = pageElm.find('.words');
    wordsElm.css('top', pageInfo.wordsPos);
    pageElm.insertBefore(formPart);
  }
}


// 该方法添加除第一页和表单页的所有页面
function addPages() {
  var pageTemplate = '  <div class="swiper-slide page">' +
    '  <div class="words">' +
    '  <img src="$wordsImgSrc">' +
    '  </div>' +
    '  <img class="main-img" data-original="$imgSrc">' +
    '  </div>';

  var formPart = $('.form-part');

  var i, len;
  for (i = 0, len = pageInfos.length; i < len; i++) {
    var pageInfo = pageInfos[i];

    // TODO: 改用正则
    var pageHtml;
    pageHtml = pageTemplate.split('$imgSrc').join(pageInfo.imgSrc);
    pageHtml = pageHtml.split('$wordsImgSrc').join(pageInfo.wordsImgSrc);

    var pageElm = $(pageHtml);
    var wordsElm = pageElm.find('.words');
    wordsElm.css('top', pageInfo.wordsPos);
    pageElm.insertBefore(formPart);
  }
}

//addPages();

var bottomFloat = $('.bottom-float');
//var nameInputElm = $('.form-page input[name=uname]');
var mobileInputElm = $('.form-page input[name=mobile]');

var totalPage = pageInfos.length;
var preIndex = 0;

// 读取下一页图片
function loadNextPageImg(nextIndex, nextEle) {
  nextEle.find('.main-img').each(function(){
    var jqElm = $(this);
    if (!jqElm.attr('src')) {
      var src = jqElm.attr( "data-original" );
      jqElm.attr('src', src);
    }
  })
}



