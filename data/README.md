# Events Data Management

This directory contains JSON files for managing event data:

## Files

- `upcoming-events.json` - Contains events that are scheduled for the future
- `previous-events.json` - Contains events that have already occurred

## Event Structure

Each event object should have the following structure:

```json
{
  "title": "Event Name",
  "date": "Date String",
  "description": "Event description text",
  "image": "/path/to/image.jpg",
  "link": "https://event-link.com"
}
```

## Components

- `components/events/upcoming-events.tsx` - Displays upcoming events with a fallback UI when empty
- `components/events/previous-events.tsx` - Displays previous events with a fallback UI when empty

## Fallback UI

When there are no upcoming events, the component shows:
"We are cooking something stay tuned!! :)" with a cooking emoji.

When there are no previous events, the component shows:
"No previous events yet" with a calendar emoji.
