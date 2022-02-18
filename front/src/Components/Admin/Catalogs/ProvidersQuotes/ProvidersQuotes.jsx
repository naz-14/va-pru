import React, { useEffect,useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import moment from 'moment'

import ContentHeader from '../../../Layout/ContentHeader';
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/client';

import { GET_QUOTES } from '../../../../graphql/Catalog/Quotes/quotes';
import { document_statuses_esp } from '../../../Helpers/StatusesLanguages';

const ProvidersQuotes =()=>{
    const statusEsp = document_statuses_esp;
    const{data,loading,error} = useQuery(GET_QUOTES);
    const [quotes,setQuotes] = useState({
        id: null,
        cardCode: null,
        cardName: null,
        comments: null,
        docDate: null,
        docStatus: null,
        docTime: null,
        whsCode: null,
    });
    const [fullCalendar,setFullCalendar] = useState({
        id: null,
        title: null,
        date: null,
    });

    useEffect(()=>{
        if(!loading){
            if(error){
                return ToastSweetAlert({
                    mode: 'error',
                    message: 'Debe escribir el motivo de la cancelacion',
                });
            }
            /* ITERATE DATA FOR FULLCALENDAR */
            let list = [];
            data.getQuotes.map((item)=>{
                list.push({
                    id:item.id,
                    title:item.cardName || item.cardCode && 'Codigo proveedor' + item.cardCode || '--',
                    date: item.docDate + ' ' +item.docTime,
                });
            });

            setQuotes(data.getQuotes);
            setFullCalendar(list);
        }
    },[data,loading,error]);

    const Dateclick = (arg) =>{
        const idVar = arg.event.id;

        const filterData = quotes.find( item => item.id === parseInt(idVar));
        
        return Swal.fire({
            showCloseButton: true,
            title: 'Detalles de cita',
            html:`
                <div id="quotesModalBox">
                    <h4>${filterData.docDate && filterData.docTime && `<i class="fas fa-clock"></i> ${ moment(filterData.docDate + ' ' + filterData.docTime).format('LL hh:mm a')}` }</h4>
                    <h5>${filterData.cardCode && `<span class="quoteAttribute">Codigo de proveedor </span><span style="float:right;">${filterData.cardCode}`}</span> </h5>
                    <h5>${filterData.cardName && `<span class="quoteAttribute">Proveedor </span><span style="float:right;">${filterData.cardName}`}</span></h5>
                    <h5>${filterData.status?.id && `<span class="quoteAttribute">Estado del documento </span> <span style="text-transform:capitalize;float:right;">${statusEsp[filterData.status?.id]}`}</span> </h5>
                    <h5>${filterData.whsCode && `<span class="quoteAttribute">Codigo de almacen o tienda </span><span style="float:right;">${filterData.whsCode}`}</span></h5>
                    <h5>${filterData.comments && `<span class="quoteAttribute">Observaciones </span><span style="display:block;padding-top:5px;">${filterData.comments}`}</span></h5>
                </div>
                <div><hr></div>
                
            `,
            confirmButtonText:
                'Volver al calendario',
            customClass: {
                title: 'StandarModalTitle',
                htmlContainer: 'StandarModalContainer',
                confirmButton: 'StandarModalButton',
              }
        })
    } 

    const renderEventContent =(eventInfo)=> {
        return (
          <div className="eventBox">
            <h5>{eventInfo.event.title} <b>{eventInfo.timeText}</b> </h5>
          </div>
        )
    }

    return(
        <>
        {!loading && 
            <>
                <ContentHeader
                    title="Citas de Proveedores"
                    breadcrumb="Citas de Proveedores"
                    windowTitle="Citas"
                />
                <div className="card layout-configs">
                    <div className="card-header">
                        <h3 className="card-title">Citas</h3>
                        <div className="control-btn-box">
                            <div
                                className="btn-group actions-btn"
                                role="group"
                                aria-label="Button group with nested dropdown"
                            >
                            
                                <Link to={`/citas/proveedores/new`} className="btn btn-accept btn-sm">
                                <i className="fa fa-plus"></i> Agregar Nuevo &nbsp;
                                </Link>
                            
                            </div>
                        </div>
                    </div>
                    <div className="card-body FullCalendar">

                        <FullCalendar
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            initialView="dayGridMonth"
                            events={fullCalendar}
                            eventClick={Dateclick}
                            locale={'es'}
                            displayEventTime={true}
                            eventContent={renderEventContent}
                            themeSystem="bootstrap5"
                        />

                    </div>
                </div>
            </>
        }
        </>
    );
}

export default ProvidersQuotes
