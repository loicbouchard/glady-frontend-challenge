# GladyFrontChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Start project

**I also made changes on the server side, please run my version to avoid problems.**

- npm install
- npm start

Navigate to `http://localhost:4200/`

## Informations

Library used for development :

- Angular material UI component
- ngx-translate

You can find the translations in the folder :
assets/i18n

The components used for the projects are defined in the file :
material.module.ts

## Step 1

Creation of the calculator component.
Added shopId input to set the id dynamically.
Added calculatorValue output, created onCalculatorComponentChanged method in app.component to see value changes.
Creation of the calculator service to communicate with the API.

If the amount is not exact, a modal appears to choose a correct value.
It's possible to not enter a value, the component will become invalid.

Added errors if the component is not valid.

**_<mat-error translate \*ngIf="calculatorForm.hasError('invalidAmount')">incorrectAmount</mat-error>_**

Possible errors : amountNotInteger, invalidAmount, required

The amount is truncated on validation, this prevents values ​​with commas.

**_amount = Math.trunc(amount);_**

**_example 30,1 -> 30 ; 30,9 -> 30_**

The possible cards are displayed in a mat-list-item according to the values ​​of the table **_validCards: number[] = [];_**.

Added tree interceptors :

- api-prefix, add http://localhost:3000/ for each query
- jwt-handler, add authorization header -> tokenTest123
- error-handler, api error display

## Step 2

Creation of two buttons to navigate between values.
I changed the server to always return lower and upper values.
This allows me to add BehaviorSubject in the service to disable buttons if there is no more possible value.

**_private \_isPrevActionAllowed: BehaviorSubject<boolean>;_**

**_[disabled]="calculatorForm.invalid || !(isPrevActionAllowed$ | async)"_**

## Step 3

Added ControlValueAccessor with useful methods.
Creating a form in app.component.

## Step 4 BONUS

Added dynamic translations.
They are defined in app.component.

It's not the best way to do it but it's ok for the example.

It's possible to import **_.json_** thanks to the typings.d.ts file through the command **_declare module '\*.json';_**.
