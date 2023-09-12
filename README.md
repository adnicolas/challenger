# Challenger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## How to start

After running `npm i`, you can run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Approach

* A hexagonal architecture model (or ports & adaptars) has been followed with the following 3 layers:
    * Domain: it includes models and especially contract abstractions to facilite the dependency inversion (SOLID principles)
    * Application: use cases. The granularity and the horizontal code surface have been increased to facilitate the segregation of responsibilities.
    * Infrastructure: Angular Material and ngx-charts -based components and the implementations of the domain abstractions. Examples of service implementations based on RxJS and Angular signals have been included.

* In the _heroes_ folder is everything related to that domain context, while the _shared_ folder contains everything that could be used by other possible new application features or contexts if it grew, as pipes and UI components.

* All components are standalone and the OnPush change detection strategy is used in all of them to offer better performance.

* The main dependency injection is performed in the AppComponent, where the specific implementation of each service to be used is chosen.

* A Jest test (`npm run test`) and a Cypress test (`npm run cypress:run` with the application running) have been included as examples.

* After reading different documentation, the [ngx-charts](https://swimlane.github.io/ngx-charts/) library was chosen for the charts, as it offers a very useful adaptation of [D3.js](https://d3js.org/) for Angular.

### Trade-offs

* To generate a domain layer clean of dependencies I have made use of TypeScript's _unknown_ type. This puts the robustness of the system at risk, since infrastructure layer implementations are not required to use a specific type.

* To fix this problem, a solution based on JS promises could be proposed, but it would require a lot of code and I think it is preferable to be able to make use of all the power that RxJS or Angular signals have.

* The use of _unknown_ type implies that if the injection of a service implementation in the AppComponent were changed (for example changing from an RxJsService to a SignalService) TypeScript would not show any errors, having to take special care to change all references to the service (replacing the use of Observable with Signal). This is the main weak point of the challenge solution. 

* To guarantee the robustness of the system and the contracts, it would be preferable to "pollute" the domain with dependencies such as RxJS or Angular signals, or propose a more classic architecture typical of frontend projects.
