/*global EDQ*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/* exported edqSetEmailValidationConfiguration edqSetPhoneValidationConfiguration setCheckoutFormEvents edqValidateAddressCallBack edqCheckoutPageWorkflows */
import {edqSetPhoneValidationConfiguration} from './utils/edqPhoneValidation';
import {edqSetEmailValidationConfiguration} from './utils/edqEmailValidation';
import {edqSetGlobalIntuitiveConfiguration} from './utils/edqGlobalIntuitive';
import {setCheckoutFormEvents} from './utils/edqGlobalIntuitive';
import {removeMultipleEDQSuggestion} from './utils/edqGlobalIntuitive';
import {edqCheckoutPageWorkflows} from './utils/edqProWebVerification';
import {edqSetProWebConfiguration} from './utils/edqProWebVerification';
import {edqValidateAddressCallBack} from './utils/edqProWebVerification';
import {edqEmailPhoneValidationCallback, enableButtonDisable, addEventOnElement} from './utils/edq-utils';

let SfccConfig = <SfccConfigObject>{};
window.sfccConfig = window.sfccConfig || SfccConfig;

let vDefaultCountry: string;
let edqAddressLine1Element: HTMLInputElement;
let edqAddressLine2Element: HTMLInputElement;
let edqCityLineElement: HTMLInputElement;
let edqPostalLineElement: HTMLInputElement;
let edqStateLineElement: HTMLSelectElement;
let edqCountryElement: HTMLSelectElement;
let edqEmailLineElement: HTMLInputElement;
let edqPhoneLineElements: HTMLInputElement[] = [];
let edqCurrentSubmitButton: HTMLButtonElement;
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
let edqGlobalIntuitiveStaging: string;
let inputSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[id]");
let buttonSelector: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button[name]");
//let edqGlobalIntuitiveIntegrityKey: string = "sha512-xFGoFNir1GoNu0BffGlDOUr8iwdF8Uw9iRbCp5DBIGY3/4yy6OEOPBW9J3p5magoTY6OnY/BBNZZaakhozJMxQ==";
let edqGlobalIntuitiveIntegrityKey: string;
let edqGlobalIntuitiveUseCurrentLocation: boolean;

let edqConfig = <EdqConfigObject>{};
window.EdqConfig = window.EdqConfig || edqConfig;

window.sfccConfig.edqPhoneLineElements = [];

window.sfccConfig.pageRestrictValidation = true;
/** 
 * Set values for the input selectors depending on the touchpoint (Address/Billing/Shipping).
 * @param {string} stageContentLocation
 */
export function setEdqInputSelectors({stageContentLocation}) {
	/** 
	 * In SFRA the checkout web page contains both billing and shipping address input fields in a single page controlled by JavaScripts to hide/show elements.
	 * The stageContentLocation variable is intended to specify the stage(billing/shipping) of the checkout web page to set the proper input address fields 
	 * that we require to set them for billing or shipping address fields, since is they're set in the same web page we need to change its value to use them in the next step.
	 */
	stageContentLocation = stageContentLocation || "";
	if (stageContentLocation === "shipping") {
		window.sfccConfig.edqAddressLine1Element = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_address1]");
		window.sfccConfig.edqAddressLine2Element = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_address2]");
		window.sfccConfig.edqCityLineElement = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_city]");
		window.sfccConfig.edqPostalLineElement = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_postalCode]");
		window.sfccConfig.edqStateLineElement = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_states_stateCode]");
		window.sfccConfig.edqCountryElement = document.querySelector("[name=dwfrm_shipping_shippingAddress_addressFields_country]");
		window.sfccConfig.edqCurrentSubmitButton = document.querySelector("[value=submit-shipping]");
	} else if (stageContentLocation === "billing") {
		window.sfccConfig.edqAddressLine1Element = document.querySelector("#billingAddressOne");
		window.sfccConfig.edqAddressLine2Element = document.querySelector("#billingAddressTwo");
		window.sfccConfig.edqCityLineElement = document.querySelector("#billingAddressCity");
		window.sfccConfig.edqPostalLineElement = document.querySelector("#billingZipCode");
		window.sfccConfig.edqStateLineElement = document.querySelector("#billingState");
		window.sfccConfig.edqCountryElement = document.querySelector("#billingCountry");
		window.sfccConfig.edqCurrentSubmitButton = document.querySelector("[value=submit-payment]");
	} else {
		window.sfccConfig.edqAddressLine1Element = document.querySelector("#address1");
		window.sfccConfig.edqAddressLine2Element = document.querySelector("#address2");
		window.sfccConfig.edqCityLineElement = document.querySelector("#city");
		window.sfccConfig.edqPostalLineElement = document.querySelector("#zipCode");
		window.sfccConfig.edqStateLineElement = document.querySelector("#state");
		window.sfccConfig.edqCountryElement = document.querySelector("#country");
	}
	for (let i: number = 0; i < inputSelector.length; i++) {
		if (inputSelector[i].id.toLowerCase().match(/phone/)) { window.sfccConfig.edqPhoneLineElements.push(inputSelector[i]); }
		window.sfccConfig.edqEmailLineElement = ((inputSelector[i].id == "registration-form-email") || (inputSelector[i].id == "email")) ? inputSelector[i] : window.sfccConfig.edqEmailLineElement;
	}
}

