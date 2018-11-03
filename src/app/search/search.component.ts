import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild("input")
  public inputElement: ElementRef;

  @Input()
  public random: any;

  public constructor() { }

  public ngOnInit() {}

  public ngAfterViewInit() {
    
  }

}
