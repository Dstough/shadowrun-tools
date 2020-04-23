$(function () {
    $(document).on("click", ".collapseable", function () {
        $(this).siblings("ul").each(function () {
            if (!$(this).hasClass("collapse")) {
                $(this).addClass("collapse");
            }
            $(this).children("ul").each(function () {
                if (!$(this).hasClass("collapse")) {
                    $(this).addClass("collapse");
                }
            });
        });
        $(this).next(".collapse").removeClass("collapse");
    });
});