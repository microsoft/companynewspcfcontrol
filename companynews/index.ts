import {IInputs, IOutputs} from "./generated/ManifestTypes";

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
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Ocp-Apim-Subscription-Key", "<<Key Here>>");
		let uriBase = "<<Base URL>>/bing/v7.0/news/search";
		let uriQuery = uriBase + "?count=4&q=" + val;
		let morenews = "https://www.bing.com/news/search?q="+val;
        // For now, consider the data is stored on a static `users.json` file
        return fetch(uriQuery, {
			method: 'GET',
			headers: requestHeaders
		})
		// the JSON body is taken from the response
		.then(res => res.json())
		.then(res => {
				// The response has an `any` type, so we need to cast
				// it to the `User` type, and return it from the promise
				let index=0;
				let finalhtml="";
				if(res.value.length==0){
					let html = [];
					html.push("No News Data Available");
					finalhtml= finalhtml + html.join("");
				}
				for( index= 0; index<res.value.length; index++){
					let item = res.value[index];
					let html = [];
					html.push("<br/><div style='padding-top:20px;'>");
					if (item.image) {
						let width = 60;
						let height = Math.round(width * item.image.thumbnail.height / item.image.thumbnail.width);
						html.push("<div width='"+width+"'style='float:left;width:20%'><img src='" + item.image.thumbnail.contentUrl +
							"&h=" + height + "&w=" + width + "' width=" + width + " height=" + height + "></div>");
					}
					html.push("<div><a href='" + item.url + "'>" + item.name + "</a></div><div style='float:left;padding-left:10px;'>");
					if (item.category) html.push(" - " + item.category);
					if (item.contractualRules) {    // MUST display source attributions
						html.push(" (");
						var rules = [];
						for (var i = 0; i < item.contractualRules.length; i++)
							rules.push(item.contractualRules[i].text);
							html.push(rules.join(", "));
							html.push(")");
						}
					html.push(" (" + this.getHost(item.url) + ")");
					let d = new Date(item.datePublished);
					let mins =  d.getMinutes()+"";
					if( d.getMinutes()<10){
						mins = "0"+mins;
					}
					let datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + mins;
					html.push("</div></div><div><div style='float:left;padding-left:10px;'>" + datestring +"</div></div><br/></p>");
					
					
					finalhtml= finalhtml + html.join("");
					
				}
				let html = [];
				html.push("<br/><div><a target='_blank' href='"+morenews+"'+val>See more on Bing News</a></div>")
				finalhtml= finalhtml + html.join("");
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