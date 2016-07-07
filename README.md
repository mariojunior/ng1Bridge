# Ng1Bridge

**Ng1Bridge** is a simple TypeScript class that provides access to Angular1 Injector Provider to your Angular 2 Application. This approach should be used only on specific cases where you want (for many 'dubious' reasons) load an entire Angular 2 Application inside another Angular 1.x application.

In these cases, it's common you need share Services/Scopes (becareful) between the Angular 1 and Angular 2 modules, then, **Ng1Bridge does this dirty job** for you.

Once every services/factories/values/constants in Angular 1 will be placed into the same Injector Provider (if you are using an unique angular1 instance and bootstraping once), Ng1Bridge will retrieve the injector via body element of the page, and will provide a clean access to retrieve any angular 1 services/factories/values/constant inside the Angular 2 scope/context. 

All you need is "inject" the Ng1Bridge into your Angular 2 TypeScript Component/Class like this:

```typescript
import { AngularStuffs... you know} from 'you know from where';
import { Ng1Bridge } from './ng1Bridge.ts'; //considering the files are in the same path.

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
```

This POC was possible after I've read the initial answer of **@micronyks** (https://github.com/micronyks) about ['how to embed an Angular 2 app inside an Angular 1 app'](http://stackoverflow.com/questions/34802717/how-to-embed-a-self-contained-angular-2-application-inside-of-an-angular-1-appli) and reading the Angular 2 documentation about how to interact with outside DOM elements of the Angular 2 context.

**Use by your own risk.** :)