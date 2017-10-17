import { ElementRef, AfterViewInit, SimpleChanges, NgZone, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
export declare class JWBootstrapSwitchDirective implements AfterViewInit, ControlValueAccessor {
    private ngZone;
    handleWidth: number;
    labelWidth: number;
    labelText: string;
    inverse: boolean;
    baseClass: string;
    onText: string;
    offText: string;
    disabled: boolean;
    readonly: boolean;
    private _focused;
    private _size;
    private _animate;
    private _innerAnimate;
    private _indeterminate;
    private _onColor;
    private _offColor;
    private _wrapperClass;
    private _innerState;
    private _innerHandleWidth;
    private _innerLabelWidth;
    private _dragStart;
    private _dragEnd;
    private _onTouchedCallback;
    private _onChangeCallback;
    onChangeState: EventEmitter<any>;
    container: ElementRef;
    on: ElementRef;
    label: ElementRef;
    off: ElementRef;
    private $on();
    private $off();
    private $label();
    private $container();
    /**
     * @description:  Function to set the Classes for the Wrapper Div
     * @returns {string}
     */
    getWrapperClasses(): string;
    /**
     * @description Function to set the css classes for #on
     * @returns {string}
     */
    getOnClasses(): string;
    /**
     * @description Function to set the css classes for #off
     * @returns {string}
     */
    getOffClasses(): string;
    /**
     * @description  Function set the marging of the #label when change the state
     * @returns {string}
     */
    getLabelMarginLeft(): string;
    constructor(ngZone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onClick(): void;
    onKeyDown(e: KeyboardEvent): void;
    private onDragStart(e);
    private onDragMove(e);
    private onDragEnd(e, removeDragEnd?);
    onTouchStart(e: any): void;
    onMouseDown(e: any): void;
    onTouchMove(e: any): void;
    onMouseMove(e: any): void;
    onMouseUp(e: Event): void;
    onTouchEnd(e: Event): void;
    onMouseLeave(e: Event): void;
    onFocus(): void;
    onBlur(): void;
    /**
     * @description Function to make recalculate the size of the elements when options change
     * @param disableAnimation
     */
    private calculateWith(disableAnimation?);
    setBaseClass: string;
    setWrapperClass: string;
    setOffText: string;
    setLabelText: string;
    setOnText: string;
    setSize: string;
    setAnimate: boolean;
    setOnColor: string;
    setOffColor: string;
    setDisabled: boolean;
    setReadOnly: boolean;
    setIndeterminate: boolean;
    setInverse: boolean;
    setHandleWidth: number | "auto";
    setLabelWidth: number | "auto";
    value: boolean;
    private setStateValue(v);
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
