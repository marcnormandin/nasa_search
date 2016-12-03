import { Input, Component } from '@angular/core';
//import { NasaSearchComponent } from './nasa-search.component';
//import { NasaSearchService } from './nasa-search.service';

@Component({
    selector: 'nasa-image',
    templateUrl: 'app/nasa-image.component.html',
})

export class NasaImageComponent {
  @Input() imageUrls : string[];
  @Input() id : number;
}
