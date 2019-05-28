define("core/core", [], function () {
    var t = {Config: {debug: "@DEBUG@"}, version: "undefined@", appEnv: "Env", data: {}, APP: {}};
    window.MoGu = window.MoGu || {}, $.extend(window.MoGu, t)
}), define("core/error", ["$", "./core"], function (t) {
    return t.extend(MoGu, {
        error: function (t) {
            console && console.log(t)
        }
    }), MoGu
}), define("fnExtend", ["$"], function () {
    return {
        alert: function () {
            console.log(123)
        }
    }
}), define("fn/fn", ["$", "fnExtend"], function (t, e) {
    return MoGu.fn = {
        set: function (t, e) {
            MoGu.App[t] && MoGu.error(t + "\u5305\u5c06\u88ab\u66ff\u6362"), MoGu.App[t] = e
        }, get: function (t) {
            return MoGu.App[t] || !1
        }, parseUrl: function (t, e) {
            return e = e || ["?", "&", "="], {key: value}
        }
    }, t.extend(MoGu.fn, e), MoGu
}), define("uiExtend", [], function () {
    return {
        alertUi: function () {
            alert(123)
        }
    }
}), define("lib/doT", [], function () {
    function t() {
        var t = {"&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;"},
            e = /&(?!#?\w+;)|<|>|"|'|\//g;
        return function () {
            return this ? this.replace(e, function (e) {
                return t[e] || e
            }) : this
        }
    }

    function e(t, n, r) {
        return ("string" == typeof n ? n : n.toString()).replace(t.define || o, function (e, n, i, o) {
            return 0 === n.indexOf("def.") && (n = n.substring(4)), n in r || (":" === i ? (t.defineParams && o.replace(t.defineParams, function (t, e, i) {
                r[n] = {arg: e, text: i}
            }), n in r || (r[n] = o)) : new Function("def", "def['" + n + "']=" + o)(r)), ""
        }).replace(t.use || o, function (n, i) {
            t.useParams && (i = i.replace(t.useParams, function (t, e, n, i) {
                if (r[n] && r[n].arg && i) {
                    var o = (n + ":" + i).replace(/'|\\/g, "_");
                    return r.__exp = r.__exp || {}, r.__exp[o] = r[n].text.replace(new RegExp("(^|[^\\w$])" + r[n].arg + "([^\\w$])", "g"), "$1" + i + "$2"), e + "def.__exp['" + o + "']"
                }
            }));
            var o = new Function("def", "return " + i)(r);
            return o ? e(t, o, r) : o
        })
    }

    function n(t) {
        return t.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
    }

    var r = {
        version: "1.0.1",
        templateSettings: {
            evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode: /\{\{!([\s\S]+?)\}\}/g,
            use: /\{\{#([\s\S]+?)\}\}/g,
            useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams: /^\s*([\w$]+):([\s\S]+)/,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname: "it",
            strip: !0,
            append: !0,
            selfcontained: !1
        },
        template: void 0,
        compile: void 0
    };
    String.prototype.encodeHTML = t();
    var i = {
        append: {start: "'+(", end: ")+'", endencode: "||'').toString().encodeHTML()+'"},
        split: {start: "';out+=(", end: ");out+='", endencode: "||'').toString().encodeHTML();out+='"}
    }, o = /$^/;
    return r.template = function (s, a, u) {
        a = a || r.templateSettings;
        var c, l, f = a.append ? i.append : i.split, h = 0, d = a.use || a.define ? e(a, s, u || {}) : s;
        d = ("var out='" + (a.strip ? d.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : d).replace(/'|\\/g, "\\$&").replace(a.interpolate || o, function (t, e) {
            return f.start + n(e) + f.end
        }).replace(a.encode || o, function (t, e) {
            return c = !0, f.start + n(e) + f.endencode
        }).replace(a.conditional || o, function (t, e, r) {
            return e ? r ? "';}else if(" + n(r) + "){out+='" : "';}else{out+='" : r ? "';if(" + n(r) + "){out+='" : "';}out+='"
        }).replace(a.iterate || o, function (t, e, r, i) {
            return e ? (h += 1, l = i || "i" + h, e = n(e), "';var arr" + h + "=" + e + ";if(arr" + h + "){var " + r + "," + l + "=-1,l" + h + "=arr" + h + ".length-1;while(" + l + "<l" + h + "){" + r + "=arr" + h + "[" + l + "+=1];out+='") : "';} } out+='"
        }).replace(a.evaluate || o, function (t, e) {
            return "';" + n(e) + "out+='"
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "").replace(/(\s|;|\}|^|\{)out\+=''\+/g, "$1out+="), c && a.selfcontained && (d = "String.prototype.encodeHTML=(" + t.toString() + "());" + d);
        try {
            return new Function(a.varname, d)
        } catch (p) {
            throw"undefined" != typeof console && console.log("Could not create a template function: " + d), p
        }
    }, r.compile = function (t, e) {
        return r.template(t, null, e)
    }, r
}), define("ui/ui", ["$", "uiExtend", "../lib/doT"], function (t, e, n) {
    return MoGu.ui = {
        showMask: function () {
            t("#M_Mask").show()
        }, hideMask: function () {
            t("#M_Mask").hide()
        }, showLoading: function () {
            t("#M_Loading").show()
        }, hideMask: function () {
            t("#M_Loading").hide()
        }, goTop: function () {
        }, getTemplate: function (t, e) {
            try {
                return n.template(t)(e)
            } catch (r) {
                return r
            }
        }, getdoT: function () {
            return n
        }
    }, t.extend(MoGu.ui, e), MoGu
}), define("lib/store.js", [], function () {
    function t() {
        try {
            return a in i && i[a]
        } catch (t) {
            return !1
        }
    }

    function e(t) {
        return function () {
            var e = Array.prototype.slice.call(arguments, 0);
            e.unshift(r), c.appendChild(r), r.addBehavior("#default#userData"), r.load(a);
            var n = t.apply(o, e);
            return c.removeChild(r), n
        }
    }

    function n(t) {
        return t.replace(h, "___")
    }

    var r, i = window, o = {}, s = i.document, a = "localStorage", u = "__storejs__";
    if (o.disabled = !1, o.set = function () {
    }, o.get = function () {
    }, o.remove = function () {
    }, o.clear = function () {
    }, o.transact = function (t, e, n) {
        var r = o.get(t);
        null == n && (n = e, e = null), "undefined" == typeof r && (r = e || {}), n(r), o.set(t, r)
    }, o.getAll = function () {
    }, o.serialize = function (t) {
        return JSON.stringify(t)
    }, o.deserialize = function (t) {
        if ("string" == typeof t) try {
            return JSON.parse(t)
        } catch (e) {
            return t || void 0
        }
    }, t()) r = i[a], o.set = function (t, e) {
        return void 0 === e ? o.remove(t) : (r.setItem(t, o.serialize(e)), e)
    }, o.get = function (t) {
        return o.deserialize(r.getItem(t))
    }, o.remove = function (t) {
        r.removeItem(t)
    }, o.clear = function () {
        r.clear()
    }, o.getAll = function () {
        for (var t = {}, e = 0; e < r.length; ++e) {
            var n = r.key(e);
            t[n] = o.get(n)
        }
        return t
    }; else if (s.documentElement.addBehavior) {
        var c, l;
        try {
            l = new ActiveXObject("htmlfile"), l.open(), l.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'), l.close(), c = l.w.frames[0].document, r = c.createElement("div")
        } catch (f) {
            r = s.createElement("div"), c = s.body
        }
        var h = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        o.set = e(function (t, e, r) {
            return e = n(e), void 0 === r ? o.remove(e) : (t.setAttribute(e, o.serialize(r)), t.save(a), r)
        }), o.get = e(function (t, e) {
            return e = n(e), o.deserialize(t.getAttribute(e))
        }), o.remove = e(function (t, e) {
            e = n(e), t.removeAttribute(e), t.save(a)
        }), o.clear = e(function (t) {
            var e = t.XMLDocument.documentElement.attributes;
            t.load(a);
            for (var n, r = 0; n = e[r]; r++) t.removeAttribute(n.name);
            t.save(a)
        }), o.getAll = e(function (t) {
            for (var e, r = t.XMLDocument.documentElement.attributes, i = {}, s = 0; e = r[s]; ++s) {
                var a = n(e.name);
                i[e.name] = o.deserialize(t.getAttribute(a))
            }
            return i
        })
    }
    try {
        o.set(u, u), o.get(u) != u && (o.disabled = !0), o.remove(u)
    } catch (f) {
        o.disabled = !0
    }
    return o.enabled = !o.disabled, o
}), define("utilExtend", ["./lib/store.js"], function (t) {
    return {
        inputTextHide: function (t, e) {
            t.focus(function () {
                var t = $(this);
                $.trim(t.val()) == $.trim(t.attr("def-v")) && t.val(""), e && t.addClass(e)
            }), t.blur(function () {
                var t = $(this);
                "" == $.trim(t.val()) && (t.val(t.attr("def-v")), e && t.removeClass(e))
            })
        }, getStore: function () {
            return t
        }
    }
}), define("util/util", ["$", "utilExtend"], function (t, e) {
    return MoGu.util = {
        setCookie: function (t, e, n) {
            n = n || {}, null === e && (e = "", n.expires = -1);
            var r = "";
            if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
                var i;
                "number" == typeof n.expires ? (i = new Date, i.setTime(i.getTime() + 864e5 * n.expires)) : i = n.expires, r = "; expires=" + i.toUTCString()
            }
            var o = n.path ? "; path=" + n.path : "", s = n.secure ? "; secure" : "", a = "";
            n.domain ? a = "; domain=" + n.domain : (a = document.domain.toString().split("."), a = "; domain=." + a[1] + "." + a[2]), document.cookie = [t, "=", encodeURIComponent(e), r, o, a, s].join("")
        }, getCookie: function (t) {
            var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
            return null !== e ? decodeURIComponent(e[2]) : ""
        }, removeCookie: function (t) {
            MGTOOL.setCookie(t, null, {expires: -1})
        }
    }, t.extend(MoGu.util, e), MoGu
}), define("mvc/modules/newModule", ["$"], function (t) {
    return function (e) {
        var n = {
            isAutoInit: !0, isAutoRender: !0, initialize: function () {
                this.isAutoInit && (this.$el ? "string" == typeof this.$el ? this.$el = t(this.$el).length ? t(this.$el) : this._greatElem(this.$el) : this.$el instanceof t && !this.$el.length && (this.$el = this._greatElem(this.$el)) : MoGu.error("\u6ca1\u6709\u4f20\u5165 DOM \u8282\u70b9"), this.addEvent(), this.isAutoRender && this.model.data && (this.data = this.model.data))
            }, _greatElem: function (e) {
                var n = e, r = 'id="';
                return e instanceof t && (n = e.selector), 0 === n.indexOf(".") && (r = 'class="'), t("#view").append("<div " + r + n + '" ></div>'), t(n)
            }, _getParam: function (e, n) {
                var r = [];
                return clickArr = e.split(" "), (executeFn = this[n]) ? (t.each(clickArr, function (t, e) {
                    r.push(e)
                }), r.push(executeFn), r) : (MoGu.error(e + "\u6ca1\u6709\u6307\u5b9a \u76d1\u542c\u7684\u56de\u8c03\u51fd\u6570"), r)
            }, addEvent: function () {
                for (var t in this.event) {
                    var e = this._getParam(t, this.event[t]);
                    this.$el.on.apply(this.$el, e)
                }
            }, trigger: function (e, n) {
                var r = this.triggerCache[e];
                if (r) {
                    var i = r[0], o = r.length > 1 ? t(r[0]) : this.el;
                    o.trigger(i, n)
                } else MoGu.error(e + "\u89e6\u53d1\u4e86\u4e00\u4e2a\u4e0d\u5b58\u5728\u7684\u4e8b\u4ef6")
            }, getData: function () {
                return t.ajax({
                    url: this.model.url,
                    type: this.model.type || "POST",
                    dataType: this.model.dataType || "json",
                    data: this.model.data || {}
                })
            }, _updateElDom: function (t) {
                var e = t || this.data, n = MoGu.ui.getTemplate(this.template, e);
                this.$el.html(n)
            }, render: function () {
                var t = this;
                return t.template ? t.data ? void t._updateElDom() : t.getData().done(function (e) {
                    t._updateElDom(e)
                }) : void MoGu.error("\u6ca1\u6709\u6307\u5b9a\u6a21\u677f")
            }
        }, r = function () {
        };
        return r.prototype = t.extend({}, n, e), r
    }
}), define("mvc/modules/module", ["./newModule"], function (t) {
    return {
        extend: function (e) {
            var n = t(e), r = new n;
            return r
        }
    }
}), define("mvc/router/events", ["$"], function (t) {
    var e = 0, n = function (t) {
        var n = ++e + "";
        return t ? t + n : n
    }, r = function (t) {
        var e, n = !1;
        return function () {
            return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
        }
    }, i = {
        on: function (t, e, n) {
            if (!eventsApi(this, "on", t, [e, n]) || !e) return this;
            this._events || (this._events = {});
            var r = this._events[t] || (this._events[t] = []);
            return r.push({callback: e, context: n, ctx: n || this}), this
        }, once: function (t, e, n) {
            if (!eventsApi(this, "once", t, [e, n]) || !e) return this;
            var i = this, o = r(function () {
                i.off(t, o), e.apply(this, arguments)
            });
            return o._callback = e, this.on(t, o, n)
        }, off: function (t, e, n) {
            if (!this._events || !eventsApi(this, "off", t, [e, n])) return this;
            if (!t && !e && !n) return this._events = void 0, this;
            for (var r = t ? [t] : Object.keys(this._events), i = 0, o = r.length; o > i; i++) {
                t = r[i];
                var s = this._events[t];
                if (s) if (e || n) {
                    for (var a = [], u = 0, c = s.length; c > u; u++) {
                        var l = s[u];
                        (e && e !== l.callback && e !== l.callback._callback || n && n !== l.context) && a.push(l)
                    }
                    a.length ? this._events[t] = a : delete this._events[t]
                } else delete this._events[t]
            }
            return this
        }, trigger: function (t) {
            if (!this._events) return this;
            var e = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", t, e)) return this;
            var n = this._events[t], r = this._events.all;
            return n && o(n, e), r && o(r, arguments), this
        }, stopListening: function (e, n, r) {
            var i = this._listeningTo;
            if (!i) return this;
            var o = !n && !r;
            r || "object" != typeof n || (r = this), e && ((i = {})[e._listenId] = e);
            for (var s in i) e = i[s], e.off(n, r, this), (o || t.isEmptyObject(e._events)) && delete this._listeningTo[s];
            return this
        }
    }, o = function (t, e) {
        var n, r = -1, i = t.length, o = e[0], s = e[1], a = e[2];
        switch (e.length) {
            case 0:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx);
                return;
            case 1:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx, o);
                return;
            case 2:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx, o, s);
                return;
            case 3:
                for (; ++r < i;) (n = t[r]).callback.call(n.ctx, o, s, a);
                return;
            default:
                for (; ++r < i;) (n = t[r]).callback.apply(n.ctx, e);
                return
        }
    }, s = {listenTo: "on", listenToOnce: "once"};
    return t.each(s, function (t, e) {
        i[t] = function (t, r, i) {
            var o = this._listeningTo || (this._listeningTo = {}), s = t._listenId || (t._listenId = n("l"));
            return o[s] = t, i || "object" != typeof r || (i = this), t[e](r, i, this), this
        }
    }), i.bind = i.on, i.unbind = i.off, i
}), define("mvc/router/history", ["./events"], function (t) {
    var e = /^[#\/]|\s+$/g, n = /^\/+|\/+$/g, r = /#.*$/, i = function () {
        this.handlers = [], "undefined" != typeof window && (this.location = window.location, this.history = window.history)
    };
    return i.started = !1, $.extend(i.prototype, t, {
        atRoot: function () {
            return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
        }, getPath: function () {
            var t = decodeURI(this.location.pathname + this.location.search), e = this.root.slice(0, -1);
            return t.indexOf(e) || (t = t.slice(e.length)), t.slice(1)
        }, getFragment: function (t) {
            return null == t && (this._hasPushState || !this._hasPushState) && (t = this.getPath()), t.replace(e, "")
        }, start: function (t) {
            if (i.started) throw new Error("MOGU.history has already been started");
            i.started = !0, this.options = $.extend({root: "/"}, this.options, t), this.root = this.options.root, this._wantsPushState = !!this.options.pushState, this._hasPushState = this._testPushState();
            var e = this.getFragment();
            return document.documentMode, this.root = ("/" + this.root + "/").replace(n, "/"), this._hasPushState && $(window).on("popstate", this.checkUrl.bind(this)), this.fragment = e, this.location, this.options.silent ? void 0 : this.loadUrl()
        }, stop: function () {
            $(window).off("popstate", this.checkUrl.bind(this)), i.started = !1
        }, route: function (t, e) {
            this.handlers.unshift({route: t, callback: e})
        }, checkUrl: function () {
            var t = this.getFragment();
            return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
        }, loadUrl: function (t) {
            return t = this.fragment = this.getFragment(t), this.handlers.some(function (e) {
                return e.route.test(t) ? (e.callback(t), !0) : void 0
            })
        }, navigate: function (t, e) {
            if (!i.started) return !1;
            void 0 === e && (e = !0), e && e !== !0 || (e = {trigger: !!e});
            var n = this.root + (t = this.getFragment(t || ""));
            return t = t.replace(r, ""), this.fragment !== t ? (this.fragment = t, "" === t && "/" !== n && (n = n.slice(0, -1)), this._hasPushState ? (this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n), e.trigger ? this.loadUrl(t) : void 0) : this.location.assign(n)) : void 0
        }, _testPushState: function () {
            var t = !!(this.options.pushState && this.history && this.history.pushState);
            if (t) {
                var e = document.URL;
                return this.history.replaceState({}, document.title, "pushState"), e !== document.location.href ? (this.history.replaceState({}, document.title, e), !0) : !1
            }
            return !1
        }
    }), i
}), define("mvc/router/router", ["./history", "./events", "$"], function (t, e, n) {
    var r = {};
    r.history = new t, n.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t, e) {
        r["is" + e] = function (t) {
            return toString.call(t) == "[object " + e + "]"
        }
    });
    var i = function (t) {
        t || (t = {}), n.extend(this, t), this._bindRoutes(), this.initialize.apply(this, arguments), r.history.start(t.start)
    }, o = /\((.*?)\)/g, s = /(\(\?)?:\w+/g, a = /\*\w+/g, u = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    return n.extend(i.prototype, e, {
        initialize: function () {
        }, route: function (t, e, n) {
            r.isRegExp(t) || (t = this._routeToRegExp(t)), r.isFunction(e) && (n = e, e = ""), n || (n = this.routeFn[e]);
            var i = this;
            return r.history.route(t, function (o) {
                var s = i._extractParameters(t, o);
                i.execute(n, s), i.trigger.apply(i, ["route:" + e].concat(s)), i.trigger("route", e, s), r.history.trigger("route", i, e, s)
            }), this
        }, execute: function (t, e) {
            t && t.apply(this, e)
        }, navigate: function (t, e) {
            return r.history.navigate(t, e), this
        }, _bindRoutes: function () {
            if (this.routes) for (var t, e = Object.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
        }, _routeToRegExp: function (t) {
            return t = t.replace(u, "\\$&").replace(o, "(?:$1)?").replace(s, function (t, e) {
                return e ? t : "([^/?]+)"
            }).replace(a, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        }, _extractParameters: function (t, e) {
            var n = t.exec(e).slice(1);
            return n.map(function (t, e) {
                return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
            })
        }
    }), i
}), define("mvc/base", ["../core/core", "./modules/module", "./router/router"], function (t, e, n) {
    $.extend(MoGu, {module: e, router: n})
}), require(["./core/core", "./core/error", "./fn/fn", "./ui/ui", "./util/util", "./mvc/base"]), define("base/MoGu", ["core/core", "core/error", "fn/fn", "ui/ui", "util/util"], function () {
    return window.MoGu
});
!function () {
    "use strict";

    function e(n, t, r) {
        return ("string" == typeof t ? t : t.toString()).replace(n.define || a, function (e, t, o, a) {
            return 0 === t.indexOf("def.") && (t = t.substring(4)), t in r || (":" === o ? (n.defineParams && a.replace(n.defineParams, function (e, n, o) {
                r[t] = {arg: n, text: o}
            }), t in r || (r[t] = a)) : new Function("def", "def['" + t + "']=" + a)(r)), ""
        }).replace(n.use || a, function (t, o) {
            n.useParams && (o = o.replace(n.useParams, function (e, n, t, o) {
                if (r[t] && r[t].arg && o) {
                    var a = (t + ":" + o).replace(/'|\\/g, "_");
                    return r.__exp = r.__exp || {}, r.__exp[a] = r[t].text.replace(new RegExp("(^|[^\\w$])" + r[t].arg + "([^\\w$])", "g"), "$1" + o + "$2"), n + "def.__exp['" + a + "']"
                }
            }));
            var a = new Function("def", "return " + o)(r);
            return a ? e(n, a, r) : a
        })
    }

    function n(e) {
        return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
    }

    var t, r = {
        version: "1.0.3",
        templateSettings: {
            evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode: /\{\{!([\s\S]+?)\}\}/g,
            use: /\{\{#([\s\S]+?)\}\}/g,
            useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams: /^\s*([\w$]+):([\s\S]+)/,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname: "it",
            strip: !0,
            append: !0,
            selfcontained: !1,
            doNotSkipEncoded: !1
        },
        template: void 0,
        compile: void 0,
        log: !0
    };
    r.encodeHTMLSource = function (e) {
        var n = {"&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;"},
            t = e ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
        return function (e) {
            return e ? e.toString().replace(t, function (e) {
                return n[e] || e
            }) : ""
        }
    }, t = function () {
        return this || (0, eval)("this")
    }(), "undefined" != typeof M && M.lib ? M.lib.doT = r : t.doT = r;
    var o = {
        append: {start: "'+(", end: ")+'", startencode: "'+encodeHTML("},
        split: {start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML("}
    }, a = /$^/;
    r.template = function (c, i, u) {
        i = i || r.templateSettings;
        var s, d, l = i.append ? o.append : o.split, p = 0, f = i.use || i.define ? e(i, c, u || {}) : c;
        f = ("var out='" + (i.strip ? f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : f).replace(/'|\\/g, "\\$&").replace(i.interpolate || a, function (e, t) {
            return l.start + n(t) + l.end
        }).replace(i.encode || a, function (e, t) {
            return s = !0, l.startencode + n(t) + l.end
        }).replace(i.conditional || a, function (e, t, r) {
            return t ? r ? "';}else if(" + n(r) + "){out+='" : "';}else{out+='" : r ? "';if(" + n(r) + "){out+='" : "';}out+='"
        }).replace(i.iterate || a, function (e, t, r, o) {
            return t ? (p += 1, d = o || "i" + p, t = n(t), "';var arr" + p + "=" + t + ";if(arr" + p + "){var " + r + "," + d + "=-1,l" + p + "=arr" + p + ".length-1;while(" + d + "<l" + p + "){" + r + "=arr" + p + "[" + d + "+=1];out+='") : "';} } out+='"
        }).replace(i.evaluate || a, function (e, t) {
            return "';" + n(t) + "out+='"
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), s && (i.selfcontained || !t || t._encodeHTML || (t._encodeHTML = r.encodeHTMLSource(i.doNotSkipEncoded)), f = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + r.encodeHTMLSource.toString() + "(" + (i.doNotSkipEncoded || "") + "));" + f);
        try {
            return new Function(i.varname, f)
        } catch (g) {
            throw"undefined" != typeof console && console.log("Could not create a template function: " + f), g
        }
    }, r.compile = function (e, n) {
        return r.template(e, null, n)
    }
}();
!function (e, t, n) {
    t.MGTOOL = {}, e.extend(MGTOOL, {
        byteLength: function (e) {
            var t = e.match(/[^\x00-\x80]/g);
            return e.length + (t ? t.length : 0)
        }, jsMbSubstr: function (e, t) {
            if (!e || !t) return "";
            var n = 0, o = 0, r = "", i = e.length;
            for (o = 0; i > o; o++) {
                if (n = e.charCodeAt(o) > 255 ? n += 2 : ++n, n > 2 * t) return r;
                r += e.charAt(o)
            }
            return e
        }, formatMoney: function (e, t, n) {
            if (t = MGTOOL.empty(e) ? "2" : t, MGTOOL.empty(n)) return e.toFixed(t);
            var o = 0 > e ? "-" : "", r = parseInt(e = Math.abs(+e || 0).toFixed(t), 10) + "",
                i = (i = r.length) > 3 ? i % 3 : 0;
            return o + (i ? r.substr(0, i) + n : "") + r.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + n) + (t ? "." + Math.abs(e - r).toFixed(t).slice(2) : "")
        }
    }), e.extend(MGTOOL, {
        emptyObj: function (e) {
            for (var t in e) return !1;
            return !0
        }, empty: function (e) {
            return null == e || 0 === e.length
        }, objToJson: function (e) {
            return JSON.stringify(e)
        }
    }), e.extend(MGTOOL, {
        setCookie: function (e, t, n) {
            n = n || {}, null === t && (t = "", n.expires = -1);
            var o = "";
            if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
                var r;
                "number" == typeof n.expires ? (r = new Date, r.setTime(r.getTime() + 864e5 * n.expires)) : r = n.expires, o = "; expires=" + r.toUTCString()
            }
            var i = n.path ? "; path=" + n.path : "", u = n.secure ? "; secure" : "", a = "";
            n.domain ? a = "; domain=" + n.domain : (a = document.domain.toString().split("."), a = "; domain=." + a[1] + "." + a[2]), document.cookie = [e, "=", encodeURIComponent(t), o, i, a, u].join("")
        }, getCookie: function (e) {
            var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
            return null !== t ? decodeURIComponent(t[2]) : ""
        }, removeCookie: function (e) {
            MGTOOL.setCookie(e, null, {expires: -1})
        }, setCacheCookie: function (t, n, o, r) {
            o = o || {}, null === n && (n = "");
            var i = "undefined" == typeof r ? MGTOOL.getCookie("__mgjuuid") : r;
            e.ajax({
                url: "/collect/uedcookie",
                type: "POST",
                timeout: 6e4,
                data: {cookiename: t, uuid: i, type: "set", value: n, lifetime: 86400 * o.expires},
                dataType: "json",
                success: function (e) {
                    "" === e && alert(MGLANG.msgTimeout)
                }
            })
        }, getCacheCookie: function (t, n) {
            var o = "undefined" == typeof n ? MGTOOL.getCookie("__mgjuuid") : n, r = "";
            return e.ajax({
                url: "/collect/uedcookie",
                type: "POST",
                timeout: 6e4,
                async: !1,
                data: {cookiename: t, uuid: o, type: "get"},
                dataType: "json",
                success: function (e) {
                    var t = e.status.code;
                    e.status.msg;
                    if (1001 == t) {
                        var n = e.result.data.value;
                        r = n
                    } else alert(MGLANG.msgTimeout)
                }
            }), r
        }
    }), e.extend(MGTOOL, {
        getQueryString: function (e, t) {
            t = "undefined" != typeof t ? t : location.href;
            var n = new RegExp("(^|\\?|&)" + e + "=([^&]*)(\\s|&|$)", "i");
            return n.test(t) ? RegExp.$2.replace(/\+/g, " ") : ""
        }, getPicExtension: function (e) {
            return /(.+)\.(.+)/.exec(e) ? RegExp.$2 : ""
        }, filterDomain: function (e) {
            var t = /http:\/\/[^\/]+/;
            return e.replace(t, "")
        }
    }), e.extend(MGTOOL, {
        throttleM: {
            isLoading: !1, throttoleXhr: function (e, t) {
                var n = this;
                if (!n.isLoading) {
                    t = t || 500, n.isLoading = !0;
                    var o = e();
                    o.complete = function () {
                        setTimeout(function () {
                            n.isLoading = !1
                        }, t)
                    }
                }
            }
        }
    }), e.extend(MGTOOL, {
        getMsgLength: function (e) {
            var t = e.length;
            if (t > 0) {
                for (var n = 41, o = 140, r = 24, i = e, u = e.match(/http[s]?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\/,:;@&=\?\~\#\%]*)*/gi) || [], a = 0, s = 0, c = u.length; c > s; s++) {
                    var g = MGTOOL.byteLength(u[s]);
                    /^(http:\/\/mogujie.cn)/.test(u[s]) || (a += /^(http:\/\/)+(mogujie.cn|mogujie.com)/.test(u[s]) && n >= g ? g : o >= g ? r : g - o + r, i = i.replace(u[s], ""))
                }
                return Math.ceil((a + MGTOOL.byteLength(i)) / 2)
            }
            return 0
        }, getAbsoluteLocation: function (n) {
            if (1 !== arguments.length || null === n) return null;
            var o = e(n), r = o.offset(), i = r.top, u = r.left, a = o.height(), s = e(t).height(),
                c = e(document).scrollTop(), g = i >= c && c + s >= i, l = i + a + 200 >= c && c + s >= i - 400;
            return {absoluteTop: i, absoluteLeft: u, isInView: g, isLoad: l}
        }, distance2Bottom: function (n) {
            var o = e(document), r = e(t), i = o.scrollTop(), u = r.height(), a = o.height();
            return i + u + n >= a
        }, isParent: function (e, t) {
            for (; e !== n && null !== e && "BODY" != e.tagName.toUpperCase();) {
                if (e == t) return !0;
                e = e.parentNode
            }
            return !1
        }, template: function (e, t) {
            return doT.template(e)(t)
        }, log: function (e) {
            t.console !== n && console.log(e)
        }, dataFormat: function (e, t) {
            var n = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "h+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var o in n) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[o] : ("00" + n[o]).substr(("" + n[o]).length)));
            return t
        }
    }), e.extend(MGTOOL, {
        trim: function (t) {
            return e.trim(t)
        }, getRequest: function (e, t) {
            return this.getQueryString(e, t)
        }
    })
}(jQuery, window);
var MOGU = MOGU || {};
!function (t) {
    MOGU.Globe_Textarea_Auto_Height = function (e) {
        var o = e.height(), i = function () {
            0 > o && (o = e.height()), (t.browser.mozilla || t.browser.safari) && e.height(o);
            var i = e[0].scrollHeight, n = o > i ? o : i;
            n = 1.5 * o > n ? o : i, e.height(n)
        };
        e.bind("keyup", i).bind("input", i).bind("propertychange", i).bind("focus", i)
    }, MOGU.Globe_Goods_URL_Support = function (t) {
        var e = /item(.[\w]+)?.taobao.com\/(.?)[item.htm|item_num_id|item_detail|itemID|item_id|default_item_id]/i,
            o = /detail.tmall/i, i = /auction\d?.paipai.com/i, n = /buy.caomeipai.com\/goods/i,
            a = /www.360buy.com\/product/i, c = /product.dangdang.com\/Product.aspx\?product_id=/i,
            r = /book.360buy.com/i, s = /www.vancl.com\/StyleDetail/i, u = /www.vancl.com\/Product/i,
            l = /vt.vancl.com\/item/i, d = /item.vancl.com\/\d+/i, m = /item.vt.vancl.com\/\d+/i,
            w = /(mbaobao.com\/pshow)|(mbaobao.com\/item)/i, f = /item.buy.qq.com\/item/i,
            _ = /[www|us].topshop.com\/webapp\/wcs\/stores\/servlet\/ProductDisplay/i, b = /quwan.com\/goods/i,
            h = /nala.com.cn\/product/i, p = /maymay.cn\/pitem/i, v = /asos.com/i, g = /www.100f1.com\/ProductInfo_/i,
            y = /www.gaojie.com\/product/i, G = /a.m.taobao.com\/i/i, O = /www.51yugou.com\//i, M = /www.1mall.com\//i,
            U = /www.yihaodian.com\//i, k = /www.xipin.me\//i, j = /www.nuandao.com\//i, x = /www.rosebeauty.com.cn\//i,
            L = /www.hmeili.com\//i, T = /www.yueji.com\//i, C = /www.yougou.com\//i, S = /cn.shopbop.com\//i,
            I = /item.jd.com\//i, P = /[www|shop].mogujie.com(.*)\/detail/i;
        return e.test(t) || o.test(t) || r.test(t) || a.test(t) || i.test(t) || n.test(t) || c.test(t) || s.test(t) || u.test(t) || l.test(t) || d.test(t) || m.test(t) || w.test(t) || _.test(t) || b.test(t) || h.test(t) || p.test(t) || v.test(t) || g.test(t) || y.test(t) || f.test(t) || G.test(t) || O.test(t) || U.test(t) || k.test(t) || j.test(t) || x.test(t) || L.test(t) || T.test(t) || C.test(t) || M.test(t) || S.test(t) || I.test(t) || P.test(t)
    }, MOGU.Globe_Input_Text = function (e, o) {
        o = o || e.val(), e.focus(function () {
            var e = t(this);
            t.trim(e.val()) == o && e.val(""), e.css("color", "#000")
        }), e.blur(function () {
            var e = t(this);
            "" == t.trim(e.val()) && (e.val(o), e.css("color", "#ccc"))
        })
    }, MOGU.Globe_Input_Text_Hide = function (e) {
        e.focus(function () {
            var e = t(this);
            t.trim(e.val()) == t.trim(e.attr("def-v")) && e.val(""), e.css("color", "#000")
        }), e.blur(function () {
            var e = t(this);
            "" == t.trim(e.val()) && (e.val(e.attr("def-v")), e.css("color", "#ccc"))
        })
    }, MOGU.WB_Word_Count = function (e, o, i) {
        var n = i ? i : 140;
        if (t("#" + e)[0]) {
            var a = function () {
                var i = 0;
                i = o ? MGTOOL.getMsgLength(t("#" + o).val()) : MGTOOL.getMsgLength(t("#" + e).find(".pub_txt").val());
                var a = n - i;
                0 == i ? t("#" + e).find(".word_count").html(n) : i > n ? (t("#" + e).find(".word_count_wrap").html('\u60a8\u5df2\u8d85\u8fc7<em class="word_count"></em>\u4e2a\u5b57').find(".word_count").html(Math.abs(a)), t("#" + e).find(".word_count_wrap").show(), t("#" + e).find(".word_count").addClass("out")) : (t("#" + e).find(".word_count_wrap").html('\u8fd8\u53ef\u4ee5\u8f93\u5165<em class="word_count"></em>\u4e2a\u5b57').find(".word_count").html(a), t("#" + e).find(".word_count").removeClass("out"))
            };
            o ? t("#" + o).bind("keyup", a).bind("input", a).bind("propertychange", a) : t("#" + e).find(".pub_txt").bind("keyup", a).bind("input", a).bind("propertychange", a)
        }
    }, MOGU.Globe_Range_Input = function (t) {
        if (t[0].createTextRange) {
            var e = t[0].createTextRange();
            e.moveEnd("character", t.val().length), e.moveStart("character", t.val().length), e.select()
        } else t[0].setSelectionRange(t.val().length, t.val().length), t.focus()
    }, MOGU.Globe_Check_Login = function () {
        return "" == MOGUPROFILE.userid ? (MOGU.user_handsome_login_init(), MOGU.user_handsome_login(), !1) : !0
    }, MOGU.Globe_Short_Link_From = function () {
        t(".mg_slink").live("click", function () {
            var e = window.location.toString();
            if (!(e.indexOf("is_qzone=1") >= 0)) {
                var o = this, i = o.href, n = t(o).attr("s"), a = t(o).attr("c");
                "" == a && (a = MOGUPROFILE.userid);
                var c = i, r = "";
                r = -1 == i.indexOf("?") ? "?c=" + a + "&s=" + n : "&c=" + a + "&s=" + n, c += r, o.href = c, setTimeout(function () {
                    o.href = i
                }, 500)
            }
        })
    }, MOGU.Globe_Short_Link_From(), MOGU.Globe_Bind_Keybord_Submit = function (e, o, i) {
        i = i || "need_focus", "need_focus" == i && (e.focus(function () {
            t("body").unbind("keydown"), t("body").bind("keydown", function (t) {
                t.ctrlKey && 13 == t.keyCode && o.click()
            })
        }), e.blur(function () {
            t("body").unbind("keydown")
        })), "not_need_focus" == i && t(document).bind("keydown", function (e) {
            e.ctrlKey && 13 == e.keyCode && (o.click(), t("body").unbind("keydown"))
        })
    }, MOGU.GLobe_GetObj_Length = function (t) {
        var e, o = 0;
        for (e in t) t.hasOwnProperty(e) && o++;
        return o
    }, MOGU.Empty_Message_Tip = function (t) {
        var e = t ? t : {}, o = e.pub_obj, i = null, n = 0;
        i = setInterval(function () {
            n++, 6 == n ? (clearInterval(i), o.focus()) : n % 2 == 0 ? o.addClass("empty_tip") : o.removeClass("empty_tip")
        }, 120)
    }, MOGU.Defult_Post_data = function (e) {
        if (e instanceof jQuery || (e = t(e)), e.hasClass("disable")) return !1;
        e.addClass("disable");
        var o = e.data(), i = o.url || "";
        if ("" !== i) {
            var n = function (t) {
                1001 === t.status.code ? window.location.reload() : alert(t.status.msg)
            };
            jQuery.ajax({
                url: i, type: "POST", dataType: "json", data: o, complete: function () {
                    e.removeClass("disable")
                }, success: function (t) {
                    n(t)
                }
            })
        }
    }, MOGU.Globe_Trace_Log = function (t) {
    }, t.fn.serializeObject = function () {
        var e = {}, o = this.serializeArray();
        return t.each(o, function () {
            void 0 !== e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
        }), e
    }, MOGU.SerializeFormObject = function (t) {
        t.serializeObject()
    }
}(jQuery), $(function () {
    $(document).off("click", ".__trace__").on("click", ".__trace__", function (t) {
        var e = $(this).attr("data-trace");
        e && MOGU.Globe_Trace_Log(e)
    })
}), function () {
    for (var t, e = function () {
    }, o = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], i = o.length, n = window.console = window.console || {}; i--;) t = o[i], n[t] || (n[t] = e)
}();
!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("pc/common/login/index", [], e) : "object" == typeof exports ? exports["pc/common/login/index"] = e() : t["pc/common/login/index"] = e()
}(this, function () {
    return function (t) {
        function e(n) {
            if (i[n]) return i[n].exports;
            var r = i[n] = {exports: {}, id: n, loaded: !1};
            return t[n].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
        }

        var i = {};
        return e.m = t, e.c = i, e.p = "", e(0)
    }([function (t, e, i) {
        "use strict";
        var n = i(1), r = i(2), s = i(3), o = i(11), a = {}, h = "lb_login", c = {
            init: function () {
                M && M.fn && M.fn.setCookie && M.fn.setCookie("__mgjref", window.location.href || "", {domain: ".mogujie.com"}), $(".light_box").remove(), this.newLightbox()
            }, newLightbox: function () {
                var t = {title: "\u767b\u5f55\u8611\u83c7\u8857", lightBoxId: h, contentHtml: o, scroll: !0};
                a = new n(t), a.init()
            }
        }, u = {
            init: function (t, e) {
                var i = this;
                MOGU.Globe_Bind_Keybord_Submit("", $("#" + h + " .login_btn"), "not_need_focus"), r.CHECK.FixIe6Bug();
                var n = $("#lb_login");
                i.EventsOn(n, e), MOGU.Globe_Input_Text_Hide(n.find("input[type=text]"))
            }, EventsOn: function (t, e) {
                t.on("blur", '.lg_name input[name="uname"]', function () {
                    var e, i = $(this), n = MGTOOL.trim(i.val());
                    return "" == n || n == i.attr("def-v") ? !1 : n == i.attr("data-lastname") ? !1 : (r.UI.hideError(t), e = t.find(".lg_form").hasClass("easy_buy") ? 2 : 1, r.CHECK.checkCodeIsShow(t, i, e), void i.attr("data-lastname", i.val()))
                }).on("focus", ".lg_item input", function () {
                    r.UI.hideError(t)
                }).on("click", ".imgcheck_image_div,#imgcheck_code_change", function () {
                    r.UI.hideError(t)
                }).on("click", ".login_title a", function () {
                    var e, i = $(this);
                    return i.hasClass("tab_on") ? !1 : ("" != $("#_content").html() && $("#_content").empty(), r.UI.hideError(t), e = i.hasClass("lo_mod") ? 1 : 2, void r.UI.turnLoginMod(t, e))
                }).on("click", "#get_tel_code", function () {
                    function e(e) {
                        i.addClass("downing").html("\u6b63\u5728\u53d1\u9001\u2026\u2026");
                        var a = {
                            areaCode: $(".country_select").val() || "86",
                            mobile: o,
                            captkey: e || "",
                            nyxNodeId: 7,
                            nyxBusinessId: 3
                        };
                        r.UI.ajaxPost(a, s.LOGIN_GET_CODE, function (e) {
                            1001 === e.status.code ? (i.addClass("downing").html("\u91cd\u65b0\u53d1\u9001(60)"), r.UI.countDownStart(i, n), $("#_content_mask").addClass("layer")) : (i.removeClass("downing").html("\u83b7\u53d6\u624b\u673a\u52a8\u6001\u5bc6\u7801"), 40010003 === e.status.code || 40010004 === e.status.code || $(".imgCheckText").length > 0 ? (r.UI.showError(t, e.status.msg), r.CHECK.showNewImgCheck()) : r.UI.showError(t, e.status.msg))
                        })
                    }

                    var i = $(this), n = 60, o = t.find(".eb_mod_box input[name='uname']").val();
                    return !$("#get_tel_code:visible").length || i.hasClass("downing") ? !1 : /^1\d{10,10}$/.test(o) ? void r.CHECK.imgcheckVerify(t, e) : (r.UI.showError(t, "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"), !1)
                }).on("click", ".lg_login .sub", function (i) {
                    i.preventDefault();
                    var n;
                    n = t.find(".lg_form").hasClass("easy_buy") ? 2 : 1, e.Login_Light_Box = a, r.UI.submitNowForm(t, n, e, i)
                }), $(".ui-ot-btn").click(function () {
                    var e = $(this), i = e.data("type"),
                        n = {third: i, thirdAuth: "qq" === i ? "qqcode" : "wxcode", returnType: 0};
                    r.UI.ajaxPost(n, s.LOGIN_AUTHORIZE, function (e) {
                        1001 == e.status.code ? location.href = e.result.redirect_uri : r.UI.showError(t, e.status.msg)
                    })
                })
            }
        };
        MOGU.user_handsome_login_init = function () {
            c.init()
        }, MOGU.user_handsome_login = function (t, e) {
            u.init(t, e)
        }
    }, function (t, e) {
        "use strict";
        !function (e) {
            window.MGLightBox = function (t) {
                var i = this, n = {
                        title: "",
                        titleLink: "",
                        titleLinkText: "",
                        ajax: !1,
                        lightBoxId: "",
                        contentHtml: "",
                        scroll: !1,
                        isBgClickClose: !0,
                        resizeshow: !0,
                        closeCallBack: function () {
                        }
                    }, r = null,
                    s = '<div id="{id}" class="light_box"><iframe frameborder="0" scrolling="no" class="lb_fix"></iframe>{content}</div>',
                    o = '<table class="lb_wrap clearfix r5"><tbody><tr><td><div class="lb_hd">{title}{title_link}<a href="javascript:;" class="lb_close">\xd7</a></div><div class="lb_bd">{body}</div></td></tr></tbody></table>',
                    a = '<div class="light_box_fullbg"></div>',
                    h = '<table class="lb_info r5"><tbody><tr><td><div class="lb_l">{text}......\uff08<a class="lb_cs" href="javascript:;">\u53d6\u6d88</a>\uff09</div></td></tr></tbody></table>',
                    c = '<table class="lb_info r5"><tbody><tr><td><div class="lb_s">{text}</div></td></tr></tbody></table>',
                    u = '<table class="lb_info r5"><tbody><tr><td><div class="lb_f">{text}</div></td></tr></tbody></table>',
                    l = e.extend(n, t), f = null, d = null, p = null, g = !1, m = function () {
                        var t = (document.documentElement.scrollTop || document.body.scrollTop) + ((document.documentElement.clientHeight || document.body.clientHeight) - f.height()) / 2,
                            e = window.location.toString();
                        return 0 > t ? t = 0 : e.indexOf("is_qzone") > 0 && (t /= 6), t
                    };
                i.getBoxFrame = function () {
                    return f
                }, i.getFrameId = function () {
                    return l.lightBoxId
                }, i.getBackground = function () {
                    return p
                }, i.close = function () {
                    r && r.abort(), f.hide(), l.closeCallBack(), f.remove(), 0 == e(".light_box").size() && p.remove(), e("body").unbind("keydown")
                }, i.hide = function () {
                    f.hide(), p.hide(), e("body").unbind("keydown")
                }, i.show = function () {
                    f.show(), p.show()
                }, i.resize = function () {
                    var t = e(window).width(), i = (t - f.width()) / 2, n = m();
                    if (d.css({
                        width: f.width(),
                        height: f.height()
                    }), e.browser.msie && "6.0" == e.browser.version && p.css("height", document.documentElement.clientHeight || document.body.clientHeight), l.scroll) if (e.browser.msie && "6.0" == e.browser.version) f.css({
                        left: i,
                        top: n
                    }).show(), g || e(window).scroll(function () {
                        var t = m();
                        f.css("top", t)
                    }); else {
                        n = ((document.documentElement.clientHeight || document.body.clientHeight) - f.height()) / 2;
                        var r = window.location.toString();
                        0 > n ? n = 0 : r.indexOf("is_qzone") > 0 && (n /= 6), f.css({
                            left: i,
                            top: n,
                            position: "fixed"
                        }).show()
                    } else f.css({left: i, top: n}).show()
                }, i.init = function () {
                    if ("" != l.lightBoxId) {
                        var t = s.replace(/{id}/g, l.lightBoxId).replace(/{content}/, o);
                        l.title && "" != l.title && (t = t.replace(/{title}/g, '<span class="lb_title">' + l.title + "</span>")), t = "" != l.titleLinkText ? t.replace(/{title_link}/g, '<span class="lb_lnk">\uff08<a href="' + l.titleLink + '" target="_blank">' + l.titleLinkText + "</a>\uff09</span>") : t.replace(/{title_link}/g, ""), t = l.ajax ? t.replace(/{body}/g, "") : t.replace(/{body}/g, l.contentHtml);
                        var n = e(".light_box_fullbg");
                        0 == n.size() ? e("body").append(t + a) : (e("body").append(t), n.eq(0).show()), f = e("#" + l.lightBoxId), d = e(".lb_fix"), p = e(".light_box_fullbg"), l.ajax ? i.loading() : (i.resize(), l.resizeshow && e(window).resize(function () {
                            f.filter(":visible").length <= 0 || i.resize()
                        }), f.find(".lb_close").click(function () {
                            i.close()
                        })), l.isBgClickClose && e(".light_box_fullbg").click(function () {
                            i.close()
                        })
                    }
                }, i.fadeout = function () {
                    r && r.abort(), f.fadeOut(500), p.fadeOut(500, function () {
                        i.close()
                    })
                }, i.startAjax = function (t) {
                    r = t
                }, i.buildContent = function (t) {
                    if (0 == f.find(".lb_wrap").size()) {
                        var n = o.replace(/{body}/, t);
                        l.title && "" != l.title && (n = n.replace(/{title}/g, '<span class="lb_title">' + l.title + "</span>")), n = "" != l.titleLinkText ? n.replace(/{title_link}/g, '<span class="lb_lnk">\uff08<a href="' + l.titleLink + '" target="_blank">' + l.titleLinkText + "</a>\uff09</span>") : n.replace(/{title_link}/g, ""), f.find(".lb_info").after(n).remove(), e("#" + l.lightBoxId + " .lb_close").click(function () {
                            i.close()
                        })
                    } else f.find(".lb_bd").html(t);
                    i.resize()
                }, i.success = function (t) {
                    var e = c.replace(/{text}/, t);
                    f.find(".lb_wrap").after(e).remove(), i.resize(), setTimeout(function () {
                        i.fadeout()
                    }, 1e3)
                }, i.success_close = function (t, e) {
                    var n = c.replace(/{text}/, t);
                    f.find(".lb_wrap").after(n).remove(), i.resize();
                    var e = e || 1e3;
                    setTimeout(function () {
                        i.close()
                    }, e)
                }, i.fail = function (t, e) {
                    var n = u.replace(/{text}/, t);
                    f.find(".lb_wrap").after(n).remove(), i.resize();
                    var e = e || 2e3;
                    setTimeout(function () {
                        i.close()
                    }, e)
                }, i.loading = function (t) {
                    t = t || "\u8bf7\u7a0d\u540e";
                    var e = h.replace(/{text}/, t);
                    f.find(".lb_wrap").after(e).remove(), i.resize(), f.find(".lb_l .lb_cs").click(function () {
                        i.close()
                    }), i.resize()
                }
            }, t.exports = MGLightBox
        }(jQuery)
    }, function (t, e, i) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, r = i(3);
        i(4);
        i(7);
        var s = i(8);
        i(9);
        var o = new JSEncrypt, a = i(10), h = null, c = {
            FixIe6Bug: function () {
                $.browser.msie && "6.0" == $.browser.version && document.execCommand("BackgroundImageCache", !1, !0)
            }, checkCodeIsShow: function (t, e, i) {
                var n = function (e) {
                    if (1001 == e.status.code) switch (e.result.securityLevel) {
                        case 0:
                            $("#lg_chk").length > 0 && $("#lg_chk").remove(), "" != $("#_content").html() && $("#_content").empty(), h = null;
                            break;
                        case 1:
                            u.showError(t, e.result.message);
                            break;
                        case 2:
                        case 6:
                            $("#lg_chk").length > 0 && $("#lg_chk").remove(), $("#imgchecktype").val("new"), c.showNewImgCheck()
                    }
                };
                u.ajaxPost({uname: e.val(), areaCode: "86", nyxBusinessId: 1 === i ? 2 : 3}, r.LOGIN_CONFIG, n)
            }, showNewImgCheck: function () {
                h ? h.refreshImg() : a.init({el: "#_content"}, function (t) {
                    h = t
                })
            }, imgcheckVerify: function (t, e) {
                h ? h.validate(function (i, n) {
                    return i ? void u.showError(t, "\u56fe\u5f62\u9a8c\u8bc1\u7801\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5") : void(n.success ? (u.hideError(t), e(n.capkey)) : u.showError(t, n.msg || "\u8bf7\u70b9\u51fb\u56fe\u5f62\u9a8c\u8bc1\u7801\u65cb\u8f6c\u81f3\u6b63\u5411\u671d\u4e0a"))
                }) : e()
            }, hasImgInstance: function () {
                return !!h
            }
        }, u = {
            ajaxPost: function (t, e, i) {
                $.ajax({
                    url: e, type: "GET", dataType: "jsonp", data: t, success: function (t) {
                        i(t)
                    }
                })
            }, isEncode: function (t) {
                return !(window.decodeURIComponent(t) === t)
            }, parseParam: function (t, e, i) {
                if (null == t) return "";
                var r = [], s = "undefined" == typeof t ? "undefined" : n(t);
                if ("string" === s || "number" === s || "boolean" === s) r.push(e + "=" + (null != i && !i || u.isEncode(t) ? t : encodeURIComponent(t))); else for (var o in t) {
                    var a = null == e ? o : e + (t instanceof Array ? "[" + o + "]" : "." + o);
                    r = r.concat(u.parseParam(t[o], a, i))
                }
                return r.join("&")
            }, parseURL: function (t, e) {
                var i = void 0 === e ? window.location.href : e;
                return (t = u.parseParam(t)) ? i += (-1 === i.indexOf("?") ? "?" : "&") + t : i
            }, stepToNextNode: function (t, e, i, n, r) {
                var s = {
                    nyxCode: t.nyxCode,
                    nyxNodeId: t.nyxNodeId,
                    nyxBusinessId: t.nyxBusinessId,
                    redirect_url: e || window.location.href
                };
                return 0 === t.nyxNodeId ? (n.Login_Light_Box.success_close("\u767b\u5f55\u6210\u529f\uff01", 200), void(n.callback ? n.callback(r) : location.reload())) : 5 !== t.nyxNodeId ? void window.logger.goTo(u.parseURL(s, t.nyxPc.linkUri)) : void u.ajaxPost({
                    nyxCode: t.nyxCode,
                    nyxNodeId: t.nyxNodeId,
                    nyxBusinessId: t.nyxBusinessId
                }, "//portal.mogujie.com/api/nyx/sign/getSign", function (t) {
                    return t.status && t.status.code && 1001 == t.status.code ? void u.stepToNextNode(t.result.nyx, e, i, n, r) : void i(t.status.msg)
                })
            }, submitNowForm: function (t, e, i, n) {
                function a(i) {
                    if ("visible" == t.find(".error_tip").css("visibility")) return !1;
                    if (2 != e) {
                        var a = t.find(".lo_mod_box"), c = a.find("input[name=uname]"),
                            u = a.find("input[name=pass]").val();
                        return MGTOOL.trim(c.val()) == c.attr("def-v") ? (d.showError(t, "\u8bf7\u8f93\u5165" + c.attr("def-v")), !1) : "" == MGTOOL.trim(u) ? (d.showError(t, "\u8bf7\u8f93\u5165\u767b\u5f55\u5bc6\u7801"), !1) : (l = {
                            uname: c.val(),
                            captkey: i || "",
                            from: 2,
                            remember: p,
                            token: window.__token,
                            mogusecret: s.ccback(n),
                            nyxNodeId: 6,
                            nyxBusinessId: 2
                        }, f = r.LOGIN, void d.ajaxPost({}, r.LOGIN_GETTOKEN, function (e) {
                            var i = t.find(".lo_mod_box"), n = i.find("input[name=pass]").val();
                            o.setPublicKey(e.result.publicKey);
                            var r = o.encrypt($.md5(n));
                            l.password = r, l.passwordToken = e.result.token, d.ajaxPost(l, f, h)
                        }))
                    }
                    var a = t.find(".eb_mod_box"), c = a.find("input[name=uname]"), g = MGTOOL.trim(c.val()),
                        m = a.find("input[name='telcode']");
                    return g == c.attr("def-v") ? (d.showError(t, "\u8bf7\u8f93\u5165" + c.attr("def-v")), !1) : /^1\d{10,10}$/.test(g) ? MGTOOL.trim(m.val()) == m.attr("def-v") ? (d.showError(t, "\u8bf7\u8f93\u5165" + m.attr("def-v")), !1) : (l = {
                        mobile: g,
                        code: m.val(),
                        captkey: window.probc || "",
                        from: 1,
                        remember: p,
                        areaCode: "86",
                        mogusecret: s.ccback(n),
                        nyxNodeId: 7,
                        nyxBusinessId: 3
                    }, f = r.LOGIN_CHECK_CODE, void d.ajaxPost(l, f, h)) : (d.showError(t, "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"), !1)
                }

                function h(e) {
                    e.result;
                    1001 == e.status.code ? u.stepToNextNode(e.result.nyx, window.location.href, function (e) {
                        d.showError(t, e)
                    }, i, e.result.data) : 40010001 == e.status.code || 40010003 == e.status.code || 40010004 == e.status.code || $(".imgCheckText").length > 0 ? (d.showError(t, e.status.msg), c.showNewImgCheck()) : 1007 == e.status.code ? d.showTipError(t, '<span style="color:#ff5783;">\u6682\u65f6\u7981\u6b62\u8bbf\u95ee\uff0c<a href="//cs.mogujie.com/dispute/appeal/buyer.html" style="color:#ff5783;text-decoration:underline">\u6211\u8981\u7533\u8bc9</a></span>') : d.showError(t, e.status.msg)
                }

                var l, f, d = this, p = t.find(".lg_remember :checkbox").prop("checked");
                1 == e ? c.imgcheckVerify(t, a) : a()
            }, showError: function (t, e) {
                e && t.find(".error_tip").html(e).css("visibility", "visible")
            }, hideError: function (t) {
                "visible" == t.find(".error_tip").css("visibility") && t.find(".error_tip").css("visibility", "hidden")
            }, showTipError: function (t, e) {
                e && t.find(".error_tip").html(e).css("visibility", "visible")
            }, turnLoginMod: function (t, e) {
                var i = t.find(".lg_form");
                1 == e ? (i.find(".mod_box").hide().eq(0).show(), i.removeClass("easy_buy")) : 2 == e && (i.find(".mod_box").hide().eq(1).show(), i.addClass("easy_buy")), 1 == i.find(".mod_box:visible").attr("data-isshow") ? i.find(".lg_chk").show() : i.find(".lg_chk").hide(), $("#lg_chk").length > 0 ? $("#lg_chk").remove() : "" !== $("#_content").html() && $("#_content").empty()
            }, countDownStart: function (t, e) {
                var i = this;
                i.timer = "";
                var n = function r(t, e) {
                    i.timer && clearTimeout(i.timer), i.timer = setTimeout(function () {
                        0 >= e ? t.html("\u91cd\u65b0\u53d1\u9001").removeClass("downing") : (e--, t.html("\u91cd\u65b0\u53d1\u9001(" + e + ")"), r(t, e))
                    }, "1000")
                };
                n(t, e)
            }
        };
        t.exports = {CHECK: c, UI: u}
    }, function (t, e) {
        "use strict";
        var i = {
            LOGIN_CONFIG: "//portal.mogujie.com/api/nyx/config/getSecurityConfig",
            CAPTCHA_GET: "//portal.mogujie.com/api/validate/captcha/get",
            LOGIN: "//portal.mogujie.com/api/nyx/login/login",
            CANLOGINBYCODE: "//portal.mogujie.com/api/login/canloginbycode",
            LOGIN_GET_CODE: "//portal.mogujie.com/api/nyx/mobile/getVerifyCode",
            LOGIN_CHECK_CODE: "//portal.mogujie.com/api/nyx/mobile/checkVerifyCode",
            LOGIN_AUTHORIZE: "//portal.mogujie.com/api/nyx/third/getAuthUrlOrRedirect",
            LOGIN_GETTOKEN: "//portal.mogujie.com/api/security/getToken"
        };
        t.exports = i
    }, function (t, e, i) {
        "use strict";
        var n = i(5), r = i(6), s = i(3), o = {
            FixIe6Bug: function () {
                $.browser.msie && "6.0" == $.browser.version && document.execCommand("BackgroundImageCache", !1, !0)
            }, GetImgCheck: function (t, e, i, o) {
                return $(e).length > 0 ? (o.find("#lg_chk").show(), r.imgCaptchaRecaptcha(), !1) : (i.before(t), void $.ajax({
                    url: s.CAPTCHA_GET,
                    type: "GET",
                    dataType: "jsonp"
                }).then(function (t) {
                    if (1001 == t.status.code) {
                        var i = MoGu.ui.getTemplate(n, t.result);
                        setTimeout(function () {
                            $(e).html(i).css("opacity", 0).animate({opacity: 1}, 1e3), $(".lg_chk").show(), r.imgCaptchaInit()
                        }, 0)
                    } else $(e).remove()
                }))
            }, RemoveImgCheck: function () {
                $("#lg_chk").remove()
            }, isImgcodeCheck: function (t, e) {
                var i = !0;
                if (r.imgCodeCheck()) {
                    var n = [];
                    $(".img_code_spin").each(function (t, e) {
                        var i = $(e).val();
                        n.push(i)
                    }), $("#imgcheckvalue").val(n.join("_"))
                } else e ? e(t, "\u8bf7\u70b9\u51fb\u56fe\u7247\u65cb\u8f6c\u81f3\u6b63\u5411\u671d\u4e0a") : MOGU.alert("\u8bf7\u70b9\u51fb\u56fe\u7247\u65cb\u8f6c\u81f3\u6b63\u5411\u671d\u4e0a"), i = !1;
                return i
            }
        };
        t.exports = $.extend(o, r)
    }, function (t, e) {
        t.exports = '<div class="imgcheck_code_main clearfix">\n  <span class="notice">\u8bf7\u70b9\u51fb\u56fe\u7247\u65cb\u8f6c\u81f3\u6b63\u5411\u671d\u4e0a</span>\n  <a href="javascript:void(0);" id="imgcheck_code_change" style="float: none">\u6362\u4e00\u7ec4</a>\n  <div class="imgcheck_code_img_div" onselectstart="return false">\n    <input type="hidden" value="{{= it.code}}" id="imgcheckcode">\n\n    <div class="imgcheck_image_div" f="0" style="background:url(//portal.mogujie.com/api/validate/captcha/{{= it.code}}) no-repeat; background-position: 0px 0;" ></div>\n    <input type="hidden" class="img_code_spin" id="img_code_spin_0" name="check[]" value="0" autocomplete="off">\n\n    <div class="imgcheck_image_div" f="1" style="background:url(//portal.mogujie.com/api/validate/captcha/{{= it.code}}) no-repeat; background-position: -75px 0;" ></div>\n    <input type="hidden" class="img_code_spin" id="img_code_spin_1" name="check[]" value="0" autocomplete="off">\n\n    <div class="imgcheck_image_div" f="2" style="background:url(//portal.mogujie.com/api/validate/captcha/{{= it.code}}) no-repeat; background-position: -150px 0;" ></div>\n    <input type="hidden" class="img_code_spin" id="img_code_spin_2" name="check[]" value="0" autocomplete="off">\n\n    <div class="imgcheck_image_div" f="3" style="background:url(//portal.mogujie.com/api/validate/captcha/{{= it.code}}) no-repeat; background-position: -225px 0;" ></div>\n    <input type="hidden" class="img_code_spin" id="img_code_spin_3" name="check[]" value="0" autocomplete="off">\n  </div>\n</div>\n'
    }, function (t, e, i) {
        "use strict";
        var n = i(3), r = {};
        r.imgCodeCheck = function () {
            var t = !1, e = $(".img_code_spin");
            if (0 == e.length) return t = !0;
            for (var i = 0; i < e.length; i++) {
                var n = $(e[i]);
                if (0 != n.val()) {
                    t = !0;
                    break
                }
            }
            return t
        };
        var s = function (t) {
            var e = t.parents(".validateitem").find(".tips"), i = t.parents(".ui-option-main-box").find(".error_tip");
            e && e.length > 0 && e.is(":visible") && e.remove(), i && i.length > 0 && i.is(":visible") && i.html("")
        };
        r.imgCaptchaInit = function () {
            var t = $(".imgcheck_image_div"), e = $("#imgcheck_code_change"), i = function (t, e) {
                var i = -75 * ((e + 1) % 4), n = t[0].style.backgroundPosition.split(" ");
                t[0].style.backgroundPosition = n[0] + " " + i + "px"
            };
            t.click(function () {
                s($(this));
                var t = $(this).attr("f"), e = $("#img_code_spin_" + t), n = parseInt(e.val());
                i($(this), n), e.val(n + 1)
            }), e.click(function () {
                s($(this)), r.imgCaptchaRecaptcha()
            })
        }, r.imgCaptchaRecaptcha = function (t) {
            var e = function (t) {
                for (var e = $(".imgcheck_image_div"), i = e.length, n = 0; i > n; n++) {
                    var r = e[n], s = r.getAttribute("f"), o = $("#img_code_spin_" + s);
                    o.val(0);
                    var a = $(r);
                    a.css("background-image", "url(//portal.mogujie.com/api/validate/captcha/" + t + ")"), a.css({"background-position": -75 * n + "px 0"})
                }
                $("#imgcheckcode").val(t)
            };
            void 0 === t ? $.ajax({
                url: n.CAPTCHA_GET,
                type: "get",
                timeout: 6e4,
                data: {},
                dataType: "jsonp",
                cache: !1,
                success: function (t) {
                    var i = t.status.code;
                    t.status.msg;
                    if (1001 == i) {
                        var n = t.result.code;
                        e(n)
                    }
                },
                error: function (t, e, i) {
                    "timeout" == e && MOGU.alert(MGLANG.msgTimeout)
                }
            }) : setTimeout(function () {
                e(t)
            }, 1)
        }, r.imgCaptchaInit(), t.exports = r
    }, function (t, e) {
        "use strict";
        var i = function (t, e) {
            return t << e | t >>> 32 - e
        }, n = function (t, e) {
            var i, n, r, s, o;
            return r = 2147483648 & t, s = 2147483648 & e, i = 1073741824 & t, n = 1073741824 & e, o = (1073741823 & t) + (1073741823 & e), i & n ? 2147483648 ^ o ^ r ^ s : i | n ? 1073741824 & o ? 3221225472 ^ o ^ r ^ s : 1073741824 ^ o ^ r ^ s : o ^ r ^ s
        }, r = function (t, e, i) {
            return t & e | ~t & i
        }, s = function (t, e, i) {
            return t & i | e & ~i
        }, o = function (t, e, i) {
            return t ^ e ^ i
        }, a = function (t, e, i) {
            return e ^ (t | ~i)
        }, h = function (t, e, s, o, a, h, c) {
            return t = n(t, n(n(r(e, s, o), a), c)), n(i(t, h), e)
        }, c = function (t, e, r, o, a, h, c) {
            return t = n(t, n(n(s(e, r, o), a), c)), n(i(t, h), e)
        }, u = function (t, e, r, s, a, h, c) {
            return t = n(t, n(n(o(e, r, s), a), c)), n(i(t, h), e)
        }, l = function (t, e, r, s, o, h, c) {
            return t = n(t, n(n(a(e, r, s), o), c)), n(i(t, h), e)
        }, f = function (t) {
            for (var e, i = t.length, n = i + 8, r = (n - n % 64) / 64, s = 16 * (r + 1), o = Array(s - 1), a = 0, h = 0; i > h;) e = (h - h % 4) / 4, a = h % 4 * 8, o[e] = o[e] | t.charCodeAt(h) << a, h++;
            return e = (h - h % 4) / 4, a = h % 4 * 8, o[e] = o[e] | 128 << a, o[s - 2] = i << 3, o[s - 1] = i >>> 29, o
        }, d = function (t) {
            var e, i, n = "", r = "";
            for (i = 0; 3 >= i; i++) e = t >>> 8 * i & 255, r = "0" + e.toString(16), n += r.substr(r.length - 2, 2);
            return n
        }, p = function (t) {
            t = t.replace(/\x0d\x0a/g, "\n");
            for (var e = "", i = 0; i < t.length; i++) {
                var n = t.charCodeAt(i);
                128 > n ? e += String.fromCharCode(n) : n > 127 && 2048 > n ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128))
            }
            return e
        };
        $.extend({
            md5: function (t) {
                var e, i, r, s, o, a, g, m, v, y = Array(), b = 7, w = 12, x = 17, T = 22, S = 5, _ = 9, E = 14, R = 20,
                    D = 4, C = 11, O = 16, I = 23, B = 6, k = 10, A = 15, U = 21;
                for (t = p(t), y = f(t), a = 1732584193, g = 4023233417, m = 2562383102, v = 271733878, e = 0; e < y.length; e += 16) i = a, r = g, s = m, o = v, a = h(a, g, m, v, y[e + 0], b, 3614090360), v = h(v, a, g, m, y[e + 1], w, 3905402710), m = h(m, v, a, g, y[e + 2], x, 606105819), g = h(g, m, v, a, y[e + 3], T, 3250441966), a = h(a, g, m, v, y[e + 4], b, 4118548399), v = h(v, a, g, m, y[e + 5], w, 1200080426), m = h(m, v, a, g, y[e + 6], x, 2821735955), g = h(g, m, v, a, y[e + 7], T, 4249261313), a = h(a, g, m, v, y[e + 8], b, 1770035416), v = h(v, a, g, m, y[e + 9], w, 2336552879), m = h(m, v, a, g, y[e + 10], x, 4294925233), g = h(g, m, v, a, y[e + 11], T, 2304563134), a = h(a, g, m, v, y[e + 12], b, 1804603682), v = h(v, a, g, m, y[e + 13], w, 4254626195), m = h(m, v, a, g, y[e + 14], x, 2792965006), g = h(g, m, v, a, y[e + 15], T, 1236535329), a = c(a, g, m, v, y[e + 1], S, 4129170786), v = c(v, a, g, m, y[e + 6], _, 3225465664), m = c(m, v, a, g, y[e + 11], E, 643717713), g = c(g, m, v, a, y[e + 0], R, 3921069994), a = c(a, g, m, v, y[e + 5], S, 3593408605), v = c(v, a, g, m, y[e + 10], _, 38016083), m = c(m, v, a, g, y[e + 15], E, 3634488961), g = c(g, m, v, a, y[e + 4], R, 3889429448), a = c(a, g, m, v, y[e + 9], S, 568446438), v = c(v, a, g, m, y[e + 14], _, 3275163606), m = c(m, v, a, g, y[e + 3], E, 4107603335), g = c(g, m, v, a, y[e + 8], R, 1163531501), a = c(a, g, m, v, y[e + 13], S, 2850285829), v = c(v, a, g, m, y[e + 2], _, 4243563512), m = c(m, v, a, g, y[e + 7], E, 1735328473), g = c(g, m, v, a, y[e + 12], R, 2368359562), a = u(a, g, m, v, y[e + 5], D, 4294588738), v = u(v, a, g, m, y[e + 8], C, 2272392833), m = u(m, v, a, g, y[e + 11], O, 1839030562), g = u(g, m, v, a, y[e + 14], I, 4259657740), a = u(a, g, m, v, y[e + 1], D, 2763975236), v = u(v, a, g, m, y[e + 4], C, 1272893353), m = u(m, v, a, g, y[e + 7], O, 4139469664), g = u(g, m, v, a, y[e + 10], I, 3200236656), a = u(a, g, m, v, y[e + 13], D, 681279174), v = u(v, a, g, m, y[e + 0], C, 3936430074), m = u(m, v, a, g, y[e + 3], O, 3572445317), g = u(g, m, v, a, y[e + 6], I, 76029189), a = u(a, g, m, v, y[e + 9], D, 3654602809), v = u(v, a, g, m, y[e + 12], C, 3873151461), m = u(m, v, a, g, y[e + 15], O, 530742520), g = u(g, m, v, a, y[e + 2], I, 3299628645), a = l(a, g, m, v, y[e + 0], B, 4096336452), v = l(v, a, g, m, y[e + 7], k, 1126891415), m = l(m, v, a, g, y[e + 14], A, 2878612391), g = l(g, m, v, a, y[e + 5], U, 4237533241), a = l(a, g, m, v, y[e + 12], B, 1700485571), v = l(v, a, g, m, y[e + 3], k, 2399980690), m = l(m, v, a, g, y[e + 10], A, 4293915773), g = l(g, m, v, a, y[e + 1], U, 2240044497), a = l(a, g, m, v, y[e + 8], B, 1873313359), v = l(v, a, g, m, y[e + 15], k, 4264355552), m = l(m, v, a, g, y[e + 6], A, 2734768916), g = l(g, m, v, a, y[e + 13], U, 1309151649), a = l(a, g, m, v, y[e + 4], B, 4149444226), v = l(v, a, g, m, y[e + 11], k, 3174756917), m = l(m, v, a, g, y[e + 2], A, 718787259), g = l(g, m, v, a, y[e + 9], U, 3951481745), a = n(a, i), g = n(g, r), m = n(m, s), v = n(v, o);
                var K = d(a) + d(g) + d(m) + d(v);
                return K.toLowerCase()
            }
        })
    }, function (t, e, i) {
        "use strict";
        var n = {
            ccback: function (t) {
                function e(t) {
                    t.s = t.s + t.t
                }

                function i(t) {
                    E += t
                }

                function n(t, e, i) {
                    if (-1 == A && (A = e / 2), 1 != e) if (e == A + 1) if (0 > i) {
                        var r = t.s.charCodeAt(t.s.length - 1);
                        t.t = String.fromCharCode(r - 1), S.ab("zq", t), n(t, e - 1, i)
                    } else {
                        var r = t.s.charCodeAt(t.s.length - 1);
                        t.t = String.fromCharCode(r + 1), S.ab("zq", t), n(t, e - 1, i)
                    } else if (A + 1 > e) if (0 > i) {
                        var r = t.s.charCodeAt(t.s.length - 1);
                        t.t = String.fromCharCode(r + 2), S.ab("zq", t), n(t, e - 1, i)
                    } else {
                        var r = t.s.charCodeAt(t.s.length - 1);
                        t.t = String.fromCharCode(r - 2), S.ab("zq", t), n(t, e - 1, i)
                    } else if (0 > i) {
                        var r = t.s.charCodeAt(t.s.length - 1);
                        t.t = String.fromCharCode(r - 2), S.ab("zq", t), n(t, e - 1, i)
                    } else {
                        var r = t.s.charCodeAt(t.s.length - 1);
                        t.t = String.fromCharCode(r + 2), S.ab("zq", t), n(t, e - 1, i)
                    }
                }

                function r() {
                    this.name = "bat", this.tt = 4, this.q = {}, this.HA = function () {
                        this.name = "tabd", this.tt += 1, this.q.ab = 124, this.q.ab += 291, S.t1 = b;
                        var t = {};
                        return t.qP = function (t) {
                            S.t1 -= t
                        }, t.Qr = function (t) {
                            S.t1 += t
                        }, t.Jk = function (t) {
                            var e = 11, i = t << 4, n = t >>> 16 - e, r = (i ^ n) >>> 0, s = r + t & 4294967295;
                            return s >>> 0
                        }, t.tt = 911511, t
                    }
                }

                function s(t, e, i) {
                    for (var n = t, r = "", s = 0; e > s; s++) {
                        n += 6;
                        var o = i >>> 32 - n;
                        o = 63 & o, r += M.tz[T](o)
                    }
                    return r
                }

                function o(t) {
                    B[0] = String.fromCharCode(Math.floor(16 * Math.random()) + t)
                }

                function a(t, e) {
                    t.t = e
                }

                function h() {
                    M.ab("jjt", 65);
                    var t = "";
                    t += s(0, 5, S.ls[1]);
                    var e = (3 & S.ls[1]) << 4 | S.ls[2] >>> 28;
                    return t += M.tz[T](e), t += s(4, 4, S.ls[2]), e = (15 & S.ls[2]) << 2 | S.ls[3] >>> 30, t += M.tz[T](e), t += s(2, 5, S.ls[3]), t += s(0, 5, S.ls[4]), e = (3 & S.ls[4]) << 4 | 2 * Math.floor(4 * Math.random()), t += M.tz[T](e), S.zA = B[0] + t, t
                }

                function c(t, e, i) {
                    for (var n = e[0], r = e[1], s = 0, o = 0; t > o; o++) n += (H.Jk(r) ^ s + i[3 & s]) >>> 0, n = (4294967295 & n) >>> 0, s = (s + S.t1 & 4294967295) >>> 0, r += (H.Jk(n) ^ s + i[s >> 11 & 3]) >>> 0, r = (4294967295 & r) >>> 0;
                    e[0] = n, e[1] = r
                }

                function u(t) {
                    function e(t) {
                        return t.toString(16).toUpperCase()
                    }

                    if (null == t || "" == t) return "";
                    var i = "";
                    I += "pe", m += "en";
                    for (var n, r = 0, s = t.length; s > r; r++) n = t.charCodeAt(r), 16 > n ? i += "%0" + n.toString(16).toUpperCase() : 128 > n ? i += 32 == n ? "+" : n >= 48 && 57 >= n || n >= 65 && 90 >= n || n >= 97 && 122 >= n ? t.charAt(r) : "%" + e(n) : 2048 > n ? (i += "%" + e(192 + (n >> 6)), i += "%" + e(128 + n % 64)) : (i += "%" + e(224 + (n >> 12)), i += "%" + e(128 + (n >> 6) % 64), i += "%" + e(128 + n % 64));
                    return i
                }

                var l, f = 10, d = {s: "", t: ""}, p = "tlitj", g = "app";
                if (function () {
                    l = "zac"
                }(), 10 == f) var m = "hi", v = "i";
                var y = "", b = function () {
                    function t(t) {
                        e = 291
                    }

                    for (var e = 2041507, i = 0; 8 > i; i++) e += 291;
                    return t(e), l += "exime", e > 44084 ? e + 62 - 2 + 291 + 1406985 : e - 62 - 5347 - 9 - 1560
                }(), w = "tdd", x = "va", T = "ch";
                l = l.replace("z", "D");
                var S = function () {
                    var t = {};
                    t.tt = 8;
                    var e = {};
                    return t.ab = function (t, i) {
                        if (e[t]) {
                            for (var n = e[t], r = n.length; r--;) n[r].qq(i);
                            return this
                        }
                    }, t.ba = function (t, i) {
                        e[t] = e[t] ? e[t] : [], e[t].push({tt: 10, qq: i})
                    }, t
                }(), _ = "an";
                l = l.replace("c", "t"), x += "zue", T += "vrAt", w = w.replace("t", "a");
                var E = "gmt";
                f = "cr", S.zA = "", b += 10449;
                var R = 12, D = {
                    r1: 137, hj: function (t) {
                        return R + t
                    }, v: 2, w: function () {
                        function t() {
                            R = "window"
                        }

                        t()
                    }
                };
                m += "dd", D.w(), S.ib = g, y = "senAnn", f.replace("c", "z"), S.re = "am".replace;
                x.replace("z", "l");
                p = S.re.call(p, /t/g, "c");
                var C = function () {
                    var t = 123, e = t + 255;
                    return e &= 15, t = window, e > 25 && (t += "pt"), t
                };
                w += "gvbnt";
                var O = {
                    ab: 9, ll: function () {
                        return ab + "abc"
                    }
                };
                f = {s: "", t: ""}, y += "ribune", l = S.re.call(l, "x", "T");
                var I = "ty", B = [0];
                p = S.re.call(p, "j", "k");
                var k = "lb_crnvenv";
                O.x = 1, S.SO = function (t) {
                    S.t1 *= t
                }, d.s = "z", S.oQ = e;
                var A = -1;
                f.s = "cre", w += "Listbnbr", O.m = C, y = S.re.call(y, /n/g, "t");
                var U = {s: 800, t: 11}, K = {};
                !function G(t) {
                    1 != t && (t > 5 ? B.push(t * t * t * t + 16668304) : B.push(t * t + 16), G(t - 1))
                }(11), S.ls = B, K.s = "cli", f.t = "ate", S.kp = y, w = w.replace("g", "E"), K.t = "ent", T = S.re.call(T, "v", "a"), B[0] = Math.floor(16 * Math.random()) + 65, S.ba("zq", S.oQ), S.ab("zq", f), n(d, 26, -10), U.t += 100, d.s = d.s + "0", S.ba("JK", i), B[0] = String.fromCharCode(B[0]), A = -1, n(d, 10, 5);
                var N = 3, V = "bvbnt";
                w = w.replace(/b/g, "e"), function () {
                    k = k.replace("r", "o"), S.eb = n, A = -1, S.wq = d
                }(), r.prototype = S;
                var M = new r;
                M.ba("Ma", S.SO);
                var J = [-1, -2, -4, -8], L = [100, 10];
                N += 1, S.ba("jjt", o), D.v = O.m.apply(), M.wq.s += String.fromCharCode(43), V = M.re.call(V, /b/g, "e"), S.wq.s += "/Z";
                var P = {};
                !function () {
                    k = M.re.call(k, /v/g, "t"), k = M.re.call(k, "b", "g")
                }();
                var q = "cmass";
                _ += "zizo";
                (function () {
                    var t = {};
                    return t.v1 = 123, t.ff = function (t) {
                        return t /= 2, t - 2
                    }, t.ff(t.v1), L.push(D.v), t
                })();
                P.s = "si", L.push(L[2].document), E = E.replace("m", "e");
                var j = "intex", H = M.HA();
                S.ab("zq", U), P.t = "gnfo", q = q.replace("m", "l"), M.ab("Ma", 1231458), S.eb(S.wq, 26, -74), S.t1 = M.t1 / 2 + 338063271, j = M.re.call(j, "t", "d");
                var z = new r;
                M.tz = S.wq.s, M.ib += "end", z.bn = K, j += "Of", v += "npzt", g = "Ch", M.ib += g + "ild", z.Oz = h;
                var $ = k.substring(0, 3);
                v = z.re.call(v, "z", "u"), $ = z.re.call($, "l", "r"), M.ab("JK", "Element"), z.ab("zq", K), S.ab("zq", P), a(K, "X"), z.ii = E + "ById", f.t = z.ii.substring(3, 10), $ += "suz", S.gw = c, M.ab("JK", "sByTagName"), $ = S.re.call($, "z", "b"), q += "Name", z.ab("zq", f), $ += "mit", S.ab("zq", z.bn), D.gc = function (t, e) {
                    for (var i = t[E]("*"), n = 0; n < i.length; n++) if (-1 != i[n][q][j](e)) return i[n];
                    return null
                }, z.bn.t = z.bn.s.substring(0, 6) + "Y";
                u("dxjhdM5c"), z.re.call(_, /z/g, "t");
                return S.GM = function (t) {
                    t = t || L[2][V], B[1] = Math.round((new (L[2][l.substring(0, 4)]))["get" + l.substring(4)]() / 1e3), B[2] = t[z.bn.s], B[3] = t[z.bn.t], B[N] = Math.floor(5209 * Math.random() * 271) * U.s;
                    var e = [B[1], B[2]], i = [B[3], B[4]];
                    M.gw(B[7], e, J), M.gw(B[9], i, J);
                    for (var n = B[4], r = 1; 5 > r; r++) 3 > r ? B[r] = e[r - 1] : B[r] = i[r - 3];
                    z.Oz(), B[4] = n
                }, z.Gl = D.v.eci, M.GM(t), c(50, L, J), z.zA
            }
        };
        t.exports = n
    }, function (t, e) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, n = {};
        !function (t) {
            function e(t, e, i) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }

            function n() {
                return new e(null)
            }

            function r(t, e, i, n, r, s) {
                for (; --s >= 0;) {
                    var o = e * this[t++] + i[n] + r;
                    r = Math.floor(o / 67108864), i[n++] = 67108863 & o
                }
                return r
            }

            function s(t, e, i, n, r, s) {
                for (var o = 32767 & e, a = e >> 15; --s >= 0;) {
                    var h = 32767 & this[t], c = this[t++] >> 15, u = a * h + c * o;
                    h = o * h + ((32767 & u) << 15) + i[n] + (1073741823 & r), r = (h >>> 30) + (u >>> 15) + a * c + (r >>> 30), i[n++] = 1073741823 & h
                }
                return r
            }

            function o(t, e, i, n, r, s) {
                for (var o = 16383 & e, a = e >> 14; --s >= 0;) {
                    var h = 16383 & this[t], c = this[t++] >> 14, u = a * h + c * o;
                    h = o * h + ((16383 & u) << 14) + i[n] + r, r = (h >> 28) + (u >> 14) + a * c, i[n++] = 268435455 & h
                }
                return r
            }

            function a(t) {
                return Ce.charAt(t)
            }

            function h(t, e) {
                var i = Oe[t.charCodeAt(e)];
                return null == i ? -1 : i
            }

            function c(t) {
                for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
                t.t = this.t, t.s = this.s
            }

            function u(t) {
                this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
            }

            function l(t) {
                var e = n();
                return e.fromInt(t), e
            }

            function f(t, i) {
                var n;
                if (16 == i) n = 4; else if (8 == i) n = 3; else if (256 == i) n = 8; else if (2 == i) n = 1; else if (32 == i) n = 5; else {
                    if (4 != i) return void this.fromRadix(t, i);
                    n = 2
                }
                this.t = 0, this.s = 0;
                for (var r = t.length, s = !1, o = 0; --r >= 0;) {
                    var a = 8 == n ? 255 & t[r] : h(t, r);
                    0 > a ? "-" == t.charAt(r) && (s = !0) : (s = !1, 0 == o ? this[this.t++] = a : o + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - o) - 1) << o, this[this.t++] = a >> this.DB - o) : this[this.t - 1] |= a << o, o += n, o >= this.DB && (o -= this.DB))
                }
                8 == n && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), s && e.ZERO.subTo(this, this)
            }

            function d() {
                for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
            }

            function p(t) {
                if (this.s < 0) return "-" + this.negate().toString(t);
                var e;
                if (16 == t) e = 4; else if (8 == t) e = 3; else if (2 == t) e = 1; else if (32 == t) e = 5; else {
                    if (4 != t) return this.toRadix(t);
                    e = 2
                }
                var i, n = (1 << e) - 1, r = !1, s = "", o = this.t, h = this.DB - o * this.DB % e;
                if (o-- > 0) for (h < this.DB && (i = this[o] >> h) > 0 && (r = !0, s = a(i)); o >= 0;) e > h ? (i = (this[o] & (1 << h) - 1) << e - h, i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & n, 0 >= h && (h += this.DB, --o)), i > 0 && (r = !0), r && (s += a(i));
                return r ? s : "0"
            }

            function g() {
                var t = n();
                return e.ZERO.subTo(this, t), t
            }

            function m() {
                return this.s < 0 ? this.negate() : this
            }

            function y(t) {
                var e = this.s - t.s;
                if (0 != e) return e;
                var i = this.t;
                if (e = i - t.t, 0 != e) return this.s < 0 ? -e : e;
                for (; --i >= 0;) if (0 != (e = this[i] - t[i])) return e;
                return 0
            }

            function b(t) {
                var e, i = 1;
                return 0 != (e = t >>> 16) && (t = e, i += 16), 0 != (e = t >> 8) && (t = e, i += 8), 0 != (e = t >> 4) && (t = e, i += 4), 0 != (e = t >> 2) && (t = e, i += 2), 0 != (e = t >> 1) && (t = e, i += 1), i
            }

            function w() {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + b(this[this.t - 1] ^ this.s & this.DM)
            }

            function x(t, e) {
                var i;
                for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
                for (i = t - 1; i >= 0; --i) e[i] = 0;
                e.t = this.t + t, e.s = this.s
            }

            function T(t, e) {
                for (var i = t; i < this.t; ++i) e[i - t] = this[i];
                e.t = Math.max(this.t - t, 0), e.s = this.s
            }

            function S(t, e) {
                var i, n = t % this.DB, r = this.DB - n, s = (1 << r) - 1, o = Math.floor(t / this.DB),
                    a = this.s << n & this.DM;
                for (i = this.t - 1; i >= 0; --i) e[i + o + 1] = this[i] >> r | a, a = (this[i] & s) << n;
                for (i = o - 1; i >= 0; --i) e[i] = 0;
                e[o] = a, e.t = this.t + o + 1, e.s = this.s, e.clamp()
            }

            function _(t, e) {
                e.s = this.s;
                var i = Math.floor(t / this.DB);
                if (i >= this.t) return void(e.t = 0);
                var n = t % this.DB, r = this.DB - n, s = (1 << n) - 1;
                e[0] = this[i] >> n;
                for (var o = i + 1; o < this.t; ++o) e[o - i - 1] |= (this[o] & s) << r, e[o - i] = this[o] >> n;
                n > 0 && (e[this.t - i - 1] |= (this.s & s) << r), e.t = this.t - i, e.clamp()
            }

            function E(t, e) {
                for (var i = 0, n = 0, r = Math.min(t.t, this.t); r > i;) n += this[i] - t[i], e[i++] = n & this.DM, n >>= this.DB;
                if (t.t < this.t) {
                    for (n -= t.s; i < this.t;) n += this[i], e[i++] = n & this.DM, n >>= this.DB;
                    n += this.s
                } else {
                    for (n += this.s; i < t.t;) n -= t[i], e[i++] = n & this.DM, n >>= this.DB;
                    n -= t.s
                }
                e.s = 0 > n ? -1 : 0, -1 > n ? e[i++] = this.DV + n : n > 0 && (e[i++] = n), e.t = i, e.clamp()
            }

            function R(t, i) {
                var n = this.abs(), r = t.abs(), s = n.t;
                for (i.t = s + r.t; --s >= 0;) i[s] = 0;
                for (s = 0; s < r.t; ++s) i[s + n.t] = n.am(0, r[s], i, s, 0, n.t);
                i.s = 0, i.clamp(), this.s != t.s && e.ZERO.subTo(i, i)
            }

            function D(t) {
                for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) t[i] = 0;
                for (i = 0; i < e.t - 1; ++i) {
                    var n = e.am(i, e[i], t, 2 * i, 0, 1);
                    (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, n, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
                }
                t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp()
            }

            function C(t, i, r) {
                var s = t.abs();
                if (!(s.t <= 0)) {
                    var o = this.abs();
                    if (o.t < s.t) return null != i && i.fromInt(0), void(null != r && this.copyTo(r));
                    null == r && (r = n());
                    var a = n(), h = this.s, c = t.s, u = this.DB - b(s[s.t - 1]);
                    u > 0 ? (s.lShiftTo(u, a), o.lShiftTo(u, r)) : (s.copyTo(a), o.copyTo(r));
                    var l = a.t, f = a[l - 1];
                    if (0 != f) {
                        var d = f * (1 << this.F1) + (l > 1 ? a[l - 2] >> this.F2 : 0), p = this.FV / d,
                            g = (1 << this.F1) / d, m = 1 << this.F2, v = r.t, y = v - l, w = null == i ? n() : i;
                        for (a.dlShiftTo(y, w), r.compareTo(w) >= 0 && (r[r.t++] = 1, r.subTo(w, r)), e.ONE.dlShiftTo(l, w), w.subTo(a, a); a.t < l;) a[a.t++] = 0;
                        for (; --y >= 0;) {
                            var x = r[--v] == f ? this.DM : Math.floor(r[v] * p + (r[v - 1] + m) * g);
                            if ((r[v] += a.am(0, x, r, y, 0, l)) < x) for (a.dlShiftTo(y, w), r.subTo(w, r); r[v] < --x;) r.subTo(w, r)
                        }
                        null != i && (r.drShiftTo(l, i), h != c && e.ZERO.subTo(i, i)), r.t = l, r.clamp(), u > 0 && r.rShiftTo(u, r), 0 > h && e.ZERO.subTo(r, r)
                    }
                }
            }

            function O(t) {
                var i = n();
                return this.abs().divRemTo(t, null, i), this.s < 0 && i.compareTo(e.ZERO) > 0 && t.subTo(i, i), i
            }

            function I(t) {
                this.m = t;
            }

            function B(t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }

            function k(t) {
                return t
            }

            function A(t) {
                t.divRemTo(this.m, null, t)
            }

            function U(t, e, i) {
                t.multiplyTo(e, i), this.reduce(i)
            }

            function K(t, e) {
                t.squareTo(e), this.reduce(e)
            }

            function N() {
                if (this.t < 1) return 0;
                var t = this[0];
                if (0 == (1 & t)) return 0;
                var e = 3 & t;
                return e = e * (2 - (15 & t) * e) & 15, e = e * (2 - (255 & t) * e) & 255, e = e * (2 - ((65535 & t) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e
            }

            function V(t) {
                this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
            }

            function M(t) {
                var i = n();
                return t.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), t.s < 0 && i.compareTo(e.ZERO) > 0 && this.m.subTo(i, i), i
            }

            function J(t) {
                var e = n();
                return t.copyTo(e), this.reduce(e), e
            }

            function L(t) {
                for (; t.t <= this.mt2;) t[t.t++] = 0;
                for (var e = 0; e < this.m.t; ++e) {
                    var i = 32767 & t[e],
                        n = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    for (i = e + this.m.t, t[i] += this.m.am(0, n, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV, t[++i]++
                }
                t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }

            function P(t, e) {
                t.squareTo(e), this.reduce(e)
            }

            function q(t, e, i) {
                t.multiplyTo(e, i), this.reduce(i)
            }

            function j() {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }

            function H(t, i) {
                if (t > 4294967295 || 1 > t) return e.ONE;
                var r = n(), s = n(), o = i.convert(this), a = b(t) - 1;
                for (o.copyTo(r); --a >= 0;) if (i.sqrTo(r, s), (t & 1 << a) > 0) i.mulTo(s, o, r); else {
                    var h = r;
                    r = s, s = h
                }
                return i.revert(r)
            }

            function z(t, e) {
                var i;
                return i = 256 > t || e.isEven() ? new I(e) : new V(e), this.exp(t, i)
            }

            function $() {
                var t = n();
                return this.copyTo(t), t
            }

            function G() {
                if (this.s < 0) {
                    if (1 == this.t) return this[0] - this.DV;
                    if (0 == this.t) return -1
                } else {
                    if (1 == this.t) return this[0];
                    if (0 == this.t) return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }

            function F() {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }

            function Z() {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }

            function Y(t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }

            function Q() {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }

            function W(t) {
                if (null == t && (t = 10), 0 == this.signum() || 2 > t || t > 36) return "0";
                var e = this.chunkSize(t), i = Math.pow(t, e), r = l(i), s = n(), o = n(), a = "";
                for (this.divRemTo(r, s, o); s.signum() > 0;) a = (i + o.intValue()).toString(t).substr(1) + a, s.divRemTo(r, s, o);
                return o.intValue().toString(t) + a
            }

            function X(t, i) {
                this.fromInt(0), null == i && (i = 10);
                for (var n = this.chunkSize(i), r = Math.pow(i, n), s = !1, o = 0, a = 0, c = 0; c < t.length; ++c) {
                    var u = h(t, c);
                    0 > u ? "-" == t.charAt(c) && 0 == this.signum() && (s = !0) : (a = i * a + u, ++o >= n && (this.dMultiply(r), this.dAddOffset(a, 0), o = 0, a = 0))
                }
                o > 0 && (this.dMultiply(Math.pow(i, o)), this.dAddOffset(a, 0)), s && e.ZERO.subTo(this, this)
            }

            function tt(t, i, n) {
                if ("number" == typeof i) if (2 > t) this.fromInt(1); else for (this.fromNumber(t, n), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), ht, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(i);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this); else {
                    var r = new Array, s = 7 & t;
                    r.length = (t >> 3) + 1, i.nextBytes(r), s > 0 ? r[0] &= (1 << s) - 1 : r[0] = 0, this.fromString(r, 256)
                }
            }

            function et() {
                var t = this.t, e = new Array;
                e[0] = this.s;
                var i, n = this.DB - t * this.DB % 8, r = 0;
                if (t-- > 0) for (n < this.DB && (i = this[t] >> n) != (this.s & this.DM) >> n && (e[r++] = i | this.s << this.DB - n); t >= 0;) 8 > n ? (i = (this[t] & (1 << n) - 1) << 8 - n, i |= this[--t] >> (n += this.DB - 8)) : (i = this[t] >> (n -= 8) & 255, 0 >= n && (n += this.DB, --t)), 0 != (128 & i) && (i |= -256), 0 == r && (128 & this.s) != (128 & i) && ++r, (r > 0 || i != this.s) && (e[r++] = i);
                return e
            }

            function it(t) {
                return 0 == this.compareTo(t)
            }

            function nt(t) {
                return this.compareTo(t) < 0 ? this : t
            }

            function rt(t) {
                return this.compareTo(t) > 0 ? this : t
            }

            function st(t, e, i) {
                var n, r, s = Math.min(t.t, this.t);
                for (n = 0; s > n; ++n) i[n] = e(this[n], t[n]);
                if (t.t < this.t) {
                    for (r = t.s & this.DM, n = s; n < this.t; ++n) i[n] = e(this[n], r);
                    i.t = this.t
                } else {
                    for (r = this.s & this.DM, n = s; n < t.t; ++n) i[n] = e(r, t[n]);
                    i.t = t.t
                }
                i.s = e(this.s, t.s), i.clamp()
            }

            function ot(t, e) {
                return t & e
            }

            function at(t) {
                var e = n();
                return this.bitwiseTo(t, ot, e), e
            }

            function ht(t, e) {
                return t | e
            }

            function ct(t) {
                var e = n();
                return this.bitwiseTo(t, ht, e), e
            }

            function ut(t, e) {
                return t ^ e
            }

            function lt(t) {
                var e = n();
                return this.bitwiseTo(t, ut, e), e
            }

            function ft(t, e) {
                return t & ~e
            }

            function dt(t) {
                var e = n();
                return this.bitwiseTo(t, ft, e), e
            }

            function pt() {
                for (var t = n(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
                return t.t = this.t, t.s = ~this.s, t
            }

            function gt(t) {
                var e = n();
                return 0 > t ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
            }

            function mt(t) {
                var e = n();
                return 0 > t ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
            }

            function vt(t) {
                if (0 == t) return -1;
                var e = 0;
                return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e
            }

            function yt() {
                for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + vt(this[t]);
                return this.s < 0 ? this.t * this.DB : -1
            }

            function bt(t) {
                for (var e = 0; 0 != t;) t &= t - 1, ++e;
                return e
            }

            function wt() {
                for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += bt(this[i] ^ e);
                return t
            }

            function xt(t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }

            function Tt(t, i) {
                var n = e.ONE.shiftLeft(t);
                return this.bitwiseTo(n, i, n), n
            }

            function St(t) {
                return this.changeBit(t, ht)
            }

            function _t(t) {
                return this.changeBit(t, ft)
            }

            function Et(t) {
                return this.changeBit(t, ut)
            }

            function Rt(t, e) {
                for (var i = 0, n = 0, r = Math.min(t.t, this.t); r > i;) n += this[i] + t[i], e[i++] = n & this.DM, n >>= this.DB;
                if (t.t < this.t) {
                    for (n += t.s; i < this.t;) n += this[i], e[i++] = n & this.DM, n >>= this.DB;
                    n += this.s
                } else {
                    for (n += this.s; i < t.t;) n += t[i], e[i++] = n & this.DM, n >>= this.DB;
                    n += t.s
                }
                e.s = 0 > n ? -1 : 0, n > 0 ? e[i++] = n : -1 > n && (e[i++] = this.DV + n), e.t = i, e.clamp()
            }

            function Dt(t) {
                var e = n();
                return this.addTo(t, e), e
            }

            function Ct(t) {
                var e = n();
                return this.subTo(t, e), e
            }

            function Ot(t) {
                var e = n();
                return this.multiplyTo(t, e), e
            }

            function It() {
                var t = n();
                return this.squareTo(t), t
            }

            function Bt(t) {
                var e = n();
                return this.divRemTo(t, e, null), e
            }

            function kt(t) {
                var e = n();
                return this.divRemTo(t, null, e), e
            }

            function At(t) {
                var e = n(), i = n();
                return this.divRemTo(t, e, i), new Array(e, i)
            }

            function Ut(t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
            }

            function Kt(t, e) {
                if (0 != t) {
                    for (; this.t <= e;) this[this.t++] = 0;
                    for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
                }
            }

            function Nt() {
            }

            function Vt(t) {
                return t
            }

            function Mt(t, e, i) {
                t.multiplyTo(e, i)
            }

            function Jt(t, e) {
                t.squareTo(e)
            }

            function Lt(t) {
                return this.exp(t, new Nt)
            }

            function Pt(t, e, i) {
                var n = Math.min(this.t + t.t, e);
                for (i.s = 0, i.t = n; n > 0;) i[--n] = 0;
                var r;
                for (r = i.t - this.t; r > n; ++n) i[n + this.t] = this.am(0, t[n], i, n, 0, this.t);
                for (r = Math.min(t.t, e); r > n; ++n) this.am(0, t[n], i, n, 0, e - n);
                i.clamp()
            }

            function qt(t, e, i) {
                --e;
                var n = i.t = this.t + t.t - e;
                for (i.s = 0; --n >= 0;) i[n] = 0;
                for (n = Math.max(e - this.t, 0); n < t.t; ++n) i[this.t + n - e] = this.am(e - n, t[n], i, 0, 0, this.t + n - e);
                i.clamp(), i.drShiftTo(1, i)
            }

            function jt(t) {
                this.r2 = n(), this.q3 = n(), e.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
            }

            function Ht(t) {
                if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
                if (t.compareTo(this.m) < 0) return t;
                var e = n();
                return t.copyTo(e), this.reduce(e), e
            }

            function zt(t) {
                return t
            }

            function $t(t) {
                for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
                for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
            }

            function Gt(t, e) {
                t.squareTo(e), this.reduce(e)
            }

            function Ft(t, e, i) {
                t.multiplyTo(e, i), this.reduce(i)
            }

            function Zt(t, e) {
                var i, r, s = t.bitLength(), o = l(1);
                if (0 >= s) return o;
                i = 18 > s ? 1 : 48 > s ? 3 : 144 > s ? 4 : 768 > s ? 5 : 6, r = 8 > s ? new I(e) : e.isEven() ? new jt(e) : new V(e);
                var a = new Array, h = 3, c = i - 1, u = (1 << i) - 1;
                if (a[1] = r.convert(this), i > 1) {
                    var f = n();
                    for (r.sqrTo(a[1], f); u >= h;) a[h] = n(), r.mulTo(f, a[h - 2], a[h]), h += 2
                }
                var d, p, g = t.t - 1, m = !0, v = n();
                for (s = b(t[g]) - 1; g >= 0;) {
                    for (s >= c ? d = t[g] >> s - c & u : (d = (t[g] & (1 << s + 1) - 1) << c - s, g > 0 && (d |= t[g - 1] >> this.DB + s - c)), h = i; 0 == (1 & d);) d >>= 1, --h;
                    if ((s -= h) < 0 && (s += this.DB, --g), m) a[d].copyTo(o), m = !1; else {
                        for (; h > 1;) r.sqrTo(o, v), r.sqrTo(v, o), h -= 2;
                        h > 0 ? r.sqrTo(o, v) : (p = o, o = v, v = p), r.mulTo(v, a[d], o)
                    }
                    for (; g >= 0 && 0 == (t[g] & 1 << s);) r.sqrTo(o, v), p = o, o = v, v = p, --s < 0 && (s = this.DB - 1, --g)
                }
                return r.revert(o)
            }

            function Yt(t) {
                var e = this.s < 0 ? this.negate() : this.clone(), i = t.s < 0 ? t.negate() : t.clone();
                if (e.compareTo(i) < 0) {
                    var n = e;
                    e = i, i = n
                }
                var r = e.getLowestSetBit(), s = i.getLowestSetBit();
                if (0 > s) return e;
                for (s > r && (s = r), s > 0 && (e.rShiftTo(s, e), i.rShiftTo(s, i)); e.signum() > 0;) (r = e.getLowestSetBit()) > 0 && e.rShiftTo(r, e), (r = i.getLowestSetBit()) > 0 && i.rShiftTo(r, i), e.compareTo(i) >= 0 ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));
                return s > 0 && i.lShiftTo(s, i), i
            }

            function Qt(t) {
                if (0 >= t) return 0;
                var e = this.DV % t, i = this.s < 0 ? t - 1 : 0;
                if (this.t > 0) if (0 == e) i = this[0] % t; else for (var n = this.t - 1; n >= 0; --n) i = (e * i + this[n]) % t;
                return i
            }

            function Wt(t) {
                var i = t.isEven();
                if (this.isEven() && i || 0 == t.signum()) return e.ZERO;
                for (var n = t.clone(), r = this.clone(), s = l(1), o = l(0), a = l(0), h = l(1); 0 != n.signum();) {
                    for (; n.isEven();) n.rShiftTo(1, n), i ? (s.isEven() && o.isEven() || (s.addTo(this, s), o.subTo(t, o)), s.rShiftTo(1, s)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);
                    for (; r.isEven();) r.rShiftTo(1, r), i ? (a.isEven() && h.isEven() || (a.addTo(this, a), h.subTo(t, h)), a.rShiftTo(1, a)) : h.isEven() || h.subTo(t, h), h.rShiftTo(1, h);
                    n.compareTo(r) >= 0 ? (n.subTo(r, n), i && s.subTo(a, s), o.subTo(h, o)) : (r.subTo(n, r), i && a.subTo(s, a), h.subTo(o, h))
                }
                return 0 != r.compareTo(e.ONE) ? e.ZERO : h.compareTo(t) >= 0 ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h), h.signum() < 0 ? h.add(t) : h) : h
            }

            function Xt(t) {
                var e, i = this.abs();
                if (1 == i.t && i[0] <= Ie[Ie.length - 1]) {
                    for (e = 0; e < Ie.length; ++e) if (i[0] == Ie[e]) return !0;
                    return !1
                }
                if (i.isEven()) return !1;
                for (e = 1; e < Ie.length;) {
                    for (var n = Ie[e], r = e + 1; r < Ie.length && Be > n;) n *= Ie[r++];
                    for (n = i.modInt(n); r > e;) if (n % Ie[e++] == 0) return !1
                }
                return i.millerRabin(t)
            }

            function te(t) {
                var i = this.subtract(e.ONE), r = i.getLowestSetBit();
                if (0 >= r) return !1;
                var s = i.shiftRight(r);
                t = t + 1 >> 1, t > Ie.length && (t = Ie.length);
                for (var o = n(), a = 0; t > a; ++a) {
                    o.fromInt(Ie[Math.floor(Math.random() * Ie.length)]);
                    var h = o.modPow(s, this);
                    if (0 != h.compareTo(e.ONE) && 0 != h.compareTo(i)) {
                        for (var c = 1; c++ < r && 0 != h.compareTo(i);) if (h = h.modPowInt(2, this), 0 == h.compareTo(e.ONE)) return !1;
                        if (0 != h.compareTo(i)) return !1
                    }
                }
                return !0
            }

            function ee() {
                this.i = 0, this.j = 0, this.S = new Array
            }

            function ie(t) {
                var e, i, n;
                for (e = 0; 256 > e; ++e) this.S[e] = e;
                for (i = 0, e = 0; 256 > e; ++e) i = i + this.S[e] + t[e % t.length] & 255, n = this.S[e], this.S[e] = this.S[i], this.S[i] = n;
                this.i = 0, this.j = 0
            }

            function ne() {
                var t;
                return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
            }

            function re() {
                return new ee
            }

            function se() {
                if (null == ke) {
                    for (ke = re(); Ke > Ue;) {
                        var t = Math.floor(65536 * Math.random());
                        Ae[Ue++] = 255 & t
                    }
                    for (ke.init(Ae), Ue = 0; Ue < Ae.length; ++Ue) Ae[Ue] = 0;
                    Ue = 0
                }
                return ke.next()
            }

            function oe(t) {
                var e;
                for (e = 0; e < t.length; ++e) t[e] = se()
            }

            function ae() {
            }

            function he(t, i) {
                return new e(t, i)
            }

            function ce(t, i) {
                if (i < t.length + 11) return console.error("Message too long for RSA"), null;
                for (var n = new Array, r = t.length - 1; r >= 0 && i > 0;) {
                    var s = t.charCodeAt(r--);
                    128 > s ? n[--i] = s : s > 127 && 2048 > s ? (n[--i] = 63 & s | 128, n[--i] = s >> 6 | 192) : (n[--i] = 63 & s | 128, n[--i] = s >> 6 & 63 | 128, n[--i] = s >> 12 | 224)
                }
                n[--i] = 0;
                for (var o = new ae, a = new Array; i > 2;) {
                    for (a[0] = 0; 0 == a[0];) o.nextBytes(a);
                    n[--i] = a[0]
                }
                return n[--i] = 2, n[--i] = 0, new e(n)
            }

            function ue() {
                this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
            }

            function le(t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = he(t, 16), this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
            }

            function fe(t) {
                return t.modPowInt(this.e, this.n)
            }

            function de(t) {
                var e = ce(t, this.n.bitLength() + 7 >> 3);
                if (null == e) return null;
                var i = this.doPublic(e);
                if (null == i) return null;
                var n = i.toString(16);
                return 0 == (1 & n.length) ? n : "0" + n
            }

            function pe(t, e) {
                for (var i = t.toByteArray(), n = 0; n < i.length && 0 == i[n];) ++n;
                if (i.length - n != e - 1 || 2 != i[n]) return null;
                for (++n; 0 != i[n];) if (++n >= i.length) return null;
                for (var r = ""; ++n < i.length;) {
                    var s = 255 & i[n];
                    128 > s ? r += String.fromCharCode(s) : s > 191 && 224 > s ? (r += String.fromCharCode((31 & s) << 6 | 63 & i[n + 1]), ++n) : (r += String.fromCharCode((15 & s) << 12 | (63 & i[n + 1]) << 6 | 63 & i[n + 2]), n += 2)
                }
                return r
            }

            function ge(t, e, i) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = he(t, 16), this.e = parseInt(e, 16), this.d = he(i, 16)) : console.error("Invalid RSA private key")
            }

            function me(t, e, i, n, r, s, o, a) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = he(t, 16), this.e = parseInt(e, 16), this.d = he(i, 16), this.p = he(n, 16), this.q = he(r, 16), this.dmp1 = he(s, 16), this.dmq1 = he(o, 16), this.coeff = he(a, 16)) : console.error("Invalid RSA private key")
            }

            function ve(t, i) {
                var n = new ae, r = t >> 1;
                this.e = parseInt(i, 16);
                for (var s = new e(i, 16); ;) {
                    for (; this.p = new e(t - r, 1, n), 0 != this.p.subtract(e.ONE).gcd(s).compareTo(e.ONE) || !this.p.isProbablePrime(10);) ;
                    for (; this.q = new e(r, 1, n), 0 != this.q.subtract(e.ONE).gcd(s).compareTo(e.ONE) || !this.q.isProbablePrime(10);) ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var o = this.p;
                        this.p = this.q, this.q = o
                    }
                    var a = this.p.subtract(e.ONE), h = this.q.subtract(e.ONE), c = a.multiply(h);
                    if (0 == c.gcd(s).compareTo(e.ONE)) {
                        this.n = this.p.multiply(this.q), this.d = s.modInverse(c), this.dmp1 = this.d.mod(a), this.dmq1 = this.d.mod(h), this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }

            function ye(t) {
                if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0;) e = e.add(this.p);
                return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
            }

            function be(t) {
                var e = he(t, 16), i = this.doPrivate(e);
                return null == i ? null : pe(i, this.n.bitLength() + 7 >> 3)
            }

            function we(t) {
                var e, i, n = "";
                for (e = 0; e + 3 <= t.length; e += 3) i = parseInt(t.substring(e, e + 3), 16), n += Je.charAt(i >> 6) + Je.charAt(63 & i);
                for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16), n += Je.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16), n += Je.charAt(i >> 2) + Je.charAt((3 & i) << 4)); (3 & n.length) > 0;) n += Le;
                return n
            }

            function xe(t) {
                var e, i, n = "", r = 0;
                for (e = 0; e < t.length && t.charAt(e) != Le; ++e) v = Je.indexOf(t.charAt(e)), v < 0 || (0 == r ? (n += a(v >> 2), i = 3 & v, r = 1) : 1 == r ? (n += a(i << 2 | v >> 4), i = 15 & v, r = 2) : 2 == r ? (n += a(i), n += a(v >> 2), i = 3 & v, r = 3) : (n += a(i << 2 | v >> 4), n += a(15 & v), r = 0));
                return 1 == r && (n += a(i << 2)), n
            }

            var Te, Se = 0xdeadbeefcafe, _e = 15715070 == (16777215 & Se);
            _e && "Microsoft Internet Explorer" == navigator.appName ? (e.prototype.am = s, Te = 30) : _e && "Netscape" != navigator.appName ? (e.prototype.am = r, Te = 26) : (e.prototype.am = o, Te = 28), e.prototype.DB = Te, e.prototype.DM = (1 << Te) - 1, e.prototype.DV = 1 << Te;
            var Ee = 52;
            e.prototype.FV = Math.pow(2, Ee), e.prototype.F1 = Ee - Te, e.prototype.F2 = 2 * Te - Ee;
            var Re, De, Ce = "0123456789abcdefghijklmnopqrstuvwxyz", Oe = new Array;
            for (Re = "0".charCodeAt(0), De = 0; 9 >= De; ++De) Oe[Re++] = De;
            for (Re = "a".charCodeAt(0), De = 10; 36 > De; ++De) Oe[Re++] = De;
            for (Re = "A".charCodeAt(0), De = 10; 36 > De; ++De) Oe[Re++] = De;
            I.prototype.convert = B, I.prototype.revert = k, I.prototype.reduce = A, I.prototype.mulTo = U, I.prototype.sqrTo = K, V.prototype.convert = M, V.prototype.revert = J, V.prototype.reduce = L, V.prototype.mulTo = q, V.prototype.sqrTo = P, e.prototype.copyTo = c, e.prototype.fromInt = u, e.prototype.fromString = f, e.prototype.clamp = d, e.prototype.dlShiftTo = x, e.prototype.drShiftTo = T, e.prototype.lShiftTo = S, e.prototype.rShiftTo = _, e.prototype.subTo = E, e.prototype.multiplyTo = R, e.prototype.squareTo = D, e.prototype.divRemTo = C, e.prototype.invDigit = N, e.prototype.isEven = j, e.prototype.exp = H, e.prototype.toString = p, e.prototype.negate = g, e.prototype.abs = m, e.prototype.compareTo = y, e.prototype.bitLength = w, e.prototype.mod = O, e.prototype.modPowInt = z, e.ZERO = l(0), e.ONE = l(1), Nt.prototype.convert = Vt, Nt.prototype.revert = Vt, Nt.prototype.mulTo = Mt, Nt.prototype.sqrTo = Jt, jt.prototype.convert = Ht, jt.prototype.revert = zt, jt.prototype.reduce = $t, jt.prototype.mulTo = Ft, jt.prototype.sqrTo = Gt;
            var Ie = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
                Be = (1 << 26) / Ie[Ie.length - 1];
            e.prototype.chunkSize = Y, e.prototype.toRadix = W, e.prototype.fromRadix = X, e.prototype.fromNumber = tt, e.prototype.bitwiseTo = st, e.prototype.changeBit = Tt, e.prototype.addTo = Rt, e.prototype.dMultiply = Ut, e.prototype.dAddOffset = Kt, e.prototype.multiplyLowerTo = Pt, e.prototype.multiplyUpperTo = qt, e.prototype.modInt = Qt, e.prototype.millerRabin = te, e.prototype.clone = $, e.prototype.intValue = G, e.prototype.byteValue = F, e.prototype.shortValue = Z, e.prototype.signum = Q, e.prototype.toByteArray = et, e.prototype.equals = it, e.prototype.min = nt, e.prototype.max = rt, e.prototype.and = at, e.prototype.or = ct, e.prototype.xor = lt, e.prototype.andNot = dt, e.prototype.not = pt, e.prototype.shiftLeft = gt, e.prototype.shiftRight = mt, e.prototype.getLowestSetBit = yt, e.prototype.bitCount = wt, e.prototype.testBit = xt, e.prototype.setBit = St, e.prototype.clearBit = _t, e.prototype.flipBit = Et, e.prototype.add = Dt, e.prototype.subtract = Ct, e.prototype.multiply = Ot, e.prototype.divide = Bt, e.prototype.remainder = kt, e.prototype.divideAndRemainder = At, e.prototype.modPow = Zt, e.prototype.modInverse = Wt, e.prototype.pow = Lt, e.prototype.gcd = Yt, e.prototype.isProbablePrime = Xt, e.prototype.square = It, ee.prototype.init = ie, ee.prototype.next = ne;
            var ke, Ae, Ue, Ke = 256;
            if (null == Ae) {
                Ae = new Array, Ue = 0;
                var Ne;
                if (window.crypto && window.crypto.getRandomValues) {
                    var Ve = new Uint32Array(256);
                    for (window.crypto.getRandomValues(Ve), Ne = 0; Ne < Ve.length; ++Ne) Ae[Ue++] = 255 & Ve[Ne]
                }
                var Me = function Fe(t) {
                    if (this.count = this.count || 0, this.count >= 256 || Ue >= Ke) return void(window.removeEventListener ? window.removeEventListener("mousemove", Fe) : window.detachEvent && window.detachEvent("onmousemove", Fe));
                    this.count += 1;
                    var e = t.x + t.y;
                    Ae[Ue++] = 255 & e
                };
                window.addEventListener ? window.addEventListener("mousemove", Me) : window.attachEvent && window.attachEvent("onmousemove", Me)
            }
            ae.prototype.nextBytes = oe, ue.prototype.doPublic = fe, ue.prototype.setPublic = le, ue.prototype.encrypt = de, ue.prototype.doPrivate = ye, ue.prototype.setPrivate = ge, ue.prototype.setPrivateEx = me, ue.prototype.generate = ve, ue.prototype.decrypt = be, function () {
                var t = function (t, i, r) {
                    var s = new ae, o = t >> 1;
                    this.e = parseInt(i, 16);
                    var a = new e(i, 16), h = this, c = function u() {
                        var i = function () {
                            if (h.p.compareTo(h.q) <= 0) {
                                var t = h.p;
                                h.p = h.q, h.q = t
                            }
                            var i = h.p.subtract(e.ONE), n = h.q.subtract(e.ONE), s = i.multiply(n);
                            0 == s.gcd(a).compareTo(e.ONE) ? (h.n = h.p.multiply(h.q), h.d = a.modInverse(s), h.dmp1 = h.d.mod(i), h.dmq1 = h.d.mod(n), h.coeff = h.q.modInverse(h.p), setTimeout(function () {
                                r()
                            }, 0)) : setTimeout(u, 0)
                        }, c = function f() {
                            h.q = n(), h.q.fromNumberAsync(o, 1, s, function () {
                                h.q.subtract(e.ONE).gcda(a, function (t) {
                                    0 == t.compareTo(e.ONE) && h.q.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(f, 0)
                                })
                            })
                        }, l = function d() {
                            h.p = n(), h.p.fromNumberAsync(t - o, 1, s, function () {
                                h.p.subtract(e.ONE).gcda(a, function (t) {
                                    0 == t.compareTo(e.ONE) && h.p.isProbablePrime(10) ? setTimeout(c, 0) : setTimeout(d, 0)
                                })
                            })
                        };
                        setTimeout(l, 0)
                    };
                    setTimeout(c, 0)
                };
                ue.prototype.generateAsync = t;
                var i = function (t, e) {
                    var i = this.s < 0 ? this.negate() : this.clone(), n = t.s < 0 ? t.negate() : t.clone();
                    if (i.compareTo(n) < 0) {
                        var r = i;
                        i = n, n = r
                    }
                    var s = i.getLowestSetBit(), o = n.getLowestSetBit();
                    if (0 > o) return void e(i);
                    o > s && (o = s), o > 0 && (i.rShiftTo(o, i), n.rShiftTo(o, n));
                    var a = function h() {
                        (s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i), (s = n.getLowestSetBit()) > 0 && n.rShiftTo(s, n), i.compareTo(n) >= 0 ? (i.subTo(n, i), i.rShiftTo(1, i)) : (n.subTo(i, n), n.rShiftTo(1, n)), i.signum() > 0 ? setTimeout(h, 0) : (o > 0 && n.lShiftTo(o, n), setTimeout(function () {
                            e(n)
                        }, 0))
                    };
                    setTimeout(a, 10)
                };
                e.prototype.gcda = i;
                var r = function (t, i, n, r) {
                    if ("number" == typeof i) if (2 > t) this.fromInt(1); else {
                        this.fromNumber(t, n), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), ht, this), this.isEven() && this.dAddOffset(1, 0);
                        var s = this, o = function c() {
                            s.dAddOffset(2, 0), s.bitLength() > t && s.subTo(e.ONE.shiftLeft(t - 1), s), s.isProbablePrime(i) ? setTimeout(function () {
                                r()
                            }, 0) : setTimeout(c, 0)
                        };
                        setTimeout(o, 0)
                    } else {
                        var a = new Array, h = 7 & t;
                        a.length = (t >> 3) + 1, i.nextBytes(a), h > 0 ? a[0] &= (1 << h) - 1 : a[0] = 0, this.fromString(a, 256)
                    }
                };
                e.prototype.fromNumberAsync = r
            }();
            var Je = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Le = "=", Pe = Pe || {};
            Pe.env = Pe.env || {};
            var qe = Pe, je = Object.prototype, He = "[object Function]", ze = ["toString", "valueOf"];
            Pe.env.parseUA = function (t) {
                var e, i = function (t) {
                    var e = 0;
                    return parseFloat(t.replace(/\./g, function () {
                        return 1 == e++ ? "" : "."
                    }))
                }, n = navigator, r = {
                    ie: 0,
                    opera: 0,
                    gecko: 0,
                    webkit: 0,
                    chrome: 0,
                    mobile: null,
                    air: 0,
                    ipad: 0,
                    iphone: 0,
                    ipod: 0,
                    ios: null,
                    android: 0,
                    webos: 0,
                    caja: n && n.cajaVersion,
                    secure: !1,
                    os: null
                }, s = t || navigator && navigator.userAgent, o = window && window.location, a = o && o.href;
                return r.secure = a && 0 === a.toLowerCase().indexOf("https"), s && (/windows|win32/i.test(s) ? r.os = "windows" : /macintosh/i.test(s) ? r.os = "macintosh" : /rhino/i.test(s) && (r.os = "rhino"), /KHTML/.test(s) && (r.webkit = 1), e = s.match(/AppleWebKit\/([^\s]*)/), e && e[1] && (r.webkit = i(e[1]), / Mobile\//.test(s) ? (r.mobile = "Apple", e = s.match(/OS ([^\s]*)/), e && e[1] && (e = i(e[1].replace("_", "."))), r.ios = e, r.ipad = r.ipod = r.iphone = 0, e = s.match(/iPad|iPod|iPhone/), e && e[0] && (r[e[0].toLowerCase()] = r.ios)) : (e = s.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/), e && (r.mobile = e[0]), /webOS/.test(s) && (r.mobile = "WebOS", e = s.match(/webOS\/([^\s]*);/), e && e[1] && (r.webos = i(e[1]))), / Android/.test(s) && (r.mobile = "Android", e = s.match(/Android ([^\s]*);/), e && e[1] && (r.android = i(e[1])))), e = s.match(/Chrome\/([^\s]*)/), e && e[1] ? r.chrome = i(e[1]) : (e = s.match(/AdobeAIR\/([^\s]*)/), e && (r.air = e[0]))), r.webkit || (e = s.match(/Opera[\s\/]([^\s]*)/), e && e[1] ? (r.opera = i(e[1]), e = s.match(/Version\/([^\s]*)/), e && e[1] && (r.opera = i(e[1])), e = s.match(/Opera Mini[^;]*/), e && (r.mobile = e[0])) : (e = s.match(/MSIE\s([^;]*)/), e && e[1] ? r.ie = i(e[1]) : (e = s.match(/Gecko\/([^\s]*)/), e && (r.gecko = 1, e = s.match(/rv:([^\s\)]*)/), e && e[1] && (r.gecko = i(e[1]))))))), r
            }, Pe.env.ua = Pe.env.parseUA(), Pe.isFunction = function (t) {
                return "function" == typeof t || je.toString.apply(t) === He
            }, Pe._IEEnumFix = Pe.env.ua.ie ? function (t, e) {
                var i, n, r;
                for (i = 0; i < ze.length; i += 1) n = ze[i], r = e[n], qe.isFunction(r) && r != je[n] && (t[n] = r)
            } : function () {
            }, Pe.extend = function (t, e, i) {
                if (!e || !t) throw new Error("extend failed, please check that all dependencies are included.");
                var n, r = function () {
                };
                if (r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t, t.superclass = e.prototype, e.prototype.constructor == je.constructor && (e.prototype.constructor = e), i) {
                    for (n in i) qe.hasOwnProperty(i, n) && (t.prototype[n] = i[n]);
                    qe._IEEnumFix(t.prototype, i)
                }
            }, "undefined" != typeof KJUR && KJUR || (window.KJUR = {}), "undefined" != typeof KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}), KJUR.asn1.ASN1Util = new function () {
                this.integerToByteHex = function (t) {
                    var e = t.toString(16);
                    return e.length % 2 == 1 && (e = "0" + e), e
                }, this.bigIntToMinTwosComplementsHex = function (t) {
                    var i = t.toString(16);
                    if ("-" != i.substr(0, 1)) i.length % 2 == 1 ? i = "0" + i : i.match(/^[0-7]/) || (i = "00" + i); else {
                        var n = i.substr(1), r = n.length;
                        r % 2 == 1 ? r += 1 : i.match(/^[0-7]/) || (r += 2);
                        for (var s = "", o = 0; r > o; o++) s += "f";
                        var a = new e(s, 16), h = a.xor(t).add(e.ONE);
                        i = h.toString(16).replace(/^-/, "")
                    }
                    return i
                }, this.getPEMStringFromHex = function (t, e) {
                    var i = CryptoJS.enc.Hex.parse(t), n = CryptoJS.enc.Base64.stringify(i),
                        r = n.replace(/(.{64})/g, "$1\r\n");
                    return r = r.replace(/\r\n$/, ""), "-----BEGIN " + e + "-----\r\n" + r + "\r\n-----END " + e + "-----\r\n"
                }
            }, KJUR.asn1.ASN1Object = function () {
                var t = "";
                this.getLengthHexFromValue = function () {
                    if ("undefined" == typeof this.hV || null == this.hV) throw"this.hV is null or undefined.";
                    if (this.hV.length % 2 == 1) throw"value hex must be even length: n=" + t.length + ",v=" + this.hV;
                    var e = this.hV.length / 2, i = e.toString(16);
                    if (i.length % 2 == 1 && (i = "0" + i), 128 > e) return i;
                    var n = i.length / 2;
                    if (n > 15) throw"ASN.1 length too long to represent by 8x: n = " + e.toString(16);
                    var r = 128 + n;
                    return r.toString(16) + i
                }, this.getEncodedHex = function () {
                    return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
                }, this.getValueHex = function () {
                    return this.getEncodedHex(), this.hV
                }, this.getFreshValueHex = function () {
                    return ""
                }
            }, KJUR.asn1.DERAbstractString = function (t) {
                KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
                this.getString = function () {
                    return this.s
                }, this.setString = function (t) {
                    this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s)
                }, this.setStringHex = function (t) {
                    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
                }, this.getFreshValueHex = function () {
                    return this.hV
                }, "undefined" != typeof t && ("undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex && this.setStringHex(t.hex))
            }, Pe.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object), KJUR.asn1.DERAbstractTime = function (t) {
                KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
                this.localDateToUTC = function (t) {
                    utc = t.getTime() + 6e4 * t.getTimezoneOffset();
                    var e = new Date(utc);
                    return e
                }, this.formatDate = function (t, e) {
                    var i = this.zeroPadding, n = this.localDateToUTC(t), r = String(n.getFullYear());
                    "utc" == e && (r = r.substr(2, 2));
                    var s = i(String(n.getMonth() + 1), 2), o = i(String(n.getDate()), 2),
                        a = i(String(n.getHours()), 2), h = i(String(n.getMinutes()), 2),
                        c = i(String(n.getSeconds()), 2);
                    return r + s + o + a + h + c + "Z"
                }, this.zeroPadding = function (t, e) {
                    return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
                }, this.getString = function () {
                    return this.s
                }, this.setString = function (t) {
                    this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s)
                }, this.setByDateValue = function (t, e, i, n, r, s) {
                    var o = new Date(Date.UTC(t, e - 1, i, n, r, s, 0));
                    this.setByDate(o)
                }, this.getFreshValueHex = function () {
                    return this.hV
                }
            }, Pe.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object), KJUR.asn1.DERAbstractStructured = function (t) {
                KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
                this.setByASN1ObjectArray = function (t) {
                    this.hTLV = null, this.isModified = !0, this.asn1Array = t
                }, this.appendASN1Object = function (t) {
                    this.hTLV = null, this.isModified = !0, this.asn1Array.push(t)
                }, this.asn1Array = new Array, "undefined" != typeof t && "undefined" != typeof t.array && (this.asn1Array = t.array)
            }, Pe.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object), KJUR.asn1.DERBoolean = function () {
                KJUR.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
            }, Pe.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object), KJUR.asn1.DERInteger = function (t) {
                KJUR.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function (t) {
                    this.hTLV = null, this.isModified = !0, this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                }, this.setByInteger = function (t) {
                    var i = new e(String(t), 10);
                    this.setByBigInteger(i)
                }, this.setValueHex = function (t) {
                    this.hV = t
                }, this.getFreshValueHex = function () {
                    return this.hV
                }, "undefined" != typeof t && ("undefined" != typeof t.bigint ? this.setByBigInteger(t.bigint) : "undefined" != typeof t["int"] ? this.setByInteger(t["int"]) : "undefined" != typeof t.hex && this.setValueHex(t.hex))
            }, Pe.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object), KJUR.asn1.DERBitString = function (t) {
                KJUR.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function (t) {
                    this.hTLV = null, this.isModified = !0, this.hV = t
                }, this.setUnusedBitsAndHexValue = function (t, e) {
                    if (0 > t || t > 7) throw"unused bits shall be from 0 to 7: u = " + t;
                    var i = "0" + t;
                    this.hTLV = null, this.isModified = !0, this.hV = i + e
                }, this.setByBinaryString = function (t) {
                    t = t.replace(/0+$/, "");
                    var e = 8 - t.length % 8;
                    8 == e && (e = 0);
                    for (var i = 0; e >= i; i++) t += "0";
                    for (var n = "", i = 0; i < t.length - 1; i += 8) {
                        var r = t.substr(i, 8), s = parseInt(r, 2).toString(16);
                        1 == s.length && (s = "0" + s), n += s
                    }
                    this.hTLV = null, this.isModified = !0, this.hV = "0" + e + n
                }, this.setByBooleanArray = function (t) {
                    for (var e = "", i = 0; i < t.length; i++) e += 1 == t[i] ? "1" : "0";
                    this.setByBinaryString(e)
                }, this.newFalseArray = function (t) {
                    for (var e = new Array(t), i = 0; t > i; i++) e[i] = !1;
                    return e
                }, this.getFreshValueHex = function () {
                    return this.hV
                }, "undefined" != typeof t && ("undefined" != typeof t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : "undefined" != typeof t.bin ? this.setByBinaryString(t.bin) : "undefined" != typeof t.array && this.setByBooleanArray(t.array))
            }, Pe.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object), KJUR.asn1.DEROctetString = function (t) {
                KJUR.asn1.DEROctetString.superclass.constructor.call(this, t), this.hT = "04"
            }, Pe.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERNull = function () {
                KJUR.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
            }, Pe.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object), KJUR.asn1.DERObjectIdentifier = function (t) {
                var i = function (t) {
                    var e = t.toString(16);
                    return 1 == e.length && (e = "0" + e), e
                }, n = function (t) {
                    var n = "", r = new e(t, 10), s = r.toString(2), o = 7 - s.length % 7;
                    7 == o && (o = 0);
                    for (var a = "", h = 0; o > h; h++) a += "0";
                    s = a + s;
                    for (var h = 0; h < s.length - 1; h += 7) {
                        var c = s.substr(h, 7);
                        h != s.length - 7 && (c = "1" + c), n += i(parseInt(c, 2))
                    }
                    return n
                };
                KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function (t) {
                    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
                }, this.setValueOidString = function (t) {
                    if (!t.match(/^[0-9.]+$/)) throw"malformed oid string: " + t;
                    var e = "", r = t.split("."), s = 40 * parseInt(r[0]) + parseInt(r[1]);
                    e += i(s), r.splice(0, 2);
                    for (var o = 0; o < r.length; o++) e += n(r[o]);
                    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e
                }, this.setValueName = function (t) {
                    if ("undefined" == typeof KJUR.asn1.x509.OID.name2oidList[t]) throw"DERObjectIdentifier oidName undefined: " + t;
                    var e = KJUR.asn1.x509.OID.name2oidList[t];
                    this.setValueOidString(e)
                }, this.getFreshValueHex = function () {
                    return this.hV
                }, "undefined" != typeof t && ("undefined" != typeof t.oid ? this.setValueOidString(t.oid) : "undefined" != typeof t.hex ? this.setValueHex(t.hex) : "undefined" != typeof t.name && this.setValueName(t.name))
            }, Pe.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object), KJUR.asn1.DERUTF8String = function (t) {
                KJUR.asn1.DERUTF8String.superclass.constructor.call(this, t), this.hT = "0c"
            }, Pe.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString), KJUR.asn1.DERNumericString = function (t) {
                KJUR.asn1.DERNumericString.superclass.constructor.call(this, t), this.hT = "12"
            }, Pe.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERPrintableString = function (t) {
                KJUR.asn1.DERPrintableString.superclass.constructor.call(this, t), this.hT = "13"
            }, Pe.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERTeletexString = function (t) {
                KJUR.asn1.DERTeletexString.superclass.constructor.call(this, t), this.hT = "14"
            }, Pe.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERIA5String = function (t) {
                KJUR.asn1.DERIA5String.superclass.constructor.call(this, t), this.hT = "16"
            }, Pe.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString), KJUR.asn1.DERUTCTime = function (t) {
                KJUR.asn1.DERUTCTime.superclass.constructor.call(this, t), this.hT = "17", this.setByDate = function (t) {
                    this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
                }, "undefined" != typeof t && ("undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex ? this.setStringHex(t.hex) : "undefined" != typeof t.date && this.setByDate(t.date))
            }, Pe.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime), KJUR.asn1.DERGeneralizedTime = function (t) {
                KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, t), this.hT = "18", this.setByDate = function (t) {
                    this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen"), this.hV = stohex(this.s)
                }, "undefined" != typeof t && ("undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex ? this.setStringHex(t.hex) : "undefined" != typeof t.date && this.setByDate(t.date))
            }, Pe.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime), KJUR.asn1.DERSequence = function (t) {
                KJUR.asn1.DERSequence.superclass.constructor.call(this, t), this.hT = "30", this.getFreshValueHex = function () {
                    for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                        var i = this.asn1Array[e];
                        t += i.getEncodedHex()
                    }
                    return this.hV = t, this.hV
                }
            }, Pe.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured), KJUR.asn1.DERSet = function (t) {
                KJUR.asn1.DERSet.superclass.constructor.call(this, t), this.hT = "31", this.getFreshValueHex = function () {
                    for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                        var i = this.asn1Array[e];
                        t.push(i.getEncodedHex())
                    }
                    return t.sort(), this.hV = t.join(""), this.hV
                }
            }, Pe.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured), KJUR.asn1.DERTaggedObject = function (t) {
                KJUR.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function (t, e, i) {
                    this.hT = e, this.isExplicit = t, this.asn1Object = i, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = i.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1)
                }, this.getFreshValueHex = function () {
                    return this.hV
                }, "undefined" != typeof t && ("undefined" != typeof t.tag && (this.hT = t.tag), "undefined" != typeof t.explicit && (this.isExplicit = t.explicit), "undefined" != typeof t.obj && (this.asn1Object = t.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
            }, Pe.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object), function (t) {
                var e, i = {};
                i.decode = function (i) {
                    var n;
                    if (e === t) {
                        var r = "0123456789ABCDEF", s = " \f\n\r	\xa0\u2028\u2029";
                        for (e = [], n = 0; 16 > n; ++n) e[r.charAt(n)] = n;
                        for (r = r.toLowerCase(), n = 10; 16 > n; ++n) e[r.charAt(n)] = n;
                        for (n = 0; n < s.length; ++n) e[s.charAt(n)] = -1
                    }
                    var o = [], a = 0, h = 0;
                    for (n = 0; n < i.length; ++n) {
                        var c = i.charAt(n);
                        if ("=" == c) break;
                        if (c = e[c], -1 != c) {
                            if (c === t) throw"Illegal character at offset " + n;
                            a |= c, ++h >= 2 ? (o[o.length] = a, a = 0, h = 0) : a <<= 4
                        }
                    }
                    if (h) throw"Hex encoding incomplete: 4 bits missing";
                    return o
                }, window.Hex = i
            }(), function (t) {
                var e, i = {};
                i.decode = function (i) {
                    var n;
                    if (e === t) {
                        var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                            s = "= \f\n\r	\xa0\u2028\u2029";
                        for (e = [], n = 0; 64 > n; ++n) e[r.charAt(n)] = n;
                        for (n = 0; n < s.length; ++n) e[s.charAt(n)] = -1
                    }
                    var o = [], a = 0, h = 0;
                    for (n = 0; n < i.length; ++n) {
                        var c = i.charAt(n);
                        if ("=" == c) break;
                        if (c = e[c], -1 != c) {
                            if (c === t) throw"Illegal character at offset " + n;
                            a |= c, ++h >= 4 ? (o[o.length] = a >> 16, o[o.length] = a >> 8 & 255, o[o.length] = 255 & a, a = 0, h = 0) : a <<= 6
                        }
                    }
                    switch (h) {
                        case 1:
                            throw"Base64 encoding incomplete: at least 2 bits missing";
                        case 2:
                            o[o.length] = a >> 10;
                            break;
                        case 3:
                            o[o.length] = a >> 16, o[o.length] = a >> 8 & 255
                    }
                    return o
                }, i.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, i.unarmor = function (t) {
                    var e = i.re.exec(t);
                    if (e) if (e[1]) t = e[1]; else {
                        if (!e[2]) throw"RegExp out of sync";
                        t = e[2]
                    }
                    return i.decode(t)
                }, window.Base64 = i
            }(), function (t) {
                function e(t, i) {
                    t instanceof e ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = i)
                }

                function n(t, e, i, n, r) {
                    this.stream = t, this.header = e, this.length = i, this.tag = n, this.sub = r
                }

                var r = 100, s = "\u2026", o = {
                    tag: function (t, e) {
                        var i = document.createElement(t);
                        return i.className = e, i
                    }, text: function (t) {
                        return document.createTextNode(t)
                    }
                };
                e.prototype.get = function (e) {
                    if (e === t && (e = this.pos++), e >= this.enc.length) throw"Requesting byte offset " + e + " on a stream of length " + this.enc.length;
                    return this.enc[e]
                }, e.prototype.hexDigits = "0123456789ABCDEF", e.prototype.hexByte = function (t) {
                    return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
                }, e.prototype.hexDump = function (t, e, i) {
                    for (var n = "", r = t; e > r; ++r) if (n += this.hexByte(this.get(r)), i !== !0) switch (15 & r) {
                        case 7:
                            n += "  ";
                            break;
                        case 15:
                            n += "\n";
                            break;
                        default:
                            n += " "
                    }
                    return n
                }, e.prototype.parseStringISO = function (t, e) {
                    for (var i = "", n = t; e > n; ++n) i += String.fromCharCode(this.get(n));
                    return i
                }, e.prototype.parseStringUTF = function (t, e) {
                    for (var i = "", n = t; e > n;) {
                        var r = this.get(n++);
                        i += 128 > r ? String.fromCharCode(r) : r > 191 && 224 > r ? String.fromCharCode((31 & r) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & r) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
                    }
                    return i
                }, e.prototype.parseStringBMP = function (t, e) {
                    for (var i = "", n = t; e > n; n += 2) {
                        var r = this.get(n), s = this.get(n + 1);
                        i += String.fromCharCode((r << 8) + s)
                    }
                    return i
                }, e.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, e.prototype.parseTime = function (t, e) {
                    var i = this.parseStringISO(t, e), n = this.reTime.exec(i);
                    return n ? (i = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4], n[5] && (i += ":" + n[5], n[6] && (i += ":" + n[6], n[7] && (i += "." + n[7]))), n[8] && (i += " UTC", "Z" != n[8] && (i += n[8], n[9] && (i += ":" + n[9]))), i) : "Unrecognized time: " + i
                }, e.prototype.parseInteger = function (t, e) {
                    var i = e - t;
                    if (i > 4) {
                        i <<= 3;
                        var n = this.get(t);
                        if (0 === n) i -= 8; else for (; 128 > n;) n <<= 1, --i;
                        return "(" + i + " bit)"
                    }
                    for (var r = 0, s = t; e > s; ++s) r = r << 8 | this.get(s);
                    return r
                }, e.prototype.parseBitString = function (t, e) {
                    var i = this.get(t), n = (e - t - 1 << 3) - i, r = "(" + n + " bit)";
                    if (20 >= n) {
                        var s = i;
                        r += " ";
                        for (var o = e - 1; o > t; --o) {
                            for (var a = this.get(o), h = s; 8 > h; ++h) r += a >> h & 1 ? "1" : "0";
                            s = 0
                        }
                    }
                    return r
                }, e.prototype.parseOctetString = function (t, e) {
                    var i = e - t, n = "(" + i + " byte) ";
                    i > r && (e = t + r);
                    for (var o = t; e > o; ++o) n += this.hexByte(this.get(o));
                    return i > r && (n += s), n
                }, e.prototype.parseOID = function (t, e) {
                    for (var i = "", n = 0, r = 0, s = t; e > s; ++s) {
                        var o = this.get(s);
                        if (n = n << 7 | 127 & o, r += 7, !(128 & o)) {
                            if ("" === i) {
                                var a = 80 > n ? 40 > n ? 0 : 1 : 2;
                                i = a + "." + (n - 40 * a)
                            } else i += "." + (r >= 31 ? "bigint" : n);
                            n = r = 0
                        }
                    }
                    return i
                }, n.prototype.typeName = function () {
                    if (this.tag === t) return "unknown";
                    var e = this.tag >> 6, i = (this.tag >> 5 & 1, 31 & this.tag);
                    switch (e) {
                        case 0:
                            switch (i) {
                                case 0:
                                    return "EOC";
                                case 1:
                                    return "BOOLEAN";
                                case 2:
                                    return "INTEGER";
                                case 3:
                                    return "BIT_STRING";
                                case 4:
                                    return "OCTET_STRING";
                                case 5:
                                    return "NULL";
                                case 6:
                                    return "OBJECT_IDENTIFIER";
                                case 7:
                                    return "ObjectDescriptor";
                                case 8:
                                    return "EXTERNAL";
                                case 9:
                                    return "REAL";
                                case 10:
                                    return "ENUMERATED";
                                case 11:
                                    return "EMBEDDED_PDV";
                                case 12:
                                    return "UTF8String";
                                case 16:
                                    return "SEQUENCE";
                                case 17:
                                    return "SET";
                                case 18:
                                    return "NumericString";
                                case 19:
                                    return "PrintableString";
                                case 20:
                                    return "TeletexString";
                                case 21:
                                    return "VideotexString";
                                case 22:
                                    return "IA5String";
                                case 23:
                                    return "UTCTime";
                                case 24:
                                    return "GeneralizedTime";
                                case 25:
                                    return "GraphicString";
                                case 26:
                                    return "VisibleString";
                                case 27:
                                    return "GeneralString";
                                case 28:
                                    return "UniversalString";
                                case 30:
                                    return "BMPString";
                                default:
                                    return "Universal_" + i.toString(16)
                            }
                        case 1:
                            return "Application_" + i.toString(16);
                        case 2:
                            return "[" + i + "]";
                        case 3:
                            return "Private_" + i.toString(16)
                    }
                }, n.prototype.reSeemsASCII = /^[ -~]+$/, n.prototype.content = function () {
                    if (this.tag === t) return null;
                    var e = this.tag >> 6, i = 31 & this.tag, n = this.posContent(), o = Math.abs(this.length);
                    if (0 !== e) {
                        if (null !== this.sub) return "(" + this.sub.length + " elem)";
                        var a = this.stream.parseStringISO(n, n + Math.min(o, r));
                        return this.reSeemsASCII.test(a) ? a.substring(0, 2 * r) + (a.length > 2 * r ? s : "") : this.stream.parseOctetString(n, n + o)
                    }
                    switch (i) {
                        case 1:
                            return 0 === this.stream.get(n) ? "false" : "true";
                        case 2:
                            return this.stream.parseInteger(n, n + o);
                        case 3:
                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(n, n + o);
                        case 4:
                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + o);
                        case 6:
                            return this.stream.parseOID(n, n + o);
                        case 16:
                        case 17:
                            return "(" + this.sub.length + " elem)";
                        case 12:
                            return this.stream.parseStringUTF(n, n + o);
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 26:
                            return this.stream.parseStringISO(n, n + o);
                        case 30:
                            return this.stream.parseStringBMP(n, n + o);
                        case 23:
                        case 24:
                            return this.stream.parseTime(n, n + o)
                    }
                    return null
                }, n.prototype.toString = function () {
                    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
                }, n.prototype.print = function (e) {
                    if (e === t && (e = ""), document.writeln(e + this), null !== this.sub) {
                        e += "  ";
                        for (var i = 0, n = this.sub.length; n > i; ++i) this.sub[i].print(e)
                    }
                }, n.prototype.toPrettyString = function (e) {
                    e === t && (e = "");
                    var i = e + this.typeName() + " @" + this.stream.pos;
                    if (this.length >= 0 && (i += "+"), i += this.length, 32 & this.tag ? i += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (i += " (encapsulates)"), i += "\n", null !== this.sub) {
                        e += "  ";
                        for (var n = 0, r = this.sub.length; r > n; ++n) i += this.sub[n].toPrettyString(e)
                    }
                    return i
                }, n.prototype.toDOM = function () {
                    var t = o.tag("div", "node");
                    t.asn1 = this;
                    var e = o.tag("div", "head"), n = this.typeName().replace(/_/g, " ");
                    e.innerHTML = n;
                    var r = this.content();
                    if (null !== r) {
                        r = String(r).replace(/</g, "&lt;");
                        var s = o.tag("span", "preview");
                        s.appendChild(o.text(r)), e.appendChild(s)
                    }
                    t.appendChild(e), this.node = t, this.head = e;
                    var a = o.tag("div", "value");
                    if (n = "Offset: " + this.stream.pos + "<br/>", n += "Length: " + this.header + "+", n += this.length >= 0 ? this.length : -this.length + " (undefined)", 32 & this.tag ? n += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (n += "<br/>(encapsulates)"), null !== r && (n += "<br/>Value:<br/><b>" + r + "</b>", "object" === ("undefined" == typeof oids ? "undefined" : i(oids)) && 6 == this.tag)) {
                        var h = oids[r];
                        h && (h.d && (n += "<br/>" + h.d), h.c && (n += "<br/>" + h.c), h.w && (n += "<br/>(warning!)"))
                    }
                    a.innerHTML = n, t.appendChild(a);
                    var c = o.tag("div", "sub");
                    if (null !== this.sub) for (var u = 0, l = this.sub.length; l > u; ++u) c.appendChild(this.sub[u].toDOM());
                    return t.appendChild(c), e.onclick = function () {
                        t.className = "node collapsed" == t.className ? "node" : "node collapsed"
                    }, t
                }, n.prototype.posStart = function () {
                    return this.stream.pos
                }, n.prototype.posContent = function () {
                    return this.stream.pos + this.header
                }, n.prototype.posEnd = function () {
                    return this.stream.pos + this.header + Math.abs(this.length)
                }, n.prototype.fakeHover = function (t) {
                    this.node.className += " hover", t && (this.head.className += " hover")
                }, n.prototype.fakeOut = function (t) {
                    var e = / ?hover/;
                    this.node.className = this.node.className.replace(e, ""), t && (this.head.className = this.head.className.replace(e, ""))
                }, n.prototype.toHexDOM_sub = function (t, e, i, n, r) {
                    if (!(n >= r)) {
                        var s = o.tag("span", e);
                        s.appendChild(o.text(i.hexDump(n, r))), t.appendChild(s)
                    }
                }, n.prototype.toHexDOM = function (e) {
                    var i = o.tag("span", "hex");
                    if (e === t && (e = i), this.head.hexNode = i, this.head.onmouseover = function () {
                        this.hexNode.className = "hexCurrent"
                    }, this.head.onmouseout = function () {
                        this.hexNode.className = "hex"
                    }, i.asn1 = this, i.onmouseover = function () {
                        var t = !e.selected;
                        t && (e.selected = this.asn1, this.className = "hexCurrent"), this.asn1.fakeHover(t)
                    }, i.onmouseout = function () {
                        var t = e.selected == this.asn1;
                        this.asn1.fakeOut(t), t && (e.selected = null, this.className = "hex")
                    }, this.toHexDOM_sub(i, "tag", this.stream, this.posStart(), this.posStart() + 1), this.toHexDOM_sub(i, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()), null === this.sub) i.appendChild(o.text(this.stream.hexDump(this.posContent(), this.posEnd()))); else if (this.sub.length > 0) {
                        var n = this.sub[0], r = this.sub[this.sub.length - 1];
                        this.toHexDOM_sub(i, "intro", this.stream, this.posContent(), n.posStart());
                        for (var s = 0, a = this.sub.length; a > s; ++s) i.appendChild(this.sub[s].toHexDOM(e));
                        this.toHexDOM_sub(i, "outro", this.stream, r.posEnd(), this.posEnd())
                    }
                    return i
                }, n.prototype.toHexString = function (t) {
                    return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
                }, n.decodeLength = function (t) {
                    var e = t.get(), i = 127 & e;
                    if (i == e) return i;
                    if (i > 3) throw"Length over 24 bits not supported at position " + (t.pos - 1);
                    if (0 === i) return -1;
                    e = 0;
                    for (var n = 0; i > n; ++n) e = e << 8 | t.get();
                    return e
                }, n.hasContent = function (t, i, r) {
                    if (32 & t) return !0;
                    if (3 > t || t > 4) return !1;
                    var s = new e(r);
                    3 == t && s.get();
                    var o = s.get();
                    if (o >> 6 & 1) return !1;
                    try {
                        var a = n.decodeLength(s);
                        return s.pos - r.pos + a == i
                    } catch (h) {
                        return !1
                    }
                }, n.decode = function (t) {
                    t instanceof e || (t = new e(t, 0));
                    var i = new e(t), r = t.get(), s = n.decodeLength(t), o = t.pos - i.pos, a = null;
                    if (n.hasContent(r, s, t)) {
                        var h = t.pos;
                        if (3 == r && t.get(), a = [], s >= 0) {
                            for (var c = h + s; t.pos < c;) a[a.length] = n.decode(t);
                            if (t.pos != c) throw"Content size is not correct for container starting at offset " + h
                        } else try {
                            for (; ;) {
                                var u = n.decode(t);
                                if (0 === u.tag) break;
                                a[a.length] = u
                            }
                            s = h - t.pos
                        } catch (l) {
                            throw"Exception while decoding undefined length content: " + l
                        }
                    } else t.pos += s;
                    return new n(i, o, s, r, a)
                }, n.test = function () {
                    for (var t = [{value: [39], expected: 39}, {
                        value: [129, 201],
                        expected: 201
                    }, {value: [131, 254, 220, 186], expected: 16702650}], i = 0, r = t.length; r > i; ++i) {
                        var s = new e(t[i].value, 0), o = n.decodeLength(s);
                        o != t[i].expected && document.write("In test[" + i + "] expected " + t[i].expected + " got " + o + "\n")
                    }
                }, window.ASN1 = n
            }(), ASN1.prototype.getHexStringValue = function () {
                var t = this.toHexString(), e = 2 * this.header, i = 2 * this.length;
                return t.substr(e, i)
            }, ue.prototype.parseKey = function (t) {
                try {
                    var e = 0, i = 0, n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
                        r = n.test(t) ? Hex.decode(t) : Base64.unarmor(t), s = ASN1.decode(r);
                    if (9 === s.sub.length) {
                        e = s.sub[1].getHexStringValue(), this.n = he(e, 16), i = s.sub[2].getHexStringValue(), this.e = parseInt(i, 16);
                        var o = s.sub[3].getHexStringValue();
                        this.d = he(o, 16);
                        var a = s.sub[4].getHexStringValue();
                        this.p = he(a, 16);
                        var h = s.sub[5].getHexStringValue();
                        this.q = he(h, 16);
                        var c = s.sub[6].getHexStringValue();
                        this.dmp1 = he(c, 16);
                        var u = s.sub[7].getHexStringValue();
                        this.dmq1 = he(u, 16);
                        var l = s.sub[8].getHexStringValue();
                        this.coeff = he(l, 16)
                    } else {
                        if (2 !== s.sub.length) return !1;
                        var f = s.sub[1], d = f.sub[0];
                        e = d.sub[0].getHexStringValue(), this.n = he(e, 16), i = d.sub[1].getHexStringValue(), this.e = parseInt(i, 16)
                    }
                    return !0
                } catch (p) {
                    return !1
                }
            }, ue.prototype.getPrivateBaseKey = function () {
                var t = {array: [new KJUR.asn1.DERInteger({"int": 0}), new KJUR.asn1.DERInteger({bigint: this.n}), new KJUR.asn1.DERInteger({"int": this.e}), new KJUR.asn1.DERInteger({bigint: this.d}), new KJUR.asn1.DERInteger({bigint: this.p}), new KJUR.asn1.DERInteger({bigint: this.q}), new KJUR.asn1.DERInteger({bigint: this.dmp1}), new KJUR.asn1.DERInteger({bigint: this.dmq1}), new KJUR.asn1.DERInteger({bigint: this.coeff})]},
                    e = new KJUR.asn1.DERSequence(t);
                return e.getEncodedHex()
            }, ue.prototype.getPrivateBaseKeyB64 = function () {
                return we(this.getPrivateBaseKey())
            }, ue.prototype.getPublicBaseKey = function () {
                var t = {array: [new KJUR.asn1.DERObjectIdentifier({oid: "1.2.840.113549.1.1.1"}), new KJUR.asn1.DERNull]},
                    e = new KJUR.asn1.DERSequence(t);
                t = {array: [new KJUR.asn1.DERInteger({bigint: this.n}), new KJUR.asn1.DERInteger({"int": this.e})]};
                var i = new KJUR.asn1.DERSequence(t);
                t = {hex: "00" + i.getEncodedHex()};
                var n = new KJUR.asn1.DERBitString(t);
                t = {array: [e, n]};
                var r = new KJUR.asn1.DERSequence(t);
                return r.getEncodedHex()
            }, ue.prototype.getPublicBaseKeyB64 = function () {
                return we(this.getPublicBaseKey())
            }, ue.prototype.wordwrap = function (t, e) {
                if (e = e || 64, !t) return t;
                var i = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(i, "g")).join("\n")
            }, ue.prototype.getPrivateKey = function () {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n", t += "-----END RSA PRIVATE KEY-----"
            }, ue.prototype.getPublicKey = function () {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += this.wordwrap(this.getPublicBaseKeyB64()) + "\n", t += "-----END PUBLIC KEY-----"
            }, ue.prototype.hasPublicKeyProperty = function (t) {
                return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e")
            }, ue.prototype.hasPrivateKeyProperty = function (t) {
                return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }, ue.prototype.parsePropertiesFrom = function (t) {
                this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff)
            };
            var $e = function (t) {
                ue.call(this), t && ("string" == typeof t ? this.parseKey(t) : (this.hasPrivateKeyProperty(t) || this.hasPublicKeyProperty(t)) && this.parsePropertiesFrom(t))
            };
            $e.prototype = new ue, $e.prototype.constructor = $e;
            var Ge = function (t) {
                t = t || {}, this.default_key_size = parseInt(t.default_key_size) || 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = null
            };
            Ge.prototype.setKey = function (t) {
                this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new $e(t)
            }, Ge.prototype.setPrivateKey = function (t) {
                this.setKey(t)
            }, Ge.prototype.setPublicKey = function (t) {
                this.setKey(t)
            }, Ge.prototype.decrypt = function (t) {
                try {
                    return this.getKey().decrypt(xe(t))
                } catch (e) {
                    return !1
                }
            }, Ge.prototype.encrypt = function (t) {
                try {
                    return we(this.getKey().encrypt(t))
                } catch (e) {
                    return !1
                }
            }, Ge.prototype.getKey = function (t) {
                if (!this.key) {
                    if (this.key = new $e, t && "[object Function]" === {}.toString.call(t)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }, Ge.prototype.getPrivateKey = function () {
                return this.getKey().getPrivateKey()
            }, Ge.prototype.getPrivateKeyB64 = function () {
                return this.getKey().getPrivateBaseKeyB64()
            }, Ge.prototype.getPublicKey = function () {
                return this.getKey().getPublicKey()
            }, Ge.prototype.getPublicKeyB64 = function () {
                return this.getKey().getPublicBaseKeyB64()
            }, t.JSEncrypt = Ge
        }(n);
        var r = n.JSEncrypt;
        window.JSEncrypt = r
    }, function (t, e, i) {
        !function (e, i) {
            t.exports = i()
        }(this, function () {
            "use strict";
            var t = function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }, e = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }

                return function (e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }();
            return new (function () {
                function i() {
                    t(this, i), this._load = this._throttle(this._loadOriginFunc, 100), this._load()
                }

                return e(i, [{
                    key: "init", value: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {
                            };
                        this._load(function () {
                            return e(new ShieldCaptain(t))
                        })
                    }
                }, {
                    key: "_loadOriginFunc", value: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {
                        };
                        if (window.ShieldCaptain) return t();
                        var e = document.createElement("script");
                        e.type = "text/javascript", e.id = "shieldcaptain-bootstrap", e.src = "https://shieldcaptain.mogujie.com/getcapjs?_=" + parseInt(Date.now() / 1e4), e.onload = t, document.body.appendChild(e)
                    }
                }, {
                    key: "_throttle", value: function (t, e) {
                        var i = void 0, n = void 0, r = Date.now();
                        return function () {
                            function s() {
                                r = Date.now(), i = null, t.apply(o, a)
                            }

                            var o = this, a = arguments;
                            clearTimeout(i), n = Date.now() - r, n > e ? s() : i = setTimeout(s, e - n)
                        }
                    }
                }]), i
            }())
        })
    }, function (t, e) {
        t.exports = '<div class="login_box clearfix">\n  <p class="error_tip">\u8bf7\u8f93\u5165\u5bc6\u7801\uff01</p>\n  <div class="lg_form">\n      <ul class="mod_box lo_mod_box" data-isshow="0">\n          <li class="login_title">\n              <a class="fr eb_mod" href="javascript:;">\u624b\u673a\u52a8\u6001\u5bc6\u7801\u767b\u5f55</a>\n              <b>\u666e\u901a\u767b\u5f55</b>\n          </li>\n          <li class="lg_item lg_name">\n              <b class="lg_icon"></b>\n              <input type="text" maxlength="32" class="text r3" name="uname" def-v="\u624b\u673a/\u90ae\u7bb1/\u7528\u6237\u540d" value="\u624b\u673a/\u90ae\u7bb1/\u7528\u6237\u540d" style="border-color: rgb(20 20 207); color:#ccc;">\n          </li>\n          <li class="lg_item u_passwd">\n              <b class="lg_icon"></b>\n              <input type="password" name="pass" class="text">\n          </li>\n      </ul>\n      <ul class="mod_box eb_mod_box" data-isshow="0">\n          <li class="login_title">\n              <a class="fr lo_mod" href="javascript:;">\u666e\u901a\u767b\u5f55</a>\n              <b>\u624b\u673a\u52a8\u6001\u5bc6\u7801\u767b\u5f55</b>\n          </li>\n          <li class="lg_item lg_name">\n              <b class="lg_icon"></b>\n              <input type="text" maxlength="32" class="text r3" name="uname" def-v="\u624b\u673a" value="\u624b\u673a" style="border-color: rgb(20 20 207); color:#ccc;">\n          </li>\n          <li class="lg_item lg_code">\n              <b class="lg_icon"></b>\n              <input type="text" maxlength="32" class="text r3" name="telcode" def-v="\u52a8\u6001\u5bc6\u7801" value="\u52a8\u6001\u5bc6\u7801" style="border-color: rgb(20 20 207); color:#ccc;">\n          </li>\n          <li class="lg_chk"></li>\n          <li class="lg_item lg_getcode">\n              <a href="javascript:;" class="get_tel_code" id="get_tel_code" send-method="nologin" tel-input-id="uname" ready-text="\u83b7\u53d6\u624b\u673a\u52a8\u6001\u5bc6\u7801" wait-text="\u91cd\u65b0\u83b7\u53d6\u52a8\u6001\u5bc6\u7801">\u83b7\u53d6\u624b\u673a\u52a8\u6001\u5bc6\u7801</a>\n          </li>\n      </ul>\n      <div id="_content_wrap">\n        <div id="_content"></div>\n        <div id="_content_mask"></div>\n      </div>\n\n      <input type="hidden" id="imgchecktype">\n      <div class="lg_remember"><input type="checkbox" name="remember" class="checkbox" checked=""> \u8bb0\u4f4f\u6211\uff08\u4e24\u5468\u514d\u767b\u5f55\uff09</div>\n      <div class="lg_login">\n          <input type="button" value="" class="sub">\n          <input type="hidden" value="" id="imgcheckvalue">\n          <a class="ml10" href="//portal.mogujie.com/user/findpwd" target="_blank">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a>\n      </div>\n  </div>\n  <div class="login_other">\n      <span>\u5176\u4ed6\u767b\u5f55\u65b9\u5f0f</span>\n      <a href="javascript:;" class="ui-ot-btn login_qq" data-type="qq"></a>\n      <a href="javascript:;" class="ui-ot-btn login_wx" data-type="weixin"></a>\n  </div>\n</div>\n<script id="_script"></script>\n'
    }])
}), "function" == typeof define && define.amd && require(["pc/common/login/index"]);