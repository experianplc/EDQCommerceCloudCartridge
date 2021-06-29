import {countryAlpha3} from './edqCountry';
import {addEventOnElement, edqEmailPhoneValidationCallback, enableButtonDisable} from './edq-utils';
import {setEdqInputSelectors} from '../sfra';

interface ProWebformButton {
	formSubmitButton: HTMLButtonElement;
}
interface ProWebConfigArgs extends ProWebformButton {
	vDefaultCountry: string;
	edqAuthorizationToken: string;
	edqProWebAddressLayout: string;
	edqCountryElement: HTMLSelectElement;
	edqAddressLine1Element: HTMLInputElement;
	edqAddressLine2Element: HTMLInputElement;
	edqCityLineElement: HTMLInputElement;
	edqStateLineElement: HTMLSelectElement;
	edqPostalLineElement: HTMLInputElement;
}
/**
 * Pro Web - Address (Verification Engine)
 * Sets the configuration to use Pro Web - Address (Verification Engine)
 *
 * @param formSubmitButton - Contains the form submit created by the cartridge
 * @param vDefaultCountry - Contains the default country value provided by the store configuration
 * @param edqAuthorizationToken - Contains the Pro Web authorization token for the Email Validate API
 * @param edqCountryElement - Contains the selector of the country input
 * @param edqProWebAddressLayout - Contains the layout to be used
 * @param edqAddressLine1Element - Contains the selector of the address line 1 input
 * @param edqAddressLine2Element - Contains the selector of the address line 2 input
 * @param edqCityLineElement - Contains the selector of the city line input
 * @param edqStateLineElement - Contains the selector of the state line input
 * @param edqPostalLineElement - Contains the selector of the postal code input
 */
