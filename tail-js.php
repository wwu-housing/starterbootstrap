<script src="<?php print DOKU_TPL; ?>js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script type="text/javascript">
    var jQNew = $.noConflict(true);
</script>
<script src="<?php print DOKU_TPL; ?>js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?php print DOKU_TPL; ?>js/sorttable.js" type="text/javascript"></script>
<script src="<?php print DOKU_TPL; ?>js/script.js" type="text/javascript"></script>

<!-- Google Analytics: Set this in your template settings.
     //doku.php/start?do=admin&page=config#config___tpl____starter-bootstrap____google_analytics -->
<script>
    var _gaq=[['_setAccount','<?php echo tpl_getConf('google_analytics'); ?>'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src='//www.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
</script>
