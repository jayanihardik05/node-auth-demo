import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(): boolean {
        if (localStorage.getItem('token')) {
            return true
        } else {
            window.location.href = "/login"
            return false
        }
    }
}
