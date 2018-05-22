/*
 **  Copyright (C) Aldebaran Robotics
 **  See COPYING for the license
 **
 **  Author(s):
 **   - Laurent LEC    <llec@aldebaran-robotics.com>
 **   - Guillaume Quittet <guillaume.quittet@gmail.com>
 **
 */

function QiSession(host, resource) {
  host = host || window.location.host;
  resource = resource || "libs/qimessaging/1.0/socket.io";
  if (host.substring(0, 7) != "http://")
    host = "http://" + host;

  var _socket = io.connect(host, {
    resource: resource,
    'force new connection': true
  });
  var _dfd = new Array();
  var _sigs = new Array();
  var _idm = 0;

  _socket.on('reply', function (data) {
    var idm = data["idm"];

    if (data["result"] != null && data["result"]["metaobject"] != undefined) {
      var o = new Object();
      o.__MetaObject = data["result"]["metaobject"];
      var pyobj = data["result"]["pyobject"];
      _sigs[pyobj] = new Array();

      var methods = o.__MetaObject["methods"];
      for (var i in methods) {
        var methodName = methods[i]["name"];
        o[methodName] = createMetaCall(pyobj, methodName);
      }

      var signals = o.__MetaObject["signals"];
      for (var i in signals) {
        var signalName = signals[i]["name"];
        o[signalName] = createMetaSignal(pyobj, signalName);
      }

      _dfd[idm].resolve(o);
    } else {
      if (_dfd[idm].__cbi) {
        var cbi = _dfd[idm].__cbi;
        _sigs[cbi["obj"]][cbi["signal"]][data["result"]] = cbi["cb"];
      }
      _dfd[idm].resolve(data["result"]);
    }
    delete _dfd[idm];
  });

  _socket.on('error', function (data) {
    if (data["idm"]) {
      _dfd[data["idm"]].reject(data["result"]);
      delete _dfd[data["idm"]];
    }
  });

  _socket.on('signal', function (data) {
    var res = data["result"];
    var callback = _sigs[res["obj"]][res["signal"]][res["link"]];
    if (callback) {
      callback.apply(this, res["data"]);
    }
  });

  _socket.on('disconnect', function (data) {
    for (var idm in _dfd) {
      _dfd[idm].reject("Call " + idm + " canceled: disconnected");
      delete _dfd[idm];
    }
  });

  function createMetaCall(obj, method, data) {
    return function () {
      var idm = ++_idm;
      var args = Array.prototype.slice.call(arguments, 0);
      var promise = new Promise(function (resolve, reject) {
        _dfd[idm] = {
          resolve: resolve,
          reject: reject
        };
      });
      if (args[0] == "connect") {
        _dfd[idm].__cbi = data;
      }
      _socket.emit('call', {
        idm: idm,
        params: {
          obj: obj,
          method: method,
          args: args
        }
      });
      return promise;
    }
  }

  function createMetaSignal(obj, signal) {
    var s = new Object();
    _sigs[obj][signal] = new Array();
    s.connect = function (cb) {
      return createMetaCall(obj, "registerEvent", {
        obj: obj,
        signal: signal,
        cb: cb
      })(signal);
    }
    s.disconnect = function (l) {
      delete _sigs[obj][signal][l];
      return createMetaCall(obj, "unregisterEvent")(signal, l);
    }
    return s;
  }

  this.service = createMetaCall("ServiceDirectory", "service");

  this.socket = function () {
    return _socket;
  }
}
