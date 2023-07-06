public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProductList() {
        return [
            SELECT Id, Name, Description__c, Type__c, Family__c, Price__c, Image__c
             from Product__c
        ];
    }

    // @AuraEnabled(cacheable=true)
    // public static List<String> getPicklistValues(String objectApiName, String fieldName) {
    //     List<String> picklistValues = new List<String>();
        
    //     try {
    //         Schema.DescribeFieldResult fieldResult = Schema.getGlobalDescribe().get(objectApiName).getDescribe().fields.getMap().get(fieldName).getDescribe();
            
    //         List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();
    //             for (Schema.PicklistEntry entry : picklistEntries) {
    //                 picklistValues.add(entry.getValue());
    //             }
    //     } catch (Exception e) {
    //         System.debug(e.getMessage());
    //     }
        
    //     return picklistValues;
    // }


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
            throw new AuraHandledException('Error creating product: ' + e.getMessage());
        }
    }
    
}