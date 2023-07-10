@isTest
private class ProductControllerTest {
    @isTest
    static void testGetProductList() {
        // Создание тестовых записей Product
        List<Product__c> products = new List<Product__c>();
        products.add(new Product__c(Name = 'Product 1', Description__c = 'Description 1', Type__c = 'new', Family__c = 'Electronics', Price__c = 10, Image__c = ''));
        products.add(new Product__c(Name = 'Product 2', Description__c = 'Description 2', Type__c = 'killed', Family__c = 'Furniture', Price__c = 20, Image__c = ''));
        insert products;

        // Вызов метода getProductList
        List<Product__c> productList = ProductController.getProductList();

        // Проверка результатов
        System.assertEquals(2, productList.size(), 'Количество записей должно быть 2');
        System.assertEquals('Product 1', productList[0].Name, 'Название продукта должно быть "Product 1"');
        System.assertEquals('Product 2', productList[1].Name, 'Название продукта должно быть "Product 2"');
    }
    
    @isTest
    static void getLastAddOrderTest() {
        Order__c newOrder = new Order__c();
        insert newOrder;
        Id temp = (ProductController.getLastAddOrder()).Id;
        System.assertEquals(temp, newOrder.Id);
    }

    @isTest
    static void testCreateProduct() {
        // Вызов метода createProduct
        Test.startTest();
        ProductController.createProduct('New Product', 'New Description', 'new', 'Cars', 50, '');
        Test.stopTest();

        // Проверка создания записи Product
        List<Product__c> products = [SELECT Id, Name, Description__c, Type__c, Family__c, Price__c, Image__c FROM Product__c];
        System.assertEquals(1, products.size(), 'Количество записей должно быть 1');
        System.assertEquals('New Product', products[0].Name, 'Название продукта должно быть "New Product"');
    }

    @isTest
    static void testCreateProduct_ExceptionHandling() {
        // Вызов метода createProduct с некорректными данными
        Test.startTest();
        try {
            ProductController.createProduct('name', 'Description', 'new item', 'Cars', 100, '');
            System.assert(false, 'Должна возникнуть ошибка');
        } catch (AuraHandledException e) {
            System.assertEquals('Script-thrown exception', e.getMessage(), 'Ошибка должна быть обработана');
        } 
        Test.stopTest();

        // Проверка отсутствия созданной записи Product
        List<Product__c> products = [SELECT Id FROM Product__c];
        System.assertEquals(0, products.size(), 'Запись Product не должна быть создана');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////


    @isTest
    static void testCreateOrder() {
        // Создание тестовой записи Account
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;

        // Вызов метода createOrder
        Test.startTest();
        Order__c newOrder = ProductController.createOrder(testAccount.Id);
        Test.stopTest();

        // Проверка создания записи Order
        List<Order__c> orders = [SELECT Id, AccountId__c FROM Order__c];
        System.assertEquals(1, orders.size(), 'Количество записей должно быть 1');
        System.assertEquals(testAccount.Id, orders[0].AccountId__c, 'AccountId__c должен соответствовать тестовому Account');

        // Проверка возврата последнего добавленного заказа
        Order__c lastOrder = ProductController.getLastAddOrder();
        System.assertEquals(orders[0].Id, lastOrder.Id, 'Id последнего добавленного заказа должно совпадать');
    }

    @isTest
    static void testCreateOrderItem() {
        // Создание тестовой записи Account
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;

        // Создание тестовых записей Order и Product
        Order__c testOrder = ProductController.createOrder(testAccount.Id);

        Product__c testProduct = new Product__c(Name = 'Product 1', Description__c = 'Description 1', Type__c = 'new', Family__c = 'Electronics', Price__c = 10, Image__c = '');
        insert testProduct;

        // Вызов метода createOrderItem
        Test.startTest();
        ProductController.createOrderItem(testOrder.Id, testProduct.Id, 2, 25);
        Test.stopTest();

        // Проверка создания записи Order Item
        List<OrderItem__c> orderItems = [SELECT Id, OrderId__c, Product__c, Quantity__c, Price__c FROM OrderItem__c];
        System.assertEquals(1, orderItems.size(), 'Количество записей должно быть 1');
        System.assertEquals(testOrder.Id, orderItems[0].OrderId__c, 'OrderId__c должен соответствовать тестовому Order');
        System.assertEquals(testProduct.Id, orderItems[0].Product__c, 'Product__c должен соответствовать тестовому Product');
        System.assertEquals(2, orderItems[0].Quantity__c, 'Quantity__c должен быть 2');
        System.assertEquals(25, orderItems[0].Price__c, 'Price__c должен быть 25');
    }
}