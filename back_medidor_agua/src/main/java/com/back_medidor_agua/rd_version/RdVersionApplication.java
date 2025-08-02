package com.back_medidor_agua.rd_version;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RdVersionApplication {
	public static void main(String[] args) {
		SpringApplication.run(RdVersionApplication.class, args);
	}
}
