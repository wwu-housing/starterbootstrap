jQNew(document).ready(function() {
    jQNew('.ui-dialog-titlebar-close').click(function() {
        jQNew('.ui-dialog').hide();
    });

    jQNew('.sidebar-page ul .li').each(function() {
        var $that = jQNew(this);
        if ($that.parent().find('ul').length > 0) {
            $that.prepend('<span class="glyphicon glyphicon-chevron-down pull-right"></span>');
        }
    });

    jQNew('.sidebar-page ul .li').click(function() {
        jQNew(this).parent().find('ul').first().slideToggle(300);
    });

    jQNew('#toc_contents ul > li:first-child').each(function(e) {
        if (jQNew(this).children(':first').filter('ul').length > 0) {
            jQNew(this).css('list-style-type', 'none');
        }
    });

    jQNew('abbr').tooltip({
        delay: { open: 500, close: 100 }
    });

    /* http://www.kryogenix.org/code/browser/sorttable/ */
    jQNew('.page table').each(function() {
        sorttable.makeSortable(jQNew(this).get(0));
    });

    // Scroll to a link smoothly
    smoothToPadding = jQNew('#dokuwiki__top .navbar').first().innerHeight() + 10;
    function smoothTo() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = jQNew(this.hash);
            target = target.length ? target : jQNew('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                jQNew('html,body').animate({
                    scrollTop: target.offset().top - smoothToPadding
                }, 200);
                return false;
            }
        } else {
            return true;
        }
    }
    jQNew('a').click(smoothTo);

    /* override footnote popups */
    // kill old event
    jQNew('a.fn_top').unbind('mouseover', dw_page.footnoteDisplay);
    dw_page.insituPopup = function(target, popup_id) {
        // on first hover, set up and show the popover
        $el = jQNew(target);
        if (!$el.hasClass('popover-trigger')) {
            content = jQNew($el.attr('href')).closest('div.fn').html().replace(/((^|\s*,\s*)<sup>.*?<\/sup>)+\s*/gi, '').replace(/\bid=(['"])([^"']+)\1/gi,'id="insitu__$2');
            $el.popover({
                'content': content,
                'toggle': 'popover',
                'placement': 'bottom',
                'trigger': 'hover',
                'html': true,
                'delay': {
                    show: 0,
                    hide: 1000
                },
                'container': '#dokuwiki__content'
            }).addClass('popover-trigger').popover('show');
        }
    };
    dw_page.footnoteDisplay = function() {
        dw_page.insituPopup(this, 'insitu__fn');
    };
    // rebind new event
    jQNew('a.fn_top').mouseover(dw_page.footnoteDisplay);
});

