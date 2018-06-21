({
	/*doInit: function (component, event, helper) {
            helper.onSearch(component);
    },*/
    doSearch:function (component, event, helper) {
        helper.onSearch(component);
    },
    search: function(component, event, helper){
        console.log("BSRController: search called");
        var params = event.getParam('arguments');
        console.log("boatTypeId extracted: " + params.boatTypeId);
        component.set("v.typeId", params.boatTypeId);
       
        helper.onSearch(component);
        return "search complete.";
    },
    onBoatSelect: function (component, event, helper) {
        console.log("Receiving BoatSelect Event");
        //var boatData = event.getParam("boatData");
        var boatId = event.getParam("boatId");
        //var boatId = boatData.boatId;
        console.log("Selected Boat ID: " + boatId);
        component.set("v.selectedBoatId",boatId);
    },
})