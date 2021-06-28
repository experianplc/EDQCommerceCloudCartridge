/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
import {edqSetPhoneValidationConfiguration} from './utils/edqPhoneValidation';
import {edqSetEmailValidationConfiguration} from './utils/edqEmailValidation';
import {edqSetGlobalIntuitiveConfiguration} from './utils/edqGlobalIntuitive';
import {edqSetProWebConfiguration, edqValidateAddressCallBack} from './utils/edqProWebVerification';
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
let edqCurrentSubmitButtonIndex: number;
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
let pageRestrictValidation: boolean = true;
let inputSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[id]");
let selectSelector: NodeListOf<HTMLSelectElement> = document.querySelectorAll("select[id]");
let buttonSelector: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button[name]");
let edqGlobalIntuitiveUseCurrentLocation: boolean;
window.sfccConfig.addressChanged = true;

let edqConfig = <EdqConfigObject>{};
window.EdqConfig = window.EdqConfig || edqConfig;

export function sgjcUtilsConfiguration() {
	/***
	 * Set values to EDQ variables
	 ***/
	 
	inputSelector = document.querySelectorAll("input[id]");
	selectSelector = document.querySelectorAll("select[id]");
	buttonSelector = document.querySelectorAll("button[name]");
	
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

	let i: number = 0;
	for (i = 0; i < inputSelector.length; i++) {
		window.sfccConfig.edqAddressLine1Element = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_address1|dwfrm_billing_billingAddress_addressFields_address1|dwfrm_profile_address_address1/)) ? inputSelector[i] : window.sfccConfig.edqAddressLine1Element;
		window.sfccConfig.edqAddressLine2Element = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_address2|dwfrm_billing_billingAddress_addressFields_address2|dwfrm_profile_address_address2/)) ? inputSelector[i] : window.sfccConfig.edqAddressLine2Element;
		window.sfccConfig.edqCityLineElement = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_city|dwfrm_billing_billingAddress_addressFields_city|dwfrm_profile_address_city/)) ? inputSelector[i] : window.sfccConfig.edqCityLineElement;
		window.sfccConfig.edqPostalLineElement = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_postal|dwfrm_billing_billingAddress_addressFields_postal|dwfrm_profile_address_postal/)) ? inputSelector[i] : window.sfccConfig.edqPostalLineElement;
		if (inputSelector[i].id.toLowerCase().match(/phone/)) { 
			window.sfccConfig.edqPhoneLineElements.push(inputSelector[i]); 
		}
		window.sfccConfig.edqEmailLineElement = ((inputSelector[i].id == "dwfrm_profile_customer_email") 
			|| (inputSelector[i].id == "dwfrm_billing_billingAddress_email_emailAddress")) ? inputSelector[i] : window.sfccConfig.edqEmailLineElement;
	}
	for (i = 0; i < selectSelector.length; i++) {
		window.sfccConfig.edqStateLineElement = (selectSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_states_state|dwfrm_billing_billingAddress_addressFields_states_state|dwfrm_profile_address_states_state/)) ? selectSelector[i] : window.sfccConfig.edqStateLineElement;
		window.sfccConfig.edqCountryElement = (selectSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_country|dwfrm_billing_billingAddress_addressFields_country|dwfrm_profile_address_country/)) ? selectSelector[i] : window.sfccConfig.edqCountryElement;
	}
	for (i = 0; i < buttonSelector.length; i++) {
		if (buttonSelector[i].name.match(/dwfrm_profile_address_create/)) {
			window.sfccConfig.edqCurrentSubmitButton = buttonSelector[i];
		}
		if (buttonSelector[i].name.match(/dwfrm_profile_address_edit/)) {
			window.sfccConfig.edqCurrentSubmitButton = buttonSelector[i];
		}
		if (buttonSelector[i].name.match(/dwfrm_singleshipping_shippingAddress_save/)) {
			window.sfccConfig.edqCurrentSubmitButton = buttonSelector[i];
		}
		if (buttonSelector[i].name.match(/dwfrm_profile_confirm/)) {
			window.sfccConfig.edqCurrentSubmitButton = buttonSelector[i];
		}
		if (buttonSelector[i].name.match(/dwfrm_billing_save/)) {
			window.sfccConfig.edqCurrentSubmitButton = buttonSelector[i];
			enableButtonDisable({
				"buttonToDisable":window.sfccConfig.edqCurrentSubmitButton,
				"buttonStatus":false,
				"formSubmitButton":document.querySelector("#form-submit")
			});
			/**Forcing the button to set the addlistener because the button is set as disabled since the page load 
			 * that's why we're setting just this case here; this case just happens in SiteGenesis billing form. **/
			
			addEventOnElement({"selector":"[name=" + buttonSelector[i].name + "]", "event":"focus", "fn":setEmailPhoneCallback});
			/*TASK:101728 Change Validate Button*/
			edqCurrentSubmitButtonIndex = i;
		}
	}
	let setEnableButtonDisable = function() {
		enableButtonDisable({
			"buttonToDisable":window.sfccConfig.edqCurrentSubmitButton,
			"buttonStatus":false,
			"formSubmitButton":document.querySelector("#form-submit")
		});
		window.sfccConfig.pageRestrictValidation = true;
	};
	if (window.sfccConfig.edqPhoneLineElements) {
		window.sfccConfig.edqPhoneLineElements.forEach(
			function(phoneSelector) {
				addEventOnElement({"selector":"[name=" + phoneSelector.name + "]", "event":"focus", "fn":setEnableButtonDisable});
		});
	}
	if (window.sfccConfig.edqEmailLineElement) {
		addEventOnElement({"selector":"[name=" + window.sfccConfig.edqEmailLineElement.name + "]", "event":"focus", "fn":setEnableButtonDisable});
	}
	if (window.sfccConfig.edqCurrentSubmitButton) {
		addEventOnElement({"selector":"[name=" + window.sfccConfig.edqCurrentSubmitButton.name + "]", "event":"focus", "fn":setEmailPhoneCallback});
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
export function useGlobalIntuitive(vDefaultCountry, edqAuthorizationToken, edqDataSetUsage, edqDataSetCode) {
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
	
	const setEventsForCountryChangeGI = function() {
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
			"edqPostalLineElement":window.sfccConfig.edqPostalLineElement});
	};
	addEventOnElement({"selector":"[name=" + window.sfccConfig.edqCountryElement.name + "]", "event":"change", "fn":setEventsForCountryChangeGI});
}
/**
 * Pro Web - Address (Verification Engine)
 * Sets the configuration to use Pro Web - Address (Verification Engine)
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
	if (window.sfccConfig.edqCurrentSubmitButton) {
		window.sfccConfig.edqCurrentSubmitButton.style.display = "none";
	}
	window.sfccConfig.edqProWebCallback = "window.EdqDemandware.sgjc.edqValidateAddressCallBack1";
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
	const setEventsForCountryChangePW = function() {
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
			"edqPostalLineElement":window.sfccConfig.edqPostalLineElement});
	};
	addEventOnElement({"selector":"[name=" + window.sfccConfig.edqCountryElement.name + "]", "event":"change", "fn":setEventsForCountryChangePW});
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
	edqGlobalIntuitiveUseCurrentLocation: boolean;
}
export function setUtilsConfig({defaultCountry, emailEnable, phoneEnable, validatePhone, validateEmail, authorizationToken, dataSetCode, dataSetUsage, proWebCallbackValidation, customCallbackName, edqGlobalIntuitiveUseCurrentLocation}: setUtilsConfigArgs) {
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
	window.sfccConfig.edqGlobalIntuitiveUseCurrentLocation = edqGlobalIntuitiveUseCurrentLocation;
}