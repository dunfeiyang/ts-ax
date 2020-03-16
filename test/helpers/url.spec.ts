import { buildURL, isAbsoluteURL, combineURL, isURLSameOrign } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(buildURL('/foo', { a: 1, b: null })).toBe('/foo?a=1')
    })

    test('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 123
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":123}'))
    })

    test('should support date params', () => {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=baz', {
          bar: 123
        })
      ).toBe('/foo?foo=baz&bar=123')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo#hash', {
          bar: 123
        })
      ).toBe('/foo?bar=123')
    })

    test('should user seriallizer if provided', () => {
      const serializer = jest.fn(() => {
        return 'a=b'
      })
      const params = {
        foo: 'bar'
      }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?a=b')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenLastCalledWith(params)
    })

    test('should support searchparams', () => {
      expect(buildURL('/foo', new URLSearchParams('a=b'))).toBe('/foo?a=b')
    })
    test('should ignore if the only param value is null', () => {
      expect(
        buildURL('/foo', {
          baz: null
        })
      ).toBe('/foo')
    })
  })

  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://www.baidu.com')).toBeTruthy()
    })

    test('should return false if Url begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://wwww.baidu.com')).toBeFalsy()
      expect(isAbsoluteURL('/foo')).toBeFalsy()
    })
    test('should return true if url is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com')).toBeTruthy()
    })
  })

  describe('combineUrl', () => {
    test('should combine Url', () => {
      expect(combineURL('http://www.baidu.com/', '/foo')).toBe('http://www.baidu.com/foo')

      expect(combineURL('http://www.baidu.com', 'foo')).toBe('http://www.baidu.com/foo')

      expect(combineURL('http://www.baidu.com')).toBe('http://www.baidu.com')
    })
  })

  describe('isURlSameOrigin', () => {
    expect(isURLSameOrign(window.location.href)).toBeTruthy()
    expect(isURLSameOrign('http://www.baidu.com')).toBeFalsy()
  })
})
