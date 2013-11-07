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
    <?php @require_once(dirname(__FILE__).'/head-css.php'); ?>
</head>

<body>
    <div class="container">
        <div id="media_manager" class="dokuwiki row">
            <?php html_msgarea() ?>
            <div id="mediamgr_aside" class="col-sm-4">
                <h1><?php echo hsc($lang['mediaselect'])?></h1>

                <?php /* keep the id! additional elements are inserted via JS here */?>
                <div id="media__opts"></div>

                <?php bootstrap_tpl_mediaTree() ?>
            </div>

            <div id="mediamgr_content" class="col-sm-8">
                <?php tpl_mediaContent() ?>
            </div>
        </div>
    </div>

    <?php @require_once(dirname(__FILE__).'/tail-js.php'); ?>
</body>
</html>
