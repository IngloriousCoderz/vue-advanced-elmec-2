import { useErrorsStore } from '@/app/stores/errors'

const STATUS_SERVER_ERROR = 500
const STATUS_PERMISSION_DENIED = 403

export function errors(http) {
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      const { addError } = useErrorsStore()

      if (error.response?.status === STATUS_SERVER_ERROR) {
        addError({ message: 'Server Errror', status: error.reponse.status })
      }

      if (error.response?.status === STATUS_PERMISSION_DENIED) {
        addError({ message: 'Permission Denied', status: error.reponse.status })
      }

      return Promise.reject(error)
    },
  )
}
