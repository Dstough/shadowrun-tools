function RenderData(me, layer = 1) {

    if (me === undefined)
        return '';

    if (layer > 5)
        layer = 5;

    if (typeof me === 'string' || typeof me === 'number')
        return '<p>' + me + '</p>';

    if (Array.isArray(me)) {
        let message = ''
        me.forEach(function (o) {
            message += RenderData(o, layer);
        });
        return message;
    }

    if (typeof me !== 'object' || me['type'] === undefined)
        return '';

    if (me['type'] === 'section' || me['type'] === 'entries') {
        if (me['name'] === undefined && me['entries'] === undefined) {
            return '';
        }

        let message = '<div>';

        if (me['name'] !== undefined) {
            message += '<h' + layer + '>' + me['name'] + '</h' + layer + '>';
        }

        if (me['entries'] !== undefined) {
            me['entries'].forEach(function (entry) {
                message += RenderData(entry, layer + 1);
            });
        }

        message += "</div>";

        return message;
    }

    //TODO: render tables.
    //TODO: render lists.
    //TODO: render images.

    return '';
}