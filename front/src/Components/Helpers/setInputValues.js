export const setUserValues = (reset, Data, setAddressId, getAdress) => {
  if (Data) {
    const contacts = Data.contacts.map((contact, index) => {
      return {
        contactName: `${contact.contact_data.name}`,
        paternalSurname: `${contact.contact_data.lastname}`,
        maternalSurname: `${contact.contact_data.second_lastname}`,
        phone: contact.contact_data.phone,
        ext: contact.contact_data.ext,
        cell: contact.contact_data.mobile,
        email: contact.contact_data.email,
      }
    })
    const dataFormated = {
      name: `${Data.name}`,
      firstName: `${Data.first_name}`,
      lastName: `${Data.last_name}`,
      userName: `${Data.user_name}`,
      userEmail: `${Data.email}`,
      userRole: `${Data.id_role}`,
      userStore: `${Data.id_store}`,
      direction: `${Data.address.street}`,
      outdoorNumber: `${Data.address.external_number}`,
      interiorNumber: `${Data.address.internal_number}`,
      city: `${Data.address.city.name}`,
      municipality: `${Data.address.municipality}`,
      state: `${Data.address.state.name}`,
      colonia: `${Data.address.id_colony}`,
      postalCode: `${Data.address.zip_code}`,
      contacts: contacts,
      avatar: Data?.avatar?.url,
    }
    reset(dataFormated)

    setAddressId(Data.id_address)

    getAdress(Data.address.zip_code)
  }
}

export const setZipValues = (setValue, setColonies, Data, setZip) => {
  const list = Data.colonies.map((colony) => {
    return { label: colony.colony_name, value: colony.id_colony }
  })
  setColonies(list)
  setZip({
    city: Data.city_name,
    municipality: Data.municipality_name,
    state: Data.state_name,
    idCountry: Data.id_country,
    idState: Data.id_state,
    idCity: Data.id_city,
    idMunicipality: Data.id_municipality,
  })
  setValue('city', Data.municipality_name)
  setValue('municipality', Data.state_name)
  setValue('state', Data.state_name)
}

export const setZipNullValues = (setValue) => {
  setValue('colonia', '')
  setValue('city', '')
  setValue('municipality', '')
  setValue('state', '')
}
