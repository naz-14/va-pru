import React, { useEffect, useState } from 'react'
import ContentHeader from '../../../../Components/Layout/ContentHeader'
import Box from '../../../Global/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputController from '../../../Global/InputController'
import { useMutation, useQuery } from '@apollo/client'

import { validationSchemaQuote, validationSchemaQuoteOnlyCodes } from '../../../Helpers/validatorQuotes'
import { CREATE_QUOTE, GET_PROVIDER_INFO } from '../../../../graphql/Catalog/Quotes/quotes'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import { useHistory } from 'react-router-dom'
import { GET_DOCUMENTS_STATUSES } from '../../../../graphql/Catalog/Documents/documentStatus'
import { document_statuses_esp } from '../../../Helpers/StatusesLanguages'

const ProvidersQuotesNew = () => {
  const [schemaValidator, setSchemaValidator] = useState(validationSchemaQuote);
  const [schemaValidatorStep1, setSchemaValidatorStep1] = useState(validationSchemaQuoteOnlyCodes);

  const [createQuote] = useMutation(CREATE_QUOTE);
  const [providerData] = useMutation(GET_PROVIDER_INFO);

  const {data,loading,error} = useQuery(GET_DOCUMENTS_STATUSES);
  const history = useHistory();
  const [statuses,setStatuses] = useState([]);
  const statusesEsp = document_statuses_esp;
  const [step,setStep] = useState(1);

  /* FIRST FORM */
  const {
    methods:methodsStep1,
    handleSubmit:handleSubmitStep1,
    formState: { errors:errorsStep1 },
    control:controlStep1,
  } = useForm({
    resolver: yupResolver(schemaValidatorStep1),
  });

  /* SECOND FORM */
  const {
    methods,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schemaValidator),
  });

  useEffect(()=>{
    if(!loading){
      if(error){
        return ToastSweetAlert({
          mode: 'error',
          message: error.message,
        }),history.push('/citas/proveedores');
      }

      const list = data.getDocumentsStatuses.map((item)=>{
        return { label: statusesEsp[item.id], value: item.id }
      });
      setStatuses(list);

    }
  },[data,loading,error]);

  const handleSaveStep1 = async(Data)=>{
    const {cardCode,cardName} = Data;
    if(!cardCode && !cardName)
      return ToastSweetAlert({
        mode: 'error',
        message: 'Debe llenar alguno de los campos',
      })

    /* GET DATA FROM API SAP */
    try{
      await providerData({
        variables: {
          inputProvider: {
            cardCode,
            cardName,
          },
        },
      })
    }catch(e){
      return ToastSweetAlert({
        mode: 'error',
        message: e.message,
      })
    }
  }

  const handleSave = async (Data) => {
    const {cardCode,cardName,comments,docDate,docStatus,docTime,whsCode} = Data;
      
    /* INSERT AND UPDATE DATA */
    // try {
    //   await createQuote({
    //     variables: {
    //       inputQuote: {
    //         cardCode,
    //         cardName,
    //         comments,
    //         docDate,
    //         docStatus: parseInt(docStatus),
    //         docTime,
    //         whsCode,
    //       },
    //     },
    //   })
    //   return ToastSweetAlert({
    //       mode: 'ok',
    //       message: 'Cita creada',
    //   }),
    //   history.goBack();
    // } catch (e) {
    //   return ToastSweetAlert({
    //     mode: 'error',
    //     message: e.message,
    //   })
    // }
  }

  return (
    <>
    {!loading && statuses &&
      <>
      {step === 1 ?
        <>
        <ContentHeader
          title="Crear cita"
          breadcrumb="CREAR CITAS DE PROVEEDORES"
          windowTitle="Crear una cita"
        />
        <FormProvider {...methodsStep1}>
          <form className="p-5" onSubmit={handleSubmitStep1(handleSaveStep1)}>
            <Box
              title="Crear una cita"
              btnRedPath="/citas/proveedores"
              btnRedTxt="Cancelar"
              btnSubmit={true}
              btnState={false}
              errors={errorsStep1}
              content={
                <>
                  <div className="mb-3 col-12">
                    <h2>Ingrese codigo o nombre del proveedor</h2>
                  </div>
                  <div className="mb-3 col-12">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
                      
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-sm-12">
                      <InputController
                        label="Codigo del proveedor"
                        type="text"
                        name="cardCode"
                        placeholder="Confirme codigo del proveedor"
                        control={controlStep1}
                      />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-sm-12">
                      <InputController
                        label="Nombre del proveedor"
                        type="text"
                        name="cardName"
                        placeholder="Confirme nombre del proveedor"
                        control={controlStep1}
                      />
                    </div>
                  </div>
                </>
              }
            />
          </form>
        </FormProvider>
        </>
        :
        <>
        <ContentHeader
          title="Crear cita"
          breadcrumb="CREAR CITAS DE PROVEEDORES"
          windowTitle="Crear una cita"
        />
        <FormProvider {...methods}>
          <form className="p-5" onSubmit={handleSubmit(handleSave)}>
            <Box
              title="Crear una cita"
              btnRedPath="/citas/proveedores"
              btnRedTxt="Cancelar"
              btnSubmit={true}
              btnState={false}
              errors={errors}
              content={
                <>
                  <div className="mb-3 col-12">
                    <h2>Crea una cita a un proveedor</h2>
                  </div>
                  <div className="mb-3 col-12">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
                      
                    </div>
                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                      <InputController
                        label="Codigo del proveedor"
                        type="text"
                        name="cardCode"
                        placeholder="Confirme codigo del proveedor"
                        control={control}
                      />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                      <InputController
                        label="Nombre del proveedor"
                        type="text"
                        name="cardName"
                        placeholder="Confirme nombre del proveedor"
                        control={control}
                      />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12 selectCapitalize">
                      <InputController
                        label="Estado del documento"
                        inputType="choosen"
                        options={statuses}
                        name="docStatus"
                        placeholder="Confirme estado del documento"
                        control={control}
                      />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                      <InputController
                        label="Codigo de almacen o tienda"
                        type="text"
                        name="whsCode"
                        placeholder="Confirme Codigo de almacen o tienda"
                        control={control}
                      />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                      <InputController
                        label="Fecha de cita"
                        type="date"
                        name="docDate"
                        placeholder="Confirme fecha de la cita"
                        control={control}
                      />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                      <InputController
                        label="Hora de cita"
                        type="time"
                        name="docTime"
                        placeholder="Confirme hora de cita"
                        control={control}
                      />
                    </div>
                    <div className="mb-3 col-12">
                      <InputController
                        label="Observaciones"
                        inputType="textarea"
                        name="comments"
                        placeholder="Confirme sus observaciones"
                        control={control}
                      />
                    </div>
                  
                  </div>
                </>
              }
            />
          </form>
        </FormProvider>
      </>
      }
      </>
    }
    </>
  )
}

export default ProvidersQuotesNew;
