function init() {

    jQNew('.ui-dialog-titlebar-close').click(function() {
        jQNew('.ui-dialog').hide();
    });

    jQNew('.sidebar-page ul .li').each(function() {
        var $that = jQNew(this);
        if ($that.parent().find('ul').length > 0) {
            $that.append('<i class="icon-chevron-down pull-right"></i>');
        }
    });

    jQNew('.sidebar-page ul .li').click(function() {
        jQNew(this).parent().find('ul').first().slideToggle(300);
    });

    jQNew('abbr').tooltip({
        delay: { open: 500, close: 100 }
    });

}

/* toolbar button to add a table */
function addBtnActionInsertTable($btn, props, edid) {
    // set up what happens when the button is clicked
    $btn.click(function() {
        // create a new element on the page.
        var $picker = jQNew(document.createElement('div'));
        $picker.addClass('modal hide fade');
        $picker.attr('role', 'dialog')
               .attr('aria-hidden', 'true')
               .attr('aria-labelledby', 'Insert Table Modal Box')
               .attr('id', 'insert-table-popup')
               .css('position', 'absolute');

        // set up the content of the element
        var html =  '<h3>Insert table markup</h3>';
            html += '<form class="form-horizontal">';
            html +=  '<div class="control-group">';
            html +=   '<label class="control-label" for="hrows">Header rows</label>';
            html +=   '<div class="controls">';
            html +=    '<input type="number" id="hrows" value=1 min=0 step=1>';
            html +=   '</div>';
            html +=  '</div>';
            html +=  '<div class="control-group">';
            html +=   '<label class="control-label" for="hcols">Header columns</label>';
            html +=   '<div class="controls">';
            html +=    '<input type="number" id="hcols" value=0 min=0 step=1>';
            html +=   '</div>';
            html +=  '</div>';
            html +=  '<div class="control-group">';
            html +=   '<label class="control-label" for="rows">Body Rows</label>';
            html +=   '<div class="controls">';
            html +=    '<input type="number" id="rows" value=3 min=0 step=1>';
            html +=   '</div>';
            html +=  '</div>';
            html +=  '<div class="control-group">';
            html +=   '<label class="control-label" for="cols">Body Columns</label>';
            html +=   '<div class="controls">';
            html +=    '<input type="number" id="cols" value=3 min=0 step=1>';
            html +=   '</div>';
            html +=  '</div>';
            html +=  '<div class="control-group">';
            html +=   '<div class="controls">';
            html +=    '<div class="btn-group">';
            html +=     '<button type="button" class="btn" data-dismiss="modal">Cancel</button>';
            html +=     '<button type="button" class="btn btn-primary">Insert</button>';
            html +=    '</div>';
            html +=   '</div>';
            html +=  '</div>';
            html += '</form>';

        // the ultimate action of the new button
        function tableInsert($form) {
            // get the size of the table
            var tabletext = "";
            var hrows = $form.find('#hrows').val();
            var hcols = $form.find('#hcols').val();
            var rows = $form.find('#rows').val();
            var cols = $form.find('#cols').val();

            // make sure the table has cells
            if (hrows + rows < 1) {
                alert("You need more than 0 rows.");
                return false;
            } else if (hcols + cols < 1) {
                alert("You need more than 0 columns.");
                return false;
            }

            // create header rows
            for (var i = 0; i < hrows; i++) {
                for (var j = 0; j < parseInt(hcols) + parseInt(cols); j++) {
                    tabletext += "^ header ";
                }
                tabletext += "^\n";
            }
            // create body rows
            for (var i = 0; i < rows; i++) {
                // create header columns
                for (var j = 0; j < hcols; j++) {
                    tabletext += "^ header ";
                }
                // create body columns
                for (var j = 0; j < cols; j++) {
                    tabletext += "|  ";
                }
                tabletext += "|\n";
            }

            // insert the table into the page
            insertAtCarret(edid, tabletext);

            // hide and remove the element
            $picker.modal('hide').remove();
        }

        // add the content to the element and insert it into the page
        $picker.append(html);
        jQNew('body').append($picker);

        // set up the insert table action
        $picker.find('.btn-primary').bind('click', bind(tableInsert, $picker.find('form')));

        // show the element as a modal window
        $picker.modal('show');

        return $picker[0];
    });

    return true;
}
// add a new toolbar button
if (window.toolbar != undefined) {
    window.toolbar[window.toolbar.length] = {
        'type'  : 'InsertTable', // new type that links to the function
        'title' : 'Insert Table',
        'icon'  : '../../tpl/starter-bootstrap/img/table.png'
    };
}