export function sfraUtilsConfiguration() {
	let setEmailPhoneCallback = function () {
		edqEmailPhoneValidationCallback({
			"edqEmailEnable":edqEmailEnable,
			"edqEmailLineElement":window.sfccConfig.edqEmailLineElement,
			"edqPhoneEnable":edqPhoneEnable,
			"edqPhoneLineElements":window.sfccConfig.edqPhoneLineElements,
			"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
			"edqValidateEmail":edqValidateEmail,
			"edqValidatePhone":edqValidatePhone,
			"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
		})
	};
	let setEnableButtonDisable = function() {
		enableButtonDisable({
			"buttonToDisable":window.sfccConfig.edqCurrentSubmitButton,
			"buttonStatus":false,
			"formSubmitButton":document.querySelector("#form-submit")
		});
		window.sfccConfig.pageRestrictValidation = true;
	};
	
	for (let i: number = 0; i < buttonSelector.length; i++) {
		/** In SFRA the checkout web page contains both billing and shipping process so we have to set the button we need so 
		 * this part is intended to find out the submit button for the checkout web page; in this page there are 3 submit buttons 
		 * with the label name=submit; so for this page the only way to distinguish them is for the label value; this case is just for initial load.
		 */
		if (window.location.href.toLowerCase().match(/checkout/)) {
			if (buttonSelector[i].hasAttribute("value")) {
				window.sfccConfig.edqCurrentSubmitButton = (buttonSelector[i].value.toLowerCase().match(/shipping/)) ? buttonSelector[i] : window.sfccConfig.edqCurrentSubmitButton;
				if (window.sfccConfig.edqCurrentSubmitButton) {
					addEventOnElement({"selector":"[value=" + window.sfccConfig.edqCurrentSubmitButton.value + "]", "event":"focus", "fn":setEmailPhoneCallback});
				}
				if (buttonSelector[i].value.toLowerCase() === "submit-payment") {
					addEventOnElement({"selector":"[value=submit-payment]", "event":"focus", "fn":setEmailPhoneCallback});
				}
			}
		} else {
			window.sfccConfig.edqCurrentSubmitButton = (buttonSelector[i].name.toLowerCase().match(/save/)) ? buttonSelector[i] : window.sfccConfig.edqCurrentSubmitButton;
			if (window.sfccConfig.edqCurrentSubmitButton) {
				addEventOnElement({"selector":"[name=" + window.sfccConfig.edqCurrentSubmitButton.name + "]", "event":"focus", "fn":setEmailPhoneCallback});
			}
		}
	}
	
	/**
	 * This window.location is intended to specify the input address fields that we require when we get to the checkout web page for initial load.
	 */
	if (window.location.href.toLowerCase().match(/checkout/)) {
		setEdqInputSelectors({"stageContentLocation":"shipping"});
	} else {
		setEdqInputSelectors({"stageContentLocation":""});
	}
	if (window.sfccConfig.edqEmailLineElement) {
		addEventOnElement({"selector":"[name=" + window.sfccConfig.edqEmailLineElement.name + "]", "event":"focus", "fn":setEnableButtonDisable});
	}
	if (window.sfccConfig.edqPhoneLineElements) {
		window.sfccConfig.edqPhoneLineElements.forEach(
			function(phoneSelector) {
				addEventOnElement({"selector":"[name=" + phoneSelector.name + "]", "event":"focus", "fn":setEnableButtonDisable});
			}
		); 
	}
}
/**
 * Email validation
 * Sets the configuration to use Email Validate
 */
