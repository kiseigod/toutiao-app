(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-302e4d16"],
  {
    "3e3d": function (t, e, a) {},
    "613b": function (t, e, a) {
      "use strict";
      a("3e3d");
    },
    e134: function (t, e, a) {
      "use strict";
      a.r(e);
      var n = function () {
          var t = this,
            e = t._self._c;
          return e("div", [
            e(
              "div",
              { staticClass: "home_container" },
              [e("keep-alive", [e("router-view")], 1)],
              1
            ),
            e(
              "div",
              [
                e(
                  "van-tabbar",
                  {
                    attrs: { route: "" },
                    model: {
                      value: t.active,
                      callback: function (e) {
                        t.active = e;
                      },
                      expression: "active",
                    },
                  },
                  [
                    e(
                      "van-tabbar-item",
                      { attrs: { icon: "home-o", to: "/layout/home" } },
                      [t._v("首页")]
                    ),
                    e(
                      "van-tabbar-item",
                      { attrs: { icon: "setting-o", to: "/layout/user" } },
                      [t._v("我的")]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ]);
        },
        i = [],
        o = {
          name: "Layout",
          data() {
            return { active: 0 };
          },
        },
        c = o,
        r = (a("613b"), a("2877")),
        u = Object(r["a"])(c, n, i, !1, null, "433c48b4", null);
      e["default"] = u.exports;
    },
  },
]);
//# sourceMappingURL=chunk-302e4d16.b8c94c5c.js.map
