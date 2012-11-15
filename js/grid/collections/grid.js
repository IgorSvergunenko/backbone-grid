/*
 * Grid collection
 */
var responseData = ""
var sortedData = ""
var UsersCollection = Backbone.Collection.extend({
    model: RowModel,
    url: "data/users.json",
    parse: function(response) {
        responseData = sortedData = response;
        return response;
    },

    getIndex: function() {
        return Users.length + 1;
    }
});

