package codi.backend.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    private static final String API_NAME = "CODI API";
    private static final String API_VERSION = "1.0.0";
    private static final String API_DESCRIPTION = "장애인들의 직무 상담을 위한 멘토링 플랫폼, CODI API 명세서";

    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
                .group("codi")
                .pathsToMatch("/**")
                // add  openApiCustomiser
                .build();
    }

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .addServersItem(new Server().url("/"))
                .info(new Info()
                        .title(API_NAME)
                        .version(API_VERSION)
                        .description(API_DESCRIPTION))
                .addSecurityItem(new SecurityRequirement().addList("Authorization"))
                .components(new Components().addSecuritySchemes("Authorization",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }

//    private OpenApiCustomiser openApiCustomiser() {
//        return openApi -> openApi.getComponents()
//                .addSchemas("Pageable", )
//                .addSchemas("CustomPageable", customPageableSchema());
//    }
//
//    private Map<String, Schema> pageableSchema() {
//        Map<String, Schema> pageableSchema = new LinkedHashMap<>();
//        pageableSchema.put("page", new IntegerSchema().description("페이지 번호"));
//        pageableSchema.put("size", new IntegerSchema().description("페이지 사이즈"));
//        pageableSchema.put("sort", new StringSchema().description("오름차순 또는 내림차순(기본 설정은 오름차순): asc or desc"));
//        return pageableSchema;
//    }
//
//    private Map<String, Schema> customPageableSchema() {
//        Map<String, Schema> customPageableSchema = new LinkedHashMap<>();
//        customPageableSchema.putAll(pageableSchema());
//        return customPageableSchema;
//    }
}
