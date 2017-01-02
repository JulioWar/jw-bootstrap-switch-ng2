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
var callback = function () {
};
var CUSTOM_INPUT = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return JWBootstrapSwitchDirective; }),
    multi: true
};
var JWBootstrapSwitchDirective = (function () {
    function JWBootstrapSwitchDirective(ngZone) {
        this.ngZone = ngZone;
        // Defining Default Options for Switch
        this._innerState = false;
        this._focused = false;
        this._size = 'normal';
        this._animate = true;
        this._innerAnimate = true;
        this._disabled = false;
        this._readonly = false;
        this._indeterminate = false;
        this._inverse = false;
        this._onColor = "primary";
        this._offColor = "default";
        this._onText = "ON";
        this._offText = "OFF";
        this._labelText = "";
        this._handleWidth = "auto";
        this._innerHandleWidth = "auto";
        this._labelWidth = "auto";
        this._innerLabelWidth = "auto";
        this._baseClass = "bootstrap-switch";
        this._wrapperClass = "wrapper";
        this._dragStart = null;
        this._dragEnd = null;
        this._onTouchedCallback = callback;
        this._onChangeCallback = callback;
        this.onChangeState = new core_1.EventEmitter();
    }
    JWBootstrapSwitchDirective.prototype.$on = function () {
        return this.on.nativeElement;
    };
    JWBootstrapSwitchDirective.prototype.$off = function () {
        return this.off.nativeElement;
    };
    JWBootstrapSwitchDirective.prototype.$label = function () {
        return this.label.nativeElement;
    };
    JWBootstrapSwitchDirective.prototype.$container = function () {
        return this.container.nativeElement;
    };
    /**
     * @description:  Function to set the Classes for the Wrapper Div
     * @returns {string}
     */
    JWBootstrapSwitchDirective.prototype.getWrapperClasses = function () {
        var output = this._baseClass + " " + this._baseClass + "-" + this._wrapperClass;
        if (this._focused) {
            output += " " + this._baseClass + "-_focused";
        }
        if (this._readonly) {
            output += " " + this._baseClass + "-readonly";
        }
        if (this._size != null) {
            output += " " + this._baseClass + "-" + this._size;
        }
        if (this._innerState) {
            output += " " + this._baseClass + "-on";
        }
        else {
            output += " " + this._baseClass + "-off";
        }
        if (this._animate) {
            output += " " + this._baseClass + "-animate";
        }
        if (this._disabled) {
            output += " " + this._baseClass + "-disabled";
        }
        if (this._indeterminate || this._innerState === null || typeof this._innerState === "undefined") {
            output += " " + this._baseClass + "-indeterminate";
        }
        if (this._inverse) {
            output += " " + this._baseClass + "-inverse";
        }
        return output;
    };
    /**
     * @description Function to set the css classes for #on
     * @returns {string}
     */
    JWBootstrapSwitchDirective.prototype.getOnClasses = function () {
        var output = this._baseClass + "-handle-on";
        if (this._onColor) {
            output += " " + this._baseClass + "-" + this._onColor;
        }
        return output;
    };
    /**
     * @description Function to set the css classes for #off
     * @returns {string}
     */
    JWBootstrapSwitchDirective.prototype.getOffClasses = function () {
        var output = this._baseClass + "-handle-off";
        if (this._offColor) {
            output += " " + this._baseClass + "-" + this._offColor;
        }
        return output;
    };
    /**
     * @description  Function set the marging of the #label when change the state
     * @returns {string}
     */
    JWBootstrapSwitchDirective.prototype.getLabelMarginLeft = function () {
        var width = (this._inverse) ? -this._handleWidth : 0;
        if (this._indeterminate || this._innerState === null || typeof this._innerState === "undefined") {
            width = -(Number(this._handleWidth) / 2);
        }
        else if (this._dragEnd) {
            width = this._dragEnd;
        }
        else if (!this._innerState) {
            if (!this._inverse) {
                width = -this._handleWidth;
            }
            else {
                width = 0;
            }
        }
        return width + "px";
    };
    JWBootstrapSwitchDirective.prototype.ngOnChanges = function (changes) {
        if (changes['setLabelText'] ||
            changes['setOnText'] ||
            changes['setHandleWidth'] ||
            changes['setLabelWidth'] ||
            changes['setOffText'] ||
            changes['setSize']) {
            this.calculateWith(true);
        }
    };
    JWBootstrapSwitchDirective.prototype.ngAfterViewInit = function () {
        this.calculateWith();
    };
    JWBootstrapSwitchDirective.prototype.onClick = function () {
        if (!this._disabled && !this._readonly && !this._dragEnd) {
            this.setStateValue(!this._innerState);
        }
        else if (this._dragEnd) {
            this._dragEnd = null;
        }
    };
    JWBootstrapSwitchDirective.prototype.onDragStart = function (e) {
        if (e.target === this.$label()) {
            if (this._dragStart || this._disabled || this._readonly) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this._dragStart = (e.pageX || e.touches[0].pageX) - parseInt(this.$container().style.marginLeft, 10);
            if (this._animate) {
                this._animate = !this._animate;
            }
        }
    };
    JWBootstrapSwitchDirective.prototype.onDragMove = function (e) {
        if (this._dragStart) {
            e.preventDefault();
            var difference = (e.pageX || e.touches[0].pageX) - this._dragStart;
            if (difference < -Number(this._handleWidth) || difference > 0) {
                return;
            }
            this._dragEnd = difference;
        }
    };
    JWBootstrapSwitchDirective.prototype.onDragEnd = function (e, removeDragEnd) {
        if (removeDragEnd === void 0) { removeDragEnd = false; }
        if (this._dragStart) {
            e.preventDefault();
            e.stopPropagation();
            if (this._dragEnd) {
                var state = this._dragEnd > -(Number(this._handleWidth) / 2);
                this.setStateValue((this._inverse) ? !state : state);
            }
            this._dragStart = null;
            if (removeDragEnd) {
                this._dragEnd = null;
            }
            if (this._innerAnimate) {
                this._animate = true;
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
    JWBootstrapSwitchDirective.prototype.onFocus = function () {
        this._focused = true;
    };
    JWBootstrapSwitchDirective.prototype.onBlur = function () {
        this._focused = false;
        this._onTouchedCallback();
    };
    /**
     * @description Function to make recalculate the size of the elements when options change
     * @param disableAnimation
     */
    JWBootstrapSwitchDirective.prototype.calculateWith = function (disableAnimation) {
        var _this = this;
        if (disableAnimation === void 0) { disableAnimation = false; }
        var self = this;
        if (disableAnimation && this._innerAnimate) {
            this._animate = false;
        }
        setTimeout(function (_) {
            self.$on().style.width = "auto";
            self.$off().style.width = "auto";
            self.$label().style.width = "auto";
            var width = (self._innerHandleWidth === "auto")
                ? Math.max(self.$on().offsetWidth, self.$off().offsetWidth)
                : self._innerHandleWidth;
            if (self.$label().offsetWidth < width) {
                if (self._innerLabelWidth === "auto") {
                    self._labelWidth = Number(width) - 13;
                }
                else {
                    self._labelWidth = self._innerLabelWidth;
                }
            }
            else {
                if (self._innerLabelWidth === "auto") {
                    self._labelWidth = self.$label().offsetWidth;
                }
                else {
                    self._labelWidth = self._innerLabelWidth;
                }
            }
            self._handleWidth = width;
            self.ngZone.run(function () {
                self.$label().style.width = self._labelWidth + "px";
                self.$on().style.width = self._handleWidth + "px";
                self.$off().style.width = self._handleWidth + "px";
                setTimeout(function () {
                    if (disableAnimation && _this._innerAnimate) {
                        _this._animate = true;
                    }
                });
            });
        });
    };
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setBaseClass", {
        //Functions to set inputs and the private variables of the Switch
        set: function (value) {
            this._baseClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setWrapperClass", {
        set: function (value) {
            this._wrapperClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOffText", {
        set: function (value) {
            this._offText = (value) ? value : "OFF";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setLabelText", {
        set: function (value) {
            this._labelText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOnText", {
        set: function (value) {
            this._onText = (value) ? value : "ON";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setSize", {
        set: function (value) {
            if (value)
                this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setAnimate", {
        set: function (value) {
            this._animate = value;
            this._innerAnimate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOnColor", {
        set: function (value) {
            if (value)
                this._onColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setOffColor", {
        set: function (value) {
            if (value)
                this._offColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setDisabled", {
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setReadOnly", {
        set: function (value) {
            this._readonly = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setIndeterminate", {
        set: function (value) {
            this._indeterminate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setInverse", {
        set: function (value) {
            this._inverse = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setHandleWidth", {
        set: function (value) {
            this._innerHandleWidth = (typeof (value) !== "undefined") ? value : "auto";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "setLabelWidth", {
        set: function (value) {
            this._innerLabelWidth = (typeof (value) !== "undefined") ? value : "auto";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JWBootstrapSwitchDirective.prototype, "value", {
        get: function () {
            return this._innerState;
        },
        set: function (v) {
            if (v === null || typeof v === "undefined")
                this._indeterminate = true;
            this.setStateValue(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    JWBootstrapSwitchDirective.prototype.setStateValue = function (v) {
        if (v !== this._innerState) {
            this.onChangeState.emit({
                previousValue: this._innerState,
                currentValue: v
            });
            this._innerState = v;
            this._onChangeCallback(v);
        }
    };
    JWBootstrapSwitchDirective.prototype.writeValue = function (value) {
        if (value !== this._innerState) {
            this._innerState = value;
        }
    };
    JWBootstrapSwitchDirective.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    JWBootstrapSwitchDirective.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    return JWBootstrapSwitchDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], JWBootstrapSwitchDirective.prototype, "onChangeState", void 0);
__decorate([
    core_1.ViewChild("container"),
    __metadata("design:type", core_1.ElementRef)
], JWBootstrapSwitchDirective.prototype, "container", void 0);
__decorate([
    core_1.ViewChild("on"),
    __metadata("design:type", core_1.ElementRef)
], JWBootstrapSwitchDirective.prototype, "on", void 0);
__decorate([
    core_1.ViewChild("label"),
    __metadata("design:type", core_1.ElementRef)
], JWBootstrapSwitchDirective.prototype, "label", void 0);
__decorate([
    core_1.ViewChild("off"),
    __metadata("design:type", core_1.ElementRef)
], JWBootstrapSwitchDirective.prototype, "off", void 0);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    core_1.Input('switch-base-class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setBaseClass", null);
__decorate([
    core_1.Input('switch-wrapper-class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], JWBootstrapSwitchDirective.prototype, "setWrapperClass", null);
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
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], JWBootstrapSwitchDirective.prototype, "setHandleWidth", null);
__decorate([
    core_1.Input('switch-label-width'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], JWBootstrapSwitchDirective.prototype, "setLabelWidth", null);
JWBootstrapSwitchDirective = __decorate([
    core_1.Component({
        selector: 'bSwitch',
        outputs: ['value'],
        template: "<div class=\"{{ getWrapperClasses() }}\" [style.width]=\" (_handleWidth  + (_labelWidth + 9) ) +'px'\"  >\n                    <div #container class=\"{{ _baseClass }}-container \"\n                        [style.width]=\" ((_handleWidth * 2) + _labelWidth + 9) +'px'\"\n                        [style.margin-left]=\"getLabelMarginLeft()\">\n                        <span #on class=\"{{ (inverse) ? getOffClasses() : getOnClasses() }}\" >{{ (_inverse) ? _offText : _onText }}</span>\n                        <span #label class=\"{{ _baseClass }}-label\">&nbsp;{{ _labelText }}</span>\n                        <span #off class=\"{{ (inverse) ? getOnClasses() : getOffClasses() }}\" >{{ (_inverse) ? _onText : _offText }}</span>\n                        <input type=\"checkbox\" [(ngModel)]=\"value\" [readonly]=\"_readonly\" [disabled]=\"_disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" >\n                    </div>\n                </div>",
        providers: [CUSTOM_INPUT]
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], JWBootstrapSwitchDirective);
exports.JWBootstrapSwitchDirective = JWBootstrapSwitchDirective;
//# sourceMappingURL=directive.js.map