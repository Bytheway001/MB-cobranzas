import React from 'react';
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { API } from '../../../utils/utils';
import 'moment/locale/es';

Date.prototype.getMonthFormatted = function() {
    var month = this.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
  }
moment.locale('es');
const localizer = momentLocalizer(moment)



export const Renovaciones = ()=>{
    const [events,setEvents]=useState([]);

    const getEvents = (date)=>{
        let year=date.getFullYear();
        let month=date.getMonthFormatted();
        
        Axios.get(API+`/renovations?year=${year}&month=${month}`).then(res=>{
            let result = res.data.data.map(renovation=>({
                title:`Renovacion ${renovation.client.first_name}`,
                start:moment(renovation.renovation_date,"DD/MM/YYYY").toDate(),
                end:moment(renovation.renovation_date,"DD/MM/YYYY").toDate(),
                allDay:true
            }))
            setEvents(result)
        })
        
    }
    useEffect(()=>{
        
       getEvents(new Date())
    },[])
    return(
        <div style={{height:'600px'}}>
            <Calendar 
                localizer={localizer} 
                events={events} 
                startAccessor="start" 
                endAccessor="end"
                titleAccessor='title'
                onNavigate={(e)=>getEvents(e)}
                messages={
                    {next:'Siguiente',previous:"Anterior",month:"Mes",week:'Semana',day:'Dia',today:'Hoy'}
                }
            />

            
        </div>
    )
}
