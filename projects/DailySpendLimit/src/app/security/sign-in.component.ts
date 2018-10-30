import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  template: '<google-sign-in [client_id]="client_id" retUrl="dashboard" [scope]="scope"></google-sign-in>'
})
export class SignInComponent {
  client_id = environment.client_id;
  scope = environment.scope;

  constructor() { }
}