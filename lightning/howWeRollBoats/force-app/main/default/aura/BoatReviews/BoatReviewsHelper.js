({
	onInit : function(component) {
		var action = component.get("c.getAll");
        var boatId = component.get("v.boat.Id");
        console.log("BoatId in BoatReview: " + boatId);
        action.setParams({boatId : boatId });
        //action.setParams({boatId : 'a02f200000el2meAAA' });
        action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                		component.set("v.boatReviews", response.getReturnValue());
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

            // optionally set storable, abortable, background flag here

            // A client-side action could cause multiple events, 
            // which could trigger other events and 
            // other server-side action calls.
            // $A.enqueueAction adds the server-side action to the queue.
            $A.enqueueAction(action);
	},
})