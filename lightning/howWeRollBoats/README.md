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

Artifacts
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




# SFDX  App

## Dev, Build and Test


## Resources


## Description of Files and Directories


## Issues


