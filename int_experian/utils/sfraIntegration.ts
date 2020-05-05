/*global EDQ*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/* exported edqSetEmailValidationConfiguration edqSetPhoneValidationConfiguration setCheckoutFormEvents edqValidateAddressCallBack edqCheckoutPageWorkflows */
import {edqSetPhoneValidationConfiguration} from 'edqPhoneValidation.ts';
import {edqSetEmailValidationConfiguration} from 'edqEmailValidation.ts';
import {edqSetGlobalIntuitiveConfiguration} from 'edqGlobalIntuitive.ts';
import {setCheckoutFormEvents} from 'edqGlobalIntuitive.ts';
import {removeMultipleEDQSuggestion} from 'edqGlobalIntuitive.ts';
import {edqCheckoutPageWorkflows} from 'edqProWebVerification.ts';
import {edqSetProWebConfiguration} from 'edqProWebVerification.ts';
import {edqEmailPhoneValidationCallback} from 'edq-utils.ts';
import {enableButtonDisable} from 'edq-utils.ts';

let vDefaultCountry: string;
let edqAddressLine1Element: HTMLElement;
let edqAddressLine2Element: HTMLElement;
let edqCityLineElement: HTMLElement;
let edqPostalLineElement: HTMLElement;
let edqStateLineElement: HTMLElement;
let edqCountryLineElement: HTMLElement;
let edqEmailLineElement: HTMLElement;
let edqPhoneLineElements[: HTMLElement] = [];
let edqCurrentSubmitButton: HTMLElement;
let edqEmailEnable: boolean;
let edqPhoneEnable: boolean;
let edqValidateEmail: boolean;
let edqValidatePhone: boolean;
let edqAuthorizationToken: string;
let edqProWebAddressLayout: string;
let edqDataSetUsage: boolean;
let edqDataSetCode: string;
let edqProWebCallbackValidation: boolean;
let edqCustomCallbackName: string;
let edqGlobalIntuitiveUnicornJsPath: string;
let reloadGIjs: boolean = true;
let pageRestrictValidation: boolean = true;
let inputSelector = document.querySelectorAll("input[id]");
let buttonSelector = document.querySelectorAll("button[name]");
window.EdqConfig = window.EdqConfig || {};

/** 
 * Set values for the input selectors depending on the touchpoint (Address/Billing/Shipping).
 * @param {string} stageContentLocation
 */
function setEdqInputSelectors(stageContentLocation) {
	/** 
	 * In SFRA the checkout web page contains both billing and shipping address input fields in a single page controlled by JavaScripts to hide/show elements.
	 * The stageContentLocation variable is intended to specify the stage(billing/shipping) of the checkout web page to set the proper input address fields 
	 * that we require to set them for billing or shipping address fields, since is they're set in the same web page we need to change its value to use them in the next step.
	 */
	stageContentLocation = stageContentLocation || "";
	if (stageContentLocation === "shipping") {
		edqAddressLine1Id = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_address1]");
		edqAddressLine2Id = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_address2]");
		edqCityLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_city]");
		edqPostalLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_postalCode]");
		edqStateLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_states_stateCode]");
		edqCountryLineId = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_country]");
	} else if (stageContentLocation === "billing") {
		edqAddressLine1Id = document.querySelector("#billingAddressOne");
		edqAddressLine2Id = document.querySelector("#billingAddressTwo");
		edqCityLineId = document.querySelector("#billingAddressCity");
		edqPostalLineId = document.querySelector("#billingZipCode");
		edqStateLineId = document.querySelector("#billingState");
		edqCountryLineId = document.querySelector("#billingCountry");
	} else {
		edqAddressLine1Id = document.querySelector("#address1");
		edqAddressLine2Id = document.querySelector("#address2");
		edqCityLineId = document.querySelector("#city");
		edqPostalLineId = document.querySelector("#zipCode");
		edqStateLineId = document.querySelector("#state");
		edqCountryLineId = document.querySelector("#country");
	}
	for (let i: number = 0; i < inputSelector.length; i++) {
		if (inputSelector[i].id.toLowerCase().match(/phone/)) { edqPhoneLineSelectors.push(inputSelector[i]); }
		edqEmailLineSelector = ((inputSelector[i].id == "registration-form-email") || (inputSelector[i].id == "email")) ? inputSelector[i] : edqEmailLineSelector;
	}
}
for (let i: number = 0; i < buttonSelector.length; i++) {
	/** In SFRA the checkout web page contains both billing and shipping process so we have to set the button we need so 
	 * this part is intended to find out the submit button for the checkout web page; in this page there are 3 submit buttons 
	 * with the label name=submit; so for this page the only way to distinguish them is for the label value; this case is just for initial load.
	 */
	if (window.location.href.toLowerCase().match(/checkout/)) {
		if (buttonSelector[i].hasAttribute("value")) {
			edqCurrentSubmitButton = (buttonSelector[i].value.toLowerCase().match(/shipping/)) ? buttonSelector[i] : edqCurrentSubmitButton;
			buttonSelector[i].addEventListener("focus", edqEmailPhoneValidationCallback);
		}
	} else {
		edqCurrentSubmitButton = (buttonSelector[i].name.toLowerCase().match(/save/)) ? buttonSelector[i] : edqCurrentSubmitButton;
		buttonSelector[i].addEventListener("focus", edqEmailPhoneValidationCallback);
	}
}
/**
 * This window.location is intended to specify the input address fields that we require when we get to the checkout web page for initial load.
 */
if (window.location.href.toLowerCase().match(/checkout/)) {
	setEdqInputSelectors("shipping");
} else {
	setEdqInputSelectors();
}
if (edqEmailLineSelector) {
	edqEmailLineSelector.addEventListener("focus", function() {
		enableButtonDisable(edqCurrentSubmitButton, false, document.querySelector("#form-submit")); pageRestrictValidation = true;
	}); 
}
if (edqPhoneLineSelectors) {
	edqPhoneLineSelectors.forEach(function(phoneSelector) {
		phoneSelector.addEventListener("focus", function() {
			enableButtonDisable(edqCurrentSubmitButton, false, document.querySelector("#form-submit")); pageRestrictValidation = true;
		});
	}); 
}
/**
 * Email validation
 * Sets the configuration to use Email Validate
 */
edqSetEmailValidationConfiguration({edqAuthorizationToken, edqEmailLineElement});

/**
 * Phone validation
 * Sets the configuration to use Global Phone Validate
 */
edqSetPhoneValidationConfiguration({edqAuthorizationToken, edqPhoneLineElements});

/**
 * Global Intuitive
 * Sets the configuration to use Global Intuitive
 */
edqSetGlobalIntuitiveConfiguration({vDefaultCountry, edqAuthorizationToken, edqDataSetCode, edqCountryElement, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement});
setCheckoutFormEvents({edqCountryElement, reloadGIjs, edqGlobalIntuitiveUnicornJsPath, edqGlobalIntuitiveIntegrityKey});
removeMultipleEDQSuggestion({edqSuggestionBox});

/**
 * Pro Web Address Verification callback
 */
edqCheckoutPageWorkflows({edqCurrentSubmitButton});
edqSetProWebConfiguration({formSubmitButton, vDefaultCountry, edqAuthorizationToken, edqCountryElement, edqProWebAddressLayout, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement});
