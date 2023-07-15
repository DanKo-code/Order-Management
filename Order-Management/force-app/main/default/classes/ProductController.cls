public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProductList() {
        return [
            SELECT Id, Name, Description__c, Type__c, Family__c, Price__c, Image__c
             from Product__c
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Order__c getLastAddOrder() {
        
        Order__c temp = [
            SELECT Id
             from Order__c
             order by CreatedDate DESC
             LIMIT 1
        ];
        
        System.debug(temp);
        
        return temp;
    }

        @AuraEnabled
    public static void createProduct(String name, String description, String type, String family, Decimal price, String image) {
        Product__c newProduct = new Product__c();
        newProduct.Name = name;
        newProduct.Description__c = description;
        newProduct.Type__c = type;
        newProduct.Family__c = family;
        newProduct.Price__c = price;
        newProduct.Image__c = image;

        try {
            insert newProduct;
        } catch (Exception e) {
            System.debug(e);
            throw new AuraHandledException('Error creating product: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static Order__c createOrder(Id accountId) 
    {
        Order__c newOrder = new Order__c();
        newOrder.AccountId__c = accountId;
        newOrder.TotalProductCount__c = 0;
        newOrder.TotalPrice__c = 0;
        

        
        try {
            
            insert newOrder;
            return getLastAddOrder();
        } catch (Exception e) {
            throw new AuraHandledException('Error creating product: ' + e.getMessage());
        }

        
    }

    @AuraEnabled
public static void createOrderItem(Id orderId ,Id productId, Decimal quantity, Decimal price ) {
    
    OrderItem__c newOrderItem = new OrderItem__c();
    newOrderItem.Product__c = productId;
    newOrderItem.OrderId__c = orderId;
    
    newOrderItem.Quantity__c = quantity;
    newOrderItem.Price__c = price;
    
    try {
        insert newOrderItem;
    } catch (Exception e) {
        throw new AuraHandledException('Error creating product: ' + e.getMessage());
    }
}

    @AuraEnabled
    public static List<String> getPicklistValues(String fieldName) {
        // Replace 'Product__c.Type__c' with the API name of your custom field
        // (e.g., 'Custom_Object__c.Custom_Field__c')
        System.debug('start!!!');
        //String fieldName = 'Type__c';

        // Get the SObjectField instance for the custom field
        Schema.SObjectField field = Schema.getGlobalDescribe().get('Product__c').getDescribe().fields.getMap().get(fieldName);
        System.debug(Schema.getGlobalDescribe().get('Product__c').getDescribe().fields.getMap());

        // Ensure it's a picklist field
        if (field != null) {
            System.debug('get into if!');
            // Get the picklist values
            List<Schema.PicklistEntry> picklistValues = field.getDescribe().getPicklistValues();

            // Prepare a list to store the picklist item labels
            List<String> picklistLabels = new List<String>();

            // Iterate through the picklist values and add the labels to the list
            for (Schema.PicklistEntry picklistEntry : picklistValues) {
                picklistLabels.add(picklistEntry.getLabel());
            }

            System.debug(picklistLabels);

            return picklistLabels;
        }

        // Return null if the field is not a picklist
        return null;
    }
    
}