# EDQ for Salesforce Commerce Cloud
######  Version 19.1.0

![GitHub Logo](https://account.demandware.com/dwsso/XUI/themes/salesforce/images/2016sf_CommerceCloud_logo_RGB.png?v=14.1.0)

##  1\. Summary
The EDQ Commerce Cloud cartridge verifies customer address, phone and email data in real time during registration, shipping, billing and address touchpoints; this cartridge supports both SiteGenesis (SGJC) and Storefront (SFRA) workflows.
This front-end integration that uses a JavaScript library called Pegasus and Unicorn to facilitate its support; this libraries let you use all Experian products in a more efficient and easy way.

##  2\. Component Overview
###  2.1\. Functional Overview
The EDQ Commerce Cloud cartridge contains verification engine, global intuitive, phone and email validation functionality. The sections below describe each of these validation workflows in more detail.

####  2.1.1\. Email Validation
Email validation engine will verify your email at the moment you finish typing down your email in the email field box and once you lose focus on the email field the email validation engine will start working letting you know if is a valid or an invalid email.
To configure your email validation, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the email options.

![EmailOptions](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/211EmailOptions.png)

* Email enable option will enable/disable email validation in your store.
* Email validation option will enable/disable the page to prevent on going through. 

The store touchpoints for email validation are:
* Registration form.
* Billing/Payment form.

![EmailSFRA](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/211SFRAview.png)

Email validation can result in two potential outcomes.

Verification Level | Description | Icon
------------ | ------------- | -------------
Verified | Email exists, or is a company internal email, is reachable and is valid. | ![verifiedIcon](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/verifiedIcon.png)
Invalid | Mailbox or domain does not exist or is unreachable, illegitimate or disposable. | ![invalidIcon](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/invalidIcon.png)

####  2.1.2\. Phone Validation
Phone validation engine will verify your phone at the moment you finish typing down your phone in the phone field box and once you lose focus on the phone field, the phone validation engine will start working letting you know if is a valid or an invalid phone.
To configure your phone validation, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the phone options.

![PhoneOptions](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/212%20PhoneOptions.png)

* Phone enable option will enable/disable phone validation in your store.
* Phone validation option will enable/disable the page to prevent on going through.

The store touchpoints for phone validation are:
* Registration form.
* Add/Edit Address form.
* Billing/Payment form.

![PhoneSFRAView](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/212SFRAView.png)

Phone validation can result in two potential outcomes.

Verification Level | Description | Icon
------------ | ------------- | -------------
Verified | Phone matched to a high confidence and returned as a valid number. | ![verifiedIcon](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/verifiedIcon.png)
Invalid | Could not match the number and returned as an invalid number. | ![invalidIcon](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/invalidIcon.png)

####  2.1.3\. Verification Engine
Verification engine will verify and correct your address; once you type down your address in the respective address fields and press the page form submitting button; verification engine will verify your address and will give you the correct answer for it. 

![VerificationSFRAView](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/213SFRAView.png)

In case verification engine needs the user interaction to complete the address provided by the user; verification engine will provide an “confirm updated address” box to complete your address in real time; by typing down the address in the address input field, it will give you options with accurate addresses matching the address with the information provided by the user and finally by selecting one of the options it will autocomplete the addresses fields in the address form with correct and valid address and may continue with the store process.

![VerificationSFRAView](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/213SFRAView2.png)

To configure verification engine, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the verification engine options.

![VerificationOptions](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/213verificationOptions.png)

* Preferred address search engine option will let you choose between the address search engine options (choose verification engine to only use this selected engine).
* Address layout option let you choose the layout in which the data is going to be shown in the store (ask to your Experian consultant about the existing layouts).

The store touchpoints for phone validation are:
* Add/Edit Address form.
* Billing/Payment form.

####  2.1.4\. Global Intuitive
Global intuitive will correct your address in real time while your typing down your address in the address field box; it will display some options to match the address your typing down; select the correct address your typing down from the list above.

![globalSFRAView](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/214SFRAView.png)

And automatically global intuitive will fill the rest of the address fields in the form.

![globalSFRAView](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/214SFRAView2.png)

To configure global intuitive, you need to access the Business Manager and go to EDQ Config **(`Select Site > Merchant Tools > Site Preferences > Custom Site Preferences Group > EDQ Config`)** and look for the global intuitive option.

![globalOptions](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/214globalOptions.png)

* Preferred address search engine option will let you choose between the address search engine options (choose verification engine to only use this selected engine).

The store touchpoints for phone validation are:
* Add/Edit Address form.
* Billing/Payment form.

###  2.2\. Use Cases
Most of the use cases for Experian products is to verify, validate and clean the data.
With global intuitive you can start typing down your address in a single line and when you find your address just select it; which will make the user interaction a lot easier and the engine will provide validate and accurate data and fill the rest of the address input fields automatically; which will make the user experience faster.
With verification engine you can type down your address and when you finish this engine will validate and correct your address; which will make the user to have a valid address for the postal service.
With email and phone validation you can check if the email and phone are valid and working.

###  2.3\. Compatibility
EDQ cartridge was created with Commerce Cloud latest version and may use the following touchpoints for its integration

SiteGenesis (SGJC):
* Register Form
* Address Form
* Shipping Form
* Billing Form

StoreFront (SFRA):
* Register Form
* Address Form
* Checkout Form

### 2.4\. Privacy, Payment
EDQ cartridge does not have access to your payment data; it just works as a validation engine for data such as address, phone and email. The rest of the data is not checked by Experian.

##  3\. Implementation Guide
### 3.1\. Setup
This integration process will require access to the following: 
* Business Manager 
* Commerce Cloud UX Studio 

#### 3.1.1\. Upload a Cartridge Using Eclipse IDE
1.	Open eclipse IDE and click **File > Import**
2.	Select the type of project you want to add and click next
3.	Select the project you want to import and click Finnish button
4.	Go to Project Explorer tab
5.	Select your digital server and go to its Properties
6.	On the properties window select the option **“Project Reference”**
7.	Select the cartridge you want to add to your digital server
8.	Press **“Apply and Close”** button

![EclipseIDE](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/311EclipseIDE.png)

#### 3.1.2\. Business Manager
Register your cartridge.
1.	Log in to your Business Manager; then go to **Administration > Sites > Manage Sites**
2.	Look for your **“site_name”** and select it.
3.	Click on settings tab.
4.	Add the cartridge name **“Experian_EDQ_SGJC”** (if your using SiteGenesis or choose Experian_EDQ_SFRA if your using SFRA) into the “Cartridges” input-box (cartridges take preference from left to right).
5.	Click **“Apply”** button.

![BM](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/312BM.png)

#### 3.1.3\. Site Preferences
1.	Log into your Business Manager and go to **Administration > Site Development > Site Import & Export**
2.	On the Import section with the tag name Upload Archive check the Local option then select the file **“SitePreferences.zip”**; then press the Upload button

![SitePreferences](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/313SitePreferences.png)

3.	Select the file and then press the Import button
4.	Press the Ok button on the top of this section
To check if the imported site preferences go to Administration > Site Development > System Object Types and look for the option Site Preferences; then click Attribute Definitions option and find all Site Preferences needed for EDQ cartridge.

![SitePreferences2](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/313SitePreferences2.png)

###  3.2 Custom Code
####  3.2.1\. Sitegenesis JavaScript Controller
**EDQHeaders integration**
1.	Go to your SiteGenesis core cartridge and open the template located in **templates > default > components > header > htmlhead_UI.isml**
2.	Copy the next header line at the end of the file **“htmlhead_UI.isml”** file `<isinclude template="EDQ/EDQHeaders" />`

![SGJCEDQHeaders](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/321EDQHeaders.png)

**EDQUnicorn integration**
1.	Go to SiteGenesis core cartridge and open the template located in **templates > default > account > addressbook > addressdetails.isml**
2.	Copy the next line <isinclude template="EDQ/EDQUnicorn" /> before the buttons definition in **“addressdetails.isml”** file.

![SGJCEDQUnicorn1](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn1.png)

3.	Go to SiteGenesis core cartridge and open the template located in **templates > default > account > user > registration.isml**
4.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` before the ending tag `</isdecorate>` in **“registration.isml”** file.

![SGJCEDQUnicorn2](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn2.png)

5.	Go to SiteGenesis core cartridge and open the template located in **templates > default > checkout > billing > billing.isml**
6.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` before the ending tag `</isdecorate>` in **“billing.isml”** file.

![SGJCEDQUnicorn3](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn3.png)

7.	Go to SiteGenesis core cartridge and open the template located in **templates > default > checkout > shipping > singleshipping.isml**
8.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` before the ending tag `</isdecorate>` in **“singleshipping.isml”** file.

![SGJCEDQUnicorn4](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/321EDQUnicorn4.png)

####  3.2.2\. Storefront Reference Architecture
**EDQHeaders integration**
1.	Go to Storefront base cartridge and open the template located in **templates > default > common > htmlHead.isml.**
2.	Copy the next header line at the end of the file **“htmlHead.isml”** file `<isinclude template="EDQ/EDQHeaders" />`

![SFRAEDQHeaders](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/322EDQHeaders.png)

**EDQUnicorn integration**
1.	Go to Storefront base cartridge and open the template located in **templates > default > account > components > registerForm.isml**
2.	Copy the next line at the end of **“registerForm.isml”** file `<isinclude template="EDQ/EDQUnicorn" />`
3.	In the button section add an attribute **“name”** with the label **“save”** to the submit button.

![SFRAEDQUnicorn1](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn1.png)

4.	Go to Storefront base cartridge and open the template located in **templates > default > account > addressForm.isml**
5.	Copy the next line in **“addressForm.isml”** file `<isinclude template="EDQ/EDQUnicorn" />` after the submit button as shown below.
6.	In the button section add an attribute **“name”** with the label **“save”** to the submit button.

![SFRAEDQUnicorn2](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn2.png)

7.	Go to Storefront base cartridge and open the template located in **templates > default > checkout > checkout.isml**
8.	Copy the next line `<isinclude template="EDQ/EDQUnicorn" />` after the checkout workflow buttons in **“checkout.isml”** file.

![SFRAEDQUnicorn3](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn3.png)

9.	In the `<!-- Step 1: Shipping -->` section add an attribute `id` with the label `editShipping` to the html span tag.

![SFRAEDQUnicorn4](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn4.png)

10.	In the `<!-- Step 2: Payment and Billing-->` section add an attribute `id` with the label `editPayment` to the html span tag.

![SFRAEDQUnicorn5](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/322EDQUnicorn5.png)

Once these files are modified; you need to upload them into your sandbox instance:
* If your cloud server has the Auto-Upload option active, save all files and all new cartridges are going to be uploaded to your sandbox instance.
* If you want to upload manually from Eclipse
1.	Click the cloud server icon ![cloudServerIcon](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/cloudServerIcon.png)
2.	Choose the option **Upload Cartridges.**

![uploadCartridges](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/uploadCartridges.png)

### 3.3\. Testing
For both (sitegenesis and storefront reference architecture) stores the testing touchpoints are the same.

####  3.3.1\. Email Validation
In the create account page type down your email in the email input field and the email validation engine will verify your email once you lose focus on the email field, the email validation engine will start working letting you know if is a valid or an invalid email.

![TestingEmail](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/331SFRAEmailView.png)

####  3.3.2\. Phone Validation
In the create account page type down your phone and phone validation engine will verify your phone once you lose focus on the phone field, the phone validation engine will start working letting you know if is a valid or an invalid phone.

![TestingPhone](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/332SFRAPhoneView.png)

####  3.3.3\. Verification Engine
Once your logged into your store go to you profile and add new address; type down an address in the address input fields and verification engine will verify and correct your address once you press the page form submitting button; verification engine will verify your address and will give you the correct address for it. 

![TestingVerification](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/333SFRAVerificationView.png)

In case verification engine needs the user interaction to complete the address provided by the user; verification engine will provide an “confirm updated address” box to complete your address in real time; by typing down the address in the address input field, it will give you options with accurate addresses matching the address with the information provided by the user and finally by selecting one of the options it will autocomplete the addresses fields in the address form with correct and valid address and may continue with the store process.

![TestingVerification2](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/333SFRAVerificationView2.png)

####  3.3.4\. Global Intuitive
Once your logged into your store go to you profile and add new address; start typing down an address in the address input field and global intuitive will display some options to match the address your typing down; select the correct address your typing down from the list above.

![TestingGlobal](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/334SFRAGlobalView.png)

And automatically global intuitive will fill the rest of the address fields in the form.

![TestingGlobal2](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/334SFRAGlobalView2.png)

##  4\. Operations, Maintenance
### 4.1\. Availability
By default, each service has a timeout configuration in its code:
* Verification Engine = 3.5 seconds
* Phone = 3.5 seconds
* Email = 15 seconds
If you don’t get an answer in that time; you can retry making the request again.

### 4.2\. Support
For any support contact email are
* Jose Castillo (developer) jose.castillo@experian.com
* Experian SPI Team EDQDLStrategicPrograms&Integrations@exchange.experian.com

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

![EDQConfig](https://github.com/JoseCastilloExperian/edqCommerceCloud/blob/master/EDQ%20Cartridge%20Manual%20imgs/510EDQConfig.png)

### 5.3\. Storefront Functionality
For each storefront touchpoint 

**SiteGenesis (SGJC)**

SGJC | Email Validation | Phone Validation | Verification Engine | Global Intuitive
------------ | ------------- | ------------- | ------------- | -------------
Register Form | ✔ | ✖ | ✖ | ✖
Address Form | ✖ | ✔ | ✔ | ✔
Shipping Form | ✖ | ✔ | ✔ | ✔
Billing Form | ✔ | ✔ | ✔ | ✔

**StoreFront (SFRA)**

SFRA | Email Validation | Phone Validation | Verification Engine | Global Intuitive
------------ | ------------- | ------------- | ------------- | -------------
Register Form | ✔ | ✔ | ✖ | ✖
Address Form | ✖ | ✔ | ✔ | ✔
Checkout Form | ✔ | ✔ | ✔ | ✔

##  6\. Known Issues
* Timeout connection issue can be experience due to a low internet connection. If you don’t get an answer in the default time; you can retry making the request again.

##  7\. Release History

Version | Date | Changes
------------ | ------------- | -------------
19.1.0 | 2/6/2019 | Initial release
19.2.0 | 2/13/2019 | Change to markdown documentation
