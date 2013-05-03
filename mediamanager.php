<?php
/**
 * DokuWiki Starter Template
 *
 * @link     http://dokuwiki.org/template:starter
 * @author   Anika Henke <anika@selfthinker.org>
 * @license  GPL 2 (http://www.gnu.org/licenses/gpl.html)
 */

if (!defined('DOKU_INC')) die(); /* must be run from within DokuWiki */
@require_once(dirname(__FILE__).'/tpl_functions.php'); /* include hook for template functions */

?><!DOCTYPE html>
<html xml:lang="<?php echo $conf['lang'] ?>" lang="<?php echo $conf['lang'] ?>" dir="<?php echo $lang['direction'] ?>" class="no-js">
<head>
    <meta charset="UTF-8" />
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /><![endif]-->
    <title>
        <?php echo hsc($lang['mediaselect'])?>
        [<?php echo strip_tags($conf['title'])?>]
    </title>
    <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>

    <?php tpl_metaheaders() ?>
    <script src="<?php print DOKU_TPL; ?>/js/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>/js/jquery-ui.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>/js/bootstrap.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>js/script.js" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <?php echo tpl_favicon(array('favicon', 'mobile')) ?>
    <?php tpl_includeFile('meta.html') ?>
    <!-- dokuwiki's php css compressor doesn't play nice with media queries -->
    <link href="<?php print DOKU_TPL; ?>css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php print DOKU_TPL; ?>css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="<?php print DOKU_TPL; ?>css/style.css" rel="stylesheet">
</head>

<body>
    <div id="media_manager" class="dokuwiki container-fluid">
            <?php html_msgarea() ?>
            <div id="mediamgr_aside">
                <h1><?php echo hsc($lang['mediaselect'])?></h1>

                <?php /* keep the id! additional elements are inserted via JS here */?>
                <div id="media__opts"></div>

                <?php bootstrap_tpl_mediaTree() ?>
            </div>

            <div id="mediamgr_content">
                <?php tpl_mediaContent() ?>
            </div>
        </div>
    </div>
</body>
</html>
