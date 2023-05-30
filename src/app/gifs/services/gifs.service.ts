import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchResponse } from '../interfaces/gifs.interface';
//const GIPHY_API_JEY = 'Mdj7wYC8Gq6DTB4yo08S4sLQZlQ6HEaR';
@Injectable({ providedIn: 'root' })
export class GifsService {

  //public gifList: Gif[]=[];

  private _tagHistory: string[] = [];
  private apiKey      :string = 'Mdj7wYC8Gq6DTB4yo08S4sLQZlQ6HEaR';
  private serviceUrl  :string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { };

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagsHistory.splice(0, 10);

  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe( (resp )=> {console.log(resp)});


  }
}
