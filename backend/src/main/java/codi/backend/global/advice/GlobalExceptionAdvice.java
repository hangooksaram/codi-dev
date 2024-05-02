package codi.backend.global.advice;

import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    private final HttpServletRequest request;

    public GlobalExceptionAdvice(HttpServletRequest request) {
        this.request = request;
    }

    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<ErrorResponse> handleBusinessLogicException(BusinessLogicException e) {
        ErrorResponse response = ErrorResponse.of(e.getExceptionCode().getStatus(), e.getExceptionCode().getMessage(), request.getRequestURI());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler({ HttpRequestMethodNotSupportedException.class, HttpMessageNotReadableException.class, MissingServletRequestParameterException.class })
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(Exception e) {
        return new ResponseEntity<>(ErrorResponse.of(HttpStatus.BAD_REQUEST.value(), e.getMessage(), request.getRequestURI()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        log.error("# handle Exception", e);
        return new ResponseEntity<>(ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request.getRequestURI()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
