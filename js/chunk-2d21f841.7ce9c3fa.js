(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-2d21f841"],
  {
    d9c9: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = function () {
          var e = this,
            t = e._self._c;
          return t(
            "div",
            [
              t("van-nav-bar", { attrs: { title: "今日头条-登录" } }),
              t(
                "div",
                [
                  t(
                    "van-form",
                    { on: { submit: e.onSubmit } },
                    [
                      t("van-field", {
                        attrs: {
                          required: "",
                          name: "mobile",
                          label: "手机号",
                          placeholder: "请输入11位手机号",
                          rules: [
                            {
                              required: !0,
                              message: "请填写正确手机号",
                              pattern: /^1[3-9]\d{9}$/,
                            },
                          ],
                        },
                        model: {
                          value: e.user.mobile,
                          callback: function (t) {
                            e.$set(e.user, "mobile", t);
                          },
                          expression: "user.mobile",
                        },
                      }),
                      t("van-field", {
                        attrs: {
                          required: "",
                          type: "password",
                          name: "code",
                          label: "密码",
                          placeholder: "请输入6位密码",
                          rules: [
                            {
                              required: !0,
                              message: "请填写正确密码",
                              pattern: /^\d{6}$/,
                            },
                          ],
                        },
                        model: {
                          value: e.user.code,
                          callback: function (t) {
                            e.$set(e.user, "code", t);
                          },
                          expression: "user.code",
                        },
                      }),
                      t(
                        "div",
                        { staticStyle: { margin: "16px" } },
                        [
                          t(
                            "van-button",
                            {
                              attrs: {
                                round: "",
                                block: "",
                                type: "info",
                                "native-type": "submit",
                                disabled: e.isLoading,
                                loading: e.isLoading,
                                "loading-text": "正在登录中...",
                              },
                            },
                            [e._v("登录")]
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          );
        },
        n = [],
        i = (a("9889"), a("f564")),
        o = a("365c"),
        r = a("cc33"),
        d = {
          name: "Login",
          data() {
            return {
              user: { mobile: "15802713161", code: "246810" },
              isLoading: !1,
            };
          },
          methods: {
            async onSubmit(e) {
              this.isLoading = !0;
              try {
                const e = await Object(o["n"])(this.user);
                Object(i["a"])({ type: "success", message: "登陆成功" }),
                  Object(r["c"])(e.data.data.token),
                  localStorage.setItem(
                    "refresh_token",
                    e.data.data.refresh_token
                  ),
                  this.$router.replace("/layout/home");
              } catch (t) {
                Object(i["a"])({ type: "danger", message: "账号或密码错误" });
              }
              this.isLoading = !1;
            },
          },
        },
        l = d,
        c = a("2877"),
        u = Object(c["a"])(l, s, n, !1, null, null, null);
      t["default"] = u.exports;
    },
  },
]);
//# sourceMappingURL=chunk-2d21f841.7ce9c3fa.js.map
