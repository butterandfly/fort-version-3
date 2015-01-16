(function(){
  "use strict";

  var modal = $('.sf-modal');
  var modalCloseBtn = $('.sf-modal-close');

  var tapend = _shunfei.TAPEND || 'touchend';
  modalCloseBtn.on(tapend, function() {
    modal.addClass('hide');
  })
})();