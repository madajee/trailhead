({
	doInit: function (component, event, helper) {
            helper.getTypesOfBoats(component);
            helper.renderNewButton(component);
    },
    createRecord : function (component, event, helper) {
        
        var boat = component.find("boatSelect").get("v.value");
        if(!boat){
            boat = null;
        }
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Boat__c",
            "defaultFieldValues": {
                'BoatType__c' : boat
            }

        });
        createRecordEvent.fire();
    },
    searchResult : function(component, event, helper){
        var boatTypeId = component.get("v.selectedValue");
        console.log("Search button pressed " + boatTypeId);
        var searchSubmitEvent = component.getEvent("searchResult");
        searchSubmitEvent.setParams({"searchData":
                            {"boatTypeId" : boatTypeId}
        });
        console.log("Sending Search Event");
        searchSubmitEvent.fire();
    },
})
