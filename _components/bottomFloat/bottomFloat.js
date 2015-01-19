(function() {
  "use strict";

  var _shunfei = window._shunfei;

  // 立即预定按钮的事件
  $('.bottom-book').on('touchend', function() {
    _shunfei.mySwiper.swipeTo(_shunfei.totalPage + 1, 1000);
    // TODO: 寻找可以弹出键盘的方法
    //nameInputElm.focus();
    ___log('跳进表单页');
  });

  // 拨打电话的点击统计
  $('a.call').on('touchend', function() {
    ___log('拨打电话');
  });
})();
