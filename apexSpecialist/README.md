
Some Talk

I may say that Superbadge suggests a method of gaining familrity with salesforce tools & platforms. I will also agree that there are resources online which can help in completing it. I think that is okay as you are working with teams in enterprise projects, and solution & requirement discussion help design & understand the data model.

Anyways, I am started with the technical understanding of the business requirements.

I) Automate Maintenance Requests 

Requirement Understanding

a) Use Case primarily revolves around maintenance requests which makes Case as the primary object and maintenance request closure is trigger event. 

b) As Case object has a vehicle & equipment as foreign object, and can be assigned directly from closed request.

c) Though, scenario gets a bit complicated when multiple workparts are associated with the maintenance request, and request has to find the work part which is associated to equipment with a minimum routine cycle, to caluclate the next routine maintenance date. 

Technical Approach

a) In the main trigger class, create a map of closed requests meeting the criteria, and pass onto the helper method to enable modular approach.

b) As we have to take care of governer limits, we can't run the work parts query for each maintenance request, rather populate the list for all work parts for the closed requests map.

c) Work Parts can then be grouped based on the maintenance request in a map collection.

d) As the closed requests are iterated, work parts map collection keyed with maintenance request ID can be used "to find the work part which is associated to equipment with a minimum routine cycle".

Approach Aside

a) As I worked on the superbadge without team support, I would have to look at the code samples and create the test data to handle more complicated scenarios.

b) For apex developers with less than an year experience, suggestion would be to re-visit the code even after completing the superbadge.

c) As long as sample code is extended with approach understanding, superbadge helps alot.


Test Scenarios

a) Create the data with vehicle, equipment and single work part (TestSingleWorkPart), and assert for couple of requests.

b) Create the data with vehicle, equipment and two work parts (TestTwoWorkParts), and assert for part with lower maintenance cycle.

c) Create the data for 300 requests and assert for creation of 300 requests.

II) Synchronize Inventory Management

Requirement Understanding
a) Usecase primarily revolves updating equipments which makes Product2 as the primary object.

b) Scenario requires making a REST callout to the equipment service mapping warehouse SKU to external ID.

Technical Approach

a) As equimentList is a GET method invocation, call the REST service either with the browser / or REST utility like cURL. Create a mapping sheet if needed.

b) Print the respose body after invoking the REST URL with Http library.

c) Create a mapping method which accepts each record as a generic object and mapping to Equiment object.

d) Call the mapping method for each iteration of a record and add the mapped equipment record to Equipment List.

Approach Aside

a) Callout are invoked with Future annotations with scheduling platform services.

Test Scenarios

a) Mock the callout by setting the respone body for a record and assert for update quantity on the equiment record. 

# SFDX  CLI
sfdx force:apex:trigger:create -n MaintenanceRequest -s Case -e 'before update, after update' -d force-app/main/default/triggers

sfdx force:apex:class:create -n MaintenanceRequestHelper -d force-app/main/default/classes

sfdx force:apex:class:create -n MaintenanceRequestTest -d force-app/main/default/test

sfdx force:apex:class:create -n WarehouseCalloutService -d force-app/main/default/classes

sfdx force:apex:class:create -n WarehouseCalloutServiceMock -d force-app/main/default/test

sfdx force:apex:class:create -n WarehouseCalloutServiceTest -d force-app/main/default/test











