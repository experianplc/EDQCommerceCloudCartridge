import {countryAlpha3, countryAlpha2} from './edqCountry';
import {enableButtonDisable, addEventOnElement} from './edq-utils';
import {setEdqInputSelectors} from '../sfra';
import {buttonCssSeetings} from './edqProWebVerification';

interface GlobalIntuitiveConfigArgs {
	vDefaultCountry: string;
	edqAuthorizationToken: string;
	edqDataSetUsage: boolean;
	edqDataSetCode: string;
	edqCountryElement: HTMLSelectElement;
	edqAddressLine1Element: HTMLInputElement;
	edqAddressLine2Element: HTMLInputElement;
	edqCityLineElement: HTMLInputElement;
	edqStateLineElement: HTMLSelectElement;
	edqPostalLineElement: HTMLInputElement;	
}
/**
 * Global Intuitive
 * Sets the configuration to use Global Intuitive
 *
 *@param vDefaultCountry - Contains the default country value provided by the store configuration
 *@param edqAuthorizationToken - Contains the Global Intuitive authorization token for the Email Validate API
 *@param edqDataSetCode - Contains the code for the dataset to be used
 *@param edqCountryElement - Contains the selector of the country input
 *@param edqAddressLine1Element - Contains the selector of the address line 1 input
 *@param edqAddressLine2Element - Contains the selector of the address line 2 input
 *@param edqCityLineElement - Contains the selector of the city line input
 *@param edqStateLineElement - Contains the selector of the state line input
 *@param edqPostalLineElement - Contains the selector of the postal code input
 */
export function edqSetGlobalIntuitiveConfiguration({vDefaultCountry, edqAuthorizationToken, edqDataSetUsage, edqDataSetCode, edqCountryElement, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}: GlobalIntuitiveConfigArgs) {
	let globalIntuitiveIsoCountry: string = vDefaultCountry;
	if (window.sfccConfig.edqCountryElement != null) {
		globalIntuitiveIsoCountry = window.sfccConfig.edqCountryElement.value.toUpperCase();
	}
	window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN = edqAuthorizationToken;
	window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY = countryAlpha3({"incomingCountryIso2":globalIntuitiveIsoCountry, "vDefaultCountry":vDefaultCountry});
	/**
	 * Configuration option to include Data Sets for Global Intuitive.
	 * For more information refer to feature #118583.
	 */
	if (edqDataSetUsage) { 
		window.EdqConfig.GLOBAL_INTUITIVE_DATASET = datasetSetCode({"vDefaultCountry":vDefaultCountry, "edqCountryElement":window.sfccConfig.edqCountryElement, "edqDataSetCode":edqDataSetCode});
	}
	window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= window.sfccConfig.edqAddressLine1Element;
	window.EdqConfig.GLOBAL_INTUITIVE_USE_CURRENT_LOCATION= window.sfccConfig.edqGlobalIntuitiveUseCurrentLocation;
	window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
		{
			field: window.sfccConfig.edqAddressLine1Element,
			elements: ["address.addressLine1"]
		},
		{
			field: window.sfccConfig.edqAddressLine2Element,
			elements: ["address.addressLine2"]
		},
		{
			field: window.sfccConfig.edqCityLineElement,
			elements: ["address.locality"]
		},
		{
			field: window.sfccConfig.edqStateLineElement,
			elements: ["address.province"]
		},
		{
			field: window.sfccConfig.edqPostalLineElement,
			elements: ["address.postalCode"]
		},
		{
			field: window.sfccConfig.edqDpvIndicator,
			elements: ['metadata.dpv.dpvIndicator']
		},
	];
	window.EdqConfig.AUTOCOMPLETION_SETTINGS= {
		cache: false
	};
	window.EdqConfig.GLOBAL_INTUITIVE_CALLBACK=function() {globalIntuitiveCallback(false)};
	window.EdqConfig.GLOBAL_INTUITIVE_AFTER_FORMAT_CHANGE=function() {changedAddress(true)};
}
interface GlobalIntuitiveSetCountryArgs {
	edqCountryElement: HTMLSelectElement;
	edqAddressLine1Element: HTMLInputElement;
	
}
/**
 * Will check if the country has a value when Global Intuitive has being used and set the Country value if this null.
 *
 *@param edqCountryElement - Contains the selector of the country input
 *@param edqAddressLine1Element - Contains the selector of the address line 1 input
 */
