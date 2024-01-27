package com.zad.server.event;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="events")
public class Event {
	
	@Getter
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY )
	private Long id;
	
	@Column
	@Getter
	@Setter
	private String name;
	
	@Column
	@Getter
	@Setter
	private Date startDate;
	
	@Column
	@Getter
	@Setter
	private Date endDate;
	
	@Column
	@Getter
	@Setter
	private String location;
	
	@Column
	@Getter
	@Setter
	private String label;
	
	public Event() {}
	
	public Event(String name, Date startDate, Date endDate, String location, String label) {
		this.name=name;
		this.startDate=startDate;
		this.endDate=endDate;
		this.location=location;
		this.label=label;
	}
	}
