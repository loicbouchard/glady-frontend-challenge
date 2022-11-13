import { CardChoiceComponent } from './card-choice/card-choice.component';
import { CalculatorService } from './calculator.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Combination, CalculatorComponentValue } from './combination';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CalculatorComponent,
      multi: true,
    },
  ],
})
export class CalculatorComponent implements OnInit, ControlValueAccessor {
  @Input()
  shopId: number = 5;

  @Output()
  calculatorValue = new EventEmitter<CalculatorComponentValue>();

  calculatorForm!: FormGroup;
  validCards: number[] = [];

  isPrevActionAllowed$ = this.calculatorService.isPrevActionAllowed;
  isNextActionAllowed$ = this.calculatorService.isNextActionAllowed;

  constructor(
    private calculatorService: CalculatorService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  writeValue(value: CalculatorComponentValue | undefined): void {
    if (value) this.updateValidCards(value);
  }

  onChanged = (_: any) => {};
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  onTouched = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.calculatorForm.disable() : this.calculatorForm.enable();
  }

  onBlur(): void {
    this.onTouched();
  }

  onSubmit(): void {
    const formValue = this.calculatorForm.value;
    let amount = formValue.wishAmount;

    if (typeof amount !== 'number') {
      this.calculatorForm.setErrors({ amountNotInteger: true });
      return;
    }

    amount = Math.trunc(amount);
    this.getCombination(amount);
  }

  prevCard(): void {
    this.calculatorService
      .getPrevCombination(this.shopId)
      .subscribe(this.cardManagment);
  }

  nextCard(): void {
    this.calculatorService
      .getNextCombination(this.shopId)
      .subscribe(this.cardManagment);
  }

  private initForm(): void {
    this.calculatorForm = this.formBuilder.group({
      wishAmount: ['', Validators.required],
    });
  }

  private cardManagment = (combination: Combination): void => {
    if (combination.equal) {
      this.updateValidCards(combination.equal);
    } else {
      this.dialog
        .open(CardChoiceComponent, {
          data: combination,
        })
        .afterClosed()
        .subscribe(this.cardChoiceClosedManagment);
    }
  };

  private cardChoiceClosedManagment = (
    userChoice: CalculatorComponentValue
  ): void => {
    if (!userChoice) {
      this.calculatorService.disablePrevAndNextAction();
      this.updateValidCards(userChoice);
      this.calculatorForm.setErrors({ invalidAmount: true });
    } else {
      this.getCombination(userChoice.value);
    }
  };

  private updateValidCards = (ccv: CalculatorComponentValue): void => {
    this.calculatorForm.get('wishAmount')?.setValue(ccv?.value);
    this.validCards = ccv?.cards;
    this.onChanged(ccv);
    this.calculatorValue.emit(ccv);
  };

  private getCombination(amount: number): void {
    this.calculatorService
      .getCombination(this.shopId, amount)
      .subscribe(this.cardManagment);
  }
}
