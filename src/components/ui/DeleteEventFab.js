import React from 'react';
import { useDispatch } from 'react-redux';
import {eventStartDeleted } from '../../actions/event';

const DeleteEventFab = () => {

    const dispatch = useDispatch()
    const handleClick = ( ) => {
        dispatch(eventStartDeleted())
    }


    return ( 
        <button className="btn btn-danger fab-danger" onClick={handleClick}>
            <i className="fas fa-trash"></i>
            <span> borrar evento </span>
        </button> 
    );
}
 
export default DeleteEventFab;