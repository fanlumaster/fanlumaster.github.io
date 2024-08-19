/**
 * Handles debouncing of events via requestAnimationFrame
 * @see http://www.html5rocks.com/en/tutorials/speed/animations/
 * @param {Function} callback The callback to handle whichever event
 */
function Debouncer(callback) {
  this.callback = callback;
  this.ticking = false;
}

Debouncer.prototype = {
  constructor: Debouncer,

  /**
   * dispatches the event to the supplied callback
   * @private
   */
  update: function() {
    this.callback && this.callback();
    this.ticking = false;
  },

  /**
   * ensures events don't get stacked
   * @private
   */
  requestTick: function() {
    if (!this.ticking) {
      requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
      this.ticking = true;
    }
  },

  /**
   * Attach this as the event listeners
   */
  handleEvent: function() {
    this.requestTick();
  }
};


function listenScroll(callback) {
  var dbc = new Debouncer(callback);
  window.addEventListener('scroll', dbc, false);
  dbc.handleEvent();
  return dbc;
}


var navbarWidget = document.getElementById("navbar");
// var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
var prevScrollPos = Number.MAX_VALUE; // initial state
function helper() {
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
}

function toggleNavbar() {
  listenScroll(helper);
};

// use DOMContentLoaded to replace onload
document.addEventListener("DOMContentLoaded", function() {
  toggleNavbar();
});

// window.onload = function () {
//   toggleNavbar();
// };
