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
  formLabel: string = "insert student detail";
  studUpdateId: number = null;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, public toastr: ToastrManager) { this.bindform() }
 
  ngOnInit() {
    this.save();
  }

  bindform() {
    this.stdform = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      DateofBirth: ['', [Validators.required]]
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
      // set header
      let headers: any = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      if (this.studUpdateId == null) {
        //create new recored
        this.httpClient.post("http://localhost:2000/api/add", obj, { headers: headers }
        ).subscribe((res: Response) => {
          console.log(res);
          if (res.ResponseStatus === ApiResponseStatus.Ok) {
            this.save()
            this.toastr.successToastr(res.message);
            this.stdform.reset();
            this.IsLoginSubmitted = false;
          } else {
            this.toastr.errorToastr(res.message);
          }

        });
      }
      else {
        // update student
        let updateUrl = 'http://localhost:2000/api/update/' + this.studUpdateId;
        this.httpClient.put(updateUrl, obj, { headers: headers }
          ).subscribe(
          (res: Response) => {
            if (res.message == "Sucessfully Update record") {
              this.save();
              this.toastr.successToastr(res.message);
              this.stdform.reset();
              this.IsLoginSubmitted = false;
              this.formLabel = "insert student detail";
            } else {
              this.toastr.errorToastr(res.message);
            }
          }
        )
      }

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

  // update student
  updateStud(studData: any) {
    this.studUpdateId = studData._id;
    this.stdform.controls['name'].setValue(studData.name);
    this.stdform.controls['lastname'].setValue(studData.lastname);
    this.stdform.controls['Address'].setValue(studData.Address);
    this.stdform.controls['phoneNumber'].setValue(studData.phoneNumber);
    this.stdform.controls['DateofBirth'].setValue(studData.DateofBirth);
    this.formLabel = 'update student detail';
  }

  // reset form label
  resetLable() {
    this.formLabel = 'insert student detail';
  }
}