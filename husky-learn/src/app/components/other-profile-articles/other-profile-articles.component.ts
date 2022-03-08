import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/services/userservices/article.service';
import { ActivatedRoute, Router } from '@angular/router';

// Declaring component to view all articles of other profile
@Component({
  selector: 'app-other-profile-articles',
  templateUrl: './other-profile-articles.component.html',
  styleUrls: ['./other-profile-articles.component.scss']
})
export class OtherProfileArticlesComponent implements OnInit {

  listOfArticles: Array<Article>;

  slug = null;
  @Input() username;
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
    // this.username="";

  }

  ngOnInit(): void {
    this.listAllArticles();
  }


  deleteArticle(slug) {
    this.articleService.deleteArticle(slug).subscribe(
      data => {
        this.router.navigate(['/newarticle']);
      },
      err => {
        //console.log(err)
      });
  }

  // Add article to favorites
  toggleFavorite(slug, isfavorite) {
    if (!isfavorite) {
      this.articleService.favoriteArticle(slug).subscribe(
        data => {
          // this.favorite = true;
          this.listAllArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }

    // Remove article from favorites
    else if (isfavorite) {
      this.articleService.unfavoriteArticle(slug).subscribe(
        data => {
          // this.favorite = true;
          this.listAllArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }

  }
  // Load list of all articles
  listAllArticles() {
    this.articleService.getAllArticlesByUsername(this.username).subscribe(
      data => {

        this.listOfArticles = data.articles;

      },
      err => {

      });
  }
  // View particular article
  viewArticle(article) {
    this.router.navigate(['/article'], { state: { 'article': article } });
  }
}