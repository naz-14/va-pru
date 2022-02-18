require('dotenv').config()
const WoocommerceAPI = require('@woocommerce/woocommerce-rest-api').default
const wooapiTest = new WoocommerceAPI({
  url: process.env.WOOCOMERCE_PAGE_URL,
  consumerKey: process.env.WOOCOMERCE_CLIENT,
  consumerSecret: process.env.WOOCOMERCE_CLIENT_SECRET,
  wpAPI: true,
  version: 'wc/v3',
})

export default wooapiTest
