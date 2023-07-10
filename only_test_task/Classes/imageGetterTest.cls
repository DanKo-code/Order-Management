@isTest
public class imageGetterTest {
    @isTest
    static void testGetImage_SuccessfulResponse() {
        String prodName = 'dog';
        String expectedUrl = 'http://www.glyffix.com/Image/ShowUploadedImage/522';
        
        HttpResponse fakeResponse = new HttpResponse();
        fakeResponse.setStatusCode(200);
        fakeResponse.setBody('{"success": true, "word": "dog", "rowcount": 1, "data": [{"id": 522, "imageurl": "' + expectedUrl + '"}], "errormessage": ""}');
        
        Test.setMock(HttpCalloutMock.class, new FakeHttpResponseGenerator(fakeResponse));
        
        Test.startTest();
        String imageUrl = imageGetter.getImage(prodName);
        Test.stopTest();
        
        System.assertEquals(expectedUrl, imageUrl, 'URL изображения должен соответствовать ожидаемому значению');
    }
    
    @isTest
    static void testGetImage_NoImageData() {
        String prodName = 'cat';
        
        HttpResponse fakeResponse = new HttpResponse();
        fakeResponse.setStatusCode(200);
        fakeResponse.setBody('{"success": true, "word": "cat", "rowcount": 0, "data": [], "errormessage": ""}');
        
        Test.setMock(HttpCalloutMock.class, new FakeHttpResponseGenerator(fakeResponse));
        
        Test.startTest();
        String imageUrl = imageGetter.getImage(prodName);
        Test.stopTest();
        
        System.assertEquals('Image not found', imageUrl, 'Метод должен вернуть "Image not found"');
    }
    
    @isTest
    static void testGetImage_UnsuccessfulResponse() {
        String prodName = 'dog';
        
        HttpResponse fakeResponse = new HttpResponse();
        fakeResponse.setStatusCode(500);
        fakeResponse.setBody('{"success": false, "word": "dog", "rowcount": 0, "data": [], "errormessage": "Error occurred"}');
        
        Test.setMock(HttpCalloutMock.class, new FakeHttpResponseGenerator(fakeResponse));
        
        Test.startTest();
        String imageUrl = imageGetter.getImage(prodName);
        Test.stopTest();
        
        System.assertEquals('Image not found', imageUrl, 'Метод должен вернуть "Image not found"');
    }
    
    // Вспомогательный класс для генерации фейкового HTTP-ответа
    private class FakeHttpResponseGenerator implements HttpCalloutMock {
        private HttpResponse fakeResponse;
        
        public FakeHttpResponseGenerator(HttpResponse fakeResponse) {
            this.fakeResponse = fakeResponse;
        }
        
        public HttpResponse respond(HttpRequest request) {
            return fakeResponse;
        }
    }
}