export function useEmailValidation(edqAuthorizationToken) {
	edqSetEmailValidationConfiguration({
		"edqAuthorizationToken":edqAuthorizationToken,
		"edqEmailLineElement":window.sfccConfig.edqEmailLineElement
	});
}
/**
 * Phone validation
 * Sets the configuration to use Global Phone Validate
 */
export function usePhoneValidation(edqAuthorizationToken) {
	edqSetPhoneValidationConfiguration({
		"edqAuthorizationToken":edqAuthorizationToken,
		"edqPhoneLineElements":window.sfccConfig.edqPhoneLineElements
	});
}

/**
 * Global Intuitive
 * Sets the configuration to use Global Intuitive
 */
 export function useGlobalIntuitive(vDefaultCountry, edqAuthorizationToken, edqDataSetUsage, edqDataSetCode, edqGlobalIntuitiveUseCurrentLocation) {
	window.sfccConfig.edqGlobalIntuitiveUseCurrentLocation = edqGlobalIntuitiveUseCurrentLocation;
	edqSetGlobalIntuitiveConfiguration({
		"vDefaultCountry":vDefaultCountry,
		"edqAuthorizationToken":edqAuthorizationToken,
		"edqDataSetUsage":edqDataSetUsage,
		"edqDataSetCode":edqDataSetCode,
		"edqCountryElement":window.sfccConfig.edqCountryElement,
		"edqAddressLine1Element":window.sfccConfig.edqAddressLine1Element,
		"edqAddressLine2Element":window.sfccConfig.edqAddressLine2Element,
		"edqCityLineElement":window.sfccConfig.edqCityLineElement,
		"edqStateLineElement":window.sfccConfig.edqStateLineElement,
		"edqPostalLineElement":window.sfccConfig.edqPostalLineElement
	});
	setCheckoutFormEvents({
		"reloadGIjs":reloadGIjs,
		"edqGlobalIntuitiveUnicornJsPath":window.sfccConfig.edqGlobalIntuitiveUnicornJsPath,
		"edqGlobalIntuitiveIntegrityKey":edqGlobalIntuitiveIntegrityKey,
		"vDefaultCountry":vDefaultCountry,
		"edqAuthorizationToken":edqAuthorizationToken,
		"edqDataSetUsage":edqDataSetUsage,
		"edqDataSetCode":edqDataSetCode,
		"edqCountryElement":window.sfccConfig.edqCountryElement,
		"edqAddressLine1Element":window.sfccConfig.edqAddressLine1Element,
		"edqAddressLine2Element":window.sfccConfig.edqAddressLine2Element,
		"edqCityLineElement":window.sfccConfig.edqCityLineElement,
		"edqStateLineElement":window.sfccConfig.edqStateLineElement,
		"edqPostalLineElement":window.sfccConfig.edqPostalLineElement
	});
 }

/**
 * Pro Web Address Verification callback
 */
