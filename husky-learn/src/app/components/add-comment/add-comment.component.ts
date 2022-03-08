import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from '../../services/userservices/article.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/model/Article';

// Declaring add comment component
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  addCommentForm: FormGroup;
  successMessage;
  success;
  error;
  errorList;
  listOfArticles: Array<Article>;
  @Input() slug;
  @Output() updateCommentList = new EventEmitter<any>();
  constructor(private articleService: ArticleService, private router: Router, private _snackBar: MatSnackBar) {
    this.success = false;
    this.error = false;
  }

  // Executes method for adding new comment
  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      comment: new FormControl('')
    })
  }
  viewArticle(article) {
    this.router.navigate(['/article'], { state: { 'article': article } });
  }

  // Posts comment on particular article on clicking submit button
  onSubmit() {
    this.articleService.postComment(this.slug, this.addCommentForm.value.comment).subscribe(
      data => {
        this.success = true;
        this.error = false;
        this.updateCommentList.emit();
        this.successMessage = "Comment posted successfully"
        let action = "ok";
        this.addCommentForm.reset();
        this._snackBar.open(this.successMessage, action, {
          duration: 2000,
        });

      },
      err => {
        this.error = true;
        this.errorList = err;
        let action = "ok";
        this.addCommentForm.reset();
        this._snackBar.open("Failed to post comment.. please sign in!", action, {
          duration: 2000,
        });
        this.router.navigate(['/signin']);
      });
  }


}
