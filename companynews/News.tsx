// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NewsItemProps } from "./NewsItemComponent";
import { Constants } from "./Constants";
import { BingParser } from "./BingParser";
import { GoogleParser } from "./GoogleParser";

export class News {
  private _apiKey: string;
  private _baseUrl: string;

  public constructor(apiKey: string, baseUrl: string) {
    this._apiKey = apiKey;
    this._baseUrl = baseUrl;
  }

  public async getNews(
    searchString: string,
    apiKey: string = ""
  ): Promise<NewsItemProps[]> {
    let newsItemsList: NewsItemProps[];
    let constants = new Constants();
    let requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Ocp-Apim-Subscription-Key", this._apiKey);
    let uriQuery: string =
      this._baseUrl + "?count=" + constants.Count + "&q=" + searchString;

    if (constants.NewsSource == "Google") {
      uriQuery =
        this._baseUrl +
        "?count=" +
        constants.Count +
        "&q=" +
        searchString +
        "&token=" +
        apiKey;
    }

    const res = await fetch(uriQuery, {
      method: "GET",
      headers: requestHeaders,
    });
    const data = await res.json();

    if (constants.NewsSource == "Bing") {
      let news: BingParser = new BingParser(data);
      newsItemsList = news.getNews();
    } else {
      let news: GoogleParser = new GoogleParser(data);
      newsItemsList = news.getNews();
    }

    return newsItemsList;
  }
}
