<script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>

<?php tpl_metaheaders() ?>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<?php echo tpl_favicon(array('favicon', 'mobile')) ?>
<?php tpl_includeFile('meta.html') ?>
<!-- dokuwiki's php css compressor doesn't play nice with media queries -->
<link href="<?php print DOKU_TPL; ?>css/bootstrap.min.css" rel="stylesheet">
<link href="<?php print DOKU_TPL; ?>css/style.css" rel="stylesheet">
