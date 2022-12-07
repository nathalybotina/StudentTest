import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllStudents } from '../state/actions';


@Injectable({
    providedIn: 'root'
})
export class LoadStudentsGuard implements CanActivate {
    constructor(private _store: Store<any>) {

    }
    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this._store.dispatch(getAllStudents());
        return true;
    }

}
