function _registerEvent(target, eventType, cb) {
    if (target.addEventListener) {
      target.addEventListener(eventType, cb);
      return {
        remove: function () {
          target.removeEventListener(eventType, cb);
        }
      };
    } else {
      target.attachEvent(eventType, cb);
      return {
        remove: function () {
          target.detachEvent(eventType, cb);
        }
      };
    }
  }
  
  export function openUriWithTimeoutHack(uri, failCb, successCb) {
  
    var timeout = setTimeout(function () {
      failCb();
      handler.remove();
    }, 1000);
  
    //handle page running in an iframe (blur must be registered with top level window)
    var target = window;
    while (target != target.parent) {
      target = target.parent;
    }
  
    var handler = _registerEvent(target, "blur", onBlur);
  
    function onBlur() {
      clearTimeout(timeout);
      handler.remove();
      successCb();
    }
  
    window.location = uri;
  
  }

