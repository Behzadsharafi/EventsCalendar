package com.zad.server;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import com.zad.server.event.EventRepository;
import com.zad.server.event.EventService;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

	@Mock
	private EventRepository eventRepository;

	@Mock
	private ModelMapper mapper;

	@InjectMocks
	private EventService underTest;

	@Test
	void findAll_ReturnsAllData() {
		underTest.getAll();
		Mockito.verify(eventRepository).findAll();

	}

}
