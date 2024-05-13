import { Component } from '@angular/core';
import { AdminService } from '../admin/services/admin.service';
import { Author } from '../models/Author.models';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { updateNews } from '../models/NewsUpdate.models';
import { NewsUpdateService } from './services/news-update.service';
import { NewsDetailsService } from '../news-details/services/news-details.service';
import { getNews } from '../models/News.models';
import { NewsAddService } from '../news-add/services/news-add.service';
import { getSections } from '../models/Sections.models';

@Component({
  selector: 'app-news-update',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, CommonModule, NgFor],
  templateUrl: './news-update.component.html',
  styleUrl: './news-update.component.scss'
})
export class NewsUpdateComponent {
  model: updateNews
  news: Array<getNews> | null = null;
  Authors: Array<Author> = []
  Sections: Array<getSections> = []
  authToken: string = ''
  file: any;
  newsId: any
  constructor(private router: Router, private GetAuthors: AdminService, public activateRoute: ActivatedRoute, public updateNews: NewsUpdateService, public newsDetails: NewsDetailsService, private newsAdd: NewsAddService) {
    this.model = {
      newsId: 0,
      publicationDate: null,
      creationDate: null,
      newsContent: '',
      authorId: 0,
      title: '',
      section: 0,
    }
  }
  ngOnInit() {
    this.getAuthors()
    this.getNewsDetails()
    this.getSections()
  }

  getNewsDetails(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.newsId = params.get('id');
      this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
      this.newsDetails.getData(this.newsId, this.authToken)
        .then(data => {
          this.news = data
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  getAuthors() {
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    this.GetAuthors.getData(this.authToken)
      .then(data => {
        this.Authors = data
        console.log(this.Authors)
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSections() {
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    this.newsAdd.getSections(this.authToken)
      .then(data => {
        this.Sections = data
        console.log(this.Authors)
      })
      .catch(error => {
        console.error(error);
      });
  }

  getUpdateNews() {
    this.activateRoute.paramMap.subscribe(params => {
      this.newsId = params.get('id');
      let publicationDate = (document.querySelector(".publicationDate")! as HTMLInputElement).value;
      let creationDate = (document.querySelector(".creationDate")! as HTMLInputElement).value;
      let newsContent = (document.querySelector(".newsContent")! as HTMLInputElement).value;
      let authorId = (document.querySelector(".authorId")! as HTMLInputElement).value;
      let title = (document.querySelector(".title")! as HTMLInputElement).value;
      let sectionId = (document.querySelector(".sectionId")! as HTMLInputElement).value;

      this.model.newsId = this.newsId;
      this.model.publicationDate = publicationDate;
      this.model.creationDate = creationDate;
      this.model.newsContent = newsContent;
      this.model.authorId = Number(authorId);
      this.model.title = title;
      this.model.section = Number(sectionId);
      this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
      if (this.file) {
        this.convertFileToByteArray(this.file).then((byteArray: ArrayBuffer) => {
          const formData = new FormData();
          formData.append('Image', new Blob([byteArray], { type: this.file.type }), this.file.name);
          this.updateNews.updateData(this.model, this.authToken, formData)
          .then(data => {
            this.router.navigate(['/news']);
          })
          .catch(error => {
            console.error(error);
          });
        });
      }
    });
  }

  convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer: ArrayBuffer | null = reader.result as ArrayBuffer;
        if (arrayBuffer) {
          const byteArray = new Uint8Array(arrayBuffer);
          resolve(byteArray);
        } else {
          reject('Failed to convert file to byte array.');
        }
      };
      reader.onerror = () => {
        reject('Error occurred while reading the file.');
      };
      reader.readAsArrayBuffer(file);
    });
  }

}