export function useProwebVerification(edqAuthorizationToken, vDefaultCountry, edqProWebAddressLayout) {
	let setEmailPhoneCallback = function () {
		edqEmailPhoneValidationCallback({
			"edqEmailEnable":edqEmailEnable,
			"edqEmailLineElement":window.sfccConfig.edqEmailLineElement,
			"edqPhoneEnable":edqPhoneEnable,
			"edqPhoneLineElements":window.sfccConfig.edqPhoneLineElements,
			"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
			"edqValidateEmail":edqValidateEmail,
			"edqValidatePhone":edqValidatePhone,
			"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
		})
	};
	window.sfccConfig.edqProWebCallback = "window.EdqDemandware.sfra.edqValidateAddressCallBack1";
	addEventOnElement({"selector":"#form-submit", "event":"focus", "fn":setEmailPhoneCallback});
	edqSetProWebConfiguration({
		"formSubmitButton":document.querySelector("#form-submit"), 
		"vDefaultCountry":vDefaultCountry, 
		"edqAuthorizationToken":edqAuthorizationToken, 
		"edqCountryElement":window.sfccConfig.edqCountryElement, 
		"edqProWebAddressLayout":edqProWebAddressLayout, 
		"edqAddressLine1Element":window.sfccConfig.edqAddressLine1Element, 
		"edqAddressLine2Element":window.sfccConfig.edqAddressLine2Element, 
		"edqCityLineElement":window.sfccConfig.edqCityLineElement, 
		"edqStateLineElement":window.sfccConfig.edqStateLineElement, 
		"edqPostalLineElement":window.sfccConfig.edqPostalLineElement
	});
	edqCheckoutPageWorkflows({
		"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton,
		"formSubmitButton":document.querySelector("#form-submit"),
		"vDefaultCountry":vDefaultCountry,
		"edqAuthorizationToken":edqAuthorizationToken, 
		"edqCountryElement":window.sfccConfig.edqCountryElement, 
		"edqProWebAddressLayout":edqProWebAddressLayout, 
		"edqAddressLine1Element":window.sfccConfig.edqAddressLine1Element, 
		"edqAddressLine2Element":window.sfccConfig.edqAddressLine2Element, 
		"edqCityLineElement":window.sfccConfig.edqCityLineElement, 
		"edqStateLineElement":window.sfccConfig.edqStateLineElement, 
		"edqPostalLineElement":window.sfccConfig.edqPostalLineElement
	});
}
export function edqValidateAddressCallBack1() {
	edqValidateAddressCallBack({
		"formSubmitButton":document.querySelector("#form-submit"),
		"edqStateLineElement":window.sfccConfig.edqStateLineElement,
		"edqProWebCallbackValidation":edqProWebCallbackValidation,
		"edqCustomCallbackName":edqCustomCallbackName,
		"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
	});
}

interface setUtilsConfigArgs {
	defaultCountry: string;
	emailEnable: boolean;
	phoneEnable: boolean;
	validatePhone: boolean;
	validateEmail: boolean;
	authorizationToken: string;
	dataSetCode: string;
	dataSetUsage: boolean;
	proWebCallbackValidation: boolean;
	customCallbackName: string;
}
export function setUtilsConfig({defaultCountry, emailEnable, phoneEnable, validatePhone, validateEmail, authorizationToken, dataSetCode, dataSetUsage, proWebCallbackValidation, customCallbackName}: setUtilsConfigArgs) {
	vDefaultCountry = defaultCountry;
	edqEmailEnable = emailEnable;
	edqPhoneEnable = phoneEnable;
	edqValidatePhone = validatePhone;
	edqValidateEmail = validateEmail;
	edqAuthorizationToken = authorizationToken;
	edqDataSetCode = dataSetCode;
	edqDataSetUsage = dataSetUsage;
	edqProWebCallbackValidation = proWebCallbackValidation;
	edqCustomCallbackName = customCallbackName;
}
export function setUtilsGIConfig({globalIntuitiveStaging, edqUnicornJsPath}) {
	edqGlobalIntuitiveStaging = globalIntuitiveStaging;
	window.sfccConfig.edqGlobalIntuitiveUnicornJsPath = edqUnicornJsPath;
}