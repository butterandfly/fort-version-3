(function() {
  "use strict";

  var _shunfei = window._shunfei;

  var back2topBtn = $('.bottom-cancel');
  back2topBtn.on('click', function(ev) {
    window._shunfei.mySwiper.swipeTo(0, 1000);
  });

  // 立即预定按钮的事件
  $('.bottom-book').on('touchend', function() {
    _shunfei.mySwiper.swipeTo(_shunfei.totalPage + 1, 1000);
    // TODO: 寻找可以弹出键盘的方法
  });
})();
