import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadService{
    public url: string;

    constructor(private http: HttpClient){
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){

        const formData: any = new FormData();
        for (let i = 0; i < files.length; i++){
            formData.append(name, files[i], files[i].name);
        }
        return this.http.post(url, formData, {headers: {Authorization: token}}).toPromise();
        /* return new Promise( function(resolve, reject){
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            // tslint:disable-next-line: only-arrow-functions
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4){
                    if (xhr.status === 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        }); */
    }
}
