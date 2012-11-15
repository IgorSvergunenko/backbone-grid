/*
 * Row View
 */

var RowView = Backbone.View.extend({
    tagName: "tr",

    template: _.template($('#row-template').html()),

    events: {
        "click i.icon-remove": "clear",
        "click td a": "update"
    },

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    clear: function() {
        var keyData = "";
        var model = this.model;
        $.each(responseData, function(key, value) {
            if (value.email == model.toJSON().email) {
                keyData = key;
            }
        });
        responseData.splice(keyData, 1);
        model.destroy();
        Users.reset(Users.toJSON());
    },

    update: function(e) {
        e.preventDefault();
        var model = this.model;
        $('.modal #saveBtn').unbind();
        $('.modal').modal('show');

        var keyData = ""
        $.each(responseData, function(key, value) {
            if (value.email == model.toJSON().email) {
                keyData = key
            }
        });

        $("#name").val(model.get("name"));
        $("#email").val(model.get("email"));
        $("#type").val(model.get("type"));

        $('.modal #closeBtn').click(function() {
            $(".modal input").val('')
            $('.modal').modal('hide');
        });

        $('.modal #saveBtn').click(function() {
            model.save({
                name: $("#name").val(),
                email: $("#email").val(),
                type: $("#type").val()
            }, {
                success: function(model, error) {
                    responseData[keyData] = model.toJSON();
                    $('.modal').modal('hide');
                },
                error: function(model, error) {
                    alert(error);
                    return;
                }
            });
        });
    }
});