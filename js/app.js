/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, o) {
        var n, s;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              o = (this.document || this.ownerDocument).querySelectorAll(t),
              n = this;
            do {
              for (e = o.length; 0 <= --e && o.item(e) !== n; );
            } while (e < 0 && (n = n.parentElement));
            return n;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var o = document.createEvent("CustomEvent");
              return o.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), o;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], o = 0;
              o < e.length && !window.requestAnimationFrame;
              ++o
            )
              (window.requestAnimationFrame =
                window[e[o] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[o] + "CancelAnimationFrame"] ||
                  window[e[o] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, o) {
                var n = new Date().getTime(),
                  s = Math.max(0, 16 - (n - t)),
                  i = window.setTimeout(function () {
                    e(n + s);
                  }, s);
                return (t = n + s), i;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (s =
            void 0 !== o.g
              ? o.g
              : "undefined" != typeof window
              ? window
              : this),
          (n = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                o = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var o in e) {
                        if (!e.hasOwnProperty(o)) return;
                        t[o] = e[o];
                      }
                    }),
                    t
                  );
                },
                n = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      o = String(t),
                      n = o.length,
                      s = -1,
                      i = "",
                      a = o.charCodeAt(0);
                    ++s < n;

                  ) {
                    if (0 === (e = o.charCodeAt(s)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    i +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === s && 48 <= e && e <= 57) ||
                      (1 === s && 48 <= e && e <= 57 && 45 === a)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? o.charAt(s)
                        : "\\" + o.charAt(s);
                  }
                  return "#" + i;
                },
                s = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                i = function (e) {
                  return e
                    ? ((o = e),
                      parseInt(t.getComputedStyle(o).height, 10) + e.offsetTop)
                    : 0;
                  var o;
                },
                a = function (e, o, n) {
                  0 === e && document.body.focus(),
                    n ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, o));
                },
                r = function (e, o, n, s) {
                  if (o.emitEvents && "function" == typeof t.CustomEvent) {
                    var i = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: n, toggle: s },
                    });
                    document.dispatchEvent(i);
                  }
                };
              return function (l, c) {
                var u,
                  d,
                  p,
                  h,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(h),
                        (h = null),
                        t || r("scrollCancel", u);
                    },
                    animateScroll: function (n, l, c) {
                      m.cancelScroll();
                      var d = o(u || e, c || {}),
                        f =
                          "[object Number]" ===
                          Object.prototype.toString.call(n),
                        g = f || !n.tagName ? null : n;
                      if (f || g) {
                        var y = t.pageYOffset;
                        d.header &&
                          !p &&
                          (p = document.querySelector(d.header));
                        var v,
                          b,
                          w,
                          A,
                          S,
                          E,
                          O,
                          L,
                          _ = i(p),
                          q = f
                            ? n
                            : (function (e, o, n, i) {
                                var a = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (a += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (a = Math.max(a - o - n, 0)),
                                  i && (a = Math.min(a, s() - t.innerHeight)),
                                  a
                                );
                              })(
                                g,
                                _,
                                parseInt(
                                  "function" == typeof d.offset
                                    ? d.offset(n, l)
                                    : d.offset,
                                  10
                                ),
                                d.clip
                              ),
                          C = q - y,
                          x = s(),
                          P = 0,
                          T =
                            ((v = C),
                            (w = (b = d).speedAsDuration
                              ? b.speed
                              : Math.abs((v / 1e3) * b.speed)),
                            b.durationMax && w > b.durationMax
                              ? b.durationMax
                              : b.durationMin && w < b.durationMin
                              ? b.durationMin
                              : parseInt(w, 10)),
                          H = function (e) {
                            var o, s, i;
                            A || (A = e),
                              (P += e - A),
                              (E =
                                y +
                                C *
                                  ((s = S =
                                    1 < (S = 0 === T ? 0 : P / T) ? 1 : S),
                                  "easeInQuad" === (o = d).easing &&
                                    (i = s * s),
                                  "easeOutQuad" === o.easing &&
                                    (i = s * (2 - s)),
                                  "easeInOutQuad" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 2 * s * s
                                        : (4 - 2 * s) * s - 1),
                                  "easeInCubic" === o.easing && (i = s * s * s),
                                  "easeOutCubic" === o.easing &&
                                    (i = --s * s * s + 1),
                                  "easeInOutCubic" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 4 * s * s * s
                                        : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                          1),
                                  "easeInQuart" === o.easing &&
                                    (i = s * s * s * s),
                                  "easeOutQuart" === o.easing &&
                                    (i = 1 - --s * s * s * s),
                                  "easeInOutQuart" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 8 * s * s * s * s
                                        : 1 - 8 * --s * s * s * s),
                                  "easeInQuint" === o.easing &&
                                    (i = s * s * s * s * s),
                                  "easeOutQuint" === o.easing &&
                                    (i = 1 + --s * s * s * s * s),
                                  "easeInOutQuint" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 16 * s * s * s * s * s
                                        : 1 + 16 * --s * s * s * s * s),
                                  o.customEasing && (i = o.customEasing(s)),
                                  i || s)),
                              t.scrollTo(0, Math.floor(E)),
                              (function (e, o) {
                                var s = t.pageYOffset;
                                if (
                                  e == o ||
                                  s == o ||
                                  (y < o && t.innerHeight + s) >= x
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    a(n, o, f),
                                    r("scrollStop", d, n, l),
                                    !(h = A = null)
                                  );
                              })(E, q) ||
                                ((h = t.requestAnimationFrame(H)), (A = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (O = n),
                          (L = d),
                          f ||
                            (history.pushState &&
                              L.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(L),
                                  anchor: O.id,
                                },
                                document.title,
                                O === document.documentElement
                                  ? "#top"
                                  : "#" + O.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? a(n, Math.floor(q), !1)
                            : (r("scrollStart", d, n, l),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(H));
                      }
                    },
                  },
                  f = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (d = e.target.closest(l)) &&
                      "a" === d.tagName.toLowerCase() &&
                      !e.target.closest(u.ignore) &&
                      d.hostname === t.location.hostname &&
                      d.pathname === t.location.pathname &&
                      /#/.test(d.href)
                    ) {
                      var o, s;
                      try {
                        o = n(decodeURIComponent(d.hash));
                      } catch (e) {
                        o = n(d.hash);
                      }
                      if ("#" === o) {
                        if (!u.topOnEmptyHash) return;
                        s = document.documentElement;
                      } else s = document.querySelector(o);
                      (s = s || "#top" !== o ? s : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var o = t.location.hash;
                            (o = o || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: o || t.pageYOffset,
                                },
                                document.title,
                                o || t.location.href
                              );
                          }
                        })(u),
                        m.animateScroll(s, d));
                    }
                  },
                  g = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(u)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          n(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    u &&
                      (document.removeEventListener("click", f, !1),
                      t.removeEventListener("popstate", g, !1),
                      m.cancelScroll(),
                      (h = p = d = u = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (u = o(e, c || {})),
                      (p = u.header ? document.querySelector(u.header) : null),
                      document.addEventListener("click", f, !1),
                      u.updateURL &&
                        u.popstate &&
                        t.addEventListener("popstate", g, !1);
                  })(),
                  m
                );
              };
            })(s);
          }.apply(e, [])),
          void 0 === n || (t.exports = n);
      },
    },
    e = {};
  function o(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var i = (e[n] = { exports: {} });
    return t[n].call(i.exports, i, i.exports, o), i.exports;
  }
  (o.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      class t {
        constructor(t) {
          let e = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...e,
              ...t,
              classes: { ...e.classes, ...t?.classes },
              hashSettings: { ...e.hashSettings, ...t?.hashSettings },
              on: { ...e.on, ...t?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.popupLogging("Проснулся"), this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (t) {
              const e = t.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (e)
                return (
                  t.preventDefault(),
                  (this._dataValue = e.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? e.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = e),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `Ой ой, не заполнен атрибут у ${e.classList}`
                      )
                );
              return t.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!t.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (t.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (t) {
                if (
                  this.options.closeEsc &&
                  27 == t.which &&
                  "Escape" === t.code &&
                  this.isOpen
                )
                  return t.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == t.which &&
                  this.isOpen &&
                  this._focusCatch(t);
              }.bind(this)
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (t) {
                  const e = t.detail.form.dataset.popupMessage;
                  e && this.open(e);
                }.bind(this)
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(t) {
          if (
            (t &&
              "string" == typeof t &&
              "" !== t.trim() &&
              ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                e = document.createElement("iframe");
              e.setAttribute("allowfullscreen", "");
              const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
              e.setAttribute("allow", `${o}; encrypted-media`),
                e.setAttribute("src", t),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(e);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : i(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              ),
              this.popupLogging("Открыл попап");
          } else
            this.popupLogging(
              "Ой ой, такого попапа нет. Проверьте корректность ввода. "
            );
        }
        close(t) {
          t &&
            "string" == typeof t &&
            "" !== t.trim() &&
            (this.previousOpen.selector = t),
            this.isOpen &&
              s &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                i(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("Закрыл попап"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let t = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${t}"]`
          ) &&
            t &&
            this.open(t);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(t) {
          const e = this.targetOpen.element.querySelectorAll(this._focusEl),
            o = Array.prototype.slice.call(e),
            n = o.indexOf(document.activeElement);
          t.shiftKey &&
            0 === n &&
            (o[o.length - 1].focus(), t.preventDefault()),
            t.shiftKey ||
              n !== o.length - 1 ||
              (o[0].focus(), t.preventDefault());
        }
        _focusTrap() {
          const t = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : t[0].focus();
        }
        popupLogging(t) {
          this.options.logging && l(`[Попапос]: ${t}`);
        }
      }
      let e = (t, e = 500, o = 0) => {
          t.classList.contains("_slide") ||
            (t.classList.add("_slide"),
            (t.style.transitionProperty = "height, margin, padding"),
            (t.style.transitionDuration = e + "ms"),
            (t.style.height = `${t.offsetHeight}px`),
            t.offsetHeight,
            (t.style.overflow = "hidden"),
            (t.style.height = o ? `${o}px` : "0px"),
            (t.style.paddingTop = 0),
            (t.style.paddingBottom = 0),
            (t.style.marginTop = 0),
            (t.style.marginBottom = 0),
            window.setTimeout(() => {
              (t.hidden = !o),
                !o && t.style.removeProperty("height"),
                t.style.removeProperty("padding-top"),
                t.style.removeProperty("padding-bottom"),
                t.style.removeProperty("margin-top"),
                t.style.removeProperty("margin-bottom"),
                !o && t.style.removeProperty("overflow"),
                t.style.removeProperty("transition-duration"),
                t.style.removeProperty("transition-property"),
                t.classList.remove("_slide");
            }, e));
        },
        n = (t, e = 500, o = 0) => {
          if (!t.classList.contains("_slide")) {
            t.classList.add("_slide"),
              (t.hidden = !t.hidden && null),
              o && t.style.removeProperty("height");
            let n = t.offsetHeight;
            (t.style.overflow = "hidden"),
              (t.style.height = o ? `${o}px` : "0px"),
              (t.style.paddingTop = 0),
              (t.style.paddingBottom = 0),
              (t.style.marginTop = 0),
              (t.style.marginBottom = 0),
              t.offsetHeight,
              (t.style.transitionProperty = "height, margin, padding"),
              (t.style.transitionDuration = e + "ms"),
              (t.style.height = n + "px"),
              t.style.removeProperty("padding-top"),
              t.style.removeProperty("padding-bottom"),
              t.style.removeProperty("margin-top"),
              t.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                t.style.removeProperty("height"),
                  t.style.removeProperty("overflow"),
                  t.style.removeProperty("transition-duration"),
                  t.style.removeProperty("transition-property"),
                  t.classList.remove("_slide");
              }, e);
          }
        },
        s = !0,
        i = (t = 500) => {
          document.documentElement.classList.contains("lock") ? a(t) : r(t);
        },
        a = (t = 500) => {
          let e = document.querySelector("body");
          if (s) {
            let o = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < o.length; t++) {
                o[t].style.paddingRight = "0px";
              }
              (e.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (s = !1),
              setTimeout(function () {
                s = !0;
              }, t);
          }
        },
        r = (t = 500) => {
          let e = document.querySelector("body");
          if (s) {
            let o = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < o.length; t++) {
              o[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (e.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (s = !1),
              setTimeout(function () {
                s = !0;
              }, t);
          }
        };
      function l(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      function c(t, e) {
        const o = Array.from(t).filter(function (t, o, n) {
          if (t.dataset[e]) return t.dataset[e].split(",")[0];
        });
        if (o.length) {
          const t = [];
          o.forEach((o) => {
            const n = {},
              s = o.dataset[e].split(",");
            (n.value = s[0]),
              (n.type = s[1] ? s[1].trim() : "max"),
              (n.item = o),
              t.push(n);
          });
          let n = t.map(function (t) {
            return (
              "(" +
              t.type +
              "-width: " +
              t.value +
              "px)," +
              t.value +
              "," +
              t.type
            );
          });
          n = (function (t) {
            return t.filter(function (t, e, o) {
              return o.indexOf(t) === e;
            });
          })(n);
          const s = [];
          if (n.length)
            return (
              n.forEach((e) => {
                const o = e.split(","),
                  n = o[1],
                  i = o[2],
                  a = window.matchMedia(o[0]),
                  r = t.filter(function (t) {
                    if (t.value === n && t.type === i) return !0;
                  });
                s.push({ itemsArray: r, matchMedia: a });
              }),
              s
            );
        }
      }
      var u = o(2);
      let d = (t, e = !1, o = 500, n = 0) => {
        const s = document.querySelector(t);
        if (s) {
          let i = "",
            r = 0;
          e &&
            ((i = "header.header"),
            (r = document.querySelector(i).offsetHeight));
          let c = {
            speedAsDuration: !0,
            speed: o,
            header: i,
            offset: n,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (a(), document.documentElement.classList.remove("menu-open")),
            void 0 !== u)
          )
            new u().animateScroll(s, "", c);
          else {
            let t = s.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: r ? t - r : t, behavior: "smooth" });
          }
          l(`[gotoBlock]: Юхуу...едем к ${t}`);
        } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
      };
      let p = !1;
      setTimeout(() => {
        if (p) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0),
        (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        (function () {
          const t = document.querySelectorAll("[data-spollers]");
          if (t.length > 0) {
            const o = Array.from(t).filter(function (t, e, o) {
              return !t.dataset.spollers.split(",")[0];
            });
            o.length && i(o);
            let s = c(t, "spollers");
            function i(t, e = !1) {
              t.forEach((t) => {
                (t = e ? t.item : t),
                  e.matches || !e
                    ? (t.classList.add("_spoller-init"),
                      a(t),
                      t.addEventListener("click", r))
                    : (t.classList.remove("_spoller-init"),
                      a(t, !1),
                      t.removeEventListener("click", r));
              });
            }
            function a(t, e = !0) {
              const o = t.querySelectorAll("[data-spoller]");
              o.length > 0 &&
                o.forEach((t) => {
                  e
                    ? (t.removeAttribute("tabindex"),
                      t.classList.contains("_spoller-active") ||
                        (t.nextElementSibling.hidden = !0))
                    : (t.setAttribute("tabindex", "-1"),
                      (t.nextElementSibling.hidden = !1));
                });
            }
            function r(t) {
              const o = t.target;
              if (o.closest("[data-spoller]")) {
                const s = o.closest("[data-spoller]"),
                  i = s.closest("[data-spollers]"),
                  a = !!i.hasAttribute("data-one-spoller");
                i.querySelectorAll("._slide").length ||
                  (a && !s.classList.contains("_spoller-active") && l(i),
                  s.classList.toggle("_spoller-active"),
                  ((t, o = 500) => {
                    t.hidden ? n(t, o) : e(t, o);
                  })(s.nextElementSibling, 500)),
                  t.preventDefault();
              }
            }
            function l(t) {
              const o = t.querySelector("[data-spoller]._spoller-active");
              o &&
                (o.classList.remove("_spoller-active"),
                e(o.nextElementSibling, 500));
            }
            s &&
              s.length &&
              s.forEach((t) => {
                t.matchMedia.addEventListener("change", function () {
                  i(t.itemsArray, t.matchMedia);
                }),
                  i(t.itemsArray, t.matchMedia);
              });
          }
        })(),
        (function () {
          const t = document.querySelectorAll("[data-tabs]");
          let o = [];
          if (t.length > 0) {
            const e = location.hash.replace("#", "");
            e.startsWith("tab-") && (o = e.replace("tab-", "").split("-")),
              t.forEach((t, e) => {
                t.classList.add("_tab-init"),
                  t.setAttribute("data-tabs-index", e),
                  t.addEventListener("click", i),
                  (function (t) {
                    const e = t.querySelectorAll("[data-tabs-titles]>*"),
                      n = t.querySelectorAll("[data-tabs-body]>*"),
                      s = t.dataset.tabsIndex,
                      i = o[0] == s;
                    if (i) {
                      t.querySelector(
                        "[data-tabs-titles]>._tab-active"
                      ).classList.remove("_tab-active");
                    }
                    n.length > 0 &&
                      n.forEach((t, n) => {
                        e[n].setAttribute("data-tabs-title", ""),
                          t.setAttribute("data-tabs-item", ""),
                          i && n == o[1] && e[n].classList.add("_tab-active"),
                          (t.hidden = !e[n].classList.contains("_tab-active"));
                      });
                  })(t);
              });
            let n = c(t, "tabs");
            n &&
              n.length &&
              n.forEach((t) => {
                t.matchMedia.addEventListener("change", function () {
                  s(t.itemsArray, t.matchMedia);
                }),
                  s(t.itemsArray, t.matchMedia);
              });
          }
          function s(t, e) {
            t.forEach((t) => {
              const o = (t = t.item).querySelector("[data-tabs-titles]"),
                n = t.querySelectorAll("[data-tabs-title]"),
                s = t.querySelector("[data-tabs-body]");
              t.querySelectorAll("[data-tabs-item]").forEach((i, a) => {
                e.matches
                  ? (s.append(n[a]),
                    s.append(i),
                    t.classList.add("_tab-spoller"))
                  : (o.append(n[a]), t.classList.remove("_tab-spoller"));
              });
            });
          }
          function i(t) {
            const o = t.target;
            if (o.closest("[data-tabs-title]")) {
              const s = o.closest("[data-tabs-title]"),
                i = s.closest("[data-tabs]");
              if (
                !s.classList.contains("_tab-active") &&
                !i.querySelectorAll("._slide").length
              ) {
                const t = i.querySelector("[data-tabs-title]._tab-active");
                t && t.classList.remove("_tab-active"),
                  s.classList.add("_tab-active"),
                  (function (t) {
                    const o = t.querySelectorAll("[data-tabs-title]"),
                      s = t.querySelectorAll("[data-tabs-item]"),
                      i = t.dataset.tabsIndex,
                      a = (function (t) {
                        if (t.hasAttribute("data-tabs-animate"))
                          return t.dataset.tabsAnimate > 0
                            ? t.dataset.tabsAnimate
                            : 500;
                      })(t);
                    s.length > 0 &&
                      s.forEach((t, s) => {
                        o[s].classList.contains("_tab-active")
                          ? (a ? n(t, a) : (t.hidden = !1),
                            t.closest(".popup") ||
                              (location.hash = `tab-${i}-${s}`))
                          : a
                          ? e(t, a)
                          : (t.hidden = !0);
                      });
                  })(i);
              }
              t.preventDefault();
            }
          }
        })(),
        new t({}),
        (function () {
          function t(t) {
            if ("click" === t.type) {
              const e = t.target;
              if (e.closest("[data-goto]")) {
                const o = e.closest("[data-goto]"),
                  n = o.dataset.goto ? o.dataset.goto : "",
                  s = !!o.hasAttribute("data-goto-header"),
                  i = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
                d(n, s, i), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                o = e.target;
              if ("navigator" === o.dataset.watch) {
                const t = o.id,
                  n =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${t}"]`));
                e.isIntersecting
                  ? n && n.classList.add("_navigator-active")
                  : n && n.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t);
        })();
    })();
})();
