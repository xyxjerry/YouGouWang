//     导航栏固定
$('.navigation ul li').hover(function () {
  $(this).children('.wShoesAll').stop().slideToggle()
})


$(window).scroll(function () {
  if ($(document).scrollTop() > 260) {
    //console.log($(document).scrollTop())
    $('.navAll').css({
      'position': 'fixed',
      'top': 0,
      'border-bottom': '3px solid #000',
      'z-index': 100
    })
    $('.wShoesAll').css({
      'top': '55px'
    })
    $('.disLogo').css('display', 'block')
    if ($('.wShoesAll').stop().slideDown()) {
      $('.wShoesAll').hide()
    }
    return this
  } else {
    $('.navAll').css({
      'position': 'static',
      'border-bottom': 'none'
    })
    $('.wShoesAll').css({
      'top': '259px'
    })
    $('.disLogo').css('display', 'none')
  }

})

// 新品推荐   layer  提示登录框

// $('.icon-xin').click(function () {
//   let uid = localStorage.getItem('uid')
//   // console.log(uid)
//   layer.open({
//     type: 2,
//     title: '很多时候，我们想最大化看，比如像这个页面。',
//     shadeClose: true,
//     shade: false,
//     maxmin: true, //开启最大化最小化按钮
//     area: ['893px', '600px'],
//     content: '请先登录'
//   });
// })

