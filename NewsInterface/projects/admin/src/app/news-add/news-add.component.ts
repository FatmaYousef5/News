import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AddNews } from '../models/CreateNews.models';
import { NewsAddService } from './services/news-add.service';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/Author.models';
import { AdminService } from '../admin/services/admin.service';
import { getSections } from '../models/Sections.models';

@Component({
  selector: 'app-news-add',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, CommonModule, NgFor],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss'
})
export class NewsAddComponent {
  model: AddNews
  Authors: Array<Author> = []
  Sections: Array<getSections> = []
  authToken: string = ''
  file: any;
  constructor(private router: Router, private news: NewsAddService, private http: HttpClient, private GetAuthors: AdminService) {
    this.model = {
      CreationDate: new Date,
      NewsContent: '',
      Image: undefined,
      AuthorId: 0,
      title: '',
      section: 0,
    }
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }


  getAddNews() {
    let Id = (document.querySelector(".id")! as HTMLInputElement).value;
    let SectionId = (document.querySelector(".sectionId")! as HTMLInputElement).value;
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    if (this.file) {
      this.convertFileToByteArray(this.file).then((byteArray: Uint8Array) => {
        const formData = new FormData();
        formData.append('Image', new Blob([byteArray], { type: this.file.type }), this.file.name);
        this.model.Image = formData
        this.news.AddData(this.model, this.authToken, Id,SectionId, formData).then(data => {
          this.router.navigate(['/news']);
        }).catch(error => {
          console.log(error)
        })
      });
    }
  }

  ngOnInit() {
    this.getAuthors()
    this.getSections()
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
    this.news.getSections(this.authToken)
      .then(data => {
        this.Sections = data
        console.log(this.Authors)
      })
      .catch(error => {
        console.error(error);
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
