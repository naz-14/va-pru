import { PrivateRoute } from '../Routers/PrivateRoute'
import React from 'react'
import PendingOrders from '../Components/Agent/Catalogs/Orders/Pending/PendingOrders'
import PendingOrdersNew from '../Components/Agent/Catalogs/Orders/Pending/PendingOrdersNew'
import InProcessOrders from '../Components/Shared/Catalogs/Orders/Process/InProcessOrders'
import InProcessOrdersNew from '../Components/Shared/Catalogs/Orders/Process/InProcessOrdersNew'
import LocalShippingOrders from '../Components/Agent/Catalogs/Orders/Local/LocalShippingOrders'
import LocalShippingOrdersNew from '../Components/Agent/Catalogs/Orders/Local/LocalShippingOrdersNew'
import NationalShippingOrders from '../Components/Agent/Catalogs/Orders/National/NationalShippingOrders'
import NationalShippingOrdersNew from '../Components/Agent/Catalogs/Orders/National/NationalShippingOrdersNew'
import ShippedOrders from '../Components/Shared/Catalogs/Orders/Shipped/ShippedOrders'
import ShippedOrdersNew from '../Components/Shared/Catalogs/Orders/Shipped/ShippedOrdersNew'
import ToStockOrders from '../Components/Shared/Catalogs/Orders/ToStock/ToStockOrders'
import ToStockOrdersNew from '../Components/Shared/Catalogs/Orders/ToStock/ToStockOrdersNew'
import BillingOrders from '../Components/Shared/Catalogs/Orders/Billing/BillingOrders'
import BillingOrdersNew from '../Components/Shared/Catalogs/Orders/Billing/BillingOrdersNew'
import RejectedOrders from '../Components/Shared/Catalogs/Orders/Rejected/RejectedOrders'
import RejectedOrdersNew from '../Components/Shared/Catalogs/Orders/Rejected/RejectedOrdersNew'
import CollectOrders from '../Components/Shared/Catalogs/Orders/Collect/CollectOrders'
import CollectOrdersNew from '../Components/Shared/Catalogs/Orders/Collect/CollectOrdersNew'
import InRouteOrders from '../Components/Shared/Catalogs/Orders/InRoute/InRouteOrders'
import InRouteOrdersNew from '../Components/Shared/Catalogs/Orders/InRoute/InRouteOrdersNew'

const submoduleRoutesGenerator = (read, create, edit, module, isAuth) => {
  const components = {
    PendingOrders,
    PendingOrdersNew,
    InProcessOrders,
    InProcessOrdersNew,
    LocalShippingOrders,
    LocalShippingOrdersNew,
    NationalShippingOrders,
    NationalShippingOrdersNew,
    ShippedOrders,
    ShippedOrdersNew,
    ToStockOrders,
    ToStockOrdersNew,
    BillingOrders,
    BillingOrdersNew,
    RejectedOrders,
    RejectedOrdersNew,
    CollectOrders,
    CollectOrdersNew,
    InRouteOrders,
    InRouteOrdersNew
  }
  let routesArray = []
  if (create) {
    routesArray.push(
      <PrivateRoute
        exact
        path={`${module.module_info.relative_link}${module.submodule_info.relative_link}/new`}
        component={components[`${module.submodule_info.name}New`]}
        isAuth={isAuth}
      />
    )
  }
  if (read) {
    routesArray.push(
      <PrivateRoute
        exact
        path={`${module.module_info.relative_link}${module.submodule_info.relative_link}`}
        component={components[module.submodule_info.name]}
        isAuth={isAuth}
      />
    )
    routesArray.push(
      <PrivateRoute
        exact
        path={`${module.module_info.relative_link}${module.submodule_info.relative_link}/details/:id/:show`}
        component={components[`${module.submodule_info.name}New`]}
        isAuth={isAuth}
      />
    )
  }
  if (edit) {
    routesArray.push(
      <PrivateRoute
        exact
        path={`${module.module_info.relative_link}${module.submodule_info.relative_link}/edit/:id`}
        component={components[`${module.submodule_info.name}New`]}
        isAuth={isAuth}
      />
    )
  }
  return routesArray
}
export default submoduleRoutesGenerator
