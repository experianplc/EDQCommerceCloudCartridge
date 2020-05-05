import {edqEmailValidationCallback} from 'edqEmailValidation.ts';
import {edqPhoneValidationCallback} from 'edqPhoneValidation.ts';
import {countryAlpha3} from 'edqCountry.ts';
/**
 * In the Business Manager there's an option that sets if the email and/or email will allow the user to prevent the 
 * user going to the next page; so this function will set the button an event listener to catch the result if the 
 * configuration is set to true; button is disabled when the mouse is over the button and disabled when you focus 
 * on the email or phone fields.
 * @param {element}  buttonToDisable
 * @param {boolean}  buttonStatus
 */
interface UtilsButtonActionsArgs {
	buttonToDisable: HTMLElement;
	formSubmitButton: HTMLElement;
	buttonStatus: boolean;
}
export function enableButtonDisable({buttonToDisable, buttonStatus, formSubmitButton}: UtilsButtonActionsArgs) {
	buttonToDisable.disabled = buttonStatus;
	if (formSubmitButton) { formSubmitButton.disabled = buttonStatus; }
}
interface UtilsAddEventsArgs {
	selector: HTMLElement;
	event: event;
	fn: Object;
}
/**
 * Add event listeners to the elements.
 *
 * @param {element} selector
 * @param {event} event
 * @param {function} fn
 */
export function addEventOnElement({selector, event, fn}: UtilsAddEventsArgs) {
	let element:HTMLElement  = selector;
	if (!element) { return; }
	element.addEventListener(event, fn);
}
/** 
 * Will manage the access restriction when Phone/Email validation is being used based on the BM configuration.
 */
export function edqEmailPhoneValidationCallback() {
	/** Email Validation not restricting access when Phone Validation is activated in the Billing stage for SFRA.
	* Added the checkoutStage to review the button that we're going to disable to prevent on going to the next page on 
	* the checkout page when the option is available in the Business Manager configuration.
	* For more information see Bug #147798 */
	let urlParams: object = new URLSearchParams(window.location.search);
	let checkoutStage: string = urlParams.get('stage');
	/** In SFRA Billing and Sgipping are on the same page controlled by CSS and JS; with this validation we'll be able
	 *	to set the button from the current stage we're on.
	 */
	if (checkoutStage == "shipping") {
		this.setEdqButtonSelector("shipping");
	} else if (checkoutStage == "payment") {
		this.setEdqButtonSelector("billing");
	}
	this.EdqEmailPhoneValidationHelper();
}

export function EdqEmailPhoneValidationHelper() {
	if ((edqEmailEnable) && (edqEmailLineSelector)) { edqEmailValidationCallback(); }
	if ((edqPhoneEnable) && (edqPhoneLineSelectors)) { edqPhoneValidationCallback(); }
}
interface UtilsStageButtonSelectorArgs {
	stageContentLocation: string;
	edqCurrentSubmitButton: HTMLElement;
}
/** 
 * Added this function to set the listener tothe button on the selected stage (billing/shipping)
 * For more information see Bug #147798 
 *
 * @param stageContentLocation - Contains the stage(shipping/billing) for the checkout page in SFRA
 */
function setEdqButtonSelector({stageContentLocation, edqCurrentSubmitButton}: UtilsStageButtonSelectorArgs) {
	stageContentLocation = stageContentLocation || "";
	if (stageContentLocation === "shipping") {
		edqCurrentSubmitButton = document.querySelector("[value=submit-shipping]");
		edqCurrentSubmitButton.addEventListener("focus", this.edqEmailPhoneValidationCallback);
	} else if (stageContentLocation === "billing") {
		edqCurrentSubmitButton = document.querySelector("[value=submit-payment]");
		edqCurrentSubmitButton.addEventListener("focus", this.edqEmailPhoneValidationCallback);
	}
}