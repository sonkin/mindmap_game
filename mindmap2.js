const allMindMapNodes = {
"Dependency Injection":[
   "Separates the creation of objects from their use",
   "Provides loose coupling",
   "Provides ease of testing",
   "Makes application very flexible",
],
"Application context":[
   "Main interface for accessing Spring beans",
   "A holder for Spring Beans",
],
"Creating a Spring Bean":[
   "Can be done manually in method marked as @Bean",
   "Possible to do by marking class as @Component, etc.",
],
"Configuration":[
    "Uses conventions over configuration principle",
],
"POM configuration":[
    "defines dependencies of application"
],
"properties configuration":[
    "can be replaced by YAML configuration"
],
"@ComponentScan":[
   "Finds all beans marked as @Component, @Service, etc.",
],
"@Service":[
   "Specialized @Component for business logic",
],
"@Configuration":[
   "Annotates a class used to create and configure beans",
   "Contains @Bean methods",
],
"Profiles":[
   "Activating only a subset of the beans",
],
"@Profile":[
   "Marks the @Bean or class which should be activated conditionally",
],
"Activating a profile":[
   "Using -Dspring.profiles.active command line flag",
   "Using spring.profiles.active=<profile> in application.properties",
],
"Actuator":[
   "Provides features for monitoring and managing",
   "Exposes endpoints for gathering information and metrics",
],
"@EnableAutoConfiguration":[
    "Configures Spring based on dependencies in pom.xml"
],
"Spring Boot Starters":[
    "Bundle with several dependencies",
],
"spring-boot-starter-parent":[
    "Includes dependency management for all possible dependencies",
    "Defines versions for all dependencies",
],
"@EnableAutoConfiguration":[
   "Configures Spring based on dependencies in pom.xml",
],
"application.properties":[
   "Located in any folder in the classpath",
],
"@PropertySource":[
   "Used to specify the path to the additional application settings file",
],
"@Value":[
   "Used to embed a value from application.properties",
],
}

let openedMindMapNodes = allMindMapNodes;
let taskNodes = Object.entries(allMindMapNodes).flatMap(n=>n[1]);
