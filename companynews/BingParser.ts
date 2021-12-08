// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as moment from "moment";
import { NewsItemProps } from "./NewsItemComponent";

export class BingParser {
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
    for (var i = 0; i < this._newsJson.value.length; i++) {
      // todo: limit count
      var newsItem = {} as NewsItemProps;
      if (this._newsJson.value[i].image == null) {
        newsItem.imageUrl = "";
        newsItem.imageName = "";
      }
      else {
        newsItem.imageUrl = this._newsJson.value[i].image.thumbnail.contentUrl;
        newsItem.imageName = this._newsJson.value[i].image.name;
      }
      newsItem.imageName = this._newsJson.value[i].name == null ? "" :
      newsItem.title = this._newsJson.value[i].name;
      newsItem.newsContent = this._newsJson.value[i].description;
      newsItem.url = this._newsJson.value[i].url;
      newsItem.source = this.getHost(newsItem.url);
      newsItem.category =
        this._newsJson.value[i].category != null ? this._newsJson.value[i].category : "";
      newsItem.agoTime = this.getTimeAgo(
        new Date(this._newsJson.value[i].datePublished)
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

  private getHost(url: any) {
    return url
      .replace(/<\/?b>/g, "")
      .replace(/^https?:\/\//, "")
      .split("/")[0]
      .replace(/^www\./, "");
  }
}
