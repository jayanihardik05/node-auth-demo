import {Injectable} from '@angular/core'
@Injectable()
export class AuthService  {
loggedin(){
    return localStorage.getItem('token')
    
}
getToken() {
    return  localStorage.getItem('token')
}
}