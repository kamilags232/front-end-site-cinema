package br.com.sgc.exception;

public class BusinessException extends RuntimeException {

    
	private static final long serialVersionUID = 5000589356841635030L;

	public BusinessException(String message) {
        super(message);
    }
}