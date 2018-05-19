import { Component } from "@angular/core";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    public jsDate: Date;
    public currentTime: Observable<Date>;

    constructor() {
        this.jsDate = new Date();
        this.currentTime = timer(0, 1000).pipe(map(() => new Date()));
    }
}
