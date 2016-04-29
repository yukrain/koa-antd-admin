var ptui_daid=encodeURIComponent(""),ptui_appid=encodeURIComponent("636026402"),ptui_domain=encodeURIComponent("qq.com"),ptui_regmaster=encodeURIComponent(""),ptui_lang=encodeURIComponent("2052"),ptui_pt_version=encodeURIComponent("10153"),ptui_version=encodeURIComponent("201203081004"),ptui_style=encodeURIComponent("9"),ptui_noAuth="0",g_href="http\x3A\x2F\x2Fui.ptlogin2.qq.com\x2Fcgi-bin\x2Flogin\x3Fappid\x3D636026402\x26hln_css\x3Dhttp\x3A\x2F\x2Fmat1.gtimg.com\x2Fwww\x2Fwebapp\x2Fimages\x2Fshipei_logo.png\x26style\x3D8\x26s_url\x3Dhttp\x3A\x2F\x2Fxw.qq.com\x2Findex.htm\x26low_login\x3D0\x26pt_no_onekey\x3D0",ptui_pt_qzone_sig="0",ptui_pt_light="0",ptui_pt_ttype="0",ptui_pt_3rd_aid=encodeURIComponent("0"),ptui_enablePwd=encodeURIComponent(""),ptui_target=encodeURIComponent("_top"),ptui_low_login=parseInt("0",10)||0,ptui_low_login_hour=parseInt("0",10)||720,ptui_kf_csimc=encodeURIComponent("0"),ptui_kf_csnum=encodeURIComponent("0"),ptui_kf_authid=encodeURIComponent("0"),ptui_defuin="",ptui_lockuin=parseInt("0");1==ptui_daid&&(ptui_daid=0);var STR_LANG={no_uin:"您还没有输入帐号！",no_password:"您还没有输入密码！",no_code:"您还没有输入验证码！",err_uin:"请输入正确的帐号！",less_code:"请输入完整的验证码！",err_code:"请输入完整的验证码！",onekey:"一键登录",onekeying:"正在拉起手机QQ...",offline:"网络异常"};
function wxapi() {
    var t = location.href,
        e = t.indexOf("#");
    e > 0 && (t = t.substr(0, e)), $.http.loadScript("http://ptlogin2.qq.com/weixin_sig?callback=weixin_sig_cb&url=" + encodeURIComponent(t))
}
function ptui_qrcode_CB(t) {
    clearTimeout(pt._timer), t && 0 == t.ec && pt.qrcode.polling(t.qrcode)
}
function weixin_sig_cb(t) {
    t && (wx.config({
        beta: !0,
        appId: t.appId,
        timestamp: t.timestamp,
        nonceStr: t.nonceStr,
        signature: t.signature,
        jsApiList: ["getNetworkType", "getInstallState"]
    }), wx.ready(function() {
        wx.invoke("getInstallState", {
            packageName: "com.tencent.mobileqq",
            packageUrl: "wtloginmqq3://"
        }, function(t) {
            var e, n = t && t.err_msg;
            if (n && (e = n.match(/:yes(?:_(\d+))?/))) {
                var i = 336;
                (pt.isIPhone || pt.isAndroid && e[1] >= i) && pt.showOneKey()
            }
        })
    }))
}
function ptui_checkVC(t, e, n, i, o) {
    clearTimeout(pt._timer), pt.cb_checkVC(t, e, n, i, o)
}
function ptui_changeImg() {}
function ptuiCB(t, e, n, i, o, r) {
    clearTimeout(pt._timer), pt.cb(t, e, n, i, o, r)
}
function imgLoadReport() {}
function ptui_checkValidate() {
    return pt.checkValidate()
}
function ptui_auth_CB(t, e) {
    switch (parseInt(t)) {
        case 0:
            pt.isHulian ? pt.setCookieLogin() : pt.showAuth(e), pt.qqBrowserQlogin();
            break;
        case 1:
            var n = navigator.userAgent,
                i = n.match(/QQ\/(\d\.\d\.\d)/i);
            if (i && i[1] >= "5.9") {
                top.location.href = "//ptlogin2.qq.com/jump?clientuin=$UIN&clientkey=$KEY&keyindex=$KEYINDEX&u1=" + encodeURIComponent(pt.s_url);
                break
            }
            pt.qqBrowserQlogin(), pt.isHulian && pt.cancel_cookielogin();
            break;
        case 2:
            if (pt.isHulian) {
                pt.setCookieLogin(), pt.qqBrowserQlogin();
                break
            }
            var o = e + "&regmaster=" + window.ptui_regmaster + "&aid=" + window.ptui_appid + "&s_url=" + encodeURIComponent(pt.s_url);
            1 == pt.low_login_enable && (o += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour), "1" == window.ptui_pt_ttype && (o += "&pt_ttype=1"), "1" == window.ptui_pt_light && (o += "&pt_light=1"), pt.redirect(pt.target, o);
            break;
        default:
            pt.qqBrowserQlogin()
    }
}
function ptui_qlogin_CB(t, e, n) {
    switch (t + "") {
        case "0":
            pt.redirect(pt.target, e);
            break;
        case "5":
            if (MTT.refreshToken) {
                var i = setTimeout(function() {
                    pt.showErr(n)
                }, 3e3);
                MTT.refreshToken(pt.qqBrowserInfo.uin, function(t) {
                    MTT.refreshToken = null, t.stweb && ($.report.monitor("624562"), clearTimeout(i), pt.qqBrowserInfo.loginkey = t.stweb, pt.qlogin_submit())
                }), $.report.monitor("624561")
            } else pt.showErr(n);
            break;
        default:
            $.report.nlog("qq浏览器快速登录失败," + t, "443881", pt.qqBrowserInfo.uin), pt.showErr(n)
    }
}
function OneKey(t) {
    if (OneKey.done = !1, OneKey.TIMEOUT = 3e3, pt.isWX) {
        OneKey.TIMEOUT = 5e3, OneKey.qrcode = !0;
        for (var e in OneKey.ERRMSG) OneKey.ERRMSG.hasOwnProperty(e) && (OneKey.ERRMSG[e] = OneKey.ERRMSG[e].replace(/<a.*>([^<]*)<\/a>/, "$1"));
        pt.qrcode.get()
    } else setTimeout(function() {
        openApp(t)
    }, 100)
}
function openApp(t, e, n) {
    if (!OneKey.done && !pt.isLaunching) {
        pt.isLaunching = !0;
        var i = OneKey.TIMEOUT,
            o = new Date;
        pt.btnOnekey.innerHTML = STR_LANG.onekeying, setTimeout(function() {
            e && e(), pt.isLaunching = !1, pt.btnOnekey.innerHTML = STR_LANG.onekey, pt.qrcode.done || new Date - o <= i + 200 && (n && n(), pt.showErr(OneKey.ERRMSG[ptui_lang], 5e3), $.report.nlog("callApp failed:" + navigator.userAgent, 424783))
        }, i), pt.isWX && pt.isAndroid ? setTimeout(function() {
            doOpenApp(t)
        }, 100) : doOpenApp(t)
    }
}
function doOpenApp(t) {
    var e = $.detectBrowser(),
        n = e[0];
    if (pt.isAndroid) {
        var i = e[1] || "location";
        if (n) {
            var o = n.toLowerCase(),
                r = {
                    ucbrowser: "ucweb"
                };
            r[o] && (t += "&schemacallback=" + encodeURIComponent(r[o] + "://"))
        }
        switch (i) {
            case "iframe":
                openApp.iframe ? openApp.iframe.src = t : (openApp.iframe = document.createElement("iframe"), openApp.iframe.src = t, openApp.iframe.style.display = "none", document.body.appendChild(openApp.iframe)), openApp.flag = "iframe";
                break;
            case "open":
                var a = window.open(t, "_blank");
                setTimeout(function() {
                    a.close()
                }, 0), openApp.flag = "open";
                break;
            case "location":
                location.href = t, openApp.flag = "location"
        }
    } else n && "ucbrowser" == n.toLowerCase() && (t += "&schemacallback=" + encodeURIComponent("ucbrowser://")), pt.isInIframe ? top.location.href = t : location.href = t, openApp.flag = "location"
}
function openSDKCallBack(t) {
    var e = t.result,
        n = t.data,
        i = t.sn;
    switch (i) {
        case 4:
            openSDK.md5Pwd = n, openSDK.result = e, openSDK.callbackArray[i].call()
    }
}
function get_app_basicinfo(t) {
    pt.open.fillAppInfo(t)
}
var $ = window.Simple = function(t) {
    return "string" == typeof t ? document.getElementById(t) : t
};
$.cookie = {
    get: function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    },
    set: function(t, e, n, i, o) {
        var r = new Date;
        o ? (r.setTime(r.getTime() + 36e5 * o), document.cookie = t + "=" + e + "; expires=" + r.toGMTString() + "; path=" + (i ? i : "/") + "; " + (n ? "domain=" + n + ";" : "")) : document.cookie = t + "=" + e + "; path=" + (i ? i : "/") + "; " + (n ? "domain=" + n + ";" : "")
    },
    del: function(t, e, n) {
        document.cookie = t + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (n ? n : "/") + "; " + (e ? "domain=" + e + ";" : "")
    },
    uin: function() {
        var t = $.cookie.get("uin");
        return t ? parseInt(t.substring(1, t.length), 10) : null
    }
}, $.http = {
    jsonp: function(t) {
        var e = document.createElement("script");
        e.src = t, document.getElementsByTagName("head")[0].appendChild(e)
    },
    loadScript: function(t, e) {
        var n = document.createElement("script");
        n.onload = n.onreadystatechange = function() {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(), n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n))
        }, n.src = t, document.getElementsByTagName("head")[0].appendChild(n)
    },
    ajax: function(url, para, cb, method, type) {
        var xhr = new XMLHttpRequest;
        return xhr.open(method, url), xhr.onreadystatechange = function() {
            4 == xhr.readyState && ((xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status || 1223 === xhr.status || 0 === xhr.status) && cb("undefined" == typeof type && xhr.responseText ? eval("(" + xhr.responseText + ")") : xhr.responseText), xhr = null)
        }, xhr.send(para), xhr
    },
    get: function(t, e, n, i) {
        if (e) {
            var o = [];
            for (var r in e) e.hasOwnProperty(r) && o.push(r + "=" + e[r]); - 1 == t.indexOf("?") && (t += "?"), t += o.join("&")
        }
        return $.http.ajax(t, null, n, "GET", i)
    },
    preload: function(t) {
        var e = document.createElement("img");
        e.src = t, e = null
    }
}, $.get = $.http.get, $.post = $.http.post, $.jsonp = $.http.jsonp, $.browser = function(t) {
    if ("undefined" == typeof $.browser.info) {
        var e = {
                type: ""
            },
            n = navigator.userAgent.toLowerCase();
        /chrome/.test(n) ? e = {
            type: "chrome",
            version: /chrome[\/ ]([\w.]+)/
        } : /opera/.test(n) ? e = {
            type: "opera",
            version: /version/.test(n) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/
        } : /msie/.test(n) ? e = {
            type: "msie",
            version: /msie ([\w.]+)/
        } : /mozilla/.test(n) && !/compatible/.test(n) ? e = {
            type: "ff",
            version: /rv:([\w.]+)/
        } : /safari/.test(n) && (e = {
            type: "safari",
            version: /safari[\/ ]([\w.]+)/
        }), e.version = (e.version && e.version.exec(n) || [0, "0"])[1], $.browser.info = e
    }
    return $.browser.info[t]
}, $.e = {
    _counter: 0,
    _uid: function() {
        return "h" + $.e._counter++
    },
    add: function(t, e, n) {
        if ("object" != typeof t && (t = $(t)), document.addEventListener) t.addEventListener(e, n, !1);
        else if (document.attachEvent) {
            if (-1 != $.e._find(t, e, n)) return;
            var i = function(e) {
                e || (e = window.event);
                var i = {
                    _event: e,
                    type: e.type,
                    target: e.srcElement,
                    currentTarget: t,
                    relatedTarget: e.fromElement ? e.fromElement : e.toElement,
                    eventPhase: e.srcElement == t ? 2 : 3,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    keyCode: e.keyCode,
                    data: e.data,
                    origin: e.origin,
                    stopPropagation: function() {
                        this._event.cancelBubble = !0
                    },
                    preventDefault: function() {
                        this._event.returnValue = !1
                    }
                };
                Function.prototype.call ? n.call(t, i) : (t._currentHandler = n, t._currentHandler(i), t._currentHandler = null)
            };
            t.attachEvent("on" + e, i);
            var o = {
                    element: t,
                    eventType: e,
                    handler: n,
                    wrappedHandler: i
                },
                r = t.document || t,
                a = r.parentWindow,
                p = $.e._uid();
            a._allHandlers || (a._allHandlers = {}), a._allHandlers[p] = o, t._handlers || (t._handlers = []), t._handlers.push(p), a._onunloadHandlerRegistered || (a._onunloadHandlerRegistered = !0, a.attachEvent("onunload", $.e._removeAllHandlers))
        }
    },
    remove: function(t, e, n) {
        if (document.addEventListener) t.removeEventListener(e, n, !1);
        else if (document.attachEvent) {
            var i = $.e._find(t, e, n);
            if (-1 == i) return;
            var o = t.document || t,
                r = o.parentWindow,
                a = t._handlers[i],
                p = r._allHandlers[a];
            t.detachEvent("on" + e, p.wrappedHandler), t._handlers.splice(i, 1), delete r._allHandlers[a]
        }
    },
    _find: function(t, e, n) {
        var i = t._handlers;
        if (!i) return -1;
        for (var o = t.document || t, r = o.parentWindow, a = i.length - 1; a >= 0; a--) {
            var p = i[a],
                s = r._allHandlers[p];
            if (s.eventType == e && s.handler == n) return a
        }
        return -1
    },
    _removeAllHandlers: function() {
        var t = this;
        for (id in t._allHandlers) {
            var e = t._allHandlers[id];
            e.element.detachEvent("on" + e.eventType, e.wrappedHandler), delete t._allHandlers[id]
        }
    },
    src: function(t) {
        return t ? t.target : event.srcElement
    },
    stopPropagation: function(t) {
        t ? t.stopPropagation() : event.cancelBubble = !0
    }
}, $.bom = {
    query: function(t) {
        var e = window.location.search.match(new RegExp("(\\?|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    }
}, $.winName = {
    set: function(t, e) {
        var n = window.name || "";
        window.name = n.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? n.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + e) : n + ";" + t + "=" + e
    },
    get: function(t) {
        var e = window.name || "",
            n = e.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
        return n ? n[1] : ""
    },
    clear: function(t) {
        var e = window.name || "";
        window.name = e.replace(new RegExp(";" + t + "=([^;]*)"), "")
    }
}, $.localStorage = {
    isSurport: function() {
        try {
            return window.localStorage ? !0 : !1
        } catch (t) {
            return !1
        }
    },
    get: function(t) {
        var e = "";
        try {
            e = window.localStorage.getItem(t)
        } catch (n) {
            e = ""
        }
        return e
    },
    set: function(t, e) {
        try {
            window.localStorage.setItem(t, e)
        } catch (n) {}
    },
    remove: function(t) {
        try {
            window.localStorage.removeItem(t)
        } catch (e) {}
    }
}, $.str = function() {
    var htmlDecodeDict = {
            quot: '"',
            lt: "<",
            gt: ">",
            amp: "&",
            nbsp: " ",
            "#34": '"',
            "#60": "<",
            "#62": ">",
            "#38": "&",
            "#160": " "
        },
        htmlEncodeDict = {
            '"': "#34",
            "<": "#60",
            ">": "#62",
            "&": "#38",
            " ": "#160"
        };
    return {
        decodeHtml: function(t) {
            return t += "", t.replace(/&(quot|lt|gt|amp|nbsp);/gi, function(t, e) {
                return htmlDecodeDict[e]
            }).replace(/&#u([a-f\d]{4});/gi, function(t, e) {
                return String.fromCharCode(parseInt("0x" + e))
            }).replace(/&#(\d+);/gi, function(t, e) {
                return String.fromCharCode(+e)
            })
        },
        encodeHtml: function(t) {
            return t += "", t.replace(/["<>& ]/g, function(t) {
                return "&" + htmlEncodeDict[t] + ";"
            })
        },
        trim: function(t) {
            t += "";
            for (var t = t.replace(/^\s+/, ""), e = /\s/, n = t.length; e.test(t.charAt(--n)););
            return t.slice(0, n + 1)
        },
        uin2hex: function(str) {
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++) hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2) arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'), result
        },
        bin2String: function(t) {
            for (var e = [], n = 0, i = t.length; i > n; n++) {
                var o = t.charCodeAt(n).toString(16);
                1 == o.length && (o = "0" + o), e.push(o)
            }
            return e = "0x" + e.join(""), e = parseInt(e, 16)
        },
        utf8ToUincode: function(t) {
            var e = "";
            try {
                var n = t.length,
                    o = [];
                for (i = 0; i < n; i += 2) o.push("%" + t.substr(i, 2));
                e = decodeURIComponent(o.join("")), e = $.str.decodeHtml(e)
            } catch (r) {
                e = ""
            }
            return e
        },
        json2str: function(t) {
            var e = "";
            if ("undefined" != typeof JSON) e = JSON.stringify(t);
            else {
                var n = [];
                for (var i in t) n.push("'" + i + "':'" + t[i] + "'");
                e = "{" + n.join(",") + "}"
            }
            return e
        },
        time33: function(t) {
            for (var e = 0, n = 0, i = t.length; i > n; n++) e = 33 * e + t.charCodeAt(n);
            return e % 4294967296
        },
        hash33: function(t) {
            for (var e = 0, n = 0, i = t.length; i > n; ++n) e += (e << 5) + t.charCodeAt(n);
            return 2147483647 & e
        }
    }
}(), $.css = function() {
    return {
        show: function(t) {
            "string" == typeof t && (t = $(t)), t.style.display = "block"
        },
        hide: function(t) {
            "string" == typeof t && (t = $(t)), t.style.display = "none"
        },
        getElementViewTop: function(t) {
            for (var e = $(t), n = e.offsetTop, i = e.offsetParent; null !== i;) n += i.offsetTop, i = i.offsetParent;
            if ("BackCompat" == document.compatMode) var o = document.body.scrollTop;
            else var o = document.documentElement.scrollTop;
            return n - o
        }
    }
}(), $.check = {
    isHttps: function() {
        return "https:" == document.location.protocol
    },
    isSsl: function() {
        var t = document.location.host;
        return /^ssl./i.test(t)
    },
    isIpad: function() {
        var t = navigator.userAgent.toLowerCase();
        return /ipad/i.test(t)
    },
    isQQ: function(t) {
        return /^[1-9]{1}\d{4,9}$/.test(t)
    },
    isNullQQ: function(t) {
        return /^\d{1,4}$/.test(t)
    },
    isNick: function(t) {
        return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t)
    },
    isName: function(t) {
        return "<请输入帐号>" == t ? !1 : /[\u4E00-\u9FA5]{1,8}/.test(t)
    },
    isPhone: function(t) {
        return /^(?:86|886|)1\d{10}\s*$/.test(t)
    },
    isDXPhone: function(t) {
        return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(t)
    },
    isSeaPhone: function(t) {
        return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t)
    },
    isMail: function(t) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)
    },
    isPassword: function(t) {
        return t && t.length >= 16
    },
    isForeignPhone: function(t) {
        return /^00\d{7,}/.test(t)
    },
    needVip: function(t) {
        for (var e = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912", "717016513"], n = !0, i = 0, o = e.length; o > i; i++) if (e[i] == t) {
            n = !1;
            break
        }
        return n
    },
    isPaipai: function() {
        return /paipai.com$/.test(window.location.hostname)
    },
    isPaipaiDuokefu: function(t) {
        return /^.+@.+$/.test(t)
    },
    is_weibo_appid: function(t) {
        return 46000101 == t || 607000101 == t || 558032501 == t ? !0 : !1
    }
}, $.report = {
    monitor: function(t, e) {
        if (!(Math.random() > (e || 1))) {
            var n = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t;
            $.http.preload(n)
        }
    },
    nlog: function(t, e, n) {
        var i = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?" : "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
            o = encodeURIComponent(t + "|_|" + location.href + "|_|" + window.navigator.userAgent);
        e = e ? e : 0, n && (i += "u=" + n + "&"), i += "id=" + e + "&msg=" + o + "&v=" + Math.random(), $.http.preload(i)
    },
    log: function(t) {
        $.http.preload("http://console.log?msg=" + encodeURIComponent("string" == typeof t ? t : JSON.stringify(t)))
    }
}, $.detectBrowser = function() {
    var t, e = navigator.userAgent;
    if (/android/i.test(e)) {
        if (t = e.match(/MQQBrowser|UCBrowser|360Browser|Firefox|MicroMessenger/i)) t[1] = "location";
        else if (t = e.match(/baidubrowse|SogouMobileBrowser|LieBaoFast|XiaoMi\/MiuiBrowser|opr|vivo/i)) t[1] = "iframe";
        else if (t = e.match(/Chrome/i)) {
            var n = e.match(/chrome\/([\d]+)/i);
            n && (n = n[1]), 40 != n && (t[1] = "open")
        }
    } else / iphone | ipod /gi.test(e) && ((t = e.match(/MQQBrowser|UCBrowser|baidubrowse|Opera|360Browser|LieBao/i)) || (t = e.match(/CriOS|Chrome/i)) && "crios" == t[0].toLowerCase() && (t[0] = "Chrome"));
    return t || ["others", ""]
}, function() {
    var t = "nohost_guid",
        e = "/nohost_htdocs/js/SwitchHost.js";
    "" != $.cookie.get(t) && $.http.loadScript(e, function() {
        var t = window.SwitchHost && window.SwitchHost.init;
        t && t()
    })
}(), setTimeout(function() {
    var t = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
    $.check.isHttps() && (t = "https://login.qq.com/cgi-bin/r.cgi?"), t += "flag1=7808&flag2=1&flag3=9";
    var e = .01;
    Math.random() < (e || 1) && (t += "undefined" != typeof window.postMessage ? "&2=2000" : "&2=1000", t += "&v=" + Math.random(), $.http.preload(t))
}, 500), $ = window.$ || {}, $pt = window.$pt || {}, $.RSA = $pt.RSA = function() {
    function t(t, e) {
        return new a(t, e)
    }
    function e(t, e) {
        if (e < t.length + 11) return uv_alert("Message too long for RSA"), null;
        for (var n = new Array, i = t.length - 1; i >= 0 && e > 0;) {
            var o = t.charCodeAt(i--);
            n[--e] = o
        }
        n[--e] = 0;
        for (var r = new Y, p = new Array; e > 2;) {
            for (p[0] = 0; 0 == p[0];) r.nextBytes(p);
            n[--e] = p[0]
        }
        return n[--e] = 2, n[--e] = 0, new a(n)
    }
    function n() {
        this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
    }
    function i(e, n) {
        null != e && null != n && e.length > 0 && n.length > 0 ? (this.n = t(e, 16), this.e = parseInt(n, 16)) : uv_alert("Invalid RSA public key")
    }
    function o(t) {
        return t.modPowInt(this.e, this.n)
    }
    function r(t) {
        var n = e(t, this.n.bitLength() + 7 >> 3);
        if (null == n) return null;
        var i = this.doPublic(n);
        if (null == i) return null;
        var o = i.toString(16);
        return 0 == (1 & o.length) ? o : "0" + o
    }
    function a(t, e, n) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    function p() {
        return new a(null)
    }
    function s(t, e, n, i, o, r) {
        for (; --r >= 0;) {
            var a = e * this[t++] + n[i] + o;
            o = Math.floor(a / 67108864), n[i++] = 67108863 & a
        }
        return o
    }
    function c(t, e, n, i, o, r) {
        for (var a = 32767 & e, p = e >> 15; --r >= 0;) {
            var s = 32767 & this[t],
                c = this[t++] >> 15,
                u = p * s + c * a;
            s = a * s + ((32767 & u) << 15) + n[i] + (1073741823 & o), o = (s >>> 30) + (u >>> 15) + p * c + (o >>> 30), n[i++] = 1073741823 & s
        }
        return o
    }
    function u(t, e, n, i, o, r) {
        for (var a = 16383 & e, p = e >> 14; --r >= 0;) {
            var s = 16383 & this[t],
                c = this[t++] >> 14,
                u = p * s + c * a;
            s = a * s + ((16383 & u) << 14) + n[i] + o, o = (s >> 28) + (u >> 14) + p * c, n[i++] = 268435455 & s
        }
        return o
    }
    function l(t) {
        return lt.charAt(t)
    }
    function d(t, e) {
        var n = dt[t.charCodeAt(e)];
        return null == n ? -1 : n
    }
    function h(t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        t.t = this.t, t.s = this.s
    }
    function f(t) {
        this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
    }
    function g(t) {
        var e = p();
        return e.fromInt(t), e
    }
    function m(t, e) {
        var n;
        if (16 == e) n = 4;
        else if (8 == e) n = 3;
        else if (256 == e) n = 8;
        else if (2 == e) n = 1;
        else if (32 == e) n = 5;
        else {
            if (4 != e) return void this.fromRadix(t, e);
            n = 2
        }
        this.t = 0, this.s = 0;
        for (var i = t.length, o = !1, r = 0; --i >= 0;) {
            var p = 8 == n ? 255 & t[i] : d(t, i);
            0 > p ? "-" == t.charAt(i) && (o = !0) : (o = !1, 0 == r ? this[this.t++] = p : r + n > this.DB ? (this[this.t - 1] |= (p & (1 << this.DB - r) - 1) << r, this[this.t++] = p >> this.DB - r) : this[this.t - 1] |= p << r, r += n, r >= this.DB && (r -= this.DB))
        }
        8 == n && 0 != (128 & t[0]) && (this.s = -1, r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)), this.clamp(), o && a.ZERO.subTo(this, this)
    }
    function _() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
    }
    function w(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
            if (4 != t) return this.toRadix(t);
            e = 2
        }
        var n, i = (1 << e) - 1,
            o = !1,
            r = "",
            a = this.t,
            p = this.DB - a * this.DB % e;
        if (a-- > 0) for (p < this.DB && (n = this[a] >> p) > 0 && (o = !0, r = l(n)); a >= 0;) e > p ? (n = (this[a] & (1 << p) - 1) << e - p, n |= this[--a] >> (p += this.DB - e)) : (n = this[a] >> (p -= e) & i, 0 >= p && (p += this.DB, --a)), n > 0 && (o = !0), o && (r += l(n));
        return o ? r : "0"
    }
    function v() {
        var t = p();
        return a.ZERO.subTo(this, t), t
    }
    function y() {
        return this.s < 0 ? this.negate() : this
    }
    function b(t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var n = this.t;
        if (e = n - t.t, 0 != e) return e;
        for (; --n >= 0;) if (0 != (e = this[n] - t[n])) return e;
        return 0
    }
    function k(t) {
        var e, n = 1;
        return 0 != (e = t >>> 16) && (t = e, n += 16), 0 != (e = t >> 8) && (t = e, n += 8), 0 != (e = t >> 4) && (t = e, n += 4), 0 != (e = t >> 2) && (t = e, n += 2), 0 != (e = t >> 1) && (t = e, n += 1), n
    }
    function $() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + k(this[this.t - 1] ^ this.s & this.DM)
    }
    function q(t, e) {
        var n;
        for (n = this.t - 1; n >= 0; --n) e[n + t] = this[n];
        for (n = t - 1; n >= 0; --n) e[n] = 0;
        e.t = this.t + t, e.s = this.s
    }
    function S(t, e) {
        for (var n = t; n < this.t; ++n) e[n - t] = this[n];
        e.t = Math.max(this.t - t, 0), e.s = this.s
    }
    function A(t, e) {
        var n, i = t % this.DB,
            o = this.DB - i,
            r = (1 << o) - 1,
            a = Math.floor(t / this.DB),
            p = this.s << i & this.DM;
        for (n = this.t - 1; n >= 0; --n) e[n + a + 1] = this[n] >> o | p, p = (this[n] & r) << i;
        for (n = a - 1; n >= 0; --n) e[n] = 0;
        e[a] = p, e.t = this.t + a + 1, e.s = this.s, e.clamp()
    }
    function T(t, e) {
        e.s = this.s;
        var n = Math.floor(t / this.DB);
        if (n >= this.t) return void(e.t = 0);
        var i = t % this.DB,
            o = this.DB - i,
            r = (1 << i) - 1;
        e[0] = this[n] >> i;
        for (var a = n + 1; a < this.t; ++a) e[a - n - 1] |= (this[a] & r) << o, e[a - n] = this[a] >> i;
        i > 0 && (e[this.t - n - 1] |= (this.s & r) << o), e.t = this.t - n, e.clamp()
    }
    function I(t, e) {
        for (var n = 0, i = 0, o = Math.min(t.t, this.t); o > n;) i += this[n] - t[n], e[n++] = i & this.DM, i >>= this.DB;
        if (t.t < this.t) {
            for (i -= t.s; n < this.t;) i += this[n], e[n++] = i & this.DM, i >>= this.DB;
            i += this.s
        } else {
            for (i += this.s; n < t.t;) i -= t[n], e[n++] = i & this.DM, i >>= this.DB;
            i -= t.s
        }
        e.s = 0 > i ? -1 : 0, -1 > i ? e[n++] = this.DV + i : i > 0 && (e[n++] = i), e.t = n, e.clamp()
    }
    function E(t, e) {
        var n = this.abs(),
            i = t.abs(),
            o = n.t;
        for (e.t = o + i.t; --o >= 0;) e[o] = 0;
        for (o = 0; o < i.t; ++o) e[o + n.t] = n.am(0, i[o], e, o, 0, n.t);
        e.s = 0, e.clamp(), this.s != t.s && a.ZERO.subTo(e, e)
    }
    function C(t) {
        for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0;) t[n] = 0;
        for (n = 0; n < e.t - 1; ++n) {
            var i = e.am(n, e[n], t, 2 * n, 0, 1);
            (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, i, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV, t[n + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)), t.s = 0, t.clamp()
    }
    function D(t, e, n) {
        var i = t.abs();
        if (!(i.t <= 0)) {
            var o = this.abs();
            if (o.t < i.t) return null != e && e.fromInt(0), void(null != n && this.copyTo(n));
            null == n && (n = p());
            var r = p(),
                s = this.s,
                c = t.s,
                u = this.DB - k(i[i.t - 1]);
            u > 0 ? (i.lShiftTo(u, r), o.lShiftTo(u, n)) : (i.copyTo(r), o.copyTo(n));
            var l = r.t,
                d = r[l - 1];
            if (0 != d) {
                var h = d * (1 << this.F1) + (l > 1 ? r[l - 2] >> this.F2 : 0),
                    f = this.FV / h,
                    g = (1 << this.F1) / h,
                    m = 1 << this.F2,
                    _ = n.t,
                    w = _ - l,
                    v = null == e ? p() : e;
                for (r.dlShiftTo(w, v), n.compareTo(v) >= 0 && (n[n.t++] = 1, n.subTo(v, n)), a.ONE.dlShiftTo(l, v), v.subTo(r, r); r.t < l;) r[r.t++] = 0;
                for (; --w >= 0;) {
                    var y = n[--_] == d ? this.DM : Math.floor(n[_] * f + (n[_ - 1] + m) * g);
                    if ((n[_] += r.am(0, y, n, w, 0, l)) < y) for (r.dlShiftTo(w, v), n.subTo(v, n); n[_] < --y;) n.subTo(v, n)
                }
                null != e && (n.drShiftTo(l, e), s != c && a.ZERO.subTo(e, e)), n.t = l, n.clamp(), u > 0 && n.rShiftTo(u, n), 0 > s && a.ZERO.subTo(n, n)
            }
        }
    }
    function B(t) {
        var e = p();
        return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(a.ZERO) > 0 && t.subTo(e, e), e
    }
    function M(t) {
        this.m = t
    }
    function x(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function L(t) {
        return t
    }
    function O(t) {
        t.divRemTo(this.m, null, t)
    }
    function H(t, e, n) {
        t.multiplyTo(e, n), this.reduce(n)
    }
    function R(t, e) {
        t.squareTo(e), this.reduce(e)
    }
    function K() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15, e = e * (2 - (255 & t) * e) & 255, e = e * (2 - ((65535 & t) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e
    }
    function U(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
    }
    function N(t) {
        var e = p();
        return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e), e
    }
    function P(t) {
        var e = p();
        return t.copyTo(e), this.reduce(e), e
    }
    function F(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var n = 32767 & t[e],
                i = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (n = e + this.m.t, t[n] += this.m.am(0, i, t, e, 0, this.m.t); t[n] >= t.DV;) t[n] -= t.DV, t[++n]++
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function Q(t, e) {
        t.squareTo(e), this.reduce(e)
    }
    function j(t, e, n) {
        t.multiplyTo(e, n), this.reduce(n)
    }
    function V() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function z(t, e) {
        if (t > 4294967295 || 1 > t) return a.ONE;
        var n = p(),
            i = p(),
            o = e.convert(this),
            r = k(t) - 1;
        for (o.copyTo(n); --r >= 0;) if (e.sqrTo(n, i), (t & 1 << r) > 0) e.mulTo(i, o, n);
        else {
            var s = n;
            n = i, i = s
        }
        return e.revert(n)
    }
    function G(t, e) {
        var n;
        return n = 256 > t || e.isEven() ? new M(e) : new U(e), this.exp(t, n)
    }
    function J(t) {
        ft[gt++] ^= 255 & t, ft[gt++] ^= t >> 8 & 255, ft[gt++] ^= t >> 16 & 255, ft[gt++] ^= t >> 24 & 255, gt >= wt && (gt -= wt)
    }
    function W() {
        J((new Date).getTime())
    }
    function Z() {
        if (null == ht) {
            for (W(), ht = it(), ht.init(ft), gt = 0; gt < ft.length; ++gt) ft[gt] = 0;
            gt = 0
        }
        return ht.next()
    }
    function X(t) {
        var e;
        for (e = 0; e < t.length; ++e) t[e] = Z()
    }
    function Y() {}
    function tt() {
        this.i = 0, this.j = 0, this.S = new Array
    }
    function et(t) {
        var e, n, i;
        for (e = 0; 256 > e; ++e) this.S[e] = e;
        for (n = 0, e = 0; 256 > e; ++e) n = n + this.S[e] + t[e % t.length] & 255, i = this.S[e], this.S[e] = this.S[n], this.S[n] = i;
        this.i = 0, this.j = 0
    }
    function nt() {
        var t;
        return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
    }
    function it() {
        return new tt
    }
    function ot(t, e, i) {
        e = "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7", i = "3";
        var o = new n;
        return o.setPublic(e, i), o.encrypt(t)
    }
    n.prototype.doPublic = o, n.prototype.setPublic = i, n.prototype.encrypt = r;
    var rt, at = 0xdeadbeefcafe,
        pt = 15715070 == (16777215 & at);
    pt && "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = c, rt = 30) : pt && "Netscape" != navigator.appName ? (a.prototype.am = s, rt = 26) : (a.prototype.am = u, rt = 28), a.prototype.DB = rt, a.prototype.DM = (1 << rt) - 1, a.prototype.DV = 1 << rt;
    var st = 52;
    a.prototype.FV = Math.pow(2, st), a.prototype.F1 = st - rt, a.prototype.F2 = 2 * rt - st;
    var ct, ut, lt = "0123456789abcdefghijklmnopqrstuvwxyz",
        dt = new Array;
    for (ct = "0".charCodeAt(0), ut = 0; 9 >= ut; ++ut) dt[ct++] = ut;
    for (ct = "a".charCodeAt(0), ut = 10; 36 > ut; ++ut) dt[ct++] = ut;
    for (ct = "A".charCodeAt(0), ut = 10; 36 > ut; ++ut) dt[ct++] = ut;
    M.prototype.convert = x, M.prototype.revert = L, M.prototype.reduce = O, M.prototype.mulTo = H, M.prototype.sqrTo = R, U.prototype.convert = N, U.prototype.revert = P, U.prototype.reduce = F, U.prototype.mulTo = j, U.prototype.sqrTo = Q, a.prototype.copyTo = h, a.prototype.fromInt = f, a.prototype.fromString = m, a.prototype.clamp = _, a.prototype.dlShiftTo = q, a.prototype.drShiftTo = S, a.prototype.lShiftTo = A, a.prototype.rShiftTo = T, a.prototype.subTo = I, a.prototype.multiplyTo = E, a.prototype.squareTo = C, a.prototype.divRemTo = D, a.prototype.invDigit = K, a.prototype.isEven = V, a.prototype.exp = z, a.prototype.toString = w, a.prototype.negate = v, a.prototype.abs = y, a.prototype.compareTo = b, a.prototype.bitLength = $, a.prototype.mod = B, a.prototype.modPowInt = G, a.ZERO = g(0), a.ONE = g(1);
    var ht, ft, gt;
    if (null == ft) {
        ft = new Array, gt = 0;
        var mt;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var _t = window.crypto.random(32);
            for (mt = 0; mt < _t.length; ++mt) ft[gt++] = 255 & _t.charCodeAt(mt)
        }
        for (; wt > gt;) mt = Math.floor(65536 * Math.random()), ft[gt++] = mt >>> 8, ft[gt++] = 255 & mt;
        gt = 0, W()
    }
    Y.prototype.nextBytes = X, tt.prototype.init = et, tt.prototype.next = nt;
    var wt = 256;
    return {
        rsa_encrypt: ot
    }
}(), function(t) {
    function e() {
        return Math.round(4294967295 * Math.random())
    }
    function n(t, e, n) {
        (!n || n > 4) && (n = 4);
        for (var i = 0, o = e; e + n > o; o++) i <<= 8, i |= t[o];
        return (4294967295 & i) >>> 0
    }
    function i(t, e, n) {
        t[e + 3] = n >> 0 & 255, t[e + 2] = n >> 8 & 255, t[e + 1] = n >> 16 & 255, t[e + 0] = n >> 24 & 255
    }
    function o(t) {
        if (!t) return "";
        for (var e = "", n = 0; n < t.length; n++) {
            var i = Number(t[n]).toString(16);
            1 == i.length && (i = "0" + i), e += i
        }
        return e
    }
    function r(t) {
        for (var e = "", n = 0; n < t.length; n += 2) e += String.fromCharCode(parseInt(t.substr(n, 2), 16));
        return e
    }
    function a(t, e) {
        if (!t) return "";
        e && (t = p(t));
        for (var n = [], i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
        return o(n)
    }
    function p(t) {
        var e, n, i = [],
            o = t.length;
        for (e = 0; o > e; e++) n = t.charCodeAt(e), n > 0 && 127 >= n ? i.push(t.charAt(e)) : n >= 128 && 2047 >= n ? i.push(String.fromCharCode(192 | n >> 6 & 31), String.fromCharCode(128 | 63 & n)) : n >= 2048 && 65535 >= n && i.push(String.fromCharCode(224 | n >> 12 & 15), String.fromCharCode(128 | n >> 6 & 63), String.fromCharCode(128 | 63 & n));
        return i.join("")
    }
    function s(t) {
        _ = new Array(8), w = new Array(8), v = y = 0, $ = !0, m = 0;
        var n = t.length,
            i = 0;
        m = (n + 10) % 8, 0 != m && (m = 8 - m), b = new Array(n + m + 10), _[0] = 255 & (248 & e() | m);
        for (var o = 1; m >= o; o++) _[o] = 255 & e();
        m++;
        for (var o = 0; 8 > o; o++) w[o] = 0;
        for (i = 1; 2 >= i;) 8 > m && (_[m++] = 255 & e(), i++), 8 == m && u();
        for (var o = 0; n > 0;) 8 > m && (_[m++] = t[o++], n--), 8 == m && u();
        for (i = 1; 7 >= i;) 8 > m && (_[m++] = 0, i++), 8 == m && u();
        return b
    }
    function c(t) {
        var e = 0,
            n = new Array(8),
            i = t.length;
        if (k = t, i % 8 != 0 || 16 > i) return null;
        if (w = d(t), m = 7 & w[0], e = i - m - 10, 0 > e) return null;
        for (var o = 0; o < n.length; o++) n[o] = 0;
        b = new Array(e), y = 0, v = 8, m++;
        for (var r = 1; 2 >= r;) if (8 > m && (m++, r++), 8 == m && (n = t, !h())) return null;
        for (var o = 0; 0 != e;) if (8 > m && (b[o] = 255 & (n[y + m] ^ w[m]), o++, e--, m++), 8 == m && (n = t, y = v - 8, !h())) return null;
        for (r = 1; 8 > r; r++) {
            if (8 > m) {
                if (0 != (n[y + m] ^ w[m])) return null;
                m++
            }
            if (8 == m && (n = t, y = v, !h())) return null
        }
        return b
    }
    function u() {
        for (var t = 0; 8 > t; t++) _[t] ^= $ ? w[t] : b[y + t];
        for (var e = l(_), t = 0; 8 > t; t++) b[v + t] = e[t] ^ w[t], w[t] = _[t];
        y = v, v += 8, m = 0, $ = !1
    }
    function l(t) {
        for (var e = 16, o = n(t, 0, 4), r = n(t, 4, 4), a = n(g, 0, 4), p = n(g, 4, 4), s = n(g, 8, 4), c = n(g, 12, 4), u = 0, l = 2654435769; e-- > 0;) u += l, u = (4294967295 & u) >>> 0, o += (r << 4) + a ^ r + u ^ (r >>> 5) + p, o = (4294967295 & o) >>> 0, r += (o << 4) + s ^ o + u ^ (o >>> 5) + c, r = (4294967295 & r) >>> 0;
        var d = new Array(8);
        return i(d, 0, o), i(d, 4, r), d
    }
    function d(t) {
        for (var e = 16, o = n(t, 0, 4), r = n(t, 4, 4), a = n(g, 0, 4), p = n(g, 4, 4), s = n(g, 8, 4), c = n(g, 12, 4), u = 3816266640, l = 2654435769; e-- > 0;) r -= (o << 4) + s ^ o + u ^ (o >>> 5) + c, r = (4294967295 & r) >>> 0, o -= (r << 4) + a ^ r + u ^ (r >>> 5) + p, o = (4294967295 & o) >>> 0, u -= l, u = (4294967295 & u) >>> 0;
        var d = new Array(8);
        return i(d, 0, o), i(d, 4, r), d
    }
    function h() {
        for (var t = (k.length, 0); 8 > t; t++) w[t] ^= k[v + t];
        return w = d(w), v += 8, m = 0, !0
    }
    function f(t, e) {
        var n = [];
        if (e) for (var i = 0; i < t.length; i++) n[i] = 255 & t.charCodeAt(i);
        else for (var o = 0, i = 0; i < t.length; i += 2) n[o++] = parseInt(t.substr(i, 2), 16);
        return n
    }
    var g = "",
        m = 0,
        _ = [],
        w = [],
        v = 0,
        y = 0,
        b = [],
        k = [],
        $ = !0;
    t.TEA = {
        encrypt: function(t, e) {
            var n = f(t, e),
                i = s(n);
            return o(i)
        },
        enAsBase64: function(t, e) {
            for (var n = f(t, e), i = s(n), o = "", r = 0; r < i.length; r++) o += String.fromCharCode(i[r]);
            return btoa(o)
        },
        decrypt: function(t) {
            var e = f(t, !1),
                n = c(e);
            return o(n)
        },
        initkey: function(t, e) {
            g = f(t, e)
        },
        bytesToStr: r,
        strToBytes: a,
        bytesInStr: o,
        dataFromStr: f
    };
    var q = {};
    q.PADCHAR = "=", q.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", q.getbyte = function(t, e) {
        var n = t.charCodeAt(e);
        if (n > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return n
    }, q.encode = function(t) {
        if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
        var e, n, i = q.PADCHAR,
            o = q.ALPHA,
            r = q.getbyte,
            a = [];
        t = "" + t;
        var p = t.length - t.length % 3;
        if (0 == t.length) return t;
        for (e = 0; p > e; e += 3) n = r(t, e) << 16 | r(t, e + 1) << 8 | r(t, e + 2), a.push(o.charAt(n >> 18)), a.push(o.charAt(n >> 12 & 63)), a.push(o.charAt(n >> 6 & 63)), a.push(o.charAt(63 & n));
        switch (t.length - p) {
            case 1:
                n = r(t, e) << 16, a.push(o.charAt(n >> 18) + o.charAt(n >> 12 & 63) + i + i);
                break;
            case 2:
                n = r(t, e) << 16 | r(t, e + 1) << 8, a.push(o.charAt(n >> 18) + o.charAt(n >> 12 & 63) + o.charAt(n >> 6 & 63) + i)
        }
        return a.join("")
    }, window.btoa || (window.btoa = q.encode)
}(window), $ = window.$ || {}, $pt = window.$pt || {}, $.Encryption = $pt.Encryption = function() {
    function md5(t) {
        return hex_md5(t)
    }
    function hex_md5(t) {
        return binl2hex(core_md5(str2binl(t), t.length * chrsz))
    }
    function str_md5(t) {
        return binl2str(core_md5(str2binl(t), t.length * chrsz))
    }
    function hex_hmac_md5(t, e) {
        return binl2hex(core_hmac_md5(t, e))
    }
    function b64_hmac_md5(t, e) {
        return binl2b64(core_hmac_md5(t, e))
    }
    function str_hmac_md5(t, e) {
        return binl2str(core_hmac_md5(t, e))
    }
    function core_md5(t, e) {
        t[e >> 5] |= 128 << e % 32, t[(e + 64 >>> 9 << 4) + 14] = e;
        for (var n = 1732584193, i = -271733879, o = -1732584194, r = 271733878, a = 0; a < t.length; a += 16) {
            var p = n,
                s = i,
                c = o,
                u = r;
            n = md5_ff(n, i, o, r, t[a + 0], 7, -680876936), r = md5_ff(r, n, i, o, t[a + 1], 12, -389564586), o = md5_ff(o, r, n, i, t[a + 2], 17, 606105819), i = md5_ff(i, o, r, n, t[a + 3], 22, -1044525330), n = md5_ff(n, i, o, r, t[a + 4], 7, -176418897), r = md5_ff(r, n, i, o, t[a + 5], 12, 1200080426), o = md5_ff(o, r, n, i, t[a + 6], 17, -1473231341), i = md5_ff(i, o, r, n, t[a + 7], 22, -45705983), n = md5_ff(n, i, o, r, t[a + 8], 7, 1770035416), r = md5_ff(r, n, i, o, t[a + 9], 12, -1958414417), o = md5_ff(o, r, n, i, t[a + 10], 17, -42063), i = md5_ff(i, o, r, n, t[a + 11], 22, -1990404162), n = md5_ff(n, i, o, r, t[a + 12], 7, 1804603682), r = md5_ff(r, n, i, o, t[a + 13], 12, -40341101), o = md5_ff(o, r, n, i, t[a + 14], 17, -1502002290), i = md5_ff(i, o, r, n, t[a + 15], 22, 1236535329), n = md5_gg(n, i, o, r, t[a + 1], 5, -165796510), r = md5_gg(r, n, i, o, t[a + 6], 9, -1069501632), o = md5_gg(o, r, n, i, t[a + 11], 14, 643717713), i = md5_gg(i, o, r, n, t[a + 0], 20, -373897302), n = md5_gg(n, i, o, r, t[a + 5], 5, -701558691), r = md5_gg(r, n, i, o, t[a + 10], 9, 38016083), o = md5_gg(o, r, n, i, t[a + 15], 14, -660478335), i = md5_gg(i, o, r, n, t[a + 4], 20, -405537848), n = md5_gg(n, i, o, r, t[a + 9], 5, 568446438), r = md5_gg(r, n, i, o, t[a + 14], 9, -1019803690), o = md5_gg(o, r, n, i, t[a + 3], 14, -187363961), i = md5_gg(i, o, r, n, t[a + 8], 20, 1163531501), n = md5_gg(n, i, o, r, t[a + 13], 5, -1444681467), r = md5_gg(r, n, i, o, t[a + 2], 9, -51403784), o = md5_gg(o, r, n, i, t[a + 7], 14, 1735328473), i = md5_gg(i, o, r, n, t[a + 12], 20, -1926607734), n = md5_hh(n, i, o, r, t[a + 5], 4, -378558), r = md5_hh(r, n, i, o, t[a + 8], 11, -2022574463), o = md5_hh(o, r, n, i, t[a + 11], 16, 1839030562), i = md5_hh(i, o, r, n, t[a + 14], 23, -35309556), n = md5_hh(n, i, o, r, t[a + 1], 4, -1530992060), r = md5_hh(r, n, i, o, t[a + 4], 11, 1272893353), o = md5_hh(o, r, n, i, t[a + 7], 16, -155497632), i = md5_hh(i, o, r, n, t[a + 10], 23, -1094730640), n = md5_hh(n, i, o, r, t[a + 13], 4, 681279174), r = md5_hh(r, n, i, o, t[a + 0], 11, -358537222), o = md5_hh(o, r, n, i, t[a + 3], 16, -722521979), i = md5_hh(i, o, r, n, t[a + 6], 23, 76029189), n = md5_hh(n, i, o, r, t[a + 9], 4, -640364487), r = md5_hh(r, n, i, o, t[a + 12], 11, -421815835), o = md5_hh(o, r, n, i, t[a + 15], 16, 530742520), i = md5_hh(i, o, r, n, t[a + 2], 23, -995338651), n = md5_ii(n, i, o, r, t[a + 0], 6, -198630844), r = md5_ii(r, n, i, o, t[a + 7], 10, 1126891415), o = md5_ii(o, r, n, i, t[a + 14], 15, -1416354905), i = md5_ii(i, o, r, n, t[a + 5], 21, -57434055), n = md5_ii(n, i, o, r, t[a + 12], 6, 1700485571), r = md5_ii(r, n, i, o, t[a + 3], 10, -1894986606), o = md5_ii(o, r, n, i, t[a + 10], 15, -1051523), i = md5_ii(i, o, r, n, t[a + 1], 21, -2054922799), n = md5_ii(n, i, o, r, t[a + 8], 6, 1873313359), r = md5_ii(r, n, i, o, t[a + 15], 10, -30611744), o = md5_ii(o, r, n, i, t[a + 6], 15, -1560198380), i = md5_ii(i, o, r, n, t[a + 13], 21, 1309151649), n = md5_ii(n, i, o, r, t[a + 4], 6, -145523070), r = md5_ii(r, n, i, o, t[a + 11], 10, -1120210379), o = md5_ii(o, r, n, i, t[a + 2], 15, 718787259), i = md5_ii(i, o, r, n, t[a + 9], 21, -343485551), n = safe_add(n, p), i = safe_add(i, s), o = safe_add(o, c), r = safe_add(r, u)
        }
        return 16 == mode ? Array(i, o) : Array(n, i, o, r)
    }
    function md5_cmn(t, e, n, i, o, r) {
        return safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(i, r)), o), n)
    }
    function md5_ff(t, e, n, i, o, r, a) {
        return md5_cmn(e & n | ~e & i, t, e, o, r, a)
    }
    function md5_gg(t, e, n, i, o, r, a) {
        return md5_cmn(e & i | n & ~i, t, e, o, r, a)
    }
    function md5_hh(t, e, n, i, o, r, a) {
        return md5_cmn(e ^ n ^ i, t, e, o, r, a)
    }
    function md5_ii(t, e, n, i, o, r, a) {
        return md5_cmn(n ^ (e | ~i), t, e, o, r, a)
    }
    function core_hmac_md5(t, e) {
        var n = str2binl(t);
        n.length > 16 && (n = core_md5(n, t.length * chrsz));
        for (var i = Array(16), o = Array(16), r = 0; 16 > r; r++) i[r] = 909522486 ^ n[r], o[r] = 1549556828 ^ n[r];
        var a = core_md5(i.concat(str2binl(e)), 512 + e.length * chrsz);

        return core_md5(o.concat(a), 640)
    }
    function safe_add(t, e) {
        var n = (65535 & t) + (65535 & e),
            i = (t >> 16) + (e >> 16) + (n >> 16);
        return i << 16 | 65535 & n
    }
    function bit_rol(t, e) {
        return t << e | t >>> 32 - e
    }
    function str2binl(t) {
        for (var e = Array(), n = (1 << chrsz) - 1, i = 0; i < t.length * chrsz; i += chrsz) e[i >> 5] |= (t.charCodeAt(i / chrsz) & n) << i % 32;
        return e
    }
    function binl2str(t) {
        for (var e = "", n = (1 << chrsz) - 1, i = 0; i < 32 * t.length; i += chrsz) e += String.fromCharCode(t[i >> 5] >>> i % 32 & n);
        return e
    }
    function binl2hex(t) {
        for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", n = "", i = 0; i < 4 * t.length; i++) n += e.charAt(t[i >> 2] >> i % 4 * 8 + 4 & 15) + e.charAt(t[i >> 2] >> i % 4 * 8 & 15);
        return n
    }
    function binl2b64(t) {
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = "", i = 0; i < 4 * t.length; i += 3) for (var o = (t[i >> 2] >> 8 * (i % 4) & 255) << 16 | (t[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 255) << 8 | t[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 255, r = 0; 4 > r; r++) n += 8 * i + 6 * r > 32 * t.length ? b64pad : e.charAt(o >> 6 * (3 - r) & 63);
        return n
    }
    function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2) arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""), eval("var temp = '" + arr + "'"), temp
    }
    function __monitor(t, e) {
        if (!(Math.random() > (e || 1))) try {
            var n = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t,
                i = document.createElement("img");
            i.src = n
        } catch (o) {}
    }
    function getEncryption(t, e, n, i) {
        n = n || "", t = t || "";
        for (var o = i ? t : md5(t), r = hexchar2bin(o), a = md5(r + e), p = $pt.RSA.rsa_encrypt(r), s = (p.length / 2).toString(16), c = TEA.strToBytes(n.toUpperCase(), !0), u = Number(c.length / 2).toString(16); u.length < 4;) u = "0" + u;
        for (; s.length < 4;) s = "0" + s;
        TEA.initkey(a);
        var l = TEA.enAsBase64(s + p + TEA.strToBytes(e) + u + c);
        return TEA.initkey(""), setTimeout(function() {
            __monitor(488358, 1)
        }, 0), l.replace(/[\/\+=]/g, function(t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            }[t]
        })
    }
    function getRSAEncryption(t, e, n) {
        var i = n ? t : md5(t),
            o = i + e.toUpperCase(),
            r = $.RSA.rsa_encrypt(o);
        return r
    }
    var hexcase = 1,
        b64pad = "",
        chrsz = 8,
        mode = 32;
    return {
        getEncryption: getEncryption,
        getRSAEncryption: getRSAEncryption,
        md5: md5
    }
}();
try {
    window.MTT = function() {
        function t() {
            try {
                if (!o) return !1;
                var t = navigator.userAgent,
                    e = /msie/i.test(t) && "notify" in window.external;
                if (e) return !0;
                var n = s && o >= 42,
                    i = c && o >= 32,
                    r = p && o >= 42;
                return n || i || r
            } catch (a) {
                return !1
            }
        }
        function e(t) {
            var e = 5 != $.cookie.get("pt_qlogincode") && MTT.canQlogin();
            "function" == typeof t && (e ? /msie/i.test(window.navigator.userAgent) ? (window.external.notify("#@getUserInfoWT@#pt.qqBrowserCallback"), pt.qqBrowserCallbackClock = setTimeout(function() {
                pt.init()
            }, pt.qqBrowserCallbackTime)) : (p ? browser.login.getLoginInfo ? browser.login.getLoginInfo(t, t) : t("") : (s || c) && (browser.login.getUinAndSidInfo ? browser.login.getUinAndSidInfo(t, t) : t("")), pt.qqBrowserCallbackClock = setTimeout(function() {
                pt.init()
            }, pt.qqBrowserCallbackTime)) : (t(""), 5 == $.cookie.get("pt_qlogincode") && $.report.nlog("快速登录异常：pt_qlogincode=5", "276650")))
        }
        function n(t, e) {
            if (!o) return e && e(), !1;
            if (p) {
                if (!browser.app.getApkInfo) return e && e();
                browser.app.getApkInfo(function(n) {
                    try {
                        n = JSON.parse(JSON.parse(n)), o >= 51 && n && n.versionname >= "4.7" ? t && t() : e && e()
                    } catch (i) {
                        e && e()
                    }
                }, "com.tencent.mobileqq")
            } else(s || c) && window.x5 && x5.exec(function(n) {
                n && n.isSupportApp ? t && t() : e && e()
            }, e, "app", "getMobileAppSupport", [{
                scheme: "wtloginmqq2://"
            }]);
            return !1
        }
        function i(t, e) {
            p && browser.login.refreshToken ? browser.login.refreshToken({
                uin: t
            }, e) : (c || s) && window.x5 && x5.exec(e, e, "login", "refreshToken", [{
                uin: t
            }])
        }
        var o = 0,
            r = "";
        try {
            "undefined" != typeof window.browser ? o = browser.env && browser.env.version : window.browser = {
                env: {},
                app: {},
                login: {}
            }, r = browser.env && browser.env.platForm
        } catch (a) {
            $.report.nlog("browser_env:ver(" + window.ptui_pt_version + ")" + a.message, "647126")
        }
        var p = "ADR" == r,
            s = "I" == r,
            c = "IP" == r;
        return {
            version: o,
            isAndroid: p,
            isIPhone: s,
            canQlogin: t,
            QLogin4PT: e,
            canOneKey: n,
            refreshToken: i
        }
    }()
} catch (e) {
    $.report.nlog("QB Exception:ver(" + window.ptui_pt_version + ")" + e.message, "647127"), window.MTT = {}
}
var pt = {
    pageState: 1,
    login_href: g_href,
    domain: window.ptui_domain,
    isHttps: $.check.isHttps(),
    errTipClock: 0,
    lang: window.STR_LANG,
    submit_o: {},
    auto_login: !1,
    switch_position_x: 0,
    touchstartTime: 0,
    longTouchTime: 500,
    default_face_url: "",
    is_qlogin: !1,
    lang_num: window.ptui_lang,
    action: [0, 0],
    vcode: "",
    verifysession: "",
    deviceType: 2,
    login_uin: "",
    login_pwd: "",
    needAt: "",
    appid: "",
    s_url: "",
    low_login_enable: window.ptui_low_login,
    style: 9,
    t_type: 0,
    t_appid: 46000101,
    isSubmiting: !1,
    key_interval: 0,
    keyindex: 19,
    qqBrowserInfo: null,
    qqBrowserCallbackTime: 3e3,
    qqBrowserCallbackTimeOut: 0,
    authInfo: null,
    authUin: "",
    authNick: "",
    authLoginUrl: "",
    qlogin_list_data: [],
    checkUrl: "",
    loginUrl: "",
    cookieInfo: null,
    cookieLogin: !1,
    regTmp: '<span id="#uin#" pwd="#pwd#" type="#type#" class="header">\r\n                    <div id="del_touch_#uin#" class="del_touch_icon" >\r\n                        <span id="del_#uin#" class="del_icon" ></span>\r\n                    </div>\r\n                    <img  id="img_#uin#" src="#src#" onerror="pt.face_error();" /> \r\n                    <div id="img_out_#uin#" class="img_out" onclick="pt.clickHeader(event);"></div>\r\n                    <label id="nick_#uin#" class="nick">#nick# </label>\r\n                </span>',
    hulianRegTmp: '<div class="useravatar">\r\n                    <img id="img_#uin#" src="#src#" onerror="pt.face_error();" alt="#nick#" />\r\n                  </div>\r\n                  <div class="userinfo">\r\n                        <div class="usernick" id="hl_usernick">#nick#</div>\r\n                        <div class="userqq">#uin#</div>\r\n                  </div>\r\n                  <button id="userSwitch" class="switch" tabindex="5" href="javascript:void(0)";>切换帐号</button>',
    new_vcode: !1,
    clickEvent: "touchstart",
    checkErr: {
        2052: "网络繁忙，请稍后重试。",
        1028: "網絡繁忙，請稍後重試。",
        1033: "The network is busy, please try again later."
    },
    isHulian: 716027609 == window.ptui_appid,
    isOffice: 39 == window.ptui_style,
    isInIframe: 38 == window.ptui_style,
    is3gNews: 37 == window.ptui_style,
    isMail: 522005705 == window.ptui_appid,
    lockedAccount: 1 == window.ptui_lockuin ? window.ptui_defuin : "",
    ua: navigator.userAgent.toLowerCase(),
    isWX: navigator.userAgent.match(/micromessenger\/(\d\.\d\.\d)/i),
    isMQQ: navigator.userAgent.match(/qq\/(\d\.\d\.\d)/i),
    isAndroid: /android/i.test(navigator.userAgent),
    isIos: /iphone|ipad/i.test(navigator.userAgent),
    isIPhone: /iphone/i.test(navigator.userAgent),
    uInput: $("u"),
    pInput: $("p"),
    btnGo: $("go"),
    btnOnekey: $("onekey"),
    redirect: function(t, e) {
        switch (t + "") {
            case "0":
                pt.isInIframe ? location.replace(e) : location.href = e;
                break;
            case "1":
                top.location.href = e;
                break;
            default:
                top.location.href = e
        }
    },
    init: function() {
        pt.hasInit || (pt.hasInit = !0, pt.default_face_url = pt.isHttps ? "https://ui.ptlogin2.qq.com/style/0/images/1.gif" : "http://imgcache.qq.com/ptlogin/v4/style/0/images/1.gif", pt.initSURL(), pt.setClickEvent(), pt.isOffice && pt.open.loadAppInfo(), pt.isHulian ? pt.setCookieLogin() : (pt.is3gNews || pt.build_qlogin_list(), pt.initFace()), pt.bindEvent(), pt.bindInput(), pt.hideURLBar(), pt.setVcodeFlag(), pt.setUrl(), pt.showAutoLogin(), $.winName.set("login_href", encodeURIComponent(pt.login_href)), pt.checkIframe(), pt.checkPostMessage(), window.setTimeout(function() {
            "549000929" != window.ptui_appid && pt.webLoginReport(), $.report.monitor(412020, .05), navigator.cookieEnabled || ($.report.monitor(410030), $.cookie.get("ptcz") && $.report.monitor(410031))
        }, 2e3))
    },
    setUrl: function() {
        var t = pt.isHttps ? "https://ssl." : "http://",
            e = pt.isHttps ? "https://ssl." : "http://check.";
        pt.checkUrl = e + "ptlogin2." + pt.domain + "/check?", pt.loginUrl = t + "ptlogin2." + pt.domain + "/", 4 == window.ptui_regmaster ? (pt.checkUrl = "https://ssl.ptlogin2.mail.qq.com/check?", pt.loginUrl = "https://ssl.ptlogin2.mail.qq.com/") : 5 == window.ptui_regmaster && (pt.checkUrl = e + "ptlogin2.mp.qq.com/check?", pt.loginUrl = t + "ptlogin2.mp.qq.com/")
    },
    ptui_speedReport: function(t) {
        var e = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=8",
            n = 1;
        if (pt.isHttps) e = "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=8", n = 2;
        else if ("MQQBrowser" == $.detectBrowser()[0]) {
            var i = navigator.connection;
            if (i && i.type) {
                var o = i.type;
                n = 1 == o ? 3 : 2 == o ? 4 : 3 == o ? 5 : 4 == o ? 6 : 5 == o ? 7 : 8
            } else n = 8
        } else n = 1;
        e += "&flag3=" + n;
        for (var r in t) t[r] > 15e3 || t[r] < 0 || (e += "&" + r + "=" + (t[r] || 1));
        var a = new Image;
        a.src = e
    },
    webLoginReport: function() {
        try {
            if (Math.random() > .2 && "MQQBrowser" != $.detectBrowser()[0]) return;
            var t = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
                e = {},
                n = window.performance ? window.performance.timing : null;
            if (n) {
                for (var i = n[t[0]], o = 1, r = t.length; r > o; o++) n[t[o]] && (e[o] = n[t[o]] - i);
                loadJs && loadJs.onloadTime && (e[o++] = loadJs.onloadTime - i);
                var a = n.connectEnd >= n.connectStart && n.responseEnd >= n.responseStart && n.domComplete >= n.domInteractive && n.domInteractive >= n.domLoading && n.loadEventStart >= n.domComplete && n.loadEventEnd >= n.loadEventStart;
                a && pt.ptui_speedReport(e)
            }
        } catch (p) {}
    },
    setClickEvent: function() {
        !/iphone|ipad|android/.test(navigator.userAgent.toLowerCase());
        pt.clickEvent = "click"
    },
    saveLastUin: function(t) {
        $.localStorage.set("last_uin", t)
    },
    getLastUin: function() {
        return $.localStorage.get("last_uin")
    },
    object2param: function(t) {
        var e = [];
        for (var n in t) e.push(n + "=" + t[n] + "&");
        return e.join("")
    },
    showErr: function(t, e) {
        clearTimeout(pt.errTipClock);
        var n = 3e3;
        "number" == (typeof e).toLocaleLowerCase() && (n = parseInt(e, 10), e = null), $("error_message").innerHTML = t, $.css.show("error_tips"), pt.isHulian ? (navigator.userAgent.match(/iphone/i) && pt.btnGo.focus(), pt.errTipClock = setTimeout(function() {
            pt.hideErr(e)
        }, n)) : (e && e(), pt.errTipClock = setTimeout(function() {
            pt.hideErr()
        }, n))
    },
    hideErr: function(t) {
        $.css.hide("error_tips"), t && t()
    },
    checkIframe: function() {
        try {
            top == self || pt.isHulian || $.report.nlog("iphone登录框被iframe;referer=" + document.referrer, "347748")
        } catch (t) {}
    },
    checkPostMessage: function() {
        "undefined" == typeof window.postMessage && $.report.nlog("iphone登录框不支持postMessage;", "350525"), "undefined" == typeof window.JSON && $.report.nlog("iphone登录框不支持JSON;", "362678")
    },
    setVcodeFlag: function() {
        pt.new_vcode = "undefined" == typeof window.postMessage || "undefined" == typeof window.JSON ? !1 : !0
    },
    getAuthUrl: function() {
        var t = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.domain + "/pt4_auth?daid=" + window.ptui_daid + "&appid=" + window.ptui_appid + "&auth_token=" + $.str.time33($.cookie.get("supertoken"));
        return "1" == window.ptui_pt_qzone_sig && (t += "&pt_qzone_sig=1"), t
    },
    auth: function() {
        pt.getParam(), pt.initSURL();
        var t = pt.getAuthUrl(),
            e = $.cookie.get("superuin"),
            n = $.str.hash33(e);
        !parseInt($.cookie.get("supertoken")) && n && $.cookie.set("supertoken", $.str.hash33(e), "ptlogin2." + pt.domain), window.ptui_daid && "1" != window.ptui_noAuth && "" != e ? $.http.loadScript(t) : pt.qqBrowserQlogin()
    },
    showAuth: function(t) {
        var e = t.substr(t.indexOf("?") + 1),
            n = e.match(RegExp("(^|&)uin=([^&]*)(&|$)"));
        pt.authUin = n ? decodeURIComponent(n[2]) : "", pt.authLoginUrl = t, pt.authNick = $.str.utf8ToUincode($.cookie.get("ptnick_" + pt.authUin)) || pt.authUin, pt.authUin && (pt.authInfo = {
            uin: $.str.encodeHtml(pt.authUin),
            nick: $.str.encodeHtml(pt.authNick),
            authUrl: pt.authUrl,
            type: 3
        })
    },
    setCookieLogin: function() {
        var t = $.cookie.get("skey"),
            e = $.cookie.get("supertoken"),
            n = $.cookie.uin(),
            i = $.str.utf8ToUincode($.cookie.get("ptnick_" + n)) || n,
            o = window.pt_skey_valid && t || window.ptui_daid && e;
        return o && n ? (pt.cookieInfo = {
            uin: $.str.encodeHtml(n),
            nick: $.str.encodeHtml(i),
            superkey: e,
            skey: t,
            type: 4
        }, !0) : !1
    },
    qqBrowserQlogin: function() {
        try {
            self === top || MTT.isAndroid ? MTT.QLogin4PT(pt.qqBrowserCallback) : pt.init()
        } catch (t) {
            pt.init(), $.report.nlog("快速登录异常,qqBrowserQlogin," + t.message, "276650")
        }
    },
    qqBrowserCallback: function(t) {
        window.clearTimeout(pt.qqBrowserCallbackClock);
        try {
            t && "string" == typeof t && (t = JSON.parse(t)), t && $.check.isQQ(t.uin) && 0 != t.loginkey.length && t.loginkey.length > 10 ? (pt.qqBrowserInfo = {}, pt.qqBrowserInfo.uin = $.str.encodeHtml(t.uin), pt.qqBrowserInfo.nick = $.str.encodeHtml(t.nickname), pt.qqBrowserInfo.loginkey = t.loginkey, pt.qqBrowserInfo.type = 2) : t && 0 == t.uin.length ? $.report.nlog("快速登录异常：数据返回异常,没有uin", "276650") : t && 0 == t.loginkey.length ? $.report.nlog("快速登录异常：数据返回异常,没有loginkey", "276650") : t && $.report.nlog("快速登录异常：数据返回异常:" + t.loginkey.length, "276650")
        } catch (e) {
            $.report.nlog("快速登录异常： qqBrowserCallback " + e.message, "276650")
        }
        pt.init()
    },
    initSURL: function() {
        pt.s_url = $.bom.query("s_url"), pt.isMail && 1 == pt.low_login_enable && (pt.s_url = pt.addParamToUrl(pt.s_url, "ss", 1))
    },
    addParamToUrl: function(t, e, n) {
        var i = t.split("#"),
            o = i[0].indexOf("?") > 0 ? "&" : "?";
        return "?" == i[0].substr(i[0].length - 1, 1) && (o = ""), i[1] = i[1] ? "#" + i[1] : "", i[0] + o + e + "=" + n + i[1]
    },
    getParam: function() {
        if (pt.appid = window.ptui_appid, pt.isInIframe) switch (window.ptui_target) {
            case "_self":
                pt.target = 0;
                break;
            case "_top":
                pt.target = 1;
                break;
            default:
                pt.target = 1
        } else pt.target = 1;
        pt.style = window.ptui_style ? window.ptui_style : 9, pt.isHulian && (window.pt_skey_valid = parseInt($.bom.query("pt_skey_valid")) || 0)
    },
    build_qlogin_list: function() {
        var t = pt.get_qlogin_list();
        pt.qlogin_list_data = t;
        var e = t.length;
        if (e > 0) {
            pt._switch(), pt.hideOneKey();
            for (var n = "", i = 0; e > i; i++)"" != t[i].uin && (n += pt.regTmp.replace(/#uin#/g, t[i].uin).replace(/#nick#/g, t[i].nick).replace(/#pwd#/g, t[i].pwd).replace(/#type#/g, t[i].type).replace(/#src#/g, pt.default_face_url));
            $("q_logon_list").innerHTML = n;
            for (var i = 0; e > i; i++) pt.getShortWord($("nick_" + t[i].uin), t[i].nick, 95);
            $("swicth_login") && ($("swicth_login").style.display = "block")
        } else $("web_login") && ($("web_login").style.display = "block"), $("swicth_login") && ($("swicth_login").style.display = "none")
    },
    fill_usernick: function() {
        window.mqq && mqq.data && mqq.data.getUserInfo && mqq.data.getUserInfo(function(t) {
            var e = $("hl_usernick");
            e && t && t.nick && (e.innerHTML = $.str.encodeHtml(t.nick))
        })
    },
    build_office_qlogin: function() {
        return $.report.monitor(2123219), pt.cookieInfo || pt.setCookieLogin(), pt.cookieInfo ? (pt.cookieLogin = !0, $("hl_avatar").style.backgroundImage = "url(https://q4.qlogo.cn/g?b=qq&nk=" + pt.cookieInfo.uin + "&s=100)", $("hl_usernick").innerHTML = pt.cookieInfo.nick || pt.cookieInfo.uin, $("hl_qqnum").innerHTML = "(" + pt.cookieInfo.uin + ")", void pt.fill_usernick()) : $.report.monitor(2123220)
    },
    build_hulian_qlogin_list: function(t) {
        if (t.nick && pt.cookieInfo && (pt.cookieInfo.nick = $.str.encodeHtml(t.nick)), pt.isOffice) return void pt.build_office_qlogin(t);
        var e = pt.get_qlogin_list();
        pt.qlogin_list_data = e;
        var n = window.ptui_daid && 1 == t.superkey || t.skey,
            i = e.length;
        if (i > 0) {
            pt.hideOneKey();
            for (var o = "", r = 0; i > r; r++) {
                var a = e[r];
                if (n || !pt.cookieInfo || pt.cookieInfo.uin != a.uin) {
                    "" != a.uin && (o += pt.hulianRegTmp.replace(/#uin#/g, a.uin).replace(/#nick#/g, a.nick).replace(/#type#/g, a.type).replace(/#src#/g, pt.default_face_url));
                    break
                }
            }
            setTimeout(function() {
                var t = $("q_logon_list");
                t.innerHTML = o, $.css.show(t), $.css.hide($("form_outter_wrap")), pt.cookieLogin = n, pt.fill_usernick();
                var e = $("userSwitch");
                window.ptui_lockuin ? e && $.css.hide(e) : e && $.e.add(e, "click", function() {
                    pt.showOneKey.ever && pt.showOneKey(), pt.qqBrowserInfo = null, pt.open.authListDone && (xMsg.call("connect", "userSwitch", {}, function() {}), pt.cancel_cookielogin(!0), $.report.monitor(2106346))
                })
            }, 0)
        }
    },
    _switch: function() {
        "none" == $("q_login").style.display ? ($("q_login").style.display = "block", $("web_login").style.display = "none", $("swicth_login") && ($("swicth_login").innerHTML = $.str.encodeHtml(qlogin_wording)), pt.hideURLBar(), pt.pageState = 2) : (pt.showOneKey.ever && pt.showOneKey(), $("q_login").style.display = "none", $("web_login").style.display = "block", $("swicth_login") && ($("swicth_login").innerHTML = $.str.encodeHtml(login_wording)), pt.uInput.focus(), pt.pageState = 1), pt.showAutoLogin(), pt.isInIframe && window.setTimeout(function() {
            pt.ptui_notifySize("content")
        }, 0)
    },
    vcodeMessage: function(e) {
        var origin = e.origin;
        if (origin != (pt.isHttps ? "https://ssl." : "http://") + "captcha.qq.com") return void $.report.nlog("origin postMessage error：" + origin);
        var data = e.data;
        data = window.JSON ? JSON.parse(data) : eval("(" + data + ")"), data.randstr && data.sig || $.report.nlog("vcode postMessage error：" + e.data), 2 == data.type ? pt.go_back() : pt.submitNewVcode(data)
    },
    checkNetwork: function() {
        return navigator.onLine ? pt._timer = setTimeout(function() {
            $.report.monitor(2114669), pt.showErr(STR_LANG.offline)
        }, 3e3) : void pt.showErr(STR_LANG.offline)
    },
    submitEvent: function() {
        pt.checkNetwork(), pt.isHulian ? pt.open.getAuthData() : pt.check(!1), pt.qrcode.used = !1
    },
    showOneKey: function(t) {
        var e = $("onekey");
        if (pt.showOneKey.ever || ($.e.add(e, pt.clickEvent, pt.doOneKey), $.e.add(e, "blur", pt.cancelAutoOneKey)), pt.showOneKey.ever = !0, t ? pt.btnGo.className += " weak" : e.className += " weak", e && $.css.show(e), e.focus(), $.report.monitor(414089), pt.isInIframe && window.setTimeout(function() {
                pt.ptui_notifySize("content")
            }, 0), t && "justshow" != t) {
            var n = e.innerHTML,
                i = 3,
                o = n + "中({{second}}秒...)";
            e.innerHTML = o.replace("{{second}}", i--), pt.showOneKey.tid = setInterval(function() {
                e.innerHTML = o.replace("{{second}}", i--), 0 > i && (i = 3, clearInterval(pt.showOneKey.tid), e.innerHTML = n, pt.doOneKey())
            }, 1e3)
        }
    },
    cancelAutoOneKey: function() {
        clearInterval(pt.showOneKey.tid);
        var t = pt.btnOnekey;
        t && (t.innerHTML = STR_LANG.onekey)
    },
    hideOneKey: function() {
        pt.cancelAutoOneKey(), pt.btnGo.className = pt.btnGo.className.replace("weak", ""), pt.btnOnekey && $.css.hide(pt.btnOnekey), pt.isInIframe && window.setTimeout(function() {
            pt.ptui_notifySize("content")
        }, 0)
    },
    bindEvent: function() {
        var t = pt.uInput,
            e = pt.pInput;
        $.e.add(pt.btnGo, pt.clickEvent, pt.submitEvent), e && $.e.add(e, "keydown", function(t) {
            var e = t.keyCode;
            13 == e && pt.submitEvent()
        }), t && $.e.add(t, "keydown", function(t) {
            var e = t.keyCode;
            13 == e && pt.check(!1)
        });
        var n = navigator.userAgent.toLowerCase(),
            i = n.match(/micromessenger|qq\/|meizu_m9|IEMobile/i) || 46000101 == window.ptui_appid || pt.s_url.indexOf("//openmobile.qq.com/api/check") >= 0,
            o = pt.btnOnekey;
        if (!i && o) if (pt.isHulian) n.match(/iphone|ipad/i) && (document.addEventListener("touchmove", function() {
            pt.btnGo.focus()
        }, !1), document.addEventListener("touchstart", function(t) {
            (pt.uInput != t.target || pt.pInput != t.target) && pt.btnGo.focus()
        }, !1)), pt.open.waiting("authlist", function() {
            MTT.canOneKey(function() {
                pt.qqBrowserInfo || pt.showOneKey(!0)
            }, function() {
                pt.hideOneKey()
            })
        });
        else if (self === top && MTT.version) MTT.canOneKey(function() {
            pt.qqBrowserInfo || pt.showOneKey("justshow")
        }, function() {
            pt.hideOneKey()
        });
        else {
            var n = navigator.userAgent,
                r = n.indexOf("Windows NT") > -1 || n.indexOf("Macintosh") > -1;
            r || pt.showOneKey()
        } else pt.hideOneKey();
        if ($("show_pwd") && $.e.add($("show_pwd"), "change", function() {
                var t = pt.pInput;
                this.checked ? t.setAttribute("type", "text") : t.setAttribute("type", "password")
            }), $("forgetpwd") && $.e.add($("forgetpwd"), pt.clickEvent, function() {
                var t = pt.uInput && pt.uInput.value,
                    e = "http://ptlogin2.qq.com/j_findpwd_url?ptlang=" + pt.lang_num;
                "1033" != pt.lang_num && (e += "&account=" + t), window.open(e)
            }), $.e.add(window, "orientationchange", function(t) {
                pt.hideURLBar(t)
            }), $.e.add(window, "message", function(t) {
                t.data && t.origin && 0 == t.data.toLowerCase().indexOf("x-msg://") && t.origin.indexOf("//openmobile.qq.com") > -1 || pt.vcodeMessage(t)
            }), pt.isMail) {
            var a = $("remember");
            if (!a) return;
            $.e.add(a, "change", function() {
                pt.s_url = a.checked ? pt.addParamToUrl(pt.s_url, "ss", 1) : pt.s_url.replace(/&?ss=1/, ""), pt.low_login_enable = a.checked ? 1 : 0
            })
        }
    },
    bindInput: function() {
        if (!pt.isOffice) {
            var t = window.ptui_defuin || pt.lockedAccount || pt.getLastUin(),
                e = pt.uInput,
                n = pt.pInput,
                i = $("del_u"),
                o = $("del_p"),
                r = $("del_touch"),
                a = $("del_touch_p");
            t && (e.value = e.value || t), pt.lockedAccount && (r.parentNode.removeChild(r), i = null, r = null, e.readOnly = !0, n.focus());
            var p = function() {
                    i && ("" != e.value ? $.css.show(i) : $.css.hide(i))
                },
                s = function() {
                    "" != n.value ? $.css.show(o) : $.css.hide(o);
                    var t = 0;
                    (n.selectionStart || "0" == n.selectionStart) && (t = Math.max(n.selectionStart, n.selectionEnd)), window.openSDK && window.openSDK.curPosFromJS && window.openSDK.curPosFromJS(t)
                };
            $.e.add(n, "focus", function() {
                "" != this.value && $.css.show(o), window.openSDK && window.openSDK.isPasswordEdit && window.openSDK.isPasswordEdit(1)
            }), $.e.add(n, "blur", function() {
                "" == this.value && $.css.hide(o), window.openSDK && window.openSDK.isPasswordEdit && window.openSDK.isPasswordEdit(0)
            }), $.e.add(n, "input", function() {
                window.setTimeout(function() {
                    s()
                }, 0)
            }), $.e.add(e, "focus", function() {
                i && "" != this.value && $.css.show(i)
            }), $.e.add(e, "blur", function() {
                /^\+/.test(this.value) && (this.value = this.value.replace(/^\+/, ""), /^00/.test(this.value) || (this.value = "00" + this.value)), "" == this.value ? i && $.css.hide(i) : pt.checkQQUin(this.value)
            }), $.e.add(e, "input", function() {
                p()
            }), r && $.e.add(r, "click", function(t) {
                t && t.preventDefault(), e.value = "", e.focus(), i && $.css.hide(i)
            }), a && $.e.add(a, "click", function(t) {
                t && t.preventDefault(), n.value = "", n.focus(), o && $.css.hide(o)
            }), pt.isHulian && (i && $.e.add(i, "click", function(t) {
                t && t.preventDefault(), e.value = "", e.focus(), $.css.hide(i)
            }), o && $.e.add(o, "click", function(t) {
                t && t.preventDefault(), n.value = "", window.openSDK && window.openSDK.clearAllEdit && window.openSDK.clearAllEdit(), n.focus(), $.css.hide(o)
            }))
        }
    },
    bindVcodeEvent: function() {
        $("input_tips") && $.e.add($("input_tips"), "click", function(t) {
            $("vcode_input").focus(), $.css.hide("input_tips"), t.stopPropagation()
        }), $("vcode_input") && $.e.add($("vcode_input"), "focus", function(t) {
            $.css.hide("input_tips"), t.stopPropagation()
        }), $("vcode_input") && $.e.add($("vcode_input"), "blur", function() {
            "" == this.value && $.css.show("input_tips")
        }), $("vcode_img") && $.e.add($("vcode_img"), "click", function(t) {
            $("vcode_input").focus(), $.css.hide("input_tips"), pt.changeCodeImg(), t.stopPropagation()
        }), $("submit") && $.e.add($("submit"), "click", function() {
            pt.submitVcode()
        })
    },
    hideURLBar: function() {
        setTimeout(function() {
            window.scrollTo(0, 1)
        }, 0)
    },
    showAutoLogin: function() {
        if (pt.isMail) {
            var t = $("auto_login");
            if (t) {
                var e = pt.btnGo;
                if (1 == pt.pageState) $("web_login").insertBefore(t, e);
                else {
                    var n = $("q_login");
                    n.insertBefore(t, n.lastChild)
                }
                $.css.show(t)
            }
        }
    },
    doOneKey: function() {
        if (!pt.doOneKey.ing) {
            pt.doOneKey.ing = !0, setTimeout(function() {
                pt.doOneKey.ing = !1
            }, 5e3);
            var t = navigator.userAgent.toLowerCase(),
                e = pt.loginUrl + "jump?u1=" + encodeURIComponent(pt.s_url) + "&pt_report=1";
            "1" == window.ptui_pt_ttype && (e += "&pt_ttype=1"), window.ptui_daid && (e += "&daid=" + ptui_daid), pt.low_login_enable && (e += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour), e += "&style=" + window.ptui_style;
            var n = $.detectBrowser()[0];
            n && (e += "&pt_ua=" + $.Encryption.md5(t), e += "&pt_browser=" + n);
            var i = $.bom.query("pt_appname");
            i && (e += "&pt_appname=" + i);
            var o = $.bom.query("pt_package");
            if (/android/i.test(navigator.userAgent)) o && (e += "&pt_package=" + o);
            else {
                var r = $.bom.query("pt_bundleid") || o;
                r && (e += "&pt_bundleid=" + r)
            }
            $.report.monitor(414090), pt.isHulian ? pt.open.waiting("authdata", function() {
                window.ptui_pt_3rd_aid && (e += "&pt_3rd_aid=" + window.ptui_pt_3rd_aid), pt.submit_o.openlogin_data && (e += "&pt_openlogin_data=" + pt.submit_o.openlogin_data), OneKey("wtloginmqq://ptlogin/qlogin?p=" + encodeURIComponent(e))
            }) : OneKey("wtloginmqq://ptlogin/qlogin?p=" + encodeURIComponent(e))
        }
    },
    addToSet: function(t, e) {
        if (e) {
            for (var n = e.uin, i = !0, o = 0, r = t.length; r > o; o++) t[o].uin == n && (i = !1);
            i && t.push(e)
        } else;
    },
    get_qlogin_list: function() {
        var t = [];
        return pt.isHulian ? pt.cookieInfo && pt.addToSet(t, pt.cookieInfo) : pt.authInfo && pt.addToSet(t, pt.authInfo), pt.qqBrowserInfo && pt.addToSet(t, pt.qqBrowserInfo), t
    },
    qlogin_submit: function(t) {
        $.report.monitor(259519);
        var e, n = encodeURIComponent(pt.s_url);
        if (t == pt.qrcode.CGI) e = pt.loginUrl + t + "?u1=" + n + "&daid=" + window.ptui_daid, e += "&from_ui=1&ptlang=" + pt.lang_num;
        else {
            var i = pt.qqBrowserInfo.uin,
                o = pt.qqBrowserInfo.loginkey;
            e = pt.loginUrl + "jump?keyindex=" + pt.keyindex + "&clientuin=" + i + "&clientkey=" + o + "&u1=" + n + "&daid=" + window.ptui_daid
        }
        return window.ptui_appid && (e += "&aid=" + window.ptui_appid), "1" == window.ptui_pt_qzone_sig && (e += "&pt_qzone_sig=1"), "1" == window.ptui_pt_ttype && (e += "&pt_ttype=1"), "1" == window.ptui_pt_light && (e += "&pt_light=1"), pt.low_login_enable && (e += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour), window.ptui_pt_3rd_aid && (e += "&pt_3rd_aid=" + window.ptui_pt_3rd_aid), pt.submit_o.openlogin_data && (e += "&pt_openlogin_data=" + pt.submit_o.openlogin_data), "0" != window.ptui_kf_csimc && window.ptui_kf_csimc && (e += "&csimc=" + ptui_kf_csimc, e += "&csnum=" + ptui_kf_csnum, e += "&authid=" + ptui_kf_authid), e += "&device=" + pt.deviceType, e += "&ptopt=1", e += "&style=" + window.ptui_style, t == pt.qrcode.CGI ? e : void $.http.loadScript(e)
    },
    cookielogin_submit: function() {
        var t = pt.cookieInfo.skey,
            e = t && $.str.hash33(t);
        pt.submit_o.skey_token = e, pt.submit("open")
    },
    cancel_cookielogin: function(t) {
        try {
            $.css.show($("form_outter_wrap")), $.css.hide($("q_logon_list"))
        } catch (e) {}
        pt.cookieLogin = !1, delete pt.submit_o.skey_token, pt.cookieInfo = null, t && (pt.uInput.value = "")
    },
    authlogin_submit: function() {
        var t = pt.authLoginUrl;
        t += "&regmaster=" + window.ptui_regmaster + "&aid=" + window.ptui_appid + "&s_url=" + encodeURIComponent(pt.s_url), pt.low_login_enable && (t += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour), "1" == window.ptui_pt_ttype && (t += "&pt_ttype=1"), "1" == window.ptui_pt_light && (t += "&pt_light=1"), t += "&device=" + pt.deviceType, pt.redirect(pt.target, t)
    },
    submit: function(t) {
        var e = pt.uInput,
            n = pt.pInput,
            i = "",
            o = "";
        pt.is_qlogin ? i = pt.login_uin : (i = pt.needAt ? pt.needAt : e && e.value, pt.login_uin = i), t && (pt.submit_o.pt_vcode_v1 = 0, pt.submit_o.pt_verifysession_v1 = pt.verifysession), pt.submit_o.verifycode = pt.vcode.toUpperCase(), pt.submit_o.u = i;
        var r = !1;
        window.openSDK && openSDK.md5Pwd && 0 == openSDK.result ? (o = openSDK.md5Pwd, r = !0) : (o = n && n.value, r = !1), "open" != t && (pt.submit_o.p = $.Encryption.getEncryption(o, pt.salt, pt.submit_o.verifycode, r)), pt.submit_o.pt_randsalt = pt.isRandSalt || 0, pt.submit_o.ptlang = pt.lang_num, pt.submit_o.low_login_enable = 1 == pt.low_login_enable ? 1 : 0, pt.submit_o.low_login_enable && (pt.submit_o.low_login_hour = window.ptui_low_login_hour), pt.submit_o.u1 = encodeURIComponent(pt.s_url), pt.submit_o.from_ui = 1, pt.submit_o.fp = "loginerroralert", pt.submit_o.device = pt.deviceType, pt.submit_o.aid = pt.appid, window.ptui_daid && (pt.submit_o.daid = window.ptui_daid), "1" == window.ptui_pt_qzone_sig && (pt.submit_o.pt_qzone_sig = 1), "1" == window.ptui_pt_ttype && (pt.submit_o.pt_ttype = "1"), "1" == window.ptui_pt_light && (pt.submit_o.pt_light = "1"), window.ptui_pt_3rd_aid && (pt.submit_o.pt_3rd_aid = window.ptui_pt_3rd_aid), pt.submit_o.ptredirect = pt.target, pt.submit_o.h = 1, pt.submit_o.g = 1, pt.submit_o.pt_uistyle = window.ptui_style, "0" != window.ptui_kf_csimc && window.ptui_kf_csimc && (pt.submit_o.csimc = ptui_kf_csimc, pt.submit_o.csnum = ptui_kf_csnum, pt.submit_o.authid = ptui_kf_authid);
        var a = pt.object2param(pt.submit_o);
        if (t) {
            var p = pt.isHulian ? "pt_open_login" : "login",
                s = pt.loginUrl + p + "?" + a;
            $.http.loadScript(s)
        } else pt.showVcode(), pt.isSubmiting = !1;
        return !1
    },
    cb: function(t, e, n, i, o) {
        switch (pt.isSubmiting = !1, +t) {
            case 0:
                clearInterval(pt.qrcode.clock);
                var r = pt.uInput && pt.uInput.value;
                return pt.saveLastUin(r || ""), n.indexOf("/cgi-bin/mibao_vry") > -1 && (n += "&style=" + pt.style), pt.isOffice && window.mqq && mqq.invoke && mqq.invoke("QQOfficeOpen", "checkApp", {
                    appId: window.ptui_pt_3rd_aid
                }), pt.qrcode.used && (pt.qrcode.done = !0, $.report.monitor("2136878")), void pt.redirect(i, n);
            case 4:
                pt.changeCodeImg();
                break;
            case 65:
                return clearInterval(pt.qrcode.clock), void pt.showErr("一键登录超时，请重试。", 1e6);
            case 66:
            case 67:
                return;
            default:
                clearInterval(pt.qrcode.clock), pt.go_back()
        }
        pt.showErr(o)
    },
    cb_checkVC: function(t, e, n, i, o) {
        switch (t + "") {
            case "0":
                pt.vcode = e || "abcd", pt.verifysession = i;
                break;
            case "1":
                pt.vcode = "", pt.cap_cd = e;
                break;
            case "2":
            case "3":
        }
        return 2 == t ? void pt.showErr(pt.lang.err_uin) : 3 == t ? void pt.showErr(pt.checkErr[ptui_lang]) : (pt.salt = n, pt.isRandSalt = o, void pt.submit(pt.vcode))
    },
    check: function(t) {
        if (!pt.isSubmiting) {
            if (pt.is_qlogin = t, !pt.is_qlogin && !pt.checkValidate()) return void clearTimeout(pt._timer);
            var e = "";
            e = t ? pt.login_uin : pt.needAt ? pt.needAt : pt.uInput.value;
            var n = pt.checkUrl + "pt_tea=1&uin=" + e + "&appid=" + pt.appid + "&ptlang=" + pt.lang_num + "&r=" + Math.random();
            $.http.loadScript(n)
        }
    },
    checkValidate: function() {
        var t = pt.uInput,
            e = pt.pInput;
        return "" == t.value ? (pt.showErr(pt.lang.no_uin, function() {
            t.focus()
        }), !1) : pt.checkQQUin(t.value) ? (t.value = $.str.trim(t.value), "" == e.value ? (pt.showErr(pt.lang.no_password, function() {
            e.focus()
        }), !1) : !0) : (pt.showErr(pt.lang.err_uin, function() {
            t.focus()
        }), !1)
    },
    checkQQUin: function(t) {
        if (0 == t.length) return !1;
        t = $.str.trim(t), pt.needAt = "";
        var e = $.check;
        if (pt.appid == pt.t_appid) {
            if (e.isQQ(t) || e.isMail(t)) return !0;
            if (e.isNick(t) || e.isName(t)) return pt.needAt = "@" + encodeURIComponent(t), !0;
            if (e.isPhone(t)) return pt.needAt = "@" + t.replace(/^(86|886)/, ""), !0;
            if (e.isSeaPhone(t)) return pt.needAt = "@00" + t.replace(/^(00)/, ""), /^(@0088609)/.test(pt.needAt) && (pt.needAt = pt.needAt.replace(/^(@0088609)/, "@008869")), !0;
            pt.needAt = ""
        } else {
            if (e.isQQ(t) || e.isMail(t)) return !0;
            if (e.isNick(t)) return pt.uInput.value = t + "@qq.com", !0;
            if (e.isPhone(t)) return pt.needAt = "@" + t.replace(/^(86|886)/, ""), !0
        }
        return e.isForeignPhone(t) ? (pt.needAt = "@" + t, !0) : e.isPaipaiDuokefu(t) ? !0 : !1
    },
    checkVcode: function() {
        var t = $("vcode_input");
        return "" == t.value ? (pt.showErr(pt.lang.no_code), t.focus(), !1) : t.value.length < 4 ? (pt.showErr(pt.lang.less_code), t.focus(), t.select(), !1) : /^[a-zA-Z0-9]+$/.test(t.value) ? !0 : (pt.showErr(pt.lang.err_code), t.focus(), t.select(), !1)
    },
    clickHeader: function(t) {
        t.preventDefault();
        var e = t.target,
            n = e.parentNode,
            i = n.getAttribute("id"),
            o = n.getAttribute("type");
        switch (pt.login_uin = i, pt.login_pwd = n.getAttribute("pwd"), o + "") {
            case "1":
                pt.check(!0);
                break;
            case "2":
                pt.qlogin_submit();
                break;
            case "3":
                pt.authlogin_submit();
                break;
            default:
                pt.check(!0)
        }
    },
    setHeader: function(t) {
        for (var e in t)"" != t[e].url && "" != e && $("img_" + e) && ($("img_" + e).src = t[e]);
        pt.hideURLBar()
    },
    initFace: function() {
        for (var t = pt.qlogin_list_data, e = t.length, n = pt.isHttps ? "https://ssl." : "http://", i = 0; e > i; i++) $.http.loadScript(n + "ptlogin2." + pt.domain + "/getface?appid=" + pt.appid + "&imgtype=3&encrytype=0&devtype=1&keytpye=0&uin=" + t[i].uin + "&r=" + Math.random())
    },
    face_error: function(t) {
        return t.src != pt.default_face_url && (t.src = pt.default_face_url), !1
    },
    getShortWord: function(t, e, n) {
        e = e ? e : "";
        var i = "...";
        if (t.innerHTML = e, t.clientWidth <= n);
        else for (var o = e.length, r = Math.ceil(o / 2), a = 0; r > a; a++) {
            var p = e.substring(0, r - a),
                s = e.substring(r + a, o);
            if (t.innerHTML = p + i + s, t.clientWidth <= n) {
                t.title = e;
                break
            }
            var s = e.substring(r + a + 1, o);
            if (t.innerHTML = p + i + s, t.clientWidth <= n) {
                t.title = e;
                break
            }
        }
        t.style.width = n + "px"
    },
    changeCodeImg: function() {
        if (pt.new_vcode) {
            var t = (pt.isHttps ? "https://ssl." : "http://") + "captcha.qq.com/cap_union_show?captype=3";
            t += "&aid=" + pt.appid + "&uin=" + pt.login_uin + "&cap_cd=" + pt.cap_cd + "&pt_style=" + window.ptui_style + "&v=" + Math.random(), $("cap_iframe").src = t
        } else {
            var e = $("vcode_img"),
                n = pt.domain,
                i = (pt.isHttps ? "https://ssl." : "http://") + "captcha." + n + "/getimage";
            pt.isHttps && "qq.com" != n && "tenpay.com" != n && (i = "https://ssl.ptlogin2." + n + "/ptgetimage"), i += "?aid=" + pt.appid + "&uin=" + pt.login_uin + "&v=" + Math.random(), e.src = i
        }
    },
    showVcode: function() {
        if (pt.new_vcode) {
            $("content").style.display = "none", $("new_vcode").style.display = "block";
            var t = (pt.isHttps ? "https://ssl." : "http://") + "captcha.qq.com/cap_union_show?captype=3";
            t += "&lang=" + pt.lang_num + "&aid=" + pt.appid + "&uin=" + pt.login_uin + "&cap_cd=" + pt.cap_cd + "&pt_style=" + window.ptui_style + "&v=" + Math.random(), $("cap_iframe").src = t, pt.ptui_notifySize()
        } else $("login").style.display = "none", $("vcode").style.display = "block", pt.bindVcodeEvent(), pt.changeCodeImg();
        pt.hideURLBar(), $("btn_app_down") && $.css.hide("btn_app_down")
    },
    go_back: function() {
        $("content") && ($("content").style.display = "block"), $("login") && ($("login").style.display = "block"), $("vcode") && ($("vcode").style.display = "none"), $("new_vcode") && ($("new_vcode").style.display = "none")
    },
    submitVcode: function() {
        if (!pt.isSubmiting) {
            if (!pt.checkVcode()) return !1;
            pt.submit_o.verifycode = $("vcode_input").value.toUpperCase();
            var t = "",
                e = !1;
            window.openSDK && openSDK.md5Pwd && 0 == openSDK.result ? (t = openSDK.md5Pwd, e = !0) : (t = pt.pInput.value, e = !1), pt.submit_o.p = $.Encryption.getEncryption(t, pt.salt, pt.submit_o.verifycode, e), pt.submit_o.pt_randsalt = pt.isRandSalt || 0;
            var n = pt.object2param(pt.submit_o),
                i = pt.isHulian ? "pt_open_login" : "login",
                o = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.domain + "/" + i + "?" + n;
            $.http.loadScript(o)
        }
    },
    submitNewVcode: function(t) {
        pt.submit_o.verifycode = t.randstr.toUpperCase(), pt.submit_o.pt_vcode_v1 = 1, pt.submit_o.pt_verifysession_v1 = t.sig;
        var e = "",
            n = !1;
        window.openSDK && openSDK.md5Pwd && 0 == openSDK.result ? (e = openSDK.md5Pwd, n = !0) : (e = pt.pInput.value, n = !1), pt.submit_o.p = $.Encryption.getEncryption(e, pt.salt, pt.submit_o.verifycode, n), pt.submit_o.pt_randsalt = pt.isRandSalt || 0, "0" != window.ptui_kf_csimc && window.ptui_kf_csimc && (pt.submit_o.csimc = ptui_kf_csimc, pt.submit_o.csnum = ptui_kf_csnum, pt.submit_o.authid = ptui_kf_authid);
        var i = pt.object2param(pt.submit_o),
            o = pt.isHulian ? "pt_open_login" : "login",
            r = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.domain + "/" + o + "?" + i;
        $.http.loadScript(r)
    },
    open: {
        timer: -1,
        authListDone: !1,
        waiting: function(t, e) {
            if (e) switch (t) {
                case "authlist":
                    pt.open.authListDone ? e() : pt.open.waiting.authlistFn = e;
                    break;
                case "authdata":
                    pt.submit_o.openlogin_data ? e() : (pt.open.getAuthData(), pt.open.waiting.authdataFn = e)
            }
        },
        authListReady: function(t) {
            pt.open.authListDone = !0, pt.open.waiting.authlistFn && (pt.open.waiting.authlistFn(), pt.open.waiting.authlistFn = null), t = t || {};
            var e = window.ptui_daid && parseInt($.cookie.get("supertoken"));
            e && (t.superkey = 1), t.pt_flex && (window.pt_flex = 1), t.skey && (t.skey = +t.skey), window.pt_skey_valid = t.skey, (1 == t.skey || t.superkey || pt.qqBrowserInfo) && (pt.build_hulian_qlogin_list(t), pt.initFace())
        },
        setFrameHeight: function() {},
        getData: function(t) {
            return clearTimeout(pt.open.timer), pt.submit_o.openlogin_data = encodeURIComponent(t.value), pt.open.waiting.authdataFn ? (pt.open.waiting.authdataFn(), void(pt.open.waiting.authdataFn = null)) : void(pt.cookieLogin ? pt.cookielogin_submit() : pt.qqBrowserInfo ? pt.qlogin_submit() : window.openSDK && openSDK.getMD5FromNative ? openSDK.getMD5FromNative(function() {
                pt.check(!1)
            }) : pt.check(!1))
        },
        getAuthData: function() {
            return pt.open.authListDone ? (pt.open.timer = setTimeout(function() {
                pt.showErr("授权信息获取失败")
            }, 3e3), void(window.pt_flex ? pt.open.getData({
                value: location.search.substr(1) + "&pt_flex=1"
            }) : xMsg.call("connect", "getData", {}, pt.open.getData))) : pt.showErr("授权列表加载失败")
        },
        fillAppInfo: function(t) {
            if (t && 0 == t.retcode && t.result) {
                var e = t.result.IconUrl;
                e && e.indexOf("http://") > -1 && (e = e.replace("http://", "https://")), $("app_logo").style.backgroundImage = "url(" + e + ")", $("app_alias").innerHTML = t.result.AppAlias, $("app_comment").innerHTML = t.result.AppComment
            }
        },
        loadAppInfo: function() {
            $.http.loadScript("//cgi.connect.qq.com/qqconnectwebsite/get_app_basicinfo?appid=" + window.ptui_pt_3rd_aid + "&platform_type=1&env=1&callback=get_app_basicinfo")
        }
    },
    crossMessage: function(t) {
        if ("undefined" != typeof window.postMessage) {
            var e = $.str.json2str(t);
            window.parent.postMessage(e, "*")
        }
    },
    ptui_notifyClose: function(t) {
        t && t.preventDefault();
        var e = {};
        e.action = "close", pt.crossMessage(e)
    },
    ptui_notifySize: function(t) {
        var e = {};
        if (e.action = "resize", t) {
            var n = $(t);
            e.width = n.offsetWidth || 1, e.height = n.offsetHeight || 1
        } else e.width = 320, e.height = 441;
        pt.crossMessage(e)
    }
};
pt.auth(), parseInt($.bom.query("pt_wxtest")) && pt.isWX && wxapi(), pt.qrcode = {
    CGI: "ptqrlogin",
    used: !1,
    done: !1,
    clock: 0,
    get: function() {
        var t = "ptqrshow",
            e = pt.isHttps ? "https://ssl." : "http://",
            n = e + "ptlogin2." + pt.domain + "/" + t + "?";
        n += "appid=" + pt.appid + "&type=1&t=" + Math.random(), pt.daid && (n += "&daid=" + pt.daid), clearInterval(pt.qrcode.clock), pt.checkNetwork(), $.http.loadScript(n), pt.qrcode.used = !0, pt.qrcode.done = !1, $.report.monitor("2136877")
    },
    polling: function(t) {
        var e = pt.qlogin_submit(pt.qrcode.CGI);
        clearInterval(pt.qrcode.clock), pt.qrcode.clock = setInterval(function() {
            $.http.loadScript(e + "&r=" + Math.random())
        }, 3e3);
        var n = pt.isIPhone ? "wtloginmqq3:" : "wtloginmqq:",
            i = n + "//ptlogin/qlogin?qrcode=" + encodeURIComponent(t) + "&schemacallback=" + encodeURIComponent("weixin://");
        openApp(i)
    }
}, OneKey.ERRMSG = {
    2052: "使用一键登录，<a href='http://im.qq.com/mobileqq/touch/53/index.html' target='_blank'>请安装最新版本的手机QQ</a>",
    1028: "使用一鍵登錄，<a href='http://im.qq.com/mobileqq/touch/53/index.html' target='_blank'>請安裝最新版本的手機QQ</a>",
    1033: "Have <a href='http://im.qq.com/mobileqq/touch/53/index.html' target='_blank'>the latest Mobile QQ</a>？"
};
var openSDK = function() {
    var t = "",
        e = 0,
        n = 0,
        i = [],
        o = function(t, e) {
            n = 1, "function" == typeof e && (i[n] = e), window.location.href = "jsbridge://SecureJsInterface/curPosFromJS/" + n + "/openSDKCallBack/" + t
        },
        r = function(t, e) {
            n = 2, "function" == typeof e && (i[n] = e), window.location.href = "jsbridge://SecureJsInterface/isPasswordEdit/" + n + "/openSDKCallBack/" + t
        },
        a = function(t) {
            n = 3, "function" == typeof t && (i[n] = t), window.location.href = "jsbridge://SecureJsInterface/clearAllEdit/" + n + "/openSDKCallBack"
        },
        p = function(t) {
            n = 4, "function" == typeof t && (i[n] = t), window.location.href = "jsbridge://SecureJsInterface/getMD5FromNative/" + n + "/openSDKCallBack"
        };
    return "1" == window.ptui_enablePwd ? {
        curPosFromJS: o,
        isPasswordEdit: r,
        clearAllEdit: a,
        getMD5FromNative: p,
        sn: n,
        md5Pwd: t,
        result: e,
        callbackArray: i
    } : void 0
}();