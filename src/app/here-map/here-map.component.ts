import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';
import * as calculations from '../../Calculations';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit, OnChanges {

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public start: any;

    @Input()
    public finish: any;

    @Input()
    public experience: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    public directions: any;

    private platform: any;
    private map: any;
    private router: any;
    private explore: any;

    public constructor() { }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.directions = [];
        this.router = this.platform.getRoutingService();
    }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 4,
                center: { lat: "37.0902", lng: "-95.7129" }
            }
        );

        var mapEvents = new H.mapevents.MapEvents(this.map);
        // Add event listeners:
        this.map.addEventListener('tap', function(evt) {
         // Log 'tap' and 'mouse' events:
         console.log(evt.type, evt.currentPointer.type);
        });
        // Instantiate the default behavior, providing the mapEvents object:
        var behavior = new H.mapevents.Behavior(mapEvents);

        this.route(this.start, this.finish);
    }

    public ngOnChanges(changes: SimpleChanges) {
        if((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
            this.route(this.start, this.finish);
        }
     }

    public route(start: any, finish: any) {
        let params = {
            "mode": "fastest;pedestrian",
            "waypoint0": "geo!" + this.start,
            "waypoint1": "geo!" + this.finish,
            "representation": "display"
        }
        this.map.removeObjects(this.map.getObjects());
        this.explore = new H.places.Explore(this.platform.getPlacesService());
        this.router.calculateRoute(params, data => {
            if(data.response) {
                this.directions = data.response.route[0].leg[0].maneuver;
                data = data.response.route[0];
                // calculations[this.experience].call(this, data);
                calculations.scenic.call(this, data);
            }
        }, error => {
            console.error(error);
        });
    }

}