const allMindMapNodes = {
    "@RestController":[
        "Any object returned from the method of this class is converted to JSON"
    ],
    "Content-type":[
        "Defines the MIME type of sent data",
        "Has default value \"application/json\" for any @RestController method"
    ],
    "Accept": [
        "Specifies the data format in which client wants to receive data",
        "Defines an expected MIME type, like application/json or text/html"
    ],
    "@GetMapping": [
        "Used to retrieve a resource or a collection of resources"
    ],
    "@RequestParam": [
        "Allows binding of URL data after ?, for example order?id=123",
        "May be used to set default value and make parameters optional",
        "Applied by default to the controller method arguments"
    ],
    "@PathVariable": [
        "Used for binding a URI template variable, for example /order/{id}",
        "Helpful in creating REST URLs with dynamic path segments"
    ],
    "@PostMapping": [
        "Used to create a new resource"
    ],
    "@RequestBody": [
        "Binds HTTP request body to a method parameter",
        "Allows deserialization of incoming data to a Java object"
    ],
    "@PutMapping": [
        "Used to update an existing resource"
    ],
    "@PatchMapping": [
        "Used to apply partial updates to a resource",
    ],
    "@DeleteMapping": [
        "Receives request data not from the body, but from request params and URL, like GET"
    ],
    "@ExceptionHandler": [
        "Used to define a method that handles specific exceptions",
        "Can be combined with @ControllerAdvice for global exception handling"
    ],
    "@ControllerAdvice": [
        "A special @Component that allows sharing exception handling logic",
        "Contains one or more @ExceptionHandler to handle exceptions globally"
    ],
    "Headers": [
        "Used to provide additional information like preferred language, authorization, etc."
    ]
}


let openedMindMapNodes = allMindMapNodes;
let taskNodes = Object.entries(allMindMapNodes).flatMap(n=>n[1]);
