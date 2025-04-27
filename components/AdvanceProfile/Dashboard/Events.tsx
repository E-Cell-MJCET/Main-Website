/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-contradicting-classname */
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define types for our data
interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface EventFormData {
  title: string;
  date: string;
  description: string;
}

function Events({ userId }: { userId: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<EventFormData>({
    title: "",
    date: "",
    description: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  // Fetch user role and events on component mount
  useEffect(() => {
    if (userId) {
      fetchUserRole();
      fetchEvents();
    }
  }, [userId]);

  // Fetch user role from Supabase
  const fetchUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from("Team")
        .select("Member_Type")
        .eq("custom_auth_userID", userId)
        .single();

      if (error) throw error;
      setUserRole(data?.Member_Type);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Fetch events from Supabase
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents((data as Event[]) || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response;

      if (editingEventId) {
        // Update existing event
        response = await supabase
          .from("Events")
          .update(newEvent)
          .eq("id", editingEventId);
      } else {
        // Add new event
        response = await supabase.from("Events").insert([newEvent]);
      }

      if (response.error) throw response.error;

      // Reset form and refresh events
      setNewEvent({ title: "", date: "", description: "" });
      setIsFormOpen(false);
      setEditingEventId(null);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // Start editing an event
  const startEditing = (event: Event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      description: event.description,
    });
    setEditingEventId(event.id);
    setIsFormOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isGoverningBody = userRole === "Governing Body";

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Upcoming Events
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Manage and view all E-Cell events here.
              </p>
            </div>
            {isGoverningBody && (
              <button
                onClick={() => {
                  setNewEvent({ title: "", date: "", description: "" });
                  setEditingEventId(null);
                  setIsFormOpen(!isFormOpen);
                }}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 sm:mt-0"
              >
                {isFormOpen ? "Cancel" : "Add Event"}
              </button>
            )}
          </div>
        </div>
        {isFormOpen && isGoverningBody && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
              {editingEventId ? "Edit Event" : "Add New Event"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
                >
                  {editingEventId ? "Update Event" : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        )}
        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-current border-r-transparent"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Loading events...
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white py-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-300">No events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mb-3 text-sm text-blue-600 dark:text-blue-400">
                    {formatDate(event.date)}
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                  {isGoverningBody && (
                    <button
                      onClick={() => startEditing(event)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Edit Event
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
