// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class GoogleParser{

	private _json: any;
	
	constructor(json: any)
	{
		this._json = json;
	}
	
	public getNewsCount(): any {
		return this._json.articles.length;
	}
	
	public getNewsAtIndex(index: any): any {
		return this._json.articles[index];
	}
	
	public hasImage(index:any): any {
		if(this.getNewsAtIndex(index).image)
			return true;
		else
			return false;
	}
	
	public getImageWidth(index: any): any {
		return 60;
	}
	
	public getImageHeight(index: any): any {
		return 60;
	}
	
	public getImageUrl(index: any): any {
		let item = this.getNewsAtIndex(index);
		return item.image;	
	}
	
	public hasCategory(index: any): any {
			return false;
	}
	
	public getCategory(index: any): any {
		return "";
	}
	
	public getUrl(index: any): any {
		let item = this.getNewsAtIndex(index);
		return item.url; 
	}
	
	public getDatePublished(index:any): any {
		let item = this.getNewsAtIndex(index);
		return item.publishedAt;
	}
	
	public getTitle(index: any): any{
		let item = this.getNewsAtIndex(index);
		return item.title;
	}
}
