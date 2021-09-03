import { isGreeMiniProgram, getParams, getGreeParams, merge, untilFinished, deepClone, groupArray } from '../../src/utils/index'
const { isGreeMiniProgram: otherWay } = require('../../src/utils/index')

const urls = {
    'https://127.0.0.1': false,
    'http://127.0.0.1': false,
    'https://xxx.com?path=test': false,
    'https://www.xxx.com?query=gree#a1': false
}

const mergeOptions = [
  {
    desc: 'simple merge',
    value: [
      { a: 1, b: 2, c: 3 },
      { a: 2, b: 3, c: 4, d: 5 }
    ],
    expect: {
      a: 2, b: 3, c: 4, d: 5
    }
  },
  {
    desc: 'more merge',
    value: [
      { a: 1, b: 2, c: 3 },
      { a: {a1: 2, a2: 4 }, b: null, c: undefined }
    ],
    expect: {
      a: {a1:2,a2:4},b: null, c: undefined
    }
  },
  {
    desc: 'diff merge',
    value: [
      { a: {a1:2, a2: 3}, b: 2},
      { a: {a2:4, a3: 5, a4: {a11: 6}}, c: 3}
    ],
    expect: {
      a: {a1: 2, a2: 4, a3: 5, a4: {a11: 6}}, b: 2, c: 3
    }
  },
  {
    desc: 'diff2 merge',
    value: [
      { a: [1,2,3], b: 2},
      { a: [3,2,1], c: 3}
    ],
    expect: {
      a: [3,2,1], b: 2, c: 3
    }
  },
  {
    desc: 'diff3 merge',
    value: [
      { a: [{a1: 1, a2: 5},2,3], b: 2},
      { a: [{a1: 3, a3: 6},2,1], c: 3}
    ],
    expect: {
      a: [{a1: 3, a2: 5, a3: 6},2,1], b: 2, c: 3
    }
  }
]

const groupOptions = [
  {
    desc: 'group without size',
    value: [
      [1,2,3,4,5]
    ],
    expect: [1,2,3,4,5]
  },
  {
    desc: 'group size = 0',
    value: [
      [1,2,3,4,5], 0
    ],
    expect: [1,2,3,4,5]
  },
  {
    desc: 'group size = 1',
    value: [
      [1,2,3,4,5], 1
    ],
    expect: [[1],[2],[3],[4],[5]]
  },
  {
    desc: 'group size = 2',
    value: [
      [1,2,3,4,5], 2
    ],
    expect: [[1, 2],[3,4],[5]]
  },
  {
    desc: 'group size = array.length',
    value: [
      [1,2,3,4,5], 5
    ],
    expect: [[1, 2,3,4,5]]
  },
  {
    desc: 'group size > array.length',
    value: [
      [1,2,3,4,5], 6
    ],
    expect: [[1, 2,3,4,5]]
  },
  {
    desc: 'group size < 0',
    value: [
      [1,2,3,4,5], -1
    ],
    expect: [1, 2,3,4,5]
  },
]

console.log(otherWay)

