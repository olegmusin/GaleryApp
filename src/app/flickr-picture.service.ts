import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { SearchItem } from './types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const FLICKR_API_KEY = 'a447c83c0dac7d65d29911b16c31e49d';
const BASE_URL = 'https://api.flickr.com/services/rest?';

@Injectable()
export class FlickrPictureService {

  constructor(private _http: Http) { }

  searchPhotosByTags(tagsString: string, page?: number) {

    const method = 'flickr.photos.search';
    const apiUrl = `${BASE_URL}method=${method}` +
      `&text=${tagsString}` +
      `&content_type=1` +
      `&per_page=6` +
      `${page ? `&page=${page}` : ''}` +
      `&sort=relevance` +
      `&format=json` +
      `&nojsoncallback=1` +
      `&api_key=${FLICKR_API_KEY}`;

    return this._http.get(apiUrl);

  }
}
