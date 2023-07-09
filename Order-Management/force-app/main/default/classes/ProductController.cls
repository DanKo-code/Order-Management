public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProductList() {
        return [
            SELECT Id, Name, Description__c, Type__c, Family__c, Price__c, Image__c
             from Product__c
        ];
    }

    // @AuraEnabled(cacheable=true)
    // public static Order__c getLastAddOrder() {
    //     return [
    //         SELECT Id, UserId__c, TotalPrice__c
    //          from Order__c
    //          order by CreatedDate DESC
    //          LIMIT 1
    //     ];
    // }

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
    
}