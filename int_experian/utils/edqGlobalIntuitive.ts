import {countryAlpha3} from 'edqCountry.ts';
import {enableButtonDisable} from 'edq-utils.ts';
import {addEventOnElement} from 'edq-utils.ts';
import {setEdqInputSelectors} from 'sfraIntegration.ts';

interface GlobalIntuitiveConfigArgs {
	vDefaultCountry: string;
	edqAuthorizationToken: string;
	edqDataSetCode: string;
	edqCountryElement: HTMLElement;
	edqAddressLine1Element: HTMLElement;
	edqAddressLine2Element: HTMLElement;
	edqCityLineElement: HTMLElement;
	edqStateLineElement: HTMLElement;
	edqPostalLineElement: HTMLElement;
	
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
export function edqSetGlobalIntuitiveConfiguration({vDefaultCountry, edqAuthorizationToken, edqDataSetCode, edqCountryElement, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}: GlobalIntuitiveConfigArgs) {
	let globalIntuitiveIsoCountry: string = vDefaultCountry;
	if (edqCountryElement != null) {
		globalIntuitiveIsoCountry = edqCountryElement.value;
	}
	window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN = edqAuthorizationToken;
	window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY = countryAlpha3(globalIntuitiveIsoCountry);
	/**
	 * Configuration option to include Data Sets for Global Intuitive.
	 * For more information refer to feature #118583.
	 */
	if (edqDataSetUsage) { 
		window.EdqConfig.GLOBAL_INTUITIVE_DATASET = edqDataSetCode; 
	}
	window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT= edqAddressLine1Element;
	window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
		{
			field: edqAddressLine1Element,
			elements: ["address.addressLine1"]
		},
		{
			field: edqAddressLine2Element,
			elements: ["address.addressLine2"]
		},
		{
			field: edqCityLineElement,
			elements: ["address.locality"]
		},
		{
			field: edqStateLineElement,
			elements: ["address.province"]
		},
		{
			field: edqPostalLineElement,
			elements: ["address.postalCode"]
		},
	];
}
interface GlobalIntuitiveSetCountryArgs {
	edqCountryElement: HTMLElement;
	edqAddressLine1Element: HTMLElement;
	
}
/**
 * Will check if the country has a value when Global Intuitive has being used and set the Country value if this null.
 *
 *@param edqCountryElement - Contains the selector of the country input
 *@param edqAddressLine1Element - Contains the selector of the address line 1 input
 */
export function setCountryField({edqCountryElement, edqAddressLine1Element}: GlobalIntuitiveSetCountryArgs) {
	setTimeout(function() {
		if (edqCountryElement !== null && edqCountryElement.value === "" && edqAddressLine1Element.hasAttribute("edq-metadata")) {
			edqCountryElement.value = countryAlpha2(window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY)["key"];
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
interface GlobalIntuitiveCheckoutEventsArgs {
	edqCountryElement: HTMLElement;
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
export function setCheckoutFormEvents({edqCountryElement, reloadGIjs, edqGlobalIntuitiveUnicornJsPath, edqGlobalIntuitiveIntegrityKey}: GlobalIntuitiveCheckoutEventsArgs) {
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
	const setEventsForRegistration = function() { setEventsForListeners(); };
	const setEventsForBilling = function() { 
		setEventsForListeners("billing");
		if (reloadGIjs) {
			/** Autofill not working on billing address at all
			 * By doing this in the checkout stage for SFRA we can remove the global-intuitive-unicorn.js in order to force to reload all the content with 
			 * the new parameters that we're including, since the webpage doesn't do a refresh items we're not changing values 
			 * For more information see Bug #126164 */
			$("script[src=\"" + edqGlobalIntuitiveUnicornJsPath + "\"]").remove();
			$("<script>").attr({
				src:edqGlobalIntuitiveUnicornJsPath,
				integrity:edqGlobalIntuitiveIntegrityKey,
				crossorigin:"anonymous"
			}).appendTo("body");
			reloadGIjs = false;
		}
	};
	const setEventsForShipping = function() { setEventsForListeners("shipping"); };
	addEventOnElement("#country", "change", setEventsForRegistration);
	addEventOnElement("[name=dwfrm_shipping_shippingAddress_addressFields_country]", "change", setEventsForShipping);
	addEventOnElement("[name=dwfrm_billing_addressFields_country]", "change", setEventsForBilling);
	addEventOnElement("#editShipping", "click", setEventsForShipping);
	addEventOnElement("[name=edqShippingAddAddress]", "click", setEventsForShipping);
	addEventOnElement("[name=edqShippingEditAddress]", "click", setEventsForShipping);
	addEventOnElement(".address-selector-block", "click", setEventsForBilling);
	addEventOnElement("#dwfrm_billing", "focus", setEventsForBilling);
	addEventOnElement("[value=submit-shipping]", "click", removeGlobalIntuitiveSuggestionBox);
}
interface GlobalIntuitiveSetEventsArgs {
	checkoutStage: String;
	edqAddressLine1Element: HTMLElement;
}
/**
 * Set the events for the checkout stage; if shipping stage is selected this function will set the events
 * for shipping and when the stage changes to billing the function will set the events for the billing stage.
 *
 * @param checkoutStage - Contains the stage(shipping/billing) for the checkout page in SFRA
 */
export function setEventsForListeners({checkoutStage, edqAddressLine1Element}: GlobalIntuitiveSetEventsArgs) {
	setEdqInputSelectors(checkoutStage);
	
	this.edqSetGlobalIntuitiveConfiguration(); /* fn() */
	addEventOnElement("[name=" + edqAddressLine1Element.name + "]", "keypress", setCountryField);
	addEventOnElement("[name=" + edqAddressLine1Element.name + "]", "mouseleave", setCountryField);
	addEventOnElement("[name=" + edqAddressLine1Element.name + "]", "mouseenter", setCountryField);
}
interface GlobalIntuitiveRemoveSuggestionsArgs {
	edqSuggestionBox: HTMLElement;
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
		edqSuggestionBox.parentNode.removeChild(edqSuggestionBox);
	}
}