export const getShopwareApi = (apiEndpoint, opts = {}) => {
  const options = {
    ...opts,
    headers: {
      'sw-access-key': `${process.env.SHOPWARE_API_ACCESS_TOKEN}`
    }
  }

  return fetch(`${process.env.SHOPWARE_API_ENDPOINT}/store-api/${apiEndpoint}`, options)
}
