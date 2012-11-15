/*
 * Row model in grid
 */
var RowModel = Backbone.Model.extend({
    validate: function(attrs) {
        if (attrs.name == "") {
            return "Не заполнено имя пользователя!";
        }
        if (attrs.type != "user" && attrs.type != "guest" && attrs.type != "admin") {
            return "Неправильный тип пользователя!";
        }
    },

    defaults: function() {
        return {
            index: Users.getIndex(),
            name: "",
            type: "",
            email: ""
        };
    }
});
