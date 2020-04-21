(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      pageOptions: [5, 10, 15],
      cabeceras: [{
        key: "name",
        label: "Nombre",
        thStyle: "width: 22rem"
      }, {
        key: "programa_name",
        label: "Programa",
        "class": "text-center",
        thStyle: "width: 18rem"
      }, {
        key: "studentsStatus",
        label: "Alumnos Aprobados",
        "class": "text-center"
      }, {
        key: "edit",
        label: "Editar",
        "class": "text-center",
        thStyle: "width: 6rem"
      }, {
        key: "destroy",
        label: "Eliminar",
        "class": "text-center",
        thStyle: "width: 6rem"
      }],
      nombre: "",
      nameState: ""
    };
  },
  created: function created() {
    this.$store.dispatch("promotions/getPromotions");
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(["modelEdit"]), {}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])("promotions", ["promotions", "totalItems", "perPage"]), {
    currentPage: {
      get: function get() {
        // console.log(this.$store.state.students.currentPage)
        return this.$store.state.promotions.currentPage;
      },
      set: function set(value) {
        this.$store.commit("promotions/SetCurrentPage", value);
      }
    },
    perPage: {
      get: function get() {
        // console.log(this.$store.state.students.currentPage)
        return this.$store.state.promotions.perPage;
      },
      set: function set(value) {
        this.$store.commit("promotions/SetPerPage", value);
      }
    }
  }),
  methods: {
    onRowSelected: function onRowSelected(items) {
      var _this = this;

      console.log(items[0].id);
      this.$store.dispatch("students/getStudentsByPromotion", items[0].id).then(function (res) {
        _this.$router.push("/students/" + items[0].id); //Esperar que de carguen los modulos, para que tenga la data para crear los graficos al llegar a esa ruta

      });
    },
    editar: function editar(model) {
      this.$store.commit("ModelEdit", Object.assign({}, model));
      this.$refs["modal_update"].show();
      console.log(model);
    },
    eliminar: function eliminar(model) {
      console.log(model);
      this.$store.dispatch("students/deleteStudent", model);
    },
    color: function color(total, completados) {
      var $color;
      var value = completados * 100 / total;
      $color = "primary";
      return $color;
    },
    handleOk: function handleOk(bvModalEvt) {
      this.nameState = null;
      bvModalEvt.preventDefault(); // Trigger submit handler

      this.handleSubmit();
    },
    handleSubmit: function handleSubmit() {
      var _this2 = this;

      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.$store.dispatch("promotions/updatePromotion", this.modelEdit).then(function (res) {})["catch"](function (e) {
        console.log(e.response);
      });
      this.$nextTick(function () {
        _this2.$refs.modal_update.hide();
      });
    },
    checkFormValidity: function checkFormValidity() {
      var valid = this.$refs.form.checkValidity();
      this.nameState = this.modelEdit.name == "" ? valid : true;
      console.log(this.modelEdit);
      return valid;
    },
    resetModal: function resetModal() {
      this.name = "";
      this.nameState = null;
    }
  },
  watch: {
    currentPage: function currentPage(newVal, OldVal) {
      this.$store.dispatch("promotions/getPromotions");
    },
    perPage: function perPage(newVal, OldVal) {
      this.$store.dispatch("promotions/getPromotions");
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=template&id=041b14da&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=template&id=041b14da& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
        "b-card",
        { attrs: { header: "Lista de Promociones" } },
        [
          _c(
            "b-card-body",
            [
              _c(
                "b-row",
                { staticClass: "justify-content-md-center" },
                [
                  _c(
                    "b-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            { staticClass: "my-1", attrs: { md: "4" } },
                            [
                              _c(
                                "b-form-group",
                                {
                                  staticClass: "mb-0",
                                  attrs: {
                                    label: "Por página",
                                    "label-cols-md": "3",
                                    "label-align-sm": "right",
                                    "label-size": "sm",
                                    "label-for": "perPageSelect"
                                  }
                                },
                                [
                                  _c("b-form-select", {
                                    attrs: {
                                      id: "perPageSelect",
                                      size: "sm",
                                      options: _vm.pageOptions
                                    },
                                    model: {
                                      value: _vm.perPage,
                                      callback: function($$v) {
                                        _vm.perPage = $$v
                                      },
                                      expression: "perPage"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            { attrs: { md: "8" } },
                            [
                              _c("b-pagination", {
                                attrs: {
                                  "total-rows": _vm.totalItems,
                                  "per-page": _vm.perPage,
                                  "aria-controls": "students-list",
                                  align: "right"
                                },
                                model: {
                                  value: _vm.currentPage,
                                  callback: function($$v) {
                                    _vm.currentPage = $$v
                                  },
                                  expression: "currentPage"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("b-table", {
                        attrs: {
                          outlined: "",
                          responsive: "",
                          stacked: "md",
                          hover: "",
                          "head-variant": "light",
                          items: _vm.promotions,
                          fields: _vm.cabeceras,
                          selectable: "",
                          "select-mode": "single"
                        },
                        on: { "row-selected": _vm.onRowSelected },
                        scopedSlots: _vm._u([
                          {
                            key: "cell(name)",
                            fn: function(row) {
                              return [
                                _c("div", [_vm._v(_vm._s(row.item.name))]),
                                _vm._v(" "),
                                _c("div", { staticClass: "small text-muted" }, [
                                  _vm._v(
                                    "Registrado: " + _vm._s(row.item.created_at)
                                  )
                                ])
                              ]
                            }
                          },
                          {
                            key: "cell(programa_name)",
                            fn: function(row) {
                              return [
                                _c("div", [_vm._v("Industrias alimentarias")])
                              ]
                            }
                          },
                          {
                            key: "cell(studentsStatus)",
                            fn: function(row) {
                              return [
                                _c("div", { staticClass: "clearfix" }, [
                                  _c("div", { staticClass: "float-right" }, [
                                    _c("small", { staticClass: "text-muted" }, [
                                      _vm._v(
                                        "Tiene " +
                                          _vm._s(row.item.total_alumnos) +
                                          " alumnos"
                                      )
                                    ])
                                  ])
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-progress",
                                  {
                                    attrs: {
                                      variant: _vm.color(
                                        row.item.total_alumnos,
                                        row.item.alumnos_aprobados
                                      ),
                                      animated: ""
                                    }
                                  },
                                  [
                                    _c("b-progress-bar", {
                                      attrs: {
                                        value:
                                          row.item.total_alumnos != 0
                                            ? (row.item.alumnos_aprobados *
                                                100) /
                                              row.item.total_alumnos
                                            : 0,
                                        label:
                                          (row.item.total_alumnos != 0
                                            ? (row.item.alumnos_aprobados *
                                                100) /
                                              row.item.total_alumnos
                                            : 0
                                          ).toString() + "%"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            }
                          },
                          {
                            key: "cell(edit)",
                            fn: function(row) {
                              return [
                                _c(
                                  "div",
                                  { staticClass: "text-center" },
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        attrs: { variant: "outline-primary" },
                                        on: {
                                          click: function($event) {
                                            return _vm.editar(row.item)
                                          }
                                        }
                                      },
                                      [_vm._v("Editar")]
                                    )
                                  ],
                                  1
                                )
                              ]
                            }
                          },
                          {
                            key: "cell(destroy)",
                            fn: function(row) {
                              return [
                                _c(
                                  "b-button",
                                  {
                                    attrs: { variant: "outline-danger" },
                                    on: {
                                      click: function($event) {
                                        return _vm.eliminar(row.item)
                                      }
                                    }
                                  },
                                  [_vm._v("Eliminar")]
                                )
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "modal_update",
          attrs: {
            "header-text-variant": "white",
            "header-bg-variant": "dark",
            centered: "",
            title: "Editar Alumno"
          },
          on: { show: _vm.resetModal, hidden: _vm.resetModal, ok: _vm.handleOk }
        },
        [
          _c(
            "b-form",
            {
              ref: "form",
              staticClass: "m-3",
              on: {
                submit: function($event) {
                  $event.stopPropagation()
                  $event.preventDefault()
                  return _vm.handleSubmit($event)
                }
              }
            },
            [
              _c(
                "b-form-group",
                {
                  attrs: {
                    "label-align": "left",
                    "label-cols": "4",
                    "label-cols-lg": "3",
                    label: "Nombre:"
                  }
                },
                [
                  _c("b-form-input", {
                    attrs: { state: _vm.nameState, required: "" },
                    model: {
                      value: _vm.modelEdit.name,
                      callback: function($$v) {
                        _vm.$set(_vm.modelEdit, "name", $$v)
                      },
                      expression: "modelEdit.name"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Promotion/PromotionListComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Promotion/PromotionListComponent.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PromotionListComponent_vue_vue_type_template_id_041b14da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PromotionListComponent.vue?vue&type=template&id=041b14da& */ "./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=template&id=041b14da&");
/* harmony import */ var _PromotionListComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PromotionListComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PromotionListComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PromotionListComponent_vue_vue_type_template_id_041b14da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PromotionListComponent_vue_vue_type_template_id_041b14da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Promotion/PromotionListComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PromotionListComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PromotionListComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PromotionListComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=template&id=041b14da&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=template&id=041b14da& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PromotionListComponent_vue_vue_type_template_id_041b14da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PromotionListComponent.vue?vue&type=template&id=041b14da& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Promotion/PromotionListComponent.vue?vue&type=template&id=041b14da&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PromotionListComponent_vue_vue_type_template_id_041b14da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PromotionListComponent_vue_vue_type_template_id_041b14da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);