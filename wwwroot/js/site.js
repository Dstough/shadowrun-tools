function RenderBookNavigation(content, target) {
    var html = '<ul><li id="bookmark-show-all" class="collapseable">Show All</li><ul>';
    html += Recurse($('#' + content).find('h1'));
    html += '</ul>';
    $('#' + target).html(html);

    $('#' + target + ' li').on('click', function () {

        $('#' + content).children().each(function () {
            $(this).hide();
        });

        if (this.id === 'bookmark-show-all') {
            ShowAllSections(content);
        }
        else {
            ShowSection(this.id.replace('bookmark-', ''));
        }
    });
}

function Recurse(list, level = 1) {
    var html = '';
    list.each(function () {
        html += '<li id="bookmark-' + this.id + '" class="collapseable">' + $(this).html() + '</li>';
        if ($(this).nextUntil('h' + level, 'h' + (level + 1)).length)
            html += '<ul class="collapse">';
        html += Recurse($(this).nextUntil('h' + level, 'h' + (level + 1)), level + 1);
        if ($(this).nextUntil('h' + level, 'h' + (level + 1)).length)
            html += '</ul>';
    });
    return html;
}

function ShowAllSections(content) {
    $('#' + content).children().each(function () {
        $(this).fadeIn();
    });
}

function ShowSection(content) {

    var tag = $('#' + content).get(0).nodeName.toLowerCase();

    if (tag === 'h2')
        tag += ',h1';
    else if (tag === 'h3')
        tag += ',h2,h1';
    else if (tag === 'h4')
        tag += ',h3,h2,h1';
    else if (tag === 'h5')
        tag += ',h4,h3,h2,h1';
    else if (tag === 'h6')
        tag += ',h5,h4,h3,h2,h1';

    var section = $('#' + content).nextUntil(tag).addBack();

    section.each(function () {
        $(this).fadeIn();
    });
}