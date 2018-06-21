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
})