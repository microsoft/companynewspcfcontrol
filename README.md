---
page_type: CompanyNews Component Description
languages:
- typescript
products:
- PowerApps component framework
description: "The plugin provides News feature, by default getting news for a text from BING news, but can be customized for other news sources."
---

# CompanyNews Component

At times we need to fetch and show news about certain elements which are shown in the application or a page. For example, in a CRM application showing a list of accounts, a salesperson might want to keep a check on the latest news about the company.

The control is completely developed using Powerapps Component Framework, and is easy to use and modify. More details on PowerApps Component Framework https://docs.microsoft.com/en-us/powerapps/developer/component-framework/overview

## Contents

Outline the file contents of the repository. It helps users navigate the codebase, build configuration and any related assets.

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `companynews`     | PCF code to show news.                     |
| `.gitignore`      | Define what to ignore at commit time.      |
| `CHANGELOG.md`    | List of changes to the sample.             |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

Install Powerapps command line support - https://docs.microsoft.com/en-us/powerapps/developer/component-framework/get-powerapps-cli
 
## Setup

Here is a step by step guide for using the component
1. Clone the component to a local directory
2. Run npm install
3. Update index.ts and provide Bind news id along with base url under getnews function
4. Build the code using- npm build run
5. Execute the component - npm start 

## Running the sample

For running the code - npm start

## Using the plugin with Dynamics 365 CRM

It is easy to import the news plugin to a Dynamics 365 org. For the org, 

1. Go to Settings-> Customizations-> Customize the System 
2. Under the Customizations window, drill down to Components-> entities->Accounts->Forms and select Main Account Form
3. Add a new section Insert->Sections->One Column section. You can drag and drop the newly created section to any location on the page.
4.  As we want to show the news for account name, drag and drop the account name property from the right “Field Explorer” panel to the newly created section.
5. With the section being selected, click on change properties on the top header and give the section a relevant name like company news.
6. Next, select the newly added account name property and again choose to change properties. Under this, go to controls and add “Companynews” control. You would want to uncheck the “Display label on form” option on the Display tab.
7. Finally “Save” and “Publish” the changes.

## Key concepts

getnews function- 
This is the main function under index.ts, responsible for fetching news from news api and rendering the same. We can see the code needs to be updated for Key and Base URL
	requestHeaders.set("Ocp-Apim-Subscription-Key", "<<Key Here>>");
	let uriBase = "<<Base URL>>/bing/v7.0/news/search"; 
One can easily replace the Bing news API with other news APIs or can also use multiple news sources. 

Next piece of code parses and renders the news fetched from API. It is simple HTML rendered which can be updated on need basis to showcase different layouts.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
