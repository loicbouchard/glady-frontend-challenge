import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CalculatorComponentValue } from './calculator/combination';

import en from '../assets/i18n/en.json';
import fr from '../assets/i18n/fr.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  shopId = 5;
  purchaseWishesForm!: FormGroup;
  title = 'glady frontend challenge';

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setTranslation('en', en);
    this.translate.setTranslation('fr', fr);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.purchaseWishesForm = this.formBuilder.group({
      calculatorComponentValue: {
        value: 20,
        cards: [20],
      },
    });

    this.purchaseWishesForm.valueChanges.subscribe(console.log);
  }

  onCalculatorComponentChanged(ccv: CalculatorComponentValue) {
    console.log('onCalculatorComponentChanged', ccv);
  }
}
