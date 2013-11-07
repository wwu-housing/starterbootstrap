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
        <?php echo hsc(tpl_img_getTag('IPTC.Headline',$IMG))?>
        [<?php echo strip_tags($conf['title'])?>]
    </title>
    <?php @require_once(dirname(__FILE__).'/head-css.php'); ?>
</head>
<body>
    <div id="dokuwiki__detail" class="dokuwiki container">
        <div class="row"><?php html_msgarea() ?></div>

        <?php if($ERROR){ print '<div class="row">'.$ERROR.'</div>'; }else{ ?>
        <h1><?php echo hsc(tpl_img_getTag('IPTC.Headline',$IMG))?></h1>
            <div class="content row">
                <div class="col-sm-9">
                    <?php tpl_img(900,700); /* parameters: maximum width, maximum height (and more) */ ?>
                </div>

                <div class="img_detail col-sm-3"><div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><?php print nl2br(hsc(tpl_img_getTag('simple.title'))); ?></h3>
                    </div>

                    <div class="details panel-body">
                        <p><?php
                            $config_files = getConfigFiles('mediameta');
                            foreach ($config_files as $config_file) {
                                if(@file_exists($config_file)) {
                                    include($config_file);
                                }
                            }

                            foreach($fields as $key => $tag){
                                $t = array();
                                if (!empty($tag[0])) {
                                    $t = array($tag[0]);
                                }
                                if(is_array($tag[3])) {
                                    $t = array_merge($t,$tag[3]);
                                }
                                $value = tpl_img_getTag($t);
                                if ($value) {
                                    echo '<span class="item-label "'.$lang[$tag[1]].'">'.$lang[$tag[1]].':</span> <b>';
                                    if ($tag[2] == 'date') {
                                        echo dformat($value);
                                    } else if ($tag[1] == 'img_width' || $tag[1] == 'img_height') {
                                        echo hsc($value);
                                        echo 'px';
                                    } else {
                                        echo hsc($value);
                                    }
                                    echo '</b><br />';
                                }
                            }
                        ?></p>
                    </div>
                    <?php //Comment in for Debug// dbg(tpl_img_getTag('Simple.Raw'));?>
                </div></div>
            </div><!-- /.content -->
            <div class="btn-group">
                <a class="btn btn-default" href="<?php print DOKU_REL . 'doku.php/' . $ID; ?>" class="btn">&larr; <?php print $lang['img_backto'] . ' ' . $ID?></a>
                <?php
                    $imgNS = getNS($IMG);
                    $authNS = auth_quickaclcheck("$imgNS:*");
                    if (($authNS >= AUTH_UPLOAD) && function_exists('media_managerURL')) {
                        $mmURL = media_managerURL(array('ns' => $imgNS, 'image' => $IMG));
                        echo '<a class="btn btn-default" href="'.$mmURL.'">'.$lang['img_manager'].'</a>';
                    }
                ?>
            </div>
        <?php } ?>
    </div>

    <?php @require_once(dirname(__FILE__).'/tail-js.php'); ?>
</body>
</html>

