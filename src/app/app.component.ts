import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public start: string;
    public finish: string;

    public constructor() {
        this.start = "42.348752,-71.085635";
        this.finish = "42.353147,-71.064050";
    }

    public ngOnInit() { }

}