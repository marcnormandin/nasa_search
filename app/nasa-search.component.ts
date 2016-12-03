import { Component } from '@angular/core';
import { AssetsSearchParameters, ImagerySearchParameters, NasaSearchService } from './nasa-search.service';
import { NasaImageComponent } from './nasa-image.component';

@Component({
    selector: 'nasa-search',
    templateUrl: 'app/nasa-search.component.html',
    providers: [NasaSearchService],
    directives: [NasaImageComponent]
})

export class NasaSearchComponent {
  // search parmeters
  lat : number = 45.386303;
  lon : number = -75.695520;
  dateBegin : string = '2016-06-01';
  dateEnd : string = '2016-07-17';
  fov : number = 0.025;
  cloudScore : string = 'False';

  // Results
  assetsInfo : any; // Returned from the NASA Asset Query
  imageUrls : string[];

  // Helper variables for the html
  rows : number[];
  cols : number[];

  constructor(private nasaSearchService : NasaSearchService) {
    console.log("NasaSearchComponent constructed.");
  }

  onSearch() {
    console.log('NasaSearchComponent.onSearch()');
    this.assetsInfo = null;
    this.imageUrls = [];

    // Get the assets associated with the search parameters
    // we need to chain the events
    let assetsSearchParameters = new AssetsSearchParameters(
      this.lat, this.lon, this.dateBegin, this.dateEnd);
      console.log(this.lat);

    this.nasaSearchService.getAssets(assetsSearchParameters)
    .then(assetsInfo =>
        {
          this.assetsInfo = assetsInfo;
          console.log('Got the assets');
          console.log(this.assetsInfo);
        }
    ).then( () => {
      // Download each image (with a delay)
      for(let x in this.assetsInfo.results) {
        let timeout = +x*1000;
        setTimeout(() =>
        {
          // date = 2016-07-09T15:50:57
          let dateTime = this.assetsInfo.results[x].date;
          // date = 2016-07-09
          let date = dateTime.substring(0, dateTime.indexOf('T'));

          let imagerySearchParameters = new ImagerySearchParameters(
            this.lat, this.lon, date, this.fov, this.cloudScore);

          this.nasaSearchService.getImagery(imagerySearchParameters)
              .then(response => {
                this.imageUrls.push(response.url);
              });
          }, timeout);
      }

      this.rows = Array.from(Array(Math.ceil(this.assetsInfo.results.length / 3)).keys())
      this.cols = [0,1,2];
    });
  }
}
