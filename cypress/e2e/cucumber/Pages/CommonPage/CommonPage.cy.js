

module.exports = {

    /**
     * this function to map country name with country id
     * @param {*} countryName 
     */
      mapCountryWithCountryId(countryName) {
        let countryIds = new Map([["Turkey", 1]])
        return countryIds.get(countryName);
    },

    /**
     * to retrive the data from vertical table
     * @param {*} table 
     * @returns object of data
     */
     readFromVerticalTable(table) {
        const verticalTable = table.rowsHash();
        return verticalTable;
    },
    
    /**
     * this function to send request and store the response in alias
     * @param {*} method 
     * @param {*} url 
     * @param {*} payload 
     * @param {*} aliasName 
     */
    async sendRequest(method, url, payload, aliasName) {
        cy.request({method:method, url:url, body:payload,failOnStatusCode: false}).as(aliasName)
    }

}