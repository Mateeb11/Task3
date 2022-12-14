/*! For license information please see main.js.LICENSE.txt */
(() => {
    "use strict";
    !(function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    })();
    const e = function (e, n) {
            if (!e) throw t(n);
        },
        t = function (e) {
            return new Error(
                "Firebase Database (${JSCORE_VERSION}) INTERNAL ASSERT FAILED: " +
                    e
            );
        },
        n = function (e) {
            const t = [];
            let n = 0;
            for (let i = 0; i < e.length; i++) {
                let s = e.charCodeAt(i);
                s < 128
                    ? (t[n++] = s)
                    : s < 2048
                    ? ((t[n++] = (s >> 6) | 192), (t[n++] = (63 & s) | 128))
                    : 55296 == (64512 & s) &&
                      i + 1 < e.length &&
                      56320 == (64512 & e.charCodeAt(i + 1))
                    ? ((s =
                          65536 +
                          ((1023 & s) << 10) +
                          (1023 & e.charCodeAt(++i))),
                      (t[n++] = (s >> 18) | 240),
                      (t[n++] = ((s >> 12) & 63) | 128),
                      (t[n++] = ((s >> 6) & 63) | 128),
                      (t[n++] = (63 & s) | 128))
                    : ((t[n++] = (s >> 12) | 224),
                      (t[n++] = ((s >> 6) & 63) | 128),
                      (t[n++] = (63 & s) | 128));
            }
            return t;
        },
        i = {
            byteToCharMap_: null,
            charToByteMap_: null,
            byteToCharMapWebSafe_: null,
            charToByteMapWebSafe_: null,
            ENCODED_VALS_BASE:
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            get ENCODED_VALS() {
                return this.ENCODED_VALS_BASE + "+/=";
            },
            get ENCODED_VALS_WEBSAFE() {
                return this.ENCODED_VALS_BASE + "-_.";
            },
            HAS_NATIVE_SUPPORT: "function" == typeof atob,
            encodeByteArray(e, t) {
                if (!Array.isArray(e))
                    throw Error(
                        "encodeByteArray takes an array as a parameter"
                    );
                this.init_();
                const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                    i = [];
                for (let t = 0; t < e.length; t += 3) {
                    const s = e[t],
                        r = t + 1 < e.length,
                        o = r ? e[t + 1] : 0,
                        a = t + 2 < e.length,
                        h = a ? e[t + 2] : 0,
                        l = s >> 2,
                        c = ((3 & s) << 4) | (o >> 4);
                    let u = ((15 & o) << 2) | (h >> 6),
                        d = 63 & h;
                    a || ((d = 64), r || (u = 64)),
                        i.push(n[l], n[c], n[u], n[d]);
                }
                return i.join("");
            },
            encodeString(e, t) {
                return this.HAS_NATIVE_SUPPORT && !t
                    ? btoa(e)
                    : this.encodeByteArray(n(e), t);
            },
            decodeString(e, t) {
                return this.HAS_NATIVE_SUPPORT && !t
                    ? atob(e)
                    : (function (e) {
                          const t = [];
                          let n = 0,
                              i = 0;
                          for (; n < e.length; ) {
                              const s = e[n++];
                              if (s < 128) t[i++] = String.fromCharCode(s);
                              else if (s > 191 && s < 224) {
                                  const r = e[n++];
                                  t[i++] = String.fromCharCode(
                                      ((31 & s) << 6) | (63 & r)
                                  );
                              } else if (s > 239 && s < 365) {
                                  const r =
                                      (((7 & s) << 18) |
                                          ((63 & e[n++]) << 12) |
                                          ((63 & e[n++]) << 6) |
                                          (63 & e[n++])) -
                                      65536;
                                  (t[i++] = String.fromCharCode(
                                      55296 + (r >> 10)
                                  )),
                                      (t[i++] = String.fromCharCode(
                                          56320 + (1023 & r)
                                      ));
                              } else {
                                  const r = e[n++],
                                      o = e[n++];
                                  t[i++] = String.fromCharCode(
                                      ((15 & s) << 12) |
                                          ((63 & r) << 6) |
                                          (63 & o)
                                  );
                              }
                          }
                          return t.join("");
                      })(this.decodeStringToByteArray(e, t));
            },
            decodeStringToByteArray(e, t) {
                this.init_();
                const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                    i = [];
                for (let t = 0; t < e.length; ) {
                    const s = n[e.charAt(t++)],
                        r = t < e.length ? n[e.charAt(t)] : 0;
                    ++t;
                    const o = t < e.length ? n[e.charAt(t)] : 64;
                    ++t;
                    const a = t < e.length ? n[e.charAt(t)] : 64;
                    if ((++t, null == s || null == r || null == o || null == a))
                        throw Error();
                    const h = (s << 2) | (r >> 4);
                    if ((i.push(h), 64 !== o)) {
                        const e = ((r << 4) & 240) | (o >> 2);
                        if ((i.push(e), 64 !== a)) {
                            const e = ((o << 6) & 192) | a;
                            i.push(e);
                        }
                    }
                }
                return i;
            },
            init_() {
                if (!this.byteToCharMap_) {
                    (this.byteToCharMap_ = {}),
                        (this.charToByteMap_ = {}),
                        (this.byteToCharMapWebSafe_ = {}),
                        (this.charToByteMapWebSafe_ = {});
                    for (let e = 0; e < this.ENCODED_VALS.length; e++)
                        (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                            (this.byteToCharMapWebSafe_[e] =
                                this.ENCODED_VALS_WEBSAFE.charAt(e)),
                            (this.charToByteMapWebSafe_[
                                this.byteToCharMapWebSafe_[e]
                            ] = e),
                            e >= this.ENCODED_VALS_BASE.length &&
                                ((this.charToByteMap_[
                                    this.ENCODED_VALS_WEBSAFE.charAt(e)
                                ] = e),
                                (this.charToByteMapWebSafe_[
                                    this.ENCODED_VALS.charAt(e)
                                ] = e));
                }
            },
        },
        s = function (e) {
            const t = n(e);
            return i.encodeByteArray(t, !0);
        },
        r = function (e) {
            return s(e).replace(/\./g, "");
        },
        o = function (e) {
            try {
                return i.decodeString(e, !0);
            } catch (e) {
                console.error("base64Decode failed: ", e);
            }
            return null;
        };
    function a(e) {
        return h(void 0, e);
    }
    function h(e, t) {
        if (!(t instanceof Object)) return t;
        switch (t.constructor) {
            case Date:
                return new Date(t.getTime());
            case Object:
                void 0 === e && (e = {});
                break;
            case Array:
                e = [];
                break;
            default:
                return t;
        }
        for (const n in t)
            t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = h(e[n], t[n]));
        return e;
    }
    class l {
        constructor() {
            (this.reject = () => {}),
                (this.resolve = () => {}),
                (this.promise = new Promise((e, t) => {
                    (this.resolve = e), (this.reject = t);
                }));
        }
        wrapCallback(e) {
            return (t, n) => {
                t ? this.reject(t) : this.resolve(n),
                    "function" == typeof e &&
                        (this.promise.catch(() => {}),
                        1 === e.length ? e(t) : e(t, n));
            };
        }
    }
    function c() {
        return (
            "undefined" != typeof window &&
            !!(window.cordova || window.phonegap || window.PhoneGap) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
                "undefined" != typeof navigator &&
                    "string" == typeof navigator.userAgent
                    ? navigator.userAgent
                    : ""
            )
        );
    }
    class u extends Error {
        constructor(e, t, n) {
            super(t),
                (this.code = e),
                (this.customData = n),
                (this.name = "FirebaseError"),
                Object.setPrototypeOf(this, u.prototype),
                Error.captureStackTrace &&
                    Error.captureStackTrace(this, d.prototype.create);
        }
    }
    class d {
        constructor(e, t, n) {
            (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
            const n = t[0] || {},
                i = `${this.service}/${e}`,
                s = this.errors[e],
                r = s
                    ? (function (e, t) {
                          return e.replace(p, (e, n) => {
                              const i = t[n];
                              return null != i ? String(i) : `<${n}?>`;
                          });
                      })(s, n)
                    : "Error",
                o = `${this.serviceName}: ${r} (${i}).`;
            return new u(i, o, n);
        }
    }
    const p = /\{\$([^}]+)}/g;
    function _(e) {
        return JSON.parse(e);
    }
    function f(e) {
        return JSON.stringify(e);
    }
    const g = function (e) {
        let t = {},
            n = {},
            i = {},
            s = "";
        try {
            const r = e.split(".");
            (t = _(o(r[0]) || "")),
                (n = _(o(r[1]) || "")),
                (s = r[2]),
                (i = n.d || {}),
                delete n.d;
        } catch (e) {}
        return { header: t, claims: n, data: i, signature: s };
    };
    function m(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    function y(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
    }
    function v(e) {
        for (const t in e)
            if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
    }
    function C(e, t, n) {
        const i = {};
        for (const s in e)
            Object.prototype.hasOwnProperty.call(e, s) &&
                (i[s] = t.call(n, e[s], s, e));
        return i;
    }
    function w(e, t) {
        if (e === t) return !0;
        const n = Object.keys(e),
            i = Object.keys(t);
        for (const s of n) {
            if (!i.includes(s)) return !1;
            const n = e[s],
                r = t[s];
            if (b(n) && b(r)) {
                if (!w(n, r)) return !1;
            } else if (n !== r) return !1;
        }
        for (const e of i) if (!n.includes(e)) return !1;
        return !0;
    }
    function b(e) {
        return null !== e && "object" == typeof e;
    }
    class I {
        constructor() {
            (this.chain_ = []),
                (this.buf_ = []),
                (this.W_ = []),
                (this.pad_ = []),
                (this.inbuf_ = 0),
                (this.total_ = 0),
                (this.blockSize = 64),
                (this.pad_[0] = 128);
            for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
            this.reset();
        }
        reset() {
            (this.chain_[0] = 1732584193),
                (this.chain_[1] = 4023233417),
                (this.chain_[2] = 2562383102),
                (this.chain_[3] = 271733878),
                (this.chain_[4] = 3285377520),
                (this.inbuf_ = 0),
                (this.total_ = 0);
        }
        compress_(e, t) {
            t || (t = 0);
            const n = this.W_;
            if ("string" == typeof e)
                for (let i = 0; i < 16; i++)
                    (n[i] =
                        (e.charCodeAt(t) << 24) |
                        (e.charCodeAt(t + 1) << 16) |
                        (e.charCodeAt(t + 2) << 8) |
                        e.charCodeAt(t + 3)),
                        (t += 4);
            else
                for (let i = 0; i < 16; i++)
                    (n[i] =
                        (e[t] << 24) |
                        (e[t + 1] << 16) |
                        (e[t + 2] << 8) |
                        e[t + 3]),
                        (t += 4);
            for (let e = 16; e < 80; e++) {
                const t = n[e - 3] ^ n[e - 8] ^ n[e - 14] ^ n[e - 16];
                n[e] = 4294967295 & ((t << 1) | (t >>> 31));
            }
            let i,
                s,
                r = this.chain_[0],
                o = this.chain_[1],
                a = this.chain_[2],
                h = this.chain_[3],
                l = this.chain_[4];
            for (let e = 0; e < 80; e++) {
                e < 40
                    ? e < 20
                        ? ((i = h ^ (o & (a ^ h))), (s = 1518500249))
                        : ((i = o ^ a ^ h), (s = 1859775393))
                    : e < 60
                    ? ((i = (o & a) | (h & (o | a))), (s = 2400959708))
                    : ((i = o ^ a ^ h), (s = 3395469782));
                const t =
                    (((r << 5) | (r >>> 27)) + i + l + s + n[e]) & 4294967295;
                (l = h),
                    (h = a),
                    (a = 4294967295 & ((o << 30) | (o >>> 2))),
                    (o = r),
                    (r = t);
            }
            (this.chain_[0] = (this.chain_[0] + r) & 4294967295),
                (this.chain_[1] = (this.chain_[1] + o) & 4294967295),
                (this.chain_[2] = (this.chain_[2] + a) & 4294967295),
                (this.chain_[3] = (this.chain_[3] + h) & 4294967295),
                (this.chain_[4] = (this.chain_[4] + l) & 4294967295);
        }
        update(e, t) {
            if (null == e) return;
            void 0 === t && (t = e.length);
            const n = t - this.blockSize;
            let i = 0;
            const s = this.buf_;
            let r = this.inbuf_;
            for (; i < t; ) {
                if (0 === r)
                    for (; i <= n; )
                        this.compress_(e, i), (i += this.blockSize);
                if ("string" == typeof e) {
                    for (; i < t; )
                        if (
                            ((s[r] = e.charCodeAt(i)),
                            ++r,
                            ++i,
                            r === this.blockSize)
                        ) {
                            this.compress_(s), (r = 0);
                            break;
                        }
                } else
                    for (; i < t; )
                        if (((s[r] = e[i]), ++r, ++i, r === this.blockSize)) {
                            this.compress_(s), (r = 0);
                            break;
                        }
            }
            (this.inbuf_ = r), (this.total_ += t);
        }
        digest() {
            const e = [];
            let t = 8 * this.total_;
            this.inbuf_ < 56
                ? this.update(this.pad_, 56 - this.inbuf_)
                : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
            for (let e = this.blockSize - 1; e >= 56; e--)
                (this.buf_[e] = 255 & t), (t /= 256);
            this.compress_(this.buf_);
            let n = 0;
            for (let t = 0; t < 5; t++)
                for (let i = 24; i >= 0; i -= 8)
                    (e[n] = (this.chain_[t] >> i) & 255), ++n;
            return e;
        }
    }
    function T(e, t) {
        return `${e} failed: ${t} argument `;
    }
    const E = function (e) {
        let t = 0;
        for (let n = 0; n < e.length; n++) {
            const i = e.charCodeAt(n);
            i < 128
                ? t++
                : i < 2048
                ? (t += 2)
                : i >= 55296 && i <= 56319
                ? ((t += 4), n++)
                : (t += 3);
        }
        return t;
    };
    function S(e) {
        return e && e._delegate ? e._delegate : e;
    }
    class k {
        constructor(e, t, n) {
            (this.name = e),
                (this.instanceFactory = t),
                (this.type = n),
                (this.multipleInstances = !1),
                (this.serviceProps = {}),
                (this.instantiationMode = "LAZY"),
                (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
            return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
            return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
            return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
            return (this.onInstanceCreated = e), this;
        }
    }
    const N = "[DEFAULT]";
    class R {
        constructor(e, t) {
            (this.name = e),
                (this.container = t),
                (this.component = null),
                (this.instances = new Map()),
                (this.instancesDeferred = new Map()),
                (this.instancesOptions = new Map()),
                (this.onInitCallbacks = new Map());
        }
        get(e) {
            const t = this.normalizeInstanceIdentifier(e);
            if (!this.instancesDeferred.has(t)) {
                const e = new l();
                if (
                    (this.instancesDeferred.set(t, e),
                    this.isInitialized(t) || this.shouldAutoInitialize())
                )
                    try {
                        const n = this.getOrInitializeService({
                            instanceIdentifier: t,
                        });
                        n && e.resolve(n);
                    } catch (e) {}
            }
            return this.instancesDeferred.get(t).promise;
        }
        getImmediate(e) {
            var t;
            const n = this.normalizeInstanceIdentifier(
                    null == e ? void 0 : e.identifier
                ),
                i =
                    null !== (t = null == e ? void 0 : e.optional) &&
                    void 0 !== t &&
                    t;
            if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
                if (i) return null;
                throw Error(`Service ${this.name} is not available`);
            }
            try {
                return this.getOrInitializeService({ instanceIdentifier: n });
            } catch (e) {
                if (i) return null;
                throw e;
            }
        }
        getComponent() {
            return this.component;
        }
        setComponent(e) {
            if (e.name !== this.name)
                throw Error(
                    `Mismatching Component ${e.name} for Provider ${this.name}.`
                );
            if (this.component)
                throw Error(
                    `Component for ${this.name} has already been provided`
                );
            if (((this.component = e), this.shouldAutoInitialize())) {
                if (
                    (function (e) {
                        return "EAGER" === e.instantiationMode;
                    })(e)
                )
                    try {
                        this.getOrInitializeService({ instanceIdentifier: N });
                    } catch (e) {}
                for (const [e, t] of this.instancesDeferred.entries()) {
                    const n = this.normalizeInstanceIdentifier(e);
                    try {
                        const e = this.getOrInitializeService({
                            instanceIdentifier: n,
                        });
                        t.resolve(e);
                    } catch (e) {}
                }
            }
        }
        clearInstance(e = "[DEFAULT]") {
            this.instancesDeferred.delete(e),
                this.instancesOptions.delete(e),
                this.instances.delete(e);
        }
        async delete() {
            const e = Array.from(this.instances.values());
            await Promise.all([
                ...e
                    .filter((e) => "INTERNAL" in e)
                    .map((e) => e.INTERNAL.delete()),
                ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
            ]);
        }
        isComponentSet() {
            return null != this.component;
        }
        isInitialized(e = "[DEFAULT]") {
            return this.instances.has(e);
        }
        getOptions(e = "[DEFAULT]") {
            return this.instancesOptions.get(e) || {};
        }
        initialize(e = {}) {
            const { options: t = {} } = e,
                n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
            if (this.isInitialized(n))
                throw Error(`${this.name}(${n}) has already been initialized`);
            if (!this.isComponentSet())
                throw Error(
                    `Component ${this.name} has not been registered yet`
                );
            const i = this.getOrInitializeService({
                instanceIdentifier: n,
                options: t,
            });
            for (const [e, t] of this.instancesDeferred.entries())
                n === this.normalizeInstanceIdentifier(e) && t.resolve(i);
            return i;
        }
        onInit(e, t) {
            var n;
            const i = this.normalizeInstanceIdentifier(t),
                s =
                    null !== (n = this.onInitCallbacks.get(i)) && void 0 !== n
                        ? n
                        : new Set();
            s.add(e), this.onInitCallbacks.set(i, s);
            const r = this.instances.get(i);
            return (
                r && e(r, i),
                () => {
                    s.delete(e);
                }
            );
        }
        invokeOnInitCallbacks(e, t) {
            const n = this.onInitCallbacks.get(t);
            if (n)
                for (const i of n)
                    try {
                        i(e, t);
                    } catch (e) {}
        }
        getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
            let n = this.instances.get(e);
            if (
                !n &&
                this.component &&
                ((n = this.component.instanceFactory(this.container, {
                    instanceIdentifier: ((i = e), i === N ? void 0 : i),
                    options: t,
                })),
                this.instances.set(e, n),
                this.instancesOptions.set(e, t),
                this.invokeOnInitCallbacks(n, e),
                this.component.onInstanceCreated)
            )
                try {
                    this.component.onInstanceCreated(this.container, e, n);
                } catch (e) {}
            var i;
            return n || null;
        }
        normalizeInstanceIdentifier(e = "[DEFAULT]") {
            return this.component
                ? this.component.multipleInstances
                    ? e
                    : N
                : e;
        }
        shouldAutoInitialize() {
            return (
                !!this.component &&
                "EXPLICIT" !== this.component.instantiationMode
            );
        }
    }
    class P {
        constructor(e) {
            (this.name = e), (this.providers = new Map());
        }
        addComponent(e) {
            const t = this.getProvider(e.name);
            if (t.isComponentSet())
                throw new Error(
                    `Component ${e.name} has already been registered with ${this.name}`
                );
            t.setComponent(e);
        }
        addOrOverwriteComponent(e) {
            this.getProvider(e.name).isComponentSet() &&
                this.providers.delete(e.name),
                this.addComponent(e);
        }
        getProvider(e) {
            if (this.providers.has(e)) return this.providers.get(e);
            const t = new R(e, this);
            return this.providers.set(e, t), t;
        }
        getProviders() {
            return Array.from(this.providers.values());
        }
    }
    const D = [];
    var x;
    !(function (e) {
        (e[(e.DEBUG = 0)] = "DEBUG"),
            (e[(e.VERBOSE = 1)] = "VERBOSE"),
            (e[(e.INFO = 2)] = "INFO"),
            (e[(e.WARN = 3)] = "WARN"),
            (e[(e.ERROR = 4)] = "ERROR"),
            (e[(e.SILENT = 5)] = "SILENT");
    })(x || (x = {}));
    const A = {
            debug: x.DEBUG,
            verbose: x.VERBOSE,
            info: x.INFO,
            warn: x.WARN,
            error: x.ERROR,
            silent: x.SILENT,
        },
        O = x.INFO,
        L = {
            [x.DEBUG]: "log",
            [x.VERBOSE]: "log",
            [x.INFO]: "info",
            [x.WARN]: "warn",
            [x.ERROR]: "error",
        },
        M = (e, t, ...n) => {
            if (t < e.logLevel) return;
            const i = new Date().toISOString(),
                s = L[t];
            if (!s)
                throw new Error(
                    `Attempted to log a message with an invalid logType (value: ${t})`
                );
            console[s](`[${i}]  ${e.name}:`, ...n);
        };
    class F {
        constructor(e) {
            (this.name = e),
                (this._logLevel = O),
                (this._logHandler = M),
                (this._userLogHandler = null),
                D.push(this);
        }
        get logLevel() {
            return this._logLevel;
        }
        set logLevel(e) {
            if (!(e in x))
                throw new TypeError(
                    `Invalid value "${e}" assigned to \`logLevel\``
                );
            this._logLevel = e;
        }
        setLogLevel(e) {
            this._logLevel = "string" == typeof e ? A[e] : e;
        }
        get logHandler() {
            return this._logHandler;
        }
        set logHandler(e) {
            if ("function" != typeof e)
                throw new TypeError(
                    "Value assigned to `logHandler` must be a function"
                );
            this._logHandler = e;
        }
        get userLogHandler() {
            return this._userLogHandler;
        }
        set userLogHandler(e) {
            this._userLogHandler = e;
        }
        debug(...e) {
            this._userLogHandler && this._userLogHandler(this, x.DEBUG, ...e),
                this._logHandler(this, x.DEBUG, ...e);
        }
        log(...e) {
            this._userLogHandler && this._userLogHandler(this, x.VERBOSE, ...e),
                this._logHandler(this, x.VERBOSE, ...e);
        }
        info(...e) {
            this._userLogHandler && this._userLogHandler(this, x.INFO, ...e),
                this._logHandler(this, x.INFO, ...e);
        }
        warn(...e) {
            this._userLogHandler && this._userLogHandler(this, x.WARN, ...e),
                this._logHandler(this, x.WARN, ...e);
        }
        error(...e) {
            this._userLogHandler && this._userLogHandler(this, x.ERROR, ...e),
                this._logHandler(this, x.ERROR, ...e);
        }
    }
    let q, W;
    const U = new WeakMap(),
        B = new WeakMap(),
        j = new WeakMap(),
        H = new WeakMap(),
        z = new WeakMap();
    let V = {
        get(e, t, n) {
            if (e instanceof IDBTransaction) {
                if ("done" === t) return B.get(e);
                if ("objectStoreNames" === t)
                    return e.objectStoreNames || j.get(e);
                if ("store" === t)
                    return n.objectStoreNames[1]
                        ? void 0
                        : n.objectStore(n.objectStoreNames[0]);
            }
            return K(e[t]);
        },
        set: (e, t, n) => ((e[t] = n), !0),
        has: (e, t) =>
            (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
            t in e,
    };
    function $(e) {
        return "function" == typeof e
            ? (t = e) !== IDBDatabase.prototype.transaction ||
              "objectStoreNames" in IDBTransaction.prototype
                ? (
                      W ||
                      (W = [
                          IDBCursor.prototype.advance,
                          IDBCursor.prototype.continue,
                          IDBCursor.prototype.continuePrimaryKey,
                      ])
                  ).includes(t)
                    ? function (...e) {
                          return t.apply(G(this), e), K(U.get(this));
                      }
                    : function (...e) {
                          return K(t.apply(G(this), e));
                      }
                : function (e, ...n) {
                      const i = t.call(G(this), e, ...n);
                      return j.set(i, e.sort ? e.sort() : [e]), K(i);
                  }
            : (e instanceof IDBTransaction &&
                  (function (e) {
                      if (B.has(e)) return;
                      const t = new Promise((t, n) => {
                          const i = () => {
                                  e.removeEventListener("complete", s),
                                      e.removeEventListener("error", r),
                                      e.removeEventListener("abort", r);
                              },
                              s = () => {
                                  t(), i();
                              },
                              r = () => {
                                  n(
                                      e.error ||
                                          new DOMException(
                                              "AbortError",
                                              "AbortError"
                                          )
                                  ),
                                      i();
                              };
                          e.addEventListener("complete", s),
                              e.addEventListener("error", r),
                              e.addEventListener("abort", r);
                      });
                      B.set(e, t);
                  })(e),
              (n = e),
              (
                  q ||
                  (q = [
                      IDBDatabase,
                      IDBObjectStore,
                      IDBIndex,
                      IDBCursor,
                      IDBTransaction,
                  ])
              ).some((e) => n instanceof e)
                  ? new Proxy(e, V)
                  : e);
        var t, n;
    }
    function K(e) {
        if (e instanceof IDBRequest)
            return (function (e) {
                const t = new Promise((t, n) => {
                    const i = () => {
                            e.removeEventListener("success", s),
                                e.removeEventListener("error", r);
                        },
                        s = () => {
                            t(K(e.result)), i();
                        },
                        r = () => {
                            n(e.error), i();
                        };
                    e.addEventListener("success", s),
                        e.addEventListener("error", r);
                });
                return (
                    t
                        .then((t) => {
                            t instanceof IDBCursor && U.set(t, e);
                        })
                        .catch(() => {}),
                    z.set(t, e),
                    t
                );
            })(e);
        if (H.has(e)) return H.get(e);
        const t = $(e);
        return t !== e && (H.set(e, t), z.set(t, e)), t;
    }
    const G = (e) => z.get(e),
        Y = ["get", "getKey", "getAll", "getAllKeys", "count"],
        Q = ["put", "add", "delete", "clear"],
        J = new Map();
    function X(e, t) {
        if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t)
            return;
        if (J.get(t)) return J.get(t);
        const n = t.replace(/FromIndex$/, ""),
            i = t !== n,
            s = Q.includes(n);
        if (
            !(n in (i ? IDBIndex : IDBObjectStore).prototype) ||
            (!s && !Y.includes(n))
        )
            return;
        const r = async function (e, ...t) {
            const r = this.transaction(e, s ? "readwrite" : "readonly");
            let o = r.store;
            return (
                i && (o = o.index(t.shift())),
                (await Promise.all([o[n](...t), s && r.done]))[0]
            );
        };
        return J.set(t, r), r;
    }
    var Z;
    (Z = V),
        (V = {
            ...Z,
            get: (e, t, n) => X(e, t) || Z.get(e, t, n),
            has: (e, t) => !!X(e, t) || Z.has(e, t),
        });
    class ee {
        constructor(e) {
            this.container = e;
        }
        getPlatformInfoString() {
            return this.container
                .getProviders()
                .map((e) => {
                    if (
                        (function (e) {
                            const t = e.getComponent();
                            return "VERSION" === (null == t ? void 0 : t.type);
                        })(e)
                    ) {
                        const t = e.getImmediate();
                        return `${t.library}/${t.version}`;
                    }
                    return null;
                })
                .filter((e) => e)
                .join(" ");
        }
    }
    const te = "@firebase/app",
        ne = "0.7.29",
        ie = new F("@firebase/app"),
        se = {
            [te]: "fire-core",
            "@firebase/app-compat": "fire-core-compat",
            "@firebase/analytics": "fire-analytics",
            "@firebase/analytics-compat": "fire-analytics-compat",
            "@firebase/app-check": "fire-app-check",
            "@firebase/app-check-compat": "fire-app-check-compat",
            "@firebase/auth": "fire-auth",
            "@firebase/auth-compat": "fire-auth-compat",
            "@firebase/database": "fire-rtdb",
            "@firebase/database-compat": "fire-rtdb-compat",
            "@firebase/functions": "fire-fn",
            "@firebase/functions-compat": "fire-fn-compat",
            "@firebase/installations": "fire-iid",
            "@firebase/installations-compat": "fire-iid-compat",
            "@firebase/messaging": "fire-fcm",
            "@firebase/messaging-compat": "fire-fcm-compat",
            "@firebase/performance": "fire-perf",
            "@firebase/performance-compat": "fire-perf-compat",
            "@firebase/remote-config": "fire-rc",
            "@firebase/remote-config-compat": "fire-rc-compat",
            "@firebase/storage": "fire-gcs",
            "@firebase/storage-compat": "fire-gcs-compat",
            "@firebase/firestore": "fire-fst",
            "@firebase/firestore-compat": "fire-fst-compat",
            "fire-js": "fire-js",
            firebase: "fire-js-all",
        },
        re = new Map(),
        oe = new Map();
    function ae(e, t) {
        try {
            e.container.addComponent(t);
        } catch (n) {
            ie.debug(
                `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
                n
            );
        }
    }
    function he(e) {
        const t = e.name;
        if (oe.has(t))
            return (
                ie.debug(
                    `There were multiple attempts to register component ${t}.`
                ),
                !1
            );
        oe.set(t, e);
        for (const t of re.values()) ae(t, e);
        return !0;
    }
    const le = new d("app", "Firebase", {
        "no-app":
            "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
        "bad-app-name": "Illegal App name: '{$appName}",
        "duplicate-app":
            "Firebase App named '{$appName}' already exists with different options or config",
        "app-deleted": "Firebase App named '{$appName}' already deleted",
        "invalid-app-argument":
            "firebase.{$appName}() takes either no argument or a Firebase App instance.",
        "invalid-log-argument":
            "First argument to `onLog` must be null or a function.",
        "storage-open":
            "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
        "storage-get":
            "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
        "storage-set":
            "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
        "storage-delete":
            "Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",
    });
    class ce {
        constructor(e, t, n) {
            (this._isDeleted = !1),
                (this._options = Object.assign({}, e)),
                (this._config = Object.assign({}, t)),
                (this._name = t.name),
                (this._automaticDataCollectionEnabled =
                    t.automaticDataCollectionEnabled),
                (this._container = n),
                this.container.addComponent(new k("app", () => this, "PUBLIC"));
        }
        get automaticDataCollectionEnabled() {
            return this.checkDestroyed(), this._automaticDataCollectionEnabled;
        }
        set automaticDataCollectionEnabled(e) {
            this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
        }
        get name() {
            return this.checkDestroyed(), this._name;
        }
        get options() {
            return this.checkDestroyed(), this._options;
        }
        get config() {
            return this.checkDestroyed(), this._config;
        }
        get container() {
            return this._container;
        }
        get isDeleted() {
            return this._isDeleted;
        }
        set isDeleted(e) {
            this._isDeleted = e;
        }
        checkDestroyed() {
            if (this.isDeleted)
                throw le.create("app-deleted", { appName: this._name });
        }
    }
    function ue(e, t, n) {
        var i;
        let s = null !== (i = se[e]) && void 0 !== i ? i : e;
        n && (s += `-${n}`);
        const r = s.match(/\s|\//),
            o = t.match(/\s|\//);
        if (r || o) {
            const e = [
                `Unable to register library "${s}" with version "${t}":`,
            ];
            return (
                r &&
                    e.push(
                        `library name "${s}" contains illegal characters (whitespace or "/")`
                    ),
                r && o && e.push("and"),
                o &&
                    e.push(
                        `version name "${t}" contains illegal characters (whitespace or "/")`
                    ),
                void ie.warn(e.join(" "))
            );
        }
        he(
            new k(`${s}-version`, () => ({ library: s, version: t }), "VERSION")
        );
    }
    const de = "firebase-heartbeat-store";
    let pe = null;
    function _e() {
        return (
            pe ||
                (pe = (function (
                    e,
                    t,
                    { blocked: n, upgrade: i, blocking: s, terminated: r } = {}
                ) {
                    const o = indexedDB.open(e, t),
                        a = K(o);
                    return (
                        i &&
                            o.addEventListener("upgradeneeded", (e) => {
                                i(
                                    K(o.result),
                                    e.oldVersion,
                                    e.newVersion,
                                    K(o.transaction)
                                );
                            }),
                        n && o.addEventListener("blocked", () => n()),
                        a
                            .then((e) => {
                                r && e.addEventListener("close", () => r()),
                                    s &&
                                        e.addEventListener(
                                            "versionchange",
                                            () => s()
                                        );
                            })
                            .catch(() => {}),
                        a
                    );
                })("firebase-heartbeat-database", 1, {
                    upgrade: (e, t) => {
                        0 === t && e.createObjectStore(de);
                    },
                }).catch((e) => {
                    throw le.create("storage-open", {
                        originalErrorMessage: e.message,
                    });
                })),
            pe
        );
    }
    async function fe(e, t) {
        var n;
        try {
            const n = (await _e()).transaction(de, "readwrite"),
                i = n.objectStore(de);
            return await i.put(t, ge(e)), n.done;
        } catch (e) {
            throw le.create("storage-set", {
                originalErrorMessage:
                    null === (n = e) || void 0 === n ? void 0 : n.message,
            });
        }
    }
    function ge(e) {
        return `${e.name}!${e.options.appId}`;
    }
    class me {
        constructor(e) {
            (this.container = e), (this._heartbeatsCache = null);
            const t = this.container.getProvider("app").getImmediate();
            (this._storage = new ve(t)),
                (this._heartbeatsCachePromise = this._storage
                    .read()
                    .then((e) => ((this._heartbeatsCache = e), e)));
        }
        async triggerHeartbeat() {
            const e = this.container
                    .getProvider("platform-logger")
                    .getImmediate()
                    .getPlatformInfoString(),
                t = ye();
            if (
                (null === this._heartbeatsCache &&
                    (this._heartbeatsCache = await this
                        ._heartbeatsCachePromise),
                this._heartbeatsCache.lastSentHeartbeatDate !== t &&
                    !this._heartbeatsCache.heartbeats.some((e) => e.date === t))
            )
                return (
                    this._heartbeatsCache.heartbeats.push({
                        date: t,
                        agent: e,
                    }),
                    (this._heartbeatsCache.heartbeats =
                        this._heartbeatsCache.heartbeats.filter((e) => {
                            const t = new Date(e.date).valueOf();
                            return Date.now() - t <= 2592e6;
                        })),
                    this._storage.overwrite(this._heartbeatsCache)
                );
        }
        async getHeartbeatsHeader() {
            if (
                (null === this._heartbeatsCache &&
                    (await this._heartbeatsCachePromise),
                null === this._heartbeatsCache ||
                    0 === this._heartbeatsCache.heartbeats.length)
            )
                return "";
            const e = ye(),
                { heartbeatsToSend: t, unsentEntries: n } = (function (
                    e,
                    t = 1024
                ) {
                    const n = [];
                    let i = e.slice();
                    for (const s of e) {
                        const e = n.find((e) => e.agent === s.agent);
                        if (e) {
                            if ((e.dates.push(s.date), Ce(n) > t)) {
                                e.dates.pop();
                                break;
                            }
                        } else if (
                            (n.push({ agent: s.agent, dates: [s.date] }),
                            Ce(n) > t)
                        ) {
                            n.pop();
                            break;
                        }
                        i = i.slice(1);
                    }
                    return { heartbeatsToSend: n, unsentEntries: i };
                })(this._heartbeatsCache.heartbeats),
                i = r(JSON.stringify({ version: 2, heartbeats: t }));
            return (
                (this._heartbeatsCache.lastSentHeartbeatDate = e),
                n.length > 0
                    ? ((this._heartbeatsCache.heartbeats = n),
                      await this._storage.overwrite(this._heartbeatsCache))
                    : ((this._heartbeatsCache.heartbeats = []),
                      this._storage.overwrite(this._heartbeatsCache)),
                i
            );
        }
    }
    function ye() {
        return new Date().toISOString().substring(0, 10);
    }
    class ve {
        constructor(e) {
            (this.app = e),
                (this._canUseIndexedDBPromise =
                    this.runIndexedDBEnvironmentCheck());
        }
        async runIndexedDBEnvironmentCheck() {
            return (
                "object" == typeof indexedDB &&
                new Promise((e, t) => {
                    try {
                        let n = !0;
                        const i =
                                "validate-browser-context-for-indexeddb-analytics-module",
                            s = self.indexedDB.open(i);
                        (s.onsuccess = () => {
                            s.result.close(),
                                n || self.indexedDB.deleteDatabase(i),
                                e(!0);
                        }),
                            (s.onupgradeneeded = () => {
                                n = !1;
                            }),
                            (s.onerror = () => {
                                var e;
                                t(
                                    (null === (e = s.error) || void 0 === e
                                        ? void 0
                                        : e.message) || ""
                                );
                            });
                    } catch (e) {
                        t(e);
                    }
                })
                    .then(() => !0)
                    .catch(() => !1)
            );
        }
        async read() {
            if (await this._canUseIndexedDBPromise) {
                return (
                    (await (async function (e) {
                        var t;
                        try {
                            return (await _e())
                                .transaction(de)
                                .objectStore(de)
                                .get(ge(e));
                        } catch (e) {
                            throw le.create("storage-get", {
                                originalErrorMessage:
                                    null === (t = e) || void 0 === t
                                        ? void 0
                                        : t.message,
                            });
                        }
                    })(this.app)) || { heartbeats: [] }
                );
            }
            return { heartbeats: [] };
        }
        async overwrite(e) {
            var t;
            if (await this._canUseIndexedDBPromise) {
                const n = await this.read();
                return fe(this.app, {
                    lastSentHeartbeatDate:
                        null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
                            ? t
                            : n.lastSentHeartbeatDate,
                    heartbeats: e.heartbeats,
                });
            }
        }
        async add(e) {
            var t;
            if (await this._canUseIndexedDBPromise) {
                const n = await this.read();
                return fe(this.app, {
                    lastSentHeartbeatDate:
                        null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
                            ? t
                            : n.lastSentHeartbeatDate,
                    heartbeats: [...n.heartbeats, ...e.heartbeats],
                });
            }
        }
    }
    function Ce(e) {
        return r(JSON.stringify({ version: 2, heartbeats: e })).length;
    }
    he(new k("platform-logger", (e) => new ee(e), "PRIVATE")),
        he(new k("heartbeat", (e) => new me(e), "PRIVATE")),
        ue(te, ne, ""),
        ue(te, ne, "esm2017"),
        ue("fire-js", ""),
        ue("firebase", "9.9.1", "app");
    const we = "@firebase/database",
        be = "0.13.3";
    let Ie = "";
    class Te {
        constructor(e) {
            (this.domStorage_ = e), (this.prefix_ = "firebase:");
        }
        set(e, t) {
            null == t
                ? this.domStorage_.removeItem(this.prefixedName_(e))
                : this.domStorage_.setItem(this.prefixedName_(e), f(t));
        }
        get(e) {
            const t = this.domStorage_.getItem(this.prefixedName_(e));
            return null == t ? null : _(t);
        }
        remove(e) {
            this.domStorage_.removeItem(this.prefixedName_(e));
        }
        prefixedName_(e) {
            return this.prefix_ + e;
        }
        toString() {
            return this.domStorage_.toString();
        }
    }
    class Ee {
        constructor() {
            (this.cache_ = {}), (this.isInMemoryStorage = !0);
        }
        set(e, t) {
            null == t ? delete this.cache_[e] : (this.cache_[e] = t);
        }
        get(e) {
            return m(this.cache_, e) ? this.cache_[e] : null;
        }
        remove(e) {
            delete this.cache_[e];
        }
    }
    const Se = function (e) {
            try {
                if ("undefined" != typeof window && void 0 !== window[e]) {
                    const t = window[e];
                    return (
                        t.setItem("firebase:sentinel", "cache"),
                        t.removeItem("firebase:sentinel"),
                        new Te(t)
                    );
                }
            } catch (e) {}
            return new Ee();
        },
        ke = Se("localStorage"),
        Ne = Se("sessionStorage"),
        Re = new F("@firebase/database"),
        Pe = (function () {
            let e = 1;
            return function () {
                return e++;
            };
        })(),
        De = function (t) {
            const n = (function (t) {
                    const n = [];
                    let i = 0;
                    for (let s = 0; s < t.length; s++) {
                        let r = t.charCodeAt(s);
                        if (r >= 55296 && r <= 56319) {
                            const n = r - 55296;
                            s++,
                                e(
                                    s < t.length,
                                    "Surrogate pair missing trail surrogate."
                                ),
                                (r =
                                    65536 +
                                    (n << 10) +
                                    (t.charCodeAt(s) - 56320));
                        }
                        r < 128
                            ? (n[i++] = r)
                            : r < 2048
                            ? ((n[i++] = (r >> 6) | 192),
                              (n[i++] = (63 & r) | 128))
                            : r < 65536
                            ? ((n[i++] = (r >> 12) | 224),
                              (n[i++] = ((r >> 6) & 63) | 128),
                              (n[i++] = (63 & r) | 128))
                            : ((n[i++] = (r >> 18) | 240),
                              (n[i++] = ((r >> 12) & 63) | 128),
                              (n[i++] = ((r >> 6) & 63) | 128),
                              (n[i++] = (63 & r) | 128));
                    }
                    return n;
                })(t),
                s = new I();
            s.update(n);
            const r = s.digest();
            return i.encodeByteArray(r);
        },
        xe = function (...e) {
            let t = "";
            for (let n = 0; n < e.length; n++) {
                const i = e[n];
                Array.isArray(i) ||
                (i && "object" == typeof i && "number" == typeof i.length)
                    ? (t += xe.apply(null, i))
                    : (t += "object" == typeof i ? f(i) : i),
                    (t += " ");
            }
            return t;
        };
    let Ae = null,
        Oe = !0;
    const Le = function (...t) {
            if (
                (!0 === Oe &&
                    ((Oe = !1),
                    null === Ae &&
                        !0 === Ne.get("logging_enabled") &&
                        ((n = !0),
                        e(
                            !i || !0 === n || !1 === n,
                            "Can't turn on custom loggers persistently."
                        ),
                        !0 === n
                            ? ((Re.logLevel = x.VERBOSE),
                              (Ae = Re.log.bind(Re)),
                              i && Ne.set("logging_enabled", !0))
                            : "function" == typeof n
                            ? (Ae = n)
                            : ((Ae = null), Ne.remove("logging_enabled")))),
                Ae)
            ) {
                const e = xe.apply(null, t);
                Ae(e);
            }
            var n, i;
        },
        Me = function (e) {
            return function (...t) {
                Le(e, ...t);
            };
        },
        Fe = function (...e) {
            const t = "FIREBASE INTERNAL ERROR: " + xe(...e);
            Re.error(t);
        },
        qe = function (...e) {
            const t = `FIREBASE FATAL ERROR: ${xe(...e)}`;
            throw (Re.error(t), new Error(t));
        },
        We = function (...e) {
            const t = "FIREBASE WARNING: " + xe(...e);
            Re.warn(t);
        },
        Ue = function (e) {
            return (
                "number" == typeof e &&
                (e != e ||
                    e === Number.POSITIVE_INFINITY ||
                    e === Number.NEGATIVE_INFINITY)
            );
        },
        Be = "[MIN_NAME]",
        je = "[MAX_NAME]",
        He = function (e, t) {
            if (e === t) return 0;
            if (e === Be || t === je) return -1;
            if (t === Be || e === je) return 1;
            {
                const n = Je(e),
                    i = Je(t);
                return null !== n
                    ? null !== i
                        ? n - i == 0
                            ? e.length - t.length
                            : n - i
                        : -1
                    : null !== i
                    ? 1
                    : e < t
                    ? -1
                    : 1;
            }
        },
        ze = function (e, t) {
            return e === t ? 0 : e < t ? -1 : 1;
        },
        Ve = function (e, t) {
            if (t && e in t) return t[e];
            throw new Error(
                "Missing required key (" + e + ") in object: " + f(t)
            );
        },
        $e = function (e) {
            if ("object" != typeof e || null === e) return f(e);
            const t = [];
            for (const n in e) t.push(n);
            t.sort();
            let n = "{";
            for (let i = 0; i < t.length; i++)
                0 !== i && (n += ","),
                    (n += f(t[i])),
                    (n += ":"),
                    (n += $e(e[t[i]]));
            return (n += "}"), n;
        },
        Ke = function (e, t) {
            const n = e.length;
            if (n <= t) return [e];
            const i = [];
            for (let s = 0; s < n; s += t)
                s + t > n
                    ? i.push(e.substring(s, n))
                    : i.push(e.substring(s, s + t));
            return i;
        };
    function Ge(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(n, e[n]);
    }
    const Ye = function (t) {
            e(!Ue(t), "Invalid JSON number");
            let n, i, s, r, o;
            0 === t
                ? ((i = 0), (s = 0), (n = 1 / t == -1 / 0 ? 1 : 0))
                : ((n = t < 0),
                  (t = Math.abs(t)) >= Math.pow(2, -1022)
                      ? ((r = Math.min(
                            Math.floor(Math.log(t) / Math.LN2),
                            1023
                        )),
                        (i = r + 1023),
                        (s = Math.round(
                            t * Math.pow(2, 52 - r) - Math.pow(2, 52)
                        )))
                      : ((i = 0), (s = Math.round(t / Math.pow(2, -1074)))));
            const a = [];
            for (o = 52; o; o -= 1)
                a.push(s % 2 ? 1 : 0), (s = Math.floor(s / 2));
            for (o = 11; o; o -= 1)
                a.push(i % 2 ? 1 : 0), (i = Math.floor(i / 2));
            a.push(n ? 1 : 0), a.reverse();
            const h = a.join("");
            let l = "";
            for (o = 0; o < 64; o += 8) {
                let e = parseInt(h.substr(o, 8), 2).toString(16);
                1 === e.length && (e = "0" + e), (l += e);
            }
            return l.toLowerCase();
        },
        Qe = new RegExp("^-?(0*)\\d{1,10}$"),
        Je = function (e) {
            if (Qe.test(e)) {
                const t = Number(e);
                if (t >= -2147483648 && t <= 2147483647) return t;
            }
            return null;
        },
        Xe = function (e) {
            try {
                e();
            } catch (e) {
                setTimeout(() => {
                    const t = e.stack || "";
                    throw (We("Exception was thrown by user callback.", t), e);
                }, Math.floor(0));
            }
        },
        Ze = function (e, t) {
            const n = setTimeout(e, t);
            return "object" == typeof n && n.unref && n.unref(), n;
        };
    class et {
        constructor(e, t) {
            (this.appName_ = e),
                (this.appCheckProvider = t),
                (this.appCheck =
                    null == t ? void 0 : t.getImmediate({ optional: !0 })),
                this.appCheck ||
                    null == t ||
                    t.get().then((e) => (this.appCheck = e));
        }
        getToken(e) {
            return this.appCheck
                ? this.appCheck.getToken(e)
                : new Promise((t, n) => {
                      setTimeout(() => {
                          this.appCheck ? this.getToken(e).then(t, n) : t(null);
                      }, 0);
                  });
        }
        addTokenChangeListener(e) {
            var t;
            null === (t = this.appCheckProvider) ||
                void 0 === t ||
                t.get().then((t) => t.addTokenListener(e));
        }
        notifyForInvalidToken() {
            We(
                `Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`
            );
        }
    }
    class tt {
        constructor(e, t, n) {
            (this.appName_ = e),
                (this.firebaseOptions_ = t),
                (this.authProvider_ = n),
                (this.auth_ = null),
                (this.auth_ = n.getImmediate({ optional: !0 })),
                this.auth_ || n.onInit((e) => (this.auth_ = e));
        }
        getToken(e) {
            return this.auth_
                ? this.auth_
                      .getToken(e)
                      .catch((e) =>
                          e && "auth/token-not-initialized" === e.code
                              ? (Le(
                                    "Got auth/token-not-initialized error.  Treating as null token."
                                ),
                                null)
                              : Promise.reject(e)
                      )
                : new Promise((t, n) => {
                      setTimeout(() => {
                          this.auth_ ? this.getToken(e).then(t, n) : t(null);
                      }, 0);
                  });
        }
        addTokenChangeListener(e) {
            this.auth_
                ? this.auth_.addAuthTokenListener(e)
                : this.authProvider_
                      .get()
                      .then((t) => t.addAuthTokenListener(e));
        }
        removeTokenChangeListener(e) {
            this.authProvider_.get().then((t) => t.removeAuthTokenListener(e));
        }
        notifyForInvalidToken() {
            let e =
                'Provided authentication credentials for the app named "' +
                this.appName_ +
                '" are invalid. This usually indicates your app was not initialized correctly. ';
            "credential" in this.firebaseOptions_
                ? (e +=
                      'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
                : "serviceAccount" in this.firebaseOptions_
                ? (e +=
                      'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
                : (e +=
                      'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
                We(e);
        }
    }
    class nt {
        constructor(e) {
            this.accessToken = e;
        }
        getToken(e) {
            return Promise.resolve({ accessToken: this.accessToken });
        }
        addTokenChangeListener(e) {
            e(this.accessToken);
        }
        removeTokenChangeListener(e) {}
        notifyForInvalidToken() {}
    }
    nt.OWNER = "owner";
    const it =
            /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
        st = "websocket",
        rt = "long_polling";
    class ot {
        constructor(e, t, n, i, s = !1, r = "", o = !1) {
            (this.secure = t),
                (this.namespace = n),
                (this.webSocketOnly = i),
                (this.nodeAdmin = s),
                (this.persistenceKey = r),
                (this.includeNamespaceInQueryParams = o),
                (this._host = e.toLowerCase()),
                (this._domain = this._host.substr(this._host.indexOf(".") + 1)),
                (this.internalHost = ke.get("host:" + e) || this._host);
        }
        isCacheableHost() {
            return "s-" === this.internalHost.substr(0, 2);
        }
        isCustomHost() {
            return (
                "firebaseio.com" !== this._domain &&
                "firebaseio-demo.com" !== this._domain
            );
        }
        get host() {
            return this._host;
        }
        set host(e) {
            e !== this.internalHost &&
                ((this.internalHost = e),
                this.isCacheableHost() &&
                    ke.set("host:" + this._host, this.internalHost));
        }
        toString() {
            let e = this.toURLString();
            return (
                this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e
            );
        }
        toURLString() {
            const e = this.secure ? "https://" : "http://",
                t = this.includeNamespaceInQueryParams
                    ? `?ns=${this.namespace}`
                    : "";
            return `${e}${this.host}/${t}`;
        }
    }
    function at(t, n, i) {
        let s;
        if (
            (e("string" == typeof n, "typeof type must == string"),
            e("object" == typeof i, "typeof params must == object"),
            n === st)
        )
            s = (t.secure ? "wss://" : "ws://") + t.internalHost + "/.ws?";
        else {
            if (n !== rt) throw new Error("Unknown connection type: " + n);
            s = (t.secure ? "https://" : "http://") + t.internalHost + "/.lp?";
        }
        (function (e) {
            return (
                e.host !== e.internalHost ||
                e.isCustomHost() ||
                e.includeNamespaceInQueryParams
            );
        })(t) && (i.ns = t.namespace);
        const r = [];
        return (
            Ge(i, (e, t) => {
                r.push(e + "=" + t);
            }),
            s + r.join("&")
        );
    }
    class ht {
        constructor() {
            this.counters_ = {};
        }
        incrementCounter(e, t = 1) {
            m(this.counters_, e) || (this.counters_[e] = 0),
                (this.counters_[e] += t);
        }
        get() {
            return a(this.counters_);
        }
    }
    const lt = {},
        ct = {};
    function ut(e) {
        const t = e.toString();
        return lt[t] || (lt[t] = new ht()), lt[t];
    }
    class dt {
        constructor(e) {
            (this.onMessage_ = e),
                (this.pendingResponses = []),
                (this.currentResponseNum = 0),
                (this.closeAfterResponse = -1),
                (this.onClose = null);
        }
        closeAfter(e, t) {
            (this.closeAfterResponse = e),
                (this.onClose = t),
                this.closeAfterResponse < this.currentResponseNum &&
                    (this.onClose(), (this.onClose = null));
        }
        handleResponse(e, t) {
            for (
                this.pendingResponses[e] = t;
                this.pendingResponses[this.currentResponseNum];

            ) {
                const e = this.pendingResponses[this.currentResponseNum];
                delete this.pendingResponses[this.currentResponseNum];
                for (let t = 0; t < e.length; ++t)
                    e[t] &&
                        Xe(() => {
                            this.onMessage_(e[t]);
                        });
                if (this.currentResponseNum === this.closeAfterResponse) {
                    this.onClose && (this.onClose(), (this.onClose = null));
                    break;
                }
                this.currentResponseNum++;
            }
        }
    }
    class pt {
        constructor(e, t, n, i, s, r, o) {
            (this.connId = e),
                (this.repoInfo = t),
                (this.applicationId = n),
                (this.appCheckToken = i),
                (this.authToken = s),
                (this.transportSessionId = r),
                (this.lastSessionId = o),
                (this.bytesSent = 0),
                (this.bytesReceived = 0),
                (this.everConnected_ = !1),
                (this.log_ = Me(e)),
                (this.stats_ = ut(t)),
                (this.urlFn = (e) => (
                    this.appCheckToken && (e.ac = this.appCheckToken),
                    at(t, rt, e)
                ));
        }
        open(e, t) {
            (this.curSegmentNum = 0),
                (this.onDisconnect_ = t),
                (this.myPacketOrderer = new dt(e)),
                (this.isClosed_ = !1),
                (this.connectTimeoutTimer_ = setTimeout(() => {
                    this.log_("Timed out trying to connect."),
                        this.onClosed_(),
                        (this.connectTimeoutTimer_ = null);
                }, Math.floor(3e4))),
                (function (e) {
                    if ("complete" === document.readyState) e();
                    else {
                        let t = !1;
                        const n = function () {
                            document.body
                                ? t || ((t = !0), e())
                                : setTimeout(n, Math.floor(10));
                        };
                        document.addEventListener
                            ? (document.addEventListener(
                                  "DOMContentLoaded",
                                  n,
                                  !1
                              ),
                              window.addEventListener("load", n, !1))
                            : document.attachEvent &&
                              (document.attachEvent(
                                  "onreadystatechange",
                                  () => {
                                      "complete" === document.readyState && n();
                                  }
                              ),
                              window.attachEvent("onload", n));
                    }
                })(() => {
                    if (this.isClosed_) return;
                    this.scriptTagHolder = new _t(
                        (...e) => {
                            const [t, n, i, s, r] = e;
                            if (
                                (this.incrementIncomingBytes_(e),
                                this.scriptTagHolder)
                            )
                                if (
                                    (this.connectTimeoutTimer_ &&
                                        (clearTimeout(
                                            this.connectTimeoutTimer_
                                        ),
                                        (this.connectTimeoutTimer_ = null)),
                                    (this.everConnected_ = !0),
                                    "start" === t)
                                )
                                    (this.id = n), (this.password = i);
                                else {
                                    if ("close" !== t)
                                        throw new Error(
                                            "Unrecognized command received: " +
                                                t
                                        );
                                    n
                                        ? ((this.scriptTagHolder.sendNewPolls =
                                              !1),
                                          this.myPacketOrderer.closeAfter(
                                              n,
                                              () => {
                                                  this.onClosed_();
                                              }
                                          ))
                                        : this.onClosed_();
                                }
                        },
                        (...e) => {
                            const [t, n] = e;
                            this.incrementIncomingBytes_(e),
                                this.myPacketOrderer.handleResponse(t, n);
                        },
                        () => {
                            this.onClosed_();
                        },
                        this.urlFn
                    );
                    const e = { start: "t" };
                    (e.ser = Math.floor(1e8 * Math.random())),
                        this.scriptTagHolder.uniqueCallbackIdentifier &&
                            (e.cb =
                                this.scriptTagHolder.uniqueCallbackIdentifier),
                        (e.v = "5"),
                        this.transportSessionId &&
                            (e.s = this.transportSessionId),
                        this.lastSessionId && (e.ls = this.lastSessionId),
                        this.applicationId && (e.p = this.applicationId),
                        this.appCheckToken && (e.ac = this.appCheckToken),
                        "undefined" != typeof location &&
                            location.hostname &&
                            it.test(location.hostname) &&
                            (e.r = "f");
                    const t = this.urlFn(e);
                    this.log_("Connecting via long-poll to " + t),
                        this.scriptTagHolder.addTag(t, () => {});
                });
        }
        start() {
            this.scriptTagHolder.startLongPoll(this.id, this.password),
                this.addDisconnectPingFrame(this.id, this.password);
        }
        static forceAllow() {
            pt.forceAllow_ = !0;
        }
        static forceDisallow() {
            pt.forceDisallow_ = !0;
        }
        static isAvailable() {
            return !(
                !pt.forceAllow_ &&
                (pt.forceDisallow_ ||
                    "undefined" == typeof document ||
                    null == document.createElement ||
                    ("object" == typeof window &&
                        window.chrome &&
                        window.chrome.extension &&
                        !/^chrome/.test(window.location.href)) ||
                    ("object" == typeof Windows &&
                        "object" == typeof Windows.UI))
            );
        }
        markConnectionHealthy() {}
        shutdown_() {
            (this.isClosed_ = !0),
                this.scriptTagHolder &&
                    (this.scriptTagHolder.close(),
                    (this.scriptTagHolder = null)),
                this.myDisconnFrame &&
                    (document.body.removeChild(this.myDisconnFrame),
                    (this.myDisconnFrame = null)),
                this.connectTimeoutTimer_ &&
                    (clearTimeout(this.connectTimeoutTimer_),
                    (this.connectTimeoutTimer_ = null));
        }
        onClosed_() {
            this.isClosed_ ||
                (this.log_("Longpoll is closing itself"),
                this.shutdown_(),
                this.onDisconnect_ &&
                    (this.onDisconnect_(this.everConnected_),
                    (this.onDisconnect_ = null)));
        }
        close() {
            this.isClosed_ ||
                (this.log_("Longpoll is being closed."), this.shutdown_());
        }
        send(e) {
            const t = f(e);
            (this.bytesSent += t.length),
                this.stats_.incrementCounter("bytes_sent", t.length);
            const n = s(t),
                i = Ke(n, 1840);
            for (let e = 0; e < i.length; e++)
                this.scriptTagHolder.enqueueSegment(
                    this.curSegmentNum,
                    i.length,
                    i[e]
                ),
                    this.curSegmentNum++;
        }
        addDisconnectPingFrame(e, t) {
            this.myDisconnFrame = document.createElement("iframe");
            const n = { dframe: "t" };
            (n.id = e),
                (n.pw = t),
                (this.myDisconnFrame.src = this.urlFn(n)),
                (this.myDisconnFrame.style.display = "none"),
                document.body.appendChild(this.myDisconnFrame);
        }
        incrementIncomingBytes_(e) {
            const t = f(e).length;
            (this.bytesReceived += t),
                this.stats_.incrementCounter("bytes_received", t);
        }
    }
    class _t {
        constructor(e, t, n, i) {
            (this.onDisconnect = n),
                (this.urlFn = i),
                (this.outstandingRequests = new Set()),
                (this.pendingSegs = []),
                (this.currentSerial = Math.floor(1e8 * Math.random())),
                (this.sendNewPolls = !0);
            {
                (this.uniqueCallbackIdentifier = Pe()),
                    (window["pLPCommand" + this.uniqueCallbackIdentifier] = e),
                    (window["pRTLPCB" + this.uniqueCallbackIdentifier] = t),
                    (this.myIFrame = _t.createIFrame_());
                let n = "";
                this.myIFrame.src &&
                    "javascript:" ===
                        this.myIFrame.src.substr(0, "javascript:".length) &&
                    (n =
                        '<script>document.domain="' +
                        document.domain +
                        '";</script>');
                const i = "<html><body>" + n + "</body></html>";
                try {
                    this.myIFrame.doc.open(),
                        this.myIFrame.doc.write(i),
                        this.myIFrame.doc.close();
                } catch (e) {
                    Le("frame writing exception"),
                        e.stack && Le(e.stack),
                        Le(e);
                }
            }
        }
        static createIFrame_() {
            const e = document.createElement("iframe");
            if (((e.style.display = "none"), !document.body))
                throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
            document.body.appendChild(e);
            try {
                e.contentWindow.document || Le("No IE domain setting required");
            } catch (t) {
                const n = document.domain;
                e.src =
                    "javascript:void((function(){document.open();document.domain='" +
                    n +
                    "';document.close();})())";
            }
            return (
                e.contentDocument
                    ? (e.doc = e.contentDocument)
                    : e.contentWindow
                    ? (e.doc = e.contentWindow.document)
                    : e.document && (e.doc = e.document),
                e
            );
        }
        close() {
            (this.alive = !1),
                this.myIFrame &&
                    ((this.myIFrame.doc.body.innerHTML = ""),
                    setTimeout(() => {
                        null !== this.myIFrame &&
                            (document.body.removeChild(this.myIFrame),
                            (this.myIFrame = null));
                    }, Math.floor(0)));
            const e = this.onDisconnect;
            e && ((this.onDisconnect = null), e());
        }
        startLongPoll(e, t) {
            for (
                this.myID = e, this.myPW = t, this.alive = !0;
                this.newRequest_();

            );
        }
        newRequest_() {
            if (
                this.alive &&
                this.sendNewPolls &&
                this.outstandingRequests.size <
                    (this.pendingSegs.length > 0 ? 2 : 1)
            ) {
                this.currentSerial++;
                const e = {};
                (e.id = this.myID),
                    (e.pw = this.myPW),
                    (e.ser = this.currentSerial);
                let t = this.urlFn(e),
                    n = "",
                    i = 0;
                for (
                    ;
                    this.pendingSegs.length > 0 &&
                    this.pendingSegs[0].d.length + 30 + n.length <= 1870;

                ) {
                    const e = this.pendingSegs.shift();
                    (n =
                        n +
                        "&seg" +
                        i +
                        "=" +
                        e.seg +
                        "&ts" +
                        i +
                        "=" +
                        e.ts +
                        "&d" +
                        i +
                        "=" +
                        e.d),
                        i++;
                }
                return (
                    (t += n), this.addLongPollTag_(t, this.currentSerial), !0
                );
            }
            return !1;
        }
        enqueueSegment(e, t, n) {
            this.pendingSegs.push({ seg: e, ts: t, d: n }),
                this.alive && this.newRequest_();
        }
        addLongPollTag_(e, t) {
            this.outstandingRequests.add(t);
            const n = () => {
                    this.outstandingRequests.delete(t), this.newRequest_();
                },
                i = setTimeout(n, Math.floor(25e3));
            this.addTag(e, () => {
                clearTimeout(i), n();
            });
        }
        addTag(e, t) {
            setTimeout(() => {
                try {
                    if (!this.sendNewPolls) return;
                    const n = this.myIFrame.doc.createElement("script");
                    (n.type = "text/javascript"),
                        (n.async = !0),
                        (n.src = e),
                        (n.onload = n.onreadystatechange =
                            function () {
                                const e = n.readyState;
                                (e && "loaded" !== e && "complete" !== e) ||
                                    ((n.onload = n.onreadystatechange = null),
                                    n.parentNode && n.parentNode.removeChild(n),
                                    t());
                            }),
                        (n.onerror = () => {
                            Le("Long-poll script failed to load: " + e),
                                (this.sendNewPolls = !1),
                                this.close();
                        }),
                        this.myIFrame.doc.body.appendChild(n);
                } catch (e) {}
            }, Math.floor(1));
        }
    }
    let ft = null;
    "undefined" != typeof MozWebSocket
        ? (ft = MozWebSocket)
        : "undefined" != typeof WebSocket && (ft = WebSocket);
    class gt {
        constructor(e, t, n, i, s, r, o) {
            (this.connId = e),
                (this.applicationId = n),
                (this.appCheckToken = i),
                (this.authToken = s),
                (this.keepaliveTimer = null),
                (this.frames = null),
                (this.totalFrames = 0),
                (this.bytesSent = 0),
                (this.bytesReceived = 0),
                (this.log_ = Me(this.connId)),
                (this.stats_ = ut(t)),
                (this.connURL = gt.connectionURL_(t, r, o, i, n)),
                (this.nodeAdmin = t.nodeAdmin);
        }
        static connectionURL_(e, t, n, i, s) {
            const r = { v: "5" };
            return (
                "undefined" != typeof location &&
                    location.hostname &&
                    it.test(location.hostname) &&
                    (r.r = "f"),
                t && (r.s = t),
                n && (r.ls = n),
                i && (r.ac = i),
                s && (r.p = s),
                at(e, st, r)
            );
        }
        open(e, t) {
            (this.onDisconnect = t),
                (this.onMessage = e),
                this.log_("Websocket connecting to " + this.connURL),
                (this.everConnected_ = !1),
                ke.set("previous_websocket_failure", !0);
            try {
                let e;
                0, (this.mySock = new ft(this.connURL, [], e));
            } catch (e) {
                this.log_("Error instantiating WebSocket.");
                const t = e.message || e.data;
                return t && this.log_(t), void this.onClosed_();
            }
            (this.mySock.onopen = () => {
                this.log_("Websocket connected."), (this.everConnected_ = !0);
            }),
                (this.mySock.onclose = () => {
                    this.log_("Websocket connection was disconnected."),
                        (this.mySock = null),
                        this.onClosed_();
                }),
                (this.mySock.onmessage = (e) => {
                    this.handleIncomingFrame(e);
                }),
                (this.mySock.onerror = (e) => {
                    this.log_("WebSocket error.  Closing connection.");
                    const t = e.message || e.data;
                    t && this.log_(t), this.onClosed_();
                });
        }
        start() {}
        static forceDisallow() {
            gt.forceDisallow_ = !0;
        }
        static isAvailable() {
            let e = !1;
            if ("undefined" != typeof navigator && navigator.userAgent) {
                const t = /Android ([0-9]{0,}\.[0-9]{0,})/,
                    n = navigator.userAgent.match(t);
                n && n.length > 1 && parseFloat(n[1]) < 4.4 && (e = !0);
            }
            return !e && null !== ft && !gt.forceDisallow_;
        }
        static previouslyFailed() {
            return (
                ke.isInMemoryStorage ||
                !0 === ke.get("previous_websocket_failure")
            );
        }
        markConnectionHealthy() {
            ke.remove("previous_websocket_failure");
        }
        appendFrame_(e) {
            if (
                (this.frames.push(e), this.frames.length === this.totalFrames)
            ) {
                const e = this.frames.join("");
                this.frames = null;
                const t = _(e);
                this.onMessage(t);
            }
        }
        handleNewFrameCount_(e) {
            (this.totalFrames = e), (this.frames = []);
        }
        extractFrameCount_(t) {
            if (
                (e(null === this.frames, "We already have a frame buffer"),
                t.length <= 6)
            ) {
                const e = Number(t);
                if (!isNaN(e)) return this.handleNewFrameCount_(e), null;
            }
            return this.handleNewFrameCount_(1), t;
        }
        handleIncomingFrame(e) {
            if (null === this.mySock) return;
            const t = e.data;
            if (
                ((this.bytesReceived += t.length),
                this.stats_.incrementCounter("bytes_received", t.length),
                this.resetKeepAlive(),
                null !== this.frames)
            )
                this.appendFrame_(t);
            else {
                const e = this.extractFrameCount_(t);
                null !== e && this.appendFrame_(e);
            }
        }
        send(e) {
            this.resetKeepAlive();
            const t = f(e);
            (this.bytesSent += t.length),
                this.stats_.incrementCounter("bytes_sent", t.length);
            const n = Ke(t, 16384);
            n.length > 1 && this.sendString_(String(n.length));
            for (let e = 0; e < n.length; e++) this.sendString_(n[e]);
        }
        shutdown_() {
            (this.isClosed_ = !0),
                this.keepaliveTimer &&
                    (clearInterval(this.keepaliveTimer),
                    (this.keepaliveTimer = null)),
                this.mySock && (this.mySock.close(), (this.mySock = null));
        }
        onClosed_() {
            this.isClosed_ ||
                (this.log_("WebSocket is closing itself"),
                this.shutdown_(),
                this.onDisconnect &&
                    (this.onDisconnect(this.everConnected_),
                    (this.onDisconnect = null)));
        }
        close() {
            this.isClosed_ ||
                (this.log_("WebSocket is being closed"), this.shutdown_());
        }
        resetKeepAlive() {
            clearInterval(this.keepaliveTimer),
                (this.keepaliveTimer = setInterval(() => {
                    this.mySock && this.sendString_("0"), this.resetKeepAlive();
                }, Math.floor(45e3)));
        }
        sendString_(e) {
            try {
                this.mySock.send(e);
            } catch (e) {
                this.log_(
                    "Exception thrown from WebSocket.send():",
                    e.message || e.data,
                    "Closing connection."
                ),
                    setTimeout(this.onClosed_.bind(this), 0);
            }
        }
    }
    (gt.responsesRequiredToBeHealthy = 2), (gt.healthyTimeout = 3e4);
    class mt {
        constructor(e) {
            this.initTransports_(e);
        }
        static get ALL_TRANSPORTS() {
            return [pt, gt];
        }
        static get IS_TRANSPORT_INITIALIZED() {
            return this.globalTransportInitialized_;
        }
        initTransports_(e) {
            const t = gt && gt.isAvailable();
            let n = t && !gt.previouslyFailed();
            if (
                (e.webSocketOnly &&
                    (t ||
                        We(
                            "wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
                        ),
                    (n = !0)),
                n)
            )
                this.transports_ = [gt];
            else {
                const e = (this.transports_ = []);
                for (const t of mt.ALL_TRANSPORTS)
                    t && t.isAvailable() && e.push(t);
                mt.globalTransportInitialized_ = !0;
            }
        }
        initialTransport() {
            if (this.transports_.length > 0) return this.transports_[0];
            throw new Error("No transports available");
        }
        upgradeTransport() {
            return this.transports_.length > 1 ? this.transports_[1] : null;
        }
    }
    mt.globalTransportInitialized_ = !1;
    class yt {
        constructor(e, t, n, i, s, r, o, a, h, l) {
            (this.id = e),
                (this.repoInfo_ = t),
                (this.applicationId_ = n),
                (this.appCheckToken_ = i),
                (this.authToken_ = s),
                (this.onMessage_ = r),
                (this.onReady_ = o),
                (this.onDisconnect_ = a),
                (this.onKill_ = h),
                (this.lastSessionId = l),
                (this.connectionCount = 0),
                (this.pendingDataMessages = []),
                (this.state_ = 0),
                (this.log_ = Me("c:" + this.id + ":")),
                (this.transportManager_ = new mt(t)),
                this.log_("Connection created"),
                this.start_();
        }
        start_() {
            const e = this.transportManager_.initialTransport();
            (this.conn_ = new e(
                this.nextTransportId_(),
                this.repoInfo_,
                this.applicationId_,
                this.appCheckToken_,
                this.authToken_,
                null,
                this.lastSessionId
            )),
                (this.primaryResponsesRequired_ =
                    e.responsesRequiredToBeHealthy || 0);
            const t = this.connReceiver_(this.conn_),
                n = this.disconnReceiver_(this.conn_);
            (this.tx_ = this.conn_),
                (this.rx_ = this.conn_),
                (this.secondaryConn_ = null),
                (this.isHealthy_ = !1),
                setTimeout(() => {
                    this.conn_ && this.conn_.open(t, n);
                }, Math.floor(0));
            const i = e.healthyTimeout || 0;
            i > 0 &&
                (this.healthyTimeout_ = Ze(() => {
                    (this.healthyTimeout_ = null),
                        this.isHealthy_ ||
                            (this.conn_ && this.conn_.bytesReceived > 102400
                                ? (this.log_(
                                      "Connection exceeded healthy timeout but has received " +
                                          this.conn_.bytesReceived +
                                          " bytes.  Marking connection healthy."
                                  ),
                                  (this.isHealthy_ = !0),
                                  this.conn_.markConnectionHealthy())
                                : this.conn_ && this.conn_.bytesSent > 10240
                                ? this.log_(
                                      "Connection exceeded healthy timeout but has sent " +
                                          this.conn_.bytesSent +
                                          " bytes.  Leaving connection alive."
                                  )
                                : (this.log_(
                                      "Closing unhealthy connection after timeout."
                                  ),
                                  this.close()));
                }, Math.floor(i)));
        }
        nextTransportId_() {
            return "c:" + this.id + ":" + this.connectionCount++;
        }
        disconnReceiver_(e) {
            return (t) => {
                e === this.conn_
                    ? this.onConnectionLost_(t)
                    : e === this.secondaryConn_
                    ? (this.log_("Secondary connection lost."),
                      this.onSecondaryConnectionLost_())
                    : this.log_("closing an old connection");
            };
        }
        connReceiver_(e) {
            return (t) => {
                2 !== this.state_ &&
                    (e === this.rx_
                        ? this.onPrimaryMessageReceived_(t)
                        : e === this.secondaryConn_
                        ? this.onSecondaryMessageReceived_(t)
                        : this.log_("message on old connection"));
            };
        }
        sendRequest(e) {
            const t = { t: "d", d: e };
            this.sendData_(t);
        }
        tryCleanupConnection() {
            this.tx_ === this.secondaryConn_ &&
                this.rx_ === this.secondaryConn_ &&
                (this.log_(
                    "cleaning up and promoting a connection: " +
                        this.secondaryConn_.connId
                ),
                (this.conn_ = this.secondaryConn_),
                (this.secondaryConn_ = null));
        }
        onSecondaryControl_(e) {
            if ("t" in e) {
                const t = e.t;
                "a" === t
                    ? this.upgradeIfSecondaryHealthy_()
                    : "r" === t
                    ? (this.log_("Got a reset on secondary, closing it"),
                      this.secondaryConn_.close(),
                      (this.tx_ !== this.secondaryConn_ &&
                          this.rx_ !== this.secondaryConn_) ||
                          this.close())
                    : "o" === t &&
                      (this.log_("got pong on secondary."),
                      this.secondaryResponsesRequired_--,
                      this.upgradeIfSecondaryHealthy_());
            }
        }
        onSecondaryMessageReceived_(e) {
            const t = Ve("t", e),
                n = Ve("d", e);
            if ("c" === t) this.onSecondaryControl_(n);
            else {
                if ("d" !== t) throw new Error("Unknown protocol layer: " + t);
                this.pendingDataMessages.push(n);
            }
        }
        upgradeIfSecondaryHealthy_() {
            this.secondaryResponsesRequired_ <= 0
                ? (this.log_("Secondary connection is healthy."),
                  (this.isHealthy_ = !0),
                  this.secondaryConn_.markConnectionHealthy(),
                  this.proceedWithUpgrade_())
                : (this.log_("sending ping on secondary."),
                  this.secondaryConn_.send({ t: "c", d: { t: "p", d: {} } }));
        }
        proceedWithUpgrade_() {
            this.secondaryConn_.start(),
                this.log_("sending client ack on secondary"),
                this.secondaryConn_.send({ t: "c", d: { t: "a", d: {} } }),
                this.log_("Ending transmission on primary"),
                this.conn_.send({ t: "c", d: { t: "n", d: {} } }),
                (this.tx_ = this.secondaryConn_),
                this.tryCleanupConnection();
        }
        onPrimaryMessageReceived_(e) {
            const t = Ve("t", e),
                n = Ve("d", e);
            "c" === t
                ? this.onControl_(n)
                : "d" === t && this.onDataMessage_(n);
        }
        onDataMessage_(e) {
            this.onPrimaryResponse_(), this.onMessage_(e);
        }
        onPrimaryResponse_() {
            this.isHealthy_ ||
                (this.primaryResponsesRequired_--,
                this.primaryResponsesRequired_ <= 0 &&
                    (this.log_("Primary connection is healthy."),
                    (this.isHealthy_ = !0),
                    this.conn_.markConnectionHealthy()));
        }
        onControl_(e) {
            const t = Ve("t", e);
            if ("d" in e) {
                const n = e.d;
                if ("h" === t) this.onHandshake_(n);
                else if ("n" === t) {
                    this.log_("recvd end transmission on primary"),
                        (this.rx_ = this.secondaryConn_);
                    for (let e = 0; e < this.pendingDataMessages.length; ++e)
                        this.onDataMessage_(this.pendingDataMessages[e]);
                    (this.pendingDataMessages = []),
                        this.tryCleanupConnection();
                } else
                    "s" === t
                        ? this.onConnectionShutdown_(n)
                        : "r" === t
                        ? this.onReset_(n)
                        : "e" === t
                        ? Fe("Server Error: " + n)
                        : "o" === t
                        ? (this.log_("got pong on primary."),
                          this.onPrimaryResponse_(),
                          this.sendPingOnPrimaryIfNecessary_())
                        : Fe("Unknown control packet command: " + t);
            }
        }
        onHandshake_(e) {
            const t = e.ts,
                n = e.v,
                i = e.h;
            (this.sessionId = e.s),
                (this.repoInfo_.host = i),
                0 === this.state_ &&
                    (this.conn_.start(),
                    this.onConnectionEstablished_(this.conn_, t),
                    "5" !== n && We("Protocol version mismatch detected"),
                    this.tryStartUpgrade_());
        }
        tryStartUpgrade_() {
            const e = this.transportManager_.upgradeTransport();
            e && this.startUpgrade_(e);
        }
        startUpgrade_(e) {
            (this.secondaryConn_ = new e(
                this.nextTransportId_(),
                this.repoInfo_,
                this.applicationId_,
                this.appCheckToken_,
                this.authToken_,
                this.sessionId
            )),
                (this.secondaryResponsesRequired_ =
                    e.responsesRequiredToBeHealthy || 0);
            const t = this.connReceiver_(this.secondaryConn_),
                n = this.disconnReceiver_(this.secondaryConn_);
            this.secondaryConn_.open(t, n),
                Ze(() => {
                    this.secondaryConn_ &&
                        (this.log_("Timed out trying to upgrade."),
                        this.secondaryConn_.close());
                }, Math.floor(6e4));
        }
        onReset_(e) {
            this.log_("Reset packet received.  New host: " + e),
                (this.repoInfo_.host = e),
                1 === this.state_
                    ? this.close()
                    : (this.closeConnections_(), this.start_());
        }
        onConnectionEstablished_(e, t) {
            this.log_("Realtime connection established."),
                (this.conn_ = e),
                (this.state_ = 1),
                this.onReady_ &&
                    (this.onReady_(t, this.sessionId), (this.onReady_ = null)),
                0 === this.primaryResponsesRequired_
                    ? (this.log_("Primary connection is healthy."),
                      (this.isHealthy_ = !0))
                    : Ze(() => {
                          this.sendPingOnPrimaryIfNecessary_();
                      }, Math.floor(5e3));
        }
        sendPingOnPrimaryIfNecessary_() {
            this.isHealthy_ ||
                1 !== this.state_ ||
                (this.log_("sending ping on primary."),
                this.sendData_({ t: "c", d: { t: "p", d: {} } }));
        }
        onSecondaryConnectionLost_() {
            const e = this.secondaryConn_;
            (this.secondaryConn_ = null),
                (this.tx_ !== e && this.rx_ !== e) || this.close();
        }
        onConnectionLost_(e) {
            (this.conn_ = null),
                e || 0 !== this.state_
                    ? 1 === this.state_ &&
                      this.log_("Realtime connection lost.")
                    : (this.log_("Realtime connection failed."),
                      this.repoInfo_.isCacheableHost() &&
                          (ke.remove("host:" + this.repoInfo_.host),
                          (this.repoInfo_.internalHost = this.repoInfo_.host))),
                this.close();
        }
        onConnectionShutdown_(e) {
            this.log_("Connection shutdown command received. Shutting down..."),
                this.onKill_ && (this.onKill_(e), (this.onKill_ = null)),
                (this.onDisconnect_ = null),
                this.close();
        }
        sendData_(e) {
            if (1 !== this.state_) throw "Connection is not connected";
            this.tx_.send(e);
        }
        close() {
            2 !== this.state_ &&
                (this.log_("Closing realtime connection."),
                (this.state_ = 2),
                this.closeConnections_(),
                this.onDisconnect_ &&
                    (this.onDisconnect_(), (this.onDisconnect_ = null)));
        }
        closeConnections_() {
            this.log_("Shutting down all connections"),
                this.conn_ && (this.conn_.close(), (this.conn_ = null)),
                this.secondaryConn_ &&
                    (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
                this.healthyTimeout_ &&
                    (clearTimeout(this.healthyTimeout_),
                    (this.healthyTimeout_ = null));
        }
    }
    class vt {
        put(e, t, n, i) {}
        merge(e, t, n, i) {}
        refreshAuthToken(e) {}
        refreshAppCheckToken(e) {}
        onDisconnectPut(e, t, n) {}
        onDisconnectMerge(e, t, n) {}
        onDisconnectCancel(e, t) {}
        reportStats(e) {}
    }
    class Ct {
        constructor(t) {
            (this.allowedEvents_ = t),
                (this.listeners_ = {}),
                e(
                    Array.isArray(t) && t.length > 0,
                    "Requires a non-empty array"
                );
        }
        trigger(e, ...t) {
            if (Array.isArray(this.listeners_[e])) {
                const n = [...this.listeners_[e]];
                for (let e = 0; e < n.length; e++)
                    n[e].callback.apply(n[e].context, t);
            }
        }
        on(e, t, n) {
            this.validateEventType_(e),
                (this.listeners_[e] = this.listeners_[e] || []),
                this.listeners_[e].push({ callback: t, context: n });
            const i = this.getInitialEvent(e);
            i && t.apply(n, i);
        }
        off(e, t, n) {
            this.validateEventType_(e);
            const i = this.listeners_[e] || [];
            for (let e = 0; e < i.length; e++)
                if (i[e].callback === t && (!n || n === i[e].context))
                    return void i.splice(e, 1);
        }
        validateEventType_(t) {
            e(
                this.allowedEvents_.find((e) => e === t),
                "Unknown event: " + t
            );
        }
    }
    class wt extends Ct {
        constructor() {
            super(["online"]),
                (this.online_ = !0),
                "undefined" == typeof window ||
                    void 0 === window.addEventListener ||
                    c() ||
                    (window.addEventListener(
                        "online",
                        () => {
                            this.online_ ||
                                ((this.online_ = !0),
                                this.trigger("online", !0));
                        },
                        !1
                    ),
                    window.addEventListener(
                        "offline",
                        () => {
                            this.online_ &&
                                ((this.online_ = !1),
                                this.trigger("online", !1));
                        },
                        !1
                    ));
        }
        static getInstance() {
            return new wt();
        }
        getInitialEvent(t) {
            return (
                e("online" === t, "Unknown event type: " + t), [this.online_]
            );
        }
        currentlyOnline() {
            return this.online_;
        }
    }
    class bt {
        constructor(e, t) {
            if (void 0 === t) {
                this.pieces_ = e.split("/");
                let t = 0;
                for (let e = 0; e < this.pieces_.length; e++)
                    this.pieces_[e].length > 0 &&
                        ((this.pieces_[t] = this.pieces_[e]), t++);
                (this.pieces_.length = t), (this.pieceNum_ = 0);
            } else (this.pieces_ = e), (this.pieceNum_ = t);
        }
        toString() {
            let e = "";
            for (let t = this.pieceNum_; t < this.pieces_.length; t++)
                "" !== this.pieces_[t] && (e += "/" + this.pieces_[t]);
            return e || "/";
        }
    }
    function It() {
        return new bt("");
    }
    function Tt(e) {
        return e.pieceNum_ >= e.pieces_.length ? null : e.pieces_[e.pieceNum_];
    }
    function Et(e) {
        return e.pieces_.length - e.pieceNum_;
    }
    function St(e) {
        let t = e.pieceNum_;
        return t < e.pieces_.length && t++, new bt(e.pieces_, t);
    }
    function kt(e) {
        return e.pieceNum_ < e.pieces_.length
            ? e.pieces_[e.pieces_.length - 1]
            : null;
    }
    function Nt(e, t = 0) {
        return e.pieces_.slice(e.pieceNum_ + t);
    }
    function Rt(e) {
        if (e.pieceNum_ >= e.pieces_.length) return null;
        const t = [];
        for (let n = e.pieceNum_; n < e.pieces_.length - 1; n++)
            t.push(e.pieces_[n]);
        return new bt(t, 0);
    }
    function Pt(e, t) {
        const n = [];
        for (let t = e.pieceNum_; t < e.pieces_.length; t++)
            n.push(e.pieces_[t]);
        if (t instanceof bt)
            for (let e = t.pieceNum_; e < t.pieces_.length; e++)
                n.push(t.pieces_[e]);
        else {
            const e = t.split("/");
            for (let t = 0; t < e.length; t++) e[t].length > 0 && n.push(e[t]);
        }
        return new bt(n, 0);
    }
    function Dt(e) {
        return e.pieceNum_ >= e.pieces_.length;
    }
    function xt(e, t) {
        const n = Tt(e),
            i = Tt(t);
        if (null === n) return t;
        if (n === i) return xt(St(e), St(t));
        throw new Error(
            "INTERNAL ERROR: innerPath (" +
                t +
                ") is not within outerPath (" +
                e +
                ")"
        );
    }
    function At(e, t) {
        if (Et(e) !== Et(t)) return !1;
        for (
            let n = e.pieceNum_, i = t.pieceNum_;
            n <= e.pieces_.length;
            n++, i++
        )
            if (e.pieces_[n] !== t.pieces_[i]) return !1;
        return !0;
    }
    function Ot(e, t) {
        let n = e.pieceNum_,
            i = t.pieceNum_;
        if (Et(e) > Et(t)) return !1;
        for (; n < e.pieces_.length; ) {
            if (e.pieces_[n] !== t.pieces_[i]) return !1;
            ++n, ++i;
        }
        return !0;
    }
    class Lt {
        constructor(e, t) {
            (this.errorPrefix_ = t),
                (this.parts_ = Nt(e, 0)),
                (this.byteLength_ = Math.max(1, this.parts_.length));
            for (let e = 0; e < this.parts_.length; e++)
                this.byteLength_ += E(this.parts_[e]);
            Mt(this);
        }
    }
    function Mt(e) {
        if (e.byteLength_ > 768)
            throw new Error(
                e.errorPrefix_ +
                    "has a key path longer than 768 bytes (" +
                    e.byteLength_ +
                    ")."
            );
        if (e.parts_.length > 32)
            throw new Error(
                e.errorPrefix_ +
                    "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " +
                    Ft(e)
            );
    }
    function Ft(e) {
        return 0 === e.parts_.length
            ? ""
            : "in property '" + e.parts_.join(".") + "'";
    }
    class qt extends Ct {
        constructor() {
            let e, t;
            super(["visible"]),
                "undefined" != typeof document &&
                    void 0 !== document.addEventListener &&
                    (void 0 !== document.hidden
                        ? ((t = "visibilitychange"), (e = "hidden"))
                        : void 0 !== document.mozHidden
                        ? ((t = "mozvisibilitychange"), (e = "mozHidden"))
                        : void 0 !== document.msHidden
                        ? ((t = "msvisibilitychange"), (e = "msHidden"))
                        : void 0 !== document.webkitHidden &&
                          ((t = "webkitvisibilitychange"),
                          (e = "webkitHidden"))),
                (this.visible_ = !0),
                t &&
                    document.addEventListener(
                        t,
                        () => {
                            const t = !document[e];
                            t !== this.visible_ &&
                                ((this.visible_ = t),
                                this.trigger("visible", t));
                        },
                        !1
                    );
        }
        static getInstance() {
            return new qt();
        }
        getInitialEvent(t) {
            return (
                e("visible" === t, "Unknown event type: " + t), [this.visible_]
            );
        }
    }
    const Wt = 1e3;
    class Ut extends vt {
        constructor(e, t, n, i, s, r, o, a) {
            if (
                (super(),
                (this.repoInfo_ = e),
                (this.applicationId_ = t),
                (this.onDataUpdate_ = n),
                (this.onConnectStatus_ = i),
                (this.onServerInfoUpdate_ = s),
                (this.authTokenProvider_ = r),
                (this.appCheckTokenProvider_ = o),
                (this.authOverride_ = a),
                (this.id = Ut.nextPersistentConnectionId_++),
                (this.log_ = Me("p:" + this.id + ":")),
                (this.interruptReasons_ = {}),
                (this.listens = new Map()),
                (this.outstandingPuts_ = []),
                (this.outstandingGets_ = []),
                (this.outstandingPutCount_ = 0),
                (this.outstandingGetCount_ = 0),
                (this.onDisconnectRequestQueue_ = []),
                (this.connected_ = !1),
                (this.reconnectDelay_ = Wt),
                (this.maxReconnectDelay_ = 3e5),
                (this.securityDebugCallback_ = null),
                (this.lastSessionId = null),
                (this.establishConnectionTimer_ = null),
                (this.visible_ = !1),
                (this.requestCBHash_ = {}),
                (this.requestNumber_ = 0),
                (this.realtime_ = null),
                (this.authToken_ = null),
                (this.appCheckToken_ = null),
                (this.forceTokenRefresh_ = !1),
                (this.invalidAuthTokenCount_ = 0),
                (this.invalidAppCheckTokenCount_ = 0),
                (this.firstConnection_ = !0),
                (this.lastConnectionAttemptTime_ = null),
                (this.lastConnectionEstablishedTime_ = null),
                a)
            )
                throw new Error(
                    "Auth override specified in options, but not supported on non Node.js platforms"
                );
            qt.getInstance().on("visible", this.onVisible_, this),
                -1 === e.host.indexOf("fblocal") &&
                    wt.getInstance().on("online", this.onOnline_, this);
        }
        sendRequest(t, n, i) {
            const s = ++this.requestNumber_,
                r = { r: s, a: t, b: n };
            this.log_(f(r)),
                e(
                    this.connected_,
                    "sendRequest call when we're not connected not allowed."
                ),
                this.realtime_.sendRequest(r),
                i && (this.requestCBHash_[s] = i);
        }
        get(e) {
            this.initConnection_();
            const t = new l(),
                n = {
                    action: "g",
                    request: { p: e._path.toString(), q: e._queryObject },
                    onComplete: (e) => {
                        const n = e.d;
                        "ok" === e.s ? t.resolve(n) : t.reject(n);
                    },
                };
            this.outstandingGets_.push(n), this.outstandingGetCount_++;
            const i = this.outstandingGets_.length - 1;
            return this.connected_ && this.sendGet_(i), t.promise;
        }
        listen(t, n, i, s) {
            this.initConnection_();
            const r = t._queryIdentifier,
                o = t._path.toString();
            this.log_("Listen called for " + o + " " + r),
                this.listens.has(o) || this.listens.set(o, new Map()),
                e(
                    t._queryParams.isDefault() ||
                        !t._queryParams.loadsAllData(),
                    "listen() called for non-default but complete query"
                ),
                e(
                    !this.listens.get(o).has(r),
                    "listen() called twice for same path/queryId."
                );
            const a = { onComplete: s, hashFn: n, query: t, tag: i };
            this.listens.get(o).set(r, a),
                this.connected_ && this.sendListen_(a);
        }
        sendGet_(e) {
            const t = this.outstandingGets_[e];
            this.sendRequest("g", t.request, (n) => {
                delete this.outstandingGets_[e],
                    this.outstandingGetCount_--,
                    0 === this.outstandingGetCount_ &&
                        (this.outstandingGets_ = []),
                    t.onComplete && t.onComplete(n);
            });
        }
        sendListen_(e) {
            const t = e.query,
                n = t._path.toString(),
                i = t._queryIdentifier;
            this.log_("Listen on " + n + " for " + i);
            const s = { p: n };
            e.tag && ((s.q = t._queryObject), (s.t = e.tag)),
                (s.h = e.hashFn()),
                this.sendRequest("q", s, (s) => {
                    const r = s.d,
                        o = s.s;
                    Ut.warnOnListenWarnings_(r, t),
                        (this.listens.get(n) && this.listens.get(n).get(i)) ===
                            e &&
                            (this.log_("listen response", s),
                            "ok" !== o && this.removeListen_(n, i),
                            e.onComplete && e.onComplete(o, r));
                });
        }
        static warnOnListenWarnings_(e, t) {
            if (e && "object" == typeof e && m(e, "w")) {
                const n = y(e, "w");
                if (Array.isArray(n) && ~n.indexOf("no_index")) {
                    const e =
                            '".indexOn": "' +
                            t._queryParams.getIndex().toString() +
                            '"',
                        n = t._path.toString();
                    We(
                        `Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`
                    );
                }
            }
        }
        refreshAuthToken(e) {
            (this.authToken_ = e),
                this.log_("Auth token refreshed"),
                this.authToken_
                    ? this.tryAuth()
                    : this.connected_ &&
                      this.sendRequest("unauth", {}, () => {}),
                this.reduceReconnectDelayIfAdminCredential_(e);
        }
        reduceReconnectDelayIfAdminCredential_(e) {
            ((e && 40 === e.length) ||
                (function (e) {
                    const t = g(e).claims;
                    return "object" == typeof t && !0 === t.admin;
                })(e)) &&
                (this.log_(
                    "Admin auth credential detected.  Reducing max reconnect time."
                ),
                (this.maxReconnectDelay_ = 3e4));
        }
        refreshAppCheckToken(e) {
            (this.appCheckToken_ = e),
                this.log_("App check token refreshed"),
                this.appCheckToken_
                    ? this.tryAppCheck()
                    : this.connected_ &&
                      this.sendRequest("unappeck", {}, () => {});
        }
        tryAuth() {
            if (this.connected_ && this.authToken_) {
                const e = this.authToken_,
                    t = (function (e) {
                        const t = g(e).claims;
                        return (
                            !!t &&
                            "object" == typeof t &&
                            t.hasOwnProperty("iat")
                        );
                    })(e)
                        ? "auth"
                        : "gauth",
                    n = { cred: e };
                null === this.authOverride_
                    ? (n.noauth = !0)
                    : "object" == typeof this.authOverride_ &&
                      (n.authvar = this.authOverride_),
                    this.sendRequest(t, n, (t) => {
                        const n = t.s,
                            i = t.d || "error";
                        this.authToken_ === e &&
                            ("ok" === n
                                ? (this.invalidAuthTokenCount_ = 0)
                                : this.onAuthRevoked_(n, i));
                    });
            }
        }
        tryAppCheck() {
            this.connected_ &&
                this.appCheckToken_ &&
                this.sendRequest(
                    "appcheck",
                    { token: this.appCheckToken_ },
                    (e) => {
                        const t = e.s,
                            n = e.d || "error";
                        "ok" === t
                            ? (this.invalidAppCheckTokenCount_ = 0)
                            : this.onAppCheckRevoked_(t, n);
                    }
                );
        }
        unlisten(t, n) {
            const i = t._path.toString(),
                s = t._queryIdentifier;
            this.log_("Unlisten called for " + i + " " + s),
                e(
                    t._queryParams.isDefault() ||
                        !t._queryParams.loadsAllData(),
                    "unlisten() called for non-default but complete query"
                ),
                this.removeListen_(i, s) &&
                    this.connected_ &&
                    this.sendUnlisten_(i, s, t._queryObject, n);
        }
        sendUnlisten_(e, t, n, i) {
            this.log_("Unlisten on " + e + " for " + t);
            const s = { p: e };
            i && ((s.q = n), (s.t = i)), this.sendRequest("n", s);
        }
        onDisconnectPut(e, t, n) {
            this.initConnection_(),
                this.connected_
                    ? this.sendOnDisconnect_("o", e, t, n)
                    : this.onDisconnectRequestQueue_.push({
                          pathString: e,
                          action: "o",
                          data: t,
                          onComplete: n,
                      });
        }
        onDisconnectMerge(e, t, n) {
            this.initConnection_(),
                this.connected_
                    ? this.sendOnDisconnect_("om", e, t, n)
                    : this.onDisconnectRequestQueue_.push({
                          pathString: e,
                          action: "om",
                          data: t,
                          onComplete: n,
                      });
        }
        onDisconnectCancel(e, t) {
            this.initConnection_(),
                this.connected_
                    ? this.sendOnDisconnect_("oc", e, null, t)
                    : this.onDisconnectRequestQueue_.push({
                          pathString: e,
                          action: "oc",
                          data: null,
                          onComplete: t,
                      });
        }
        sendOnDisconnect_(e, t, n, i) {
            const s = { p: t, d: n };
            this.log_("onDisconnect " + e, s),
                this.sendRequest(e, s, (e) => {
                    i &&
                        setTimeout(() => {
                            i(e.s, e.d);
                        }, Math.floor(0));
                });
        }
        put(e, t, n, i) {
            this.putInternal("p", e, t, n, i);
        }
        merge(e, t, n, i) {
            this.putInternal("m", e, t, n, i);
        }
        putInternal(e, t, n, i, s) {
            this.initConnection_();
            const r = { p: t, d: n };
            void 0 !== s && (r.h = s),
                this.outstandingPuts_.push({
                    action: e,
                    request: r,
                    onComplete: i,
                }),
                this.outstandingPutCount_++;
            const o = this.outstandingPuts_.length - 1;
            this.connected_
                ? this.sendPut_(o)
                : this.log_("Buffering put: " + t);
        }
        sendPut_(e) {
            const t = this.outstandingPuts_[e].action,
                n = this.outstandingPuts_[e].request,
                i = this.outstandingPuts_[e].onComplete;
            (this.outstandingPuts_[e].queued = this.connected_),
                this.sendRequest(t, n, (n) => {
                    this.log_(t + " response", n),
                        delete this.outstandingPuts_[e],
                        this.outstandingPutCount_--,
                        0 === this.outstandingPutCount_ &&
                            (this.outstandingPuts_ = []),
                        i && i(n.s, n.d);
                });
        }
        reportStats(e) {
            if (this.connected_) {
                const t = { c: e };
                this.log_("reportStats", t),
                    this.sendRequest("s", t, (e) => {
                        if ("ok" !== e.s) {
                            const t = e.d;
                            this.log_(
                                "reportStats",
                                "Error sending stats: " + t
                            );
                        }
                    });
            }
        }
        onDataMessage_(e) {
            if ("r" in e) {
                this.log_("from server: " + f(e));
                const t = e.r,
                    n = this.requestCBHash_[t];
                n && (delete this.requestCBHash_[t], n(e.b));
            } else {
                if ("error" in e)
                    throw "A server-side error has occurred: " + e.error;
                "a" in e && this.onDataPush_(e.a, e.b);
            }
        }
        onDataPush_(e, t) {
            this.log_("handleServerMessage", e, t),
                "d" === e
                    ? this.onDataUpdate_(t.p, t.d, !1, t.t)
                    : "m" === e
                    ? this.onDataUpdate_(t.p, t.d, !0, t.t)
                    : "c" === e
                    ? this.onListenRevoked_(t.p, t.q)
                    : "ac" === e
                    ? this.onAuthRevoked_(t.s, t.d)
                    : "apc" === e
                    ? this.onAppCheckRevoked_(t.s, t.d)
                    : "sd" === e
                    ? this.onSecurityDebugPacket_(t)
                    : Fe(
                          "Unrecognized action received from server: " +
                              f(e) +
                              "\nAre you using the latest client?"
                      );
        }
        onReady_(e, t) {
            this.log_("connection ready"),
                (this.connected_ = !0),
                (this.lastConnectionEstablishedTime_ = new Date().getTime()),
                this.handleTimestamp_(e),
                (this.lastSessionId = t),
                this.firstConnection_ && this.sendConnectStats_(),
                this.restoreState_(),
                (this.firstConnection_ = !1),
                this.onConnectStatus_(!0);
        }
        scheduleConnect_(t) {
            e(
                !this.realtime_,
                "Scheduling a connect when we're already connected/ing?"
            ),
                this.establishConnectionTimer_ &&
                    clearTimeout(this.establishConnectionTimer_),
                (this.establishConnectionTimer_ = setTimeout(() => {
                    (this.establishConnectionTimer_ = null),
                        this.establishConnection_();
                }, Math.floor(t)));
        }
        initConnection_() {
            !this.realtime_ &&
                this.firstConnection_ &&
                this.scheduleConnect_(0);
        }
        onVisible_(e) {
            e &&
                !this.visible_ &&
                this.reconnectDelay_ === this.maxReconnectDelay_ &&
                (this.log_("Window became visible.  Reducing delay."),
                (this.reconnectDelay_ = Wt),
                this.realtime_ || this.scheduleConnect_(0)),
                (this.visible_ = e);
        }
        onOnline_(e) {
            e
                ? (this.log_("Browser went online."),
                  (this.reconnectDelay_ = Wt),
                  this.realtime_ || this.scheduleConnect_(0))
                : (this.log_("Browser went offline.  Killing connection."),
                  this.realtime_ && this.realtime_.close());
        }
        onRealtimeDisconnect_() {
            if (
                (this.log_("data client disconnected"),
                (this.connected_ = !1),
                (this.realtime_ = null),
                this.cancelSentTransactions_(),
                (this.requestCBHash_ = {}),
                this.shouldReconnect_())
            ) {
                this.visible_
                    ? this.lastConnectionEstablishedTime_ &&
                      (new Date().getTime() -
                          this.lastConnectionEstablishedTime_ >
                          3e4 && (this.reconnectDelay_ = Wt),
                      (this.lastConnectionEstablishedTime_ = null))
                    : (this.log_("Window isn't visible.  Delaying reconnect."),
                      (this.reconnectDelay_ = this.maxReconnectDelay_),
                      (this.lastConnectionAttemptTime_ = new Date().getTime()));
                const e =
                    new Date().getTime() - this.lastConnectionAttemptTime_;
                let t = Math.max(0, this.reconnectDelay_ - e);
                (t = Math.random() * t),
                    this.log_("Trying to reconnect in " + t + "ms"),
                    this.scheduleConnect_(t),
                    (this.reconnectDelay_ = Math.min(
                        this.maxReconnectDelay_,
                        1.3 * this.reconnectDelay_
                    ));
            }
            this.onConnectStatus_(!1);
        }
        async establishConnection_() {
            if (this.shouldReconnect_()) {
                this.log_("Making a connection attempt"),
                    (this.lastConnectionAttemptTime_ = new Date().getTime()),
                    (this.lastConnectionEstablishedTime_ = null);
                const t = this.onDataMessage_.bind(this),
                    n = this.onReady_.bind(this),
                    i = this.onRealtimeDisconnect_.bind(this),
                    s = this.id + ":" + Ut.nextConnectionId_++,
                    r = this.lastSessionId;
                let o = !1,
                    a = null;
                const h = function () {
                        a ? a.close() : ((o = !0), i());
                    },
                    l = function (t) {
                        e(
                            a,
                            "sendRequest call when we're not connected not allowed."
                        ),
                            a.sendRequest(t);
                    };
                this.realtime_ = { close: h, sendRequest: l };
                const c = this.forceTokenRefresh_;
                this.forceTokenRefresh_ = !1;
                try {
                    const [e, h] = await Promise.all([
                        this.authTokenProvider_.getToken(c),
                        this.appCheckTokenProvider_.getToken(c),
                    ]);
                    o
                        ? Le("getToken() completed but was canceled")
                        : (Le("getToken() completed. Creating connection."),
                          (this.authToken_ = e && e.accessToken),
                          (this.appCheckToken_ = h && h.token),
                          (a = new yt(
                              s,
                              this.repoInfo_,
                              this.applicationId_,
                              this.appCheckToken_,
                              this.authToken_,
                              t,
                              n,
                              i,
                              (e) => {
                                  We(
                                      e + " (" + this.repoInfo_.toString() + ")"
                                  ),
                                      this.interrupt("server_kill");
                              },
                              r
                          )));
                } catch (e) {
                    this.log_("Failed to get token: " + e),
                        o || (this.repoInfo_.nodeAdmin && We(e), h());
                }
            }
        }
        interrupt(e) {
            Le("Interrupting connection for reason: " + e),
                (this.interruptReasons_[e] = !0),
                this.realtime_
                    ? this.realtime_.close()
                    : (this.establishConnectionTimer_ &&
                          (clearTimeout(this.establishConnectionTimer_),
                          (this.establishConnectionTimer_ = null)),
                      this.connected_ && this.onRealtimeDisconnect_());
        }
        resume(e) {
            Le("Resuming connection for reason: " + e),
                delete this.interruptReasons_[e],
                v(this.interruptReasons_) &&
                    ((this.reconnectDelay_ = Wt),
                    this.realtime_ || this.scheduleConnect_(0));
        }
        handleTimestamp_(e) {
            const t = e - new Date().getTime();
            this.onServerInfoUpdate_({ serverTimeOffset: t });
        }
        cancelSentTransactions_() {
            for (let e = 0; e < this.outstandingPuts_.length; e++) {
                const t = this.outstandingPuts_[e];
                t &&
                    "h" in t.request &&
                    t.queued &&
                    (t.onComplete && t.onComplete("disconnect"),
                    delete this.outstandingPuts_[e],
                    this.outstandingPutCount_--);
            }
            0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []);
        }
        onListenRevoked_(e, t) {
            let n;
            n = t ? t.map((e) => $e(e)).join("$") : "default";
            const i = this.removeListen_(e, n);
            i && i.onComplete && i.onComplete("permission_denied");
        }
        removeListen_(e, t) {
            const n = new bt(e).toString();
            let i;
            if (this.listens.has(n)) {
                const e = this.listens.get(n);
                (i = e.get(t)),
                    e.delete(t),
                    0 === e.size && this.listens.delete(n);
            } else i = void 0;
            return i;
        }
        onAuthRevoked_(e, t) {
            Le("Auth token revoked: " + e + "/" + t),
                (this.authToken_ = null),
                (this.forceTokenRefresh_ = !0),
                this.realtime_.close(),
                ("invalid_token" !== e && "permission_denied" !== e) ||
                    (this.invalidAuthTokenCount_++,
                    this.invalidAuthTokenCount_ >= 3 &&
                        ((this.reconnectDelay_ = 3e4),
                        this.authTokenProvider_.notifyForInvalidToken()));
        }
        onAppCheckRevoked_(e, t) {
            Le("App check token revoked: " + e + "/" + t),
                (this.appCheckToken_ = null),
                (this.forceTokenRefresh_ = !0),
                ("invalid_token" !== e && "permission_denied" !== e) ||
                    (this.invalidAppCheckTokenCount_++,
                    this.invalidAppCheckTokenCount_ >= 3 &&
                        this.appCheckTokenProvider_.notifyForInvalidToken());
        }
        onSecurityDebugPacket_(e) {
            this.securityDebugCallback_
                ? this.securityDebugCallback_(e)
                : "msg" in e &&
                  console.log(
                      "FIREBASE: " + e.msg.replace("\n", "\nFIREBASE: ")
                  );
        }
        restoreState_() {
            this.tryAuth(), this.tryAppCheck();
            for (const e of this.listens.values())
                for (const t of e.values()) this.sendListen_(t);
            for (let e = 0; e < this.outstandingPuts_.length; e++)
                this.outstandingPuts_[e] && this.sendPut_(e);
            for (; this.onDisconnectRequestQueue_.length; ) {
                const e = this.onDisconnectRequestQueue_.shift();
                this.sendOnDisconnect_(
                    e.action,
                    e.pathString,
                    e.data,
                    e.onComplete
                );
            }
            for (let e = 0; e < this.outstandingGets_.length; e++)
                this.outstandingGets_[e] && this.sendGet_(e);
        }
        sendConnectStats_() {
            const e = {};
            let t = "js";
            (e["sdk." + t + "." + Ie.replace(/\./g, "-")] = 1),
                c()
                    ? (e["framework.cordova"] = 1)
                    : "object" == typeof navigator &&
                      "ReactNative" === navigator.product &&
                      (e["framework.reactnative"] = 1),
                this.reportStats(e);
        }
        shouldReconnect_() {
            const e = wt.getInstance().currentlyOnline();
            return v(this.interruptReasons_) && e;
        }
    }
    (Ut.nextPersistentConnectionId_ = 0), (Ut.nextConnectionId_ = 0);
    class Bt {
        constructor(e, t) {
            (this.name = e), (this.node = t);
        }
        static Wrap(e, t) {
            return new Bt(e, t);
        }
    }
    class jt {
        getCompare() {
            return this.compare.bind(this);
        }
        indexedValueChanged(e, t) {
            const n = new Bt(Be, e),
                i = new Bt(Be, t);
            return 0 !== this.compare(n, i);
        }
        minPost() {
            return Bt.MIN;
        }
    }
    let Ht;
    class zt extends jt {
        static get __EMPTY_NODE() {
            return Ht;
        }
        static set __EMPTY_NODE(e) {
            Ht = e;
        }
        compare(e, t) {
            return He(e.name, t.name);
        }
        isDefinedOn(e) {
            throw t("KeyIndex.isDefinedOn not expected to be called.");
        }
        indexedValueChanged(e, t) {
            return !1;
        }
        minPost() {
            return Bt.MIN;
        }
        maxPost() {
            return new Bt(je, Ht);
        }
        makePost(t, n) {
            return (
                e(
                    "string" == typeof t,
                    "KeyIndex indexValue must always be a string."
                ),
                new Bt(t, Ht)
            );
        }
        toString() {
            return ".key";
        }
    }
    const Vt = new zt();
    class $t {
        constructor(e, t, n, i, s = null) {
            (this.isReverse_ = i),
                (this.resultGenerator_ = s),
                (this.nodeStack_ = []);
            let r = 1;
            for (; !e.isEmpty(); )
                if (((r = t ? n(e.key, t) : 1), i && (r *= -1), r < 0))
                    e = this.isReverse_ ? e.left : e.right;
                else {
                    if (0 === r) {
                        this.nodeStack_.push(e);
                        break;
                    }
                    this.nodeStack_.push(e),
                        (e = this.isReverse_ ? e.right : e.left);
                }
        }
        getNext() {
            if (0 === this.nodeStack_.length) return null;
            let e,
                t = this.nodeStack_.pop();
            if (
                ((e = this.resultGenerator_
                    ? this.resultGenerator_(t.key, t.value)
                    : { key: t.key, value: t.value }),
                this.isReverse_)
            )
                for (t = t.left; !t.isEmpty(); )
                    this.nodeStack_.push(t), (t = t.right);
            else
                for (t = t.right; !t.isEmpty(); )
                    this.nodeStack_.push(t), (t = t.left);
            return e;
        }
        hasNext() {
            return this.nodeStack_.length > 0;
        }
        peek() {
            if (0 === this.nodeStack_.length) return null;
            const e = this.nodeStack_[this.nodeStack_.length - 1];
            return this.resultGenerator_
                ? this.resultGenerator_(e.key, e.value)
                : { key: e.key, value: e.value };
        }
    }
    class Kt {
        constructor(e, t, n, i, s) {
            (this.key = e),
                (this.value = t),
                (this.color = null != n ? n : Kt.RED),
                (this.left = null != i ? i : Gt.EMPTY_NODE),
                (this.right = null != s ? s : Gt.EMPTY_NODE);
        }
        copy(e, t, n, i, s) {
            return new Kt(
                null != e ? e : this.key,
                null != t ? t : this.value,
                null != n ? n : this.color,
                null != i ? i : this.left,
                null != s ? s : this.right
            );
        }
        count() {
            return this.left.count() + 1 + this.right.count();
        }
        isEmpty() {
            return !1;
        }
        inorderTraversal(e) {
            return (
                this.left.inorderTraversal(e) ||
                !!e(this.key, this.value) ||
                this.right.inorderTraversal(e)
            );
        }
        reverseTraversal(e) {
            return (
                this.right.reverseTraversal(e) ||
                e(this.key, this.value) ||
                this.left.reverseTraversal(e)
            );
        }
        min_() {
            return this.left.isEmpty() ? this : this.left.min_();
        }
        minKey() {
            return this.min_().key;
        }
        maxKey() {
            return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        insert(e, t, n) {
            let i = this;
            const s = n(e, i.key);
            return (
                (i =
                    s < 0
                        ? i.copy(null, null, null, i.left.insert(e, t, n), null)
                        : 0 === s
                        ? i.copy(null, t, null, null, null)
                        : i.copy(
                              null,
                              null,
                              null,
                              null,
                              i.right.insert(e, t, n)
                          )),
                i.fixUp_()
            );
        }
        removeMin_() {
            if (this.left.isEmpty()) return Gt.EMPTY_NODE;
            let e = this;
            return (
                e.left.isRed_() ||
                    e.left.left.isRed_() ||
                    (e = e.moveRedLeft_()),
                (e = e.copy(null, null, null, e.left.removeMin_(), null)),
                e.fixUp_()
            );
        }
        remove(e, t) {
            let n, i;
            if (((n = this), t(e, n.key) < 0))
                n.left.isEmpty() ||
                    n.left.isRed_() ||
                    n.left.left.isRed_() ||
                    (n = n.moveRedLeft_()),
                    (n = n.copy(null, null, null, n.left.remove(e, t), null));
            else {
                if (
                    (n.left.isRed_() && (n = n.rotateRight_()),
                    n.right.isEmpty() ||
                        n.right.isRed_() ||
                        n.right.left.isRed_() ||
                        (n = n.moveRedRight_()),
                    0 === t(e, n.key))
                ) {
                    if (n.right.isEmpty()) return Gt.EMPTY_NODE;
                    (i = n.right.min_()),
                        (n = n.copy(
                            i.key,
                            i.value,
                            null,
                            null,
                            n.right.removeMin_()
                        ));
                }
                n = n.copy(null, null, null, null, n.right.remove(e, t));
            }
            return n.fixUp_();
        }
        isRed_() {
            return this.color;
        }
        fixUp_() {
            let e = this;
            return (
                e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()),
                e.left.isRed_() &&
                    e.left.left.isRed_() &&
                    (e = e.rotateRight_()),
                e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()),
                e
            );
        }
        moveRedLeft_() {
            let e = this.colorFlip_();
            return (
                e.right.left.isRed_() &&
                    ((e = e.copy(
                        null,
                        null,
                        null,
                        null,
                        e.right.rotateRight_()
                    )),
                    (e = e.rotateLeft_()),
                    (e = e.colorFlip_())),
                e
            );
        }
        moveRedRight_() {
            let e = this.colorFlip_();
            return (
                e.left.left.isRed_() &&
                    ((e = e.rotateRight_()), (e = e.colorFlip_())),
                e
            );
        }
        rotateLeft_() {
            const e = this.copy(null, null, Kt.RED, null, this.right.left);
            return this.right.copy(null, null, this.color, e, null);
        }
        rotateRight_() {
            const e = this.copy(null, null, Kt.RED, this.left.right, null);
            return this.left.copy(null, null, this.color, null, e);
        }
        colorFlip_() {
            const e = this.left.copy(null, null, !this.left.color, null, null),
                t = this.right.copy(null, null, !this.right.color, null, null);
            return this.copy(null, null, !this.color, e, t);
        }
        checkMaxDepth_() {
            const e = this.check_();
            return Math.pow(2, e) <= this.count() + 1;
        }
        check_() {
            if (this.isRed_() && this.left.isRed_())
                throw new Error(
                    "Red node has red child(" +
                        this.key +
                        "," +
                        this.value +
                        ")"
                );
            if (this.right.isRed_())
                throw new Error(
                    "Right child of (" +
                        this.key +
                        "," +
                        this.value +
                        ") is red"
                );
            const e = this.left.check_();
            if (e !== this.right.check_())
                throw new Error("Black depths differ");
            return e + (this.isRed_() ? 0 : 1);
        }
    }
    (Kt.RED = !0), (Kt.BLACK = !1);
    class Gt {
        constructor(e, t = Gt.EMPTY_NODE) {
            (this.comparator_ = e), (this.root_ = t);
        }
        insert(e, t) {
            return new Gt(
                this.comparator_,
                this.root_
                    .insert(e, t, this.comparator_)
                    .copy(null, null, Kt.BLACK, null, null)
            );
        }
        remove(e) {
            return new Gt(
                this.comparator_,
                this.root_
                    .remove(e, this.comparator_)
                    .copy(null, null, Kt.BLACK, null, null)
            );
        }
        get(e) {
            let t,
                n = this.root_;
            for (; !n.isEmpty(); ) {
                if (((t = this.comparator_(e, n.key)), 0 === t)) return n.value;
                t < 0 ? (n = n.left) : t > 0 && (n = n.right);
            }
            return null;
        }
        getPredecessorKey(e) {
            let t,
                n = this.root_,
                i = null;
            for (; !n.isEmpty(); ) {
                if (((t = this.comparator_(e, n.key)), 0 === t)) {
                    if (n.left.isEmpty()) return i ? i.key : null;
                    for (n = n.left; !n.right.isEmpty(); ) n = n.right;
                    return n.key;
                }
                t < 0 ? (n = n.left) : t > 0 && ((i = n), (n = n.right));
            }
            throw new Error(
                "Attempted to find predecessor key for a nonexistent key.  What gives?"
            );
        }
        isEmpty() {
            return this.root_.isEmpty();
        }
        count() {
            return this.root_.count();
        }
        minKey() {
            return this.root_.minKey();
        }
        maxKey() {
            return this.root_.maxKey();
        }
        inorderTraversal(e) {
            return this.root_.inorderTraversal(e);
        }
        reverseTraversal(e) {
            return this.root_.reverseTraversal(e);
        }
        getIterator(e) {
            return new $t(this.root_, null, this.comparator_, !1, e);
        }
        getIteratorFrom(e, t) {
            return new $t(this.root_, e, this.comparator_, !1, t);
        }
        getReverseIteratorFrom(e, t) {
            return new $t(this.root_, e, this.comparator_, !0, t);
        }
        getReverseIterator(e) {
            return new $t(this.root_, null, this.comparator_, !0, e);
        }
    }
    function Yt(e, t) {
        return He(e.name, t.name);
    }
    function Qt(e, t) {
        return He(e, t);
    }
    let Jt;
    Gt.EMPTY_NODE = new (class {
        copy(e, t, n, i, s) {
            return this;
        }
        insert(e, t, n) {
            return new Kt(e, t, null);
        }
        remove(e, t) {
            return this;
        }
        count() {
            return 0;
        }
        isEmpty() {
            return !0;
        }
        inorderTraversal(e) {
            return !1;
        }
        reverseTraversal(e) {
            return !1;
        }
        minKey() {
            return null;
        }
        maxKey() {
            return null;
        }
        check_() {
            return 0;
        }
        isRed_() {
            return !1;
        }
    })();
    const Xt = function (e) {
            return "number" == typeof e ? "number:" + Ye(e) : "string:" + e;
        },
        Zt = function (t) {
            if (t.isLeafNode()) {
                const n = t.val();
                e(
                    "string" == typeof n ||
                        "number" == typeof n ||
                        ("object" == typeof n && m(n, ".sv")),
                    "Priority must be a string or number."
                );
            } else e(t === Jt || t.isEmpty(), "priority of unexpected type.");
            e(
                t === Jt || t.getPriority().isEmpty(),
                "Priority nodes can't have a priority of their own."
            );
        };
    let en, tn, nn;
    class sn {
        constructor(t, n = sn.__childrenNodeConstructor.EMPTY_NODE) {
            (this.value_ = t),
                (this.priorityNode_ = n),
                (this.lazyHash_ = null),
                e(
                    void 0 !== this.value_ && null !== this.value_,
                    "LeafNode shouldn't be created with null/undefined value."
                ),
                Zt(this.priorityNode_);
        }
        static set __childrenNodeConstructor(e) {
            en = e;
        }
        static get __childrenNodeConstructor() {
            return en;
        }
        isLeafNode() {
            return !0;
        }
        getPriority() {
            return this.priorityNode_;
        }
        updatePriority(e) {
            return new sn(this.value_, e);
        }
        getImmediateChild(e) {
            return ".priority" === e
                ? this.priorityNode_
                : sn.__childrenNodeConstructor.EMPTY_NODE;
        }
        getChild(e) {
            return Dt(e)
                ? this
                : ".priority" === Tt(e)
                ? this.priorityNode_
                : sn.__childrenNodeConstructor.EMPTY_NODE;
        }
        hasChild() {
            return !1;
        }
        getPredecessorChildName(e, t) {
            return null;
        }
        updateImmediateChild(e, t) {
            return ".priority" === e
                ? this.updatePriority(t)
                : t.isEmpty() && ".priority" !== e
                ? this
                : sn.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(
                      e,
                      t
                  ).updatePriority(this.priorityNode_);
        }
        updateChild(t, n) {
            const i = Tt(t);
            return null === i
                ? n
                : n.isEmpty() && ".priority" !== i
                ? this
                : (e(
                      ".priority" !== i || 1 === Et(t),
                      ".priority must be the last token in a path"
                  ),
                  this.updateImmediateChild(
                      i,
                      sn.__childrenNodeConstructor.EMPTY_NODE.updateChild(
                          St(t),
                          n
                      )
                  ));
        }
        isEmpty() {
            return !1;
        }
        numChildren() {
            return 0;
        }
        forEachChild(e, t) {
            return !1;
        }
        val(e) {
            return e && !this.getPriority().isEmpty()
                ? {
                      ".value": this.getValue(),
                      ".priority": this.getPriority().val(),
                  }
                : this.getValue();
        }
        hash() {
            if (null === this.lazyHash_) {
                let e = "";
                this.priorityNode_.isEmpty() ||
                    (e += "priority:" + Xt(this.priorityNode_.val()) + ":");
                const t = typeof this.value_;
                (e += t + ":"),
                    (e += "number" === t ? Ye(this.value_) : this.value_),
                    (this.lazyHash_ = De(e));
            }
            return this.lazyHash_;
        }
        getValue() {
            return this.value_;
        }
        compareTo(t) {
            return t === sn.__childrenNodeConstructor.EMPTY_NODE
                ? 1
                : t instanceof sn.__childrenNodeConstructor
                ? -1
                : (e(t.isLeafNode(), "Unknown node type"),
                  this.compareToLeafNode_(t));
        }
        compareToLeafNode_(t) {
            const n = typeof t.value_,
                i = typeof this.value_,
                s = sn.VALUE_TYPE_ORDER.indexOf(n),
                r = sn.VALUE_TYPE_ORDER.indexOf(i);
            return (
                e(s >= 0, "Unknown leaf type: " + n),
                e(r >= 0, "Unknown leaf type: " + i),
                s === r
                    ? "object" === i
                        ? 0
                        : this.value_ < t.value_
                        ? -1
                        : this.value_ === t.value_
                        ? 0
                        : 1
                    : r - s
            );
        }
        withIndex() {
            return this;
        }
        isIndexed() {
            return !0;
        }
        equals(e) {
            if (e === this) return !0;
            if (e.isLeafNode()) {
                const t = e;
                return (
                    this.value_ === t.value_ &&
                    this.priorityNode_.equals(t.priorityNode_)
                );
            }
            return !1;
        }
    }
    sn.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
    const rn = new (class extends jt {
            compare(e, t) {
                const n = e.node.getPriority(),
                    i = t.node.getPriority(),
                    s = n.compareTo(i);
                return 0 === s ? He(e.name, t.name) : s;
            }
            isDefinedOn(e) {
                return !e.getPriority().isEmpty();
            }
            indexedValueChanged(e, t) {
                return !e.getPriority().equals(t.getPriority());
            }
            minPost() {
                return Bt.MIN;
            }
            maxPost() {
                return new Bt(je, new sn("[PRIORITY-POST]", nn));
            }
            makePost(e, t) {
                const n = tn(e);
                return new Bt(t, new sn("[PRIORITY-POST]", n));
            }
            toString() {
                return ".priority";
            }
        })(),
        on = Math.log(2);
    class an {
        constructor(e) {
            var t;
            (this.count = ((t = e + 1), parseInt(Math.log(t) / on, 10))),
                (this.current_ = this.count - 1);
            const n = ((i = this.count), parseInt(Array(i + 1).join("1"), 2));
            var i;
            this.bits_ = (e + 1) & n;
        }
        nextBitIsOne() {
            const e = !(this.bits_ & (1 << this.current_));
            return this.current_--, e;
        }
    }
    const hn = function (e, t, n, i) {
        e.sort(t);
        const s = function (t, i) {
                const r = i - t;
                let o, a;
                if (0 === r) return null;
                if (1 === r)
                    return (
                        (o = e[t]),
                        (a = n ? n(o) : o),
                        new Kt(a, o.node, Kt.BLACK, null, null)
                    );
                {
                    const h = parseInt(r / 2, 10) + t,
                        l = s(t, h),
                        c = s(h + 1, i);
                    return (
                        (o = e[h]),
                        (a = n ? n(o) : o),
                        new Kt(a, o.node, Kt.BLACK, l, c)
                    );
                }
            },
            r = (function (t) {
                let i = null,
                    r = null,
                    o = e.length;
                const a = function (t, i) {
                        const r = o - t,
                            a = o;
                        o -= t;
                        const l = s(r + 1, a),
                            c = e[r],
                            u = n ? n(c) : c;
                        h(new Kt(u, c.node, i, null, l));
                    },
                    h = function (e) {
                        i ? ((i.left = e), (i = e)) : ((r = e), (i = e));
                    };
                for (let e = 0; e < t.count; ++e) {
                    const n = t.nextBitIsOne(),
                        i = Math.pow(2, t.count - (e + 1));
                    n ? a(i, Kt.BLACK) : (a(i, Kt.BLACK), a(i, Kt.RED));
                }
                return r;
            })(new an(e.length));
        return new Gt(i || t, r);
    };
    let ln;
    const cn = {};
    class un {
        constructor(e, t) {
            (this.indexes_ = e), (this.indexSet_ = t);
        }
        static get Default() {
            return (
                e(cn && rn, "ChildrenNode.ts has not been loaded"),
                (ln = ln || new un({ ".priority": cn }, { ".priority": rn })),
                ln
            );
        }
        get(e) {
            const t = y(this.indexes_, e);
            if (!t) throw new Error("No index defined for " + e);
            return t instanceof Gt ? t : null;
        }
        hasIndex(e) {
            return m(this.indexSet_, e.toString());
        }
        addIndex(t, n) {
            e(
                t !== Vt,
                "KeyIndex always exists and isn't meant to be added to the IndexMap."
            );
            const i = [];
            let s = !1;
            const r = n.getIterator(Bt.Wrap);
            let o,
                a = r.getNext();
            for (; a; )
                (s = s || t.isDefinedOn(a.node)), i.push(a), (a = r.getNext());
            o = s ? hn(i, t.getCompare()) : cn;
            const h = t.toString(),
                l = Object.assign({}, this.indexSet_);
            l[h] = t;
            const c = Object.assign({}, this.indexes_);
            return (c[h] = o), new un(c, l);
        }
        addToIndexes(t, n) {
            const i = C(this.indexes_, (i, s) => {
                const r = y(this.indexSet_, s);
                if ((e(r, "Missing index implementation for " + s), i === cn)) {
                    if (r.isDefinedOn(t.node)) {
                        const e = [],
                            i = n.getIterator(Bt.Wrap);
                        let s = i.getNext();
                        for (; s; )
                            s.name !== t.name && e.push(s), (s = i.getNext());
                        return e.push(t), hn(e, r.getCompare());
                    }
                    return cn;
                }
                {
                    const e = n.get(t.name);
                    let s = i;
                    return (
                        e && (s = s.remove(new Bt(t.name, e))),
                        s.insert(t, t.node)
                    );
                }
            });
            return new un(i, this.indexSet_);
        }
        removeFromIndexes(e, t) {
            const n = C(this.indexes_, (n) => {
                if (n === cn) return n;
                {
                    const i = t.get(e.name);
                    return i ? n.remove(new Bt(e.name, i)) : n;
                }
            });
            return new un(n, this.indexSet_);
        }
    }
    let dn;
    class pn {
        constructor(t, n, i) {
            (this.children_ = t),
                (this.priorityNode_ = n),
                (this.indexMap_ = i),
                (this.lazyHash_ = null),
                this.priorityNode_ && Zt(this.priorityNode_),
                this.children_.isEmpty() &&
                    e(
                        !this.priorityNode_ || this.priorityNode_.isEmpty(),
                        "An empty node cannot have a priority"
                    );
        }
        static get EMPTY_NODE() {
            return dn || (dn = new pn(new Gt(Qt), null, un.Default));
        }
        isLeafNode() {
            return !1;
        }
        getPriority() {
            return this.priorityNode_ || dn;
        }
        updatePriority(e) {
            return this.children_.isEmpty()
                ? this
                : new pn(this.children_, e, this.indexMap_);
        }
        getImmediateChild(e) {
            if (".priority" === e) return this.getPriority();
            {
                const t = this.children_.get(e);
                return null === t ? dn : t;
            }
        }
        getChild(e) {
            const t = Tt(e);
            return null === t
                ? this
                : this.getImmediateChild(t).getChild(St(e));
        }
        hasChild(e) {
            return null !== this.children_.get(e);
        }
        updateImmediateChild(t, n) {
            if (
                (e(n, "We should always be passing snapshot nodes"),
                ".priority" === t)
            )
                return this.updatePriority(n);
            {
                const e = new Bt(t, n);
                let i, s;
                n.isEmpty()
                    ? ((i = this.children_.remove(t)),
                      (s = this.indexMap_.removeFromIndexes(e, this.children_)))
                    : ((i = this.children_.insert(t, n)),
                      (s = this.indexMap_.addToIndexes(e, this.children_)));
                const r = i.isEmpty() ? dn : this.priorityNode_;
                return new pn(i, r, s);
            }
        }
        updateChild(t, n) {
            const i = Tt(t);
            if (null === i) return n;
            {
                e(
                    ".priority" !== Tt(t) || 1 === Et(t),
                    ".priority must be the last token in a path"
                );
                const s = this.getImmediateChild(i).updateChild(St(t), n);
                return this.updateImmediateChild(i, s);
            }
        }
        isEmpty() {
            return this.children_.isEmpty();
        }
        numChildren() {
            return this.children_.count();
        }
        val(e) {
            if (this.isEmpty()) return null;
            const t = {};
            let n = 0,
                i = 0,
                s = !0;
            if (
                (this.forEachChild(rn, (r, o) => {
                    (t[r] = o.val(e)),
                        n++,
                        s && pn.INTEGER_REGEXP_.test(r)
                            ? (i = Math.max(i, Number(r)))
                            : (s = !1);
                }),
                !e && s && i < 2 * n)
            ) {
                const e = [];
                for (const n in t) e[n] = t[n];
                return e;
            }
            return (
                e &&
                    !this.getPriority().isEmpty() &&
                    (t[".priority"] = this.getPriority().val()),
                t
            );
        }
        hash() {
            if (null === this.lazyHash_) {
                let e = "";
                this.getPriority().isEmpty() ||
                    (e += "priority:" + Xt(this.getPriority().val()) + ":"),
                    this.forEachChild(rn, (t, n) => {
                        const i = n.hash();
                        "" !== i && (e += ":" + t + ":" + i);
                    }),
                    (this.lazyHash_ = "" === e ? "" : De(e));
            }
            return this.lazyHash_;
        }
        getPredecessorChildName(e, t, n) {
            const i = this.resolveIndex_(n);
            if (i) {
                const n = i.getPredecessorKey(new Bt(e, t));
                return n ? n.name : null;
            }
            return this.children_.getPredecessorKey(e);
        }
        getFirstChildName(e) {
            const t = this.resolveIndex_(e);
            if (t) {
                const e = t.minKey();
                return e && e.name;
            }
            return this.children_.minKey();
        }
        getFirstChild(e) {
            const t = this.getFirstChildName(e);
            return t ? new Bt(t, this.children_.get(t)) : null;
        }
        getLastChildName(e) {
            const t = this.resolveIndex_(e);
            if (t) {
                const e = t.maxKey();
                return e && e.name;
            }
            return this.children_.maxKey();
        }
        getLastChild(e) {
            const t = this.getLastChildName(e);
            return t ? new Bt(t, this.children_.get(t)) : null;
        }
        forEachChild(e, t) {
            const n = this.resolveIndex_(e);
            return n
                ? n.inorderTraversal((e) => t(e.name, e.node))
                : this.children_.inorderTraversal(t);
        }
        getIterator(e) {
            return this.getIteratorFrom(e.minPost(), e);
        }
        getIteratorFrom(e, t) {
            const n = this.resolveIndex_(t);
            if (n) return n.getIteratorFrom(e, (e) => e);
            {
                const n = this.children_.getIteratorFrom(e.name, Bt.Wrap);
                let i = n.peek();
                for (; null != i && t.compare(i, e) < 0; )
                    n.getNext(), (i = n.peek());
                return n;
            }
        }
        getReverseIterator(e) {
            return this.getReverseIteratorFrom(e.maxPost(), e);
        }
        getReverseIteratorFrom(e, t) {
            const n = this.resolveIndex_(t);
            if (n) return n.getReverseIteratorFrom(e, (e) => e);
            {
                const n = this.children_.getReverseIteratorFrom(
                    e.name,
                    Bt.Wrap
                );
                let i = n.peek();
                for (; null != i && t.compare(i, e) > 0; )
                    n.getNext(), (i = n.peek());
                return n;
            }
        }
        compareTo(e) {
            return this.isEmpty()
                ? e.isEmpty()
                    ? 0
                    : -1
                : e.isLeafNode() || e.isEmpty()
                ? 1
                : e === _n
                ? -1
                : 0;
        }
        withIndex(e) {
            if (e === Vt || this.indexMap_.hasIndex(e)) return this;
            {
                const t = this.indexMap_.addIndex(e, this.children_);
                return new pn(this.children_, this.priorityNode_, t);
            }
        }
        isIndexed(e) {
            return e === Vt || this.indexMap_.hasIndex(e);
        }
        equals(e) {
            if (e === this) return !0;
            if (e.isLeafNode()) return !1;
            {
                const t = e;
                if (this.getPriority().equals(t.getPriority())) {
                    if (this.children_.count() === t.children_.count()) {
                        const e = this.getIterator(rn),
                            n = t.getIterator(rn);
                        let i = e.getNext(),
                            s = n.getNext();
                        for (; i && s; ) {
                            if (i.name !== s.name || !i.node.equals(s.node))
                                return !1;
                            (i = e.getNext()), (s = n.getNext());
                        }
                        return null === i && null === s;
                    }
                    return !1;
                }
                return !1;
            }
        }
        resolveIndex_(e) {
            return e === Vt ? null : this.indexMap_.get(e.toString());
        }
    }
    pn.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
    const _n = new (class extends pn {
        constructor() {
            super(new Gt(Qt), pn.EMPTY_NODE, un.Default);
        }
        compareTo(e) {
            return e === this ? 0 : 1;
        }
        equals(e) {
            return e === this;
        }
        getPriority() {
            return this;
        }
        getImmediateChild(e) {
            return pn.EMPTY_NODE;
        }
        isEmpty() {
            return !1;
        }
    })();
    function fn(t, n = null) {
        if (null === t) return pn.EMPTY_NODE;
        if (
            ("object" == typeof t && ".priority" in t && (n = t[".priority"]),
            e(
                null === n ||
                    "string" == typeof n ||
                    "number" == typeof n ||
                    ("object" == typeof n && ".sv" in n),
                "Invalid priority type found: " + typeof n
            ),
            "object" == typeof t &&
                ".value" in t &&
                null !== t[".value"] &&
                (t = t[".value"]),
            "object" != typeof t || ".sv" in t)
        )
            return new sn(t, fn(n));
        if (t instanceof Array) {
            let e = pn.EMPTY_NODE;
            return (
                Ge(t, (n, i) => {
                    if (m(t, n) && "." !== n.substring(0, 1)) {
                        const t = fn(i);
                        (!t.isLeafNode() && t.isEmpty()) ||
                            (e = e.updateImmediateChild(n, t));
                    }
                }),
                e.updatePriority(fn(n))
            );
        }
        {
            const e = [];
            let i = !1;
            if (
                (Ge(t, (t, n) => {
                    if ("." !== t.substring(0, 1)) {
                        const s = fn(n);
                        s.isEmpty() ||
                            ((i = i || !s.getPriority().isEmpty()),
                            e.push(new Bt(t, s)));
                    }
                }),
                0 === e.length)
            )
                return pn.EMPTY_NODE;
            const s = hn(e, Yt, (e) => e.name, Qt);
            if (i) {
                const t = hn(e, rn.getCompare());
                return new pn(
                    s,
                    fn(n),
                    new un({ ".priority": t }, { ".priority": rn })
                );
            }
            return new pn(s, fn(n), un.Default);
        }
    }
    Object.defineProperties(Bt, {
        MIN: { value: new Bt(Be, pn.EMPTY_NODE) },
        MAX: { value: new Bt(je, _n) },
    }),
        (zt.__EMPTY_NODE = pn.EMPTY_NODE),
        (sn.__childrenNodeConstructor = pn),
        (Jt = _n),
        (nn = _n),
        (function (e) {
            tn = e;
        })(fn);
    class gn extends jt {
        constructor(t) {
            super(),
                (this.indexPath_ = t),
                e(
                    !Dt(t) && ".priority" !== Tt(t),
                    "Can't create PathIndex with empty path or .priority key"
                );
        }
        extractChild(e) {
            return e.getChild(this.indexPath_);
        }
        isDefinedOn(e) {
            return !e.getChild(this.indexPath_).isEmpty();
        }
        compare(e, t) {
            const n = this.extractChild(e.node),
                i = this.extractChild(t.node),
                s = n.compareTo(i);
            return 0 === s ? He(e.name, t.name) : s;
        }
        makePost(e, t) {
            const n = fn(e),
                i = pn.EMPTY_NODE.updateChild(this.indexPath_, n);
            return new Bt(t, i);
        }
        maxPost() {
            const e = pn.EMPTY_NODE.updateChild(this.indexPath_, _n);
            return new Bt(je, e);
        }
        toString() {
            return Nt(this.indexPath_, 0).join("/");
        }
    }
    const mn = new (class extends jt {
        compare(e, t) {
            const n = e.node.compareTo(t.node);
            return 0 === n ? He(e.name, t.name) : n;
        }
        isDefinedOn(e) {
            return !0;
        }
        indexedValueChanged(e, t) {
            return !e.equals(t);
        }
        minPost() {
            return Bt.MIN;
        }
        maxPost() {
            return Bt.MAX;
        }
        makePost(e, t) {
            const n = fn(e);
            return new Bt(t, n);
        }
        toString() {
            return ".value";
        }
    })();
    function yn(e, t, n) {
        return {
            type: "child_changed",
            snapshotNode: t,
            childName: e,
            oldSnap: n,
        };
    }
    class vn {
        constructor() {
            (this.limitSet_ = !1),
                (this.startSet_ = !1),
                (this.startNameSet_ = !1),
                (this.startAfterSet_ = !1),
                (this.endSet_ = !1),
                (this.endNameSet_ = !1),
                (this.endBeforeSet_ = !1),
                (this.limit_ = 0),
                (this.viewFrom_ = ""),
                (this.indexStartValue_ = null),
                (this.indexStartName_ = ""),
                (this.indexEndValue_ = null),
                (this.indexEndName_ = ""),
                (this.index_ = rn);
        }
        hasStart() {
            return this.startSet_;
        }
        hasStartAfter() {
            return this.startAfterSet_;
        }
        hasEndBefore() {
            return this.endBeforeSet_;
        }
        isViewFromLeft() {
            return "" === this.viewFrom_
                ? this.startSet_
                : "l" === this.viewFrom_;
        }
        getIndexStartValue() {
            return (
                e(this.startSet_, "Only valid if start has been set"),
                this.indexStartValue_
            );
        }
        getIndexStartName() {
            return (
                e(this.startSet_, "Only valid if start has been set"),
                this.startNameSet_ ? this.indexStartName_ : Be
            );
        }
        hasEnd() {
            return this.endSet_;
        }
        getIndexEndValue() {
            return (
                e(this.endSet_, "Only valid if end has been set"),
                this.indexEndValue_
            );
        }
        getIndexEndName() {
            return (
                e(this.endSet_, "Only valid if end has been set"),
                this.endNameSet_ ? this.indexEndName_ : je
            );
        }
        hasLimit() {
            return this.limitSet_;
        }
        hasAnchoredLimit() {
            return this.limitSet_ && "" !== this.viewFrom_;
        }
        getLimit() {
            return (
                e(this.limitSet_, "Only valid if limit has been set"),
                this.limit_
            );
        }
        getIndex() {
            return this.index_;
        }
        loadsAllData() {
            return !(this.startSet_ || this.endSet_ || this.limitSet_);
        }
        isDefault() {
            return this.loadsAllData() && this.index_ === rn;
        }
        copy() {
            const e = new vn();
            return (
                (e.limitSet_ = this.limitSet_),
                (e.limit_ = this.limit_),
                (e.startSet_ = this.startSet_),
                (e.indexStartValue_ = this.indexStartValue_),
                (e.startNameSet_ = this.startNameSet_),
                (e.indexStartName_ = this.indexStartName_),
                (e.endSet_ = this.endSet_),
                (e.indexEndValue_ = this.indexEndValue_),
                (e.endNameSet_ = this.endNameSet_),
                (e.indexEndName_ = this.indexEndName_),
                (e.index_ = this.index_),
                (e.viewFrom_ = this.viewFrom_),
                e
            );
        }
    }
    function Cn(t) {
        const n = {};
        if (t.isDefault()) return n;
        let i;
        return (
            t.index_ === rn
                ? (i = "$priority")
                : t.index_ === mn
                ? (i = "$value")
                : t.index_ === Vt
                ? (i = "$key")
                : (e(t.index_ instanceof gn, "Unrecognized index type!"),
                  (i = t.index_.toString())),
            (n.orderBy = f(i)),
            t.startSet_ &&
                ((n.startAt = f(t.indexStartValue_)),
                t.startNameSet_ && (n.startAt += "," + f(t.indexStartName_))),
            t.endSet_ &&
                ((n.endAt = f(t.indexEndValue_)),
                t.endNameSet_ && (n.endAt += "," + f(t.indexEndName_))),
            t.limitSet_ &&
                (t.isViewFromLeft()
                    ? (n.limitToFirst = t.limit_)
                    : (n.limitToLast = t.limit_)),
            n
        );
    }
    function wn(e) {
        const t = {};
        if (
            (e.startSet_ &&
                ((t.sp = e.indexStartValue_),
                e.startNameSet_ && (t.sn = e.indexStartName_)),
            e.endSet_ &&
                ((t.ep = e.indexEndValue_),
                e.endNameSet_ && (t.en = e.indexEndName_)),
            e.limitSet_)
        ) {
            t.l = e.limit_;
            let n = e.viewFrom_;
            "" === n && (n = e.isViewFromLeft() ? "l" : "r"), (t.vf = n);
        }
        return e.index_ !== rn && (t.i = e.index_.toString()), t;
    }
    class bn extends vt {
        constructor(e, t, n, i) {
            super(),
                (this.repoInfo_ = e),
                (this.onDataUpdate_ = t),
                (this.authTokenProvider_ = n),
                (this.appCheckTokenProvider_ = i),
                (this.log_ = Me("p:rest:")),
                (this.listens_ = {});
        }
        reportStats(e) {
            throw new Error("Method not implemented.");
        }
        static getListenId_(t, n) {
            return void 0 !== n
                ? "tag$" + n
                : (e(
                      t._queryParams.isDefault(),
                      "should have a tag if it's not a default query."
                  ),
                  t._path.toString());
        }
        listen(e, t, n, i) {
            const s = e._path.toString();
            this.log_("Listen called for " + s + " " + e._queryIdentifier);
            const r = bn.getListenId_(e, n),
                o = {};
            this.listens_[r] = o;
            const a = Cn(e._queryParams);
            this.restRequest_(s + ".json", a, (e, t) => {
                let a = t;
                if (
                    (404 === e && ((a = null), (e = null)),
                    null === e && this.onDataUpdate_(s, a, !1, n),
                    y(this.listens_, r) === o)
                ) {
                    let t;
                    (t = e
                        ? 401 === e
                            ? "permission_denied"
                            : "rest_error:" + e
                        : "ok"),
                        i(t, null);
                }
            });
        }
        unlisten(e, t) {
            const n = bn.getListenId_(e, t);
            delete this.listens_[n];
        }
        get(e) {
            const t = Cn(e._queryParams),
                n = e._path.toString(),
                i = new l();
            return (
                this.restRequest_(n + ".json", t, (e, t) => {
                    let s = t;
                    404 === e && ((s = null), (e = null)),
                        null === e
                            ? (this.onDataUpdate_(n, s, !1, null), i.resolve(s))
                            : i.reject(new Error(s));
                }),
                i.promise
            );
        }
        refreshAuthToken(e) {}
        restRequest_(e, t = {}, n) {
            return (
                (t.format = "export"),
                Promise.all([
                    this.authTokenProvider_.getToken(!1),
                    this.appCheckTokenProvider_.getToken(!1),
                ]).then(([i, s]) => {
                    i && i.accessToken && (t.auth = i.accessToken),
                        s && s.token && (t.ac = s.token);
                    const r =
                        (this.repoInfo_.secure ? "https://" : "http://") +
                        this.repoInfo_.host +
                        e +
                        "?ns=" +
                        this.repoInfo_.namespace +
                        (function (e) {
                            const t = [];
                            for (const [n, i] of Object.entries(e))
                                Array.isArray(i)
                                    ? i.forEach((e) => {
                                          t.push(
                                              encodeURIComponent(n) +
                                                  "=" +
                                                  encodeURIComponent(e)
                                          );
                                      })
                                    : t.push(
                                          encodeURIComponent(n) +
                                              "=" +
                                              encodeURIComponent(i)
                                      );
                            return t.length ? "&" + t.join("&") : "";
                        })(t);
                    this.log_("Sending REST request for " + r);
                    const o = new XMLHttpRequest();
                    (o.onreadystatechange = () => {
                        if (n && 4 === o.readyState) {
                            this.log_(
                                "REST Response for " + r + " received. status:",
                                o.status,
                                "response:",
                                o.responseText
                            );
                            let e = null;
                            if (o.status >= 200 && o.status < 300) {
                                try {
                                    e = _(o.responseText);
                                } catch (e) {
                                    We(
                                        "Failed to parse JSON response for " +
                                            r +
                                            ": " +
                                            o.responseText
                                    );
                                }
                                n(null, e);
                            } else
                                401 !== o.status &&
                                    404 !== o.status &&
                                    We(
                                        "Got unsuccessful REST response for " +
                                            r +
                                            " Status: " +
                                            o.status
                                    ),
                                    n(o.status);
                            n = null;
                        }
                    }),
                        o.open("GET", r, !0),
                        o.send();
                })
            );
        }
    }
    class In {
        constructor() {
            this.rootNode_ = pn.EMPTY_NODE;
        }
        getNode(e) {
            return this.rootNode_.getChild(e);
        }
        updateSnapshot(e, t) {
            this.rootNode_ = this.rootNode_.updateChild(e, t);
        }
    }
    function Tn() {
        return { value: null, children: new Map() };
    }
    function En(e, t, n) {
        if (Dt(t)) (e.value = n), e.children.clear();
        else if (null !== e.value) e.value = e.value.updateChild(t, n);
        else {
            const i = Tt(t);
            e.children.has(i) || e.children.set(i, Tn()),
                En(e.children.get(i), (t = St(t)), n);
        }
    }
    function Sn(e, t, n) {
        null !== e.value
            ? n(t, e.value)
            : (function (e, t) {
                  e.children.forEach((e, n) => {
                      t(n, e);
                  });
              })(e, (e, i) => {
                  Sn(i, new bt(t.toString() + "/" + e), n);
              });
    }
    class kn {
        constructor(e) {
            (this.collection_ = e), (this.last_ = null);
        }
        get() {
            const e = this.collection_.get(),
                t = Object.assign({}, e);
            return (
                this.last_ &&
                    Ge(this.last_, (e, n) => {
                        t[e] = t[e] - n;
                    }),
                (this.last_ = e),
                t
            );
        }
    }
    class Nn {
        constructor(e, t) {
            (this.server_ = t),
                (this.statsToReport_ = {}),
                (this.statsListener_ = new kn(e));
            const n = 1e4 + 2e4 * Math.random();
            Ze(this.reportStats_.bind(this), Math.floor(n));
        }
        reportStats_() {
            const e = this.statsListener_.get(),
                t = {};
            let n = !1;
            Ge(e, (e, i) => {
                i > 0 && m(this.statsToReport_, e) && ((t[e] = i), (n = !0));
            }),
                n && this.server_.reportStats(t),
                Ze(
                    this.reportStats_.bind(this),
                    Math.floor(2 * Math.random() * 3e5)
                );
        }
    }
    var Rn;
    function Pn(e) {
        return { fromUser: !1, fromServer: !0, queryId: e, tagged: !0 };
    }
    !(function (e) {
        (e[(e.OVERWRITE = 0)] = "OVERWRITE"),
            (e[(e.MERGE = 1)] = "MERGE"),
            (e[(e.ACK_USER_WRITE = 2)] = "ACK_USER_WRITE"),
            (e[(e.LISTEN_COMPLETE = 3)] = "LISTEN_COMPLETE");
    })(Rn || (Rn = {}));
    class Dn {
        constructor(e, t, n) {
            (this.path = e),
                (this.affectedTree = t),
                (this.revert = n),
                (this.type = Rn.ACK_USER_WRITE),
                (this.source = {
                    fromUser: !0,
                    fromServer: !1,
                    queryId: null,
                    tagged: !1,
                });
        }
        operationForChild(t) {
            if (Dt(this.path)) {
                if (null != this.affectedTree.value)
                    return (
                        e(
                            this.affectedTree.children.isEmpty(),
                            "affectedTree should not have overlapping affected paths."
                        ),
                        this
                    );
                {
                    const e = this.affectedTree.subtree(new bt(t));
                    return new Dn(It(), e, this.revert);
                }
            }
            return (
                e(
                    Tt(this.path) === t,
                    "operationForChild called for unrelated child."
                ),
                new Dn(St(this.path), this.affectedTree, this.revert)
            );
        }
    }
    class xn {
        constructor(e, t, n) {
            (this.source = e),
                (this.path = t),
                (this.snap = n),
                (this.type = Rn.OVERWRITE);
        }
        operationForChild(e) {
            return Dt(this.path)
                ? new xn(this.source, It(), this.snap.getImmediateChild(e))
                : new xn(this.source, St(this.path), this.snap);
        }
    }
    class An {
        constructor(e, t, n) {
            (this.source = e),
                (this.path = t),
                (this.children = n),
                (this.type = Rn.MERGE);
        }
        operationForChild(t) {
            if (Dt(this.path)) {
                const e = this.children.subtree(new bt(t));
                return e.isEmpty()
                    ? null
                    : e.value
                    ? new xn(this.source, It(), e.value)
                    : new An(this.source, It(), e);
            }
            return (
                e(
                    Tt(this.path) === t,
                    "Can't get a merge for a child not on the path of the operation"
                ),
                new An(this.source, St(this.path), this.children)
            );
        }
        toString() {
            return (
                "Operation(" +
                this.path +
                ": " +
                this.source.toString() +
                " merge: " +
                this.children.toString() +
                ")"
            );
        }
    }
    class On {
        constructor(e, t, n) {
            (this.node_ = e),
                (this.fullyInitialized_ = t),
                (this.filtered_ = n);
        }
        isFullyInitialized() {
            return this.fullyInitialized_;
        }
        isFiltered() {
            return this.filtered_;
        }
        isCompleteForPath(e) {
            if (Dt(e)) return this.isFullyInitialized() && !this.filtered_;
            const t = Tt(e);
            return this.isCompleteForChild(t);
        }
        isCompleteForChild(e) {
            return (
                (this.isFullyInitialized() && !this.filtered_) ||
                this.node_.hasChild(e)
            );
        }
        getNode() {
            return this.node_;
        }
    }
    function Ln(e, n, i, s, r, o) {
        const a = s.filter((e) => e.type === i);
        a.sort((n, i) =>
            (function (e, n, i) {
                if (null == n.childName || null == i.childName)
                    throw t("Should only compare child_ events.");
                const s = new Bt(n.childName, n.snapshotNode),
                    r = new Bt(i.childName, i.snapshotNode);
                return e.index_.compare(s, r);
            })(e, n, i)
        ),
            a.forEach((t) => {
                const i = (function (e, t, n) {
                    return (
                        "value" === t.type ||
                            "child_removed" === t.type ||
                            (t.prevName = n.getPredecessorChildName(
                                t.childName,
                                t.snapshotNode,
                                e.index_
                            )),
                        t
                    );
                })(e, t, o);
                r.forEach((s) => {
                    s.respondsTo(t.type) && n.push(s.createEvent(i, e.query_));
                });
            });
    }
    function Mn(e, t) {
        return { eventCache: e, serverCache: t };
    }
    function Fn(e, t, n, i) {
        return Mn(new On(t, n, i), e.serverCache);
    }
    function qn(e, t, n, i) {
        return Mn(e.eventCache, new On(t, n, i));
    }
    function Wn(e) {
        return e.eventCache.isFullyInitialized()
            ? e.eventCache.getNode()
            : null;
    }
    function Un(e) {
        return e.serverCache.isFullyInitialized()
            ? e.serverCache.getNode()
            : null;
    }
    let Bn;
    class jn {
        constructor(e, t = (() => (Bn || (Bn = new Gt(ze)), Bn))()) {
            (this.value = e), (this.children = t);
        }
        static fromObject(e) {
            let t = new jn(null);
            return (
                Ge(e, (e, n) => {
                    t = t.set(new bt(e), n);
                }),
                t
            );
        }
        isEmpty() {
            return null === this.value && this.children.isEmpty();
        }
        findRootMostMatchingPathAndValue(e, t) {
            if (null != this.value && t(this.value))
                return { path: It(), value: this.value };
            if (Dt(e)) return null;
            {
                const n = Tt(e),
                    i = this.children.get(n);
                if (null !== i) {
                    const s = i.findRootMostMatchingPathAndValue(St(e), t);
                    return null != s
                        ? { path: Pt(new bt(n), s.path), value: s.value }
                        : null;
                }
                return null;
            }
        }
        findRootMostValueAndPath(e) {
            return this.findRootMostMatchingPathAndValue(e, () => !0);
        }
        subtree(e) {
            if (Dt(e)) return this;
            {
                const t = Tt(e),
                    n = this.children.get(t);
                return null !== n ? n.subtree(St(e)) : new jn(null);
            }
        }
        set(e, t) {
            if (Dt(e)) return new jn(t, this.children);
            {
                const n = Tt(e),
                    i = (this.children.get(n) || new jn(null)).set(St(e), t),
                    s = this.children.insert(n, i);
                return new jn(this.value, s);
            }
        }
        remove(e) {
            if (Dt(e))
                return this.children.isEmpty()
                    ? new jn(null)
                    : new jn(null, this.children);
            {
                const t = Tt(e),
                    n = this.children.get(t);
                if (n) {
                    const i = n.remove(St(e));
                    let s;
                    return (
                        (s = i.isEmpty()
                            ? this.children.remove(t)
                            : this.children.insert(t, i)),
                        null === this.value && s.isEmpty()
                            ? new jn(null)
                            : new jn(this.value, s)
                    );
                }
                return this;
            }
        }
        get(e) {
            if (Dt(e)) return this.value;
            {
                const t = Tt(e),
                    n = this.children.get(t);
                return n ? n.get(St(e)) : null;
            }
        }
        setTree(e, t) {
            if (Dt(e)) return t;
            {
                const n = Tt(e),
                    i = (this.children.get(n) || new jn(null)).setTree(
                        St(e),
                        t
                    );
                let s;
                return (
                    (s = i.isEmpty()
                        ? this.children.remove(n)
                        : this.children.insert(n, i)),
                    new jn(this.value, s)
                );
            }
        }
        fold(e) {
            return this.fold_(It(), e);
        }
        fold_(e, t) {
            const n = {};
            return (
                this.children.inorderTraversal((i, s) => {
                    n[i] = s.fold_(Pt(e, i), t);
                }),
                t(e, this.value, n)
            );
        }
        findOnPath(e, t) {
            return this.findOnPath_(e, It(), t);
        }
        findOnPath_(e, t, n) {
            const i = !!this.value && n(t, this.value);
            if (i) return i;
            if (Dt(e)) return null;
            {
                const i = Tt(e),
                    s = this.children.get(i);
                return s ? s.findOnPath_(St(e), Pt(t, i), n) : null;
            }
        }
        foreachOnPath(e, t) {
            return this.foreachOnPath_(e, It(), t);
        }
        foreachOnPath_(e, t, n) {
            if (Dt(e)) return this;
            {
                this.value && n(t, this.value);
                const i = Tt(e),
                    s = this.children.get(i);
                return s ? s.foreachOnPath_(St(e), Pt(t, i), n) : new jn(null);
            }
        }
        foreach(e) {
            this.foreach_(It(), e);
        }
        foreach_(e, t) {
            this.children.inorderTraversal((n, i) => {
                i.foreach_(Pt(e, n), t);
            }),
                this.value && t(e, this.value);
        }
        foreachChild(e) {
            this.children.inorderTraversal((t, n) => {
                n.value && e(t, n.value);
            });
        }
    }
    class Hn {
        constructor(e) {
            this.writeTree_ = e;
        }
        static empty() {
            return new Hn(new jn(null));
        }
    }
    function zn(e, t, n) {
        if (Dt(t)) return new Hn(new jn(n));
        {
            const i = e.writeTree_.findRootMostValueAndPath(t);
            if (null != i) {
                const s = i.path;
                let r = i.value;
                const o = xt(s, t);
                return (
                    (r = r.updateChild(o, n)), new Hn(e.writeTree_.set(s, r))
                );
            }
            {
                const i = new jn(n),
                    s = e.writeTree_.setTree(t, i);
                return new Hn(s);
            }
        }
    }
    function Vn(e, t, n) {
        let i = e;
        return (
            Ge(n, (e, n) => {
                i = zn(i, Pt(t, e), n);
            }),
            i
        );
    }
    function $n(e, t) {
        if (Dt(t)) return Hn.empty();
        {
            const n = e.writeTree_.setTree(t, new jn(null));
            return new Hn(n);
        }
    }
    function Kn(e, t) {
        return null != Gn(e, t);
    }
    function Gn(e, t) {
        const n = e.writeTree_.findRootMostValueAndPath(t);
        return null != n
            ? e.writeTree_.get(n.path).getChild(xt(n.path, t))
            : null;
    }
    function Yn(e) {
        const t = [],
            n = e.writeTree_.value;
        return (
            null != n
                ? n.isLeafNode() ||
                  n.forEachChild(rn, (e, n) => {
                      t.push(new Bt(e, n));
                  })
                : e.writeTree_.children.inorderTraversal((e, n) => {
                      null != n.value && t.push(new Bt(e, n.value));
                  }),
            t
        );
    }
    function Qn(e, t) {
        if (Dt(t)) return e;
        {
            const n = Gn(e, t);
            return new Hn(null != n ? new jn(n) : e.writeTree_.subtree(t));
        }
    }
    function Jn(e) {
        return e.writeTree_.isEmpty();
    }
    function Xn(e, t) {
        return Zn(It(), e.writeTree_, t);
    }
    function Zn(t, n, i) {
        if (null != n.value) return i.updateChild(t, n.value);
        {
            let s = null;
            return (
                n.children.inorderTraversal((n, r) => {
                    ".priority" === n
                        ? (e(
                              null !== r.value,
                              "Priority writes must always be leaf nodes"
                          ),
                          (s = r.value))
                        : (i = Zn(Pt(t, n), r, i));
                }),
                i.getChild(t).isEmpty() ||
                    null === s ||
                    (i = i.updateChild(Pt(t, ".priority"), s)),
                i
            );
        }
    }
    function ei(e, t) {
        return ui(t, e);
    }
    function ti(e, t) {
        if (e.snap) return Ot(e.path, t);
        for (const n in e.children)
            if (e.children.hasOwnProperty(n) && Ot(Pt(e.path, n), t)) return !0;
        return !1;
    }
    function ni(e) {
        return e.visible;
    }
    function ii(e, n, i) {
        let s = Hn.empty();
        for (let r = 0; r < e.length; ++r) {
            const o = e[r];
            if (n(o)) {
                const e = o.path;
                let n;
                if (o.snap)
                    Ot(i, e)
                        ? ((n = xt(i, e)), (s = zn(s, n, o.snap)))
                        : Ot(e, i) &&
                          ((n = xt(e, i)),
                          (s = zn(s, It(), o.snap.getChild(n))));
                else {
                    if (!o.children)
                        throw t("WriteRecord should have .snap or .children");
                    if (Ot(i, e)) (n = xt(i, e)), (s = Vn(s, n, o.children));
                    else if (Ot(e, i))
                        if (((n = xt(e, i)), Dt(n)))
                            s = Vn(s, It(), o.children);
                        else {
                            const e = y(o.children, Tt(n));
                            if (e) {
                                const t = e.getChild(St(n));
                                s = zn(s, It(), t);
                            }
                        }
                }
            }
        }
        return s;
    }
    function si(e, t, n, i, s) {
        if (i || s) {
            const r = Qn(e.visibleWrites, t);
            if (!s && Jn(r)) return n;
            if (s || null != n || Kn(r, It())) {
                const r = function (e) {
                    return (
                        (e.visible || s) &&
                        (!i || !~i.indexOf(e.writeId)) &&
                        (Ot(e.path, t) || Ot(t, e.path))
                    );
                };
                return Xn(ii(e.allWrites, r, t), n || pn.EMPTY_NODE);
            }
            return null;
        }
        {
            const i = Gn(e.visibleWrites, t);
            if (null != i) return i;
            {
                const i = Qn(e.visibleWrites, t);
                return Jn(i)
                    ? n
                    : null != n || Kn(i, It())
                    ? Xn(i, n || pn.EMPTY_NODE)
                    : null;
            }
        }
    }
    function ri(e, t, n, i) {
        return si(e.writeTree, e.treePath, t, n, i);
    }
    function oi(e, t) {
        return (function (e, t, n) {
            let i = pn.EMPTY_NODE;
            const s = Gn(e.visibleWrites, t);
            if (s)
                return (
                    s.isLeafNode() ||
                        s.forEachChild(rn, (e, t) => {
                            i = i.updateImmediateChild(e, t);
                        }),
                    i
                );
            if (n) {
                const s = Qn(e.visibleWrites, t);
                return (
                    n.forEachChild(rn, (e, t) => {
                        const n = Xn(Qn(s, new bt(e)), t);
                        i = i.updateImmediateChild(e, n);
                    }),
                    Yn(s).forEach((e) => {
                        i = i.updateImmediateChild(e.name, e.node);
                    }),
                    i
                );
            }
            return (
                Yn(Qn(e.visibleWrites, t)).forEach((e) => {
                    i = i.updateImmediateChild(e.name, e.node);
                }),
                i
            );
        })(e.writeTree, e.treePath, t);
    }
    function ai(t, n, i, s) {
        return (function (t, n, i, s, r) {
            e(
                s || r,
                "Either existingEventSnap or existingServerSnap must exist"
            );
            const o = Pt(n, i);
            if (Kn(t.visibleWrites, o)) return null;
            {
                const e = Qn(t.visibleWrites, o);
                return Jn(e) ? r.getChild(i) : Xn(e, r.getChild(i));
            }
        })(t.writeTree, t.treePath, n, i, s);
    }
    function hi(e, t) {
        return (function (e, t) {
            return Gn(e.visibleWrites, t);
        })(e.writeTree, Pt(e.treePath, t));
    }
    function li(e, t, n) {
        return (function (e, t, n, i) {
            const s = Pt(t, n),
                r = Gn(e.visibleWrites, s);
            return null != r
                ? r
                : i.isCompleteForChild(n)
                ? Xn(Qn(e.visibleWrites, s), i.getNode().getImmediateChild(n))
                : null;
        })(e.writeTree, e.treePath, t, n);
    }
    function ci(e, t) {
        return ui(Pt(e.treePath, t), e.writeTree);
    }
    function ui(e, t) {
        return { treePath: e, writeTree: t };
    }
    class di {
        constructor() {
            this.changeMap = new Map();
        }
        trackChildChange(n) {
            const i = n.type,
                s = n.childName;
            e(
                "child_added" === i ||
                    "child_changed" === i ||
                    "child_removed" === i,
                "Only child changes supported for tracking"
            ),
                e(
                    ".priority" !== s,
                    "Only non-priority child changes can be tracked."
                );
            const r = this.changeMap.get(s);
            if (r) {
                const e = r.type;
                if ("child_added" === i && "child_removed" === e)
                    this.changeMap.set(
                        s,
                        yn(s, n.snapshotNode, r.snapshotNode)
                    );
                else if ("child_removed" === i && "child_added" === e)
                    this.changeMap.delete(s);
                else if ("child_removed" === i && "child_changed" === e)
                    this.changeMap.set(
                        s,
                        ((o = s),
                        {
                            type: "child_removed",
                            snapshotNode: r.oldSnap,
                            childName: o,
                        })
                    );
                else if ("child_changed" === i && "child_added" === e)
                    this.changeMap.set(
                        s,
                        (function (e, t) {
                            return {
                                type: "child_added",
                                snapshotNode: t,
                                childName: e,
                            };
                        })(s, n.snapshotNode)
                    );
                else {
                    if ("child_changed" !== i || "child_changed" !== e)
                        throw t(
                            "Illegal combination of changes: " +
                                n +
                                " occurred after " +
                                r
                        );
                    this.changeMap.set(s, yn(s, n.snapshotNode, r.oldSnap));
                }
            } else this.changeMap.set(s, n);
            var o;
        }
        getChanges() {
            return Array.from(this.changeMap.values());
        }
    }
    const pi = new (class {
        getCompleteChild(e) {
            return null;
        }
        getChildAfterChild(e, t, n) {
            return null;
        }
    })();
    class _i {
        constructor(e, t, n = null) {
            (this.writes_ = e),
                (this.viewCache_ = t),
                (this.optCompleteServerCache_ = n);
        }
        getCompleteChild(e) {
            const t = this.viewCache_.eventCache;
            if (t.isCompleteForChild(e))
                return t.getNode().getImmediateChild(e);
            {
                const t =
                    null != this.optCompleteServerCache_
                        ? new On(this.optCompleteServerCache_, !0, !1)
                        : this.viewCache_.serverCache;
                return li(this.writes_, e, t);
            }
        }
        getChildAfterChild(e, t, n) {
            const i =
                    null != this.optCompleteServerCache_
                        ? this.optCompleteServerCache_
                        : Un(this.viewCache_),
                s = (function (e, t, n, i, s, r) {
                    return (function (e, t, n, i, s, r, o) {
                        let a;
                        const h = Qn(e.visibleWrites, t),
                            l = Gn(h, It());
                        if (null != l) a = l;
                        else {
                            if (null == n) return [];
                            a = Xn(h, n);
                        }
                        if (
                            ((a = a.withIndex(o)),
                            a.isEmpty() || a.isLeafNode())
                        )
                            return [];
                        {
                            const e = [],
                                t = o.getCompare(),
                                n = r
                                    ? a.getReverseIteratorFrom(i, o)
                                    : a.getIteratorFrom(i, o);
                            let h = n.getNext();
                            for (; h && e.length < s; )
                                0 !== t(h, i) && e.push(h), (h = n.getNext());
                            return e;
                        }
                    })(e.writeTree, e.treePath, t, n, i, s, r);
                })(this.writes_, i, t, 1, n, e);
            return 0 === s.length ? null : s[0];
        }
    }
    function fi(t, n, i, s, r, o) {
        const a = n.eventCache;
        if (null != hi(s, i)) return n;
        {
            let h, l;
            if (Dt(i))
                if (
                    (e(
                        n.serverCache.isFullyInitialized(),
                        "If change path is empty, we must have complete server data"
                    ),
                    n.serverCache.isFiltered())
                ) {
                    const e = Un(n),
                        i = oi(s, e instanceof pn ? e : pn.EMPTY_NODE);
                    h = t.filter.updateFullNode(n.eventCache.getNode(), i, o);
                } else {
                    const e = ri(s, Un(n));
                    h = t.filter.updateFullNode(n.eventCache.getNode(), e, o);
                }
            else {
                const c = Tt(i);
                if (".priority" === c) {
                    e(
                        1 === Et(i),
                        "Can't have a priority with additional path components"
                    );
                    const r = a.getNode();
                    l = n.serverCache.getNode();
                    const o = ai(s, i, r, l);
                    h = null != o ? t.filter.updatePriority(r, o) : a.getNode();
                } else {
                    const e = St(i);
                    let u;
                    if (a.isCompleteForChild(c)) {
                        l = n.serverCache.getNode();
                        const t = ai(s, i, a.getNode(), l);
                        u =
                            null != t
                                ? a
                                      .getNode()
                                      .getImmediateChild(c)
                                      .updateChild(e, t)
                                : a.getNode().getImmediateChild(c);
                    } else u = li(s, c, n.serverCache);
                    h =
                        null != u
                            ? t.filter.updateChild(a.getNode(), c, u, e, r, o)
                            : a.getNode();
                }
            }
            return Fn(
                n,
                h,
                a.isFullyInitialized() || Dt(i),
                t.filter.filtersNodes()
            );
        }
    }
    function gi(e, t, n, i, s, r, o, a) {
        const h = t.serverCache;
        let l;
        const c = o ? e.filter : e.filter.getIndexedFilter();
        if (Dt(n)) l = c.updateFullNode(h.getNode(), i, null);
        else if (c.filtersNodes() && !h.isFiltered()) {
            const e = h.getNode().updateChild(n, i);
            l = c.updateFullNode(h.getNode(), e, null);
        } else {
            const e = Tt(n);
            if (!h.isCompleteForPath(n) && Et(n) > 1) return t;
            const s = St(n),
                r = h.getNode().getImmediateChild(e).updateChild(s, i);
            l =
                ".priority" === e
                    ? c.updatePriority(h.getNode(), r)
                    : c.updateChild(h.getNode(), e, r, s, pi, null);
        }
        const u = qn(t, l, h.isFullyInitialized() || Dt(n), c.filtersNodes());
        return fi(e, u, n, s, new _i(s, u, r), a);
    }
    function mi(e, t, n, i, s, r, o) {
        const a = t.eventCache;
        let h, l;
        const c = new _i(s, t, r);
        if (Dt(n))
            (l = e.filter.updateFullNode(t.eventCache.getNode(), i, o)),
                (h = Fn(t, l, !0, e.filter.filtersNodes()));
        else {
            const s = Tt(n);
            if (".priority" === s)
                (l = e.filter.updatePriority(t.eventCache.getNode(), i)),
                    (h = Fn(t, l, a.isFullyInitialized(), a.isFiltered()));
            else {
                const r = St(n),
                    l = a.getNode().getImmediateChild(s);
                let u;
                if (Dt(r)) u = i;
                else {
                    const e = c.getCompleteChild(s);
                    u =
                        null != e
                            ? ".priority" === kt(r) &&
                              e.getChild(Rt(r)).isEmpty()
                                ? e
                                : e.updateChild(r, i)
                            : pn.EMPTY_NODE;
                }
                h = l.equals(u)
                    ? t
                    : Fn(
                          t,
                          e.filter.updateChild(a.getNode(), s, u, r, c, o),
                          a.isFullyInitialized(),
                          e.filter.filtersNodes()
                      );
            }
        }
        return h;
    }
    function yi(e, t) {
        return e.eventCache.isCompleteForChild(t);
    }
    function vi(e, t, n) {
        return (
            n.foreach((e, n) => {
                t = t.updateChild(e, n);
            }),
            t
        );
    }
    function Ci(e, t, n, i, s, r, o, a) {
        if (
            t.serverCache.getNode().isEmpty() &&
            !t.serverCache.isFullyInitialized()
        )
            return t;
        let h,
            l = t;
        h = Dt(n) ? i : new jn(null).setTree(n, i);
        const c = t.serverCache.getNode();
        return (
            h.children.inorderTraversal((n, i) => {
                if (c.hasChild(n)) {
                    const h = vi(
                        0,
                        t.serverCache.getNode().getImmediateChild(n),
                        i
                    );
                    l = gi(e, l, new bt(n), h, s, r, o, a);
                }
            }),
            h.children.inorderTraversal((n, i) => {
                const h =
                    !t.serverCache.isCompleteForChild(n) && void 0 === i.value;
                if (!c.hasChild(n) && !h) {
                    const h = vi(
                        0,
                        t.serverCache.getNode().getImmediateChild(n),
                        i
                    );
                    l = gi(e, l, new bt(n), h, s, r, o, a);
                }
            }),
            l
        );
    }
    function wi(e, t) {
        const n = Un(e.viewCache_);
        return n &&
            (e.query._queryParams.loadsAllData() ||
                (!Dt(t) && !n.getImmediateChild(Tt(t)).isEmpty()))
            ? n.getChild(t)
            : null;
    }
    function bi(n, i, s, r) {
        i.type === Rn.MERGE &&
            null !== i.source.queryId &&
            (e(
                Un(n.viewCache_),
                "We should always have a full cache before handling merges"
            ),
            e(
                Wn(n.viewCache_),
                "Missing event cache, even though we have a server cache"
            ));
        const o = n.viewCache_,
            a = (function (n, i, s, r, o) {
                const a = new di();
                let h, l;
                if (s.type === Rn.OVERWRITE) {
                    const t = s;
                    t.source.fromUser
                        ? (h = mi(n, i, t.path, t.snap, r, o, a))
                        : (e(t.source.fromServer, "Unknown source."),
                          (l =
                              t.source.tagged ||
                              (i.serverCache.isFiltered() && !Dt(t.path))),
                          (h = gi(n, i, t.path, t.snap, r, o, l, a)));
                } else if (s.type === Rn.MERGE) {
                    const t = s;
                    t.source.fromUser
                        ? (h = (function (e, t, n, i, s, r, o) {
                              let a = t;
                              return (
                                  i.foreach((i, h) => {
                                      const l = Pt(n, i);
                                      yi(t, Tt(l)) &&
                                          (a = mi(e, a, l, h, s, r, o));
                                  }),
                                  i.foreach((i, h) => {
                                      const l = Pt(n, i);
                                      yi(t, Tt(l)) ||
                                          (a = mi(e, a, l, h, s, r, o));
                                  }),
                                  a
                              );
                          })(n, i, t.path, t.children, r, o, a))
                        : (e(t.source.fromServer, "Unknown source."),
                          (l = t.source.tagged || i.serverCache.isFiltered()),
                          (h = Ci(n, i, t.path, t.children, r, o, l, a)));
                } else if (s.type === Rn.ACK_USER_WRITE) {
                    const t = s;
                    h = t.revert
                        ? (function (t, n, i, s, r, o) {
                              let a;
                              if (null != hi(s, i)) return n;
                              {
                                  const h = new _i(s, n, r),
                                      l = n.eventCache.getNode();
                                  let c;
                                  if (Dt(i) || ".priority" === Tt(i)) {
                                      let i;
                                      if (n.serverCache.isFullyInitialized())
                                          i = ri(s, Un(n));
                                      else {
                                          const t = n.serverCache.getNode();
                                          e(
                                              t instanceof pn,
                                              "serverChildren would be complete if leaf node"
                                          ),
                                              (i = oi(s, t));
                                      }
                                      c = t.filter.updateFullNode(l, i, o);
                                  } else {
                                      const e = Tt(i);
                                      let r = li(s, e, n.serverCache);
                                      null == r &&
                                          n.serverCache.isCompleteForChild(e) &&
                                          (r = l.getImmediateChild(e)),
                                          (c =
                                              null != r
                                                  ? t.filter.updateChild(
                                                        l,
                                                        e,
                                                        r,
                                                        St(i),
                                                        h,
                                                        o
                                                    )
                                                  : n.eventCache
                                                        .getNode()
                                                        .hasChild(e)
                                                  ? t.filter.updateChild(
                                                        l,
                                                        e,
                                                        pn.EMPTY_NODE,
                                                        St(i),
                                                        h,
                                                        o
                                                    )
                                                  : l),
                                          c.isEmpty() &&
                                              n.serverCache.isFullyInitialized() &&
                                              ((a = ri(s, Un(n))),
                                              a.isLeafNode() &&
                                                  (c = t.filter.updateFullNode(
                                                      c,
                                                      a,
                                                      o
                                                  )));
                                  }
                                  return (
                                      (a =
                                          n.serverCache.isFullyInitialized() ||
                                          null != hi(s, It())),
                                      Fn(n, c, a, t.filter.filtersNodes())
                                  );
                              }
                          })(n, i, t.path, r, o, a)
                        : (function (e, t, n, i, s, r, o) {
                              if (null != hi(s, n)) return t;
                              const a = t.serverCache.isFiltered(),
                                  h = t.serverCache;
                              if (null != i.value) {
                                  if (
                                      (Dt(n) && h.isFullyInitialized()) ||
                                      h.isCompleteForPath(n)
                                  )
                                      return gi(
                                          e,
                                          t,
                                          n,
                                          h.getNode().getChild(n),
                                          s,
                                          r,
                                          a,
                                          o
                                      );
                                  if (Dt(n)) {
                                      let i = new jn(null);
                                      return (
                                          h
                                              .getNode()
                                              .forEachChild(Vt, (e, t) => {
                                                  i = i.set(new bt(e), t);
                                              }),
                                          Ci(e, t, n, i, s, r, a, o)
                                      );
                                  }
                                  return t;
                              }
                              {
                                  let l = new jn(null);
                                  return (
                                      i.foreach((e, t) => {
                                          const i = Pt(n, e);
                                          h.isCompleteForPath(i) &&
                                              (l = l.set(
                                                  e,
                                                  h.getNode().getChild(i)
                                              ));
                                      }),
                                      Ci(e, t, n, l, s, r, a, o)
                                  );
                              }
                          })(n, i, t.path, t.affectedTree, r, o, a);
                } else {
                    if (s.type !== Rn.LISTEN_COMPLETE)
                        throw t("Unknown operation type: " + s.type);
                    h = (function (e, t, n, i, s) {
                        const r = t.serverCache;
                        return fi(
                            e,
                            qn(
                                t,
                                r.getNode(),
                                r.isFullyInitialized() || Dt(n),
                                r.isFiltered()
                            ),
                            n,
                            i,
                            pi,
                            s
                        );
                    })(n, i, s.path, r, a);
                }
                const c = a.getChanges();
                return (
                    (function (e, t, n) {
                        const i = t.eventCache;
                        if (i.isFullyInitialized()) {
                            const s =
                                    i.getNode().isLeafNode() ||
                                    i.getNode().isEmpty(),
                                r = Wn(e);
                            (n.length > 0 ||
                                !e.eventCache.isFullyInitialized() ||
                                (s && !i.getNode().equals(r)) ||
                                !i
                                    .getNode()
                                    .getPriority()
                                    .equals(r.getPriority())) &&
                                n.push({ type: "value", snapshotNode: Wn(t) });
                        }
                    })(i, h, c),
                    { viewCache: h, changes: c }
                );
            })(n.processor_, o, i, s, r);
        var h, l;
        return (
            (h = n.processor_),
            (l = a.viewCache),
            e(
                l.eventCache.getNode().isIndexed(h.filter.getIndex()),
                "Event snap not indexed"
            ),
            e(
                l.serverCache.getNode().isIndexed(h.filter.getIndex()),
                "Server snap not indexed"
            ),
            e(
                a.viewCache.serverCache.isFullyInitialized() ||
                    !o.serverCache.isFullyInitialized(),
                "Once a server snap is complete, it should never go back"
            ),
            (n.viewCache_ = a.viewCache),
            (function (e, t, n, i) {
                const s = i ? [i] : e.eventRegistrations_;
                return (function (e, t, n, i) {
                    const s = [],
                        r = [];
                    return (
                        t.forEach((t) => {
                            var n;
                            "child_changed" === t.type &&
                                e.index_.indexedValueChanged(
                                    t.oldSnap,
                                    t.snapshotNode
                                ) &&
                                r.push(
                                    ((n = t.childName),
                                    {
                                        type: "child_moved",
                                        snapshotNode: t.snapshotNode,
                                        childName: n,
                                    })
                                );
                        }),
                        Ln(e, s, "child_removed", t, i, n),
                        Ln(e, s, "child_added", t, i, n),
                        Ln(e, s, "child_moved", r, i, n),
                        Ln(e, s, "child_changed", t, i, n),
                        Ln(e, s, "value", t, i, n),
                        s
                    );
                })(e.eventGenerator_, t, n, s);
            })(n, a.changes, a.viewCache.eventCache.getNode(), null)
        );
    }
    let Ii, Ti;
    function Ei(t, n, i, s) {
        const r = n.source.queryId;
        if (null !== r) {
            const o = t.views.get(r);
            return (
                e(null != o, "SyncTree gave us an op for an invalid query."),
                bi(o, n, i, s)
            );
        }
        {
            let e = [];
            for (const r of t.views.values()) e = e.concat(bi(r, n, i, s));
            return e;
        }
    }
    function Si(e, t) {
        let n = null;
        for (const i of e.views.values()) n = n || wi(i, t);
        return n;
    }
    class ki {
        constructor(e) {
            (this.listenProvider_ = e),
                (this.syncPointTree_ = new jn(null)),
                (this.pendingWriteTree_ = {
                    visibleWrites: Hn.empty(),
                    allWrites: [],
                    lastWriteId: -1,
                }),
                (this.tagToQueryMap = new Map()),
                (this.queryToTagMap = new Map());
        }
    }
    function Ni(t, n, i, s, r) {
        return (
            (function (t, n, i, s, r) {
                e(
                    s > t.lastWriteId,
                    "Stacking an older write on top of newer ones"
                ),
                    void 0 === r && (r = !0),
                    t.allWrites.push({
                        path: n,
                        snap: i,
                        writeId: s,
                        visible: r,
                    }),
                    r && (t.visibleWrites = zn(t.visibleWrites, n, i)),
                    (t.lastWriteId = s);
            })(t.pendingWriteTree_, n, i, s, r),
            r
                ? xi(
                      t,
                      new xn(
                          {
                              fromUser: !0,
                              fromServer: !1,
                              queryId: null,
                              tagged: !1,
                          },
                          n,
                          i
                      )
                  )
                : []
        );
    }
    function Ri(t, n, i = !1) {
        const s = (function (e, t) {
            for (let n = 0; n < e.allWrites.length; n++) {
                const i = e.allWrites[n];
                if (i.writeId === t) return i;
            }
            return null;
        })(t.pendingWriteTree_, n);
        if (
            (function (t, n) {
                const i = t.allWrites.findIndex((e) => e.writeId === n);
                e(i >= 0, "removeWrite called with nonexistent writeId.");
                const s = t.allWrites[i];
                t.allWrites.splice(i, 1);
                let r = s.visible,
                    o = !1,
                    a = t.allWrites.length - 1;
                for (; r && a >= 0; ) {
                    const e = t.allWrites[a];
                    e.visible &&
                        (a >= i && ti(e, s.path)
                            ? (r = !1)
                            : Ot(s.path, e.path) && (o = !0)),
                        a--;
                }
                return (
                    !!r &&
                    (o
                        ? ((function (e) {
                              (e.visibleWrites = ii(e.allWrites, ni, It())),
                                  e.allWrites.length > 0
                                      ? (e.lastWriteId =
                                            e.allWrites[
                                                e.allWrites.length - 1
                                            ].writeId)
                                      : (e.lastWriteId = -1);
                          })(t),
                          !0)
                        : (s.snap
                              ? (t.visibleWrites = $n(t.visibleWrites, s.path))
                              : Ge(s.children, (e) => {
                                    t.visibleWrites = $n(
                                        t.visibleWrites,
                                        Pt(s.path, e)
                                    );
                                }),
                          !0))
                );
            })(t.pendingWriteTree_, n)
        ) {
            let e = new jn(null);
            return (
                null != s.snap
                    ? (e = e.set(It(), !0))
                    : Ge(s.children, (t) => {
                          e = e.set(new bt(t), !0);
                      }),
                xi(t, new Dn(s.path, e, i))
            );
        }
        return [];
    }
    function Pi(e, t, n) {
        return xi(
            e,
            new xn(
                { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 },
                t,
                n
            )
        );
    }
    function Di(e, t, n) {
        const i = e.pendingWriteTree_,
            s = e.syncPointTree_.findOnPath(t, (e, n) => {
                const i = Si(n, xt(e, t));
                if (i) return i;
            });
        return si(i, t, s, n, !0);
    }
    function xi(e, t) {
        return Ai(t, e.syncPointTree_, null, ei(e.pendingWriteTree_, It()));
    }
    function Ai(e, t, n, i) {
        if (Dt(e.path)) return Oi(e, t, n, i);
        {
            const s = t.get(It());
            null == n && null != s && (n = Si(s, It()));
            let r = [];
            const o = Tt(e.path),
                a = e.operationForChild(o),
                h = t.children.get(o);
            if (h && a) {
                const e = n ? n.getImmediateChild(o) : null,
                    t = ci(i, o);
                r = r.concat(Ai(a, h, e, t));
            }
            return s && (r = r.concat(Ei(s, e, i, n))), r;
        }
    }
    function Oi(e, t, n, i) {
        const s = t.get(It());
        null == n && null != s && (n = Si(s, It()));
        let r = [];
        return (
            t.children.inorderTraversal((t, s) => {
                const o = n ? n.getImmediateChild(t) : null,
                    a = ci(i, t),
                    h = e.operationForChild(t);
                h && (r = r.concat(Oi(h, s, o, a)));
            }),
            s && (r = r.concat(Ei(s, e, i, n))),
            r
        );
    }
    function Li(e, t) {
        return e.tagToQueryMap.get(t);
    }
    function Mi(t) {
        const n = t.indexOf("$");
        return (
            e(-1 !== n && n < t.length - 1, "Bad queryKey."),
            { queryId: t.substr(n + 1), path: new bt(t.substr(0, n)) }
        );
    }
    function Fi(t, n, i) {
        const s = t.syncPointTree_.get(n);
        return (
            e(s, "Missing sync point for query tag that we're tracking"),
            Ei(s, i, ei(t.pendingWriteTree_, n), null)
        );
    }
    class qi {
        constructor(e) {
            this.node_ = e;
        }
        getImmediateChild(e) {
            const t = this.node_.getImmediateChild(e);
            return new qi(t);
        }
        node() {
            return this.node_;
        }
    }
    class Wi {
        constructor(e, t) {
            (this.syncTree_ = e), (this.path_ = t);
        }
        getImmediateChild(e) {
            const t = Pt(this.path_, e);
            return new Wi(this.syncTree_, t);
        }
        node() {
            return Di(this.syncTree_, this.path_);
        }
    }
    const Ui = function (t, n, i) {
            return t && "object" == typeof t
                ? (e(".sv" in t, "Unexpected leaf node or priority contents"),
                  "string" == typeof t[".sv"]
                      ? Bi(t[".sv"], n, i)
                      : "object" == typeof t[".sv"]
                      ? ji(t[".sv"], n)
                      : void e(
                            !1,
                            "Unexpected server value: " +
                                JSON.stringify(t, null, 2)
                        ))
                : t;
        },
        Bi = function (t, n, i) {
            if ("timestamp" === t) return i.timestamp;
            e(!1, "Unexpected server value: " + t);
        },
        ji = function (t, n, i) {
            t.hasOwnProperty("increment") ||
                e(!1, "Unexpected server value: " + JSON.stringify(t, null, 2));
            const s = t.increment;
            "number" != typeof s && e(!1, "Unexpected increment value: " + s);
            const r = n.node();
            if (
                (e(null != r, "Expected ChildrenNode.EMPTY_NODE for nulls"),
                !r.isLeafNode())
            )
                return s;
            const o = r.getValue();
            return "number" != typeof o ? s : o + s;
        },
        Hi = function (e, t, n) {
            return zi(e, new qi(t), n);
        };
    function zi(e, t, n) {
        const i = e.getPriority().val(),
            s = Ui(i, t.getImmediateChild(".priority"), n);
        let r;
        if (e.isLeafNode()) {
            const i = e,
                r = Ui(i.getValue(), t, n);
            return r !== i.getValue() || s !== i.getPriority().val()
                ? new sn(r, fn(s))
                : e;
        }
        {
            const i = e;
            return (
                (r = i),
                s !== i.getPriority().val() &&
                    (r = r.updatePriority(new sn(s))),
                i.forEachChild(rn, (e, i) => {
                    const s = zi(i, t.getImmediateChild(e), n);
                    s !== i && (r = r.updateImmediateChild(e, s));
                }),
                r
            );
        }
    }
    class Vi {
        constructor(e = "", t = null, n = { children: {}, childCount: 0 }) {
            (this.name = e), (this.parent = t), (this.node = n);
        }
    }
    function $i(e, t) {
        let n = t instanceof bt ? t : new bt(t),
            i = e,
            s = Tt(n);
        for (; null !== s; ) {
            const e = y(i.node.children, s) || { children: {}, childCount: 0 };
            (i = new Vi(s, i, e)), (n = St(n)), (s = Tt(n));
        }
        return i;
    }
    function Ki(e) {
        return e.node.value;
    }
    function Gi(e, t) {
        (e.node.value = t), Zi(e);
    }
    function Yi(e) {
        return e.node.childCount > 0;
    }
    function Qi(e, t) {
        Ge(e.node.children, (n, i) => {
            t(new Vi(n, e, i));
        });
    }
    function Ji(e, t, n, i) {
        n && !i && t(e),
            Qi(e, (e) => {
                Ji(e, t, !0, i);
            }),
            n && i && t(e);
    }
    function Xi(e) {
        return new bt(null === e.parent ? e.name : Xi(e.parent) + "/" + e.name);
    }
    function Zi(e) {
        null !== e.parent &&
            (function (e, t, n) {
                const i = (function (e) {
                        return void 0 === Ki(e) && !Yi(e);
                    })(n),
                    s = m(e.node.children, t);
                i && s
                    ? (delete e.node.children[t], e.node.childCount--, Zi(e))
                    : i ||
                      s ||
                      ((e.node.children[t] = n.node),
                      e.node.childCount++,
                      Zi(e));
            })(e.parent, e.name, e);
    }
    const es = /[\[\].#$\/\u0000-\u001F\u007F]/,
        ts = /[\[\].#$\u0000-\u001F\u007F]/,
        ns = 10485760,
        is = function (e) {
            return "string" == typeof e && 0 !== e.length && !es.test(e);
        },
        ss = function (e) {
            return "string" == typeof e && 0 !== e.length && !ts.test(e);
        },
        rs = function (e, t, n) {
            const i = n instanceof bt ? new Lt(n, e) : n;
            if (void 0 === t)
                throw new Error(e + "contains undefined " + Ft(i));
            if ("function" == typeof t)
                throw new Error(
                    e +
                        "contains a function " +
                        Ft(i) +
                        " with contents = " +
                        t.toString()
                );
            if (Ue(t))
                throw new Error(e + "contains " + t.toString() + " " + Ft(i));
            if ("string" == typeof t && t.length > ns / 3 && E(t) > ns)
                throw new Error(
                    e +
                        "contains a string greater than 10485760 utf8 bytes " +
                        Ft(i) +
                        " ('" +
                        t.substring(0, 50) +
                        "...')"
                );
            if (t && "object" == typeof t) {
                let n = !1,
                    s = !1;
                if (
                    (Ge(t, (t, r) => {
                        if (".value" === t) n = !0;
                        else if (
                            ".priority" !== t &&
                            ".sv" !== t &&
                            ((s = !0), !is(t))
                        )
                            throw new Error(
                                e +
                                    " contains an invalid key (" +
                                    t +
                                    ") " +
                                    Ft(i) +
                                    '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'
                            );
                        !(function (e, t) {
                            e.parts_.length > 0 && (e.byteLength_ += 1),
                                e.parts_.push(t),
                                (e.byteLength_ += E(t)),
                                Mt(e);
                        })(i, t),
                            rs(e, r, i),
                            (function (e) {
                                const t = e.parts_.pop();
                                (e.byteLength_ -= E(t)),
                                    e.parts_.length > 0 && (e.byteLength_ -= 1);
                            })(i);
                    }),
                    n && s)
                )
                    throw new Error(
                        e +
                            ' contains ".value" child ' +
                            Ft(i) +
                            " in addition to actual children."
                    );
            }
        },
        os = function (e, t, n, i) {
            if (!((i && void 0 === n) || ss(n)))
                throw new Error(
                    T(e, t) +
                        'was an invalid path = "' +
                        n +
                        '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"'
                );
        };
    class as {
        constructor() {
            (this.eventLists_ = []), (this.recursionDepth_ = 0);
        }
    }
    function hs(e, t) {
        let n = null;
        for (let i = 0; i < t.length; i++) {
            const s = t[i],
                r = s.getPath();
            null === n || At(r, n.path) || (e.eventLists_.push(n), (n = null)),
                null === n && (n = { events: [], path: r }),
                n.events.push(s);
        }
        n && e.eventLists_.push(n);
    }
    function ls(e, t, n) {
        hs(e, n),
            (function (e, t) {
                e.recursionDepth_++;
                let n = !0;
                for (let i = 0; i < e.eventLists_.length; i++) {
                    const s = e.eventLists_[i];
                    s &&
                        (t(s.path)
                            ? (cs(e.eventLists_[i]), (e.eventLists_[i] = null))
                            : (n = !1));
                }
                n && (e.eventLists_ = []), e.recursionDepth_--;
            })(e, (e) => Ot(e, t) || Ot(t, e));
    }
    function cs(e) {
        for (let t = 0; t < e.events.length; t++) {
            const n = e.events[t];
            if (null !== n) {
                e.events[t] = null;
                const i = n.getEventRunner();
                Ae && Le("event: " + n.toString()), Xe(i);
            }
        }
    }
    class us {
        constructor(e, t, n, i) {
            (this.repoInfo_ = e),
                (this.forceRestClient_ = t),
                (this.authTokenProvider_ = n),
                (this.appCheckProvider_ = i),
                (this.dataUpdateCount = 0),
                (this.statsListener_ = null),
                (this.eventQueue_ = new as()),
                (this.nextWriteId_ = 1),
                (this.interceptServerDataCallback_ = null),
                (this.onDisconnect_ = Tn()),
                (this.transactionQueueTree_ = new Vi()),
                (this.persistentConnection_ = null),
                (this.key = this.repoInfo_.toURLString());
        }
        toString() {
            return (
                (this.repoInfo_.secure ? "https://" : "http://") +
                this.repoInfo_.host
            );
        }
    }
    function ds(e, t, n) {
        if (
            ((e.stats_ = ut(e.repoInfo_)),
            e.forceRestClient_ ||
                (
                    ("object" == typeof window &&
                        window.navigator &&
                        window.navigator.userAgent) ||
                    ""
                ).search(
                    /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i
                ) >= 0)
        )
            (e.server_ = new bn(
                e.repoInfo_,
                (t, n, i, s) => {
                    fs(e, t, n, i, s);
                },
                e.authTokenProvider_,
                e.appCheckProvider_
            )),
                setTimeout(() => gs(e, !0), 0);
        else {
            if (null != n) {
                if ("object" != typeof n)
                    throw new Error(
                        "Only objects are supported for option databaseAuthVariableOverride"
                    );
                try {
                    f(n);
                } catch (e) {
                    throw new Error("Invalid authOverride provided: " + e);
                }
            }
            (e.persistentConnection_ = new Ut(
                e.repoInfo_,
                t,
                (t, n, i, s) => {
                    fs(e, t, n, i, s);
                },
                (t) => {
                    gs(e, t);
                },
                (t) => {
                    !(function (e, t) {
                        Ge(t, (t, n) => {
                            ms(e, t, n);
                        });
                    })(e, t);
                },
                e.authTokenProvider_,
                e.appCheckProvider_,
                n
            )),
                (e.server_ = e.persistentConnection_);
        }
        e.authTokenProvider_.addTokenChangeListener((t) => {
            e.server_.refreshAuthToken(t);
        }),
            e.appCheckProvider_.addTokenChangeListener((t) => {
                e.server_.refreshAppCheckToken(t.token);
            }),
            (e.statsReporter_ = (function (t, n) {
                const i = t.toString();
                return ct[i] || (ct[i] = new Nn(e.stats_, e.server_)), ct[i];
            })(e.repoInfo_)),
            (e.infoData_ = new In()),
            (e.infoSyncTree_ = new ki({
                startListening: (t, n, i, s) => {
                    let r = [];
                    const o = e.infoData_.getNode(t._path);
                    return (
                        o.isEmpty() ||
                            ((r = Pi(e.infoSyncTree_, t._path, o)),
                            setTimeout(() => {
                                s("ok");
                            }, 0)),
                        r
                    );
                },
                stopListening: () => {},
            })),
            ms(e, "connected", !1),
            (e.serverSyncTree_ = new ki({
                startListening: (t, n, i, s) => (
                    e.server_.listen(t, i, n, (n, i) => {
                        const r = s(n, i);
                        ls(e.eventQueue_, t._path, r);
                    }),
                    []
                ),
                stopListening: (t, n) => {
                    e.server_.unlisten(t, n);
                },
            }));
    }
    function ps(e) {
        const t =
            e.infoData_.getNode(new bt(".info/serverTimeOffset")).val() || 0;
        return new Date().getTime() + t;
    }
    function _s(e) {
        return (
            ((t = (t = { timestamp: ps(e) }) || {}).timestamp =
                t.timestamp || new Date().getTime()),
            t
        );
        var t;
    }
    function fs(e, t, n, i, s) {
        e.dataUpdateCount++;
        const r = new bt(t);
        n = e.interceptServerDataCallback_
            ? e.interceptServerDataCallback_(t, n)
            : n;
        let o = [];
        if (s)
            if (i) {
                const t = C(n, (e) => fn(e));
                o = (function (e, t, n, i) {
                    const s = Li(e, i);
                    if (s) {
                        const i = Mi(s),
                            r = i.path,
                            o = i.queryId,
                            a = xt(r, t),
                            h = jn.fromObject(n);
                        return Fi(e, r, new An(Pn(o), a, h));
                    }
                    return [];
                })(e.serverSyncTree_, r, t, s);
            } else {
                const t = fn(n);
                o = (function (e, t, n, i) {
                    const s = Li(e, i);
                    if (null != s) {
                        const i = Mi(s),
                            r = i.path,
                            o = i.queryId,
                            a = xt(r, t);
                        return Fi(e, r, new xn(Pn(o), a, n));
                    }
                    return [];
                })(e.serverSyncTree_, r, t, s);
            }
        else if (i) {
            const t = C(n, (e) => fn(e));
            o = (function (e, t, n) {
                const i = jn.fromObject(n);
                return xi(
                    e,
                    new An(
                        {
                            fromUser: !1,
                            fromServer: !0,
                            queryId: null,
                            tagged: !1,
                        },
                        t,
                        i
                    )
                );
            })(e.serverSyncTree_, r, t);
        } else {
            const t = fn(n);
            o = Pi(e.serverSyncTree_, r, t);
        }
        let a = r;
        o.length > 0 && (a = Is(e, r)), ls(e.eventQueue_, a, o);
    }
    function gs(e, t) {
        ms(e, "connected", t),
            !1 === t &&
                (function (e) {
                    Cs(e, "onDisconnectEvents");
                    const t = _s(e),
                        n = Tn();
                    Sn(e.onDisconnect_, It(), (i, s) => {
                        const r = (function (e, t, n, i) {
                            return zi(t, new Wi(n, e), i);
                        })(i, s, e.serverSyncTree_, t);
                        En(n, i, r);
                    });
                    let i = [];
                    Sn(n, It(), (t, n) => {
                        i = i.concat(Pi(e.serverSyncTree_, t, n));
                        const s = Ns(e, t);
                        Is(e, s);
                    }),
                        (e.onDisconnect_ = Tn()),
                        ls(e.eventQueue_, It(), i);
                })(e);
    }
    function ms(e, t, n) {
        const i = new bt("/.info/" + t),
            s = fn(n);
        e.infoData_.updateSnapshot(i, s);
        const r = Pi(e.infoSyncTree_, i, s);
        ls(e.eventQueue_, i, r);
    }
    function ys(e) {
        return e.nextWriteId_++;
    }
    function vs(e, t, n, i, s) {
        Cs(e, "set", { path: t.toString(), value: n, priority: i });
        const r = _s(e),
            o = fn(n, i),
            a = Di(e.serverSyncTree_, t),
            h = Hi(o, a, r),
            l = ys(e),
            c = Ni(e.serverSyncTree_, t, h, l, !0);
        hs(e.eventQueue_, c),
            e.server_.put(t.toString(), o.val(!0), (n, i) => {
                const r = "ok" === n;
                r || We("set at " + t + " failed: " + n);
                const o = Ri(e.serverSyncTree_, l, !r);
                ls(e.eventQueue_, t, o),
                    (function (e, t, n, i) {
                        t &&
                            Xe(() => {
                                if ("ok" === n) t(null);
                                else {
                                    const e = (n || "error").toUpperCase();
                                    let s = e;
                                    i && (s += ": " + i);
                                    const r = new Error(s);
                                    (r.code = e), t(r);
                                }
                            });
                    })(0, s, n, i);
            });
        const u = Ns(e, t);
        Is(e, u), ls(e.eventQueue_, u, []);
    }
    function Cs(e, ...t) {
        let n = "";
        e.persistentConnection_ && (n = e.persistentConnection_.id + ":"),
            Le(n, ...t);
    }
    function ws(e, t, n) {
        return Di(e.serverSyncTree_, t, n) || pn.EMPTY_NODE;
    }
    function bs(t, n = t.transactionQueueTree_) {
        if ((n || ks(t, n), Ki(n))) {
            const i = Es(t, n);
            e(i.length > 0, "Sending zero length transaction queue"),
                i.every((e) => 0 === e.status) &&
                    (function (t, n, i) {
                        const s = i.map((e) => e.currentWriteId),
                            r = ws(t, n, s);
                        let o = r;
                        const a = r.hash();
                        for (let t = 0; t < i.length; t++) {
                            const s = i[t];
                            e(
                                0 === s.status,
                                "tryToSendTransactionQueue_: items in queue should all be run."
                            ),
                                (s.status = 1),
                                s.retryCount++;
                            const r = xt(n, s.path);
                            o = o.updateChild(r, s.currentOutputSnapshotRaw);
                        }
                        const h = o.val(!0),
                            l = n;
                        t.server_.put(
                            l.toString(),
                            h,
                            (e) => {
                                Cs(t, "transaction put response", {
                                    path: l.toString(),
                                    status: e,
                                });
                                let s = [];
                                if ("ok" === e) {
                                    const e = [];
                                    for (let n = 0; n < i.length; n++)
                                        (i[n].status = 2),
                                            (s = s.concat(
                                                Ri(
                                                    t.serverSyncTree_,
                                                    i[n].currentWriteId
                                                )
                                            )),
                                            i[n].onComplete &&
                                                e.push(() =>
                                                    i[n].onComplete(
                                                        null,
                                                        !0,
                                                        i[n]
                                                            .currentOutputSnapshotResolved
                                                    )
                                                ),
                                            i[n].unwatcher();
                                    ks(t, $i(t.transactionQueueTree_, n)),
                                        bs(t, t.transactionQueueTree_),
                                        ls(t.eventQueue_, n, s);
                                    for (let t = 0; t < e.length; t++) Xe(e[t]);
                                } else {
                                    if ("datastale" === e)
                                        for (let e = 0; e < i.length; e++)
                                            3 === i[e].status
                                                ? (i[e].status = 4)
                                                : (i[e].status = 0);
                                    else {
                                        We(
                                            "transaction at " +
                                                l.toString() +
                                                " failed: " +
                                                e
                                        );
                                        for (let t = 0; t < i.length; t++)
                                            (i[t].status = 4),
                                                (i[t].abortReason = e);
                                    }
                                    Is(t, n);
                                }
                            },
                            a
                        );
                    })(t, Xi(n), i);
        } else
            Yi(n) &&
                Qi(n, (e) => {
                    bs(t, e);
                });
    }
    function Is(t, n) {
        const i = Ts(t, n),
            s = Xi(i);
        return (
            (function (t, n, i) {
                if (0 === n.length) return;
                const s = [];
                let r = [];
                const o = n
                    .filter((e) => 0 === e.status)
                    .map((e) => e.currentWriteId);
                for (let h = 0; h < n.length; h++) {
                    const l = n[h],
                        c = xt(i, l.path);
                    let u,
                        d = !1;
                    if (
                        (e(
                            null !== c,
                            "rerunTransactionsUnderNode_: relativePath should not be null."
                        ),
                        4 === l.status)
                    )
                        (d = !0),
                            (u = l.abortReason),
                            (r = r.concat(
                                Ri(t.serverSyncTree_, l.currentWriteId, !0)
                            ));
                    else if (0 === l.status)
                        if (l.retryCount >= 25)
                            (d = !0),
                                (u = "maxretry"),
                                (r = r.concat(
                                    Ri(t.serverSyncTree_, l.currentWriteId, !0)
                                ));
                        else {
                            const e = ws(t, l.path, o);
                            l.currentInputSnapshot = e;
                            const i = n[h].update(e.val());
                            if (void 0 !== i) {
                                rs(
                                    "transaction failed: Data returned ",
                                    i,
                                    l.path
                                );
                                let n = fn(i);
                                ("object" == typeof i &&
                                    null != i &&
                                    m(i, ".priority")) ||
                                    (n = n.updatePriority(e.getPriority()));
                                const s = l.currentWriteId,
                                    a = _s(t),
                                    h = Hi(n, e, a);
                                (l.currentOutputSnapshotRaw = n),
                                    (l.currentOutputSnapshotResolved = h),
                                    (l.currentWriteId = ys(t)),
                                    o.splice(o.indexOf(s), 1),
                                    (r = r.concat(
                                        Ni(
                                            t.serverSyncTree_,
                                            l.path,
                                            h,
                                            l.currentWriteId,
                                            l.applyLocally
                                        )
                                    )),
                                    (r = r.concat(
                                        Ri(t.serverSyncTree_, s, !0)
                                    ));
                            } else
                                (d = !0),
                                    (u = "nodata"),
                                    (r = r.concat(
                                        Ri(
                                            t.serverSyncTree_,
                                            l.currentWriteId,
                                            !0
                                        )
                                    ));
                        }
                    ls(t.eventQueue_, i, r),
                        (r = []),
                        d &&
                            ((n[h].status = 2),
                            (a = n[h].unwatcher),
                            setTimeout(a, Math.floor(0)),
                            n[h].onComplete &&
                                ("nodata" === u
                                    ? s.push(() =>
                                          n[h].onComplete(
                                              null,
                                              !1,
                                              n[h].currentInputSnapshot
                                          )
                                      )
                                    : s.push(() =>
                                          n[h].onComplete(
                                              new Error(u),
                                              !1,
                                              null
                                          )
                                      )));
                }
                var a;
                ks(t, t.transactionQueueTree_);
                for (let e = 0; e < s.length; e++) Xe(s[e]);
                bs(t, t.transactionQueueTree_);
            })(t, Es(t, i), s),
            s
        );
    }
    function Ts(e, t) {
        let n,
            i = e.transactionQueueTree_;
        for (n = Tt(t); null !== n && void 0 === Ki(i); )
            (i = $i(i, n)), (n = Tt((t = St(t))));
        return i;
    }
    function Es(e, t) {
        const n = [];
        return Ss(e, t, n), n.sort((e, t) => e.order - t.order), n;
    }
    function Ss(e, t, n) {
        const i = Ki(t);
        if (i) for (let e = 0; e < i.length; e++) n.push(i[e]);
        Qi(t, (t) => {
            Ss(e, t, n);
        });
    }
    function ks(e, t) {
        const n = Ki(t);
        if (n) {
            let e = 0;
            for (let t = 0; t < n.length; t++)
                2 !== n[t].status && ((n[e] = n[t]), e++);
            (n.length = e), Gi(t, n.length > 0 ? n : void 0);
        }
        Qi(t, (t) => {
            ks(e, t);
        });
    }
    function Ns(e, t) {
        const n = Xi(Ts(e, t)),
            i = $i(e.transactionQueueTree_, t);
        return (
            (function (e, t, n) {
                let i = e.parent;
                for (; null !== i; ) {
                    if (t(i)) return !0;
                    i = i.parent;
                }
            })(i, (t) => {
                Rs(e, t);
            }),
            Rs(e, i),
            Ji(i, (t) => {
                Rs(e, t);
            }),
            n
        );
    }
    function Rs(t, n) {
        const i = Ki(n);
        if (i) {
            const s = [];
            let r = [],
                o = -1;
            for (let n = 0; n < i.length; n++)
                3 === i[n].status ||
                    (1 === i[n].status
                        ? (e(
                              o === n - 1,
                              "All SENT items should be at beginning of queue."
                          ),
                          (o = n),
                          (i[n].status = 3),
                          (i[n].abortReason = "set"))
                        : (e(
                              0 === i[n].status,
                              "Unexpected transaction status in abort"
                          ),
                          i[n].unwatcher(),
                          (r = r.concat(
                              Ri(t.serverSyncTree_, i[n].currentWriteId, !0)
                          )),
                          i[n].onComplete &&
                              s.push(
                                  i[n].onComplete.bind(
                                      null,
                                      new Error("set"),
                                      !1,
                                      null
                                  )
                              )));
            -1 === o ? Gi(n, void 0) : (i.length = o + 1),
                ls(t.eventQueue_, Xi(n), r);
            for (let e = 0; e < s.length; e++) Xe(s[e]);
        }
    }
    const Ps = function (e, t) {
            const n = Ds(e),
                i = n.namespace;
            "firebase.com" === n.domain &&
                qe(
                    n.host +
                        " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"
                ),
                (i && "undefined" !== i) ||
                    "localhost" === n.domain ||
                    qe(
                        "Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"
                    ),
                n.secure ||
                    ("undefined" != typeof window &&
                        window.location &&
                        window.location.protocol &&
                        -1 !== window.location.protocol.indexOf("https:") &&
                        We(
                            "Insecure Firebase access from a secure page. Please use https in calls to new Firebase()."
                        ));
            const s = "ws" === n.scheme || "wss" === n.scheme;
            return {
                repoInfo: new ot(
                    n.host,
                    n.secure,
                    i,
                    s,
                    t,
                    "",
                    i !== n.subdomain
                ),
                path: new bt(n.pathString),
            };
        },
        Ds = function (e) {
            let t = "",
                n = "",
                i = "",
                s = "",
                r = "",
                o = !0,
                a = "https",
                h = 443;
            if ("string" == typeof e) {
                let l = e.indexOf("//");
                l >= 0 &&
                    ((a = e.substring(0, l - 1)), (e = e.substring(l + 2)));
                let c = e.indexOf("/");
                -1 === c && (c = e.length);
                let u = e.indexOf("?");
                -1 === u && (u = e.length),
                    (t = e.substring(0, Math.min(c, u))),
                    c < u &&
                        (s = (function (e) {
                            let t = "";
                            const n = e.split("/");
                            for (let e = 0; e < n.length; e++)
                                if (n[e].length > 0) {
                                    let i = n[e];
                                    try {
                                        i = decodeURIComponent(
                                            i.replace(/\+/g, " ")
                                        );
                                    } catch (e) {}
                                    t += "/" + i;
                                }
                            return t;
                        })(e.substring(c, u)));
                const d = (function (e) {
                    const t = {};
                    "?" === e.charAt(0) && (e = e.substring(1));
                    for (const n of e.split("&")) {
                        if (0 === n.length) continue;
                        const i = n.split("=");
                        2 === i.length
                            ? (t[decodeURIComponent(i[0])] = decodeURIComponent(
                                  i[1]
                              ))
                            : We(
                                  `Invalid query segment '${n}' in query '${e}'`
                              );
                    }
                    return t;
                })(e.substring(Math.min(e.length, u)));
                (l = t.indexOf(":")),
                    l >= 0
                        ? ((o = "https" === a || "wss" === a),
                          (h = parseInt(t.substring(l + 1), 10)))
                        : (l = t.length);
                const p = t.slice(0, l);
                if ("localhost" === p.toLowerCase()) n = "localhost";
                else if (p.split(".").length <= 2) n = p;
                else {
                    const e = t.indexOf(".");
                    (i = t.substring(0, e).toLowerCase()),
                        (n = t.substring(e + 1)),
                        (r = i);
                }
                "ns" in d && (r = d.ns);
            }
            return {
                host: t,
                port: h,
                domain: n,
                subdomain: i,
                secure: o,
                scheme: a,
                pathString: s,
                namespace: r,
            };
        };
    class xs {
        constructor(e, t, n, i) {
            (this._repo = e),
                (this._path = t),
                (this._queryParams = n),
                (this._orderByCalled = i);
        }
        get key() {
            return Dt(this._path) ? null : kt(this._path);
        }
        get ref() {
            return new As(this._repo, this._path);
        }
        get _queryIdentifier() {
            const e = wn(this._queryParams),
                t = $e(e);
            return "{}" === t ? "default" : t;
        }
        get _queryObject() {
            return wn(this._queryParams);
        }
        isEqual(e) {
            if (!((e = S(e)) instanceof xs)) return !1;
            const t = this._repo === e._repo,
                n = At(this._path, e._path),
                i = this._queryIdentifier === e._queryIdentifier;
            return t && n && i;
        }
        toJSON() {
            return this.toString();
        }
        toString() {
            return (
                this._repo.toString() +
                (function (e) {
                    let t = "";
                    for (let n = e.pieceNum_; n < e.pieces_.length; n++)
                        "" !== e.pieces_[n] &&
                            (t +=
                                "/" + encodeURIComponent(String(e.pieces_[n])));
                    return t || "/";
                })(this._path)
            );
        }
    }
    class As extends xs {
        constructor(e, t) {
            super(e, t, new vn(), !1);
        }
        get parent() {
            const e = Rt(this._path);
            return null === e ? null : new As(this._repo, e);
        }
        get root() {
            let e = this;
            for (; null !== e.parent; ) e = e.parent;
            return e;
        }
    }
    !(function (t) {
        e(!Ii, "__referenceConstructor has already been defined"), (Ii = t);
    })(As),
        (function (t) {
            e(!Ti, "__referenceConstructor has already been defined"), (Ti = t);
        })(As);
    const Os = {};
    function Ls(e, t, n, i, s) {
        let r = i || e.options.databaseURL;
        void 0 === r &&
            (e.options.projectId ||
                qe(
                    "Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
                ),
            Le("Using default host for project ", e.options.projectId),
            (r = `${e.options.projectId}-default-rtdb.firebaseio.com`));
        let o,
            a,
            h = Ps(r, s),
            l = h.repoInfo;
        "undefined" != typeof process &&
            process.env &&
            (a = process.env.FIREBASE_DATABASE_EMULATOR_HOST),
            a
                ? ((o = !0),
                  (r = `http://${a}?ns=${l.namespace}`),
                  (h = Ps(r, s)),
                  (l = h.repoInfo))
                : (o = !h.repoInfo.secure);
        const c = s && o ? new nt(nt.OWNER) : new tt(e.name, e.options, t);
        (function (e, t) {
            const n = t.path.toString();
            if (
                "string" != typeof t.repoInfo.host ||
                0 === t.repoInfo.host.length ||
                (!is(t.repoInfo.namespace) &&
                    "localhost" !== t.repoInfo.host.split(":")[0]) ||
                (0 !== n.length &&
                    !(function (e) {
                        return (
                            e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), ss(e)
                        );
                    })(n))
            )
                throw new Error(
                    T(e, "url") +
                        'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'
                );
        })("Invalid Firebase Database URL", h),
            Dt(h.path) ||
                qe(
                    "Database URL must point to the root of a Firebase Database (not including a child path)."
                );
        const u = (function (e, t, n, i) {
            let s = Os[t.name];
            s || ((s = {}), (Os[t.name] = s));
            let r = s[e.toURLString()];
            return (
                r &&
                    qe(
                        "Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."
                    ),
                (r = new us(e, false, n, i)),
                (s[e.toURLString()] = r),
                r
            );
        })(l, e, c, new et(e.name, n));
        return new Ms(u, e);
    }
    class Ms {
        constructor(e, t) {
            (this._repoInternal = e),
                (this.app = t),
                (this.type = "database"),
                (this._instanceStarted = !1);
        }
        get _repo() {
            return (
                this._instanceStarted ||
                    (ds(
                        this._repoInternal,
                        this.app.options.appId,
                        this.app.options.databaseAuthVariableOverride
                    ),
                    (this._instanceStarted = !0)),
                this._repoInternal
            );
        }
        get _root() {
            return (
                this._rootInternal ||
                    (this._rootInternal = new As(this._repo, It())),
                this._rootInternal
            );
        }
        _delete() {
            return (
                null !== this._rootInternal &&
                    ((function (e, t) {
                        const n = Os[t];
                        (n && n[e.key] === e) ||
                            qe(
                                `Database ${t}(${e.repoInfo_}) has already been deleted.`
                            ),
                            (function (e) {
                                e.persistentConnection_ &&
                                    e.persistentConnection_.interrupt(
                                        "repo_interrupt"
                                    );
                            })(e),
                            delete n[e.key];
                    })(this._repo, this.app.name),
                    (this._repoInternal = null),
                    (this._rootInternal = null)),
                Promise.resolve()
            );
        }
        _checkNotDeleted(e) {
            null === this._rootInternal &&
                qe("Cannot call " + e + " on a deleted database.");
        }
    }
    var Fs, qs;
    (Ut.prototype.simpleListen = function (e, t) {
        this.sendRequest("q", { p: e }, t);
    }),
        (Ut.prototype.echo = function (e, t) {
            this.sendRequest("echo", { d: e }, t);
        }),
        (Ie = "9.9.1"),
        he(
            new k(
                "database",
                (e, { instanceIdentifier: t }) =>
                    Ls(
                        e.getProvider("app").getImmediate(),
                        e.getProvider("auth-internal"),
                        e.getProvider("app-check-internal"),
                        t
                    ),
                "PUBLIC"
            ).setMultipleInstances(!0)
        ),
        ue(we, be, void 0),
        ue(we, be, "esm2017"),
        (function (e, t = {}) {
            "object" != typeof t && (t = { name: t });
            const n = Object.assign(
                    { name: "[DEFAULT]", automaticDataCollectionEnabled: !1 },
                    t
                ),
                i = n.name;
            if ("string" != typeof i || !i)
                throw le.create("bad-app-name", { appName: String(i) });
            const s = re.get(i);
            if (s) {
                if (w(e, s.options) && w(n, s.config)) return s;
                throw le.create("duplicate-app", { appName: i });
            }
            const r = new P(i);
            for (const e of oe.values()) r.addComponent(e);
            const o = new ce(e, n, r);
            re.set(i, o);
        })({
            apiKey: "AIzaSyC6djYKfwoc04PLDpGmqNhI42c8Vzlov0w",
            authDomain: "database-aacbb.firebaseapp.com",
            databaseURL: "https://database-aacbb-default-rtdb.firebaseio.com",
            projectId: "database-aacbb",
            storageBucket: "database-aacbb.appspot.com",
            messagingSenderId: "364141524109",
            appId: "1:364141524109:web:b925005b460045e3cc5ec4",
            measurementId: "G-SVDBZCFL5W",
        }),
        (function (e, t) {
            (function (e, t) {
                if (".info" === Tt(t))
                    throw new Error(
                        e + " failed = Can't modify data under /.info/"
                    );
            })("set", (e = S(e))._path),
                (function (e, t, n, i) {
                    (i && void 0 === t) || rs(T(e, "value"), t, n);
                })("set", t, e._path, !1);
            const n = new l();
            vs(
                e._repo,
                e._path,
                t,
                null,
                n.wrapCallback(() => {})
            ),
                n.promise;
        })(
            ((Fs = (function (
                e = (function (e = "[DEFAULT]") {
                    const t = re.get(e);
                    if (!t) throw le.create("no-app", { appName: e });
                    return t;
                })(),
                t
            ) {
                return (function (e, t) {
                    const n = e.container
                        .getProvider("heartbeat")
                        .getImmediate({ optional: !0 });
                    return (
                        n && n.triggerHeartbeat(), e.container.getProvider(t)
                    );
                })(e, "database").getImmediate({ identifier: t });
            })()),
            (qs = "integer/10"),
            (Fs = S(Fs))._checkNotDeleted("ref"),
            void 0 !== qs
                ? (function (e, t) {
                      var n, i, s, r;
                      return (
                          null === Tt((e = S(e))._path)
                              ? ((n = "child"),
                                (i = "path"),
                                (r = !1),
                                (s = t) &&
                                    (s = s.replace(/^\/*\.info(\/|$)/, "/")),
                                os(n, i, s, r))
                              : os("child", "path", t, !1),
                          new As(e._repo, Pt(e._path, t))
                      );
                  })(Fs._root, qs)
                : Fs._root),
            { int: "10" }
        );
})();
