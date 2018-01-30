import { TestBed, inject } from '@angular/core/testing';

import { FlickrPictureService } from './flickr-picture.service';

describe('FlickrPictureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlickrPictureService]
    });
  });

  it('should be created', inject([FlickrPictureService], (service: FlickrPictureService) => {
    expect(service).toBeTruthy();
  }));
});
