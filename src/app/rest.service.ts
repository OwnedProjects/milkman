import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { EncDecService } from './encdec.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private _http: HttpClient, private vars: GlobalService, private _encdec: EncDecService, private _storage: StorageService) { }

  getData(file: string, action: string, urldata: any = null) {
    let headers_object: any = null;
    let userdet = this._encdec.decrypt(this._storage.storagetype.getItem("userkey"));
    headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': userdet[0].token
    });
    const httpoptions = {
      headers: headers_object
    };
    //const httpoptions = {};
    if (urldata) {
      return this._http.get(
        this.vars.serverpath + file + "?action=" + action + "&" + urldata, httpoptions
      );
    } else {
      return this._http.get(this.vars.serverpath + file + "?action=" + action, httpoptions);
    }
  }

  postData(file: string, action: string, dataobj: any, urldata: any = null) {
    let httpoptions: any = null;
    if (this._storage.storagetype.getItem("userkey")) {
      let headers_object: any = null;
      let userdet = this._encdec.decrypt(this._storage.storagetype.getItem("userkey"));
      headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': userdet[0].token
      });
      httpoptions = {
        headers: headers_object
      };
    }
    else {
      httpoptions = {}
    }
    if (urldata) {
      return this._http.post(
        this.vars.serverpath +
        file +
        "?action=" +
        action +
        "&urldata=" +
        urldata,
        dataobj,
        httpoptions
      );
    } else {
      return this._http.post(
        this.vars.serverpath + file + "?action=" + action,
        dataobj, httpoptions
      );
    }
  }
}
