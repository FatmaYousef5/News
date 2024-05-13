import { Injectable } from '@angular/core';
import { updateNews } from '../../models/NewsUpdate.models';

@Injectable({
  providedIn: 'root'
})
export class NewsUpdateService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor() { }

  updateData(model: updateNews, authToken: string, Image: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + `News/UpdateNews?NewsId=${model.newsId}&PublicationDate=${model.publicationDate}&CreationDate=${model.creationDate}&NewsContent=${model.newsContent}&AuthorId=${model.authorId}&Title=${model.title}&SectionID=${model.section}`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };
      xhr.send(Image);
    });
  }
}
