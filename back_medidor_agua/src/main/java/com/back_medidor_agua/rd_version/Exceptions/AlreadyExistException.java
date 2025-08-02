package com.back_medidor_agua.rd_version.Exceptions;

public class AlreadyExistException extends RuntimeException {
    public AlreadyExistException(String messages) {
        super(messages);
    }
}
