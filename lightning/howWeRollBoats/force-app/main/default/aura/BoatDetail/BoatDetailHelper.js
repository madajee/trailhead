({
	renderNewButton: function (component) {
        var navEvt = $A.get("e.force:navigateToSObject");
        if (navEvt) {
            component.set('v.showFullDetailButton', true);
            
        }
    }
})