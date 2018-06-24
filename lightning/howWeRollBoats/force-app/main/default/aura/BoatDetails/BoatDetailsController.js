({
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
    }
})