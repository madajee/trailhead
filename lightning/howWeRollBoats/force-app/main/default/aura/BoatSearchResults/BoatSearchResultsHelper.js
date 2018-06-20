({
	onSearch : function(component) {
    		var action = component.get("c.getBoats");
        	var boatTypeID = component.get("v.typeId");
        	action.setParams({boatTypeId : boatTypeID });
        action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                		component.set("v.boats", response.getReturnValue());
                		//console.log(response.getReturnValue());
                		console.log(component.get("v.boats"));
                }
                
                else if (state === "INCOMPLETE") {
                    // do something
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                     errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
        $A.enqueueAction(action);
	}
})