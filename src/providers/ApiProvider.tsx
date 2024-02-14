import React, { createContext, useContext } from 'react'
import axios, { type AxiosResponse, AxiosError } from 'axios'
import Config from '../config'
import { LeadsAPI } from '../api'

const ApiContext = createContext({})

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = axios.create({ baseURL: Config.getApiUrl() })

  async function request<T> (promise: Promise<unknown>): Promise<T> {
    try {
      const response = await promise as AxiosResponse
      const body = response.data !== undefined ? response.data : undefined
      console.log('\n\n\n 🚀 ~ body:', body)
      return body
    } catch (err) {
      if (err instanceof AxiosError) {
        const response: string = err.response?.data?.error ?? 'Unknown error'
        throw new Error(response)
      } else {
        // Handle other types of errors here
        throw new Error('Unexpected error occurred')
      }
    }
  }

  return (
    <ApiContext.Provider value={{
      leadsAPI: new LeadsAPI(api, request)
    }}>
      {children}
    </ApiContext.Provider>
  )
}

const useApiContext = (): IApiInterface => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { leadsAPI } = useContext<Record<string, any>>(ApiContext)
  return { leadsAPI }
}

interface IApiInterface {
  leadsAPI: LeadsAPI
}

export { ApiProvider, useApiContext }
