package com.skillsmanagerapi.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://skills-manager.com:3000", "http://localhost:80", "http://client:80", "https://cv.morosystems.cz")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
