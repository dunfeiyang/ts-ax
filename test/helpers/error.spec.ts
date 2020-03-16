import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers:error', () => {
  test('should create an Error with message,config,code,request,response ande isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      data: { foo: 'bar' },
      headers: null,
      request,
      config
    }

    const error = createError('boom', config, 'jest', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('boom')
    expect(error.config).toBe(config)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
    expect(error.request).toBe(request)
  })
})
