import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/fileItem.model';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styles: [
  ]
})
export class UploaderComponent implements OnInit {
  public mouseIsHover: boolean;
  public filesToUpload: FileItem[];
  constructor() { 
    this.mouseIsHover = false;
    this.filesToUpload = [];
  }

  ngOnInit(): void {
  }

}
