import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {Constants} from "./Constants";
import {BingParser} from "./BingParser";
import {GoogleParser} from "./GoogleParser";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class companynews implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _value: string;

	private _context: ComponentFramework.Context<IInputs>;

	private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._context = context;
		this._container = document.createElement("div");
		let val = ""; 
		if( context.parameters.sampleProperty.raw!= null)
		val =  context.parameters.sampleProperty.raw;
		this._value = val;

		this._container.innerHTML = this._value;
		container.appendChild(this._container);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		let val = ""; 
		if( context.parameters.sampleProperty.raw!= null)
		val =  context.parameters.sampleProperty.raw;
		this._value = val;
		this._context = context;
		this._container.innerHTML = this._value;
		this.getNews(val);
	}
	
	public getNews(val:string): any {
	
		let constants = new Constants(); 
		const requestHeaders: HeadersInit = new Headers();
		let uriBase = "";
		let uriQuery = "";
		let morenews = "";
		uriBase = constants.NewsURL;
		morenews = constants.MoreNews + "?q="+val;
		if(constants.NewsSource == "Bing"){	
			requestHeaders.set("Ocp-Apim-Subscription-Key", constants.NewsKey);
		    uriQuery = uriBase + "?count=4&q=" + val;
		}
		else if (constants.NewsSource == "Google")
		{
		    uriQuery = uriBase + "?q=" + val + "&token=" + constants.NewsKey;
		}
        
        return fetch(uriQuery, {
			method: 'GET',
			headers: requestHeaders
		})
		// the JSON body is taken from the response
		.then(res => res.json())
		.then(res => {
				// The response has an `any` type, so we need to cast
				let news: any = new BingParser(res);
				if (constants.NewsSource == "Google"){
					news = new GoogleParser(res);
				}
				let index=0;
				let finalhtml="";
				if(news.getNewsCount()==0){
					let html = [];
					html.push("No News Data Available");
					finalhtml= finalhtml + html.join("");
				}
				let startDiv = "<div style='border-style: none;'>";
				finalhtml = finalhtml + startDiv;
				
				for( index= 0; index<news.getNewsCount(); index++){
					let item = news.getNewsAtIndex(index);
					let html = [];
					let htmlbuilder = "<br/>";
					htmlbuilder = htmlbuilder + "<div style='padding-top:20px;border-style: none;vertical-align: bottom;'>";
					html.push(htmlbuilder);
					if (news.hasImage(index)) {
						let width = 60;
						let height = news.getImageHeight(index);
						let imageHTML = "<div width='"+width+"'style='float:left;width:20%;border-style: none;'>";
						imageHTML = imageHTML + "<img src='" + news.getImageUrl(index) +
							//"&h=" + height + "&w=" + width + 
							"' width=" + width + " height=" + height + ">";
						imageHTML = imageHTML + "</div>"
						html.push(imageHTML);
					}
					let titleHTML = "<a href='" + news.getUrl(index) + "'>" + news.getTitle(index) + "</a>";
					
					html.push(titleHTML);
					if (news.hasCategory(index)) html.push("<div style='style='float:left;border-style: none;vertical-align: bottom;'> - " + news.getCategory(index));
					html.push(" (" + this.getHost(news.getUrl(index)) + ")");
					let d = new Date(news.getDatePublished(index));
					let mins =  d.getMinutes()+"";
					if( d.getMinutes()<10){
						mins = "0"+mins;
					}
					let datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + mins;
					let dateHTML = "</div><div style='float:left;vertical-align: bottom;padding-left:10px;'>" + datestring +"</div>";
					html.push(dateHTML);
					finalhtml= finalhtml + html.join("");
				}
				
				let html = [];
				let moreNewsHTML = "<br/><div><a target='_blank' href='"+morenews+"'+val>See more on '" + constants.NewsSource + "' News</a></div>";
				html.push(moreNewsHTML)
				finalhtml= finalhtml + html.join("");
				
				let endDiv = "</div>";
				finalhtml = finalhtml + endDiv;
				
				this._container.innerHTML = finalhtml;
		})
	}

	public getHost(url: any) {
		return url.replace(/<\/?b>/g, "").replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}