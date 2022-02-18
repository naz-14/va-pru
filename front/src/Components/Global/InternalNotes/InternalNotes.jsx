import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  CREATE_INTERNAL_NOTE,
  GET_INTERNAL_NOTES,
} from '../../../graphql/Catalog/InternalNotes/internalNotes'
import { ToastSweetAlert } from '../../Helpers/ToastSweetAlert'
import { AuthContext } from '../../../Auth/AuthContext'
import { useRef } from 'react'
const InternalNotes = ({ idOrder }) => {
  const { user } = useContext(AuthContext)
  const [values, setValues] = useState({
    text: '',
    document: '',
  })
  const [messages, setMessages] = useState(null)
  const { text, document } = values
  const refResetDocument = useRef()
  const boxScroll = useRef()
  const [createNote] = useMutation(CREATE_INTERNAL_NOTE, {
    refetchQueries: [
      { query: GET_INTERNAL_NOTES, variables: { orderId: parseInt(idOrder) } },
    ],
  })
  const { data, loading, error } = useQuery(GET_INTERNAL_NOTES, {
    variables: { orderId: parseInt(idOrder) },
  })
  useEffect(() => {
    if (!loading) {
      if (error)
        return ToastSweetAlert({
          mode: 'errorModal',
          message: error.message,
        })
      //PINTAR DATOS EN INTERNAL
      let list = []
      data.getInternalNotes.map((item) => {
        list.push({
          user: item?.user?.name ? item.user.name : '',
          text: item?.text ? item.text : '',
          file: item?.fileInternal?.url ? item.fileInternal.url : '',
          type: item?.type ? item.type : '',
        })
        return true
      })
      setMessages(list)
    }
  }, [data, loading, error])
  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    })
  }
  const sendInternalNotes = async () => {
    //Validate inputs data
    if (!text && !document)
      return ToastSweetAlert({
        mode: 'error',
        message: 'Debe escribir o subir un documento',
      })
    let type = null
    if (document) {
      type = document.type.split('/')
      if (
        type[1] !== 'pdf' &&
        type[0] !== 'image' &&
        type[1] !== 'jpg' &&
        type[1] !== 'png' &&
        type[1] !== 'jpeg'
      )
        return ToastSweetAlert({
          mode: 'error',
          message: 'Archivo incompatible',
        })
      if (document.size > 5242880)
        return ToastSweetAlert({
          mode: 'error',
          message: 'Archivo es demasiado pesado',
        })
    }
    //Insert data
    try {
      await createNote({
        variables: {
          inputInternalNote: {
            user_id: user.idUser,
            order_id: idOrder,
            text: text === '' ? null : text,
            file: document === '' ? null : document,
            type: document ? type[1] : null,
          },
        },
      })
      //If the Insert was a successfull
      setValues({
        text: '',
        document: '',
      })
      return (refResetDocument.current.value = '')
    } catch (e) {
      return ToastSweetAlert({
        mode: 'error',
        message: error.message,
      })
    }
  }
  /* set Scroll to bottom position */
  useEffect(() => {
    if (boxScroll) {
      const element = boxScroll.current
      element.scrollTop = element.scrollHeight
    }
  }, [boxScroll, data, loading, error])
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Notas internas</h3>
          </div>
          <div className="card-body internalNotes-body">
            {/* Show history */}
            <div ref={boxScroll} className="boxHistory">
              {messages && (
                <ul>
                  {messages.map((item, index) => (
                    <React.Fragment key={index}>
                      <div>
                        {item.user}&nbsp;&nbsp;
                        {item.text && <i className="fas fa-comment"></i>}
                        {item.text === '' && item.file && (
                          <i className="fas fa-file"></i>
                        )}
                        <li>
                          {item.text && <p>{item.text}</p>}
                          {item.type && item.type === 'image' && (
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={item.file}
                                alt="Internal Notes images"
                              />
                            </a>
                          )}
                          {item.type && item.type === 'pdf' && (
                            <div className="files">
                              <a
                                className="documentLink"
                                href={item.file}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Link del documento
                              </a>
                              <embed
                                src={item.file}
                                width="90%"
                                height="1000px"
                              />
                            </div>
                          )}
                        </li>
                      </div>
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>
            {/* Inputs */}
            <div className="boxInput">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                id="internalNotesText"
                name="text"
                value={values.text}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                type="file"
                id="internalNotesDocument"
                name="document"
                onChange={(e) =>
                  setValues({ ...values, document: e.target.files[0] })
                }
                ref={refResetDocument}
                accept=".jpg, .jpeg, .png, .pdf"
              />
              <label htmlFor="internalNotesDocument" id="labelDocument">
                <i className="fas fa-paperclip"></i>
              </label>
              <button onClick={sendInternalNotes}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InternalNotes
