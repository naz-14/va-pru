import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import { GET_TIMELINE } from '../../../graphql/Catalog/Timeline/timeline'

const Timeline = ({ idOrder }) => {
  const [timeLine, setTimeLine] = useState(null)
  const boxScroll = useRef()
  const dictionary = {
    1: 'Pendiente',
    2: 'En proceso',
    3: 'Facturacion',
    4: 'Envío local',
    5: 'Envío nacional',
    6: 'Por surtir',
    7: 'En ruta',
    8: 'Por colectar',
    9: 'En recoleccion',
    10: 'En paquetado',
    11: 'Completado',
    12: 'Cancelado',
    13: 'Devuelto',
  }

  /* TIMELINEs DATA */
  const { data, loading, error } = useQuery(GET_TIMELINE, {
    variables: {
      id: parseInt(idOrder),
    },
  })

  useEffect(() => {
    if (!loading && !error) {
      let list = []
      data.getTimeline.map((timeData) => {
        list.push({
          user: timeData.user.name,
          order_id: timeData.order_id,
          status: dictionary[timeData.status.id],
          date: moment(timeData.dateStatus).format('L'),
          time: moment(timeData.dateStatus).format('LT'),
        })
        return true
      })
      setTimeLine(list)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error])

  useEffect(() => {
    if (boxScroll) {
      const element = boxScroll.current
      element.scrollTop = element.scrollHeight
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxScroll, timeLine])

  return (
    <div className="row">
      <div className="col-12">
        <div className="card ">
          <div className="card-header">
            <h3 className="card-title">Timeline</h3>
          </div>
          <div className="card-body timeLine-body" ref={boxScroll}>
            {timeLine && (
              <ul>
                {timeLine.map((item, idx) => (
                  <li key={idx}>
                    <h6 id="time">{item?.time && item.time}</h6>
                    <h5>
                      <i className="fas fa-circle fa-xs"></i>
                      {item?.user && item.user}
                    </h5>
                    <h6>{item?.status && 'Estado - ' + item.status}</h6>
                    <h6>{item?.date && item.date}</h6>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
