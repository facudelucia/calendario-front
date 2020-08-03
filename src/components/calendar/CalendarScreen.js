import React, { useState, useEffect } from 'react';
import Navbar from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { messages } from "../../helpers/calendar-messages-es";
import "moment/locale/es";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from './CalendarModal';
import {useDispatch, useSelector} from "react-redux"
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/event';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale("es");

const localizer = momentLocalizer(moment)

const CalendarScreen = () => {
    const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "month")
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)
   
    
    const dispatch = useDispatch()
    const onDoubleClick = () => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
        
    }
    const onSelectSlot = () => {
        
        dispatch(eventClearActiveEvent())
        
    }
    const onViewChange = (e) => {
        setlastView(e)
        localStorage.setItem("lastView", e)
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ?"#367CF7": "#465660",
            borderRadius: "0px",
            opacity: 0.8,
            display: "block",
            color: "white",

        }
        return { style }
    }
    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])
    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />
            <AddNewFab />
            {activeEvent && <DeleteEventFab />}
            
            <CalendarModal />
        </div>
    );
}

export default CalendarScreen;