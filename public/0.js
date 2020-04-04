(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserProfile.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UserProfile.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      model: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        about: ''
      }
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserProfile.vue?vue&type=template&id=67528743&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UserProfile.vue?vue&type=template&id=67528743& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "base-header",
        {
          staticClass: "header pb-8 pt-5 pt-lg-8 d-flex align-items-center",
          staticStyle: {
            "min-height": "600px",
            "background-image": "url(img/theme/profile-cover.jpg)",
            "background-size": "cover",
            "background-position": "center top"
          }
        },
        [
          _c("span", { staticClass: "mask bg-gradient-success opacity-8" }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "container-fluid d-flex align-items-center" },
            [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-lg-7 col-md-10" }, [
                  _c("h1", { staticClass: "display-2 text-white" }, [
                    _vm._v("Hello Jesse")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "text-white mt-0 mb-5" }, [
                    _vm._v(
                      "This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks"
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    { staticClass: "btn btn-info", attrs: { href: "#!" } },
                    [_vm._v("Edit profile")]
                  )
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "container-fluid mt--7" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-xl-4 order-xl-2 mb-5 mb-xl-0" }, [
            _c("div", { staticClass: "card card-profile shadow" }, [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                },
                [
                  _c(
                    "div",
                    { staticClass: "d-flex justify-content-between" },
                    [
                      _c(
                        "base-button",
                        {
                          staticClass: "mr-4",
                          attrs: { size: "sm", type: "info" }
                        },
                        [_vm._v("Connect")]
                      ),
                      _vm._v(" "),
                      _c(
                        "base-button",
                        {
                          staticClass: "float-right",
                          attrs: { size: "sm", type: "default" }
                        },
                        [_vm._v("Message")]
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _vm._m(1)
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-xl-8 order-xl-1" },
            [
              _c(
                "card",
                { attrs: { shadow: "", type: "secondary" } },
                [
                  _c(
                    "div",
                    {
                      staticClass: "bg-white border-0",
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [
                      _c("div", { staticClass: "row align-items-center" }, [
                        _c("div", { staticClass: "col-8" }, [
                          _c("h3", { staticClass: "mb-0" }, [
                            _vm._v("My account")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-4 text-right" }, [
                          _c(
                            "a",
                            {
                              staticClass: "btn btn-sm btn-primary",
                              attrs: { href: "#!" }
                            },
                            [_vm._v("Settings")]
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  [
                    _c(
                      "form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                          }
                        }
                      },
                      [
                        _c(
                          "h6",
                          { staticClass: "heading-small text-muted mb-4" },
                          [_vm._v("User information")]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "pl-lg-4" }, [
                          _c("div", { staticClass: "row" }, [
                            _c(
                              "div",
                              { staticClass: "col-lg-6" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "Username",
                                    placeholder: "Username",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.username,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "username", $$v)
                                    },
                                    expression: "model.username"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-lg-6" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "Email address",
                                    placeholder: "jesse@example.com",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.email,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "email", $$v)
                                    },
                                    expression: "model.email"
                                  }
                                })
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "row" }, [
                            _c(
                              "div",
                              { staticClass: "col-lg-6" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "First name",
                                    placeholder: "First name",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.firstName,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "firstName", $$v)
                                    },
                                    expression: "model.firstName"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-lg-6" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "Last name",
                                    placeholder: "Last name",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.lastName,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "lastName", $$v)
                                    },
                                    expression: "model.lastName"
                                  }
                                })
                              ],
                              1
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("hr", { staticClass: "my-4" }),
                        _vm._v(" "),
                        _c(
                          "h6",
                          { staticClass: "heading-small text-muted mb-4" },
                          [_vm._v("Contact information")]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "pl-lg-4" }, [
                          _c("div", { staticClass: "row" }, [
                            _c(
                              "div",
                              { staticClass: "col-md-12" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "Address",
                                    placeholder: "Home Address",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.address,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "address", $$v)
                                    },
                                    expression: "model.address"
                                  }
                                })
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "row" }, [
                            _c(
                              "div",
                              { staticClass: "col-lg-4" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "City",
                                    placeholder: "City",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.city,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "city", $$v)
                                    },
                                    expression: "model.city"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-lg-4" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "Country",
                                    placeholder: "Country",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.country,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "country", $$v)
                                    },
                                    expression: "model.country"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-lg-4" },
                              [
                                _c("base-input", {
                                  attrs: {
                                    alternative: "",
                                    label: "Postal code",
                                    placeholder: "Postal code",
                                    "input-classes": "form-control-alternative"
                                  },
                                  model: {
                                    value: _vm.model.zipCode,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "zipCode", $$v)
                                    },
                                    expression: "model.zipCode"
                                  }
                                })
                              ],
                              1
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("hr", { staticClass: "my-4" }),
                        _vm._v(" "),
                        _c(
                          "h6",
                          { staticClass: "heading-small text-muted mb-4" },
                          [_vm._v("About me")]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "pl-lg-4" }, [
                          _c(
                            "div",
                            { staticClass: "form-group" },
                            [
                              _c(
                                "base-input",
                                {
                                  attrs: { alternative: "", label: "About Me" }
                                },
                                [
                                  _c(
                                    "textarea",
                                    {
                                      staticClass:
                                        "form-control form-control-alternative",
                                      attrs: {
                                        rows: "4",
                                        placeholder: "A few words about you ..."
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                                      )
                                    ]
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ])
                      ]
                    )
                  ]
                ],
                2
              )
            ],
            1
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row justify-content-center" }, [
      _c("div", { staticClass: "col-lg-3 order-lg-2" }, [
        _c("div", { staticClass: "card-profile-image" }, [
          _c("a", { attrs: { href: "#" } }, [
            _c("img", {
              staticClass: "rounded-circle",
              attrs: { src: "img/theme/team-4-800x800.jpg" }
            })
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-body pt-0 pt-md-4" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col" }, [
          _c(
            "div",
            {
              staticClass:
                "card-profile-stats d-flex justify-content-center mt-md-5"
            },
            [
              _c("div", [
                _c("span", { staticClass: "heading" }, [_vm._v("22")]),
                _vm._v(" "),
                _c("span", { staticClass: "description" }, [_vm._v("Friends")])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", { staticClass: "heading" }, [_vm._v("10")]),
                _vm._v(" "),
                _c("span", { staticClass: "description" }, [_vm._v("Photos")])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", { staticClass: "heading" }, [_vm._v("89")]),
                _vm._v(" "),
                _c("span", { staticClass: "description" }, [_vm._v("Comments")])
              ])
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "text-center" }, [
        _c("h3", [
          _vm._v("\n                                Jessica Jones"),
          _c("span", { staticClass: "font-weight-light" }, [_vm._v(", 27")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "h5 font-weight-300" }, [
          _c("i", { staticClass: "ni location_pin mr-2" }),
          _vm._v("Bucharest, Romania\n                            ")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "h5 mt-4" }, [
          _c("i", { staticClass: "ni business_briefcase-24 mr-2" }),
          _vm._v(
            "Solution Manager - Creative Tim Officer\n                            "
          )
        ]),
        _vm._v(" "),
        _c("div", [
          _c("i", { staticClass: "ni education_hat mr-2" }),
          _vm._v("University of Computer Science\n                            ")
        ]),
        _vm._v(" "),
        _c("hr", { staticClass: "my-4" }),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music."
          )
        ]),
        _vm._v(" "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Show more")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/UserProfile.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/UserProfile.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserProfile_vue_vue_type_template_id_67528743___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=template&id=67528743& */ "./resources/js/components/UserProfile.vue?vue&type=template&id=67528743&");
/* harmony import */ var _UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/UserProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserProfile_vue_vue_type_template_id_67528743___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserProfile_vue_vue_type_template_id_67528743___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UserProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UserProfile.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/UserProfile.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UserProfile.vue?vue&type=template&id=67528743&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/UserProfile.vue?vue&type=template&id=67528743& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_67528743___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=template&id=67528743& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserProfile.vue?vue&type=template&id=67528743&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_67528743___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_67528743___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);