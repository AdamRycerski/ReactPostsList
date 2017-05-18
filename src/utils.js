const utils = {
  debounce(func, wait) {
    let isTimeoutSet = false;
    
    return function(...args) {
      let context = this;
      if (!isTimeoutSet) {
        setTimeout(() => {
          func.call(context, ...args);
          isTimeoutSet = false;
        }, wait);
        isTimeoutSet = true;
      }
    }
  }
};

export default utils;
