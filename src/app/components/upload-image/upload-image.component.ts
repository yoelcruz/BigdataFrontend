import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'upload-image',
    templateUrl: './upload-image.component.html',
    providers: [UserService, UploadService]
})

export class UploadImageComponent implements OnInit{

    public url: string;
    public title: string;
    public user: User;
    public identity: any;
    public token: any;
    public status: string;
    public filesToUpload: Array<File>;

    constructor(
        private userService: UserService,
        private uploadService: UploadService
    ){
        this.title = 'Subir imagen';
        this.user = this.userService.getIdentity();
        this.identity = this.user;
        this.token = this.userService.getToken();
        this.url = GLOBAL.url;
    }


    ngOnInit(): void {
        console.log('this.user', this.user);
        console.log('user-edit.component se ha cargado!!');
    }

    onSubmit(){

        // SUBIR IMAGEN DE USUARIO
        // tslint:disable-next-line: max-line-length
        this.uploadService.makeFileRequest(this.url + 'user/' + this.user._id + '/pushImage', [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
                this.user.image = result.user.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
            });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = (fileInput.target.files as Array<File>);
        console.log(this.filesToUpload);
    }
}
