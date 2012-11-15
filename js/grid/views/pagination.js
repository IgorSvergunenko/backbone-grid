/**
 * Pagination View
 */
var PaginationView = Backbone.View.extend({
    el: $(".pagination"),

    events: {
        "click .pagination.main li a": "setPage",
        "click .pagination.pagination-right li a": "setCount"
    },

    initialize: function() {
        $(".pagination.pagination-right ul li a[title="+ COUNT_ON_PAGE +"]").parent().addClass("active");
    },

    render: function() {
        if (this.length < COUNT_ON_PAGE) {
            $(".pagination.main").hide();
            $(".pagination.pagination-right ul li").removeClass("active");
            CURRENT_PAGE = 1;
            $(".pagination.pagination-right ul li a[title="+ COUNT_ON_PAGE +"]").parent().addClass("active");
        } else {
            var pageCount = parseInt(this.length / COUNT_ON_PAGE)
            if (this.length % COUNT_ON_PAGE > 0) {
                pageCount++;
            }
            if (CURRENT_PAGE > pageCount) {
                CURRENT_PAGE = (pageCount == 1) ? 1 : CURRENT_PAGE - 1;
                $(".pagination.main ul li a[title="+ CURRENT_PAGE +"]").trigger("click");
            }
            $(".pagination.main ul").html('');
            for (var pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
                if (pageCount > 1) {
                    $(".pagination.main ul").append("<li><a href='#"+ pageNumber +"' title = "+ pageNumber +">"+ pageNumber +"</a></li>");
                }
            }
            $(".pagination.main").show();
            $(".pagination.main ul li a[title="+ CURRENT_PAGE +"]").parent().addClass("active");
        }
    },

    setPage: function(e) {
        e.stopPropagation();
        CURRENT_PAGE = $(e.target).attr("title");
        Users.reset(Users.toJSON());
    },

    setCount: function(e) {
        $(".pagination.pagination-right ul li").removeClass("active");
        $(e.target).parent().addClass("active");
        COUNT_ON_PAGE = $(".pagination.pagination-right li.active").children().attr("title");
        if (CURRENT_PAGE*COUNT_ON_PAGE > Users.toJSON().length) {
            CURRENT_PAGE = 1;
        }
        Users.reset(Users.toJSON());
    }

})