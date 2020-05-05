/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
import {edqSetPhoneValidationConfiguration} from 'edqPhoneValidation.ts';
import {edqSetEmailValidationConfiguration} from 'edqEmailValidation.ts';
import {edqSetGlobalIntuitiveConfiguration} from 'edqGlobalIntuitive.ts';
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
let edqPhoneLineElement: HTMLElement;
let edqCurrentSubmitButton: HTMLElement;
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
let inputSelector[: HTMLElement] = document.querySelectorAll("input[id]");
let selectSelector[: HTMLElement] = document.querySelectorAll("select[id]");
let buttonSelector[: HTMLElement] = document.querySelectorAll("button[name]");
window.EdqConfig = window.EdqConfig || {};
/* [Use country JS here.] */

/***
 * Set values to EDQ variables
 ***/
let i: number = 0;
for (i = 0; i < inputSelector.length; i++) {
	edqAddressLine1Element = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_address1|dwfrm_billing_billingAddress_addressFields_address1|dwfrm_profile_address_address1/)) ? inputSelector[i] : edqAddressLine1Element;
	edqAddressLine2Element = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_address2|dwfrm_billing_billingAddress_addressFields_address2|dwfrm_profile_address_address2/)) ? inputSelector[i] : edqAddressLine2Element;
	edqCityLineElement = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_city|dwfrm_billing_billingAddress_addressFields_city|dwfrm_profile_address_city/)) ? inputSelector[i] : edqCityLineElement;
	edqPostalLineElement = (inputSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_postal|dwfrm_billing_billingAddress_addressFields_postal|dwfrm_profile_address_postal/)) ? inputSelector[i] : edqPostalLineElement;
	edqPhoneLineElement = (inputSelector[i].id.toLowerCase().match(/phone/)) ? inputSelector[i] : edqPhoneLineElement;
	edqEmailLineElement = ((inputSelector[i].id == "dwfrm_profile_customer_email") 
        || (inputSelector[i].id == "dwfrm_billing_billingAddress_email_emailAddress")) ? inputSelector[i] : edqEmailLineElement;
}
for (i = 0; i < selectSelector.length; i++) {
	edqStateLineElement = (selectSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_states_state|dwfrm_billing_billingAddress_addressFields_states_state|dwfrm_profile_address_states_state/)) ? selectSelector[i] : edqStateLineElement;
	edqCountryLineElement = (selectSelector[i].id.match(/dwfrm_singleshipping_shippingAddress_addressFields_country|dwfrm_billing_billingAddress_addressFields_country|dwfrm_profile_address_country/)) ? selectSelector[i] : edqCountryLineElement;
}
for (i = 0; i < buttonSelector.length; i++) {
	if (buttonSelector[i].name.match(/dwfrm_profile_address_create/)) {
		edqCurrentSubmitButton = buttonSelector[i];
	}
	if (buttonSelector[i].name.match(/dwfrm_profile_address_edit/)) {
		edqCurrentSubmitButton = buttonSelector[i];
	}
	if (buttonSelector[i].name.match(/dwfrm_singleshipping_shippingAddress_save/)) {
		edqCurrentSubmitButton = buttonSelector[i];
	}
	if (buttonSelector[i].name.match(/dwfrm_profile_confirm/)) {
		edqCurrentSubmitButton = buttonSelector[i];
	}
	if (buttonSelector[i].name.match(/dwfrm_billing_save/)) {
		edqCurrentSubmitButton = buttonSelector[i];
		enableButtonDisable(edqCurrentSubmitButton, false);
		/**Forcing the button to set the addlistener because the button is set as disabled since the page load 
         * that's why we're setting just this case here; this case just happens in SiteGenesis billing form. **/
		buttonSelector[i].addEventListener("focus", edqEmailPhoneValidationCallback);
		/*TASK:101728 Change Validate Button*/
		edqCurrentSubmitButtonIndex = i;
	}
}
if (edqPhoneLineElement) {
	edqPhoneLineElement.addEventListener("focus", function() {
		enableButtonDisable(edqCurrentSubmitButton, false); pageRestrictValidation = true;
	});
}
if (edqEmailLineElement) {
	edqEmailLineElement.addEventListener("focus", function() {
		enableButtonDisable(edqCurrentSubmitButton, false); pageRestrictValidation = true;
	});
}
if (edqCurrentSubmitButton) {
	edqCurrentSubmitButton.addEventListener("focus", edqEmailPhoneValidationCallback);
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

/**
 * Pro Web - Address (Verification Engine)
 * Sets the configuration to use Pro Web - Address (Verification Engine)
 */
edqSetProWebConfiguration({formSubmitButton, vDefaultCountry, edqAuthorizationToken, edqCountryElement, edqProWebAddressLayout, edqAddressLine1Element, edqAddressLine2Element, edqCityLineElement, edqStateLineElement, edqPostalLineElement});
