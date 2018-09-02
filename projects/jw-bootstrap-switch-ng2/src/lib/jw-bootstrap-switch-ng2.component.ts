import {
    Component,
    ElementRef,
    Input,
    Output,
    HostListener,
    AfterViewInit,
    forwardRef,
    SimpleChanges,
    EventEmitter,
    ViewChild,
    OnChanges,
    Renderer2,
    ChangeDetectorRef
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

const callback = () => {
};

const CUSTOM_INPUT: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JwBootstrapSwitchNg2Component),
    multi: true
};

@Component({
    selector: 'bSwitch',
    providers: [CUSTOM_INPUT],
    template: `
      <div [ngClass]="getWrapperClasses()" [style.width]="(handleWidth  + labelWidth ) +'px'">
          <div #container [ngClass]="baseClass + '-container'"
               [style.width]="((handleWidth * 2) + labelWidth) +'px'"
               [style.margin-left]="getLabelMarginLeft()"><!--
              --><span #on [innerHTML]="(inverse) ? offText : onText"
                [ngClass]="(inverse) ? getOffClasses() : getOnClasses()"></span><!--
              --><span #label [ngClass]="baseClass + '-label'">&nbsp;{{ labelText }}</span><!--
              --><span #off [innerHTML]="(inverse) ? onText : offText"
                [ngClass]="(inverse) ? getOnClasses() : getOffClasses()"></span><!--
              --><input type="checkbox" [(ngModel)]="value" [readonly]="readonly" [disabled]="disabled"
                     (focus)="onFocus()" (blur)="onBlur()">
          </div>
      </div>`
})

export class JwBootstrapSwitchNg2Component implements AfterViewInit, ControlValueAccessor, OnChanges {
    // Defining Default Options for Switch
    public handleWidth: number = 0;
    public labelWidth: number = 0;
    public labelText: string = '';
    public inverse: boolean = false;
    public baseClass: string = 'bootstrap-switch';
    public onText: string = 'ON';
    public offText: string = 'OFF';
    public disabled: boolean = false;
    public readonly: boolean = false;

    private _focused: boolean = false;
    private _size: any = 'normal';
    private _animate: boolean = true;
    private _innerAnimate: boolean = true;
    private _indeterminate: boolean = false;
    private _onColor: string = 'primary';
    private _offColor: string = 'default';
    private _wrapperClass: string = 'wrapper';
    private _innerState: boolean = false;
    private _innerHandleWidth: string | number = 'auto';
    private _innerLabelWidth: string | number = 'auto';

    private _dragStart: any = null;
    private _dragEnd: any = null;

    private _onTouchedCallback: () => void = callback;
    private _onChangeCallback: (_: any) => void = callback;

    @Output() changeState: EventEmitter<any> = new EventEmitter<any>();


    // Defining DOM Elements
    @ViewChild('container') container: ElementRef;
    @ViewChild('on') on: ElementRef;
    @ViewChild('label') label: ElementRef;
    @ViewChild('off') off: ElementRef;

    private $on(): any {
        return this.on.nativeElement;
    }

    private $off(): any {
        return this.off.nativeElement;
    }

    private $label(): any {
        return this.label.nativeElement;
    }

    private $container(): any {
        return this.container.nativeElement;
    }

    /**
     * @description:  Function to set the Classes for the Wrapper Div
     * @returns string
     */
    public getWrapperClasses() {
        let output: string = this.baseClass + ' ' + this.baseClass + '-' + this._wrapperClass;

        if (this._focused) {
            output += ' ' + this.baseClass + '-focused';
        }
        if (this.readonly) {
            output += ' ' + this.baseClass + '-readonly';
        }

        if (this._size != null) {
            output += ' ' + this.baseClass + '-' + this._size;
        }

        if (this._innerState) {
            output += ' ' + this.baseClass + '-on';
        } else {
            output += ' ' + this.baseClass + '-off';
        }

        if (this._animate) {
            output += ' ' + this.baseClass + '-animate';
        }

        if (this.disabled) {
            output += ' ' + this.baseClass + '-disabled';
        }

        if (this._indeterminate || this._innerState === null || typeof this._innerState === 'undefined') {
            output += ' ' + this.baseClass + '-indeterminate';
        }

        if (this.inverse) {
            output += ' ' + this.baseClass + '-inverse';
        }
        return output;
    }

    /**
     * @description Function to set the css classes for #on
     * @returns string
     */
    public getOnClasses(): string {
        let output: string = this.baseClass + '-handle-on';

        if (this._onColor) {
            output += ' ' + this.baseClass + '-' + this._onColor;
        }

        return output;
    }

    /**
     * @description Function to set the css classes for #off
     * @returns string
     */
    public getOffClasses(): string {
        let output: string = this.baseClass + '-handle-off';

        if (this._offColor) {
            output += ' ' + this.baseClass + '-' + this._offColor;
        }

        return output;
    }

    /**
     * @description  Function set the marging of the #label when change the state
     * @returns string
     */
    public getLabelMarginLeft(): string {
        let width = (this.inverse) ? -this.handleWidth : 0;
        if (this._indeterminate || this._innerState === null || typeof this._innerState === 'undefined') {
            width = -(this.handleWidth / 2);
        } else if (this._dragEnd) {
            width = this._dragEnd;
        } else if (!this._innerState) {
            if (!this.inverse) {
                width = -this.handleWidth;
            } else {
                width = 0;
            }
        }
        return width + 'px';
    }

