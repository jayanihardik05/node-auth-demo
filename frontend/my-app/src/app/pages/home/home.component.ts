import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Response } from '../../shared/model/response';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiResponseStatus } from '../../shared/common/common.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  IsLoginSubmitted = false;
  public formstatic: FormGroup;
  Userregistation: any;
  selectedFile: File = null
  constructor(private fb: FormBuilder, private httpClient: HttpClient, public toastr: ToastrManager) {
    this.BindForm();
  }
  onselected(event) {
    this.selectedFile = <File>event.target.files[0]
  }
  BindForm() {
    this.formstatic = this.fb.group({
      name: ['', [Validators.required]],
      choosefile: ['', [Validators.required]]
    })
  }
  onsubmit(obj: any, isValid: boolean) {
    this.IsLoginSubmitted = true;
    if (isValid) {
      const fb = new FormData()
      fb.append('image', this.selectedFile, this.selectedFile.name)
      fb.append('Name', obj.name)
      let headers: any = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.httpClient.post("http://localhost:2000/api/addimage", fb, { headers: headers }
      ).subscribe((res: Response) => {
        if (res.ResponseStatus === ApiResponseStatus.Ok) {
          this.toastr.successToastr(res.message);
          this.save()
          this.formstatic.reset()
        } else {
          this.toastr.errorToastr(res.message);
        }
      })
    } else {
      this.toastr.warningToastr("Enter Valid Data");
    }


  }
  ngOnInit() {
    this.save()
  }
  DeleteNews(_id) {
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.delete(`http://localhost:2000/api/removeimage/${_id}`, { headers: headers }
    ).subscribe((res: any) => {
      if (res.ResponseStatus === ApiResponseStatus.Ok) {
        this.toastr.errorToastr(res.message);
        this.save()
      } else {
        this.toastr.errorToastr(res.message);
      }
    })
  }

  save() {
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get("http://localhost:2000/api/datafound", { headers: headers }
    ).subscribe((resp: any) => {
      this.Userregistation = resp
    })
  }

}
