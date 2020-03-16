import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is planobject', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })

    test('should to be nothing if data is string', () => {
      const a = 'a=b'
      expect(transformRequest(a)).toBe(a)
    })
  })

  describe('tranformResponse', () => {
    test('should transform request data to obj if data is string', () => {
      const a = '{"b":2}'
      expect(transformResponse(a)).toEqual({ b: 2 })
    })
    test('should to be nothing if data is not obj string', () => {
      const a = '{a:b}'
      const b = { a: 1 }
      expect(transformResponse(a)).toBe(a)
      expect(transformResponse(b)).toBe(b)
    })
  })
})
