import { Component } from '@angular/core';
import { Banner } from '../../components/banner/banner';
import { Feature } from '../../components/feature/feature';

@Component({
  selector: 'app-home',
  imports: [Banner, Feature],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
}
