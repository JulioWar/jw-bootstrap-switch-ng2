"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var noop = function () {
};
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return JWBootstrapSwitchDirective; }),
    multi: true
};
var JWBootstrapSwitchDirective = (function () {
    function JWBootstrapSwitchDirective(el, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.innerState = true;
        this.focused = false;
        this.size = 'normal';
        this.animate = true;
        this.innerAnimate = true;
        this.disabled = false;
        this.readonly = false;
        this.indeterminate = false;
        this.inverse = false;
        this.onColor = "primary";
        this.offColor = "default";
        this.onText = "ON";
        this.offText = "OFF";
        this.labelText = "";
        this.handleWidth = "auto";
        this.innerHandleWidth = "auto";
        this.labelWidth = "auto";
        this.baseClass = "bootstrap-switch";
        this.wrapperClass = "wrapper";
        this.outerWidth = 0;
        this.dragStart = null;
        this.dragEnd = null;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    JWBootstrapSwitchDirective.prototype.getWrapperClasses = function () {
        var output = this.baseClass + " " + this.baseClass + "-" + this.wrapperClass;
        if (this.focused) {
            output += " " + this.baseClass + "-focused";
        }
        if (this.readonly) {
            output += " " + this.baseClass + "-readonly";
        }
        if (this.size != null) {
            output += " " + this.baseClass + "-" + this.size;
        }
        if (this.innerState) {
            output += " " + this.baseClass + "-on";
        }
        else {
            output += " " + this.baseClass + "-off";
        }
        if (this.animate) {
            output += " " + this.baseClass + "-animate";
        }
        if (this.disabled) {
            output += " " + this.baseClass + "-disabled";
        }
        if (this.indeterminate) {
            output += " " + this.baseClass + "-indeterminate";
        }
        if (this.inverse) {
            output += " " + this.baseClass + "-inverse";
        }
        return output;
    };
    JWBootstrapSwitchDirective.prototype.getOnClasses = function () {
        var output = this.baseClass + "-handle-on";
        if (this.onColor) {
            output += " " + this.baseClass + "-" + this.onColor;
        }
        return output;
    };
    JWBootstrapSwitchDirective.prototype.getOffClasses = function () {
        var output = this.baseClass + "-handle-off";
        if (this.offColor) {
            output += " " + this.baseClass + "-" + this.offColor;
        }
        return output;
    };
    JWBootstrapSwitchDirective.prototype.getLabelMarginLeft = function () {
        var width = (this.inverse) ? -this.handleWidth : 0;
        if (this.dragEnd) {
            width = this.dragEnd;
        }
        else if (!this.innerState) {
            if (!this.inverse) {
                width = -this.handleWidth;
            }
            else {
                width = 0;
            }
        }
        return width + "px";
    };
    JWBootstrapSwitchDirective.prototype.ngOnInit = function () {
    };
    JWBootstrapSwitchDirective.prototype.ngOnChanges = function (changes) {
        if (this.checkChanges(changes['setLabelText']) ||
            this.checkChanges(changes['setOnText']) ||
            this.checkChanges(changes['setHandleWidth']) ||
            this.checkChanges(changes['setLabelWidth']) ||
            this.checkChanges(changes['setOffText']) ||
            this.checkChanges(changes['setSize'])) {
            this.calculateWith();
        }
    };
    JWBootstrapSwitchDirective.prototype.checkChanges = function (object) {
        return object && object.previousValue !== object.currentValue;
    };
    JWBootstrapSwitchDirective.prototype.ngAfterViewInit = function () {
        this.calculateWith();
    };
    JWBootstrapSwitchDirective.prototype.onClick = function (ev) {
        if (!this.disabled && !this.readonly && !this.dragEnd) {
            this.setStateValue(!this.innerState);
        }
        else if (this.dragEnd) {
            this.dragEnd = null;
        }
    };
    JWBootstrapSwitchDirective.prototype.onDragStart = function (e) {
        if (e.target === this.$label()) {
            if (this.dragStart || this.disabled || this.readonly) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this.dragStart = (e.pageX || e.touches[0].pageX) - parseInt(this.$container().style.marginLeft, 10);
            if (this.animate) {
                this.animate = !this.animate;
            }
        }
    };
    JWBootstrapSwitchDirective.prototype.onDragMove = function (e) {
        if (this.dragStart) {
            e.preventDefault();
            var difference = (e.pageX || e.touches[0].pageX) - this.dragStart;
            if (difference < -Number(this.handleWidth) || difference > 0) {
                return;
            }
            this.dragEnd = difference;
        }
    };
    JWBootstrapSwitchDirective.prototype.onDragEnd = function (e, removeDragEnd) {
        if (removeDragEnd === void 0) { removeDragEnd = false; }
        if (this.dragStart) {
            e.preventDefault();
            e.stopPropagation();
            if (this.dragEnd) {
                var state = this.dragEnd > -(Number(this.handleWidth) / 2);
                this.setStateValue((this.inverse) ? !state : state);
            }
            this.dragStart = null;
            if (removeDragEnd) {
                this.dragEnd = null;
            }
            if (this.innerAnimate) {
                this.animate = true;
            }
        }
    };
    JWBootstrapSwitchDirective.prototype.onTouchStart = function (e) {
        this.onDragStart(e);
    };
    JWBootstrapSwitchDirective.prototype.onMouseDown = function (e) {
        this.onDragStart(e);
    };
    JWBootstrapSwitchDirective.prototype.onTouchMove = function (e) {
        this.onDragMove(e);
    };
    JWBootstrapSwitchDirective.prototype.onMouseMove = function (e) {
        this.onDragMove(e);
    };
    JWBootstrapSwitchDirective.prototype.onMouseUp = function (e) {
        this.onDragEnd(e);
    };
    JWBootstrapSwitchDirective.prototype.onTouchEnd = function (e) {
        this.onDragEnd(e, true);
    };
    JWBootstrapSwitchDirective.prototype.onMouseLeave = function (e) {
        this.onDragEnd(e, true);
    };
    JWBootstrapSwitchDirective.prototype.getNativeElement = function () {
        return this.el.nativeElement;
    };
    JWBootstrapSwitchDirective.prototype.$on = function () {
        return this.getNativeElement().querySelector("span:first-child");
    };
    JWBootstrapSwitchDirective.prototype.$off = function () {
        return this.getNativeElement().querySelector("span:nth-child(3)");
    };
    JWBootstrapSwitchDirective.prototype.$label = function () {
        return this.getNativeElement().querySelector('span:nth-child(2)');
    };
    JWBootstrapSwitchDirective.prototype.$container = function () {
        return this.getNativeElement().querySelector("." + this.baseClass + "-container");
    };
    JWBootstrapSwitchDirective.prototype.calculateWith = function () {
        var _this = this;
        var self = this;
        setTimeout(function (_) {
            self.$on().style.width = "auto";
            self.$off().style.width = "auto";
            self.$label().style.width = "auto";
            var width = (_this.innerHandleWidth === "auto") ? Math.max(self.$on().offsetWidth, self.$off().offsetWidth) : _this.innerHandleWidth;
            if (_this.labelWidth === "auto" &&
                self.$label().offsetWidth < width &&
                _this.labelWidth < width) {
                self.labelWidth = Number(width) - 13;
            }
            else if (_this.labelWidth === "auto" || _this.labelWidth > self.$label().offsetWidth) {
                self.labelWidth = self.$label().offsetWidth;
            }
            self.outerWidth = self.$label().offsetWidth;
            self.handleWidth = width;
            self.ngZone.run(function () {
                self.$label().style.width = self.labelWidth + "px";
                self.$on().style.width = self.handleWidth + "px";
                self.$off().style.width = self.handleWidth + "px";
            });
        });
    };
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOffText", {
        set: function (value) {
            if (value)
                this.offText = value;
            else
                this.offText = "OFF";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setLabelText", {
        set: function (value) {
            this.labelText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOnText", {
        set: function (value) {
            if (value)
                this.onText = value;
            else
                this.onText = "ON";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setSize", {
        set: function (value) {
            if (value)
                this.size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setAnimate", {
        set: function (value) {
            this.animate = value;
            this.innerAnimate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOnColor", {
        set: function (value) {
            if (value)
                this.onColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOffColor", {
        set: function (value) {
            if (value)
                this.offColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setDisabled", {
        set: function (value) {
            if (value)
                this.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setReadOnly", {
        set: function (value) {
            if (value)
                this.readonly = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setIndeterminate", {
        set: function (value) {
            if (value)
                this.indeterminate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setInverse", {
        set: function (value) {
            if (value)
                this.inverse = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setHandleWidth", {
        set: function (value) {
            if (value)
                this.innerHandleWidth = value;
            else
                this.innerHandleWidth = "auto";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setLabelWidth", {
        set: function (value) {
            if (value)
                this.labelWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "value", {
        get: function () {
            return this.innerState;
        },
        set: function (v) {
            this.setStateValue(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    JWBootstrapSwitchDirective.prototype.setStateValue = function (v) {
        if (v !== this.innerState) {
            this.innerState = v;
            this.onChangeCallback(v);
        }
    };
    JWBootstrapSwitchDirective.prototype.onFocus = function () {
        this.focused = true;
    };
    JWBootstrapSwitchDirective.prototype.onBlur = function () {
        this.focused = false;
        this.onTouchedCallback();
    };
    JWBootstrapSwitchDirective.prototype.writeValue = function (value) {
        if (value !== this.innerState) {
            this.innerState = value;
        }
    };
    JWBootstrapSwitchDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    JWBootstrapSwitchDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return JWBootstrapSwitchDirective;
}());
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onClick", null);
__decorate([
    core_1.HostListener('touchstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onTouchStart", null);
__decorate([
    core_1.HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onMouseDown", null);
__decorate([
    core_1.HostListener('touchmove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onTouchMove", null);
__decorate([
    core_1.HostListener('mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onMouseMove", null);
__decorate([
    core_1.HostListener('mouseup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onMouseUp", null);
__decorate([
    core_1.HostListener('touchend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onTouchEnd", null);
__decorate([
    core_1.HostListener('mouseleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], JWBootstrapSwitchDirective.prototype, "onMouseLeave", null);
__decorate([
    core_1.Input('switch-off-text'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setOffText", null);
__decorate([
    core_1.Input('switch-label-text'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setLabelText", null);
__decorate([
    core_1.Input('switch-on-text'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setOnText", null);
__decorate([
    core_1.Input('switch-size'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setSize", null);
__decorate([
    core_1.Input('switch-animate'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], JWBootstrapSwitchDirective.prototype, "setAnimate", null);
__decorate([
    core_1.Input('switch-on-color'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setOnColor", null);
__decorate([
    core_1.Input('switch-off-color'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setOffColor", null);
__decorate([
    core_1.Input('switch-disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], JWBootstrapSwitchDirective.prototype, "setDisabled", null);
__decorate([
    core_1.Input('switch-readonly'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], JWBootstrapSwitchDirective.prototype, "setReadOnly", null);
__decorate([
    core_1.Input('switch-indeterminate'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], JWBootstrapSwitchDirective.prototype, "setIndeterminate", null);
__decorate([
    core_1.Input('switch-inverse'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], JWBootstrapSwitchDirective.prototype, "setInverse", null);
__decorate([
    core_1.Input('switch-handle-width'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], JWBootstrapSwitchDirective.prototype, "setHandleWidth", null);
__decorate([
    core_1.Input('switch-label-width'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], JWBootstrapSwitchDirective.prototype, "setLabelWidth", null);
JWBootstrapSwitchDirective = __decorate([
    core_1.Component({
        selector: 'bSwitch',
        outputs: ['value'],
        template: "<div class=\"{{ getWrapperClasses() }}\" [style.width]=\" (handleWidth  + (labelWidth + 9) ) +'px'\"  >\n                    <div class=\"{{ baseClass }}-container \"\n                        [style.width]=\" ((handleWidth * 2) + labelWidth + 9) +'px'\"\n                        [style.margin-left]=\"getLabelMarginLeft()\">\n                        <span class=\"{{ (inverse) ? getOffClasses() : getOnClasses() }}\" >{{ (inverse) ? offText : onText }}</span>\n                        <span class=\"{{ baseClass }}-label\">&nbsp;{{ labelText }}</span>\n                        <span class=\"{{ (inverse) ? getOnClasses() : getOffClasses() }}\" >{{ (inverse) ? onText : offText }}</span>\n                        <input type=\"checkbox\" [(ngModel)]=\"value\" [disabled]=\"disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" >\n                    </div>\n                </div>",
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], JWBootstrapSwitchDirective);
exports.JWBootstrapSwitchDirective = JWBootstrapSwitchDirective;
//# sourceMappingURL=directive.js.map