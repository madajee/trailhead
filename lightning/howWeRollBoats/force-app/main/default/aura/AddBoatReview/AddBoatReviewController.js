({
    doInit: function(component, event, helper) {
        console.log("AddBoatReview doInit Called");
        var boatId = component.get("v.boat.Id");
        console.log("BoatId In AddBoatReview Component: " + boatId);
    	helper.onInit(component, event, helper);
    },
    onSave : function(component, event, helper) {
        //component.set("v.simpleNewContact.AccountId", component.get("v.recordId"));
        component.set("v.boatReview.Boat__c",component.get("v.boat.Id"));
        component.find("service").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("Save completed successfully.");
                 // record is saved successfully
                var boatReviewAddedEvent = component.getEvent("BoatReviewAdded");
                boatReviewAddedEvent.fire();
                
                var resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                     alert('Review Saved successfully.');
                 }else{
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();
                 }
                helper.onInit(component, event, helper);
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + 
                           JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
	},
    onRecordUpdated: function(component, event, helper) {
        console.log("Record Updated");
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // get the fields that are changed for this record
            var changedFields = eventParams.changedFields;
            console.log('Fields that are changed: ' + JSON.stringify(changedFields));
            // record is changed so refresh the component (or other component logic)
            var resultsToast = $A.get("e.force:showToast");
            if ($A.util.isUndefined(resultsToast)){
                     alert('Review Saved successfully.');
                 }else{
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was updated."
                    });
                    resultsToast.fire();
                 }
        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted and removed from the cache
        } else if(eventParams.changeType === "ERROR") {
            console.log('Error: ' + component.get("v.recordError"));
        }
    },
})