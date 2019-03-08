# EDQ for Salesforce Commerce Cloud
######  Version 19.1.0

![Salesforce Logo](https://account.demandware.com/dwsso/XUI/themes/salesforce/images/2016sf_CommerceCloud_logo_RGB.png?v=14.1.0)

##  1\. Summary
The EDQ Commerce Cloud cartridge verify address and validates phone and email data in real time during registration, shipping, billing and address touchpoints; this cartridge supports both SiteGenesis (SGJC) and Storefront (SFRA) workflows.

##  2\. Component Overview
###  2.1\. Functional Overview
The EDQ Commerce Cloud cartridge contains address verification with Pro Web - Address (Verification Engine) and Global Intuitive, as well Global Phone Validate and Email Validate functionality. The sections below describe each of these workflows in more detail.

####  2.1.1\. Email Validate
Email Validation will check your email at the moment you finish typing in the email field box and once you lose focus on the email field the Email Validate will start working letting you know if is a valid or an invalid email.
To configure your Email Validate, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the email options.

![Email Options](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/211EmailOptions.png)

* The email enable option will enable/disable Email Validate in your store.
* The email validation option will enable/disable the page to prevent on going through. 

The store touchpoints for Email Validate are:
* Registration form.
* Billing/Payment form.

![Email SFRA](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/211SFRAview.png)

Email validate can result in two potential outcomes.

Verification Level | Description | Icon
------------ | ------------- | -------------
Verified | Email exists, or is a company internal email, is reachable and is valid. | ![verified Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/verifiedIcon.png)
Invalid | Mailbox or domain does not exist or is unreachable, illegitimate or disposable. | ![Invalid Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/invalidIcon.png)

####  2.1.2\. Global Phone Validate
Global Phone Validate will check your phone at the moment you finish typing in the phone field box and once you lose focus on the phone field, the Global Phone Validate will start working letting you know if is a valid or an invalid phone.
To configure your Global Phone Validate, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the phone options.

![Phone Options](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/212%20PhoneOptions.png)

* The phone enable option will enable/disable Global Phone Validate in your store.
* The phone validation option will enable/disable the page to prevent on going through.

The store touchpoints for Global Phone Validate are:
* Registration form.
* Add/Edit Address form.
* Billing/Payment form.

![Phone SFRA View](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/212SFRAView.png)

Global Phone Validate can result in two potential outcomes.

Verification Level | Description | Icon
------------ | ------------- | -------------
Verified | Phone matched to a high confidence and returned as a valid number. | ![verified Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/verifiedIcon.png)
Invalid | Could not match the number and returned as an invalid number. | ![Invalid Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/invalidIcon.png)

####  2.1.3\. Pro Web - Address (Verification Engine)
Pro Web - Address (Verification Engine) will check your address and correct if possible; once you type your address in the respective address fields and press the page form submitting button. 

![Verification SFRA View](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/213SFRAView.png)

In case that your address needs to be corrected and does not match an address; Pro Web - Address (Verification Engine) will prompt a “confirm updated address” box to complete your address in real time; by typing down the address in the address input field, it will give you options with accurate addresses matching the address with the information provided by the user and finally by selecting one of the options it will autocomplete the addresses fields in the address form with correct and valid address and may continue with the store process.

[For more information about Pro Web - Address (Verification Engine).](https://www.edq.com/documentation/apis/address-validate/soap/)

![Verification SFRA View](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/213SFRAView2.png)

To configure Pro Web - Address (Verification Engine), you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the verification engine options.

![Verification Options](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/213verificationOptions.png)

* The preferred address search engine option will let you choose between the address search engine options (choose verification engine to only use this selected engine).
* The address layout option lets you choose the structure in which your address will be returned.

The store touchpoints for Pro Web - Address (Verification Engine) are:
* Add/Edit Address form.
* Billing/Payment form.

####  2.1.4\. Global Intuitive
Global Intuitive will correct your address in real time while your typing down your address in the address field box.

![Global Intuitive SFRA View](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/214SFRAView.png)

Global Intuitive will automatically fill the rest of the address fields in the form.

![Global Intuitive SFRA View](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/214SFRAView2.png)

[For more information about Global Intuitive.](https://www.edq.com/documentation/apis/address-validate/global-intuitive/)

To configure Global Intuitive, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the global intuitive option.

![Global Intuitive Options](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/214globalOptions.png)

* The preferred address search engine option will let you choose between the address search engine options (choose verification engine to only use this selected engine).

The store touchpoints for Global Intuitive are:
* Add/Edit Address form.
* Billing/Payment form.

###  2.2\. Compatibility
EDQ cartridge was created with Commerce Cloud version 19.2 and may use the following touchpoints for its integration

SiteGenesis (SGJC):
* Register Form
* Address Form
* Shipping Form
* Billing Form

StoreFront (SFRA):
* Register Form
* Address Form
* Checkout Form

### 2.3\. Privacy, Payment
EDQ cartridge does not have access to your payment data; it just works to verify and correct address data and verify phone and email data. The rest of the data is not checked by Experian.

##  3\. Implementation Guide
### 3.1\. Setup
This integration process will require access to the following: 
* Business Manager 
* Commerce Cloud UX Studio 

#### 3.1.1\. Upload a Cartridge Using Eclipse IDE
1.	Open Eclipse IDE and click **File > Import** .
2.	Select the type of project you want to add and click next.
3.	Select the project you want to import and click **"Finish"** button.
4.	Go to Project Explorer tab.
5.	Select your digital server and go to its Properties.
6.	On the properties window select the option **“Project Reference”** .
7.	Select the cartridge you want to add to your digital server.
8.	Press **“Apply and Close”** button.

![Eclipse IDE](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/311EclipseIDE.png)

#### 3.1.2\. Business Manager
Register your cartridge.
1.	Log in to your Business Manager, then go to **Administration > Sites > Manage Sites** .
2.	Look for your **“site_name”** and select it.
3.	Click on settings tab.
4.	Add the cartridge name **“Experian_EDQ_SGJC”** (if you're using SiteGenesis or choose Experian_EDQ_SFRA if you're using SFRA) into the “Cartridges” input-box (cartridges take preference from left to right).
5.	Click **“Apply”** button.

![Business Manager](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/312BM.png)

#### 3.1.3\. Site Preferences
1.	Log into your Business Manager and go to **Administration > Site Development > Site Import & Export** .
2.	On the Import section with the tag name Upload Archive check the Local option then select the file **“SitePreferences.zip”**; then press the Upload button.

![Site Preferences](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/313SitePreferences.png)

3.	Select the file and then press the **Import** button.
4.	Press the **Ok** button on the top of this section.
To check the imported site preferences go to **Administration > Site Development > System Object Types** and look for the option **Site Preferences**; then click **Attribute Definitions** option and find all **Site Preferences** needed for EDQ cartridge.

![Site Preferences 2](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/313SitePreferences2.png)

###  3.2 Custom Code
####  3.2.1\. Sitegenesis JavaScript Controller
**EDQHeaders integration**
1.	Go to your SiteGenesis core cartridge and open the template located in **templates > default > components > header > htmlhead_UI.isml**
2.	Copy the next header line at the end of the file **“htmlhead_UI.isml”** file `<isinclude template="EDQ/EDQHeaders" />`

![SGJC EDQ Headers](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/321EDQHeaders.png)

**EDQUnicorn integration**
1.	Go to SiteGenesis core cartridge and open the template located in **templates > default > account > addressbook > addressdetails.isml**
2.	Copy the next line <isinclude template="EDQ/EDQUnicorn" /> before the buttons definition in **“addressdetails.isml”** file.

![SGJC EDQ Unicorn 1](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn1.png)

3.	Go to SiteGenesis core cartridge and open the template located in **templates > default > account > user > registration.isml**
4.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` before the ending tag `</isdecorate>` in **“registration.isml”** file.

![SGJC EDQ Unicorn 2](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn2.png)

5.	Go to SiteGenesis core cartridge and open the template located in **templates > default > checkout > billing > billing.isml**
6.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` before the ending tag `</isdecorate>` in **“billing.isml”** file.

![SGJC EDQ Unicorn 3](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn3.png)

7.	Go to SiteGenesis core cartridge and open the template located in **templates > default > checkout > shipping > singleshipping.isml**
8.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` before the ending tag `</isdecorate>` in **“singleshipping.isml”** file.

![SGJC EDQ Unicorn 4](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn4.png)

####  3.2.2\. Storefront Reference Architecture
**EDQHeaders integration**
1.	Go to Storefront base cartridge and open the template located in **templates > default > common > htmlHead.isml.**
2.	Copy the next header line at the end of the file **“htmlHead.isml”** file `<isinclude template="EDQ/EDQHeaders" />`

![SFRA EDQ Headers](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/322EDQHeaders.png)

**EDQUnicorn integration**
1.	Go to Storefront base cartridge and open the template located in **templates > default > account > components > registerForm.isml**
2.	Copy the next line at the end of **“registerForm.isml”** file `<isinclude template="EDQ/EDQUnicorn" />`
3.	In the button section add an attribute **“name”** with the label **“save”** to the submit button.

![SFRA EDQ Unicorn 1](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn1.png)

4.	Go to Storefront base cartridge and open the template located in **templates > default > account > addressForm.isml**
5.	Copy the next line in **“addressForm.isml”** file `<isinclude template="EDQ/EDQUnicorn" />` after the submit button as shown below.
6.	In the button section add an attribute **“name”** with the label **“save”** to the submit button.

![SFRA EDQ Unicorn 2](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn2.png)

7.	Go to Storefront base cartridge and open the template located in **templates > default > checkout > checkout.isml**
8.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` after the checkout workflow buttons in **“checkout.isml”** file.

![SFRA EDQ Unicorn 3](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn3.png)

9.	In the `<!-- Step 1: Shipping -->` section add an attribute `id` with the label `editShipping` to the html span tag.

![SFRA EDQ Unicorn 4](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn4.png)

10.	In the `<!-- Step 2: Payment and Billing-->` section add an attribute `id` with the label `editPayment` to the html span tag.

![SFRA EDQ Unicorn 5](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn5.png)

Once these files are modified; you need to upload them into your sandbox instance:
* If your cloud server has the Auto-Upload option active, save all files and all new cartridges are going to be uploaded to your sandbox instance.
* If you want to upload manually from Eclipse
1.	Click the cloud server icon ![Cloud Server Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/cloudServerIcon.png)
2.	Choose the option **Upload Cartridges.**

![Upload Cartridges](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/uploadCartridges.png)

### 3.3\. Testing
For both (Sitegenesis and Storefront Reference Architecture) stores the testing touchpoints are the same.

####  3.3.1\. Email Validate
In the create account page type your email in the email input field and the Email Validate will verify your email once you lose focus on the email field, the Email Validate will start working letting you know if is a valid or an invalid email.

![Testing Email](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/331SFRAEmailView.png)

####  3.3.2\. Global Phone Validate
In the create account page type your phone and Global Phone Validate will check your phone once you lose focus on the phone field, the Global Phone Validate will start working letting you know if is a valid or an invalid phone.

![Testing Phone](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/332SFRAPhoneView.png)

####  3.3.3\. Pro Web - Address (Verification Engine)
Once your logged into your store go to you profile and add new address; type down an address in the address input fields and Pro Web - Address (Verification Engine) will check and correct your address if possible, once you press the page form submitting button; Pro Web - Address (Verification Engine) will check your address and will give you the correct address for it. 

![Testing Verification](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/333SFRAVerificationView.png)

In case that your address needs to be corrected and does not match an address; Pro Web - Address (Verification Engine) will prompt a “confirm updated address” box to complete your address in real time; by typing the address in the address input field, it will give you options with accurate addresses matching the address with the information provided by the user and finally by selecting one of the options it will autocomplete the addresses fields in the address form with correct and valid address and may continue with the store process.

![Testing Verification 2](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/333SFRAVerificationView2.png)

####  3.3.4\. Global Intuitive
Once you're logged into your store go to profile and add new address; start typing an address in the address input field and Global Intuitive will display some options to match the address as you type it; select the correct address from the list.

![Testing Global Intuitive](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/334SFRAGlobalView.png)

And automatically global intuitive will fill the rest of the address fields in the form.

![Testing Global Intuitive 2](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/334SFRAGlobalView2.png)

##  4\. Operations, Maintenance
### 4.1\. Availability
By default, each service has a timeout configuration in its code:
* Pro Web - Address (Verification Engine) = 3.5 seconds
* Global Phone Validate = 3.5 seconds
* Email Validate = 15 seconds
If you don’t get an answer in that time; you can try making the request again.

### 4.2\. Support
For any support contact email are
* QAS Technical Support, Us.support.qas@experian.com

##  5\. User Guide
### 5.1\. Business Manager
Once the EDQ SitePreferences are uploaded in the business manager; choose your site and go to **Merchant Tools > Site Preferences > Custom Site Preferences Group** and choose EDQ Config option.
1.	EDQ Token (String): credentials provided to use the service. 
* Set to the value supplied to you by your Experian Partner
2.	Email Enable (Boolean): set to enable/disable email validation. 
3.	Email Validation (Boolean): set enable/disable to force email validation to prevent the page going through.
4.	Phone Enable (Boolean): set to enable/disable phone validation.
5.	Phone Validation (Boolean): set enable/disable to force phone validation to prevent the page going through.
6. Preferred address search engine (Enum of String): Select one option between:
   1. Both
   1. Global Intuitive
   1. Verification Engine
   1. None
7.	Address layout (String): Address layout format for the data.
8. Staging (Enum of String): Select one option between:
   1. Production
   1. Development

![EDQ Config](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/EDQ%20Cartridge%20Manual%20imgs/510EDQConfig.png)

### 5.3\. Storefront Functionality
For each storefront touchpoint 

**SiteGenesis (SGJC)**

SGJC | Email Validate | Global Phone Validate | Pro Web - Address (Verification Engine) | Global Intuitive
------------ | ------------- | ------------- | ------------- | -------------
Register Form | ✔ | ✖ | ✖ | ✖
Address Form | ✖ | ✔ | ✔ | ✔
Shipping Form | ✖ | ✔ | ✔ | ✔
Billing Form | ✔ | ✔ | ✔ | ✔

**StoreFront (SFRA)**

SFRA | Email Validate | Global Phone Validate | Pro Web - Address (Verification Engine) | Global Intuitive
------------ | ------------- | ------------- | ------------- | -------------
Register Form | ✔ | ✔ | ✖ | ✖
Address Form | ✖ | ✔ | ✔ | ✔
Checkout Form | ✔ | ✔ | ✔ | ✔

##  6\. Known Issues
* Timeout connection issues can be experience due to a slow internet connection. If you don’t get an answer in the default time; you can try making the request again.

