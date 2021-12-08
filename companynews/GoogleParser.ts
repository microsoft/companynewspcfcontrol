// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as moment from "moment";
import { NewsItemProps } from "./NewsItemComponent";

export class GoogleParser {
  private _newsJson: any;

  constructor(json: any) {
    this._newsJson = json;
  }

  public getNews(): NewsItemProps[] {
    var newsItems: NewsItemProps[] = [];

    // no news
    if (
      this._newsJson == null ||
      this._newsJson.value == null ||
      this._newsJson.value == 0
    ) {
      return newsItems;
    }

    // iterate over all news items
    for (var i = 0; i < this._newsJson.articles.length; i++) {
      // todo: limit count
      var newsItem = {} as NewsItemProps;
      newsItem.imageUrl = this._newsJson.articles[i].urlToImage;
      newsItem.imageName = "No image description";
      newsItem.title = this._newsJson.articles[i].title;
      newsItem.newsContent = this._newsJson.articles[i].description;
      newsItem.url = this._newsJson.articles[i].url;
      newsItem.source = this._newsJson.articles[i].source.name;
      newsItem.category = this._newsJson.articles[i].author == null ? "" : this._newsJson.articles[i].author;
      newsItem.agoTime = this.getTimeAgo(
        new Date(this._newsJson.articles[i].publishedAt)
      );

      newsItems.push(newsItem);
    }

    return newsItems;
  }

  private getTimeAgo(date: Date): string {
    let publishedDate: any = moment(date);
    let currentTime = moment();

    let diff = currentTime.diff(publishedDate);
    let diffDuration = moment.duration(diff);
    let diffDays = diffDuration.days();
    let diffHrs = diffDuration.hours();
    let diffMins = diffDuration.minutes();

    let dateString = "";
    if (diffDays != 0) {
      dateString = diffDays + " days";
    } else if (diffHrs != 0) {
      dateString = diffHrs + " hours";
    } else if (diffMins != 0) {
      dateString = diffMins + " minutes";
    }

    return dateString + " ago";
  }
}
