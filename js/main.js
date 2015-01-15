//(function() {


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
    {imgSrc: 'img/10.jpg', wordsImgSrc: 'img/T10.png', wordsPos: '20%'}
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

  // lazyload
  //$('.swiper-wrapper img').lazyload({
  //  threshold: 10,
  //  container: $(".swiper-wrapper")
  //});

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

  // 初始化swiper
  var mySwiper = new Swiper('.swiper-container', {
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
          //$(this).fadeOut(0).fadeIn(500);
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
        console.log(preIndex  + ' -> ' + currentIndex);
        ___log(preIndex  + ' -> ' + currentIndex);
      }
      preIndex = swiper.activeIndex;
    }
  });


  // 立即预定按钮的事件
  $('.bottom-book').on('touchend', function() {
    mySwiper.swipeTo(totalPage + 1, 1000);
    // TODO: 寻找可以弹出键盘的方法
    //nameInputElm.focus();
    ___log('跳进表单页');
  });

  // 输入框事件，隐藏悬浮窗
  //nameInputElm.on('focus', function() {
  //  bottomFloat.hide();
  //});
  //nameInputElm.on('blur', function() {
  //  bottomFloat.show();
  //});

  mobileInputElm.on('focus', function() {
    bottomFloat.hide();
  });
  mobileInputElm.on('blur', function() {
    bottomFloat.show();
  });

  // 拨打电话的点击统计
  $('a.call').on('touchend', function() {
    ___log('拨打电话');
  });


// 提交按钮事件
// 发送数据
  $(".submit-btn").on('touchend', function(ev) {
    ev.preventDefault();
    // 注意，这里使用setTimeout是因为ios上直接调用含alert的方法会导致事件在其他touchend事件触发时的二次触发
    setTimeout(function () {
      //var uname = $('input[name=uname]').val();
      var mobile = $('input[name=mobile]').val();
      var sex = $('input[name=sex]:checked').val();

      //if (!uname) {
      //  ___log("名称缺失");
      //  return alert("请填写名称");
      //}

      if (!mobile) {
        ___log("电话缺失");
        return alert("请填写电话");
      }

      // 下面4行为测试代码，实际投放时请注释掉
//        alert(uname);
//        alert(mobile);
//        alert(sex);
//        return;

      _CWiQ.push(['_trackReg', 1]);
      ___log('submit');
      window._CiQ10412 = window._CiQ10412 || [];
      window._CiQ10412.push(['_trackEvent', {
        type: 1,
        labels: [
          {'1': mobile}
          , {'2': ''}
          , {'3': ''}
          , {'4': ''}
          , {'5': ''}
          , {'6': ''}
          , {'7': ''}
        ],
        values: [
          {'数量': 1}
        ]
      }]);
      window.CClickiV3 && window.CClickiV3[10412] && window.CClickiV3[10412]._flushObserver(function () {
        alert("恭喜你预约成功！");
      });
    }, 0);
  });
//})();
