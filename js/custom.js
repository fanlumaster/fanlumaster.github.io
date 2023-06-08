var navbarWidget = document.getElementById("navbar");

function toggleNavbar() {
  var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  window.addEventListener('scroll', function () {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (prevScrollPos > currentScrollPos) {
      // 向上滚动，显示导航栏
      // document.querySelector('nav').style.top = '0';
      // navbarWidget.classList.remove('nav-hidden');
      navbarWidget.style.top = '0';
    } else {
      // 向下滚动，隐藏导航栏
      // document.querySelector('nav').style.top = '-100px'; // 根据需要设置隐藏的位置
      // navbarWidget.classList.add('nav-hidden');
      navbarWidget.style.top = '-100px';
    }
    prevScrollPos = currentScrollPos;
  });
};

window.onload = function () {
  toggleNavbar();
};