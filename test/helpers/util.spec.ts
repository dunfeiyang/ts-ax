import {
  isDate,
  isPlainObject,
  isFormData,
  isUrlSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/utils'

describe('helpers:util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate planObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(null)).toBeFalsy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate formDate', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate isUrlSearchParams', () => {
      expect(isUrlSearchParams(new URLSearchParams('a=1&b=2'))).toBeTruthy()
      expect(isUrlSearchParams('a=1&b=2')).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }
      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should be properties', () => {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 897 }
      const c = extend(a, b)
      expect(c.bar).toBe(897)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)
      expect(a.foo).toBe(undefined)
      expect(a.bar).toBe(undefined)
      expect(b.bar).toBe(undefined)
      expect(c.foo).toBe(undefined)
    })

    test('should be properties', () => {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    test('should deepMerge recursively', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }

      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      })
    })

    test('should remove all reference from nested pbjects', () => {
      const a = { foo: { bar: 123 }, bar: 456 }
      const b = {}
      const c = deepMerge(a, b)

      expect(c.foo).not.toBe(a.foo)
      expect(c.bar).toBe(a.bar)
    })

    test('should handle null ande undefined arguments', () => {
      expect(deepMerge(null, undefined)).toEqual({})
      expect(deepMerge(null, undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
