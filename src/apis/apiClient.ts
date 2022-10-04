import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

export const apiClient = wretch(' https://rt.data.gov.hk/v1').addon(
  QueryStringAddon
)
