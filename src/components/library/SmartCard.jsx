import React from "react";
import { Card } from "react-bootstrap";

export const SmartCard = ({ children, title }) => {
	return (
		<Card className="custom-card h-100">
			<Card.Header className="bg-primary text-white">{title}</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card>
	);
};
