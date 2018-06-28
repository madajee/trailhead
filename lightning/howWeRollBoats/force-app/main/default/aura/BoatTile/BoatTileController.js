({
    onBoatClick : function(component, event, helper) {
        console.log("Selected Boat ID: " + component.get("v.boat.Id"));
        //BoatSelect Event
        var selected = component.get("v.selected");
        var boatId = component.get("v.boat.Id");
        var boat = component.get("v.boat");
        var boatSelect = component.getEvent("BoatSelect");
        
        
        /*boatSelect.setParams({"boatData":
                              {"boatId" : boatId}
                             });*/
        boatSelect.setParams({ "boatId" : boatId });
        console.log("Firing BoatSelect Event");
        boatSelect.fire();
        
        // BoatSelected Event
        var boatselected = component.get("v.boat");
        //var boatSelectedEvent = component.getEvent("BoatSelected");
        var boatSelectedEvent = $A.get("e.c:BoatSelected");
        boatSelectedEvent.setParams({ "boatselected" : boatselected });
        console.log("Firing BoatSelected Event");
        boatSelectedEvent.fire();
        
        var lat = boat.Geolocation__Latitude__s;
        var long = boat.Geolocation__Longitude__s;
        var label = boat.Name;
        var sObjectId;
        console.log("Geo " + lat + " " + long + " " + label);
        
        //PlotMarker Application Event
        var PlotMapMarker = $A.get("e.c:PlotMapMarker");
        PlotMapMarker.setParams({
            "lat"   : lat,
            "long"  : long,
            "label" : label,
            "SObjectId" : boatId
        });

        PlotMapMarker.fire();
    }
})