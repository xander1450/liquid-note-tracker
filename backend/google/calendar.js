import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:5000/oauth"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client
});


export async function createEvent(note) {

  const event = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: note.title,
      description: note.content || "",
      start: {
        dateTime: note.start,
        timeZone: "UTC"
      },
      end: {
        dateTime: note.end,
        timeZone: "UTC"
      }
    }
  });
  return event.data.id;
}

export async function deleteEvent(eventId) {
  if (!eventId) return;

  await calendar.events.delete({
    calendarId: "primary",
    eventId
  });
}



