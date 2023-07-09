@isTest
public class OrderItemTriggerTest {
    @isTest
    static void testOrderItemTrigger() {

        Product__c testProduct = new Product__c();
        testProduct.Name = 'testProduct';
        testProduct.Description__c = 'just testProduct';
        testProduct.Type__c = 'new';
        testProduct.Family__c = 'Cars';
        testProduct.Price__c = (Decimal)100;
        testProduct.Image__c = '';
        insert testProduct;

        Product__c testProduct2 = new Product__c();
        testProduct2.Name = 'testProduct2';
        testProduct2.Description__c = 'just testProduct2';
        testProduct2.Type__c = 'new';
        testProduct2.Family__c = 'Cars';
        testProduct2.Price__c = (Decimal)10;
        testProduct2.Image__c = '';
        insert testProduct2;

        Order__c testOrder = new Order__c();
        testOrder.Name__c = 'Test Order';
        testOrder.TotalProductCount__c = 0;
        testOrder.TotalPrice__c = 0;
        insert testOrder;

        OrderItem__c testOrderItem = new OrderItem__c();
        testOrderItem.Product__c = testProduct.Id;
        testOrderItem.Quantity__c = 5;
        testOrderItem.Price__c = testProduct.Price__c * testOrderItem.Quantity__c;
        testOrderItem.OrderId__c = testOrder.Id;
        
        OrderItem__c testOrderItem2 = new OrderItem__c();
        testOrderItem2.Product__c = testProduct2.Id;
        testOrderItem2.Quantity__c = 10;
        testOrderItem2.Price__c = testProduct2.Price__c * testOrderItem2.Quantity__c;
        testOrderItem2.OrderId__c = testOrder.Id;

        Test.startTest();
        insert testOrderItem;
        insert testOrderItem2;
        Test.stopTest();

        Order__c updatedOrder = [SELECT TotalProductCount__c, TotalPrice__c FROM Order__c WHERE Id = :testOrder.Id];
        System.assertEquals(testOrderItem.Quantity__c + testOrderItem2.Quantity__c, updatedOrder.TotalProductCount__c, 'TotalProductCount__c must be 5');
        System.assertEquals(testProduct2.Price__c * testOrderItem2.Quantity__c + testProduct.Price__c * testOrderItem.Quantity__c, updatedOrder.TotalPrice__c, 'TotalPrice__c must be 10');
    }
}