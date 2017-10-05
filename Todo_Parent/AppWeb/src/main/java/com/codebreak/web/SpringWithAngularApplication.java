package com.codebreak.web;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.codebreak"})
public class SpringWithAngularApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringWithAngularApplication.class, args);
	}
}