export function setCountryField(event, {edqCountryElement, edqAddressLine1Element}: GlobalIntuitiveSetCountryArgs) {
	setTimeout(function() {
		if (edqCountryElement !== null && edqCountryElement.value === "" && edqAddressLine1Element.hasAttribute("edq-metadata")) {
			edqCountryElement.value = countryAlpha2({"incomingCountryIso3":window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY})["key"];
		}
	}, 5000);
}
interface GlobalIntuitiveRemoveSuggestedBoxArgs {
	edqGlobalIntuitiveSuggestionsSelector: HTMLElement;
	
}
/** 
 * Browser autofill triggers Global Intuitive Suggestion box and proceed to the billing stage the suggestion address box doesn't dissapear.
 * For more information see Bug #142988
 *
 * @param edqGlobalIntuitiveSuggestionsSelector - Contains the selector ".edq-global-intuitive-address-suggestions"
 */
export function removeGlobalIntuitiveSuggestionBox({edqGlobalIntuitiveSuggestionsSelector}: GlobalIntuitiveRemoveSuggestedBoxArgs) {
	if ((edqGlobalIntuitiveSuggestionsSelector) 
			&& (edqGlobalIntuitiveSuggestionsSelector.style.display == "block")) {
		let edqGlobalIntuitiveSuggestionBox: HTMLElement = edqGlobalIntuitiveSuggestionsSelector;
		edqGlobalIntuitiveSuggestionBox.style.display = "none";
	}
}
interface GlobalIntuitiveCheckoutEventsArgs extends GlobalIntuitiveConfigArgs {
	reloadGIjs: boolean;
	edqGlobalIntuitiveUnicornJsPath: String;
	edqGlobalIntuitiveIntegrityKey: String;
}
/** 
 * In SFRA the checkout web page contains both billing and shipping in a single page controlled by JavaScript to hide/show elements. 
 * The setCheckoutFormEvents is intended to set all input address fields variables depending on the stage we are(billing/shipping); 
 * the selectors choose by this function just appear once the stage is completed; once we click on the selector the other will 
 * be going to the stage that we're selecting and the will continue the regular workflow.
 *
 * @param edqCountryElement - Contains the selector of the country input
 * @param reloadGIjs - Contains the value to reload Global Intuitive
 * @param edqGlobalIntuitiveUnicornJsPath - Contains the Global Intuitive url
 * @param edqGlobalIntuitiveIntegrityKey - Contains the Global Intuitive integrity key
 */
