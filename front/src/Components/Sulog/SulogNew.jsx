import React from 'react'
import { FormProvider } from 'react-hook-form'
import Box from '../Global/Box'
import ContentHeader from '../Layout/ContentHeader'
import { useParams } from 'react-router-dom'

function SulogNew() {
  const { id: _id } = useParams()
  return (
    <>
      <ContentHeader
        title="Surtido y Logistica"
        breadcrumb="Roles"
        windowTitle={`${_id ? 'Editar' : 'Agregar'} role `}
      />
      <FormProvider>
        <form className="p-3">
          <Box
            title={`${_id ? 'Editar' : 'Agregar'} nuevo rol`}
            btnRedPath="/catalog/roles"
            btnRedTxt="Cancelar"
          />
        </form>
      </FormProvider>
    </>
  )
}

export default SulogNew
