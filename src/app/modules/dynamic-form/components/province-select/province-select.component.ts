import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'province-select',
  templateUrl: './province-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProvinceSelectComponent),
      multi: true,
    },
  ],
})
export class ProvinceSelectComponent
  implements ControlValueAccessor, Validator
{
  private provinceData: {
    id: number;
    name: string;
    type: 'central' | 'province';
  };
  onChange: (provinceData: any) => void;
  onTouched: () => void;
  isDisabled: boolean;
  @Input('type') type: 'central' | 'province';
  @Input()provincesList: { id: number; name: string; type: 'central' | 'province' }[];

  isSelect(provinceId: number): boolean {
    return !this.provinceData ? false : provinceId === this.provinceData.id;
  }

  writeValue(obj: any) {
    this.provinceData = obj;
  }

  registerOnChange(fn: (provinceData: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleOnProvinceChange(e: any) {
    const provinceId = parseInt(e.target.value);
    const provinceSelect = this.provincesList.find(
      (province) => province.id === provinceId
    );
    this.writeValue(provinceSelect);
    this.onChange(provinceSelect);
  }

  validate(c: FormControl) {
    if (!this.type || !this.provinceData) {
      return null;
    }
    return this.provinceData.type === this.type
      ? null
      : {
          type: {
            valid: false,
            actual: c.value,
          },
        };
  }
}
