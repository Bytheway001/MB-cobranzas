import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Axios from "axios";
import { API } from "../../../utils/utils";
import "moment/locale/es";
import { Modal } from "react-bootstrap";
import { Renewal } from "../../../Forms/Renewal";
// eslint-disable-next-line no-extend-native
Date.prototype.getMonthFormatted = function () {
	var month = this.getMonth() + 1;
	return month < 10 ? "0" + month : "" + month; // ('' + month) for string result
};
moment.locale("es");
const localizer = momentLocalizer(moment);

export const Renovaciones = () => {
	const [events, setEvents] = useState([]);
	const [currentEvent, setCurrentEvent] = useState(null);

	const getEvents = (date) => {
		let year = date.getFullYear();
		let month = date.getMonthFormatted();
		Axios.get(API + `/renovations?year=${year}&month=${month}`).then((res) => {
			let result = res.data.data.map((renovation) => ({
				title: `${renovation.client.first_name}`,
				start: moment(renovation.renovation_date, "DD/MM/YYYY").toDate(),
				end: moment(renovation.renovation_date, "DD/MM/YYYY").toDate(),
				allDay: true,
				...renovation,
			}));
			setEvents(result);
		});
	};
	useEffect(() => {
		getEvents(new Date());
	}, []);
	return (
		<div style={{ height: "600px" }}>
			{currentEvent && (
				<Modal show={currentEvent ? true : false} onHide={() => setCurrentEvent(null)}>
					<Modal.Header closeButton>{`Cliente ${currentEvent.title}`}</Modal.Header>
					<Modal.Body>
						<Renewal pId={currentEvent.id} />
					</Modal.Body>
				</Modal>
			)}

			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				titleAccessor="title"
				onNavigate={(e) => getEvents(e)}
				popup={true}
				onSelectEvent={(e) => setCurrentEvent(e)}
				messages={{ next: "Siguiente", previous: "Anterior", month: "Mes", week: "Semana", day: "Dia", today: "Hoy" }}
			/>
		</div>
	);
};
