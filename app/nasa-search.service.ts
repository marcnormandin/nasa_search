import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class AssetsSearchParameters {
    constructor(
      public lat : number,
      public lon : number,
      public dateBegin : string,
      public dateEnd : string) {
    }
}

export class ImagerySearchParameters {
    constructor(
      public lat : number,
      public lon : number,
      public date : string,
      public fov : number,
      public cloudScore : string) {
    }
}


@Injectable()
export class NasaSearchService {
    private apiKey : string = '4dyX2EzAqWYrkjFRXXgrX4xXlxwDCOLCqOm3Dfsc';

    error : any;

    constructor(private http : Http) {
      console.log("NasaSearchService constructed.");
    }

    private buildAssetsUrl(assetsSearchParameters : AssetsSearchParameters): string {
      let main = 'https://api.nasa.gov/planetary/earth/assets?';
      let lat = 'lat=' + assetsSearchParameters.lat;
      let lon = '&lon=' + assetsSearchParameters.lon;
      let dateBegin = '&begin=' + assetsSearchParameters.dateBegin;
      let apiKey = '&api_key=' + this.apiKey;
      let assetsUrl = main.concat(lat, lon, dateBegin, apiKey);
      console.log('NasaSearchService updated url to ' + assetsUrl);
      return assetsUrl;
    }

    getAssets(assetsSearchParameters : AssetsSearchParameters) {
      let assetsUrl = this.buildAssetsUrl(assetsSearchParameters);
      return this.http.get(assetsUrl)
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);
    }

    private buildImageryUrl(imageryParameters : ImagerySearchParameters): string {
      let main = 'https://api.nasa.gov/planetary/earth/imagery?';
      let lat = 'lat=' + imageryParameters.lat;
      let lon = '&lon=' + imageryParameters.lon;
      let date = '&date=' + imageryParameters.date;
      let cloudScore = '&cloud_score=' + imageryParameters.cloudScore;
      let fov = '&dim=' + imageryParameters.fov;
      let apiKey = '&api_key=' + this.apiKey;
      let imageryUrl = main.concat(lat, lon, date, cloudScore, apiKey);
      console.log('NasaSearchService updated url to ' + imageryUrl);
      return imageryUrl;
    }

    getImagery(imagerySearchParameters : ImagerySearchParameters) {
      let imageryUrl = this.buildImageryUrl(imagerySearchParameters);
      return this.http.get(imageryUrl)
                 .toPromise()
                 .then(response => {
                   console.log(response);
                   return response.json()
                 })
                 .catch(this.handleError);
    }

    private handleError(error : any) {
      console.log('NasaSearchService encountered an error. ', error);
      this.error = error;
      return Promise.reject(error.message || error);
    }
}
