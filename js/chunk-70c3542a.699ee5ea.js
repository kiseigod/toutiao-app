(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-70c3542a"],
  {
    "08b7": function (t, e, s) {
      const { PACKET_TYPES: n } = s("efcf"),
        o =
          "function" === typeof Blob ||
          ("undefined" !== typeof Blob &&
            "[object BlobConstructor]" ===
              Object.prototype.toString.call(Blob)),
        r = "function" === typeof ArrayBuffer,
        i = (t) =>
          "function" === typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t && t.buffer instanceof ArrayBuffer,
        c = ({ type: t, data: e }, s, c) =>
          o && e instanceof Blob
            ? s
              ? c(e)
              : a(e, c)
            : r && (e instanceof ArrayBuffer || i(e))
            ? s
              ? c(e)
              : a(new Blob([e]), c)
            : c(n[t] + (e || "")),
        a = (t, e) => {
          const s = new FileReader();
          return (
            (s.onload = function () {
              const t = s.result.split(",")[1];
              e("b" + t);
            }),
            s.readAsDataURL(t)
          );
        };
      t.exports = c;
    },
    "0c7b": function (t, e, s) {
      const n = s("6fb8"),
        o = s("fc5d"),
        r = s("b518")("engine.io-client:transport");
      class i extends o {
        constructor(t) {
          super(),
            (this.opts = t),
            (this.query = t.query),
            (this.readyState = ""),
            (this.socket = t.socket);
        }
        onError(t, e) {
          const s = new Error(t);
          return (
            (s.type = "TransportError"),
            (s.description = e),
            this.emit("error", s),
            this
          );
        }
        open() {
          return (
            ("closed" !== this.readyState && "" !== this.readyState) ||
              ((this.readyState = "opening"), this.doOpen()),
            this
          );
        }
        close() {
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              (this.doClose(), this.onClose()),
            this
          );
        }
        send(t) {
          "open" === this.readyState
            ? this.write(t)
            : r("transport is not open, discarding packets");
        }
        onOpen() {
          (this.readyState = "open"), (this.writable = !0), this.emit("open");
        }
        onData(t) {
          const e = n.decodePacket(t, this.socket.binaryType);
          this.onPacket(e);
        }
        onPacket(t) {
          this.emit("packet", t);
        }
        onClose() {
          (this.readyState = "closed"), this.emit("close");
        }
      }
      t.exports = i;
    },
    "0f89": function (t, e, s) {
      const n = s("7a2d"),
        o = s("2792");
      t.exports = function (t) {
        const e = t.xdomain,
          s = t.xscheme,
          r = t.enablesXDR;
        try {
          if ("undefined" !== typeof XMLHttpRequest && (!e || n))
            return new XMLHttpRequest();
        } catch (i) {}
        try {
          if ("undefined" !== typeof XDomainRequest && !s && r)
            return new XDomainRequest();
        } catch (i) {}
        if (!e)
          try {
            return new o[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (i) {}
      };
    },
    1121: function (t, e) {
      t.exports.pick = (t, ...e) =>
        e.reduce((e, s) => (t.hasOwnProperty(s) && (e[s] = t[s]), e), {});
    },
    1221: function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Decoder = e.Encoder = e.PacketType = e.protocol = void 0);
      const n = s("fc5d"),
        o = s("bcfb"),
        r = s("609d"),
        i = s("b518")("socket.io-parser");
      var c;
      (e.protocol = 5),
        (function (t) {
          (t[(t["CONNECT"] = 0)] = "CONNECT"),
            (t[(t["DISCONNECT"] = 1)] = "DISCONNECT"),
            (t[(t["EVENT"] = 2)] = "EVENT"),
            (t[(t["ACK"] = 3)] = "ACK"),
            (t[(t["CONNECT_ERROR"] = 4)] = "CONNECT_ERROR"),
            (t[(t["BINARY_EVENT"] = 5)] = "BINARY_EVENT"),
            (t[(t["BINARY_ACK"] = 6)] = "BINARY_ACK");
        })((c = e.PacketType || (e.PacketType = {})));
      class a {
        encode(t) {
          return (
            i("encoding packet %j", t),
            (t.type !== c.EVENT && t.type !== c.ACK) || !r.hasBinary(t)
              ? [this.encodeAsString(t)]
              : ((t.type = t.type === c.EVENT ? c.BINARY_EVENT : c.BINARY_ACK),
                this.encodeAsBinary(t))
          );
        }
        encodeAsString(t) {
          let e = "" + t.type;
          return (
            (t.type !== c.BINARY_EVENT && t.type !== c.BINARY_ACK) ||
              (e += t.attachments + "-"),
            t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
            null != t.id && (e += t.id),
            null != t.data && (e += JSON.stringify(t.data)),
            i("encoded %j as %s", t, e),
            e
          );
        }
        encodeAsBinary(t) {
          const e = o.deconstructPacket(t),
            s = this.encodeAsString(e.packet),
            n = e.buffers;
          return n.unshift(s), n;
        }
      }
      e.Encoder = a;
      class h extends n {
        constructor() {
          super();
        }
        add(t) {
          let e;
          if ("string" === typeof t) {
            if (this.reconstructor)
              throw new Error(
                "got plaintext data when reconstructing a packet"
              );
            (e = this.decodeString(t)),
              e.type === c.BINARY_EVENT || e.type === c.BINARY_ACK
                ? ((this.reconstructor = new u(e)),
                  0 === e.attachments && super.emit("decoded", e))
                : super.emit("decoded", e);
          } else {
            if (!r.isBinary(t) && !t.base64)
              throw new Error("Unknown type: " + t);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (e = this.reconstructor.takeBinaryData(t)),
              e && ((this.reconstructor = null), super.emit("decoded", e));
          }
        }
        decodeString(t) {
          let e = 0;
          const s = { type: Number(t.charAt(0)) };
          if (void 0 === c[s.type])
            throw new Error("unknown packet type " + s.type);
          if (s.type === c.BINARY_EVENT || s.type === c.BINARY_ACK) {
            const n = e + 1;
            while ("-" !== t.charAt(++e) && e != t.length);
            const o = t.substring(n, e);
            if (o != Number(o) || "-" !== t.charAt(e))
              throw new Error("Illegal attachments");
            s.attachments = Number(o);
          }
          if ("/" === t.charAt(e + 1)) {
            const n = e + 1;
            while (++e) {
              const s = t.charAt(e);
              if ("," === s) break;
              if (e === t.length) break;
            }
            s.nsp = t.substring(n, e);
          } else s.nsp = "/";
          const n = t.charAt(e + 1);
          if ("" !== n && Number(n) == n) {
            const n = e + 1;
            while (++e) {
              const s = t.charAt(e);
              if (null == s || Number(s) != s) {
                --e;
                break;
              }
              if (e === t.length) break;
            }
            s.id = Number(t.substring(n, e + 1));
          }
          if (t.charAt(++e)) {
            const n = p(t.substr(e));
            if (!h.isPayloadValid(s.type, n))
              throw new Error("invalid payload");
            s.data = n;
          }
          return i("decoded %s as %j", t, s), s;
        }
        static isPayloadValid(t, e) {
          switch (t) {
            case c.CONNECT:
              return "object" === typeof e;
            case c.DISCONNECT:
              return void 0 === e;
            case c.CONNECT_ERROR:
              return "string" === typeof e || "object" === typeof e;
            case c.EVENT:
            case c.BINARY_EVENT:
              return Array.isArray(e) && e.length > 0;
            case c.ACK:
            case c.BINARY_ACK:
              return Array.isArray(e);
          }
        }
        destroy() {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }
      }
      function p(t) {
        try {
          return JSON.parse(t);
        } catch (e) {
          return !1;
        }
      }
      e.Decoder = h;
      class u {
        constructor(t) {
          (this.packet = t), (this.buffers = []), (this.reconPack = t);
        }
        takeBinaryData(t) {
          if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
          ) {
            const t = o.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
          }
          return null;
        }
        finishedReconstruction() {
          (this.reconPack = null), (this.buffers = []);
        }
      }
    },
    "174f": function (t, e) {
      function s(t) {
        (t = t || {}),
          (this.ms = t.min || 100),
          (this.max = t.max || 1e4),
          (this.factor = t.factor || 2),
          (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
          (this.attempts = 0);
      }
      (t.exports = s),
        (s.prototype.duration = function () {
          var t = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var e = Math.random(),
              s = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - s : t + s;
          }
          return 0 | Math.min(t, this.max);
        }),
        (s.prototype.reset = function () {
          this.attempts = 0;
        }),
        (s.prototype.setMin = function (t) {
          this.ms = t;
        }),
        (s.prototype.setMax = function (t) {
          this.max = t;
        }),
        (s.prototype.setJitter = function (t) {
          this.jitter = t;
        });
    },
    "1b1a": function (t, e, s) {
      const n = s("0f89"),
        o = s("4e71"),
        r = s("fc5d"),
        { pick: i } = s("1121"),
        c = s("2792"),
        a = s("b518")("engine.io-client:polling-xhr");
      function h() {}
      const p = (function () {
        const t = new n({ xdomain: !1 });
        return null != t.responseType;
      })();
      class u extends o {
        constructor(t) {
          if ((super(t), "undefined" !== typeof location)) {
            const e = "https:" === location.protocol;
            let s = location.port;
            s || (s = e ? 443 : 80),
              (this.xd =
                ("undefined" !== typeof location &&
                  t.hostname !== location.hostname) ||
                s !== t.port),
              (this.xs = t.secure !== e);
          }
          const e = t && t.forceBase64;
          this.supportsBinary = p && !e;
        }
        request(t = {}) {
          return (
            Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts),
            new l(this.uri(), t)
          );
        }
        doWrite(t, e) {
          const s = this.request({ method: "POST", data: t }),
            n = this;
          s.on("success", e),
            s.on("error", function (t) {
              n.onError("xhr post error", t);
            });
        }
        doPoll() {
          a("xhr poll");
          const t = this.request(),
            e = this;
          t.on("data", function (t) {
            e.onData(t);
          }),
            t.on("error", function (t) {
              e.onError("xhr poll error", t);
            }),
            (this.pollXhr = t);
        }
      }
      class l extends r {
        constructor(t, e) {
          super(),
            (this.opts = e),
            (this.method = e.method || "GET"),
            (this.uri = t),
            (this.async = !1 !== e.async),
            (this.data = void 0 !== e.data ? e.data : null),
            this.create();
        }
        create() {
          const t = i(
            this.opts,
            "agent",
            "enablesXDR",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "autoUnref"
          );
          (t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
          const e = (this.xhr = new n(t)),
            s = this;
          try {
            a("xhr open %s: %s", this.method, this.uri),
              e.open(this.method, this.uri, this.async);
            try {
              if (this.opts.extraHeaders) {
                e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
                for (let t in this.opts.extraHeaders)
                  this.opts.extraHeaders.hasOwnProperty(t) &&
                    e.setRequestHeader(t, this.opts.extraHeaders[t]);
              }
            } catch (o) {}
            if ("POST" === this.method)
              try {
                e.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (o) {}
            try {
              e.setRequestHeader("Accept", "*/*");
            } catch (o) {}
            "withCredentials" in e &&
              (e.withCredentials = this.opts.withCredentials),
              this.opts.requestTimeout &&
                (e.timeout = this.opts.requestTimeout),
              this.hasXDR()
                ? ((e.onload = function () {
                    s.onLoad();
                  }),
                  (e.onerror = function () {
                    s.onError(e.responseText);
                  }))
                : (e.onreadystatechange = function () {
                    4 === e.readyState &&
                      (200 === e.status || 1223 === e.status
                        ? s.onLoad()
                        : setTimeout(function () {
                            s.onError(
                              "number" === typeof e.status ? e.status : 0
                            );
                          }, 0));
                  }),
              a("xhr data %s", this.data),
              e.send(this.data);
          } catch (o) {
            return void setTimeout(function () {
              s.onError(o);
            }, 0);
          }
          "undefined" !== typeof document &&
            ((this.index = l.requestsCount++), (l.requests[this.index] = this));
        }
        onSuccess() {
          this.emit("success"), this.cleanup();
        }
        onData(t) {
          this.emit("data", t), this.onSuccess();
        }
        onError(t) {
          this.emit("error", t), this.cleanup(!0);
        }
        cleanup(t) {
          if ("undefined" !== typeof this.xhr && null !== this.xhr) {
            if (
              (this.hasXDR()
                ? (this.xhr.onload = this.xhr.onerror = h)
                : (this.xhr.onreadystatechange = h),
              t)
            )
              try {
                this.xhr.abort();
              } catch (e) {}
            "undefined" !== typeof document && delete l.requests[this.index],
              (this.xhr = null);
          }
        }
        onLoad() {
          const t = this.xhr.responseText;
          null !== t && this.onData(t);
        }
        hasXDR() {
          return (
            "undefined" !== typeof XDomainRequest && !this.xs && this.enablesXDR
          );
        }
        abort() {
          this.cleanup();
        }
      }
      if (
        ((l.requestsCount = 0),
        (l.requests = {}),
        "undefined" !== typeof document)
      )
        if ("function" === typeof attachEvent) attachEvent("onunload", d);
        else if ("function" === typeof addEventListener) {
          const t = "onpagehide" in c ? "pagehide" : "unload";
          addEventListener(t, d, !1);
        }
      function d() {
        for (let t in l.requests)
          l.requests.hasOwnProperty(t) && l.requests[t].abort();
      }
      (t.exports = u), (t.exports.Request = l);
    },
    "1f65": function (t, e, s) {
      const { PACKET_TYPES_REVERSE: n, ERROR_PACKET: o } = s("efcf"),
        r = "function" === typeof ArrayBuffer;
      let i;
      r && (i = s("63b3"));
      const c = (t, e) => {
          if ("string" !== typeof t) return { type: "message", data: h(t, e) };
          const s = t.charAt(0);
          if ("b" === s) return { type: "message", data: a(t.substring(1), e) };
          const r = n[s];
          return r
            ? t.length > 1
              ? { type: n[s], data: t.substring(1) }
              : { type: n[s] }
            : o;
        },
        a = (t, e) => {
          if (i) {
            const s = i.decode(t);
            return h(s, e);
          }
          return { base64: !0, data: t };
        },
        h = (t, e) => {
          switch (e) {
            case "blob":
              return t instanceof ArrayBuffer ? new Blob([t]) : t;
            case "arraybuffer":
            default:
              return t;
          }
        };
      t.exports = c;
    },
    2792: function (t, e) {
      t.exports = (() =>
        "undefined" !== typeof self
          ? self
          : "undefined" !== typeof window
          ? window
          : Function("return this")())();
    },
    "2bc6": function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Socket = e.io = e.Manager = e.protocol = void 0);
      const n = s("87b9"),
        o = s("51f6"),
        r = s("8c6b");
      Object.defineProperty(e, "Socket", {
        enumerable: !0,
        get: function () {
          return r.Socket;
        },
      });
      const i = s("b518")("socket.io-client");
      t.exports = e = a;
      const c = (e.managers = {});
      function a(t, e) {
        "object" === typeof t && ((e = t), (t = void 0)), (e = e || {});
        const s = n.url(t, e.path),
          r = s.source,
          a = s.id,
          h = s.path,
          p = c[a] && h in c[a]["nsps"],
          u =
            e.forceNew || e["force new connection"] || !1 === e.multiplex || p;
        let l;
        return (
          u
            ? (i("ignoring socket cache for %s", r), (l = new o.Manager(r, e)))
            : (c[a] ||
                (i("new io instance for %s", r), (c[a] = new o.Manager(r, e))),
              (l = c[a])),
          s.query && !e.query && (e.query = s.queryKey),
          l.socket(s.path, e)
        );
      }
      e.io = a;
      var h = s("1221");
      Object.defineProperty(e, "protocol", {
        enumerable: !0,
        get: function () {
          return h.protocol;
        },
      }),
        (e.connect = a);
      var p = s("51f6");
      Object.defineProperty(e, "Manager", {
        enumerable: !0,
        get: function () {
          return p.Manager;
        },
      });
    },
    "2edd": function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.StrictEventEmitter = void 0);
      const n = s("fc5d");
      class o extends n {
        on(t, e) {
          return super.on(t, e), this;
        }
        once(t, e) {
          return super.once(t, e), this;
        }
        emit(t, ...e) {
          return super.emit(t, ...e), this;
        }
        emitReserved(t, ...e) {
          return super.emit(t, ...e), this;
        }
        listeners(t) {
          return super.listeners(t);
        }
      }
      e.StrictEventEmitter = o;
    },
    "32b9": function (t, e, s) {
      "use strict";
      function n(t, e, s) {
        return (
          t.on(e, s),
          function () {
            t.off(e, s);
          }
        );
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.on = void 0),
        (e.on = n);
    },
    "3f8d": function (t, e, s) {},
    "4e71": function (t, e, s) {
      const n = s("0c7b"),
        o = s("730f"),
        r = s("6fb8"),
        i = s("c159"),
        c = s("b518")("engine.io-client:polling");
      class a extends n {
        get name() {
          return "polling";
        }
        doOpen() {
          this.poll();
        }
        pause(t) {
          const e = this;
          function s() {
            c("paused"), (e.readyState = "paused"), t();
          }
          if (((this.readyState = "pausing"), this.polling || !this.writable)) {
            let t = 0;
            this.polling &&
              (c("we are currently polling - waiting to pause"),
              t++,
              this.once("pollComplete", function () {
                c("pre-pause polling complete"), --t || s();
              })),
              this.writable ||
                (c("we are currently writing - waiting to pause"),
                t++,
                this.once("drain", function () {
                  c("pre-pause writing complete"), --t || s();
                }));
          } else s();
        }
        poll() {
          c("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
        }
        onData(t) {
          const e = this;
          c("polling got data %s", t);
          const s = function (t, s, n) {
            if (
              ("opening" === e.readyState && "open" === t.type && e.onOpen(),
              "close" === t.type)
            )
              return e.onClose(), !1;
            e.onPacket(t);
          };
          r.decodePayload(t, this.socket.binaryType).forEach(s),
            "closed" !== this.readyState &&
              ((this.polling = !1),
              this.emit("pollComplete"),
              "open" === this.readyState
                ? this.poll()
                : c('ignoring poll - transport state "%s"', this.readyState));
        }
        doClose() {
          const t = this;
          function e() {
            c("writing close packet"), t.write([{ type: "close" }]);
          }
          "open" === this.readyState
            ? (c("transport open - closing"), e())
            : (c("transport not open - deferring close"), this.once("open", e));
        }
        write(t) {
          (this.writable = !1),
            r.encodePayload(t, (t) => {
              this.doWrite(t, () => {
                (this.writable = !0), this.emit("drain");
              });
            });
        }
        uri() {
          let t = this.query || {};
          const e = this.opts.secure ? "https" : "http";
          let s = "";
          !1 !== this.opts.timestampRequests &&
            (t[this.opts.timestampParam] = i()),
            this.supportsBinary || t.sid || (t.b64 = 1),
            (t = o.encode(t)),
            this.opts.port &&
              (("https" === e && 443 !== Number(this.opts.port)) ||
                ("http" === e && 80 !== Number(this.opts.port))) &&
              (s = ":" + this.opts.port),
            t.length && (t = "?" + t);
          const n = -1 !== this.opts.hostname.indexOf(":");
          return (
            e +
            "://" +
            (n ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            s +
            this.opts.path +
            t
          );
        }
      }
      t.exports = a;
    },
    "51f6": function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Manager = void 0);
      const n = s("f16e"),
        o = s("8c6b"),
        r = s("1221"),
        i = s("32b9"),
        c = s("174f"),
        a = s("2edd"),
        h = s("b518")("socket.io-client:manager");
      class p extends a.StrictEventEmitter {
        constructor(t, e) {
          super(),
            (this.nsps = {}),
            (this.subs = []),
            t && "object" === typeof t && ((e = t), (t = void 0)),
            (e = e || {}),
            (e.path = e.path || "/socket.io"),
            (this.opts = e),
            this.reconnection(!1 !== e.reconnection),
            this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(e.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
            this.randomizationFactor(e.randomizationFactor || 0.5),
            (this.backoff = new c({
              min: this.reconnectionDelay(),
              max: this.reconnectionDelayMax(),
              jitter: this.randomizationFactor(),
            })),
            this.timeout(null == e.timeout ? 2e4 : e.timeout),
            (this._readyState = "closed"),
            (this.uri = t);
          const s = e.parser || r;
          (this.encoder = new s.Encoder()),
            (this.decoder = new s.Decoder()),
            (this._autoConnect = !1 !== e.autoConnect),
            this._autoConnect && this.open();
        }
        reconnection(t) {
          return arguments.length
            ? ((this._reconnection = !!t), this)
            : this._reconnection;
        }
        reconnectionAttempts(t) {
          return void 0 === t
            ? this._reconnectionAttempts
            : ((this._reconnectionAttempts = t), this);
        }
        reconnectionDelay(t) {
          var e;
          return void 0 === t
            ? this._reconnectionDelay
            : ((this._reconnectionDelay = t),
              null === (e = this.backoff) || void 0 === e || e.setMin(t),
              this);
        }
        randomizationFactor(t) {
          var e;
          return void 0 === t
            ? this._randomizationFactor
            : ((this._randomizationFactor = t),
              null === (e = this.backoff) || void 0 === e || e.setJitter(t),
              this);
        }
        reconnectionDelayMax(t) {
          var e;
          return void 0 === t
            ? this._reconnectionDelayMax
            : ((this._reconnectionDelayMax = t),
              null === (e = this.backoff) || void 0 === e || e.setMax(t),
              this);
        }
        timeout(t) {
          return arguments.length ? ((this._timeout = t), this) : this._timeout;
        }
        maybeReconnectOnOpen() {
          !this._reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }
        open(t) {
          if (
            (h("readyState %s", this._readyState),
            ~this._readyState.indexOf("open"))
          )
            return this;
          h("opening %s", this.uri), (this.engine = n(this.uri, this.opts));
          const e = this.engine,
            s = this;
          (this._readyState = "opening"), (this.skipReconnect = !1);
          const o = i.on(e, "open", function () {
              s.onopen(), t && t();
            }),
            r = i.on(e, "error", (e) => {
              h("error"),
                s.cleanup(),
                (s._readyState = "closed"),
                this.emitReserved("error", e),
                t ? t(e) : s.maybeReconnectOnOpen();
            });
          if (!1 !== this._timeout) {
            const t = this._timeout;
            h("connect attempt will timeout after %d", t), 0 === t && o();
            const s = setTimeout(() => {
              h("connect attempt timed out after %d", t),
                o(),
                e.close(),
                e.emit("error", new Error("timeout"));
            }, t);
            this.opts.autoUnref && s.unref(),
              this.subs.push(function () {
                clearTimeout(s);
              });
          }
          return this.subs.push(o), this.subs.push(r), this;
        }
        connect(t) {
          return this.open(t);
        }
        onopen() {
          h("open"),
            this.cleanup(),
            (this._readyState = "open"),
            this.emitReserved("open");
          const t = this.engine;
          this.subs.push(
            i.on(t, "ping", this.onping.bind(this)),
            i.on(t, "data", this.ondata.bind(this)),
            i.on(t, "error", this.onerror.bind(this)),
            i.on(t, "close", this.onclose.bind(this)),
            i.on(this.decoder, "decoded", this.ondecoded.bind(this))
          );
        }
        onping() {
          this.emitReserved("ping");
        }
        ondata(t) {
          this.decoder.add(t);
        }
        ondecoded(t) {
          this.emitReserved("packet", t);
        }
        onerror(t) {
          h("error", t), this.emitReserved("error", t);
        }
        socket(t, e) {
          let s = this.nsps[t];
          return s || ((s = new o.Socket(this, t, e)), (this.nsps[t] = s)), s;
        }
        _destroy(t) {
          const e = Object.keys(this.nsps);
          for (const s of e) {
            const t = this.nsps[s];
            if (t.active)
              return void h("socket %s is still active, skipping close", s);
          }
          this._close();
        }
        _packet(t) {
          h("writing packet %j", t);
          const e = this.encoder.encode(t);
          for (let s = 0; s < e.length; s++) this.engine.write(e[s], t.options);
        }
        cleanup() {
          h("cleanup"),
            this.subs.forEach((t) => t()),
            (this.subs.length = 0),
            this.decoder.destroy();
        }
        _close() {
          h("disconnect"),
            (this.skipReconnect = !0),
            (this._reconnecting = !1),
            "opening" === this._readyState && this.cleanup(),
            this.backoff.reset(),
            (this._readyState = "closed"),
            this.engine && this.engine.close();
        }
        disconnect() {
          return this._close();
        }
        onclose(t) {
          h("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            (this._readyState = "closed"),
            this.emitReserved("close", t),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }
        reconnect() {
          if (this._reconnecting || this.skipReconnect) return this;
          const t = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            h("reconnect failed"),
              this.backoff.reset(),
              this.emitReserved("reconnect_failed"),
              (this._reconnecting = !1);
          else {
            const e = this.backoff.duration();
            h("will wait %dms before reconnect attempt", e),
              (this._reconnecting = !0);
            const s = setTimeout(() => {
              t.skipReconnect ||
                (h("attempting reconnect"),
                this.emitReserved("reconnect_attempt", t.backoff.attempts),
                t.skipReconnect ||
                  t.open((e) => {
                    e
                      ? (h("reconnect attempt error"),
                        (t._reconnecting = !1),
                        t.reconnect(),
                        this.emitReserved("reconnect_error", e))
                      : (h("reconnect success"), t.onreconnect());
                  }));
            }, e);
            this.opts.autoUnref && s.unref(),
              this.subs.push(function () {
                clearTimeout(s);
              });
          }
        }
        onreconnect() {
          const t = this.backoff.attempts;
          (this._reconnecting = !1),
            this.backoff.reset(),
            this.emitReserved("reconnect", t);
        }
      }
      e.Manager = p;
    },
    "5df7": function (t, e, s) {
      const n = s("632f"),
        o = s("fc5d"),
        r = s("b518")("engine.io-client:socket"),
        i = s("6fb8"),
        c = s("64be"),
        a = s("730f");
      class h extends o {
        constructor(t, e = {}) {
          super(),
            t && "object" === typeof t && ((e = t), (t = null)),
            t
              ? ((t = c(t)),
                (e.hostname = t.host),
                (e.secure = "https" === t.protocol || "wss" === t.protocol),
                (e.port = t.port),
                t.query && (e.query = t.query))
              : e.host && (e.hostname = c(e.host).host),
            (this.secure =
              null != e.secure
                ? e.secure
                : "undefined" !== typeof location &&
                  "https:" === location.protocol),
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
            (this.hostname =
              e.hostname ||
              ("undefined" !== typeof location
                ? location.hostname
                : "localhost")),
            (this.port =
              e.port ||
              ("undefined" !== typeof location && location.port
                ? location.port
                : this.secure
                ? 443
                : 80)),
            (this.transports = e.transports || ["polling", "websocket"]),
            (this.readyState = ""),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0),
            (this.opts = Object.assign(
              {
                path: "/engine.io",
                agent: !1,
                withCredentials: !1,
                upgrade: !0,
                jsonp: !0,
                timestampParam: "t",
                rememberUpgrade: !1,
                rejectUnauthorized: !0,
                perMessageDeflate: { threshold: 1024 },
                transportOptions: {},
              },
              e
            )),
            (this.opts.path = this.opts.path.replace(/\/$/, "") + "/"),
            "string" === typeof this.opts.query &&
              (this.opts.query = a.decode(this.opts.query)),
            (this.id = null),
            (this.upgrades = null),
            (this.pingInterval = null),
            (this.pingTimeout = null),
            (this.pingTimeoutTimer = null),
            "function" === typeof addEventListener &&
              (addEventListener(
                "beforeunload",
                () => {
                  this.transport &&
                    (this.transport.removeAllListeners(),
                    this.transport.close());
                },
                !1
              ),
              "localhost" !== this.hostname &&
                ((this.offlineEventListener = () => {
                  this.onClose("transport close");
                }),
                addEventListener("offline", this.offlineEventListener, !1))),
            this.open();
        }
        createTransport(t) {
          r('creating transport "%s"', t);
          const e = p(this.opts.query);
          (e.EIO = i.protocol), (e.transport = t), this.id && (e.sid = this.id);
          const s = Object.assign(
            {},
            this.opts.transportOptions[t],
            this.opts,
            {
              query: e,
              socket: this,
              hostname: this.hostname,
              secure: this.secure,
              port: this.port,
            }
          );
          return r("options: %j", s), new n[t](s);
        }
        open() {
          let t;
          if (
            this.opts.rememberUpgrade &&
            h.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
          )
            t = "websocket";
          else {
            if (0 === this.transports.length) {
              const t = this;
              return void setTimeout(function () {
                t.emit("error", "No transports available");
              }, 0);
            }
            t = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t = this.createTransport(t);
          } catch (e) {
            return (
              r("error while creating transport: %s", e),
              this.transports.shift(),
              void this.open()
            );
          }
          t.open(), this.setTransport(t);
        }
        setTransport(t) {
          r("setting transport %s", t.name);
          const e = this;
          this.transport &&
            (r("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            (this.transport = t),
            t
              .on("drain", function () {
                e.onDrain();
              })
              .on("packet", function (t) {
                e.onPacket(t);
              })
              .on("error", function (t) {
                e.onError(t);
              })
              .on("close", function () {
                e.onClose("transport close");
              });
        }
        probe(t) {
          r('probing transport "%s"', t);
          let e = this.createTransport(t, { probe: 1 }),
            s = !1;
          const n = this;
          function o() {
            if (n.onlyBinaryUpgrades) {
              const t = !this.supportsBinary && n.transport.supportsBinary;
              s = s || t;
            }
            s ||
              (r('probe transport "%s" opened', t),
              e.send([{ type: "ping", data: "probe" }]),
              e.once("packet", function (o) {
                if (!s)
                  if ("pong" === o.type && "probe" === o.data) {
                    if (
                      (r('probe transport "%s" pong', t),
                      (n.upgrading = !0),
                      n.emit("upgrading", e),
                      !e)
                    )
                      return;
                    (h.priorWebsocketSuccess = "websocket" === e.name),
                      r('pausing current transport "%s"', n.transport.name),
                      n.transport.pause(function () {
                        s ||
                          ("closed" !== n.readyState &&
                            (r("changing transport and sending upgrade packet"),
                            l(),
                            n.setTransport(e),
                            e.send([{ type: "upgrade" }]),
                            n.emit("upgrade", e),
                            (e = null),
                            (n.upgrading = !1),
                            n.flush()));
                      });
                  } else {
                    r('probe transport "%s" failed', t);
                    const s = new Error("probe error");
                    (s.transport = e.name), n.emit("upgradeError", s);
                  }
              }));
          }
          function i() {
            s || ((s = !0), l(), e.close(), (e = null));
          }
          function c(s) {
            const o = new Error("probe error: " + s);
            (o.transport = e.name),
              i(),
              r('probe transport "%s" failed because of error: %s', t, s),
              n.emit("upgradeError", o);
          }
          function a() {
            c("transport closed");
          }
          function p() {
            c("socket closed");
          }
          function u(t) {
            e &&
              t.name !== e.name &&
              (r('"%s" works - aborting "%s"', t.name, e.name), i());
          }
          function l() {
            e.removeListener("open", o),
              e.removeListener("error", c),
              e.removeListener("close", a),
              n.removeListener("close", p),
              n.removeListener("upgrading", u);
          }
          (h.priorWebsocketSuccess = !1),
            e.once("open", o),
            e.once("error", c),
            e.once("close", a),
            this.once("close", p),
            this.once("upgrading", u),
            e.open();
        }
        onOpen() {
          if (
            (r("socket open"),
            (this.readyState = "open"),
            (h.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emit("open"),
            this.flush(),
            "open" === this.readyState &&
              this.opts.upgrade &&
              this.transport.pause)
          ) {
            r("starting upgrade probes");
            let t = 0;
            const e = this.upgrades.length;
            for (; t < e; t++) this.probe(this.upgrades[t]);
          }
        }
        onPacket(t) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
              (r('socket receive: type "%s", data "%s"', t.type, t.data),
              this.emit("packet", t),
              this.emit("heartbeat"),
              t.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
              case "ping":
                this.resetPingTimeout(),
                  this.sendPacket("pong"),
                  this.emit("pong");
                break;
              case "error":
                const e = new Error("server error");
                (e.code = t.data), this.onError(e);
                break;
              case "message":
                this.emit("data", t.data), this.emit("message", t.data);
                break;
            }
          else
            r('packet received with socket readyState "%s"', this.readyState);
        }
        onHandshake(t) {
          this.emit("handshake", t),
            (this.id = t.sid),
            (this.transport.query.sid = t.sid),
            (this.upgrades = this.filterUpgrades(t.upgrades)),
            (this.pingInterval = t.pingInterval),
            (this.pingTimeout = t.pingTimeout),
            this.onOpen(),
            "closed" !== this.readyState && this.resetPingTimeout();
        }
        resetPingTimeout() {
          clearTimeout(this.pingTimeoutTimer),
            (this.pingTimeoutTimer = setTimeout(() => {
              this.onClose("ping timeout");
            }, this.pingInterval + this.pingTimeout)),
            this.opts.autoUnref && this.pingTimeoutTimer.unref();
        }
        onDrain() {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }
        flush() {
          "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (r("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            (this.prevBufferLen = this.writeBuffer.length),
            this.emit("flush"));
        }
        write(t, e, s) {
          return this.sendPacket("message", t, e, s), this;
        }
        send(t, e, s) {
          return this.sendPacket("message", t, e, s), this;
        }
        sendPacket(t, e, s, n) {
          if (
            ("function" === typeof e && ((n = e), (e = void 0)),
            "function" === typeof s && ((n = s), (s = null)),
            "closing" === this.readyState || "closed" === this.readyState)
          )
            return;
          (s = s || {}), (s.compress = !1 !== s.compress);
          const o = { type: t, data: e, options: s };
          this.emit("packetCreate", o),
            this.writeBuffer.push(o),
            n && this.once("flush", n),
            this.flush();
        }
        close() {
          const t = this;
          function e() {
            t.onClose("forced close"),
              r("socket closing - telling transport to close"),
              t.transport.close();
          }
          function s() {
            t.removeListener("upgrade", s),
              t.removeListener("upgradeError", s),
              e();
          }
          function n() {
            t.once("upgrade", s), t.once("upgradeError", s);
          }
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              ((this.readyState = "closing"),
              this.writeBuffer.length
                ? this.once("drain", function () {
                    this.upgrading ? n() : e();
                  })
                : this.upgrading
                ? n()
                : e()),
            this
          );
        }
        onError(t) {
          r("socket error %j", t),
            (h.priorWebsocketSuccess = !1),
            this.emit("error", t),
            this.onClose("transport error", t);
        }
        onClose(t, e) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          ) {
            r('socket close with reason: "%s"', t);
            const s = this;
            clearTimeout(this.pingIntervalTimer),
              clearTimeout(this.pingTimeoutTimer),
              this.transport.removeAllListeners("close"),
              this.transport.close(),
              this.transport.removeAllListeners(),
              "function" === typeof removeEventListener &&
                removeEventListener("offline", this.offlineEventListener, !1),
              (this.readyState = "closed"),
              (this.id = null),
              this.emit("close", t, e),
              (s.writeBuffer = []),
              (s.prevBufferLen = 0);
          }
        }
        filterUpgrades(t) {
          const e = [];
          let s = 0;
          const n = t.length;
          for (; s < n; s++) ~this.transports.indexOf(t[s]) && e.push(t[s]);
          return e;
        }
      }
      function p(t) {
        const e = {};
        for (let s in t) t.hasOwnProperty(s) && (e[s] = t[s]);
        return e;
      }
      (h.priorWebsocketSuccess = !1),
        (h.protocol = i.protocol),
        (t.exports = h);
    },
    "609d": function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.hasBinary = e.isBinary = void 0);
      const n = "function" === typeof ArrayBuffer,
        o = (t) =>
          "function" === typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t.buffer instanceof ArrayBuffer,
        r = Object.prototype.toString,
        i =
          "function" === typeof Blob ||
          ("undefined" !== typeof Blob &&
            "[object BlobConstructor]" === r.call(Blob)),
        c =
          "function" === typeof File ||
          ("undefined" !== typeof File &&
            "[object FileConstructor]" === r.call(File));
      function a(t) {
        return (
          (n && (t instanceof ArrayBuffer || o(t))) ||
          (i && t instanceof Blob) ||
          (c && t instanceof File)
        );
      }
      function h(t, e) {
        if (!t || "object" !== typeof t) return !1;
        if (Array.isArray(t)) {
          for (let e = 0, s = t.length; e < s; e++) if (h(t[e])) return !0;
          return !1;
        }
        if (a(t)) return !0;
        if (
          t.toJSON &&
          "function" === typeof t.toJSON &&
          1 === arguments.length
        )
          return h(t.toJSON(), !0);
        for (const s in t)
          if (Object.prototype.hasOwnProperty.call(t, s) && h(t[s])) return !0;
        return !1;
      }
      (e.isBinary = a), (e.hasBinary = h);
    },
    "632f": function (t, e, s) {
      const n = s("0f89"),
        o = s("1b1a"),
        r = s("7df1"),
        i = s("e76a");
      function c(t) {
        let e,
          s = !1,
          i = !1;
        const c = !1 !== t.jsonp;
        if ("undefined" !== typeof location) {
          const e = "https:" === location.protocol;
          let n = location.port;
          n || (n = e ? 443 : 80),
            (s = t.hostname !== location.hostname || n !== t.port),
            (i = t.secure !== e);
        }
        if (
          ((t.xdomain = s),
          (t.xscheme = i),
          (e = new n(t)),
          "open" in e && !t.forceJSONP)
        )
          return new o(t);
        if (!c) throw new Error("JSONP disabled");
        return new r(t);
      }
      (e.polling = c), (e.websocket = i);
    },
    "63b3": function (t, e) {
      (function (t) {
        "use strict";
        (e.encode = function (e) {
          var s,
            n = new Uint8Array(e),
            o = n.length,
            r = "";
          for (s = 0; s < o; s += 3)
            (r += t[n[s] >> 2]),
              (r += t[((3 & n[s]) << 4) | (n[s + 1] >> 4)]),
              (r += t[((15 & n[s + 1]) << 2) | (n[s + 2] >> 6)]),
              (r += t[63 & n[s + 2]]);
          return (
            o % 3 === 2
              ? (r = r.substring(0, r.length - 1) + "=")
              : o % 3 === 1 && (r = r.substring(0, r.length - 2) + "=="),
            r
          );
        }),
          (e.decode = function (e) {
            var s,
              n,
              o,
              r,
              i,
              c = 0.75 * e.length,
              a = e.length,
              h = 0;
            "=" === e[e.length - 1] && (c--, "=" === e[e.length - 2] && c--);
            var p = new ArrayBuffer(c),
              u = new Uint8Array(p);
            for (s = 0; s < a; s += 4)
              (n = t.indexOf(e[s])),
                (o = t.indexOf(e[s + 1])),
                (r = t.indexOf(e[s + 2])),
                (i = t.indexOf(e[s + 3])),
                (u[h++] = (n << 2) | (o >> 4)),
                (u[h++] = ((15 & o) << 4) | (r >> 2)),
                (u[h++] = ((3 & r) << 6) | (63 & i));
            return p;
          });
      })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    },
    "64be": function (t, e) {
      var s =
          /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        n = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      function o(t, e) {
        var s = /\/{2,9}/g,
          n = e.replace(s, "/").split("/");
        return (
          ("/" != e.substr(0, 1) && 0 !== e.length) || n.splice(0, 1),
          "/" == e.substr(e.length - 1, 1) && n.splice(n.length - 1, 1),
          n
        );
      }
      function r(t, e) {
        var s = {};
        return (
          e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
            e && (s[e] = n);
          }),
          s
        );
      }
      t.exports = function (t) {
        var e = t,
          i = t.indexOf("["),
          c = t.indexOf("]");
        -1 != i &&
          -1 != c &&
          (t =
            t.substring(0, i) +
            t.substring(i, c).replace(/:/g, ";") +
            t.substring(c, t.length));
        var a = s.exec(t || ""),
          h = {},
          p = 14;
        while (p--) h[n[p]] = a[p] || "";
        return (
          -1 != i &&
            -1 != c &&
            ((h.source = e),
            (h.host = h.host
              .substring(1, h.host.length - 1)
              .replace(/;/g, ":")),
            (h.authority = h.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (h.ipv6uri = !0)),
          (h.pathNames = o(h, h["path"])),
          (h.queryKey = r(h, h["query"])),
          h
        );
      };
    },
    "6de4": function (t, e, s) {
      "use strict";
      s.r(e);
      var n = function () {
          var t = this,
            e = t._self._c;
          return e(
            "div",
            { staticClass: "container" },
            [
              e("van-nav-bar", {
                attrs: { fixed: "", "left-arrow": "", title: "小思同学" },
                on: {
                  "click-left": function (e) {
                    return t.$router.back();
                  },
                },
              }),
              e(
                "div",
                { staticClass: "chat-list" },
                t._l(t.list, function (s, n) {
                  return e("div", { key: n }, [
                    "xs" === s.name
                      ? e(
                          "div",
                          { staticClass: "chat-item left" },
                          [
                            e("van-image", {
                              attrs: {
                                fit: "cover",
                                round: "",
                                src: "https://img.yzcdn.cn/vant/cat.jpeg",
                              },
                            }),
                            e("div", { staticClass: "chat-pao" }, [
                              t._v(t._s(s.msg)),
                            ]),
                          ],
                          1
                        )
                      : e(
                          "div",
                          { staticClass: "chat-item right" },
                          [
                            e("div", { staticClass: "chat-pao" }, [
                              t._v(t._s(s.msg)),
                            ]),
                            e("van-image", {
                              attrs: {
                                fit: "cover",
                                round: "",
                                src: t.$store.state.userPhoto,
                              },
                            }),
                          ],
                          1
                        ),
                  ]);
                }),
                0
              ),
              e(
                "div",
                { staticClass: "reply-container van-hairline--top" },
                [
                  e("van-field", {
                    attrs: { placeholder: "说点什么..." },
                    scopedSlots: t._u([
                      {
                        key: "button",
                        fn: function () {
                          return [
                            e(
                              "span",
                              {
                                staticStyle: {
                                  "font-size": "12px",
                                  color: "#999",
                                },
                                on: { click: t.sendFn },
                              },
                              [t._v("提交")]
                            ),
                          ];
                        },
                        proxy: !0,
                      },
                    ]),
                    model: {
                      value: t.word,
                      callback: function (e) {
                        t.word = e;
                      },
                      expression: "word",
                    },
                  }),
                ],
                1
              ),
            ],
            1
          );
        },
        o = [],
        r = s("2bc6"),
        i = s("cc33"),
        c = {
          name: "Chat",
          data() {
            return {
              word: "",
              list: [
                { name: "xs", msg: "hi,你好!我是小思" },
                { name: "me", msg: "我是用户" },
              ],
              socket: null,
            };
          },
          created() {
            (this.socket = Object(r["io"])("http://toutiao.itheima.net", {
              query: { token: Object(i["a"])() },
              transports: ["websocket"],
            })),
              this.socket.on("connect", () => {
                console.log("链接建立成功");
              }),
              this.socket.on("message", (t) => {
                this.list.push({ name: "xs", msg: t.msg }),
                  this.$nextTick(() => {
                    const t = document.querySelector(
                      ".chat-list>div:last-child"
                    );
                    t.scrollIntoView({ behavior: "smooth" });
                  });
              });
          },
          methods: {
            sendFn() {
              0 !== this.word.trim().length &&
                (this.socket.emit("message", {
                  msg: this.word,
                  timestamp: new Date().getTime(),
                }),
                this.list.push({ msg: this.word, name: "me" }),
                this.$nextTick(() => {
                  const t = document.querySelector(".chat-list>div:last-child");
                  t.scrollIntoView({ behavior: "smooth" });
                }),
                (this.word = ""));
            },
          },
          destroyed() {
            this.socket.close(), (this.socket = null);
          },
        },
        a = c,
        h = (s("cf10"), s("2877")),
        p = Object(h["a"])(a, n, o, !1, null, "9c14d3b4", null);
      e["default"] = p.exports;
    },
    "6fb8": function (t, e, s) {
      const n = s("08b7"),
        o = s("1f65"),
        r = String.fromCharCode(30),
        i = (t, e) => {
          const s = t.length,
            o = new Array(s);
          let i = 0;
          t.forEach((t, c) => {
            n(t, !1, (t) => {
              (o[c] = t), ++i === s && e(o.join(r));
            });
          });
        },
        c = (t, e) => {
          const s = t.split(r),
            n = [];
          for (let r = 0; r < s.length; r++) {
            const t = o(s[r], e);
            if ((n.push(t), "error" === t.type)) break;
          }
          return n;
        };
      t.exports = {
        protocol: 4,
        encodePacket: n,
        encodePayload: i,
        decodePacket: o,
        decodePayload: c,
      };
    },
    "730f": function (t, e) {
      (e.encode = function (t) {
        var e = "";
        for (var s in t)
          t.hasOwnProperty(s) &&
            (e.length && (e += "&"),
            (e += encodeURIComponent(s) + "=" + encodeURIComponent(t[s])));
        return e;
      }),
        (e.decode = function (t) {
          for (var e = {}, s = t.split("&"), n = 0, o = s.length; n < o; n++) {
            var r = s[n].split("=");
            e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
          }
          return e;
        });
    },
    "7a2d": function (t, e) {
      try {
        t.exports =
          "undefined" !== typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (s) {
        t.exports = !1;
      }
    },
    "7df1": function (t, e, s) {
      const n = s("4e71"),
        o = s("2792"),
        r = /\n/g,
        i = /\\n/g;
      let c;
      class a extends n {
        constructor(t) {
          super(t),
            (this.query = this.query || {}),
            c || (c = o.___eio = o.___eio || []),
            (this.index = c.length);
          const e = this;
          c.push(function (t) {
            e.onData(t);
          }),
            (this.query.j = this.index);
        }
        get supportsBinary() {
          return !1;
        }
        doClose() {
          this.script &&
            ((this.script.onerror = () => {}),
            this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            this.form &&
              (this.form.parentNode.removeChild(this.form),
              (this.form = null),
              (this.iframe = null)),
            super.doClose();
        }
        doPoll() {
          const t = this,
            e = document.createElement("script");
          this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            (e.async = !0),
            (e.src = this.uri()),
            (e.onerror = function (e) {
              t.onError("jsonp poll error", e);
            });
          const s = document.getElementsByTagName("script")[0];
          s
            ? s.parentNode.insertBefore(e, s)
            : (document.head || document.body).appendChild(e),
            (this.script = e);
          const n =
            "undefined" !== typeof navigator &&
            /gecko/i.test(navigator.userAgent);
          n &&
            setTimeout(function () {
              const t = document.createElement("iframe");
              document.body.appendChild(t), document.body.removeChild(t);
            }, 100);
        }
        doWrite(t, e) {
          const s = this;
          let n;
          if (!this.form) {
            const t = document.createElement("form"),
              e = document.createElement("textarea"),
              s = (this.iframeId = "eio_iframe_" + this.index);
            (t.className = "socketio"),
              (t.style.position = "absolute"),
              (t.style.top = "-1000px"),
              (t.style.left = "-1000px"),
              (t.target = s),
              (t.method = "POST"),
              t.setAttribute("accept-charset", "utf-8"),
              (e.name = "d"),
              t.appendChild(e),
              document.body.appendChild(t),
              (this.form = t),
              (this.area = e);
          }
          function o() {
            c(), e();
          }
          function c() {
            if (s.iframe)
              try {
                s.form.removeChild(s.iframe);
              } catch (t) {
                s.onError("jsonp polling iframe removal error", t);
              }
            try {
              const t = '<iframe src="javascript:0" name="' + s.iframeId + '">';
              n = document.createElement(t);
            } catch (t) {
              (n = document.createElement("iframe")),
                (n.name = s.iframeId),
                (n.src = "javascript:0");
            }
            (n.id = s.iframeId), s.form.appendChild(n), (s.iframe = n);
          }
          (this.form.action = this.uri()),
            c(),
            (t = t.replace(i, "\\\n")),
            (this.area.value = t.replace(r, "\\n"));
          try {
            this.form.submit();
          } catch (a) {}
          this.iframe.attachEvent
            ? (this.iframe.onreadystatechange = function () {
                "complete" === s.iframe.readyState && o();
              })
            : (this.iframe.onload = o);
        }
      }
      t.exports = a;
    },
    "87b9": function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }), (e.url = void 0);
      const n = s("64be"),
        o = s("b518")("socket.io-client:url");
      function r(t, e = "", s) {
        let r = t;
        (s = s || ("undefined" !== typeof location && location)),
          null == t && (t = s.protocol + "//" + s.host),
          "string" === typeof t &&
            ("/" === t.charAt(0) &&
              (t = "/" === t.charAt(1) ? s.protocol + t : s.host + t),
            /^(https?|wss?):\/\//.test(t) ||
              (o("protocol-less url %s", t),
              (t =
                "undefined" !== typeof s
                  ? s.protocol + "//" + t
                  : "https://" + t)),
            o("parse %s", t),
            (r = n(t))),
          r.port ||
            (/^(http|ws)$/.test(r.protocol)
              ? (r.port = "80")
              : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
          (r.path = r.path || "/");
        const i = -1 !== r.host.indexOf(":"),
          c = i ? "[" + r.host + "]" : r.host;
        return (
          (r.id = r.protocol + "://" + c + ":" + r.port + e),
          (r.href =
            r.protocol +
            "://" +
            c +
            (s && s.port === r.port ? "" : ":" + r.port)),
          r
        );
      }
      e.url = r;
    },
    "8c6b": function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Socket = void 0);
      const n = s("1221"),
        o = s("32b9"),
        r = s("2edd"),
        i = s("b518")("socket.io-client:socket"),
        c = Object.freeze({
          connect: 1,
          connect_error: 1,
          disconnect: 1,
          disconnecting: 1,
          newListener: 1,
          removeListener: 1,
        });
      class a extends r.StrictEventEmitter {
        constructor(t, e, s) {
          super(),
            (this.receiveBuffer = []),
            (this.sendBuffer = []),
            (this.ids = 0),
            (this.acks = {}),
            (this.flags = {}),
            (this.io = t),
            (this.nsp = e),
            (this.ids = 0),
            (this.acks = {}),
            (this.receiveBuffer = []),
            (this.sendBuffer = []),
            (this.connected = !1),
            (this.disconnected = !0),
            (this.flags = {}),
            s && s.auth && (this.auth = s.auth),
            this.io._autoConnect && this.open();
        }
        subEvents() {
          if (this.subs) return;
          const t = this.io;
          this.subs = [
            o.on(t, "open", this.onopen.bind(this)),
            o.on(t, "packet", this.onpacket.bind(this)),
            o.on(t, "error", this.onerror.bind(this)),
            o.on(t, "close", this.onclose.bind(this)),
          ];
        }
        get active() {
          return !!this.subs;
        }
        connect() {
          return (
            this.connected ||
              (this.subEvents(),
              this.io["_reconnecting"] || this.io.open(),
              "open" === this.io._readyState && this.onopen()),
            this
          );
        }
        open() {
          return this.connect();
        }
        send(...t) {
          return t.unshift("message"), this.emit.apply(this, t), this;
        }
        emit(t, ...e) {
          if (c.hasOwnProperty(t))
            throw new Error('"' + t + '" is a reserved event name');
          e.unshift(t);
          const s = { type: n.PacketType.EVENT, data: e, options: {} };
          (s.options.compress = !1 !== this.flags.compress),
            "function" === typeof e[e.length - 1] &&
              (i("emitting packet with ack id %d", this.ids),
              (this.acks[this.ids] = e.pop()),
              (s.id = this.ids++));
          const o =
              this.io.engine &&
              this.io.engine.transport &&
              this.io.engine.transport.writable,
            r = this.flags.volatile && (!o || !this.connected);
          return (
            r
              ? i("discard packet as the transport is not currently writable")
              : this.connected
              ? this.packet(s)
              : this.sendBuffer.push(s),
            (this.flags = {}),
            this
          );
        }
        packet(t) {
          (t.nsp = this.nsp), this.io._packet(t);
        }
        onopen() {
          i("transport is open - connecting"),
            "function" == typeof this.auth
              ? this.auth((t) => {
                  this.packet({ type: n.PacketType.CONNECT, data: t });
                })
              : this.packet({ type: n.PacketType.CONNECT, data: this.auth });
        }
        onerror(t) {
          this.connected || this.emitReserved("connect_error", t);
        }
        onclose(t) {
          i("close (%s)", t),
            (this.connected = !1),
            (this.disconnected = !0),
            delete this.id,
            this.emitReserved("disconnect", t);
        }
        onpacket(t) {
          const e = t.nsp === this.nsp;
          if (e)
            switch (t.type) {
              case n.PacketType.CONNECT:
                if (t.data && t.data.sid) {
                  const e = t.data.sid;
                  this.onconnect(e);
                } else
                  this.emitReserved(
                    "connect_error",
                    new Error(
                      "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                    )
                  );
                break;
              case n.PacketType.EVENT:
                this.onevent(t);
                break;
              case n.PacketType.BINARY_EVENT:
                this.onevent(t);
                break;
              case n.PacketType.ACK:
                this.onack(t);
                break;
              case n.PacketType.BINARY_ACK:
                this.onack(t);
                break;
              case n.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
              case n.PacketType.CONNECT_ERROR:
                const e = new Error(t.data.message);
                (e.data = t.data.data), this.emitReserved("connect_error", e);
                break;
            }
        }
        onevent(t) {
          const e = t.data || [];
          i("emitting event %j", e),
            null != t.id &&
              (i("attaching ack callback to event"), e.push(this.ack(t.id))),
            this.connected
              ? this.emitEvent(e)
              : this.receiveBuffer.push(Object.freeze(e));
        }
        emitEvent(t) {
          if (this._anyListeners && this._anyListeners.length) {
            const e = this._anyListeners.slice();
            for (const s of e) s.apply(this, t);
          }
          super.emit.apply(this, t);
        }
        ack(t) {
          const e = this;
          let s = !1;
          return function (...o) {
            s ||
              ((s = !0),
              i("sending ack %j", o),
              e.packet({ type: n.PacketType.ACK, id: t, data: o }));
          };
        }
        onack(t) {
          const e = this.acks[t.id];
          "function" === typeof e
            ? (i("calling ack %s with %j", t.id, t.data),
              e.apply(this, t.data),
              delete this.acks[t.id])
            : i("bad ack %s", t.id);
        }
        onconnect(t) {
          i("socket connected with id %s", t),
            (this.id = t),
            (this.connected = !0),
            (this.disconnected = !1),
            this.emitReserved("connect"),
            this.emitBuffered();
        }
        emitBuffered() {
          this.receiveBuffer.forEach((t) => this.emitEvent(t)),
            (this.receiveBuffer = []),
            this.sendBuffer.forEach((t) => this.packet(t)),
            (this.sendBuffer = []);
        }
        ondisconnect() {
          i("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect");
        }
        destroy() {
          this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
            this.io["_destroy"](this);
        }
        disconnect() {
          return (
            this.connected &&
              (i("performing disconnect (%s)", this.nsp),
              this.packet({ type: n.PacketType.DISCONNECT })),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
          );
        }
        close() {
          return this.disconnect();
        }
        compress(t) {
          return (this.flags.compress = t), this;
        }
        get volatile() {
          return (this.flags.volatile = !0), this;
        }
        onAny(t) {
          return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.push(t),
            this
          );
        }
        prependAny(t) {
          return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.unshift(t),
            this
          );
        }
        offAny(t) {
          if (!this._anyListeners) return this;
          if (t) {
            const e = this._anyListeners;
            for (let s = 0; s < e.length; s++)
              if (t === e[s]) return e.splice(s, 1), this;
          } else this._anyListeners = [];
          return this;
        }
        listenersAny() {
          return this._anyListeners || [];
        }
      }
      e.Socket = a;
    },
    "8f81": function (t, e) {
      var s = 1e3,
        n = 60 * s,
        o = 60 * n,
        r = 24 * o,
        i = 7 * r,
        c = 365.25 * r;
      function a(t) {
        if (((t = String(t)), !(t.length > 100))) {
          var e =
            /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
              t
            );
          if (e) {
            var a = parseFloat(e[1]),
              h = (e[2] || "ms").toLowerCase();
            switch (h) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return a * c;
              case "weeks":
              case "week":
              case "w":
                return a * i;
              case "days":
              case "day":
              case "d":
                return a * r;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return a * o;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return a * n;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return a * s;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return a;
              default:
                return;
            }
          }
        }
      }
      function h(t) {
        var e = Math.abs(t);
        return e >= r
          ? Math.round(t / r) + "d"
          : e >= o
          ? Math.round(t / o) + "h"
          : e >= n
          ? Math.round(t / n) + "m"
          : e >= s
          ? Math.round(t / s) + "s"
          : t + "ms";
      }
      function p(t) {
        var e = Math.abs(t);
        return e >= r
          ? u(t, e, r, "day")
          : e >= o
          ? u(t, e, o, "hour")
          : e >= n
          ? u(t, e, n, "minute")
          : e >= s
          ? u(t, e, s, "second")
          : t + " ms";
      }
      function u(t, e, s, n) {
        var o = e >= 1.5 * s;
        return Math.round(t / s) + " " + n + (o ? "s" : "");
      }
      t.exports = function (t, e) {
        e = e || {};
        var s = typeof t;
        if ("string" === s && t.length > 0) return a(t);
        if ("number" === s && isFinite(t)) return e.long ? p(t) : h(t);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(t)
        );
      };
    },
    ac13: function (t, e, s) {
      function n(t) {
        function e(t) {
          let e = 0;
          for (let s = 0; s < t.length; s++)
            (e = (e << 5) - e + t.charCodeAt(s)), (e |= 0);
          return n.colors[Math.abs(e) % n.colors.length];
        }
        function n(t) {
          let e,
            s,
            r,
            i = null;
          function c(...t) {
            if (!c.enabled) return;
            const s = c,
              o = Number(new Date()),
              r = o - (e || o);
            (s.diff = r),
              (s.prev = e),
              (s.curr = o),
              (e = o),
              (t[0] = n.coerce(t[0])),
              "string" !== typeof t[0] && t.unshift("%O");
            let i = 0;
            (t[0] = t[0].replace(/%([a-zA-Z%])/g, (e, o) => {
              if ("%%" === e) return "%";
              i++;
              const r = n.formatters[o];
              if ("function" === typeof r) {
                const n = t[i];
                (e = r.call(s, n)), t.splice(i, 1), i--;
              }
              return e;
            })),
              n.formatArgs.call(s, t);
            const a = s.log || n.log;
            a.apply(s, t);
          }
          return (
            (c.namespace = t),
            (c.useColors = n.useColors()),
            (c.color = n.selectColor(t)),
            (c.extend = o),
            (c.destroy = n.destroy),
            Object.defineProperty(c, "enabled", {
              enumerable: !0,
              configurable: !1,
              get: () =>
                null !== i
                  ? i
                  : (s !== n.namespaces &&
                      ((s = n.namespaces), (r = n.enabled(t))),
                    r),
              set: (t) => {
                i = t;
              },
            }),
            "function" === typeof n.init && n.init(c),
            c
          );
        }
        function o(t, e) {
          const s = n(
            this.namespace + ("undefined" === typeof e ? ":" : e) + t
          );
          return (s.log = this.log), s;
        }
        function r(t) {
          let e;
          n.save(t), (n.namespaces = t), (n.names = []), (n.skips = []);
          const s = ("string" === typeof t ? t : "").split(/[\s,]+/),
            o = s.length;
          for (e = 0; e < o; e++)
            s[e] &&
              ((t = s[e].replace(/\*/g, ".*?")),
              "-" === t[0]
                ? n.skips.push(new RegExp("^" + t.slice(1) + "$"))
                : n.names.push(new RegExp("^" + t + "$")));
        }
        function i() {
          const t = [
            ...n.names.map(a),
            ...n.skips.map(a).map((t) => "-" + t),
          ].join(",");
          return n.enable(""), t;
        }
        function c(t) {
          if ("*" === t[t.length - 1]) return !0;
          let e, s;
          for (e = 0, s = n.skips.length; e < s; e++)
            if (n.skips[e].test(t)) return !1;
          for (e = 0, s = n.names.length; e < s; e++)
            if (n.names[e].test(t)) return !0;
          return !1;
        }
        function a(t) {
          return t
            .toString()
            .substring(2, t.toString().length - 2)
            .replace(/\.\*\?$/, "*");
        }
        function h(t) {
          return t instanceof Error ? t.stack || t.message : t;
        }
        function p() {
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
          );
        }
        return (
          (n.debug = n),
          (n.default = n),
          (n.coerce = h),
          (n.disable = i),
          (n.enable = r),
          (n.enabled = c),
          (n.humanize = s("8f81")),
          (n.destroy = p),
          Object.keys(t).forEach((e) => {
            n[e] = t[e];
          }),
          (n.names = []),
          (n.skips = []),
          (n.formatters = {}),
          (n.selectColor = e),
          n.enable(n.load()),
          n
        );
      }
      t.exports = n;
    },
    b518: function (t, e, s) {
      (function (n) {
        function o() {
          return (
            !(
              "undefined" === typeof window ||
              !window.process ||
              ("renderer" !== window.process.type && !window.process.__nwjs)
            ) ||
            (("undefined" === typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent
                .toLowerCase()
                .match(/(edge|trident)\/(\d+)/)) &&
              (("undefined" !== typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" !== typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" !== typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" !== typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }
        function r(e) {
          if (
            ((e[0] =
              (this.useColors ? "%c" : "") +
              this.namespace +
              (this.useColors ? " %c" : " ") +
              e[0] +
              (this.useColors ? "%c " : " ") +
              "+" +
              t.exports.humanize(this.diff)),
            !this.useColors)
          )
            return;
          const s = "color: " + this.color;
          e.splice(1, 0, s, "color: inherit");
          let n = 0,
            o = 0;
          e[0].replace(/%[a-zA-Z%]/g, (t) => {
            "%%" !== t && (n++, "%c" === t && (o = n));
          }),
            e.splice(o, 0, s);
        }
        function i(t) {
          try {
            t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
          } catch (s) {}
        }
        function c() {
          let t;
          try {
            t = e.storage.getItem("debug");
          } catch (s) {}
          return (
            !t &&
              "undefined" !== typeof n &&
              "env" in n &&
              (t = Object({ NODE_ENV: "production", BASE_URL: "" }).DEBUG),
            t
          );
        }
        function a() {
          try {
            return localStorage;
          } catch (t) {}
        }
        (e.formatArgs = r),
          (e.save = i),
          (e.load = c),
          (e.useColors = o),
          (e.storage = a()),
          (e.destroy = (() => {
            let t = !1;
            return () => {
              t ||
                ((t = !0),
                console.warn(
                  "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
            };
          })()),
          (e.colors = [
            "#0000CC",
            "#0000FF",
            "#0033CC",
            "#0033FF",
            "#0066CC",
            "#0066FF",
            "#0099CC",
            "#0099FF",
            "#00CC00",
            "#00CC33",
            "#00CC66",
            "#00CC99",
            "#00CCCC",
            "#00CCFF",
            "#3300CC",
            "#3300FF",
            "#3333CC",
            "#3333FF",
            "#3366CC",
            "#3366FF",
            "#3399CC",
            "#3399FF",
            "#33CC00",
            "#33CC33",
            "#33CC66",
            "#33CC99",
            "#33CCCC",
            "#33CCFF",
            "#6600CC",
            "#6600FF",
            "#6633CC",
            "#6633FF",
            "#66CC00",
            "#66CC33",
            "#9900CC",
            "#9900FF",
            "#9933CC",
            "#9933FF",
            "#99CC00",
            "#99CC33",
            "#CC0000",
            "#CC0033",
            "#CC0066",
            "#CC0099",
            "#CC00CC",
            "#CC00FF",
            "#CC3300",
            "#CC3333",
            "#CC3366",
            "#CC3399",
            "#CC33CC",
            "#CC33FF",
            "#CC6600",
            "#CC6633",
            "#CC9900",
            "#CC9933",
            "#CCCC00",
            "#CCCC33",
            "#FF0000",
            "#FF0033",
            "#FF0066",
            "#FF0099",
            "#FF00CC",
            "#FF00FF",
            "#FF3300",
            "#FF3333",
            "#FF3366",
            "#FF3399",
            "#FF33CC",
            "#FF33FF",
            "#FF6600",
            "#FF6633",
            "#FF9900",
            "#FF9933",
            "#FFCC00",
            "#FFCC33",
          ]),
          (e.log = console.debug || console.log || (() => {})),
          (t.exports = s("ac13")(e));
        const { formatters: h } = t.exports;
        h.j = function (t) {
          try {
            return JSON.stringify(t);
          } catch (e) {
            return "[UnexpectedJSONParseError]: " + e.message;
          }
        };
      }.call(this, s("4362")));
    },
    bcfb: function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.reconstructPacket = e.deconstructPacket = void 0);
      const n = s("609d");
      function o(t) {
        const e = [],
          s = t.data,
          n = t;
        return (
          (n.data = r(s, e)),
          (n.attachments = e.length),
          { packet: n, buffers: e }
        );
      }
      function r(t, e) {
        if (!t) return t;
        if (n.isBinary(t)) {
          const s = { _placeholder: !0, num: e.length };
          return e.push(t), s;
        }
        if (Array.isArray(t)) {
          const s = new Array(t.length);
          for (let n = 0; n < t.length; n++) s[n] = r(t[n], e);
          return s;
        }
        if ("object" === typeof t && !(t instanceof Date)) {
          const s = {};
          for (const n in t) t.hasOwnProperty(n) && (s[n] = r(t[n], e));
          return s;
        }
        return t;
      }
      function i(t, e) {
        return (t.data = c(t.data, e)), (t.attachments = void 0), t;
      }
      function c(t, e) {
        if (!t) return t;
        if (t && !0 === t._placeholder) {
          const s = "number" === typeof t.num && t.num >= 0 && t.num < e.length;
          if (s) return e[t.num];
          throw new Error("illegal attachments");
        }
        if (Array.isArray(t))
          for (let s = 0; s < t.length; s++) t[s] = c(t[s], e);
        else if ("object" === typeof t)
          for (const s in t) t.hasOwnProperty(s) && (t[s] = c(t[s], e));
        return t;
      }
      (e.deconstructPacket = o), (e.reconstructPacket = i);
    },
    c159: function (t, e, s) {
      "use strict";
      var n,
        o =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
          ),
        r = 64,
        i = {},
        c = 0,
        a = 0;
      function h(t) {
        var e = "";
        do {
          (e = o[t % r] + e), (t = Math.floor(t / r));
        } while (t > 0);
        return e;
      }
      function p(t) {
        var e = 0;
        for (a = 0; a < t.length; a++) e = e * r + i[t.charAt(a)];
        return e;
      }
      function u() {
        var t = h(+new Date());
        return t !== n ? ((c = 0), (n = t)) : t + "." + h(c++);
      }
      for (; a < r; a++) i[o[a]] = a;
      (u.encode = h), (u.decode = p), (t.exports = u);
    },
    cf10: function (t, e, s) {
      "use strict";
      s("3f8d");
    },
    e76a: function (t, e, s) {
      (function (e) {
        const n = s("0c7b"),
          o = s("6fb8"),
          r = s("730f"),
          i = s("c159"),
          { pick: c } = s("1121"),
          {
            WebSocket: a,
            usingBrowserWebSocket: h,
            defaultBinaryType: p,
          } = s("e9d4"),
          u = s("b518")("engine.io-client:websocket"),
          l =
            "undefined" !== typeof navigator &&
            "string" === typeof navigator.product &&
            "reactnative" === navigator.product.toLowerCase();
        class d extends n {
          constructor(t) {
            super(t), (this.supportsBinary = !t.forceBase64);
          }
          get name() {
            return "websocket";
          }
          doOpen() {
            if (!this.check()) return;
            const t = this.uri(),
              e = this.opts.protocols,
              s = l
                ? {}
                : c(
                    this.opts,
                    "agent",
                    "perMessageDeflate",
                    "pfx",
                    "key",
                    "passphrase",
                    "cert",
                    "ca",
                    "ciphers",
                    "rejectUnauthorized",
                    "localAddress",
                    "protocolVersion",
                    "origin",
                    "maxPayload",
                    "family",
                    "checkServerIdentity"
                  );
            this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
            try {
              this.ws = h && !l ? (e ? new a(t, e) : new a(t)) : new a(t, e, s);
            } catch (n) {
              return this.emit("error", n);
            }
            (this.ws.binaryType = this.socket.binaryType || p),
              this.addEventListeners();
          }
          addEventListeners() {
            (this.ws.onopen = () => {
              this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
            }),
              (this.ws.onclose = this.onClose.bind(this)),
              (this.ws.onmessage = (t) => this.onData(t.data)),
              (this.ws.onerror = (t) => this.onError("websocket error", t));
          }
          write(t) {
            const s = this;
            this.writable = !1;
            let n = t.length,
              r = 0;
            const i = n;
            for (; r < i; r++)
              (function (t) {
                o.encodePacket(t, s.supportsBinary, function (o) {
                  const r = {};
                  if (
                    !h &&
                    (t.options && (r.compress = t.options.compress),
                    s.opts.perMessageDeflate)
                  ) {
                    const t =
                      "string" === typeof o ? e.byteLength(o) : o.length;
                    t < s.opts.perMessageDeflate.threshold && (r.compress = !1);
                  }
                  try {
                    h ? s.ws.send(o) : s.ws.send(o, r);
                  } catch (i) {
                    u("websocket closed before onclose event");
                  }
                  --n || c();
                });
              })(t[r]);
            function c() {
              s.emit("flush"),
                setTimeout(function () {
                  (s.writable = !0), s.emit("drain");
                }, 0);
            }
          }
          onClose() {
            n.prototype.onClose.call(this);
          }
          doClose() {
            "undefined" !== typeof this.ws &&
              (this.ws.close(), (this.ws = null));
          }
          uri() {
            let t = this.query || {};
            const e = this.opts.secure ? "wss" : "ws";
            let s = "";
            this.opts.port &&
              (("wss" === e && 443 !== Number(this.opts.port)) ||
                ("ws" === e && 80 !== Number(this.opts.port))) &&
              (s = ":" + this.opts.port),
              this.opts.timestampRequests &&
                (t[this.opts.timestampParam] = i()),
              this.supportsBinary || (t.b64 = 1),
              (t = r.encode(t)),
              t.length && (t = "?" + t);
            const n = -1 !== this.opts.hostname.indexOf(":");
            return (
              e +
              "://" +
              (n ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
              s +
              this.opts.path +
              t
            );
          }
          check() {
            return (
              !!a && !("__initialize" in a && this.name === d.prototype.name)
            );
          }
        }
        t.exports = d;
      }.call(this, s("b639").Buffer));
    },
    e9d4: function (t, e, s) {
      const n = s("2792");
      t.exports = {
        WebSocket: n.WebSocket || n.MozWebSocket,
        usingBrowserWebSocket: !0,
        defaultBinaryType: "arraybuffer",
      };
    },
    efcf: function (t, e) {
      const s = Object.create(null);
      (s["open"] = "0"),
        (s["close"] = "1"),
        (s["ping"] = "2"),
        (s["pong"] = "3"),
        (s["message"] = "4"),
        (s["upgrade"] = "5"),
        (s["noop"] = "6");
      const n = Object.create(null);
      Object.keys(s).forEach((t) => {
        n[s[t]] = t;
      });
      const o = { type: "error", data: "parser error" };
      t.exports = { PACKET_TYPES: s, PACKET_TYPES_REVERSE: n, ERROR_PACKET: o };
    },
    f16e: function (t, e, s) {
      const n = s("5df7");
      (t.exports = (t, e) => new n(t, e)),
        (t.exports.Socket = n),
        (t.exports.protocol = n.protocol),
        (t.exports.Transport = s("0c7b")),
        (t.exports.transports = s("632f")),
        (t.exports.parser = s("6fb8"));
    },
    fc5d: function (t, e, s) {
      function n(t) {
        if (t) return o(t);
      }
      function o(t) {
        for (var e in n.prototype) t[e] = n.prototype[e];
        return t;
      }
      (t.exports = n),
        (n.prototype.on = n.prototype.addEventListener =
          function (t, e) {
            return (
              (this._callbacks = this._callbacks || {}),
              (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(
                e
              ),
              this
            );
          }),
        (n.prototype.once = function (t, e) {
          function s() {
            this.off(t, s), e.apply(this, arguments);
          }
          return (s.fn = e), this.on(t, s), this;
        }),
        (n.prototype.off =
          n.prototype.removeListener =
          n.prototype.removeAllListeners =
          n.prototype.removeEventListener =
            function (t, e) {
              if (
                ((this._callbacks = this._callbacks || {}),
                0 == arguments.length)
              )
                return (this._callbacks = {}), this;
              var s,
                n = this._callbacks["$" + t];
              if (!n) return this;
              if (1 == arguments.length)
                return delete this._callbacks["$" + t], this;
              for (var o = 0; o < n.length; o++)
                if (((s = n[o]), s === e || s.fn === e)) {
                  n.splice(o, 1);
                  break;
                }
              return 0 === n.length && delete this._callbacks["$" + t], this;
            }),
        (n.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          for (
            var e = new Array(arguments.length - 1),
              s = this._callbacks["$" + t],
              n = 1;
            n < arguments.length;
            n++
          )
            e[n - 1] = arguments[n];
          if (s) {
            s = s.slice(0);
            n = 0;
            for (var o = s.length; n < o; ++n) s[n].apply(this, e);
          }
          return this;
        }),
        (n.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (n.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
    },
  },
]);
//# sourceMappingURL=chunk-70c3542a.699ee5ea.js.map
