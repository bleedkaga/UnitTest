//在JavaScript中执行异步代码是很常见的。 当你有以异步方式运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。 Jest有若干方法处理这种情况。

// Callback
/*
*   最常见的异步模式是回调函数
*
*   例如, 假设有一个 fetchData(callback) 函数，获取一些数据并在完成时调用 callback(data). 您想要测试这返回的数据是只是字符串 'peanut butter'
*
*   By default, jest tests complete once they reach the end of their execution. That means this test will not work as intended:
* */

// Don't do this
test('the data is peanut butter', (done) => {
    function callback(data){
        expect(data).toBe('peanut butter')
        done();
    }

    function fetchData(callback){
        setTimeout(() => {
            callback('peanut butter')
        }, 1000)
    }
    fetchData(callback)
})

// Promises
/*
*   If you code use Promises, 还有一个更简单的方法来处理异步测试。 只需要从您的测试返回一个 Promise, Jest 会等待这一 Promise 来解决。 如果承诺被拒绝，则测试将自动失败。
*
*   For example, let's say that fetchData, instead of using a callback, returns a promise that is supposed to resolve to the string 'peanut butter'. We could test it with:
 *  */

test(`Promise resolve: the data is peanut butter`, () => {
    let fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('peanut butter')
            }, 1000)
        })
    }
    return fetchData().then( data => {
        expect(data).toBe('peanut butter')
    })
})

/*
    Be sure to return the promise - if you omit this return statement, your test will complete before the
    promise returned from fetchData resolves and then() has a chance to execute the callback
* */

test('Promise catch: the data is peanut butter', () => {
    let fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 1000)
    })
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
})

test(`Promise: .resolves`, () => {
    let fetchData = (a) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a){
                resolve('peanut butter')
            } else {
                reject('error')
            }
        }, 1000)
    })

    return expect(fetchData(true)).resolves.toBe('peanut butter')
})
test(`Promise: .rejects`, () => {
    let fetchData = (a) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a){
                resolve('peanut butter')
            } else {
                reject('error')
            }
        }, 1000)
    })

    return expect(fetchData(false)).rejects.toBe('error')
})

/*  Async / Await

        或者，您可以在测试中使用 async 和 await。 若要编写 async 测试，只要在函数前面使用 async 关键字传递到 test。 例如，可以用来测试相同的 fetchData 方案︰
* */
let fetchData = (f = true) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            if(f){
                resolve('peanut butter')
            } else {
                reject('error')
            }
        }, 300)
    })
}
test(`Async / Await: the data is peanut butter`, async () => {
    expect.assertions(1);
    const data = await fetchData();
    expect(data).toBe('peanut butter')
})

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await fetchData(false);
    } catch (e) {
        expect(e).toMatch('error');
    }
});


test('the data is peanut butter', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    await expect(fetchData(false)).rejects.toThrow('error');
});
