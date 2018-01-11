$(function(){
  $('.region-main a[href="/user/login"]').click(function() {
    $('#toolbox #block-nscc-1 a[href="/user/login"]').click();
    return false;
  });
});