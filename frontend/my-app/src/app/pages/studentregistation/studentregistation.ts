import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Response } from '../../shared/model/response';
import { ApiResponseStatus } from '../../shared/common/common.enum';
@Component({
  selector: 'app-studentregistation',
  templateUrl: './studentregistation.html',
  styleUrls: ['./strd.css']
})
export class StudentregistationComponent implements OnInit {
  Studentregistation: any;
  public stdform: FormGroup;
  IsLoginSubmitted = false;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, public toastr: ToastrManager) { this.bindform() }
  ngOnInit() {
    this.save()

  }
  bindform() {
    this.stdform = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      DateofBirth : ['', [Validators.required]]
    })
  }

  DeleteNews(_id) {
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.delete(`http://localhost:2000/api/remove/${_id}`, { headers: headers }
    ).subscribe((res: any) => {
      if (res.ResponseStatus === ApiResponseStatus.Ok) {
        this.save()
        this.toastr.successToastr(res.message);
      } else {
        this.toastr.errorToastr(res.message);
      }

    })
  }
  onsubmit(obj: any, isValid: boolean) {
    this.IsLoginSubmitted = true;
    if (isValid) {
      let headers: any = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.httpClient.post("http://localhost:2000/api/add", obj, { headers: headers }
      ).subscribe((res: Response) => {
        if (res.ResponseStatus === ApiResponseStatus.Ok) {
          this.save()
          this.toastr.successToastr(res.message);
        } else {
          this.toastr.errorToastr(res.message);
        }

      })
    } else {
      this.toastr.warningToastr("Enter Valid Data");
    }
  }



  save() {
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get("http://localhost:2000/api/getdata", { headers: headers }
    ).subscribe((res: Response) => {
      this.Studentregistation = res

    })
  }
}