export function setCheckoutFormEvents({reloadGIjs, edqGlobalIntuitiveUnicornJsPath, edqGlobalIntuitiveIntegrityKey, vDefaultCountry, edqAuthorizationToken, edqDataSetUsage, edqDataSetCode, edqCountryElement, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}: GlobalIntuitiveCheckoutEventsArgs) {
	if (edqCountryElement != null) {
		if (edqCountryElement.value === "") { edqCountryElement.value = "US"; }
	}
	/**
	 * Autofill after selecting a suggested address is broken.
	 * By doing this we can refresh the configuration for Global Intuitive in Checkout stage; we can toogle between 
	 * shipping and billing address elements; since the webpage doesn't reload, all elements are controlled by js and css; 
	 * the listeners are set to refresh the configuration for Global Intuitive.
	 * For more information see Bug #125898.
	 */
	const setEventsForRegistration = function() {
		setEventsForListeners({"checkoutStage":"",
			"vDefaultCountry":vDefaultCountry,
			"edqAuthorizationToken":edqAuthorizationToken,
			"edqDataSetUsage":edqDataSetUsage,
			"edqDataSetCode":edqDataSetCode,
			"edqCountryElement":edqCountryElement,
			"edqAddressLine1Element":edqAddressLine1Element,
			"edqAddressLine2Element":edqAddressLine2Element,
			"edqCityLineElement":edqCityLineElement,
			"edqStateLineElement":edqStateLineElement,
			"edqPostalLineElement":edqPostalLineElement}); 
	};
	const setEventsForBilling = function() { 
		setEventsForListeners({"checkoutStage":"billing",
			"vDefaultCountry":vDefaultCountry,
			"edqAuthorizationToken":edqAuthorizationToken,
			"edqDataSetUsage":edqDataSetUsage,
			"edqDataSetCode":edqDataSetCode,
			"edqCountryElement":edqCountryElement,
			"edqAddressLine1Element":edqAddressLine1Element,
			"edqAddressLine2Element":edqAddressLine2Element,
			"edqCityLineElement":edqCityLineElement,
			"edqStateLineElement":edqStateLineElement,
			"edqPostalLineElement":edqPostalLineElement});
		if (reloadGIjs) {
			/** Autofill not working on billing address at all
			 * By doing this in the checkout stage for SFRA we can remove the global-intuitive-unicorn.js in order to force to reload all the content with 
			 * the new parameters that we're including, since the webpage doesn't do a refresh items we're not changing values 
			 * For more information see Bug #126164 */
			$("script[src=\"" + window.sfccConfig.edqGlobalIntuitiveUnicornJsPath + "\"]").remove();
			$("<script>").attr({
				src:window.sfccConfig.edqGlobalIntuitiveUnicornJsPath,
				integrity:edqGlobalIntuitiveIntegrityKey,
				crossorigin:"anonymous"
			}).appendTo("body");
			reloadGIjs = false;
			//window.sfccConfig.addressChanged = true;
		}
	};
	const setEventsForShipping = function(e: Event) { 
		setEventsForListeners({"checkoutStage":"shipping",
			"vDefaultCountry":vDefaultCountry,
			"edqAuthorizationToken":edqAuthorizationToken,
			"edqDataSetUsage":edqDataSetUsage,
			"edqDataSetCode":edqDataSetCode,
			"edqCountryElement":edqCountryElement,
			"edqAddressLine1Element":edqAddressLine1Element,
			"edqAddressLine2Element":edqAddressLine2Element,
			"edqCityLineElement":edqCityLineElement,
			"edqStateLineElement":edqStateLineElement,
			"edqPostalLineElement":edqPostalLineElement}); 
	};
	addEventOnElement({"selector":"#country", "event":"change", "fn":setEventsForRegistration});
	addEventOnElement({"selector":"[name=dwfrm_shipping_shippingAddress_addressFields_country]", "event":"change", "fn":setEventsForShipping});
	addEventOnElement({"selector":"[name=dwfrm_billing_addressFields_country]", "event":"change", "fn":setEventsForBilling});
	addEventOnElement({"selector":"#editShipping", "event":"click", "fn":setEventsForShipping});
	addEventOnElement({"selector":"[name=edqShippingAddAddress]", "event":"click", "fn":setEventsForShipping});
	addEventOnElement({"selector":"[name=edqShippingEditAddress]", "event":"click", "fn":setEventsForShipping});
	addEventOnElement({"selector":".address-selector-block", "event":"click", "fn":setEventsForBilling});
	addEventOnElement({"selector":"#dwfrm_billing", "event":"focus", "fn":setEventsForBilling});
	addEventOnElement({"selector":"[value=submit-shipping]", "event":"click", "fn":removeGlobalIntuitiveSuggestionBox});
}
interface GlobalIntuitiveSetEventsArgs extends GlobalIntuitiveConfigArgs {
	checkoutStage: string;
}
/**
 * Set the events for the checkout stage; if shipping stage is selected this function will set the events
 * for shipping and when the stage changes to billing the function will set the events for the billing stage.
 *
 * @param checkoutStage - Contains the stage(shipping/billing) for the checkout page in SFRA
 */
