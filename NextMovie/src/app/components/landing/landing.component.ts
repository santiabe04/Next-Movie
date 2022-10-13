import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  pelisHardcodeadas: any = [
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 1',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 2',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 2',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 3',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 4',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 5',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 6',
      detail:'Info sobre la peli'
    },
    {
      image:'../../../assets/images_icons/no_photo.jpg',
      name:'Peli 7',
      detail:'Info sobre la peli'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
