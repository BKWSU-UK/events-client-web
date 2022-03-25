if (typeof bk === 'undefined') {
    var bk = {};

    bk.loader = {
        loadFile: function (filename) {
            if (filename.match(/.+\.js/i)) {
                this.loadJsCssfile(filename, "js");
            } else if (filename.match(/.+\.css/i)) {
                this.loadJsCssfile(filename, "css");
            }
        },
        loadJsCssfile: function (filename, filetype) {
            var fileref;
            if (filetype === "js") { //if filename is a external JavaScript file
                fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", filename);
            } else if (filetype === "css") { //if filename is an external CSS file
                fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename);
            }
            if (typeof fileref !== "undefined") {
                var length = document.getElementsByTagName("head").length;
                document.getElementsByTagName("head")[length - 1].appendChild(fileref);
            }
        }
    };

    // window.eventsConfig = { scrolltop: true, orgId: 114 };
    //
    // const divRoot = document.createElement('div');
    // divRoot.setAttribute("id", "root");
    // divRoot.setAttribute("class", "container-fluid");

    // Original from the react build.
    //!function (e) { function t(t) { for (var n, l, i = t[0], f = t[1], a = t[2], p = 0, s = []; p < i.length; p++)l = i[p], Object.prototype.hasOwnProperty.call(o, l) && o[l] && s.push(o[l][0]), o[l] = 0; for (n in f) Object.prototype.hasOwnProperty.call(f, n) && (e[n] = f[n]); for (c && c(t); s.length;)s.shift()(); return u.push.apply(u, a || []), r() } function r() { for (var e, t = 0; t < u.length; t++) { for (var r = u[t], n = !0, i = 1; i < r.length; i++) { var f = r[i]; 0 !== o[f] && (n = !1) } n && (u.splice(t--, 1), e = l(l.s = r[0])) } return e } var n = {}, o = { 1: 0 }, u = []; function l(t) { if (n[t]) return n[t].exports; var r = n[t] = { i: t, l: !1, exports: {} }; return e[t].call(r.exports, r, r.exports, l), r.l = !0, r.exports } l.m = e, l.c = n, l.d = function (e, t, r) { l.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, l.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, l.t = function (e, t) { if (1 & t && (e = l(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var r = Object.create(null); if (l.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var n in e) l.d(r, n, function (t) { return e[t] }.bind(null, n)); return r }, l.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return l.d(t, "a", t), t }, l.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, l.p = "https://eventswebclient-test-gil.bkwsu.eu/"; var i = this["webpackJsonpevents-client-web"] = this["webpackJsonpevents-client-web"] || [], f = i.push.bind(i); i.push = t, i = i.slice(); for (var a = 0; a < i.length; a++)t(i[a]); var c = f; r() }([])

    const version = 'v0.26.0'

    bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/' + version + '/static/js/2.3cf9ef46.chunk.js', 'js');
    bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/' + version + '/static/js/main.fab34044.chunk.js', 'js');
    bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/' + version + '/static/css/2.7c86f009.chunk.css', 'css');
    bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/' + version + '/static/css/main.cfeb86af.chunk.css', 'css');
    bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/css/formio.css', 'css');
    if(!(location.href.indexOf('oxford') > -1)) {
        bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/css/weebly_support.css', 'css');
    }
    if(location.href.indexOf('agendas.lam') > -1) {
        bk.loader.loadFile('https://eventswebclient-test-gil.bkwsu.eu/css/agendas_lam.css', 'css');
    }
}
