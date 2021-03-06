import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NoteCategory} from '../models/note-category';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NoteType} from '../models/note-type';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteCategoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  saveNoteCategory(noteCategory: NoteCategory) {
    const body = {type: noteCategory.type, name: noteCategory.name, color: noteCategory.color};

    return this.http.post(
      environment.SERVER_URL + '/saveNoteCategory',
      body,
      {
        responseType: 'text'
      }
    );
  }

  deleteNoteCategory(noteCategoryId: number) {
    const params = new HttpParams()
      .set('id', noteCategoryId);
    return this.http.get(
      environment.SERVER_URL + '/deleteNoteCategory',
      {
        params
      }
    );
  }

  getAllNoteCategories(): Observable<NoteCategory[]> {
    return this.http.get(
      environment.SERVER_URL + '/getAllNoteCategories',
      {
        responseType: 'json',
      }
    ).pipe(map((noteCategories: any) => {
      return noteCategories.map(NoteCategoryService.parseNoteCategoryData);
    }));
  }

  getNoteCategoriesByType(noteType: NoteType): Observable<NoteCategory[]> {
    const params = new HttpParams()
      .set('type', noteType);


    return this.http.get(
      environment.SERVER_URL + '/getNoteCategoriesByType',
      {
        responseType: 'json',
        params
      }
    ).pipe(map((noteCategories: any) => {
      return noteCategories.map(NoteCategoryService.parseNoteCategoryData);
    }));
  }


  private static parseNoteCategoryData(noteCategory: any): NoteCategory {
    const type = noteCategory.type;
    const name = noteCategory.name;
    const color = noteCategory.color;
    const id = noteCategory.id;

    return {
      type,
      name,
      color,
      id
    }
  }
}
