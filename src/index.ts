import {NgModule} from '@angular/core';
import {JWBootstrapSwitchDirective} from "./directive";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [JWBootstrapSwitchDirective],
    exports: [
        JWBootstrapSwitchDirective,
        FormsModule
    ]
})
export class JWBootstrapSwitchModule {
}
