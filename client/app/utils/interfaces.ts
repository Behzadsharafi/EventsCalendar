interface BaseEvent {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  label: string;
}

export interface EventType extends BaseEvent {
  id: number;
}

export interface CreateEventDTO extends BaseEvent {}
export interface UpdateEventDTO extends Partial<BaseEvent> {}
