(function() {
  "use strict";

  var bottomFloat = $('.bottom-float');
  var formPage = $('.form-page');
  var nameInputElm = $('.form-page input[name=uname]');
  var mobileInputElm = $('.form-page input[name=mobile]');
  var agreeCheckbox = formPage.find('input[name=agree]');

  var submitBtn = $('.submit-btn');


  // 输入框事件，隐藏悬浮窗
  nameInputElm.on('focus', function() {
    bottomFloat.hide();
  });
  nameInputElm.on('blur', function() {
    bottomFloat.show();
  });
  mobileInputElm.on('focus', function() {
    bottomFloat.hide();
  });
  mobileInputElm.on('blur', function() {
    bottomFloat.show();
  });


  // 同意提交个人信息
  agreeCheckbox.on('touchend', function( ) {
    ___log('点击是否同意checkbox, 点击后的结果为: ' + agreeCheckbox.prop('checked'));
  });

  // 活动详情
  var detailModal = $('.sf-modal');
  var moreDetailBtn = $('.more-detail');
  moreDetailBtn.on('touchend', function() {
    detailModal.removeClass('hide');
    ___log('显示活动详情');
  });

  // 提交按钮事件
  // 发送数据
  submitBtn.on('touchend', function (ev) {
    ev.preventDefault();
    // 注意，这里使用setTimeout是因为ios上直接调用含alert的方法会导致事件在其他touchend事件触发时的二次触发
    setTimeout(function () {
      var uname = nameInputElm.val();
      var mobile = mobileInputElm.val();
      var agree = agreeCheckbox.prop('checked');

      // 下面3行为测试代码，实际投放时请注释掉
      //alert(uname);
      //alert(mobile);
      //alert(agree);

      if (!uname) {
        ___log("名称缺失");
        return alert("请填写名称");
      }

      if (!mobile) {
        ___log("电话缺失");
        return alert("请填写电话");
      }

      if (!agree) {
        ___log('不同意提交');
        return alert('你需要同意提交个人信息');
      }

      _CWiQ.push(['_trackReg', 1]);
      ___log('submit');
      window._CiQ10412 = window._CiQ10412 || [];
      window._CiQ10412.push(['_trackEvent', {
        type: 1,
        labels: [
          {'1': uname}
          , {'2': mobile}
          , {'3': window._shunfei.userIp}
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
})();