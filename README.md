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

Add the company news control to the account main form
The steps in this article add the company news control to the account main form already configured to query news topics collected from Bing News. You can use similar steps to add the control to the main form for other entities, such as contact and competitor.
Get the Bing News API key and URL
The news control requires a news API URL, API key, and more news URL. For Bing News, the more news URL is preconfigured in the control to use https://www.bing.com/news/search. For the News API URL, and API Key, you’ll need to provide these by creating a Cognitive Service component under your Azure account. Once created, you will get the API key and API URL under the Keys and Endpoint section.  
 
Import the company news solution 
1.	Go to the following GitHub repo. https://github.com/microsoft/companynewspcfcontrol
2.	Download Solutions,zip. To do this, open the Solutions folder, open Solutions.zip, and then select Download. 
3.	Sign-in to Power Apps, and then in the upper right select the environment where you want to install the company news control.
4.	Select Solutions on the left pane, and then select Import on the command bar. 
5.	In the Import solution wizard, select Choose File, browse to and select Solutions.zip, and then select Open. 
6.	Select Next, and then select Next again to complete the import. 
Add the control to the account main form
1.	In Power Apps, select Solutions on the left pane, select Settings (gear) on the upper right, and then select Advanced settings. 
2.	Go to Settings > Customizations > Customize the System. 
3.	In the left navigation tree, expand Entities > Account, select Forms, and then open the Account Main form.
4.	In the form editor, add two new text fields, which will be used to pass the key and base URL to the news component. 
a.	Select New Field from the right navigation Field Explorer. 
b.	For both Display name and Name enter newsapikey. Leave the rest of the settings as the default and then select Save and Close.  
c.	Repeat the previous two steps to create another text field. For both the Display name and Name enter newsurl. Leave the rest of the settings as the default and then select Save and Close. 
5.	In the form editor, select a place on the form where you want the company news control, and then select Insert tab > Section > One Column. 
6.	To show news by account name, drag and drop the Account Name field from the right Field Explorer pane to the newly created section. 
7.	Select the section and then select Change properties. Enter a descriptive section a Name, such as Company news. You might want to check “Show the label of this section on the form” to provide heading to the section. Select OK.
8.	Select the newly added Account Name field and then select Change properties on the Home tab. On the Field Properties page, select the Controls tab, select Add Control, select the companynews control, and then select Add. 
9.	Configure the following bindings for the apikey and baseurl fields. 
a.	Select Configure property (pencil icon) next to APIKey. 
b.	From Bind to value on a field the dropdown list, select new_newsapikey (SingleLine.Text), and then select OK. 
c.	Select Configure property (pencil icon) next the BaseURL. 
d.	From Bind to value on a field the dropdown list, select new_newsurl (SingleLine.Text), and then select OK.
e.	On the Field Properties page, select the Web, Phone, and Tablet, client options. 
f.	On the Field Properties page, select the Display tab, clear the Display label on form option, and then select OK. 
10.	To provide API Key and Base URL default values, use business rules. Select Business Rules from the form editor, and then select New Business Rule from the bottom of the right pane. 
11.	In the business rule designer, select Condition on the designer canvas, set Field to Account Name and Operator to Contains data, and then select Apply. Then, select the Components tab, drag a Set Field Value action, and provide a field value where Field is newsapikey and the value is the Key you copied from the Azure Cognitive Services properties. Create another Set Field Value action where Field is newsurl and add the value as the Endpoint you copied from the Azure Cognitive Services properties. Make sure to append “bing/v7.0/news/search” at the end of news URL. Final URLshould look like https://<<yourservicename>>.cognitiveservices.azure.com/bing/v7.0/news/search   
12.	Save and Activate the rule. Close the business rule designer. 
13.	Make sure you add the newly added fields, newsapikey and newsurl, to Account Form, but mark default visible as false. 
14.	In the form designer, select Save and then select Publish. 

## Understanding and updating the code

Steps mentioned above are sufficient if you want to use Bing News for fetching news items. But if you want to use any other news Service like Google news or change the look and feel of the component, you can do so by updating the code. You can close the code from the Git Repo mentioned earlier i.e. https://github.com/microsoft/companynewspcfcontrol
Once you have the code locally, you can test the component, but before that, you need to update the Bing News key and base URL. You can provide it while testing the component locally from interface.
 
Note: You can add more news services. We have an out of the box support for Bing news and Google news. In this example, we will use the Bing News API.

            NewsSource: any = "NewsSource"; 
			
            MoreNews: any = "<<More News Base URL>>";
			
Replace NewsSource with “Bing” for Bing News (or “Google” for Google News)

Provide News API URL, API Key and More News URL (https://www.bing.com/news/search)

Note * For Google News, go to https://gnews.io/ and create an account to get api and token.

We can see under getnews function, we make a call to the News API and render the results in HTML form. We are using a plain vanilla HTML to show the news, you can adjust the look and feel based on needs. 

Finally, you need to build and start the application. Go to companynews folder in the repo and execute following commands

•	Install - npm install

•	Build - npm run build

•	Start - npm start

Executing “npm start” will open a browser and display the component. To test the component, provide a value in the Value text, Key and Base URL  and see the news appearing.

## Creating Solution zip
Once you have tested the component and made any adjustments needed, you need to package the code into a solution which you will upload to our CRM org.
•	Create a folder named Solution and use the following commands to create the solution package 
•	Create a new solutions project using the following command. 
pac solution init --publisher-name <<publishername>> --publisher-prefix <<prefix>>
For example:
pac solution init --publisher-name developer --publisher-prefix dev
 
•	Once the new solution project is created, refer the Solutions folder to the location where the created sample component is located. 
 
pac solution add-reference --path <<Path to Component Directory - root folder of the repo, which contains the pcfproj file >>
 
For example:
pac solution add-reference --path c:\downloads\mysamplecomponent
•	By default an unmanaged solution will be created. To create a managed solution uncomment following lines from autogenerated Solutions.cdsproj
 
  <!-- Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>
  -->
•	Build Solution 
msbuild /p:NuGetInteractive="true"  /t:build /restore

You should see a solutions.zip file under Solutions\bin\Debug
You can use this updated solution instead of the default on provided in Git repo


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
