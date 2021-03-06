// 就是测试前 要做一些准备工作， and 测试后需要干一些整理工作，所以Jest提供了辅助函数来处理这个问题

//为多次测试重复设置
/*
如果你有一些要为多次测试重复设置的工作，你可以使用 beforeEach 和 afterEach。

例如，我们考虑一些与城市信息数据库进行交互的测试。 你必须在每个测试之前调用方法 initializeCityDatabase() ，同时必须在每个测试后，调用方法 clearCityDatabase()。 你可以这样做：
* */

beforeEach( () => {
    function initializeCityDatabase(){
        console.log('before each called initializeCityDatabase')
    }

    initializeCityDatabase()
})

afterEach(() => {
    function clearCityDatabase(){
        console.log(`after each called clearCityDatabase`)
    }
    clearCityDatabase()
})

const isCity = (str) => {
    return str === 'Vienna'
}
test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).not.toBeTruthy();
});
