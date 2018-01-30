import { Component, Input, SimpleChanges } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FlickrPictureService } from './flickr-picture.service';
import { SearchItem, Photo } from './types';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  private loading: boolean;
  private results: BehaviorSubject<SearchItem>;
  private currentPhotos = [] as Photo[];
  private searchString: string;
  private page: number;

  constructor(private _pictureService: FlickrPictureService) {

  }

  ngOnInit() {
    this.results = new BehaviorSubject({
      photos: {
        page: 1,
        pages: 1,
        perpage: 3,
        total: '',
        photo: [] as Photo[]
      }
    } as SearchItem);

    this.page = 1;
    this.doSearch();
  }
  onSearch() {
    this.currentPhotos.splice(0, this.currentPhotos.length);
    this.doSearch();
  }
  doSearch(page?: number) {
throw new Error();
    this.loading = true;
    this._pictureService.searchPhotosByTags(this.searchString, page + 1)
      .do((data) => {
        this.page++;
        this.results = data.json() as BehaviorSubject<SearchItem>;
        const newPhoto = data.json().photos.photo;
        this.currentPhotos = _.concat(this.currentPhotos, newPhoto);
      },
      (err) => console.log(err),
      () => {
        this.loading = false;
      })
      .subscribe();
  }

  onScroll() {
    console.log('scrolled');
    this.doSearch(this.page);
  }
}

