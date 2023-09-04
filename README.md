# Challenger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

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

## Posibles mejoras

* [ ] Añadir algún test unitario con Jest
* [ ] Añadir algún test unitario con Cypress

## A tener en cuenta

* No es arquitectura hexagonal (ports & adapters) pura ya que los contratos de los servicios en la capa dominio tienen RxJs por dependencia (Observables). It should be possible to use JS promises instead of RxJs observables, but we would have to write a lot of boilerplate code in our classes.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
