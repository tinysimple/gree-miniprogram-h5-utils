import { isGreeMiniProgram } from '../../src/utils/index'
const { isGreeMiniProgram: otherWay } = require('../../src/utils/index')

const urls = {
    'https://127.0.0.1': false,
    'http://127.0.0.1': false,
    'https://xxx.com?path=test': false,
    'https://www.xxx.com?query=gree#a1': false
}
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
        }).toThrow(new Error(`'isGreeMiniProgram' method param 'url' must exist and is type of 'string'`))
        // expect(isGreeEnv).toThrow(new Error(`'isGreeMiniProgram' method param 'url' must be of type 'string'`))
    })
    it('exist the url param but is not type of string', () => {
        expect(() => {
            isGreeMiniProgram(1)
        }).toThrow(new Error(`'isGreeMiniProgram' method param 'url' must be of type 'string'`))
    })
    it('exist the url param but the value is empty string', () => {
        expect(isGreeMiniProgram('')).toBe(false)
    })
    it('exist the key params but value is not type of string', () => {
        expect(() => {
            isGreeMiniProgram('http://...', 1)
        }).toThrow(new Error(`'isGreeMiniProgram' method param 'key' must be of type 'string'`))
    })
    it('exist the key and value params, but value is not type of string', () => {
        expect(() => {
            isGreeMiniProgram('http://...', 'greeEnv', 2)
        }).toThrow(new Error(`'isGreeMiniProgram' method param 'value' must be of type 'string'`))
    })
    it('exist hash but not params should return false', () => {
        expect(isGreeMiniProgram('https://www.baidu.com#a1')).toBe(false)
    })
    it('exist ? and hash but not real params should return false', () => {
        expect(isGreeMiniProgram('https://www.baidu.com?#a1')).toBe(false)
    })
    it('exist key = "passThroughParams" and value = "greeapp" should return true', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passThroughParams=greeapp#test')
        ).toBe(true)
    })
    it('exist key != "passThroughParams" and value = "greeapp" should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passThroughParams2=greeapp#test')
        ).toBe(false)
    })
    it('exist key = "passThroughParams" and value != "greeapp" should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passThroughParams=greeapp2#test')
        ).toBe(false)
    })
    it('exist custom key = "passThrough" and value = "greeapp" should return true', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passThrough=greeapp#test', "passThrough")
        ).toBe(true)
    })
    it('setting custom key = "passThrough" and value = "greeapp", but real key is not exist should return false', () => {
        expect(
            isGreeMiniProgram('https://www.baidu.com?type=1&passThroughParams=greeapp#test', "passThrough")
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
