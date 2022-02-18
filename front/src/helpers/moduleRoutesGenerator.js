import { PrivateRoute } from '../Routers/PrivateRoute'
import React from 'react'
import Users from '../Components/Admin/Catalogs/Users/List'
import UsersNew from '../Components/Admin/Catalogs/Users/Register'
import UsersPermissions from '../Components/Admin/Catalogs/Users/Permissions'
import Roles from '../Components/Admin/Catalogs/Roles/Roles'
import RolesNew from '../Components/Admin/Catalogs/Roles/RolesNew'
import Modules from '../Components/Admin/Catalogs/Modules/Modules'
import ModulesNew from '../Components/Admin/Catalogs/Modules/ModulesNew'
import UsersApp from '../Components/Admin/Catalogs/UsersApp/UsersApp'
import UsersAppNew from '../Components/Admin/Catalogs/UsersApp/UsersAppNew'
import ProvidersQuotes from '../Components/Admin/Catalogs/ProvidersQuotes/ProvidersQuotes'
import ProvidersQuotesNew from '../Components/Admin/Catalogs/ProvidersQuotes/ProvidersQuotesNew'
import { UserProfileMain } from '../Components/Admin/Catalogs/Users/UserProfile/UserProfileMain'
import Sulog from '../Components/Sulog/Sulog'
import SulogNew from '../Components/Sulog/SulogNew'
const moduleRoutesGenerator = (read, create, edit, module, isAuth) => {
  const components = {
    Users,
    UsersNew,
    UsersPermissions,
    Roles,
    RolesNew,
    Modules,
    ModulesNew,
    UserProfileMain,
    Sulog,
    SulogNew,
    UsersApp,
    UsersAppNew,
    ProvidersQuotes,
    ProvidersQuotesNew,
  }

  const routesArray = []
  if (read) {
    routesArray.push(
      <PrivateRoute
        exact
        key={module.id}
        path={module.module_info.relative_link}
        component={components[module.module_info.name]}
        isAuth={isAuth}
      />
    )
  }
  if (create) {
    routesArray.push(
      <PrivateRoute
        exact
        key={module.id}
        path={`${module.module_info.relative_link}/new`}
        component={components[`${module.module_info.name}New`]}
        isAuth={isAuth}
      />
    )
  }
  if (edit) {
    routesArray.push(
      <PrivateRoute
        exact
        key={module.id}
        path={`${module.module_info.relative_link}/edit/:id`}
        component={components[`${module.module_info.name}New`]}
        isAuth={isAuth}
      />
    )
  }
  return routesArray
}
export default moduleRoutesGenerator
