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

## Goal

We want to display Marvel superheroes on a table, and get some key values from there.

* Data is provided on a file (wikipedia_marvel_data.json)
* Mockups are also provided.
* Use https://material.angular.io/components as the ui component source 

## Tasks

* [x] Read Marvel data provided and display it on a [table](https://material.angular.io/components/table/overview)
* This table has the following features:
    * [x] I want to be able to sort values by each column
    * [x] Using the [chips component](https://material.angular.io/components/chips/examples), I want to type one or more hero names, and display on the table only those heroes
    * [x] When I click on a row, I want to display the whole heroe info on a modal
* [x] Add a button on the page that says, “create hero”.
* [x] The button will open a form on a modal or [expansion panel](https://material.angular.io/components/expansion/overview) that will allow you to create a hero and by submitting the hero will go on top of the table.
* [x] Using [D3 charts](https://d3js.org/) create a chart at the top of each column that will represent the values of the column.
    * [x] If there are only 5 diferent values or less, use a pie chart
    * [x] If there are more than 5 different values, use a bar chart
* **Bonus task 3** (Seniors have to choose this one or Task 4)
    * [ ] Add options to delete and modify current heroes. After adding, deleting, modifying heroes, data on the table must be persistent (They will
be on the table after refresh)
* **Bonus task 4** (Seniors have to choose this one or Task 4)
    * [x] On scroll (up/down) the header with the charts will be fix and not moving with the scroll
    * [x] We are loading a big amount of data, creating a lazy scroll or pagination to avoid rendering so many items.

## Key points

* Has the candidate separated the app into components(pie chart, bar chart, modal, table)?
* Has the candidate created a service, custom pipes, interfaces, enums…?
* How does the candidate communicate data between components?
* Was the candidate able to use the data file instead of a pure API?
* Was the candidate able to use the components of a ui lib to create the app?
* Was the candidate able to use D3 to create the charts?
