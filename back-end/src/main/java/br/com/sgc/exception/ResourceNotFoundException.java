package br.com.sgc.exception;

public class ResourceNotFoundException extends RuntimeException {


	private static final long serialVersionUID = 9198458999732967030L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
}