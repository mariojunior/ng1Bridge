import {Component,bind} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Router,ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';

import { Ng1Bridge } from './ng1Bridge.ts';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h2>
      Here, an Angular 2 with TypeScript inside Angular 1 app.
    </h2>
    <p>{{label}}</p>
    
    <router-outlet></router-outlet>
      `,
    providers:[
        Ng1Bridge
    ],
})

@RouteConfig([
  //{path:'/component-first', name: 'ComponentFirst', component: ComponentFirst}
  //{path:'/component-two', name: 'ComponentTwo', component: ComponentTwo}
])

export class AppComponent implements OnInit {
  label: string;

  constructor(router:Router, bridge:Ng1Bridge)
  {
    this.router=router;
    this.bridge=bridge;
  }
  
  ngOnInit() {
    var scp = this.bridge.globalScope; //--> ng1 $scope.myValue reference from the body scope
    this.label = 'Ng2 accessing a Ng1 variable: "' + scp.myValue + '"';

    //to retrieve an instance of any ng1 service, use:
    // ** var userService = this.bridge.getService('userService'); the argument should be the name of the service injected on the ng1's scope
    // ** userService.getLoggedUser() for example.
  }
}

//bootstraping the Angular 2 application
bootstrap(AppComponent, [ROUTER_PROVIDERS,bind(APP_BASE_HREF).toValue(location.pathname)]);