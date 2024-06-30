// src/components/CalendarComponent.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Event as CalendarEvent,
  luxonLocalizer,
  Views,
} from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";

const localizer = luxonLocalizer(DateTime);

interface ApiResponse {
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  city: string;
  description: string;
  devices: { id: number; name: string }[];
  robots: { id: number; name: string }[];
  cars: { id: number; name: string }[];
  guardians: { id: number; name: string }[];
}

interface EventWithColor extends CalendarEvent {
  color: string;
  description: string;
  city: string;
  devices: { id: number; name: string }[];
  robots: { id: number; name: string }[];
  cars: { id: number; name: string }[];
  guardians: { id: number; name: string }[];
}

const eventColors = [
  "#F4A582",
  "#92C5DE",
  "#F7B6D2",
  "#B6D7A8",
  "#FFDDC1",
  "#B4A7D6",
  "#EAD1DC",
  "#D5A6BD",
  "#F4CCCC",
  "#A3C1AD",
];

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<EventWithColor[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventWithColor | null>(
    null
  );

  useEffect(() => {
    axios
      .get<ApiResponse[]>("http://localhost:8000/api/events")
      .then((response) => {
        const data = response.data;

        const fetchedEvents: EventWithColor[] = data.map((event, index) => ({
          id: event.id,
          title: event.name,
          start: new Date(event.start_datetime),
          end: new Date(event.end_datetime),
          color: eventColors[index % eventColors.length],
          description: event.description,
          city: event.city,
          robots: event.robots,
          devices: event.devices,
          cars: event.cars,
          guardians: event.guardians,
        }));

        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleEventClick = (event: EventWithColor) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 900 }}
        defaultView={Views.WEEK}
        showMultiDayTimes
        eventPropGetter={(event) => ({
          style: { backgroundColor: event.color },
        })}
        onSelectEvent={handleEventClick}
        showAllEvents
      />
      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={closeModal}
        contentLabel="Event Details"
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>{`City: ${selectedEvent.city}`}</p>
            <p>{`Description: ${selectedEvent.description}`}</p>
            <p>{`Time start: ${selectedEvent.start}`}</p>
            <p>{`Time end: ${selectedEvent.end}`}</p>
            <p>{`Robots: ${selectedEvent.robots.map((item) => item.name)}`}</p>
            <p>{`Cars: ${selectedEvent.cars.map((item) => item.name)}`}</p>
            <p>{`Devices: ${selectedEvent.devices.map(
              (item) => item.name
            )}`}</p>
            <p>{`Guardians: ${selectedEvent.guardians.map(
              (item) => item.name
            )}`}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CalendarComponent;
