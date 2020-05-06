import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService]
})

export class UsersComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ){
        this.title = 'Gente';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.url = GLOBAL.url;
    }
    public title: string;
    public identity: any;
    public token: string;
    public page: number;
    public nextPage: number;
    public previousPage: number;
    public status: string;
    public total: number;
    public pages: number;
    public users: User[];
    public url: string;
    public follows: string[]; /* ¿?¿?¿?¿?¿? */

    public followUserOver: any;

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit(){
        console.log('users.component ha sido cargado');
        this.actualPage();
    }

    actualPage(){
        this.route.params.subscribe(params => {
            let page = +params.page;
            this.page = page;

            if (!params.page){
                page = 1;
            }

            if (!page){
                page = 1;
            }else{
                this.nextPage = page + 1;
                this.previousPage = page - 1;

                if (this.previousPage <= 0){
                    this.previousPage = 1;
                }
            }

            /* devolver listado de usuarios */
            this.getUsers(page);
        });
    }

    getUsers(page: number){
        this.userService.getUsers(page).subscribe(
            response => {
                if (!response.users){
                    this.status = 'error';
                }else{
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    this.follows = response.users_following;

                    if (page > this.pages){
                        this.router.navigate(['/gente', 1]);
                    }
                }
            },
            error => {
                const errorMessage = error as any;
                console.log(errorMessage);

                if (errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }


}
