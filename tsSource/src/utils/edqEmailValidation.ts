/*eslint no-unused-vars: "error"*/

import {enableButtonDisable} from './edq-utils';

interface EmailArgs {
	edqEmailLineElement: HTMLInputElement;
}
interface EmailConfigArgs extends EmailArgs {
	edqAuthorizationToken: string;
}
/**
 * Email validation
 * Sets the configuration to use Email Validate
 *
 * @param args.edqAuthorizationToken - Contains the email authorization token for the Email Validate API
 * @param args.edqEmailLineSelector - Contains the selector of the email input to be validated
 */
export function edqSetEmailValidationConfiguration({edqAuthorizationToken, edqEmailLineElement}: EmailConfigArgs) {	
	window.EdqConfig.EMAIL_VALIDATE_AUTH_TOKEN = edqAuthorizationToken;
	window.EdqConfig.EMAIL_TIMEOUT = '15000';
	window.EdqConfig.EMAIL_ELEMENTS = [
		edqEmailLineElement
	];
}

interface EmailCallbackArgs extends EmailArgs {
	edqCurrentSubmitButton: HTMLButtonElement;
	edqValidateEmail: boolean;
	pageRestrictValidation: boolean;
}
/** 
 * Will manage the access restriction when Email Validation is being used.
 *
 * @param edqValidateEmail - Enables or disables the Email Validation usage
 * @param pageRestrictValidation - Enables or disables the page restriction for the page to go to next page on email status
 * @param edqEmailLineElement - Contains the selector of the email input to be validated
 * @param edqCurrentSubmitButton - Contains the submit button that'll be managed to validate the page restriction
 */
export function edqEmailValidationCallback({edqValidateEmail, pageRestrictValidation, edqEmailLineElement, edqCurrentSubmitButton}: EmailCallbackArgs) {
	/** 
	 * Allow users to continue with invalid email; 
	 * based on the Business Manager configuration we can set if we want to prevent the user to go through with an invalid Email.
	 * For more information refer to task #101729.
	 */
	if ((edqValidateEmail) && (window.sfccConfig.pageRestrictValidation)) {
		if (edqEmailLineElement.hasAttribute("edq-metadata")) {
			let edqEmailResponse: object = JSON.parse(edqEmailLineElement.getAttribute("edq-metadata"));
			if ((edqEmailResponse["Certainty"] == "verified") || (edqEmailResponse["Certainty"] == "unknown")) {
				window.sfccConfig.pageRestrictValidation = true;
				enableButtonDisable({"buttonToDisable":window.sfccConfig.edqCurrentSubmitButton, "buttonStatus":false, "formSubmitButton":document.querySelector("#form-submit")});
			} else {
				window.sfccConfig.pageRestrictValidation = false;
				enableButtonDisable({"buttonToDisable":window.sfccConfig.edqCurrentSubmitButton, "buttonStatus":true, "formSubmitButton":document.querySelector("#form-submit")});
			} 
		}
	}
}