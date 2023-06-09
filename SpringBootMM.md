Spring Boot MindMap
- Spring Boot Starters
    - Special set of Maven/Gradle POMs
    - Simplify creating of Spring Boot applications
    - Contains a lot of default settings
    - Contains required dependencies
- Dependency Injection (DI)
    - Separates the creation of objects from their use
    - Provides loose coupling
    - Provides ease of testing
    - Makes application very flexible
- Application context
    - Main interface for accessing Spring beans and managing their lifecycle
- Spring Bean
    - An object managed by a Spring container
    - Created, configured, and managed by Spring container
- Creating a Spring Bean
    - Possible to do with the use of @Bean
    - Possible to do by marking class as @Component, @Service, @Repository, @RestController
- @Service
    - Specialized @Component for business logic
@SpringBootApplication
    - Alias for @ComponentScan, @EnableAutoConfiguration, @Configuration
- @ComponentScan
    - Finds all beans marked as @Component, @Service, @Repository, @RestController
- @EnableAutoConfiguration
    - Configures Spring based on dependencies in pom.xml
- @Configuration
    - Annotates a class used to create and configure beans
- @Bean methods
    - Located in classes marked as @Configuration
- Spring profiles
    - Activating only a subset of the beans
- Activating profile
    - Using -Dspring.profiles.active command line flag
    - Using spring.profiles.active=<profile> in application.properties
- @Profile
    - Used to specify which beans should be activated for a specific profile
- @Value
    - Used to embed a value from application.properties
- @PropertySource
    - Used to specify the path to the additional application settings file
- application.properties
    - Located in any folder in the classpath
- spring-boot-starter-parent
    - Includes dependency management for all possible dependencies
    - Defines versions of all dependencies
- Actuator
    - Provides production-ready features for monitoring and managing
- Spring Boot applications
  - Exposes various endpoints for gathering information and metrics
  - Customizable and extensible

