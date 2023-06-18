package com.ChitChat.demo.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;
import java.util.HashMap;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(HttpServletRequest request, AuthenticationException exception){
        String apiPath = request.getRequestURI();
        ErrorResponse response = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), exception.getMessage(),apiPath,new Date());
        return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public ResponseEntity<ValidationErrorResponse> handleException(HttpServletRequest request,MethodArgumentNotValidException exception){
        ValidationErrorResponse error = new ValidationErrorResponse();
        HashMap<String, String> errorMessages = new HashMap<>();
        BindingResult bindingResult = exception.getBindingResult();
        for (FieldError fieldError: bindingResult.getFieldErrors()) {
            errorMessages.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        error.setPath(request.getRequestURI());
        error.setMessages(errorMessages);
        error.setTimeStamp(new Date());
        return ResponseEntity.badRequest().body(error);
    }
}
