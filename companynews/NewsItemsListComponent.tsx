// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as React from "react";
import { News } from "./News";
import { NewsItemComponent, NewsItemProps } from "./NewsItemComponent";

export class NewsItemsListProps {
  apiKey: string;
  baseUrl: string;
  searchString: string;
}

export class NewsItemsProps {
  newsItems: NewsItemProps[]
}

// this hosts a list of news items
export class NewsItemListComponent extends React.Component<NewsItemsListProps, NewsItemsProps> {
  private _apiKey: string;
  private _baseUrl: string;
  private _searchString: string;

  constructor(props: NewsItemsListProps) {
    super(props);

    this._apiKey = props.apiKey;
    this._baseUrl = props.baseUrl;
    this._searchString = props.searchString;

    this.state = {newsItems: []};
  }

  componentDidMount() {
    this.getNews();

  }

  private async getNews(): Promise<void> {
    var news = new News(this._apiKey, this._baseUrl);
    let newsItems: NewsItemProps[] = await news.getNews(this._searchString, this._apiKey);
    this.setState({newsItems});
  }

  public render(): JSX.Element {
    
    const newsItems = this.state.newsItems.map(
      (newsItem: NewsItemProps, index: number) => {
        return <NewsItemComponent key={index} {...newsItem} />;
      }
    );

    return (
      <div>
        <div className="Title">
          <h4>
            News for "{this.props.searchString}"
          </h4>
        </div>
          {(this.state.newsItems.length == 0)
           ? <div><i>No news found</i></div> 
           : <div className="newsItems">{newsItems}</div>
          }
      </div>
    );
  }
}
