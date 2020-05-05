import {countryAlpha3} from 'edqCountry.ts';
interface ProWebformButton {
	formSubmitButton: HTMLElement;
}
interface ProWebConfigArgs extends ProWebformButton {
	edqCurrentSubmitButton: HTMLElement;
	vDefaultCountry: string;
	edqAuthorizationToken: string;
	edqProWebAddressLayout: string;
	edqCountryElement: HTMLElement;
	edqAddressLine1Element: HTMLElement;
	edqAddressLine2Element: HTMLElement;
	edqCityLineElement: HTMLElement;
	edqStateLineElement: HTMLElement;
	edqPostalLineElement: HTMLElement;
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
	formSubmitButton.addEventListener("focus", edqEmailPhoneValidationCallback);
	let proWebIsoCountry: string = vDefaultCountry;
	if (edqCountryElement != null) {
		proWebIsoCountry = edqCountryElement.value;
	}
	window.EdqConfig.PRO_WEB_TIMEOUT = 3500;
	window.EdqConfig.PRO_WEB_AUTH_TOKEN = edqAuthorizationToken;
	window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS = [
		{
			type: "click",
			element: formSubmitButton,
		}
	];
	window.EdqConfig.PRO_WEB_LAYOUT=edqProWebAddressLayout;
	window.EdqConfig.PRO_WEB_COUNTRY=countryAlpha3(proWebIsoCountry);
	window.EdqConfig.PRO_WEB_CALLBACK="edqValidateAddressCallBack";
	window.EdqConfig.PRO_WEB_MAPPING=[
		{
			field: edqAddressLine1Element,
			elements: ["address.addressLine1"],
			modalFieldSelector:"#interaction-address--original-address-line-one",
		},
		{
			field: edqAddressLine2Element,
			elements: ["address.addressLine2"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-address-line-two",
		},
		{
			field: edqCityLineElement,
			elements: ["address.locality"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-locality",
		},
		{
			field: edqStateLineElement,
			elements: ["address.province"],
			modalFieldSelector:"#interaction-address--original-province",
		},
		{
			field: edqPostalLineElement,
			elements: ["address.postalCode"],
			modalFieldSelector:"#interaction-address--original-postal-code",
		},
    ];
}
interface ProWebTransitioCallbackbArgs {
	edqProWebMetaDataJSON: object;
	edqCustomCallbackName: String;
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
	let edqJsonParameter[:object] = [edqProWebMetaDataJSON];
	let edqCustomTransitionCallback:object = window[edqCustomFunctionName];
	try {
		if (typeof edqCustomTransitionCallback === "function") {
			return edqCustomTransitionCallback.apply(null, edqJsonParameter);
		} else return true;
	} catch(err) { return true; }
}
interface ProWebEventsForListenersArgs {
	checkoutStage: string;
	checkoutStageButton: HTMLElement;
}
/**
 * Manage the configuration in the checkout stage(Billing/Shipping) when the stage changes.
 * @param {String} checkoutStage
 * @param {String} checkoutStageButton
 */
export function setEventsForListenersProWeb({checkoutStage, checkoutStageButton}: ProWebEventsForListenersArgs) {
	edqCurrentSubmitButton = checkoutStageButton;
	setEdqInputSelectors({checkoutStage});
	buttonCssSeetings({formSubmitButton, edqCurrentSubmitButton});
	edqSetProWebConfiguration({formSubmitButton, vDefaultCountry, edqAuthorizationToken, edqCountryElement, edqProWebAddressLayout, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement});
}
interface ProWebCheckoutPageWorkflowArgs {
	edqCurrentSubmitButton: HTMLElement;
}
/**
 * Set the events depending the touchpoint (Shipping/Billing/Address) for Pro Web.
 */
export function edqCheckoutPageWorkflows({edqCurrentSubmitButton}: ProWebCheckoutPageWorkflowArgs) {
	/** 
	 * This is intended to hide the form button in initial load of the page; just to show verification engine button in the form.
	 */
	if (edqCurrentSubmitButton) {
		edqCurrentSubmitButton.style.display = "none";
	}
	/** 
	 * Potential misconfiguration of checkout process.
     * By doing this we can refresh the configuration for Pro Web in Checkout stage; we can toogle between 
	 * shipping and billing address elements; since the webpage doesn't reload, all elements are controlled by js and css; 
	 * the listeners are set to refresh the configuration for Pro Web. 
	 * For more information refer to task #101727.
	 */
	const setEventsForRegistrationStage = function() { this.setEventsForListenersProWeb("", "[name=save]"); };
	const setEventsForBillingStage = function() { this.setEventsForListenersProWeb("billing", "[value=submit-payment]"); };
	const setEventsForShippingStage = function() { this.setEventsForListenersProWeb("shipping", "[value=submit-shipping]"); };
	addEventOnElement("#country", "change", setEventsForRegistrationStage);
	addEventOnElement("#editShipping", "mousedown", setEventsForShippingStage);
	addEventOnElement(".shipping-address-block", "click", setEventsForShippingStage);
	addEventOnElement("#editPayment", "mousedown", setEventsForBillingStage);
	addEventOnElement(".billing-address", "click", setEventsForBillingStage);
	addEventOnElement("#dwfrm_billing", "focus", setEventsForBillingStage);
	
}
interface ProWebCallbackbArgs extends ProWebformButton {
	edqStateLineElement: HTMLElement;
	edqProWebCallbackValidation: boolean;
}
/**
 * Pro Web Address Verification callback
 *
 * @param formSubmitButton - Contains the form submit created by the cartridge
 * @param edqStateLineElement - Contains the selector of the state line input
 */
export function edqValidateAddressCallBack({formSubmitButton, edqStateLineElement, edqProWebCallbackValidation}: ProWebCallbackbArgs) {
	let edqProWebMetaDataJSON: object;
	let edqProWebResponse: HTMLElement = formSubmitButton;
	if (edqProWebResponse.getAttribute("edq-metadata")) {
		edqProWebMetaDataJSON = JSON.parse(edqProWebResponse.getAttribute("edq-metadata"));
		edqStateLineElement.value = edqProWebMetaDataJSON["address.province"];
		formSubmitButton.removeAttribute("edq-metadata");
	}
	if (edqProWebCallbackValidation) {
		if (this.edqProWebExecuteTransitionCallBack(edqProWebMetaDataJSON)) {
			this.buttonCssSeetings();
		}
	} else { this.buttonCssSeetings(); }
}
interface ButtonCssSettingsArgs extends ProWebformButton {
	edqCurrentSubmitButton: HTMLElement;
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
		edqCurrentSubmitButton.click();
}