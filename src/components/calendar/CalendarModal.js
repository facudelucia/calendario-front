import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from "sweetalert2";
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventUpdate, eventStartAddNew, eventStartUpdate } from '../../actions/event';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowEnd = now.clone().add(1, "hours");
const initEvent = {
    title: "",
    notes: "",
    start: now.toDate(),
    end: nowEnd.toDate(),
}
const CalendarModal = () => {
    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowEnd.toDate())
    const [titleValid, settitleValid] = useState(true)
    const [formValues, setformValues] = useState(initEvent)
    const {title, notes, start, end} = formValues

    const state = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)
    const {modalOpen} = state
    const dispatch = useDispatch()
    

    useEffect(() => {
        if(activeEvent){
            setformValues(activeEvent)
        }else{
            setformValues(initEvent)
        }
    }, [activeEvent, setformValues])


    const closeModal = () => {
        
        dispatch(eventClearActiveEvent())
        dispatch(uiCloseModal())
        setformValues(initEvent)
    }

    const handleStartChange = (e) => {
        setDateStart(e)
        setformValues({
            ...formValues,
            start: e
        })
    }
    const handleEndChange = (e) => {
        setDateEnd(e)
        setformValues({
            ...formValues,
            end: e
        })
    }
    const handleInputChange = (e) => {
        setformValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const momentStart = moment(start)
        const momentEnd = moment(end)

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire("Error", "La fecha de finalizacion debe ser mayor a la fecha de inicio", "error");
        }

        if(title.trim()==="" || notes.trim() === ""){
            return settitleValid(false)
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues))
        }else{
            dispatch(eventStartAddNew(formValues))
        }

        
        
        settitleValid(true)
        closeModal()
    }


    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1>{activeEvent ? "Editar evento" : "Nuevo evento" }</h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && "is-invalid"}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>

    );
}

export default CalendarModal;