package codi.backend.global.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Health Check", description = "AWS Health Check")
@RestController
public class HealthCheckController {
    @GetMapping("/health")
    public ResponseEntity checkHealthStatus() {
        return ResponseEntity.ok("OK");
    }
}
