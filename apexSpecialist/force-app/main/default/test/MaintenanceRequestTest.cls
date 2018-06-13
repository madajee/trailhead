@isTest
public class MaintenanceRequestTest {
	@isTest
    public static void testMaintenanceRequest(){
        List<case> MaintenanceRequestList = new List<case>();
        createData();
        Test.startTest();
        	Vehicle__c veh1 = [Select id from Vehicle__c where Name ='ApexSBVehicleTest2'];
        	//System.assertEquals(2, [Select count() from Case where Vehicle__c=:veh1.Id]);
        	MaintenanceRequestList = [Select id from Case where Vehicle__c =:veh1.Id];
        	for (Case request: MaintenanceRequestList)
            {
                request.Status = 'Closed';
            }
        	update MaintenanceRequestList;
        	Test.stopTest();
        	Integer routineMaintenanceCount = [Select count() from Case where type = 'Routine Maintenance' 
                                               and Vehicle__c=:veh1.Id and status = 'New'];
			System.assertEquals(routineMaintenanceCount, 300);
        	Case dueDateCheckCase = [Select Date_Due__c from Case where type = 'Routine Maintenance' 
                                               and Vehicle__c=:veh1.Id and status = 'New' LIMIT 1];
        	System.assertEquals (Date.Today().addDays(5),dueDateCheckCase.Date_Due__c); 
    }
    private static void createData() {
        List<Vehicle__c> vehicleList = new List<Vehicle__c>();
        List<Product2> prodList = new List<Product2>();
        List<case> MaintenanceRequestList = new List<case>();
        List<Work_Part__c> partsList = new List<Work_Part__c>();
        try {
                Vehicle__c veh1 = new Vehicle__c (Name='ApexSBVehicleTest2', Model__c='ApexSBVehicleTest2');
                Product2 prod1 = new Product2 (Name='ApexSBDoorTest2', Replacement_Part__c=true, Maintenance_Cycle__c = 5);
            	Product2 prod2 = new Product2 (Name='ApexSBDoorTest3', Replacement_Part__c=true, Maintenance_Cycle__c = 10);
                prodList.add(prod1);
            	prodList.add(prod2);
                insert prodList;
                vehicleList.add(veh1);
                insert vehicleList;
                for(Integer i=0;i<300;i++){
                    Case request = new Case(Subject='SBVehicle Door Repair: ' + i);
                    request.Status = 'Open';
                    if (i==1)
                    {
                    	request.Type = 'Repair';
                    }
                    else {
                        request.Type = 'Routine Maintenance';
                    }
                    request.Vehicle__c = veh1.Id;
                    request.Equipment__c = prod1.Id;
                    MaintenanceRequestList.add(request);
                    
                }
            	if(MaintenanceRequestList.size()>0){
                	insert MaintenanceRequestList;
                    
                    for (Case request: [Select id from Case where Vehicle__c =:veh1.Id LIMIT 299])
                    {
                     	Work_Part__c doorHandle = new Work_Part__c ();
                        Work_Part__c doorHandle1 = new Work_Part__c ();
                    	doorHandle.Equipment__c = prod1.Id;
                        doorHandle.Maintenance_Request__c = request.Id;
                        doorHandle1.Equipment__c = prod2.Id;
                        doorHandle1.Maintenance_Request__c = request.Id;
                        partsList.add(doorHandle);
                        partsList.add(doorHandle1);
                    }
                    insert partsList;
                }
            }
            catch (System.DmlException e) {
        		System.debug(e.getMessage()); 
    		}
        }
    }
