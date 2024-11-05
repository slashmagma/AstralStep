import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(private router:Router) { }
  @Input() titulo:String="";

  ngOnInit() {}
  volver(){this.router.navigate(["/home"])} 
}


