/*
*   Mock Functions
*   Mock functions make it easy to test the links between code by erasing the actual implementation of a function,
*   capturing calls to the function (and the parameters passed in those calls),
*   capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.

    There are two ways to mock functions: Either by creating a mock function to use in test code,
    or writing a manual mock to override a module dependency.
*
* */

function forEach(items, callback){
    for(let index = 0; index < items.length; index++){
        callback(items[index])
    }
}
const mockCallback = jest.fn(x => 42 + x)
forEach([0, 1], mockCallback)

// To test this function, we can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected.
test('Mock functions', () => {
    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);
})


/*
* .mock property
*   All mock functions have this special `.mock` property, which is where data about how the function has been called and what the function returned is kept.
*   The .mock property also tracks the value of this for each call, so it is possible to inspect this as well.
* */
