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
var prevScrollPos = Number.MAX_VALUE; // initial state
// 为什么要定义 prev 的 prev 呢？因为这个是为了解决 vimiumc 插件的兼容问题的，使用 vimiumc 的 j 和 k 进行滚动时，很多时候一瞬间会获取两个坐标，这个响应的间隔比 scroll 事件的监听函数执行间隔要短，所以这里就兼容一下
var prevPrevScrollPos = Number.MAX_VALUE; // initial state
function helper() {
  var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  if (prevPrevScrollPos >= currentScrollPos) {
    // 向上滚动，显示导航栏
    navbarWidget.style.top = '0';
  } else {
    // 向下滚动，隐藏导航栏
    navbarWidget.style.top = '-100px';
  }
  prevPrevScrollPos = prevScrollPos;
  prevScrollPos = currentScrollPos;
}

function toggleNavbar() {
  listenScroll(helper);
};

// use DOMContentLoaded to replace onload
document.addEventListener("DOMContentLoaded", function() {
  toggleNavbar();
});
