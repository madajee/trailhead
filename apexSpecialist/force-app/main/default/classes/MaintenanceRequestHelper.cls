public class MaintenanceRequestHelper {
    
    public static void updateWorkOrders(Map<Id, Case> closedRequests){
		
        List<Case> newMaintenanceRequests = new List<Case>();
        List<Work_Part__c> workPartsForAllRequests = new List<Work_Part__c>();
        
		// List Unique Closed Maintenance Requests	        
        Set<ID> uniqueMaintenanceRequests = new Set<ID>();
        for (Case closedRequest: closedRequests.values()) {
            uniqueMaintenanceRequests.add(closedRequest.Id);
        }
        
        //Get Work Parts Associated with All closed Maintenance Requests
        workPartsForAllRequests = [SELECT ID, Equipment__c, Maintenance_Request__c,
                        Equipment__r.Maintenance_Cycle__c FROM Work_Part__c
                        WHERE Maintenance_Request__c in: uniqueMaintenanceRequests];
        
        // Create Maintenance Request to Work Part Map
        Map<ID, List<Work_Part__c>> maintenanceRequestToWorkPartMap = new Map<ID, List<Work_Part__c>>();
        for (Work_Part__c workPart:workPartsForAllRequests) {
            List<Work_Part__c> tempWorkPartList;
            if (maintenanceRequestToWorkPartMap.get(workPart.Maintenance_Request__c) == null)
            {
                tempWorkPartList = new List<Work_Part__c>();
            }
            else {
                tempWorkPartList = maintenanceRequestToWorkPartMap.get(workPart.Maintenance_Request__c);
            }
            tempWorkPartList.add(workPart);
            maintenanceRequestToWorkPartMap.put(workPart.Maintenance_Request__c,tempWorkPartList);
        }
        Integer minimumMaintenanceCycle;
        // Create a new Routine Maintenance Request for each closed request
        for (Case closedRequest: closedRequests.values()) 
        {
            // Get the minimum maintenance cycle for request with multiple parts associated with it. 
            List<Work_Part__c> workParts = maintenanceRequestToWorkPartMap.get(closedRequest.Id);
            if(workParts != null){
                minimumMaintenanceCycle = Integer.valueOf(getMinimumMaintenanceCycle(workParts));
			}else{
                minimumMaintenanceCycle = Integer.valueOf(0.0);
			}
            Case newRequest = new Case();
            newRequest.Type = 'Routine Maintenance';
            newRequest.Vehicle__c = closedRequest.Vehicle__c;
            newRequest.Equipment__c = closedRequest.Equipment__c;
            newRequest.Subject = String.isBlank(closedRequest.Subject)?('Routine Maintenance Request ' + closedRequest.Equipment__c):closedRequest.Subject;
            newRequest.Date_Reported__c = Date.Today();
            newRequest.Date_Due__c = Date.today().addDays(minimumMaintenanceCycle);
            //System.debug('Due Date: ' + newRequest.Date_Due__c);
            newMaintenanceRequests.add(newRequest);
        }
        System.debug('Maintenance Request first : ' + closedRequests.values()[0]);
        if (newMaintenanceRequests.size() > 0){
            insert newMaintenanceRequests;
        }
    } 
    
    private static Decimal getMinimumMaintenanceCycle(List<Work_Part__c> workParts){
		Decimal shortestValue;
		if(workParts.size()>0){
            shortestValue = workParts.get(0).Equipment__r.Maintenance_Cycle__c;
        }
        for(Work_Part__c singleWorkPart : workParts){
			if(singleWorkPart.Equipment__r.Maintenance_Cycle__c < shortestValue){
             shortestValue = singleWorkPart.Equipment__r.Maintenance_Cycle__c;
			}
		}
		return shortestValue;
    }
}