describe('isGreeMiniProgram utils method', () => {
    Object.keys(urls).forEach((url) => {
        it(`${url} should be ${urls[url]} `, () => {
            const isGreeEnv = isGreeMiniProgram(url);
            expect(isGreeEnv).toBe(urls[url])
        })
    })
    it('no url param shoule throw error ', () => {
        // const isGreeEnv = isGreeMiniProgram()
        expect(() => {
            isGreeMiniProgram()
        }).toThrow(new Error(`'getParams' method param 'url' must exist and is type of 'string'`))
        // expect(isGreeEnv).toThrow(new Error(`'isGreeMiniProgram' method param 'url' must be of type 'string'`))
    })
    it('exist the url param but is not type of string', () => {
        expect(() => {
            isGreeMiniProgram(1)
        }).toThrow(new Error(`'getParams' method param 'url' must be of type 'string'`))
    })
    it('exist the url param but the value is empty string', () => {
        expect(isGreeMiniProgram('')).toBe(false)
    })
    it('exist the key params but value is not type of string', () => {
        expect(() => {
            isGreeMiniProgram('http://...', 1)
        }).toThrow(new Error(`'getGreeParams' method param 'key' must be type of 'string'`))
    })
    it('exist the key and value params, but value is not type of string', () => {
        expect(() => {
            isGreeMiniProgram('http://...', 'greeEnv', 2)
        }).toThrow(new Error(`'isGreeMiniProgram' method param 'customKey' must be type of 'string'`))
    })
    it('exist hash but not params should return false', () => {
        expect(isGreeMiniProgram('https://www.baidu.com#a1')).toBe(false)
    })
    it('exist ? and hash but not real params should return false', () => {
        expect(isGreeMiniProgram('https://www.baidu.com?#a1')).toBe(false)
    })
    it('exist key = "passthrough" and customKey="origin" and  customValue = "greeapp" should return true', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passthrough=%5Borigin%3Dgreeapp%26mac%3D1%5D#test')
        ).toBe(true)
    })
    it('exist key != "passthrough" and value = "greeapp" should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passthrough2=greeapp#test')
        ).toBe(false)
    })
    it('exist key = "passthrough" and value != "greeapp" should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passthrough=greeapp2#test')
        ).toBe(false)
    })
    it('exist custom key = "passthrough2" and customKey="origin" and  customValue = "greeapp" should return true', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passthrough2=%5Borigin%3Dgreeapp%26mac%3D1%5D#test', "passthrough2")
        ).toBe(true)
    })
    it('setting custom key = "passThrough" and value = "greeapp", but real key is not exist should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passthrough=greeapp#test', "passThrough")
        ).toBe(false)
    })
    it('setting custom key = "passThrough" and value = "greeapp2", but real key or value is not exist should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passThrough=greeapp#test', "passThrough", "greeapp2")
        ).toBe(false)
    })

    // it('https://127.0.0.1', () => {
    //     const isGreeEnv = isGreeMiniProgram('https://127.0.0.1');
    //     expect(isGreeEnv).toBe(true)
    // })
})


describe('test getParams func', () => {
  it('complete url', () => {
    expect(
      getParams('https://www.baidu.com?type=1&passThrough=greeapp#test')
    ).toEqual({
      type: '1',
      passThrough: 'greeapp'
    })
  })
  it('get not easy url', () => {
    expect(
      getParams('https://www.baidu.com?type=1&passthrough2=%5Borigin%3Dgreeapp%26mac%3D1%5D#test')
    ).toEqual({
      type: '1',
      passthrough2: '[origin=greeapp&mac=1]'
    })
  })
})


describe('test getGreeParams func', () => {
  it('complete url', () => {
    expect(
      getGreeParams('https://www.baidu.com?type=1&passThrough=greeapp#test')
    ).toEqual({})
  })
  it('get not easy url', () => {
    expect(
      getGreeParams('https://www.baidu.com?type=1&passthrough=%5Borigin%3Dgreeapp%26mac%3D1%5D#test')
    ).toEqual({
      origin: 'greeapp',
      mac: '1'
    })
  })
  it('customKey url', () => {
    expect(
      getGreeParams('https://www.baidu.com?type=1&passthrough2=%5Borigin%3Dgreeapp%26mac%3D1%5D#test', 'passthrough2')
    ).toEqual({
      origin: 'greeapp',
      mac: '1'
    })
  })
})

describe('merge methods', () => {
  for(const item of mergeOptions) {
    it(item.desc, () => {
      expect(
        merge(...item.value)
      ).toStrictEqual(item.expect)
    })
  }
})

describe('untilFinished methods', () => {
  it('simple', async () => {
    const start = new Date()
    const res = await untilFinished(1, 2000)
    const end = new Date()
    expect(end - start).toBeGreaterThanOrEqual(2000)
    expect(res).toContainEqual(1)

  })
  it('simple2', async () => {
    const start = new Date()
    const res = await untilFinished(new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 3000)
    }), 2000)
    const end = new Date()
    expect(end - start).toBeGreaterThanOrEqual(3000)
    expect(res).toContainEqual(1)
  })
})

describe('deepClone methods', () => {
  it('simple', () => {
    const origin = {
      a: 1,
      b: 2,
      c: {
        c1: 3,
        c2: 4,
        c3: {
          cc1: 5
        }
      }
    }
    const cloneObj = deepClone(origin)
    origin.a = 2
    origin.c.c1 = 'new val'
    expect(cloneObj).toStrictEqual({
      a: 1,
      b: 2,
      c: {
        c1: 3,
        c2: 4,
        c3: {
          cc1: 5
        }
      }
    })
  })
})

describe('groupArray methods', () => {
  for(const item of groupOptions) {
    it(item.desc, () => {
      expect(groupArray(...item.value)).toStrictEqual(item.expect)
    })
  }
})
