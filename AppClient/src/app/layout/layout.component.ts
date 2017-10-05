import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private _toaster: ToasterService) { }

  ngOnInit() {
  }

  public logoutUser() {
    this._toaster.pop('error', 'Yet to be implemented !!');
  }

}
