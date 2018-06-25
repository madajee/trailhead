({
	onInit : function(component, event, helper) {
        // Prepare a new record from template
        component.find("service").getNewRecord(
            "BoatReview__c", // sObject type (entityAPIName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newBoatReview");
                var error = component.get("v.recordError");
                console.log('Initialized Boat Review Record', JSON.stringify(rec));
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    rec.Boat__c = component.get("v.boat").Id;
                    component.set("v.boatReview",rec);
                    console.log("Record template initialized: " + rec.sobjectType);
                }
            })
        );	
	}
})