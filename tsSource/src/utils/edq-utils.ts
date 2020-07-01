import {edqEmailValidationCallback} from './edqEmailValidation';
import {edqPhoneValidationCallback} from './edqPhoneValidation';
import {countryAlpha3} from './edqCountry';
/**
 * In the Business Manager there's an option that sets if the email and/or email will allow the user to prevent the 
 * user going to the next page; so this function will set the button an event listener to catch the result if the 
 * configuration is set to true; button is disabled when the mouse is over the button and disabled when you focus 
 * on the email or phone fields.
 * @param {element}  buttonToDisable
 * @param {boolean}  buttonStatus
 */
interface UtilsButtonActionsArgs {
	buttonToDisable: HTMLButtonElement;
	buttonStatus: boolean;
	formSubmitButton: HTMLButtonElement;
}
export function enableButtonDisable({buttonToDisable, buttonStatus, formSubmitButton}: UtilsButtonActionsArgs) {
	buttonToDisable.disabled = buttonStatus;
	if (formSubmitButton) { 
		formSubmitButton.disabled = buttonStatus; 
	}
}
interface UtilsAddEventsArgs {
	selector: string;
	event: string;
	fn: any;
}
/**
 * Add event listeners to the elements.
 *
 * @param {element} selector
 * @param {event} event
 * @param {function} fn
 */
export function addEventOnElement({selector, event, fn}: UtilsAddEventsArgs) {
	let element: Element  = document.querySelector(selector);
	if (!element) { return; }
	element.addEventListener(event, fn);
}
interface EmailPhoneValidationHelpers {
	edqEmailEnable: boolean;
	edqEmailLineElement: HTMLInputElement;
	edqPhoneEnable: boolean;
	edqPhoneLineElements: HTMLInputElement[];
	pageRestrictValidation: boolean;
	edqValidateEmail: boolean;
	edqValidatePhone: boolean;
	edqCurrentSubmitButton: HTMLButtonElement;
}
/** 
 * Will manage the access restriction when Phone/Email validation is being used based on the BM configuration.
 */
export function edqEmailPhoneValidationCallback({edqEmailEnable, edqEmailLineElement, edqPhoneEnable, edqPhoneLineElements, pageRestrictValidation, edqValidateEmail, edqValidatePhone, edqCurrentSubmitButton}: EmailPhoneValidationHelpers) {
	/** Email Validation not restricting access when Phone Validation is activated in the Billing stage for SFRA.
	* Added the checkoutStage to review the button that we're going to disable to prevent on going to the next page on 
	* the checkout page when the option is available in the Business Manager configuration.
	* For more information see Bug #147798 */
	let urlParams = new URLSearchParams(window.location.search);
	let checkoutStage: string = urlParams.get('stage');
	/** In SFRA Billing and Sgipping are on the same page controlled by CSS and JS; with this validation we'll be able
	 *	to set the button from the current stage we're on.
	 */
	if (checkoutStage == "shipping") {
		let setEmailPhoneCallback = function () {
			edqEmailPhoneValidationCallback({
				"edqEmailEnable":edqEmailEnable,
				"edqEmailLineElement":edqEmailLineElement,
				"edqPhoneEnable":edqPhoneEnable,
				"edqPhoneLineElements":edqPhoneLineElements,
				"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
				"edqValidateEmail":edqValidateEmail,
				"edqValidatePhone":edqValidatePhone,
				"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
			})
		};
		addEventOnElement({"selector":"[value=submit-shipping]", "event":"focus", "fn":setEmailPhoneCallback});
	} else if (checkoutStage == "payment") {
		window.sfccConfig.edqCurrentSubmitButton = document.querySelector("[value=submit-payment]");
		let setEmailPhoneCallback = function () {
			edqEmailPhoneValidationCallback({
				"edqEmailEnable":edqEmailEnable,
				"edqEmailLineElement":edqEmailLineElement,
				"edqPhoneEnable":edqPhoneEnable,
				"edqPhoneLineElements":edqPhoneLineElements,
				"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
				"edqValidateEmail":edqValidateEmail,
				"edqValidatePhone":edqValidatePhone,
				"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
			})
		};
		addEventOnElement({"selector":"[value=submit-payment]", "event":"focus", "fn":setEmailPhoneCallback});
	}
	EdqEmailPhoneValidationHelper({
		"edqEmailEnable":edqEmailEnable,
		"edqEmailLineElement":edqEmailLineElement,
		"edqPhoneEnable":edqPhoneEnable,
		"edqPhoneLineElements":edqPhoneLineElements,
		"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
		"edqValidateEmail":edqValidateEmail,
		"edqValidatePhone":edqValidatePhone,
		"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
	});
}
export function EdqEmailPhoneValidationHelper({edqEmailEnable, edqEmailLineElement, edqPhoneEnable, edqPhoneLineElements, pageRestrictValidation, edqValidateEmail, edqValidatePhone, edqCurrentSubmitButton}: EmailPhoneValidationHelpers) {
	if ((edqEmailEnable) && (edqEmailLineElement)) {
		edqEmailValidationCallback({
			"edqValidateEmail":edqValidateEmail,
			"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
			"edqEmailLineElement":edqEmailLineElement,
			"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
		});
	}
	if ((edqPhoneEnable) && (edqPhoneLineElements)) {
		edqPhoneValidationCallback({
			"edqValidatePhone":edqValidatePhone,
			"pageRestrictValidation":window.sfccConfig.pageRestrictValidation,
			"edqPhoneLineElements":edqPhoneLineElements,
			"edqCurrentSubmitButton":window.sfccConfig.edqCurrentSubmitButton
		});
	}
}