export function setEventsForListeners({checkoutStage, vDefaultCountry, edqAuthorizationToken, edqDataSetUsage, edqDataSetCode, edqCountryElement, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}: GlobalIntuitiveSetEventsArgs) {
	setEdqInputSelectors({"stageContentLocation":checkoutStage});
	
	edqSetGlobalIntuitiveConfiguration({vDefaultCountry, edqAuthorizationToken, edqDataSetUsage, edqDataSetCode, edqCountryElement, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}); /* fn() */
	addEventOnElement({"selector":"[name=" + edqAddressLine1Element.name + "]", "event":"keypress", "fn":function (e) {setCountryField(e, {"edqCountryElement":edqCountryElement, "edqAddressLine1Element":edqAddressLine1Element});}});
	addEventOnElement({"selector":"[name=" + edqAddressLine1Element.name + "]", "event":"mouseleave", "fn":function (e) {setCountryField(e, {"edqCountryElement":edqCountryElement, "edqAddressLine1Element":edqAddressLine1Element});}});
	addEventOnElement({"selector":"[name=" + edqAddressLine1Element.name + "]", "event":"mouseenter", "fn":function (e) {setCountryField(e, {"edqCountryElement":edqCountryElement, "edqAddressLine1Element":edqAddressLine1Element});}});
}
interface GlobalIntuitiveRemoveSuggestionsArgs {
	edqSuggestionBox: NodeListOf<Element>;
}
/**
 * Global Intuitive creating multiple elements of suggestion box
 * By doing this we remove all edq-verification-suggestion-box that are created; except the one we're using.
 * For more information see Bug #108100
 *
 * @param edqSuggestionBox - Contains the selector "#edq-verification-suggestion-box"
 */
export function removeMultipleEDQSuggestion({edqSuggestionBox}: GlobalIntuitiveRemoveSuggestionsArgs) {
	for (let i: number = 0; i < edqSuggestionBox.length; i++) {
		edqSuggestionBox[i].parentNode.removeChild(edqSuggestionBox[i]);
	}
}
export function changedAddress(changed) {
	window.sfccConfig.addressChanged = changed;
	if (changed) {
		buttonCssSeetings({"formSubmitButton":window.sfccConfig.edqCurrentSubmitButton, "edqCurrentSubmitButton":document.querySelector("#form-submit")});
	}
}
export function globalIntuitiveCallback(changed) {
	window.sfccConfig.addressChanged = changed;
	
	if (window.sfccConfig.edqDpvIndicator.value === 'Y') {
		buttonCssSeetings({"formSubmitButton":document.querySelector("#form-submit"), "edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton});
	}
	else {
		buttonCssSeetings({"formSubmitButton":window.sfccConfig.edqCurrentSubmitButton, "edqCurrentSubmitButton":document.querySelector("#form-submit")});
	}
}
interface GlobalIntuitiveDatasetArgs {
	vDefaultCountry: string;
	edqDataSetCode: string;
	edqCountryElement: HTMLSelectElement;
}
export function datasetSetCode({vDefaultCountry, edqCountryElement, edqDataSetCode}: GlobalIntuitiveDatasetArgs) {
	let noDataSet: string = "";
	let globalIntuitiveIsoCountry: string = vDefaultCountry;
	let dataSetCode: string = "";
	let countryDataSetCode: Array<any> = [];
	if (window.sfccConfig.edqCountryElement != null) {
		globalIntuitiveIsoCountry = window.sfccConfig.edqCountryElement.value.toUpperCase();
	}
	if (edqDataSetCode) {
		let datasetsCodes: Array<any> = edqDataSetCode.split(',');
		datasetsCodes.forEach(function(val) {
			let setKeyValue: Array<any> = val.split(':');
			countryDataSetCode.push({ key: setKeyValue[0], value: setKeyValue[1] });
		});
		let countryISO: string = countryAlpha3({"incomingCountryIso2":globalIntuitiveIsoCountry, "vDefaultCountry":vDefaultCountry});
		countryDataSetCode.forEach(function(val) { dataSetCode = (countryISO.match(val.key)) ? val.value : dataSetCode });
	}
	return dataSetCode || noDataSet;
}