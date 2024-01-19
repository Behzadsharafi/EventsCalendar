import { EventType } from "./../components/Event";

export const dummyEvents: EventType[] = [
  {
    name: "Team Meeting",
    startDate: new Date(2024, 0, 17, 10, 0),
    endDate: new Date(2024, 0, 17, 12, 0),
    location: "Conference Room A",
    label: "Work",
  },

  {
    name: "Lunch with John",
    startDate: new Date(2024, 0, 18, 12, 30),
    endDate: new Date(2024, 0, 18, 13, 30),
    location: "Cafeteria",
    label: "Social",
  },
  {
    name: "Doctor's Appointment",
    startDate: new Date(2024, 0, 20, 15, 0),
    endDate: new Date(2024, 0, 20, 16, 0),
    location: "Medical Center",
    label: "Health",
  },
  {
    name: "Project Deadline",
    startDate: new Date(2024, 0, 22, 18, 0),
    endDate: new Date(2024, 0, 22, 20, 0),
    location: "Home Office",
    label: "Work",
  },
  {
    name: "Birthday Party",
    startDate: new Date(2024, 0, 25, 19, 0),
    endDate: new Date(2024, 0, 25, 22, 0),
    location: "Friend's House",
    label: "Social",
  },
];
