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
    <title><?php tpl_pagetitle() ?> [<?php echo strip_tags($conf['title']) ?>]</title>
    <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>

    <script src="<?php print DOKU_TPL; ?>/js/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>/js/jquery-ui.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>/js/bootstrap.js" type="text/javascript"></script>
    <script src="<?php print DOKU_TPL; ?>/js/bootstrap-colorpicker.js" type="text/javascript"></script>
    <?php tpl_metaheaders() ?>
    <script src="<?php print DOKU_TPL; ?>js/script.js" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <?php echo tpl_favicon(array('favicon', 'mobile')) ?>
    <?php tpl_includeFile('meta.html') ?>
    <!-- dokuwiki's php css compressor doesn't play nice with media queries -->
    <link href="<?php print DOKU_TPL; ?>css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="<?php print DOKU_TPL; ?>css/restek.css" rel="stylesheet">
</head>

<body data-spy="scroll" data-target="#dw_toc">
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
        <div class="navbar-inner">
            <div class="container-fluid">
                <?php tpl_includeFile('header.html') ?>

                <!-- ********** HEADER ********** -->

                <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>

                <?php tpl_link(wl(),$conf['title'],'accesskey="h" title="[H]" class="brand"') ?>

                <div class="nav-collapse collapse">
                    <ul class="nav pull-right">
                         <li class="divider-vertical"></li>
                         <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class="nav-header"><span class="a11y"><?php echo $lang['site_tools'] ?></span>Site Tools</li>
                                <!-- USER TOOLS -->
                                <?php if ($conf['useacl'] && $showTools): ?>
                                <span class="a11y"><?php echo $lang['user_tools'] ?></span>
                                <?php
                                    if ($ACT == 'recent') { tpl_action('recent', 1, 'li class="active"'); } else { tpl_action('recent', 1, 'li'); };
                                    if ($ACT == 'media') { tpl_action('media', 1, 'li class="active"'); } else { tpl_action('media', 1, 'li'); };
                                    if ($ACT == 'index') { tpl_action('index', 1, 'li class="active"'); } else { tpl_action('index', 1, 'li'); };
                                ?>
                                <?php endif ?>
                                <?php if ($showTools): ?>
                                <li class="nav-header"><span class="a11y"><?php echo $lang['page_tools'] ?></span>User Tools</li>
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
    </div>

    <div class="container-fluid not-header">

        <div class="row-fluid">
            <?php html_msgarea() /* occasional error and info messages on top of the page */ ?>
        </div>

        <ul class="nav nav-tabs nav-stacked visible-phone">
            <li><a href="#dokuwiki__content" class="skip-to-content"><?php echo $lang['skip_to_content'] ?></a></li>
        </ul>

        <div class="row-fluid">
            <!-- BREADCRUMBS -->
            <?php if($conf['breadcrumbs']) _tpl_breadcrumbs(); ?>
        </div>

         <div class="wrapper row-fluid"><!-- PAGE ACTIONS -->

            <!-- ********** ASIDE ********** -->
            <?php if ($showSidebar): ?>
                <div id="dokuwiki__aside" class="span3">
                    <?php tpl_includeFile('sidebarheader.html') ?>
                    <?php tpl_include_page($conf['sidebar'], 1, 1) /* includes the nearest sidebar page */ ?>
                    <?php tpl_includeFile('sidebarfooter.html') ?>
                    <?php include('sidebar.php'); ?>
                </div><!-- /aside -->
            <?php endif; ?>

            <!-- ********** CONTENT ********** -->
            <div id="dokuwiki__content" class="<?php if ($showSidebar): ?>span9<?php else : ?>span12<?php endif; ?>">

                <?php if($conf['youarehere']){ ?>
                    <div class="row-fluid">
                        <?php bootstrap_tpl_youarehere() ?>
                    </div>
                <?php } ?>

                <?php tpl_flush() /* flush the output buffer */ ?>
                <?php tpl_includeFile('pageheader.html') ?>

                <div class="page row-fluid">
                    <!-- wikipage start -->
                    <?php _tpl_toc(); ?>
                    <?php tpl_content(false) /* the main content */ ?>
                    <!-- wikipage stop -->
                </div>

                <?php tpl_includeFile('pagefooter.html') ?>
            </div><!-- /content -->

            <hr class="a11y" />
        </div><!-- /wrapper -->

        <!-- ********** FOOTER ********** -->
        <div id="dokuwiki__footer">
            <div class="row-fluid">
                <ul class="doc breadcrumb well pull-right">
                    <li><?php tpl_action('top', 1, ''); ?><span class="divider">&#8226;</span></li>
                    <li><?php tpl_pageinfo() /* 'Last modified' etc */ ?></li>
                </ul>
            </div>
            <div class="row-fluid">
                <?php tpl_license('button') /* content license, parameters: img=*badge|button|0, imgonly=*0|1, return=*0|1 */ ?>
            </div>
        </div><!-- /footer -->

        <?php tpl_includeFile('footer.html') ?>
    </div>
    </div></div><!-- /site -->

    <div class="no"><?php tpl_indexerWebBug() /* provide DokuWiki housekeeping, required in all templates */ ?></div>
    <!--[if ( IE 6 | IE 7 | IE 8 ) ]></div><![endif]-->
</body>
</html>
