# jw-bootstrap-switch-ng2
Angular directive for Bootstrap Switch. Useful to make a checkbox more entertaining.
>**Notes:**
>Written with typescript and javascript, without JQuery.

## Installation
```
  npm install jw-bootstrap-switch-ng2 --save
```

![]('https://www.dropbox.com/s/ujuyufi3akvnu0v/preview-switch.gif?dl=0')

## Usage
Add JWBootstrapSwitchModule to your list of modules imports:

```javascript
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';

@NgModule({
  imports: [BrowserModule, JWBootstrapSwitchModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}
```

Configuration for `systemjs.config.js` file:
```javascript
(function (global) {
    System.config({
        paths: {
            'npm:': 'node_modules/'
        },
        map: {
            ...,
            'jw-bootstrap-switch-ng2': 'npm:jw-bootstrap-switch-ng2'
        },
        packages: {
            ...,
            'jw-bootstrap-switch-ng2': {
                main: './dist/index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
```

You can then use the directive in your templates:
```javascript
@Component({
  selector: 'app',
  template: `
  <bSwitch
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
          [switch-handle-width]="handleWidth">
  </bSwitch>
  `
})
export class AppComponent {}
```

## Available Attributes

| Attribute | Description | Type | Arguments |
|-----------|:-----------|:-------:|:--------:|
|`switch-label-width`| Define the width of the `label`. | number | |
|`switch-label-text`| Define the text of the `label`| string ||
|`switch-on-text` | Define the text when the `ngModel` is true |string| |
|`switch-off-text`| Define the text when the `ngModel` is false | string ||
|`switch-on-color`| Define the class to give style to the `ngModel` equals to `ON` or `true` | string | `primary,info,success,warning,default`|
|`switch-off-color`| Define the class to give style to the `ngModel` equals to `OFF` or `false` | string | `primary,info,success,warning,default`|
| `switch-size` | Define the size of the switch | string | `mini,small,normal,large`|
| `switch-disabled`, `switch-readonly` | Define if the switch is disabled | boolean ||
| `switch-animate` | Define if the switch is going to have animation | boolean ||
| `switch-inverse` | Define the position of the `ON` and `OFF` section | boolean ||
|`switch-handle-width` | Define the width of the `ON` and `OFF` section |number||
|`ngModel` | Variable to get the switch's value |definition| -|

## Notes
For Issues, please make a example with `jsfiddle` or something like that.