export function edqSetProWebConfiguration({formSubmitButton, vDefaultCountry, edqAuthorizationToken, edqCountryElement, edqProWebAddressLayout, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}: ProWebConfigArgs) {
	let proWebIsoCountry: string = vDefaultCountry;
	if (edqCountryElement != null) {
		proWebIsoCountry = edqCountryElement.value.toUpperCase();
	}
	window.EdqConfig.PRO_WEB_TIMEOUT = '3500';
	window.EdqConfig.PRO_WEB_AUTH_TOKEN = edqAuthorizationToken;
	window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS = [
		{
			type: "click",
			element: formSubmitButton,
		}
	];
	window.EdqConfig.PRO_WEB_LAYOUT=edqProWebAddressLayout;
	window.EdqConfig.PRO_WEB_COUNTRY=countryAlpha3({"incomingCountryIso2":proWebIsoCountry, "vDefaultCountry":vDefaultCountry});
	window.EdqConfig.PRO_WEB_CALLBACK=window.sfccConfig.edqProWebCallback;
	window.EdqConfig.PRO_WEB_MAPPING=[
		{
			field: window.sfccConfig.edqAddressLine1Element,
			elements: ["address.addressLine1"],
			modalFieldSelector:"#interaction-address--original-address-line-one",
		},
		{
			field: window.sfccConfig.edqAddressLine2Element,
			elements: ["address.addressLine2"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-address-line-two",
		},
		{
			field: window.sfccConfig.edqCityLineElement,
			elements: ["address.locality"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-locality",
		},
		{
			field: window.sfccConfig.edqStateLineElement,
			elements: ["address.province"],
			modalFieldSelector:"#interaction-address--original-province",
		},
		{
			field: window.sfccConfig.edqPostalLineElement,
			elements: ["address.postalCode"],
			modalFieldSelector:"#interaction-address--original-postal-code",
		},
    ];
	window.EdqConfig.VERIFICATION_MODAL_OVERRIDES= {
		modalHeader: {
			updated:window.sfccConfig.headerUpdateAddressText,
			unverified:window.sfccConfig.headerUnverifiedAddressText,
		},
		interactionRequired: {
			updatedAddressHeader:window.sfccConfig.headerInteractionUpdateAddressText,
			originalAddressHeader:window.sfccConfig.labelOriginalAddressText,
			useOriginalAddress:window.sfccConfig.labelUseOriginalAddressText,
			useUpdatedAddress:window.sfccConfig.labelUseUpdatedAddressText,
			searchPlaceholder:window.sfccConfig.searchPlaceHolderAddressText,
		}
	};
}
interface ProWebTransitioCallbackbArgs {
	edqProWebMetaDataJSON: object;
	edqCustomCallbackName: string;
}
/**
 * Will manage custom code from the client to verify the results from Pro Web Address Verification callback.
 *
 * @param edqProWebMetaDataJSON - Contains all the information form the attribute "edq-metadata"
 *
 * @returns boolean
 */
export function edqProWebExecuteTransitionCallBack({edqProWebMetaDataJSON, edqCustomCallbackName}: ProWebTransitioCallbackbArgs) { 
	let edqCustomFunctionName: string = edqCustomCallbackName;
	let edqJsonParameter: object[] = [edqProWebMetaDataJSON];
	let edqCustomTransitionCallback:object = window[edqCustomFunctionName];
	try {
		if (typeof edqCustomTransitionCallback === "function") {
			return edqCustomTransitionCallback.apply(null, edqJsonParameter);
		} else return true;
	} catch(err) { return true; }
}
interface ProWebEventsForListenersArgs extends ProWebConfigArgs {
	checkoutStage: string;
	edqCurrentSubmitButton: HTMLButtonElement;
}
/**
 * Manage the configuration in the checkout stage(Billing/Shipping) when the stage changes.
 * @param {string} checkoutStage
 * @param {string} edqCurrentSubmitButton
 */
export function setEventsForListenersProWeb({checkoutStage, edqCurrentSubmitButton, formSubmitButton, vDefaultCountry, edqAuthorizationToken, edqCountryElement, edqProWebAddressLayout, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement}: ProWebEventsForListenersArgs) {
	setEdqInputSelectors({"stageContentLocation":checkoutStage});
	buttonCssSeetings({"formSubmitButton":window.sfccConfig.edqCurrentSubmitButton, "edqCurrentSubmitButton":formSubmitButton});
	edqSetProWebConfiguration({"formSubmitButton":formSubmitButton, 
		"vDefaultCountry":vDefaultCountry, 
		"edqAuthorizationToken":edqAuthorizationToken, 
		"edqCountryElement":edqCountryElement, 
		"edqProWebAddressLayout":edqProWebAddressLayout, 
		"edqAddressLine1Element":edqAddressLine1Element, 
		"edqAddressLine2Element":edqAddressLine2Element, 
		"edqCityLineElement":edqCityLineElement, 
		"edqStateLineElement":edqStateLineElement, 
		"edqPostalLineElement":edqPostalLineElement});
}
interface ProWebCheckoutPageWorkflowArgs extends ProWebConfigArgs {
	edqCurrentSubmitButton: HTMLButtonElement;
}
/**
 * Set the events depending the touchpoint (Shipping/Billing/Address) for Pro Web.
 */
export function edqCheckoutPageWorkflows({edqCurrentSubmitButton, 
	formSubmitButton,
	vDefaultCountry,
	edqAuthorizationToken,
	edqCountryElement,
	edqProWebAddressLayout,
	edqAddressLine1Element,
	edqAddressLine2Element,
	edqCityLineElement,
	edqStateLineElement,
	edqPostalLineElement}: ProWebCheckoutPageWorkflowArgs) {
	/** 
	 * This is intended to hide the form button in initial load of the page; just to show verification engine button in the form.
	 */
	if (window.sfccConfig.edqCurrentSubmitButton) {
		window.sfccConfig.edqCurrentSubmitButton.style.display = "none";
	}
	/** 
	 * Potential misconfiguration of checkout process.
     * By doing this we can refresh the configuration for Pro Web in Checkout stage; we can toogle between 
	 * shipping and billing address elements; since the webpage doesn't reload, all elements are controlled by js and css; 
	 * the listeners are set to refresh the configuration for Pro Web. 
	 * For more information refer to task #101727.
	 */
	const setEventsForRegistrationStage = function() { 
		setEventsForListenersProWeb({"checkoutStage":"",
			"edqCurrentSubmitButton":document.querySelector("[name=save]"),
			"formSubmitButton":formSubmitButton, 
			"vDefaultCountry":vDefaultCountry, 
			"edqAuthorizationToken":edqAuthorizationToken, 
			"edqCountryElement":edqCountryElement, 
			"edqProWebAddressLayout":edqProWebAddressLayout, 
			"edqAddressLine1Element":edqAddressLine1Element, 
			"edqAddressLine2Element":edqAddressLine2Element, 
			"edqCityLineElement":edqCityLineElement, 
			"edqStateLineElement":edqStateLineElement, 
			"edqPostalLineElement":edqPostalLineElement}); 
	};
	const setEventsForBillingStage = function() {
		setEventsForListenersProWeb({"checkoutStage":"billing",
			"edqCurrentSubmitButton":document.querySelector("[value=submit-payment]"),
			"formSubmitButton":formSubmitButton, 
			"vDefaultCountry":vDefaultCountry, 
			"edqAuthorizationToken":edqAuthorizationToken, 
			"edqCountryElement":edqCountryElement, 
			"edqProWebAddressLayout":edqProWebAddressLayout, 
			"edqAddressLine1Element":edqAddressLine1Element, 
			"edqAddressLine2Element":edqAddressLine2Element, 
			"edqCityLineElement":edqCityLineElement, 
			"edqStateLineElement":edqStateLineElement, 
			"edqPostalLineElement":edqPostalLineElement});
	};
	const setEventsForShippingStage = function() {
		enableButtonDisable({"buttonToDisable":document.querySelector("[value=submit-shipping]"), "buttonStatus":false, "formSubmitButton":formSubmitButton});
		setEventsForListenersProWeb({"checkoutStage":"shipping",
			"edqCurrentSubmitButton":document.querySelector("[value=submit-shipping]"),
			"formSubmitButton":formSubmitButton, 
			"vDefaultCountry":vDefaultCountry, 
			"edqAuthorizationToken":edqAuthorizationToken, 
			"edqCountryElement":edqCountryElement, 
			"edqProWebAddressLayout":edqProWebAddressLayout, 
			"edqAddressLine1Element":edqAddressLine1Element, 
			"edqAddressLine2Element":edqAddressLine2Element, 
			"edqCityLineElement":edqCityLineElement, 
			"edqStateLineElement":edqStateLineElement, 
			"edqPostalLineElement":edqPostalLineElement});
	};
	addEventOnElement({"selector":"#country", "event":"change", "fn":setEventsForRegistrationStage});
	addEventOnElement({"selector":"#editShipping", "event":"mousedown", "fn":setEventsForShippingStage});
	addEventOnElement({"selector":".shipping-address-block", "event":"click", "fn":setEventsForShippingStage});
	addEventOnElement({"selector":"#editPayment", "event":"mousedown", "fn":setEventsForBillingStage});
	addEventOnElement({"selector":".billing-address", "event":"click", "fn":setEventsForBillingStage});
	addEventOnElement({"selector":"#dwfrm_billing", "event":"focus", "fn":setEventsForBillingStage});
}
interface ProWebCallbackbArgs extends ProWebformButton {
	edqStateLineElement: HTMLSelectElement;
	edqProWebCallbackValidation: boolean;
	edqCustomCallbackName: string;
	edqCurrentSubmitButton: HTMLButtonElement;
}
/**
 * Pro Web Address Verification callback
 *
 * @param formSubmitButton - Contains the form submit created by the cartridge
 * @param edqStateLineElement - Contains the selector of the state line input
 */
export function edqValidateAddressCallBack({formSubmitButton, edqStateLineElement, edqProWebCallbackValidation, edqCustomCallbackName, edqCurrentSubmitButton}: ProWebCallbackbArgs) {
	let edqProWebMetaDataJSON: object;
	let edqProWebResponse: HTMLButtonElement = formSubmitButton;
	if (edqProWebResponse.getAttribute("edq-metadata")) {
		edqProWebMetaDataJSON = JSON.parse(edqProWebResponse.getAttribute("edq-metadata"));
		edqStateLineElement.value = edqProWebMetaDataJSON["address.province"];
		formSubmitButton.removeAttribute("edq-metadata");
	}
	if (edqProWebCallbackValidation) {
		if (edqProWebExecuteTransitionCallBack({edqProWebMetaDataJSON, edqCustomCallbackName})) {
			buttonCssSeetings({"formSubmitButton":formSubmitButton, "edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton});
			window.sfccConfig.edqCurrentSubmitButton.click();
		}
	} else {
		buttonCssSeetings({"formSubmitButton":formSubmitButton, "edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton});
		window.sfccConfig.edqCurrentSubmitButton.click();
	}
}
interface ButtonCssSettingsArgs extends ProWebformButton {
	edqCurrentSubmitButton: HTMLButtonElement;
}
/**
 * Manage the button settings for the Button "form-submit", depending on the touchpoint.
 *
 * @param formSubmitButton - Contains the form submit created by the cartridge
 * @param edqCurrentSubmitButton - Contains the current submit page button 
 */
export function buttonCssSeetings({formSubmitButton, edqCurrentSubmitButton}: ButtonCssSettingsArgs) {
	formSubmitButton.style.display = "none";
	edqCurrentSubmitButton.style.display = "block";
	edqCurrentSubmitButton.removeAttribute("style");
}
