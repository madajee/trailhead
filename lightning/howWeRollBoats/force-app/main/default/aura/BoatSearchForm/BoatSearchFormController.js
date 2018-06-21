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
    onFormSubmit : function(component, event, helper){
        var boatTypeId = component.get("v.selectedValue");
        console.log("Search button pressed " + boatTypeId);
        var FormSubmit = component.getEvent("FormSubmit");
        FormSubmit.setParams({"formData":
                            {"boatTypeId" : boatTypeId}
        });
        console.log("Firing FormSubmit Event");
        FormSubmit.fire();
    },
})