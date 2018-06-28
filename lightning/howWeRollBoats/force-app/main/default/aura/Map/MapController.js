({
    jsLoaded: function(component) {
          component.set("v.jsLoaded", true);
            //component.set("v.location", {'latitude' : '37.784173', 'longitude' : '-122.401557'});
      },
      //PlotMarker Application Event
      onPlotMapMarker : function(component, event, helper) {
          var lat = event.getParam("lat");
          var long = event.getParam("long");
          console.log("onPlotMapMarker.lat: " + lat);
          console.log("onPlotMapMarker.long: " + long);
          component.set("v.location", {'lat' : lat, 'long' : long});
       },
  
  })