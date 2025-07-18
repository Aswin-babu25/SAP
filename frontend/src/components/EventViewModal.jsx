import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";

export default function EventViewModal({ show, onHide, event }) {
  if (!event) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = event.imageUrl;
    link.download = "event-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {event.title}{" "}
          <Badge bg="info" className="ms-2 text-dark">
            {event.category || "General"}
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{event.description}</p>
        <p>
          <strong>Start:</strong> {new Date(event.start).toLocaleString()}
        </p>
        <p>
          <strong>End:</strong> {new Date(event.end).toLocaleString()}
        </p>
        {event.imageUrl && (
          <>
            <img
              src={event.imageUrl}
              alt="Event"
              className="img-fluid rounded mb-2"
            />
            <Button variant="outline-primary" size="sm" onClick={handleDownload}>
              Download Image
            </Button>
          </>
        )}
        <div className="mt-3">
          <h6>📍 Location Preview</h6>
          <div
            style={{
              height: "200px",
              backgroundColor: "#eee",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontStyle: "italic"
            }}
          >
            Map integration coming soon
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