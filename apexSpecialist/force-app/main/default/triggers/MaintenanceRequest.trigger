trigger MaintenanceRequest on Case (before update, after update) {
    // call MaintenanceRequestHelper.updateWorkOrders
    Map<Id,Case> closedRequests = new Map<Id,Case>();
    
    if(Trigger.isUpdate  && Trigger.isAfter){
        for(Case request: Trigger.new){
            if (request.IsClosed && (request.Type.equals('Repair') || request.Type.equals('Routine Maintenance'))){
                closedRequests.put(request.Id, request);
            }
        }
        if(!closedRequests.values().isEmpty()){
            System.debug('MaintenanceRequest: ' + closedRequests);
        	MaintenanceRequestHelper.updateWorkOrders(closedRequests);    
        }        
    }
    //System.debug('Trigger.isInsert: ' + Trigger.isInsert);
    //System.debug('Trigger.isUpdate: ' + Trigger.isUpdate);
    //System.debug('Trigger New Context: ' + Trigger.New);
    //System.debug('Trigger Old Context: ' + Trigger.Old);
}