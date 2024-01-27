package com.zad.server.event;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zad.server.exceptions.NotFoundException;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/events")
public class EventController {
	
	@Autowired
	private EventService eventService;
	
	@GetMapping
	public ResponseEntity<List<Event>> getAll() {
		List<Event> allEvents = this.eventService.getAll();
		return new ResponseEntity<>(allEvents, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Event> createEvent(@Valid @RequestBody EventCreateDTO data) {
		Event newEvent = this.eventService.createEvent(data);
		return new ResponseEntity<Event>(newEvent, HttpStatus.CREATED);	
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Event> getById(@PathVariable Long id) {
		Optional<Event> found = this.eventService.getById(id);
		
		if(found.isPresent()) {
			return new ResponseEntity<Event>(found.get(), HttpStatus.OK);
		}

		throw new NotFoundException(String.format("Post with id: %d does not exist", id));
	}
	
	// deleteById would also throw notFound
	@DeleteMapping("/{id}")
	public ResponseEntity<Event> deleteById(@PathVariable Long id) {
		boolean deleted = this.eventService.deleteById(id);
		
		if(deleted == true) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		
		throw new NotFoundException(String
				.format("Post with id: %d does not exist, could not delete", id));
	}
	

	@PatchMapping("/{id}")
	public ResponseEntity<Event> updateById(@PathVariable Long id, 
			@Valid @RequestBody EventUpdateDTO data) {
		
		Optional<Event> updated = this.eventService.updateById(id, data);
		
		if(updated.isPresent()) {
			return new ResponseEntity<Event>(updated.get(), HttpStatus.OK);
		}
		
		throw new NotFoundException(String
				.format("Post with id: %d does not exist, could not update", id));
	}

}