import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { ObservedValueOf } from 'rxjs';

@Injectable()
export class UserService{
	public url: string;
	public identity: any;
	public token: string;
	public stats: any;
	public user: any;

	constructor(public http: HttpClient){
		this.url = GLOBAL.url;
	}

	getIdentity(){
		const identity = JSON.parse(localStorage.getItem('identity'));

		if (identity !== 'undefined'){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		const token = localStorage.getItem('token');

		if (token !== 'undefined'){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	getStats(){
		const stats = JSON.parse(localStorage.getItem('stats'));

		if (stats !== 'undefined'){
			this.stats = stats;
		}else{
			this.stats = null;
		}
		
		return this.stats;
	}

	

	updateUser(user: User): Observable<any>{
		const params = JSON.stringify(user);
		const headers = new HttpHeaders().set('Content-Type', 'application/json')
									     .set('Authorization', this.getToken());

		return this.http.put(this.url + 'update-user/' + user._id, params, { headers });
	}

	getUsers(page = null): Observable<any>{
		const headers = new HttpHeaders().set('Content-Type', 'application/json')
									     .set('Authorization', this.getToken());

		return this.http.get(this.url + 'users/' + page, { headers});
	}

	getUser(id: string): Observable<any>{
		const headers = new HttpHeaders().set('Content-Type', 'application/json')
									     .set('Authorization', this.getToken());

		return this.http.get(this.url + 'user/' + id, { headers});
	}


}
