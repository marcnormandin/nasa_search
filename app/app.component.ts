import { Component } from '@angular/core';
import { NasaSearchComponent } from './nasa-search.component';
import { NasaSearchService } from './nasa-search.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [NasaSearchService],
    directives: [NasaSearchComponent],
})

export class AppComponent { }
