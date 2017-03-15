import {
    Component,
    ElementRef,
    Input,
    Output,
    HostListener,
    AfterViewInit,
    forwardRef,
    SimpleChanges,
    NgZone,
    EventEmitter,
    ViewChild
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from "@angular/forms";

const callback = () => {
};

const CUSTOM_INPUT: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JWBootstrapSwitchDirective),
    multi: true
};

@Component({
    selector: 'bSwitch',
    outputs: ['value'],
    template: `<div class="{{ getWrapperClasses() }}" [style.width]=" (_handleWidth  + (_labelWidth + 9) ) +'px'"  >
                    <div #container class="{{ _baseClass }}-container "
                        [style.width]=" ((_handleWidth * 2) + _labelWidth + 9) +'px'"
                        [style.margin-left]="getLabelMarginLeft()">
                        <span #on class="{{ (inverse) ? getOffClasses() : getOnClasses() }}" >{{ (_inverse) ? _offText : _onText }}</span>
                        <span #label class="{{ _baseClass }}-label">&nbsp;{{ _labelText }}</span>
                        <span #off class="{{ (inverse) ? getOnClasses() : getOffClasses() }}" >{{ (_inverse) ? _onText : _offText }}</span>
                        <input type="checkbox" [(ngModel)]="value" [readonly]="_readonly" [disabled]="_disabled" (focus)="onFocus()" (blur)="onBlur()" >
                    </div>
                </div>`,
    providers: [CUSTOM_INPUT]
})

export class JWBootstrapSwitchDirective implements AfterViewInit, ControlValueAccessor {

    // Defining Default Options for Switch
    private _innerState: boolean = false;
    private _focused: boolean = false;
    private _size: any = 'normal';
    private _animate: boolean = true;
    private _innerAnimate: boolean = true;
    private _disabled: boolean = false;
    private _readonly: boolean = false;
    private _indeterminate: boolean = false;
    private _inverse: boolean = false;
    private _onColor: string = "primary";
    private _offColor: string = "default";
    private _onText: string = "ON";
    private _offText: string = "OFF";
    private _labelText: string = "";
    private _handleWidth: string | number = "auto";
    private _innerHandleWidth: string | number = "auto";
    private _labelWidth: string | number = "auto";
    private _innerLabelWidth: string | number = "auto";
    private _baseClass: string = "bootstrap-switch";
    private _wrapperClass: string = "wrapper";

    private _dragStart: number = null;
    private _dragEnd: any = null;

    private _onTouchedCallback: () => void = callback;
    private _onChangeCallback: (_: any) => void = callback;

    @Output() onChangeState: EventEmitter<any> = new EventEmitter<any>();


    // Defining DOM Elements
    @ViewChild("container") container:ElementRef;
    @ViewChild("on") on:ElementRef;
    @ViewChild("label") label:ElementRef;
    @ViewChild("off") off:ElementRef;

    private $on(): any {
        return this.on.nativeElement
    }

    private $off(): any {
        return this.off.nativeElement
    }

    private $label(): any {
        return this.label.nativeElement;
    }

    private $container(): any {
        return this.container.nativeElement;
    }

    /**
     * @description:  Function to set the Classes for the Wrapper Div
     * @returns {string}
     */
    public getWrapperClasses() {
        let output: string = this._baseClass + " " + this._baseClass + "-" + this._wrapperClass;

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
        } else {
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

        return output
    }

    /**
     * @description Function to set the css classes for #on
     * @returns {string}
     */
    public getOnClasses(): string {
        let output: string = this._baseClass + "-handle-on";

        if (this._onColor) {
            output += " " + this._baseClass + "-" + this._onColor;
        }

        return output
    }

    /**
     * @description Function to set the css classes for #off
     * @returns {string}
     */
    public getOffClasses(): string {
        let output: string = this._baseClass + "-handle-off";

        if (this._offColor) {
            output += " " + this._baseClass + "-" + this._offColor;
        }

        return output
    }

    /**
     * @description  Function set the marging of the #label when change the state
     * @returns {string}
     */
    public getLabelMarginLeft(): string {
        let width = (this._inverse) ? -this._handleWidth : 0;
        if (this._indeterminate || this._innerState === null || typeof this._innerState === "undefined") {
            width = -(Number(this._handleWidth) / 2);
        } else if (this._dragEnd) {
            width = this._dragEnd;
        } else if (!this._innerState) {
            if (!this._inverse) {
                width = -this._handleWidth;
            } else {
                width = 0;
            }
        }
        return width + "px";
    }