    constructor(private cd: ChangeDetectorRef, private render: Renderer2) {
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
        if (!this.disabled && !this.readonly && !this._dragEnd) {
            this.setStateValue(!this._innerState);
        } else if (this._dragEnd) {
            this._dragEnd = null;
        }
    }

    @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
        if (!e.which || this.disabled || this.readonly) {
            return;
        }
        switch (e.which) {
            case 37:
                e.preventDefault();
                e.stopImmediatePropagation();
                this.setStateValue(false);
                break;
            case 39:
                e.preventDefault();
                e.stopImmediatePropagation();
                this.setStateValue(true);
                break;

        }
    }

    private onDragStart(e: any): void {
        if (e.target === this.$label()) {
            if (this._dragStart || this.disabled || this.readonly) {
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

    private onDragMove(e: any): void {
        if (this._dragStart) {
            e.preventDefault();
            const difference = (e.pageX || e.touches[0].pageX) - this._dragStart;
            if (difference < -Number(this.handleWidth) || difference > 0) {
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
                const state = this._dragEnd > -(Number(this.handleWidth) / 2);
                this.setStateValue((this.inverse) ? !state : state);
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
    private calculateWith(disableAnimation: boolean = false): void {
        if (disableAnimation && this._innerAnimate) {
            this._animate = false;
        }
        setTimeout(() => {
            this.render.setStyle(this.$on(), 'width', 'auto');
            this.render.setStyle(this.$off(), 'width', 'auto');
            this.render.setStyle(this.$label(), 'width', 'auto');

            const width = (this._innerHandleWidth === 'auto')
                ? Math.max(this.$on().offsetWidth, this.$off().offsetWidth)
                : this._innerHandleWidth;

            if (this.$label().offsetWidth < width) {
                if (this._innerLabelWidth === 'auto') {
                    this.labelWidth = Number(width);
                } else {
                    this.labelWidth = Number(this._innerLabelWidth);
                }
            } else {
                if (this._innerLabelWidth === 'auto') {
                    this.labelWidth = this.$label().offsetWidth;
                } else {
                    this.labelWidth = Number(this._innerLabelWidth);
                }
            }

            this.handleWidth = Number(width);

            this.render.setStyle(this.$label(), 'width', this.labelWidth + 'px');
            this.render.setStyle(this.$on(), 'width', this.handleWidth + 'px');
            this.render.setStyle(this.$off(), 'width', this.handleWidth + 'px');
            setTimeout(() => {
                if (disableAnimation && this._innerAnimate) {
                    this._animate = true;
                }
            });
            this.cd.markForCheck();
        });
    }

    // Functions to set inputs and the private variables of the Switch
    @Input('switch-base-class') set setBaseClass(value: string) {
        this.baseClass = value;
    }

    @Input('switch-wrapper-class') set setWrapperClass(value: string) {
        this._wrapperClass = value;
    }

    @Input('switch-off-text') set setOffText(value: string) {
        this.offText = (value) ? value : 'OFF';
    }

    @Input('switch-label-text') set setLabelText(value: string) {
        this.labelText = value;
    }

    @Input('switch-on-text') set setOnText(value: string) {
        this.onText = (value) ? value : 'ON';
    }

    @Input('switch-size') set setSize(value: string) {
        if (value) {
            this._size = value;
        }
    }

    @Input('switch-animate') set setAnimate(value: boolean) {
        this._animate = value;
        this._innerAnimate = value;
    }

    @Input('switch-on-color') set setOnColor(value: string) {
        if (value) {
            this._onColor = value;
        }
    }

    @Input('switch-off-color') set setOffColor(value: string) {
        if (value) {
            this._offColor = value;
        }
    }

    @Input('switch-disabled') set setDisabled(value: boolean) {
        this.disabled = value;
    }

    @Input('switch-readonly') set setReadOnly(value: boolean) {
        this.readonly = value;
    }

    @Input('switch-indeterminate') set setIndeterminate(value: boolean) {
        this._indeterminate = value;
    }

    @Input('switch-inverse') set setInverse(value: boolean) {
        this.inverse = value;
    }

    @Input('switch-handle-width') set setHandleWidth(value: number | 'auto') {
        this._innerHandleWidth = (typeof (value) !== 'undefined') ? value : 'auto';
    }

    @Input('switch-label-width') set setLabelWidth(value: number | 'auto') {
        this._innerLabelWidth = (typeof (value) !== 'undefined') ? value : 'auto';
    }

    get value(): boolean {
        return this._innerState;
    }

    set value(v: boolean) {
        if (v === null || typeof v === 'undefined') {
            this._indeterminate = true;
        }
        this.setStateValue(v);
    }

    private setStateValue(v: boolean): void {
        if (v !== this._innerState) {

            this._onChangeCallback(v);

            this.changeState.emit({
                previousValue: this._innerState,
                currentValue: v
            });
            this._innerState = v;
        }
    }

    writeValue(value: boolean) {
        if (value !== this._innerState) {
            this._innerState = value;
            this.cd.markForCheck();
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

}
