function RenderData(me, layer = 1) {

    if (me === undefined)
        return '';

    if (layer > 5)
        layer = 5;

    let message = ''

    if (typeof me === 'string' || typeof me === 'number') {
        message = me + ' ';
    }
    else if (Array.isArray(me)) {
        message = RenderArray(me, layer);
    }
    else if (typeof me !== 'object' || me.type === undefined) {
        message = '';
    }
    else if (me.type === 'section') {
        message = RenderDiv(me, layer);
    }
    else if (me.type === 'paragraph') {
        message = RenderP(me, layer);
    }
    else if (me.type === 'italic') {
        message = RenderI(me, layer);
    }
    else if (me.type === 'bold') {
        message = RenderB(me, layer);
    }
    else if (me.type === 'underline') {
        message = RenderU(me, layer);
    }
    else if (me.type === 'strike') {
        message = RenderDel(me, layer);
    }
    else if (me.type === 'table') {
        message = RenderTable(me, layer);
    }
    else if (me.type === 'list') {
        message = RenderList(me, layer);
    }
    else if (me.type === 'inset') {
        message = RenderInset(me, layer);
    }
    else if (me.type === 'highlight') {
        message = RenderHighlight(me, layer);
    }

    //TODO: render images.

    return message;
}

function RenderHighlight(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<span class = "highlight">';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</span>';
    }
    return message;
}

function RenderInset(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<span class="inset">';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</span>';
    }
    return message;
}

function RenderList(me, layer) {
    let message = '';
    if (me.name !== undefined) {
        message += '<h' + layer + '>' + me.name + '</h' + layer + '>';
    }
    message += '<ul>';
    if (me.entries !== undefined) {
        me.entries.forEach(function (entry) {
            message += '<li>' + RenderData(entry, layer + 1) + '</li>';
        });
    }
    message += "</ul>";
    return message;
}

function RenderArray(arr, layer) {
    let message = ''
    arr.forEach(function (item) {
        message += RenderData(item, layer);
    });
    return message;
}

function RenderI(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<i>';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</i>';
    }
    return message;
}

function RenderDel(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<span style="text-decoration: line-through;">';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</span>';
    }
    return message;
}

function RenderU(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<u>';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</u>';
    }
    return message;
}

function RenderB(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<b>';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</b>';
    }
    return message;
}

function RenderP(me, layer) {
    let message = '';
    if (me.entries !== undefined) {
        message += '<p>';
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer);
        });
        message += '</p>';
    }
    return message;
}

function RenderDiv(me, layer) {
    if (me.name === undefined && me.entries === undefined) {
        return '';
    }

    let message = '<div>';

    if (me.name !== undefined) {
        message += '<h' + layer + '>' + me.name + '</h' + layer + '>';
    }

    if (me.entries !== undefined) {
        message += '<p>'; 0
        me.entries.forEach(function (entry) {
            message += RenderData(entry, layer + 1);
        });
        message += '</p>';
    }

    message += "</div>";

    return message;
}

function RenderTable(me, layer) {
    if (me.columns === undefined || !Array.isArray(me.columns)) {
        return '';
    }

    let message = '<div>';

    if (me.name !== undefined) {
        message += '<h' + layer + '>' + me.name + '</h' + layer + '>';
    }

    message += '<table><thead><tr>';

    me.columns.forEach(function (column) {
        message += '<th>' + RenderData(column, layer) + '</th>';
    });

    message += "</tr></thead><tbody>"

    if (me.rows !== undefined) {
        me.rows.forEach(function (row) {
            message += '<tr>';
            row.forEach(function (cell) {
                message += '<td';
                if (cell.type === 'cell' && cell.width !== undefined)
                    message += ' colspan ="' + cell.width + '">' + RenderData(cell.value, layer) + '</td>';
                else
                    message += '>' + RenderData(cell, layer);
                message += '</td>';
            });
            message += '</tr>';
        });
    }

    message += "</tbody></table></div>";

    return message;
}