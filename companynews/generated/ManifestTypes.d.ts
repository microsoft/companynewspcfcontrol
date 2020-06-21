/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    SearchString: ComponentFramework.PropertyTypes.StringProperty;
    APIKey: ComponentFramework.PropertyTypes.StringProperty;
    BaseURL: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    SearchString?: string;
    APIKey?: string;
    BaseURL?: string;
}
