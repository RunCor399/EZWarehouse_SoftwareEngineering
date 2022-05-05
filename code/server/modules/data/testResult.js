class TestResult{
    #date;
    #result;

    constructor(date, result){
        //js Date received as dd/mm/yyyy
        const [day, month, year] = date.split('/');

        this.#date = new Date(+year, month-1, +day);
        this.#result = result;
    }

    getDate() {
        return this.#date;
    }

    getResult() {
        return this.#result;
    }

    setDate(date) {
        //js Date received as dd/mm/yyyy
        const [day, month, year] = date.split('/');
        
        this.#date = new Date(+year, month-1, +day);
    }

    setResult(result) {
        this.#result = result;
    }
}

module.exports = TestResult;