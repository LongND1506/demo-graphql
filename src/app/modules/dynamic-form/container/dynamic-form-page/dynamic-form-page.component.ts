import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-page',
  templateUrl: './dynamic-form-page.component.html',
  styleUrls: ['./dynamic-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormPageComponent implements OnInit {
  provinceModel: { id: number; name: string; type: 'central' | 'province' };
  formGroup: FormGroup;
  formArray: FormArray;
  provinceControl = new FormControl();
  provincesList: { id: number; name: string; type: 'central' | 'province' }[] = [
    { id: 1, name: 'Hà Nội', type: 'central' },
    { id: 2, name: 'TP Hồ Chí Minh', type: 'central' },
    { id: 3, name: 'Đà Nẵng', type: 'central' },
    { id: 4, name: 'Lào Cai', type: 'province' },
    { id: 5, name: 'Yên Bái', type: 'province' },
    { id: 6, name: 'Quảng Bình', type: 'province' },
    { id: 7, name: 'Thái Nguyên', type: 'province' },
    { id: 8, name: 'Daklak', type: 'province' },
    { id: 9, name: 'Nghệ An', type: 'province' },
    { id: 10, name: 'Hà Tĩnh', type: 'province' },
  ];
  constructor(private fb: FormBuilder) {}
  arrayInfo: {name: string, age: number}[] = [];

  ngOnInit() {
    this.formGroup = this.fb.group({
      province: [null],
    });
    this.formArray = this.fb.array([]);

  }

  getControl(key: string): AbstractControl | null{
    return this.formGroup.get(key);
  }

  public addItemFormArray() {
    this.formArray.push(this.fb.group({
      name: '',
      age: ''
    }))
  }

  public removeItem(index: number) {
    this.formArray.removeAt(index)
  }

  public setFormArrayValue(): void{

    const value = [
      {
        name: "STS1",
        age: "18"
      },
      {
        name: "STS2",
        age: "19"
      },
      {
        name: "STS3",
        age: "20"
      }
    ];

    this.formArray.setValue(value)
  }

  public patchFormArrayValue():void {
    const value = [
      {
        name: "STS1",
        age: "18"
      },
      {
        name: "STS2",
        age: "19"
      },
      {
        name: "STS3",
        age: "20"
      },
      {
        name: "STS4",
        age: "20"
      },
      {
        name: "STS5",
        age: "20"
      }
    ];

    this.formArray.patchValue(value)
  }
}
