package com.back_medidor_agua.rd_version.Exceptions;


public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super (message);
    }
}
