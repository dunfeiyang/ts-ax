import { parseHeader, processHeaders, flattenHeaders } from '../../src/helpers/headers'

describe('helpers:header', () => {
  describe('parseHeader', () => {
    test('should parse headers', () => {
      const parsed = parseHeader(`
      Content-Type: applycation/json    \r\n
      Connection:keep-alive\r\n
      Transfer-Encoding:chunked\r\n
      Date:Tue,21 may 2019 09:23:44 GMT\r\n
      :aa\r\n
      key:`)
      //parse就会变小写
      expect(parsed['content-type']).toBe('applycation/json')
      expect(parsed['key']).toBe('')
    })

    test('should return empty obj if header is empty', () => {
      const parsed = parseHeader('')

      expect(parsed).toEqual({})
    })
  })

  describe('processHeader', () => {
    test('should normalize header', () => {
      const headers: any = {
        'contenT-type': 'foo/bar',
        'content-length': 1024
      }
      processHeaders(headers, { a: 1 })
      expect(headers['Content-Type']).toBe('foo/bar')
      expect(headers['contenT-type']).toBeUndefined()
      expect(headers['content-length']).toBe(1024)
    })

    test('should set Conntent-Type if not set an data is plainObj', () => {
      const headers: any = {}
      processHeaders(headers, { a: 1 })
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should not set Content-Type if data is not plainObj', () => {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('a=b'))
      expect(headers['Content-Type']).toBeUndefined()
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(processHeaders(null, {})).toBeNull()
      expect(processHeaders(undefined, {})).toBeUndefined()
    })
  })

  describe('flattenHeader', () => {
    test('should flatter the headers and include common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeader'
        },
        get: {
          'X-GET-HEADER': 'getHeader'
        },
        post: {
          'X-POST-HEADER': 'postHeader'
        }
      }
      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeader',
        'X-GET-HEADER': 'getHeader'
      })
    })
    test('should no thing then headers null or undefined', () => {
      expect(flattenHeaders(null, 'patch')).toBeNull()

      expect(flattenHeaders(undefined, 'patch')).toBeUndefined()
    })
  })
})
