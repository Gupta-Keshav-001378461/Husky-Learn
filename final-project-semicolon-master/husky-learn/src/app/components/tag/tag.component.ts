import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/services/userservices/article.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
 selector: 'app-tag',
 templateUrl: './tag.component.html',
 styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
 myControl = new FormControl();
 options: string[] = [];
 filteredOptions: Observable<string[]>;
 listOfArticles: Array<Article>;
 tag;
 // favorite;
 showAdd;
 // Navbarlinks = [
 // // { path: 'yourfeed', label: 'Your Feed' },
 // { path: 'globalfeed', label: 'Global Feed' }];
 constructor(private articleService: ArticleService, private router: Router) {
 this.showAdd = false;
 this.tag="";
 }

 // Load list of articles on home
 ngOnInit(): void {
 this.filteredOptions = this.myControl.valueChanges.pipe(
 startWith(''),
 map(value => this._filter(value))
 );
 this.articleService.getTagList().subscribe(
 data => {
 // this.favorite = true;
 this.options= data.tags;
 // console.log(data)
 // this.listAllArticles(this.myControl.value)
 },
 err => {
 this.router.navigate(['/signin']);
 })
 // this.favorite = false;
 this.listAllArticles(this.tag);
 }
 private _filter(value: string): string[] {
 const filterValue = value.toLowerCase();

 return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
 }
 // Add to list of favorite articles
 toggleFavorite(slug, isfavorite) {
 if (!isfavorite) {
 this.articleService.favoriteArticle(slug).subscribe(
 data => {
 // this.favorite = true;
 this.listAllArticles(this.myControl.value);
 },
 err => {
 this.router.navigate(['/signin']);
 });
 }

 // remove from list of favorite articles
 else if (isfavorite) {
 this.articleService.unfavoriteArticle(slug).subscribe(
 data => {
 // this.favorite = true;
 this.listAllArticles(this.myControl.value);
 },
 err => {
 this.router.navigate(['/signin']);
 });
 }

 }

 // load list of all articles
 listAllArticles(tag) {
 this.articleService.getByTag(tag).subscribe(
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

 // View profile of particular user
 viewProfile() {
 this.router.navigate(['/profile']);
 }
 findByTag(){
 this.listAllArticles(this.myControl.value);
 }
}
