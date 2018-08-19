# jw-bootstrap-switch-ng2
[![npm (scoped)](https://img.shields.io/npm/v/jw-bootstrap-switch-ng2.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/jw-bootstrap-switch-ng2.svg?style=flat-square)]()

[![NPM](https://nodei.co/npm/jw-bootstrap-switch-ng2.png?compact=true)](https://www.npmjs.com/package/jw-bootstrap-switch-ng2)

Angular directive for Bootstrap Switch. Useful to make a checkbox more entertaining. See the [Demo](https://juliowar.github.io/jw-bootstrap-switch-ng2)
>**Notes:**
>Written with typescript, without JQuery.


![preview bootstrap switch](https://www.dropbox.com/s/ujuyufi3akvnu0v/preview-switch.gif?raw=1)

## Support
| NPM Version | Angular |
|-----------|:-----------|
| ^2.0.0 | Angular 6+|
| 1.0.10 | Angular 5 |
| 1.0.0  | Angular 2-4 |

## Installation
```
  npm install jw-bootstrap-switch-ng2 --save
```

## Breaking Changes

#### Version ^2.0.0
- Now in order to capture the event when the switch change, now you need to use the event **`changeState`**
- Rename the module from `JWBootstrapSwitchModule` to `JwBootstrapSwitchNg2Module`


## Usage
Import the css file:

CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/3.3.2/css/bootstrap3/bootstrap-switch.css">
```
Or download from the official page [here](http://bootstrapswitch.com/)


Add JwBootstrapSwitchNg2Module to your list of modules imports:

```javascript
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

@NgModule({
  imports: [BrowserModule, JwBootstrapSwitchNg2Module],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}
```

You can then use the directive in your templates:
```javascript
@Component({
  selector: 'app',
  template: `
  <bSwitch
          [switch-base-class]="baseClass"
          [switch-wrapper-class]="wrapperClass"
          [switch-label-width]="labelWidth"
          [switch-label-text]="labelText"
          [switch-off-text]="offText"
          [switch-on-text]="onText"
          [switch-on-color]="color"
          [switch-off-color]="offColor"
          [switch-size]="size"
          [switch-disabled]="disabled"
          [switch-readonly]="readonly"
          [switch-animate]="animate"
          [(ngModel)]="state"
          [switch-inverse]="inverse"
          [switch-handle-width]="handleWidth"
          [switch-base-class]="'bootstrap-switch'"
          (onChangeState)="onChange($event)">
  </bSwitch>
  `
})
export class AppComponent {}
```

## Available Attributes

| Attribute | Description | Type | Arguments |
|-----------|:-----------|:-------:|:--------:|
|`switch-base-class`| Global class prefix. | string | |
|`switch-wrapper-class`| Container element class(es). | string | |
|`switch-label-width`| Define the width of the `label`. | number or string 'auto' | |
|`switch-label-text`| Define the text of the `label`| string ||
|`switch-on-text` | Define the text when the `ngModel` is true |string| |
|`switch-off-text`| Define the text when the `ngModel` is false | string ||
|`switch-on-color`| Define the class to give style to the `ngModel` equals to `ON` or `true` | string | `primary,info,success,warning,danger,default`|
|`switch-off-color`| Define the class to give style to the `ngModel` equals to `OFF` or `false` | string | `primary,info,success,warning,danger,default`|
|`switch-size` | Define the size of the switch | string | `mini,small,normal,large`|
|`switch-disabled` | Define if the switch is disabled | boolean ||
|`switch-readonly` | Define if the switch is readonly | boolean ||
|`switch-animate` | Define if the switch is going to have animation | boolean ||
|`switch-inverse` | Define the position of the `ON` and `OFF` section | boolean ||
|`switch-handle-width` | Define the width of the `ON` and `OFF` section |number or string 'auto'||
|`ngModel` | Variable to get the switch's value |definition| -|

## Events

| Attribute | Description | Return |
|-----------|:-----------|:-------|
|`changeState` | Event fired when change `ngModel` attribute | Object with the previous and current value: ` {previousValue: false, currentValue: true}` |

## Notes
For Issues, please make a example with `jsfiddle` or something like that.

## LICENSE

MIT License

Copyright (c) 2016 Julio Guerra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
