import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public identity: any;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ){
    this.title = 'Big data';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this.userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.router.navigate(['/']);
  }
}