/* toolbar button to add a table */
function addBtnActionInsertTable($btn, props, edid) {
    // set up what happens when the button is clicked
    $btn.click(function() {
        // create a new element on the page.
        var $picker = jQNew(document.createElement('div'));
        $picker.addClass('modal fade');
        $picker.attr('role', 'dialog')
               .attr('aria-hidden', 'true')
               .attr('aria-labelledby', 'Insert Table Modal Box')
               .attr('id', 'insert-table-popup')
               .css('position', 'absolute');

        // set up the content of the element
        var html = '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                     '<div class="modal-header">' +
                      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                      '<h3 class="modal-title">Insert table markup</h3>' +
                     '</div>' +
                     '<div class="modal-body">' +
                      '<form class="form-horizontal">' +
                       '<div class="form-group">' +
                        '<label class="control-label col-lg-6" for="hrows">Header rows</label>' +
                        '<div class="col-lg-2">' +
                         '<input class="form-control" type="number" id="hrows" value=1 min=0 step=1>' +
                        '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                        '<label class="control-label col-lg-6" for="hcols">Header columns</label>' +
                        '<div class="col-lg-2">' +
                         '<input class="form-control" type="number" id="hcols" value=0 min=0 step=1>' +
                        '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                        '<label class="control-label col-lg-6" for="rows">Body Rows</label>' +
                        '<div class="col-lg-2">' +
                         '<input class="form-control" type="number" id="rows" value=3 min=0 step=1>' +
                        '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                        '<label class="control-label col-lg-6" for="cols">Body Columns</label>' +
                        '<div class="col-lg-2">' +
                         '<input class="form-control" type="number" id="cols" value=3 min=0 step=1>' +
                        '</div>' +
                       '</div>' +
                      '</form>' +
                      '<div class="preview">' +
                       '<h4>Preview</h4>' +
                       '<table class="table table-bordered">' +
                       '</table>' +
                      '</div>' +
                      '<div class="markup">' +
                       '<h4>Markup</h4>' +
                       '<pre>' +
                       '</pre>' +
                      '</div>' +
                     '</div>' +
                     '<div class="modal-footer">' +
                      '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>' +
                      '<button type="button" class="btn btn-primary">Insert</button>' +
                     '</div>' +
                    '</div>' +
                   '</div>';

        // the ultimate action of the new button
        function tableInsert($picker) {
            // get the size of the table
            var tabletext = "\n";
            hrows = $picker.find('#hrows').val();
            hcols = $picker.find('#hcols').val();
            rows = $picker.find('#rows').val();
            cols = $picker.find('#cols').val();

            // make sure the table has cells
            if (hrows + rows < 1) {
                alert("You need more than 0 rows.");
                return false;
            } else if (hcols + cols < 1) {
                alert("You need more than 0 columns.");
                return false;
            }

            var i, j;
            // create header rows
            for (i = 0; i < hrows; i++) {
                for (j = 0; j < parseInt(hcols) + parseInt(cols); j++) {
                    tabletext += "^  ";
                }
                tabletext += "^\n";
            }
            // create body rows
            for (i = 0; i < rows; i++) {
                // create header columns
                for (j = 0; j < hcols; j++) {
                    tabletext += "^  ";
                }
                // create body columns
                for (j = 0; j < cols; j++) {
                    tabletext += "|  ";
                }
                tabletext += "|\n";
            }

            // insert the table into the page
            insertAtCarret(edid, tabletext + '\n');

            // hide and remove the element
            $picker.modal('hide');
        }

        function updatePreview() {
            var $table = $preview.find('table').html('');
            var $markup = $picker.find('pre').text('');

            var tablehtml = '';
            var tabletext = "";

            // make sure the table has cells
            if (hrows + rows < 1) {
                return false;
            } else if (hcols + cols < 1) {
                return false;
            }

            var i, j;
            // create header rows
            for (i = 0; i < hrows; i++) {
                tablehtml += '<tr>';
                for (j = 0; j < parseInt(hcols) + parseInt(cols); j++) {
                    tablehtml += "<th></th>";
                    tabletext += "^ Header ";
                }
                tablehtml += "</tr>\n";
                tabletext += "^\n";
            }
            // create body rows
            for (i = 0; i < rows; i++) {
                tablehtml += '<tr>';
                // create header columns
                for (j = 0; j < hcols; j++) {
                    tablehtml += "<th></th>";
                    tabletext += "^ Header ";
                }
                // create body columns
                for (j = 0; j < cols; j++) {
                    tablehtml += "<td></td>";
                    tabletext += "| content ";
                }
                tablehtml += "</tr>\n";
                tabletext += "|\n";
            }

            $table.html(tablehtml);
            $markup.text(tabletext);
        }

        // add the content to the element and insert it into the page
        $picker.append(html);
        jQNew('body').append($picker);

        var hrows = $picker.find('#hrows').val();
        var hcols = $picker.find('#hcols').val();
        var rows = $picker.find('#rows').val();
        var cols = $picker.find('#cols').val();
        var $preview = jQNew('.preview');

        // set up the insert table action
        $picker.find('.btn-primary').bind('click', bind(tableInsert, $picker));

        // set up handlers to show table preview
        $picker.find('#hrows').on('propertychange keyup input paste', function(e) {
            hrows = jQNew(this).val();
            updatePreview();
        });
        $picker.find('#hcols').on('propertychange keyup input paste', function(e) {
            hcols = jQNew(this).val();
            updatePreview();
        });
        $picker.find('#rows').on('propertychange keyup input paste', function(e) {
            rows = jQNew(this).val();
            updatePreview();
        });
        $picker.find('#cols').on('propertychange keyup input paste', function(e) {
            cols = jQNew(this).val();
            updatePreview();
        });

        updatePreview();

        $picker.on('hidden.bs.modal', function() {
            $picker.remove();
        });

        // show the element as a modal window
        $picker.modal('show');

        return $picker[0];
    });

    return true;
}
// add a new toolbar button
if (window.toolbar !== undefined) {
    window.toolbar[window.toolbar.length] = {
        'type'  : 'InsertTable', // new type that links to the function
        'title' : 'Insert Table',
        'icon'  : '../../tpl/starterbootstrap/img/table.png'
    };
}
jQNew('#toc_contents').slideToggle('slow');
// index of contents dropdown menu on pages
jQNew('#dw_toc .panel-heading').click(function() {
    jQNew('#toc_contents').slideToggle('fast');
});
