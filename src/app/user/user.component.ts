import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  contactForm: FormGroup

  countries = ['USA', 'Germany', 'Italy', 'France']

  requestTypes = ['Claim', 'Feedback', 'Help Request']
  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createFormGroup()
  }

  ngOnInit(): void {
  }

  get formControls() { return this.contactForm.controls; }


  createFormGroup() {
    return new FormGroup({
      personalData: new FormGroup({
        email: new FormControl(),
        mobile: new FormControl('555'),
        country: new FormControl(),
      }),
      requestType: new FormControl(),
      text: new FormControl(),
    })
  }

  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group({
        email: 'defaul@email.com',
        mobile: ['', Validators.required],
        country: ''
      }),
      requestType: '',
      text: ''
    });
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new PersonalData()),
      requestType: '',
      text: ''
    });
  }

  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);

    // Do useful stuff with the gathered data
    console.log(result);
  }


  revert() {
    // Resets to blank object
    this.contactForm.reset();

    // Resets to provided model
    this.contactForm.reset({ personalData: new PersonalData(), requestType: '', text: '' });
  }

}

export class ContactRequest {
  personalData: PersonalData
  requestType: any = ''
  text: string = ''
}

export class PersonalData {
  email: string = ''
  mobile: string = ''
  country: string = ''
}
