Some Talk
I must acknowledge, front end development is quite different than developing soa services, though lightning framework is suggesting developers that they can easily apply SOA approaches like component based architecture, event (message) based communication supported by platform servcies.

Anyways, I will start with the specialist superbadge after completing the lightning modules.....

I) Build the Search Form

Requirement Understanding

a) We understand that BoatSearch is the container component which will be containerizing BoatSearchForm and BoatSearchResults.

b) SLDS Design Module talks about Card & Tile which comes in handy but another good reference from Mohith Shrivastava (Salesforce MVP).

https://github.com/msrivastav13/Base-Lightning-Components/wiki/Lightning-Base-Components-Designer-Guide

c) Most of the work is in the form component and long time front end developers can explain better, but I will start by differentiating static & dynamic tags.

d) We will start with layout with three items (select dropdown and 2 buttons (Static)

e) Dropdown will controller and iterator for Boat Types. (Dynamic)

f) New Button will need a dynamic client controller method which will platform services like (e.force.createRecord) and show the new button in lightning infrastructure.

g) Search Button dynamic method can log the Boat Type.

h) Apex Controller code will have to check for location fields. 

# Artifacts
a) FriendswithBoats.app 
b) BoatSearch.cmp
c) BoatSearchForm.cmp
d) BoatSearchFormController.js
e) BoatSearchFormHelper.js
f) BoatSearchResults.cmp
g) BoatSearchResults.apxc

# SFDX CLI
sfdx force:project:create -n howWeRollBoats

sfdx force:lightning:component:create -n BoatSearch -d force-app/main/default/aura/

sfdx force:lightning:component:create -n BoatSearchForm -d force-app/main/default/aura/

sfdx force:lightning:component:create -n BoatSearchResults -d force-app/main/default/aura/

sfdx force:apex:class:create -n BoatController -d force-app/main/default/classes
******************************************************************************************************************************************************

I) Populate the Search Results

Requirement Understanding

a) HowWeRoll has the boat inventory stored in the Boat object with Picture field defined as URL, and accessing the path through zipped file static resources. We will start with defining the apex controller that will query the boat inventory and return the list of boats. Controller has to filter the boat inventory based on the input parameter of boat type.

b) Boat Search Results will be a container component that will iterate over the boat list and display each boat as Boat Tile component.

c) Boat Tile component has to be a click button background image titled with the photographer name.
Button has to be a tile and innertile has to reference the following image expression for a style tag.
{! 'background-image:url(\'' + v.boat.Picture__c + '\'); '}

d) Boat Search Results component will have Boat array and Boat Type as attribute. Init Handler will populate the boat array by invoking the controller method. We will display all boats by passing blank in the boat type input parameter. In the next step, we will be passing the boat type from the parent component.

e) Lightning Layout, Layout Item  and multipleRows attribute provides the responsive grid with multiple rows.

f) Check for boat array length to display message for "No Boats Found".

# Artifacts
a) BoatSearchResults.apxc
b) BoatTile.cmp
c) BoatTile.css
d) BoatSearchResults.cmp
e) BoatSearchResultsController.js
f) BoatSearchResultsHelper.js

# SFDX CLI
sfdx force:apex:class:create -n BoatSearchResultsController -d force-app/main/default/classes

sfdx force:lightning:component:create -n BoatTile -d force-app/main/default/aura/

******************************************************************************************************************************************************






# SFDX  App

## Dev, Build and Test


## Resources


## Description of Files and Directories


## Issues


