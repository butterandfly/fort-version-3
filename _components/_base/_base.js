(function() {
  "use strict";

  sfLog.init({callback: function(msg) {
    //console.log(msg);
    ___log(msg);
  }});

  var _shunfei = window._shunfei = {
    userIp: null
  };

  var pageInfos = [
    {imgSrc: 'img/01.jpg', wordsImgSrc: 'img/T01.png', wordsPos: '20%'},
    {imgSrc: 'img/02.jpg', wordsImgSrc: 'img/T02.png', wordsPos: '26%'},
    {imgSrc: 'img/03.jpg', wordsImgSrc: 'img/T03.png', wordsPos: '20%'},
    //{imgSrc: 'img/04.jpg', wordsImgSrc: 'img/T04.png', wordsPos: '0%'}
    {imgSrc: 'img/05.jpg', wordsImgSrc: 'img/T05.png', wordsPos: '50%'},
    {imgSrc: 'img/06.jpg', wordsImgSrc: 'img/T06.png', wordsPos: '60%'},
    {imgSrc: 'img/07.jpg', wordsImgSrc: 'img/T07.png', wordsPos: '48%'},
    {imgSrc: 'img/08.jpg', wordsImgSrc: 'img/T08.png', wordsPos: '24%'},
    {imgSrc: 'img/09.jpg', wordsImgSrc: 'img/T09.png', wordsPos: '20%'},
    {imgSrc: 'img/10.jpg', wordsImgSrc: 'img/T10.png', wordsPos: '20%'},
    {imgSrc: 'img/11.jpg', wordsImgSrc: 'img/T11.png', wordsPos: '30%'}
  ]

  var logMap = {};

  // 该方法添加除第一页和表单页的所有页面
  function addPages() {
    var pageTemplate = '  <div class="swiper-slide page">' +
      '  <div class="words">' +
      '  <img src="$wordsImgSrc" alt=""/>' +
      '  </div>' +
      '  <img class="main-img" data-original="$imgSrc" alt=""/>' +
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

  addPages();


      // “进无止境”logo
  var logoElm = $('.logo-line'),
      // 预约试驾按钮
      jumpBookBtn = $('.bottom-book'),
      // 返回顶部按钮
      jumpTopBtn = $('.bottom-cancel');

  _shunfei.totalPage = pageInfos.length;
  var preIndex = 0;

  // 初始化swiper
  _shunfei.mySwiper = new Swiper('.swiper-container', {
    mode: 'vertical',
    onSwiperCreated: function(swiper) {
      loadNextPageImg(1, $(swiper.slides[1]));
    },
    onSlideChangeStart: function(swiper) {
      // 读取当前图片
      $('.swiper-slide-visible .main-img').each(function(){
        var jqElm = $(this);
        if (!jqElm.attr('src')) {
          var src = jqElm.attr( "data-original" );
          jqElm.attr('src', src);
        }
      })

      // 读取下一页图片
      var nextIndex = swiper.activeIndex + 1;
      var nextEle = $(swiper.slides[nextIndex]);
      loadNextPageImg(nextIndex, nextEle);
    },
    onSlideChangeEnd: function(swiper) {
      var preEle = $(swiper.slides[preIndex]);
      var preWords = preEle.find('.words');
      if (preWords && preWords.length > 0) {
        preWords.removeClass('show');
      }

      var ele = swiper.slides[swiper.activeIndex];
      var words = $(ele).find('.words');
      if (words && words.length > 0) {
        words.addClass('show');
      }

      var currentIndex = swiper.activeIndex;
      var preIndexStr = '' + preIndex;
      // 第一页为0
      if (!logMap[currentIndex]) {
        logMap[currentIndex] = true;
        //console.log(preIndex  + ' -> ' + currentIndex);
        ___log(preIndex  + ' -> ' + currentIndex);
      }
      preIndex = swiper.activeIndex;

      var currentIndex = swiper.activeIndex;
      var formIndex = swiper.slides.length - 1;
      if (currentIndex === formIndex) {
        // 表单页要隐藏logo与替换预约试驾
        logoElm.addClass('hide');
        jumpBookBtn.addClass('hide');
        jumpTopBtn.removeClass('hide');
      } else {
        // 非表单页显示logo，显示预约试驾
        logoElm.removeClass('hide');
        jumpTopBtn.addClass('hide');
        jumpBookBtn.removeClass('hide');
      }
    }
  });

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
})();