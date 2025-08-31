package com.email.writer.app;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/generate")
    public ResponseEntity<String> getGenerateInfo(){
        return ResponseEntity.ok("Email generation endpoint is working. Use POST method with email content and tone.");
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck(){
        return ResponseEntity.ok("Backend is running successfully!");
    }
}

@RestController
class RootController {
    
    @GetMapping("/")
    public ResponseEntity<String> root(){
        return ResponseEntity.ok("Email Writer API is running. Frontend: http://localhost:3000 | API: /api/email/generate");
    }
}
