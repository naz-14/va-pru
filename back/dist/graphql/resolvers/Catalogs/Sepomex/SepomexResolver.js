"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CitieModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/CitieModel"));
const ColonyModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/ColonyModel"));
const CountryModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/CountryModel"));
const MunicipalityModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/MunicipalityModel"));
const StateModel_1 = __importDefault(require("../../../../models/Catalogs/Addresses/Sepomex/StateModel"));
const zipCodeNotFound = 'Código postal no encontrado';
const municipalityNotFound = 'Municipio encontrado';
const stateNotFound = 'Estado no encontrado';
const cityNotFound = 'Ciudad no encontrada';
const countryNotFound = 'País no encontrado';
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos';
const SepomexResolver = {
    Query: {},
    Mutation: {
        getFullAddressByZipcode: (_, { zipCode }) => __awaiter(void 0, void 0, void 0, function* () {
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
                };
                const foundColonies = yield ColonyModel_1.default.findAll({
                    raw: true,
                    where: { zip_code: zipCode },
                });
                if (foundColonies.length == 0)
                    return Promise.reject(Error(zipCodeNotFound));
                fullAddress.colonies = foundColonies.map((colony) => {
                    return {
                        id_colony: colony.id,
                        colony_name: colony.name,
                    };
                });
                fullAddress.id_municipality = foundColonies[0].id_municipality;
                const foundMunicipality = yield MunicipalityModel_1.default.findByPk(fullAddress.id_municipality);
                if (!foundMunicipality)
                    return Promise.reject(Error(municipalityNotFound));
                foundMunicipality.toJSON();
                fullAddress.municipality_name = foundMunicipality.name;
                fullAddress.id_city = foundMunicipality.id_city;
                const foundCity = yield CitieModel_1.default.findByPk(fullAddress.id_city);
                if (!foundCity)
                    return Promise.reject(Error(cityNotFound));
                foundCity.toJSON();
                fullAddress.city_name = foundCity.name;
                fullAddress.id_state = foundCity.id_state;
                const foundState = yield StateModel_1.default.findByPk(fullAddress.id_state);
                if (!foundState)
                    return Promise.reject(Error(stateNotFound));
                foundState.toJSON();
                fullAddress.state_name = foundState.name;
                fullAddress.id_country = foundState.id_country;
                const foundCountry = yield CountryModel_1.default.findByPk(fullAddress.id_country);
                if (!foundCountry)
                    return Promise.reject(Error(countryNotFound));
                foundCountry.toJSON();
                fullAddress.country_name = foundCountry.name;
                return fullAddress;
            }
            catch (error) {
                return Promise.reject(Error(defaultError));
            }
        }),
    },
};
exports.default = SepomexResolver;
