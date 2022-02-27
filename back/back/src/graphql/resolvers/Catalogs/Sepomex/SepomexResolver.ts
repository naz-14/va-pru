import { Resolvers } from '../../../generated'
import CityModel from '../../../../models/Catalogs/Addresses/Sepomex/CitieModel'
import ColonyModel from '../../../../models/Catalogs/Addresses/Sepomex/ColonyModel'
import CountryModel from '../../../../models/Catalogs/Addresses/Sepomex/CountryModel'
import MunicipalityModel from '../../../../models/Catalogs/Addresses/Sepomex/MunicipalityModel'
import StateModel from '../../../../models/Catalogs/Addresses/Sepomex/StateModel'

const zipCodeNotFound = 'Código postal no encontrado'
const municipalityNotFound = 'Municipio encontrado'
const stateNotFound = 'Estado no encontrado'
const cityNotFound = 'Ciudad no encontrada'
const countryNotFound = 'País no encontrado'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SepomexResolver: Resolvers = {
  Query: {},
  Mutation: {
    getFullAddressByZipcode: async (_, { zipCode }) => {
      try {
        let fullAddress = {
          colonies: [
            {
              id_colony: 0,
              colony_name: '',
            },
          ],
          id_municipality: 0,
          municipality_name: '',
          id_city: 0,
          city_name: '',
          id_state: 0,
          state_name: '',
          id_country: 0,
          country_name: '',
        }
        const foundColonies = await ColonyModel.findAll({
          raw: true,
          where: { zip_code: zipCode },
        })
        if (foundColonies.length == 0)
          return Promise.reject(Error(zipCodeNotFound))
        fullAddress.colonies = foundColonies.map((colony) => {
          return {
            id_colony: colony.id,
            colony_name: colony.name,
          }
        })
        fullAddress.id_municipality = foundColonies[0].id_municipality

        const foundMunicipality = await MunicipalityModel.findByPk(
          fullAddress.id_municipality
        )
        if (!foundMunicipality)
          return Promise.reject(Error(municipalityNotFound))
        foundMunicipality.toJSON()
        fullAddress.municipality_name = foundMunicipality.name
        fullAddress.id_city = foundMunicipality.id_city

        const foundCity = await CityModel.findByPk(fullAddress.id_city)
        if (!foundCity) return Promise.reject(Error(cityNotFound))
        foundCity.toJSON()
        fullAddress.city_name = foundCity.name
        fullAddress.id_state = foundCity.id_state

        const foundState = await StateModel.findByPk(fullAddress.id_state)
        if (!foundState) return Promise.reject(Error(stateNotFound))
        foundState.toJSON()
        fullAddress.state_name = foundState.name
        fullAddress.id_country = foundState.id_country

        const foundCountry = await CountryModel.findByPk(fullAddress.id_country)
        if (!foundCountry) return Promise.reject(Error(countryNotFound))
        foundCountry.toJSON()
        fullAddress.country_name = foundCountry.name

        return fullAddress
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default SepomexResolver
