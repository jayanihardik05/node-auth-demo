import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ToastrManager } from 'ng6-toastr-notifications';
import { Response } from '../../shared/model/response';
import { ApiResponseStatus } from '../../shared/common/common.enum';
declare var $: any
@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.css']
})
export class RegistationComponent implements OnInit {
  public regform: FormGroup;
  IsLoginSubmitted = false;
  constructor(private fb: FormBuilder, public toastr: ToastrManager, private httpClient: HttpClient) {
    this.BindForm();
  }
  ngOnInit() {
    $('.wrapper').remove();
  }
  BindForm() {
    this.regform = this.fb.group({
      Name: ['', [Validators.required]],
      PhoneNo: ['', [Validators.required]],
      Pincode: ['', [Validators.required]],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', [Validators.required]],
      confimPassword: ['', [Validators.required]],
    })
  }

  onsubmit(obj: any, isValid: boolean) {
    this.IsLoginSubmitted = true;
    if (isValid) {
      let headers: any = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.httpClient.post("http://localhost:2000/login/signin", obj, { headers: headers }
      ).subscribe((res: Response) => {
        if (res.ResponseStatus === ApiResponseStatus.Ok) {
          this.toastr.successToastr(res.message);
          window.location.href = '/login'
        } else {
          this.toastr.errorToastr(res.message);
        }
      })
    } else {
      this.toastr.warningToastr("Enter Valid Data");
    }
  }
}
