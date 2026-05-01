import { Component } from '@angular/core';
import { Banner } from '../../components/banner/banner';
import { Feature } from '../../components/feature/feature';
import { ArticlePreview } from '../../components/article-preview/article-preview';

@Component({
  selector: 'app-home',
  imports: [Banner, Feature, ArticlePreview],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
}
