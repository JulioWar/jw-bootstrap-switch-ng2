import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: '../test/pages/index.html',
})
export class AppComponent{
    public offText = "Off Text";
    public size = "normal";
    public animated  = false;
    inverse = true;
    value = true;
    labelText:string ="";
    offColorValue = false;
    offTextValue = false;

    getAlert(value:any) {
        alert(value);
    }

    onChange(event) {
        console.log(event);
    }
}
