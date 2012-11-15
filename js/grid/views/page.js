/*
 * Page View
 */

var Users = new UsersCollection;
var sortOrder = 'asc';
var PageView = Backbone.View.extend({

    el: $("#content"),

    events: {
        "click th a": "sortGrid",
        "keyup th input": "filterGrid",
        "change th select": "filterGrid",
        "click a#addUser": "showAddForm"
    },

    initialize: function() {
        var pagination = new PaginationView();
        Users.on('add', this.addOne, this);
        Users.on('add', pagination.render);
        Users.on('reset', this.addAll, this);
        Users.on('all', this.render, this);
        Users.on('reset', pagination.render);
        Users.fetch();
    },

    render: function() {

    },

    showAddForm: function() {
        $('#saveBtn').unbind();
        $('.modal #saveBtn').click(function() {
            Users.create({
                name: $("#name").val(),
                email: $("#email").val(),
                type: $("#type").val()
            }, {
                success: function(model, error) {
                    $('.modal').modal('hide');
                },
                error: function(model, error) {
                    alert(error);
                }
            });
        });
        $(".modal input").val('')
        $('.modal #closeBtn').click(function() {
            $('.modal').modal('hide');
        });
    },

    addOne: function(row) {
        var view = new RowView({
            model: row
        });
        var recordsCount = $("#rows tbody tr").length;
        if (recordsCount < COUNT_ON_PAGE) {
            $("table#rows tbody").append(view.render().el);
        }
        Users.push(row)
        responseData.push(row.toJSON());
    },

    addAll: function() {
        $("table#rows tbody").html('');
        var recordsCount = 0;
        var rowNumber = 0;
        $.each(responseData, function(key, value){
            responseData[key]["index"] = 0
        });

        Users.each(function(row) {
            if (recordsCount < COUNT_ON_PAGE
                    && ((CURRENT_PAGE - 1)*COUNT_ON_PAGE <= rowNumber && rowNumber < CURRENT_PAGE*COUNT_ON_PAGE)) {
                var dataKey = "";
                $.each(responseData, function(key, value) {
                    if (row.get("email") == value.email) {
                        dataKey = key;
                    }
                });
                row.set({index: rowNumber + 1});
                responseData[dataKey]["index"] = row.get("index")
                var view = new RowView({
                    model: row
                });

                $("table#rows tbody").append(view.render().el);
                recordsCount++;
            }
            rowNumber++;
        });
    },

    sortGrid: function(e) {

        e.preventDefault();
        var sortParam = $(e.target).attr("href");
        $("table#rows tbody").html('');

        sortedData = Users.toJSON().sort(function(x, y) {
            return x[sortParam] > y[sortParam] ? 1 : (x[sortParam] < y[sortParam] ? -1 : 0);
        });

        if (sortOrder == 'desc') {
            sortedData = sortedData.reverse();
            sortOrder = 'asc';
        } else {
            sortOrder = 'desc';
        }

        Users.reset(sortedData)
    },

    filterGrid: function(e) {
        var typeFilter = $("#type-filter").val();
        var nameFilter = $("#name-filter").val();
        var emailFilter = $("#email-filter").val();

        var filtered = [];

        $.each(responseData, function(key, user) {
            var typePass = true;
            var namePass = true;
            var emailPass = true;
            if (typeFilter != "All" && user["type"] != typeFilter) {
                typePass = false;
            }
            if (nameFilter != "" && user["name"].toLowerCase().indexOf(nameFilter) == '-1') {
                namePass = false;
            }
            if (emailFilter != "" && user["email"].toLowerCase().indexOf(emailFilter) == '-1') {
                emailPass = false;
            }
            if (emailPass && namePass && typePass) {
                filtered.push(user)
            }
        });

        $("table#rows tbody").html('');
        Users.reset(filtered)
        sortedData = Users.toJSON()
    }
});