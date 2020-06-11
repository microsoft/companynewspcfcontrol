// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class BingParser{

	private _json: any;
	
	constructor(json: any)
	{
		this._json = json;
	}
	
	public getNewsCount(): any {
		return this._json.value.length;
	}
	
	public getNewsAtIndex(index: any): any {
		return this._json.value[index];
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
		let item = this.getNewsAtIndex(index);
		let height = Math.round(60 * item.image.thumbnail.height / item.image.thumbnail.width);
		return height;
	}
	
	public getImageUrl(index: any): any {
		let item = this.getNewsAtIndex(index);
		return item.image.thumbnail.contentUrl;
	}
	
	public hasCategory(index: any): any {
		let item = this.getNewsAtIndex(index);
		if(item.category) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public getCategory(index: any): any {
		let item = this.getNewsAtIndex(index);
		return item.category;
	}
	
	public getUrl(index: any): any {
		let item = this.getNewsAtIndex(index);
		return item.url; 
	}
	
	public getDatePublished(index:any): any {
		let item = this.getNewsAtIndex(index);
		return item.datePublished;
	}
	
	public getTitle(index: any): any{
		let item = this.getNewsAtIndex(index);
		return item.name;
	}
}
