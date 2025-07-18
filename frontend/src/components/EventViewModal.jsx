import React, { useEffect, useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { getEventById } from "../api/event.api";

export default function EventViewModal({ show, onHide, eventId }) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (show && eventId) {
      getEventById(eventId)
        .then(res => setEvent(res.data))
        .catch(console.error);
    }
  }, [show, eventId]);

  if (!show || !event) return null;

  const imgUrl = event.image_path?.replace(/\\/g, "/");
  const fullImageUrl = imgUrl
    ? `http://localhost:2345/events/${event.id}/image`
    : null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {event.title} <Badge bg="info">{event.category || "General"}</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{event.description}</p>
        <p>
          <strong>Start:</strong>{" "}
          {new Date(event.start_datetime).toLocaleString()}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {new Date(event.end_datetime).toLocaleString()}
        </p>
        {fullImageUrl && (
          <img
            src={fullImageUrl}
            alt="Event"
            className="img-fluid rounded mb-2"
          />
        )}
        <div className="mt-3">
          <h6>📍 Location Preview</h6>
          <div
            style={{
              height: "200px",
              backgroundColor: "#eee",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
              paddingTop: "80px",
              fontStyle: "italic",
            }}
          >
            Map preview coming soon
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
