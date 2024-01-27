package com.zad.server.event;

import java.util.Date;


import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

public class EventUpdateDTO {
	
	@Getter
	@Setter
	@Pattern(regexp = "^(?=\\S).*$", message="Name cannot be empty")
	private String name;
	
	@Getter
	@Setter
	private Date startDate;
	
	@Getter
	@Setter
	private Date endDate;
	
	@Getter
	@Setter
	@Pattern(regexp = "^(?=\\S).*$", message="location cannot be empty")
	private String location;
	
	@Getter
	@Setter
	@Pattern(regexp = "^(?=\\S).*$", message="label cannot be empty")
	private String label;

}
