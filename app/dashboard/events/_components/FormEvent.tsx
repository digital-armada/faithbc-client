"use client";

import FormDateTimePicker from "@/components/ui/FormDateTimePicker";
import { createEvent, updateEvent } from "@/data/actions/event-action";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { EventImageUpload } from "./EventImageUpload";
import Editor from "./Editor";
import { getStrapiURL } from "@/lib/utils";

export default function FormEvent({ data, id } = {}) {
  const [featureImageId, setFeatureImageId] = useState<string | null>(
    data?.featuredImage || null,
  );
  const [content, setContent] = useState(data?.content || "");
  const formRef = useRef(null);
  const baseUrl = getStrapiURL();

  useEffect(() => {
    if (data?.featuredImage) {
      setFeatureImageId(data.featuredImage);
    }
  }, [data]);

  const updateEventFunction = async (prevState, formData) => {
    formData.append("id", id);
    formData.append("slug", data?.slug);
    formData.append("featuredImage", featureImageId);
    formData.append("content", content);
    try {
      await updateEvent(formData); // Assuming `data.id` is the event ID
    } catch (error) {
      console.error("Error handling form action:", error);
      throw error;
    }
  };

  const createEventFunction = async (prevState, formData) => {
    if (featureImageId) {
      formData.append("featuredImage", featureImageId);
    }
    formData.append("content", content);
    try {
      await createEvent(formData);
    } catch (error) {
      console.error("Error handling form action:", error);
      throw error;
    }
  };

  const [state, formAction] = useFormState(
    data?.slug ? updateEventFunction : createEventFunction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current.reset();
      // setFeatureImageId(null);
    }
  }, [state]);

  const handleImageUploaded = (imageId) => {
    setFeatureImageId(imageId);
  };

  const handleEditorStateChange = (newEditorState) => {
    setContent(newEditorState);
  };

  return (
    <form ref={formRef} action={formAction}>
      {state?.error && <div className="error">{state.error}</div>}
      {state?.success && (
        <div className="success">
          Event {data ? "updated" : "created"} successfully!
        </div>
      )}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={data?.title || ""}
          required
        />
      </div>
      <Editor
        onContentChange={handleEditorStateChange}
        content={data?.content || ""}
      />

      <div className="flex">
        <div className="flex">
          <FormDateTimePicker
            label="Start Date and Time"
            name="startDate"
            defaultValue={data?.startDate || ""}
          />
          <FormDateTimePicker
            label="End Date and Time"
            name="endDate"
            defaultValue={data?.endDate || ""}
          />
        </div>
      </div>
      <div>
        <EventImageUpload
          onImageUploaded={handleImageUploaded}
          preview={`${baseUrl}${data?.featuredImage?.data?.attributes?.formats?.thumbnail?.url}`}
        />
      </div>
      <div>
        <label htmlFor="organiser">Organiser:</label>
        <input
          type="text"
          id="organiser"
          name="organiser"
          defaultValue={data?.organiser || ""}
        />
      </div>
      <div>
        <label htmlFor="venName">Venue Name:</label>
        <input
          type="text"
          id="venName"
          name="venName"
          defaultValue={data?.venName || ""}
        />
      </div>
      <div>
        <label htmlFor="venAdd">Venue Address:</label>
        <input
          type="text"
          id="venAdd"
          name="venAdd"
          defaultValue={data?.venAdd || ""}
        />
      </div>
      <div>
        <label htmlFor="public">Public:</label>
        <input
          type="checkbox"
          id="internal"
          name="internal"
          defaultChecked={data?.public ?? true}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
