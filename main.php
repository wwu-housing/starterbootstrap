<?php
/**
 * DokuWiki Starter Bootstrap Template
 *
 * @link     http://dokuwiki.org/template:starter[M JE
 * @author   Anika Henke <anika@selfthinker.org>
 * @license  GPL 2 (http://www.gnu.org/licenses/gpl.html)
 */

if (!defined('DOKU_INC')) die(); /* must be run from within DokuWiki */
@require_once(dirname(__FILE__).'/tpl_functions.php'); /* include hook for template functions */

$showTools = !tpl_getConf('hideTools') || ( tpl_getConf('hideTools') && $_SERVER['REMOTE_USER'] );
$showSidebar = page_findnearest($conf['sidebar']) && ($ACT=='show');
?><!DOCTYPE html>
<html xml:lang="<?php echo $conf['lang'] ?>" lang="<?php echo $conf['lang'] ?>" dir="<?php echo $lang['direction'] ?>" class="no-js">
<head>
    <meta charset="UTF-8" />
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /><![endif]-->
    <title>
        <?php tpl_pagetitle() ?>
        [<?php echo strip_tags($conf['title'])?>]
    </title>
    <?php @require_once(dirname(__FILE__).'/head-css.php'); ?>
</head>

<body data-spy="scroll" data-target="#dw_toc" onLoad="init()">
    <?php /* with these Conditional Comments you can better address IE issues in CSS files,
             precede CSS rules by #IE6 for IE6, #IE7 for IE7 and #IE8 for IE8 (div closes at the bottom) */ ?>
    <!--[if IE 6 ]><div id="IE6"><![endif]--><!--[if IE 7 ]><div id="IE7"><![endif]--><!--[if IE 8 ]><div id="IE8"><![endif]-->

    <?php /* the "dokuwiki__top" id is needed somewhere at the top, because that's where the "back to top" button/link links to */ ?>
    <?php /* classes mode_<action> are added to make it possible to e.g. style a page differently if it's in edit mode,
         see http://www.dokuwiki.org/devel:action_modes for a list of action modes */ ?>
    <?php /* .dokuwiki should always be in one of the surrounding elements (e.g. plugins and templates depend on it) */ ?>
    <div id="dokuwiki__site" ><div id="dokuwiki__top"
        class="dokuwiki site mode_<?php echo $ACT ?> <?php echo ($showSidebar) ? 'hasSidebar' : '' ?>">
    <a href="#dokuwiki__content" class="a11y"><?php echo $lang['skip_to_content'] ?></a></li>
    <div class="navbar navbar-fixed-top">
        <div class="container">
            <?php tpl_includeFile('header.html') ?>

            <!-- ********** HEADER ********** -->

            <!-- .navbar-toggle is used as the toggle for collapsed navbar content -->
            <a class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>

            <?php tpl_link(wl(),$conf['title'],'accesskey="h" title="[H]" class="navbar-brand"') ?>

            <div class="nav-collapse collapse">
                <ul class="nav navbar-nav pull-right">
                     <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header"><?php echo $lang['site_tools'] ?></li>
                            <!-- USER TOOLS -->
                            <?php if ($conf['useacl'] && $showTools): ?>
                            <?php
                                if ($ACT == 'recent') { tpl_action('recent', 1, 'li class="active"'); } else { tpl_action('recent', 1, 'li'); };
                                if ($ACT == 'media') { tpl_action('media', 1, 'li class="active"'); } else { tpl_action('media', 1, 'li'); };
                                if ($ACT == 'index') { tpl_action('index', 1, 'li class="active"'); } else { tpl_action('index', 1, 'li'); };
                            ?>
                            <?php endif ?>
                            <?php if ($showTools): ?>
                            <li class="dropdown-header"><?php echo $lang['user_tools'] ?></li>
                            <?php
                                tpl_action('edit', 1, 'li');
                                if ($ACT == 'revisions') { tpl_action('revisions', 1, 'li class="active"'); } else { tpl_action('revisions', 1, 'li'); };
                                if ($ACT == 'backlink') { tpl_action('backlink', 1, 'li class="active"'); } else { tpl_action('backlink', 1, 'li'); };
                                tpl_action('subscribe', 1, 'li');
                                tpl_action('revert', 1, 'li');
                                if ($ACT == 'profile') { tpl_action('profile', 1, 'li class="active"'); } else { tpl_action('profile', 1, 'li'); };
                                if ($ACT == 'login') { tpl_action('login', 1, 'li class="active"'); } else { tpl_action('login', 1, 'li'); };
                                if ($ACT == 'admin') { tpl_action('admin', 1, 'li class="active"'); } else { tpl_action('admin', 1, 'li'); };
                            ?>
                            <?php endif; ?>
                            <li class="divider"></li>
                            <?php /* the optional second parameter of tpl_action() switches between a link and a button,
                             e.g. a button inside a <li> would be: tpl_action('edit', 0, 'li') */
                                tpl_action('top', 1, 'li');
                            ?>
                       </ul>
                    </li>
                </ul>

                <?php _tpl_searchform() ?>
            </div>
        </div>
    </div>

    <div class="container not-header">
        <div class="nofications">
            <?php html_msgarea() /* occasional error and info messages on top of the page */ ?>
        </div>

        <ul class="nav nav-tabs nav-stacked visible-sm">
            <li><a href="#dokuwiki__content" class="skip-to-content"><?php echo $lang['skip_to_content'] ?></a></li>
        </ul>

        <?php if($conf['breadcrumbs']) _tpl_breadcrumbs(); ?>

        <section class="wrapper row"><!-- PAGE ACTIONS -->
            <!-- ********** ASIDE ********** -->
            <?php if ($ACT == 'show'): ?>
            <aside id="dokuwiki__aside" class="col-<?php
                                    $cols = (int) tpl_getConf('sidebar_cols');
                                    if ($cols <= 0 || $cols >= 12) {
                                        $cols = 3;
                                    }
                                    echo $cols; ?>">
                <?php if ($showSidebar): ?>
                <div class="sidebar-page">
                    <?php tpl_includeFile('sidebarheader.html') ?>
                    <?php tpl_include_page($conf['sidebar'], 1, 1) /* includes the nearest sidebar page */ ?>
                    <?php tpl_includeFile('sidebarfooter.html') ?>
                </div>
                <?php endif; ?>
                <?php //include('sidebar.php'); ?>
            </aside><!-- /aside -->
            <?php endif; ?>

            <!-- ********** CONTENT ********** -->
            <div id="dokuwiki__content" class="<?php if ($ACT == 'show'): ?>col-<?php echo 12 - $cols; ?><?php else: ?>col-12<?php endif; ?>">
                <?php if($conf['youarehere']){ ?>
                    <div class="youarehere">
                        <?php bootstrap_tpl_youarehere() ?>
                    </div>
                <?php } ?>

                <?php tpl_flush() /* flush the output buffer */ ?>
                <?php tpl_includeFile('pageheader.html') ?>

                <?php _tpl_toc(); ?>
                <div class="page" role="main">
                <!-- wikipage start -->
                    <?php tpl_content(false) /* the main content */ ?>
                <!-- wikipage stop -->
                </div>

                <?php tpl_includeFile('pagefooter.html') ?>
            </div><!-- /content -->
        </section><!-- /wrapper -->

        <!-- ********** FOOTER ********** -->
        <footer id="dokuwiki__footer">
            <div class="row">
                <ul class="doc breadcrumb pull-right">
                    <li><?php tpl_action('top', 1, ''); ?></li>
                    <li><?php tpl_pageinfo() /* 'Last modified' etc */ ?></li>
                </ul>
            </div>
            <div class="row">
                <?php tpl_license('button') /* content license, parameters: img=*badge|button|0, imgonly=*0|1, return=*0|1 */ ?>
            </div>
        </footer><!-- /footer -->

        <?php tpl_includeFile('footer.html') ?>
    </div>
    </div></div><!-- /site -->

    <div class="no"><?php tpl_indexerWebBug() /* provide DokuWiki housekeeping, required in all templates */ ?></div>
    <!--[if ( IE 6 | IE 7 | IE 8 ) ]></div><![endif]-->

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php print DOKU_TPL; ?>/js/jquery-1.9.1.min.js" type="text/javascript"><\/script>')</script>
    <script type="text/javascript">
        var jQNew = $.noConflict(true);
    </script>
    <script src="<?php print DOKU_TPL; ?>/js/bootstrap.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>js/script.js" type="text/javascript"></script>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        var _gaq=[['_setAccount','<?php echo tpl_getConf('google_analytics'); ?>'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src='//www.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
</body>
</html>
