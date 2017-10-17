"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var directive_1 = require("./directive");
var forms_1 = require("@angular/forms");
var JWBootstrapSwitchModule = /** @class */ (function () {
    function JWBootstrapSwitchModule() {
    }
    JWBootstrapSwitchModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule
            ],
            declarations: [directive_1.JWBootstrapSwitchDirective],
            exports: [
                directive_1.JWBootstrapSwitchDirective,
                forms_1.FormsModule
            ]
        })
    ], JWBootstrapSwitchModule);
    return JWBootstrapSwitchModule;
}());
exports.JWBootstrapSwitchModule = JWBootstrapSwitchModule;
//# sourceMappingURL=index.js.map