(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/Calculations.js":
/*!*****************************!*\
  !*** ./src/Calculations.js ***!
  \*****************************/
/*! exports provided: fast, scenic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fast", function() { return fast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scenic", function() { return scenic; });
function fast(data) {
    var lineString = new H.geo.LineString();
    data.shape.forEach(function (point) {
        var parts = point.split(",");
        lineString.pushLatLngAlt(parts[0], parts[1]);
    });
    var routeLine = new H.map.Polyline(lineString, {
        style: { strokeColor: "blue", lineWidth: 5 }
    });
    var startMarker = new H.map.Marker({
        lat: this.start.split(",")[0],
        lng: this.start.split(",")[1]
    });
    var finishMarker = new H.map.Marker({
        lat: this.finish.split(",")[0],
        lng: this.finish.split(",")[1]
    });
    this.map.addObjects([routeLine, startMarker, finishMarker]);
    this.map.setViewBounds(routeLine.getBounds());
}
function scenic(data) {
    var _this = this;
    console.log('in scenic');
    var interests = [];
    var _loop_1 = function (i) {
        //let at every 2 maneuver
        if (interests.length < i / 2) {
            var pos = this_1.directions[i].position;
            var coord = pos.latitude + "," + pos.longitude;
            // Define search parameters:
            var params = {
                // Look for places matching the category "eat and drink":
                'cat': 'sights-museums',
                // Search in the Chinatown district in San Francisco:
                'in': coord + ';r=500'
            };
            // Run a search request with parameters, headers (empty), and callback functions:
            this_1.explore.request(params, {}, onResult, onError);
            var addMarkerToMap_1 = function (coordinates) {
                var svgMarkup = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
                    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" /><text x="12" y="18" font-size="12pt" ' +
                    'font-family="Arial" font-weight="bold" text-anchor="middle" fill="white">W</text></svg>';
                var icon = new H.map.Icon(svgMarkup), marker = new H.map.Marker(coordinates, { icon: icon });
                _this.map.addObject(marker);
            };
            // Define a callback function to handle data on success:
            function onResult(data) {
                var point = data.results.items[0];
                console.log('scenic data', point);
                addMarkerToMap_1(point.position[0] + "," + point.position[1]);
            }
            // Define a callback function to handle errors:
            function onError(data) {
                console.log(data);
            }
            // Run a search request with parameters, headers (empty), and callback functions:
            this_1.explore.request(params, {}, onResult, onError);
        }
    };
    var this_1 = this;
    for (var i = 0; i < this.directions.length; i++) {
        _loop_1(i);
    }
}
function safe() {
}

//# sourceMappingURL=Calculations.js.map

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding: 10px 0\">\n    <div>\n        <label style=\"display: inline-block; width: 60px; color: #000000\">Start</label>\n        <input type=\"text\" [(ngModel)]=\"start\" />\n    </div>\n    <div>\n        <label style=\"display: inline-block; width: 60px; color: #000000\">Finish</label>\n        <input type=\"text\" [(ngModel)]=\"finish\" />\n    </div>\n    <div>\n        <label style=\"display: inline-block; width: 60px; color: #000000\">Route</label>\n        <button>Fastest</button>\n        <button>Most Scenic</button>\n        <button>Safest</button>\n        <button>Quietest</button>\n        <button>Best Workout</button>\n    </div>\n</div>\n<here-map appId=\"jrB89eUN4NXEOy0muuaP\" appCode=\"aUbXbAl4-48A3fbI9-Rrjg\" [start]=\"start\" [finish]=\"finish\" width=\"60%\" height=\"530px\"></here-map>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.start = "42.348752,-71.085635";
        this.finish = "42.353147,-71.064050";
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _here_map_here_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./here-map/here-map.component */ "./src/app/here-map/here-map.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _here_map_here_map_component__WEBPACK_IMPORTED_MODULE_4__["HereMapComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/here-map/here-map.component.css":
/*!*************************************************!*\
  !*** ./src/app/here-map/here-map.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlcmUtbWFwL2hlcmUtbWFwLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/here-map/here-map.component.html":
/*!**************************************************!*\
  !*** ./src/app/here-map/here-map.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #map [style.width]=\"width\" [style.height]=\"height\" style=\"float: left\"></div>\n<ol style=\"float: left; background-color: #FFF; width: 35%; min-height: 530px; margin-left: 20px; margin-top: 0\">\n    <li *ngFor=\"let direction of directions\">\n        <p [innerHTML]=\"direction.instruction\"></p>\n    </li>\n</ol>"

/***/ }),

/***/ "./src/app/here-map/here-map.component.ts":
/*!************************************************!*\
  !*** ./src/app/here-map/here-map.component.ts ***!
  \************************************************/
/*! exports provided: HereMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HereMapComponent", function() { return HereMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Calculations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Calculations */ "./src/Calculations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HereMapComponent = /** @class */ (function () {
    function HereMapComponent() {
    }
    HereMapComponent.prototype.ngOnInit = function () {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.directions = [];
        this.router = this.platform.getRoutingService();
    };
    HereMapComponent.prototype.ngAfterViewInit = function () {
        var defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(this.mapElement.nativeElement, defaultLayers.normal.map, {
            zoom: 4,
            center: { lat: "37.0902", lng: "-95.7129" }
        });
        var mapEvents = new H.mapevents.MapEvents(this.map);
        // Add event listeners:
        this.map.addEventListener('tap', function (evt) {
            // Log 'tap' and 'mouse' events:
            console.log(evt.type, evt.currentPointer.type);
        });
        // Instantiate the default behavior, providing the mapEvents object:
        var behavior = new H.mapevents.Behavior(mapEvents);
        this.route(this.start, this.finish);
    };
    HereMapComponent.prototype.ngOnChanges = function (changes) {
        if ((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
            this.route(this.start, this.finish);
        }
    };
    HereMapComponent.prototype.route = function (start, finish) {
        var _this = this;
        var params = {
            "mode": "fastest;pedestrian",
            "waypoint0": "geo!" + this.start,
            "waypoint1": "geo!" + this.finish,
            "representation": "display"
        };
        this.map.removeObjects(this.map.getObjects());
        this.explore = new H.places.Explore(this.platform.getPlacesService());
        this.router.calculateRoute(params, function (data) {
            if (data.response) {
                _this.directions = data.response.route[0].leg[0].maneuver;
                data = data.response.route[0];
                // calculations[this.experience].call(this, data);
                _Calculations__WEBPACK_IMPORTED_MODULE_1__["scenic"].call(_this, data);
            }
        }, function (error) {
            console.error(error);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("map"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], HereMapComponent.prototype, "mapElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "appId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "appCode", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "start", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "finish", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "experience", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "width", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HereMapComponent.prototype, "height", void 0);
    HereMapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'here-map',
            template: __webpack_require__(/*! ./here-map.component.html */ "./src/app/here-map/here-map.component.html"),
            styles: [__webpack_require__(/*! ./here-map.component.css */ "./src/app/here-map/here-map.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HereMapComponent);
    return HereMapComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/josieku/Desktop/Wellesley/whack-f2018/crispy-pancake/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map