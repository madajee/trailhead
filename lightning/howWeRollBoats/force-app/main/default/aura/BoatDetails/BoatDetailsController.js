({
	doInit: function (component, event, helper) {
      component.set("v.selectedTabId", "detailstab");
      //component.find("tabset").set("v.selectedTabId","detailstab");      
    },
    onBoatSelected : function(component, event, helper) {
		console.log("Receiving BoatSelected Event");
        var boat = event.getParam("boatselected");
        console.log("Selected Boat: " + boat.Id)
        component.set("v.id",boat.Id);
        console.log("BoatID: " + component.get("v.id"));
        component.find('service').reloadRecord();
	},
    handleRecordUpdate: function(component, event, helper) {
        console.log("Record Updated");
        //handle the recordUpdated event
        var changeType = event.getParam("changeType");
        if(changeType === "LOADED") {
            // handle record loaded
            console.log("Record has been LOADED.")
            if( component.find("reviews")){
                component.find("reviews").refresh();
            }   
            component.set("v.logMessage", "Record has been loaded.");

        } else if(changeType === "CHANGED") {
            // handle record changed
            
            component.set("v.logMessage", "Record has been changed.");
            
        } else if(changeType === "REMOVED") {
            // handle record removed
            component.set("v.logMessage", "Record has been removed.");
        } else if(changeType === "ERROR") {
            // handle error while loading|saving|deleting record
            component.set("v.logMessage", "There is some error while loading/updating record.");
        } else {
            // you should not get any other type than these 4 (as of Summer '17)
        }
    },
    onBoatReviewAdded : function(component, event, helper) {
        	if( component.find("reviews")){
            	component.find("reviews").refresh();
        	}
            component.find("tabset").set("v.selectedTabId","boatreviewtab");
    },
})