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
        return [
            SELECT Id, Name, UserId__c, TotalPrice__c
             from Order__c
             order by CreatedDate DESC
             LIMIT 1
        ];
    }

        @AuraEnabled
    public static void createProduct(String name, String description, String type, String family, byte price, String image) {
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

    static Order__c newOrder;
    @AuraEnabled
    public static void createOrder(String name, String userId) {
        newOrder = new Order__c();
        newOrder.Name = name;
        newOrder.UserId__c = userId;
        newOrder.TotalProductCount__c = 0;
        newOrder.TotalPrice__c = 0;
        

        
        try {
            
            insert newOrder;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating product: ' + e.getMessage());
        }

        
    }

    @AuraEnabled
public static void createOrderItem(String name, Order__c lastOrder, Product__c product) {
    
    OrderItem__c newOrderItem = new OrderItem__c();
    newOrderItem.Name = name;
    newOrderItem.Order__c = lastOrder.Id;
    newOrderItem.Product__c = product.Id;
    //newOrderItem.Quantity__c = Quantity;
    //newOrderItem.Price__c = Price;
    
    try {
        insert newOrderItem;
    } catch (Exception e) {
        throw new AuraHandledException('Error creating product: ' + e.getMessage());
    }
}
    
}