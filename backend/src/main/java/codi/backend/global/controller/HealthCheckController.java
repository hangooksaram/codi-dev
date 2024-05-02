package codi.backend.global.controller;

import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = { "Health Check" })
@RestController
public class HealthCheckController {
    @GetMapping("/health")
    public ResponseEntity checkHealthStatus() {
        return ResponseEntity.ok("OK");
    }
}
