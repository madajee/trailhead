Some Talk
I must acknowledge, front end development is quite different than developing soa services, though lightning framework is suggesting developers that they can easily apply SOA approaches like component based architecture, event (message) based communication supported by platform servcies.

Anyways, I will start with the specialist superbadge after completing the lightning modules.....

II) Build the Search Form

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

III) Populate the Search Results

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

IV) Implement the search filter

Requirement Understanding

We know that Search button is available on the BoatSearchForm component and BoatSearchResult component uses the apex controller to fetch the boat results.
This module is all about passing the selected boat type to the getBoats controller function when the search button on form is pressed. 
Lightning supports component communication through events, attributes and child method invocation. We will be firing an event from BoatSearchForm component which will be handled by the BoatSearch parent component while retrieving the boat type parameter , and in turn calls the search method on the BoatSearchResuts child component by passing the boat type id.

Search Method on BoatSearchResults component will  invoke getBoats controller function with the boat type id to enable the search filter.

# Artifacts
a) formSubmit.evt
b) BoatSearchForm.cmp
c) BoatSearchFormController.js
d) BoatSearch.cmp
e) BoatSearchController.js
f) BoatSearchResults.cmp
g) BoatSearchResultsController.js
h) BoatSearchResultsHelper.js

# SFDX CLI
sfdx force:lightning:event:create -n formSubmit -d force-app/main/default/aura/

******************************************************************************************************************************************************

V) Highlight the Selected Boat

BoatTile component is designed to display boat image as a click button, but we need to communicate the selected boat to the BoatSearchResults parent component.

BoatTile component will register a BoatSelect event which will communicate the selected boat id to the BoatSearchResults which then will display the selected boat while iteration over boat array. BoatSearchResults will set the selected attribute as true for the selected boat and Boat Tile component enables the tenary selection of css class based on the value of selected attribute.

# Artifacts
a) BoatSelect.evt
b) BoatTile.cmp
c) BoatTile.css
d) BoatTileController.js
e) BoatSearchResults.cmp
f) BoatSearchResultsController.js

# SFDX CLI
sfdx force:lightning:event:create -n BoatSelect -d force-app/main/default/aura/

******************************************************************************************************************************************************

VI) Display boat details

a) In this step, we need to display the details of a selected boat. We will start with creating a BoatDetails component by enabling lightningpage,lightning record page interfaces.

b) Boat Details use lightning tab components  for displaying "Details", "Reviews" & "Add Review" tabs. Details tab will display the detail of selected boat with the Boat Detail child component.

c) Use lighning data service <force:recordData> to load the boat record by setting the recordId attribute to the boat Id.

d) Enable the commmunication between the Boat Tile and Boat Details component with the BoatSelcted application event and boat data as a parameter type. Boat Tile component will register "BoatSelected" event, fire the event from "onBoatClick" method, Boat Details component will handle the "BoatSelcted" event with "onBoatSelected" handlder method. 

e) Reload the boat record in the Boat Details by reloading the LDS record in "onBoatSelected" handler method.

f) Boat Detail defines a Boat attribute to enable the communication  with the parent Boat Details component. Use the 2 column grid (lightning layout) in the card component (lightning card) to display the boat data in one column and image in the other column.

g) Use the lightning card actions attribute to display "Full Details" lightning button which navigates to the boat record with the "e.force:navigateToSObject" platform service event.

# Artifacts
a) BoatDetails.cmp
b) BoatDetailsController.js
c) BoatSelected.evt
d) BoatTile.cmp
e) BoatTileController.js
f) BoatDetail.cmp
g) BoatDetailController.js
h) BoatDetailHelper.js
i) BoatDetail.css

# SFDX CLI

sfdx force:lightning:component:create -n BoatDetails -d force-app/main/default/aura/

sfdx force:lightning:event:create -n BoatSelected -d force-app/main/default/aura/

sfdx force:lightning:component:create -n BoatDetail -d force-app/main/default/aura/

******************************************************************************************************************************************************


a) BoatDetails.cmp
b) BoatDetail.cmp
c) BoatSelected.evt
d) BoatTile.cmp
e) BoatTileController.js


# SFDX  App

## Dev, Build and Test


## Resources


## Description of Files and Directories


## Issues


