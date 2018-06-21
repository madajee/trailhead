({
    onBoatClick : function(component, event, helper) {
        console.log("Selected Boat ID: " + component.get("v.boat.Id"));
        var selected = component.get("v.selected");
        var boatId = component.get("v.boat.Id");
        var boatSelect = component.getEvent("BoatSelect");
        /*boatSelect.setParams({"boatData":
                              {"boatId" : boatId}
                             });*/
        boatSelect.setParams({ "boatId" : boatId });
        console.log("Firing BoatSelect Event");
        boatSelect.fire();
    }
})