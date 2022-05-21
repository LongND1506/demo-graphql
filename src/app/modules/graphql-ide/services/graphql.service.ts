import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
  IntrospectionQuery,
} from 'graphql';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GraphQLService {
  constructor(private _httpClient: HttpClient) {}
  private readonly _url =
    'https://graphiql-test.netlify.app/.netlify/functions/schema-demo';

  getSchema(): Observable<GraphQLSchema> {
    return this._httpClient
      .post(this._url, { query: getIntrospectionQuery() })
      .pipe(map((res: any) => {
          
        const schema = res.data as IntrospectionQuery
        return buildClientSchema(schema)
      }));
  }

  excuteQuery(query: string):Observable<any> {
    return this._httpClient.post(this._url, { query }).pipe(
      map(value => {
        console.log(value);
        return value
      })
    )
  }
}