    constructor(private ngZone: NgZone) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['setLabelText'] ||
            changes['setOnText'] ||
            changes['setHandleWidth'] ||
            changes['setLabelWidth'] ||
            changes['setOffText'] ||
            changes['setSize']) {
            this.calculateWith(true);
        }
    }

    ngAfterViewInit() {
        this.calculateWith();
    }

    @HostListener('click') onClick() {
        if (!this._disabled && !this._readonly && !this._dragEnd) {
            this.setStateValue(!this._innerState);
        } else if (this._dragEnd) {
            this._dragEnd = null;
        }
    }

    private onDragStart(e): void {
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
    }

    private onDragMove(e): void {
        if (this._dragStart) {
            e.preventDefault();
            let difference = (e.pageX || e.touches[0].pageX) - this._dragStart;
            if (difference < -Number(this._handleWidth) || difference > 0) {
                return;
            }
            this._dragEnd = difference;
        }
    }

    private onDragEnd(e: Event, removeDragEnd: boolean = false) {
        if (this._dragStart) {
            e.preventDefault();
            e.stopPropagation();
            if (this._dragEnd) {
                let state = this._dragEnd > -(Number(this._handleWidth) / 2);
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
    }

    @HostListener('touchstart', ['$event']) onTouchStart(e: any) {
        this.onDragStart(e);
    }

    @HostListener('mousedown', ['$event']) onMouseDown(e: any) {
        this.onDragStart(e);
    }

    @HostListener('touchmove', ['$event']) onTouchMove(e: any) {
        this.onDragMove(e);
    }

    @HostListener('mousemove', ['$event']) onMouseMove(e: any) {
        this.onDragMove(e);
    }

    @HostListener('mouseup', ['$event']) onMouseUp(e: Event) {
        this.onDragEnd(e);
    }

    @HostListener('touchend', ['$event']) onTouchEnd(e: Event) {
        this.onDragEnd(e, true);
    }

    @HostListener('mouseleave', ['$event']) onMouseLeave(e: Event) {
        this.onDragEnd(e, true);
    }

    onFocus() {
        this._focused = true;
    }

    onBlur() {
        this._focused = false;
        this._onTouchedCallback();
    }

    /**
     * @description Function to make recalculate the size of the elements when options change
     * @param disableAnimation
     */
    private calculateWith(disableAnimation:boolean = false): void {

        let self = this;
        if(disableAnimation && this._innerAnimate) {
            this._animate = false;
        }
        setTimeout(() => {
            self.$on().style.width = "auto";
            self.$off().style.width = "auto";
            self.$label().style.width = "auto";
            let width = (self._innerHandleWidth === "auto")
                ? Math.max(self.$on().offsetWidth, self.$off().offsetWidth)
                : self._innerHandleWidth;

            if (self.$label().offsetWidth < width) {
                if (self._innerLabelWidth === "auto") {
                    self._labelWidth = Number(width) - 13;
                } else {
                    self._labelWidth = self._innerLabelWidth;
                }
            } else {
                if (self._innerLabelWidth === "auto") {
                    self._labelWidth = self.$label().offsetWidth;
                } else {
                    self._labelWidth = self._innerLabelWidth;
                }
            }

            self._handleWidth = width;

            self.ngZone.run(() => {
                self.$label().style.width = self._labelWidth + "px";
                self.$on().style.width = self._handleWidth + "px";
                self.$off().style.width = self._handleWidth + "px";
                setTimeout(()=> {
                    if(disableAnimation && this._innerAnimate) {
                        this._animate = true;
                    }
                });
            });
        });
    }

    //Functions to set inputs and the private variables of the Switch
    @Input('switch-base-class') set setBaseClass(value: string) {
        this._baseClass = value;
    }

    @Input('switch-wrapper-class') set setWrapperClass(value: string) {
        this._wrapperClass = value;
    }

    @Input('switch-off-text') set setOffText(value: string) {
        this._offText = (value) ? value : "OFF";
    }

    @Input('switch-label-text') set setLabelText(value: string) {
        this._labelText = value;
    }

    @Input('switch-on-text') set setOnText(value: string) {
        this._onText = (value) ? value : "ON";
    }

    @Input('switch-size') set setSize(value: string) {
        if (value) this._size = value;
    }

    @Input('switch-animate') set setAnimate(value: boolean) {
        this._animate = value;
        this._innerAnimate = value;
    }

    @Input('switch-on-color') set setOnColor(value: string) {
        if (value) this._onColor = value;
    }

    @Input('switch-off-color') set setOffColor(value: string) {
        if (value) this._offColor = value;
    }

    @Input('switch-disabled') set setDisabled(value: boolean) {
        this._disabled = value;
    }

    @Input('switch-readonly') set setReadOnly(value: boolean) {
        this._readonly = value;
    }

    @Input('switch-indeterminate') set setIndeterminate(value: boolean) {
        this._indeterminate = value;
    }

    @Input('switch-inverse') set setInverse(value: boolean) {
        this._inverse = value;
    }

    @Input('switch-handle-width') set setHandleWidth(value: number | "auto") {
        this._innerHandleWidth = (typeof(value) !== "undefined") ?  value : "auto";
    }

    @Input('switch-label-width') set setLabelWidth(value: number | "auto") {
        this._innerLabelWidth = (typeof(value) !== "undefined") ?  value : "auto";
    }

    get value(): boolean {
        return this._innerState;
    };

    set value(v: boolean) {
        if (v === null || typeof v === "undefined") this._indeterminate = true;
        this.setStateValue(v);
    }

    private setStateValue(v: boolean): void {
        if (v !== this._innerState) {

            this.onChangeState.emit({
                previousValue: this._innerState,
                currentValue: v
            });
            this._innerState = v;
            this._onChangeCallback(v);
        }
    }

    writeValue(value: boolean) {
        if (value !== this._innerState) {
            this._innerState = value;
        }
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

}
