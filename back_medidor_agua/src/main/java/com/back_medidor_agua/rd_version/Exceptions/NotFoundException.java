package com.back_medidor_agua.rd_version.Exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String messages) {
        super(messages);
    }
}
