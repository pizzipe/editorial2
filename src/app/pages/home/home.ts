import { Component } from '@angular/core';
import { Banner } from '../../components/banner/banner';

@Component({
  selector: 'app-home',
  imports: [Banner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
