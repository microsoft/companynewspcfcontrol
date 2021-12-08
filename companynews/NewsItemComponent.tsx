// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as React from "react";

export class NewsItemProps {
  imageUrl: string;
  imageName: string;
  title: string;
  newsContent: string;
  url: string;
  source: string;
  category: string;
  agoTime: string;
  index: number;
}

// this is a single news item
export class NewsItemComponent extends React.Component<NewsItemProps> {
  constructor(props: NewsItemProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="flex-container">
        <div>
          <img src={this.props.imageUrl} alt={this.props.imageName} title={this.props.newsContent}/>
        </div>
        <div>
          <div className="flex-container2">
            <a className="news" href={this.props.url} target="_blank">
              {this.props.title}
            </a>
            <span className="title">{this.props.newsContent} </span>
            <div className="flex-container3">
              <span className="source">{this.props.source} </span>
              <span className="category">{this.props.category} </span>
              <time className="agoTime"> {this.props.agoTime}</time>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
