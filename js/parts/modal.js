(function(){
  "use strict";

  var modal = $('.sf-modal');
  var modalCloseBtn = $('.sf-modal-close');
  var modalBackdrop = $('.sf-modal-backdrop');

  var tapend = _shunfei.TAPEND || 'touchend';
  modalCloseBtn.on(tapend, function() {
    modal.addClass('hide');
    ___log('关闭详情页');
  })
  modalBackdrop.on(tapend, function() {
    modal.addClass('hide');
    ___log('关闭详情页');
  });
})();