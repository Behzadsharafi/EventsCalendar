package com.zad.server;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.zad.server.event.EventRepository;
import com.zad.server.event.EventService;

@DataJpaTest
public class EventServiceTest {
	
	@Mock
	private EventRepository eventRepository;
	
	@Mock
	private ModelMapper mapper;
	
	@InjectMocks
	private EventService underTest;
	
	@Test
	void getAll_ReturnsAllData() {
		underTest.getAll();
		Mockito.verify(eventRepository).findAll();
	}
	
	
}
