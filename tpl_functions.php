<?php
/**
 * Template Functions
 *
 * This file provides template specific custom functions that are
 * not provided by the DokuWiki core.
 * It is common practice to start each function with an underscore
 * to make sure it won't interfere with future core functions.
 */

// must be run from within DokuWiki
if (!defined('DOKU_INC')) die();

/**
 * Create link/button to register page
 * @deprecated DW versions > 2011-02-20 can use the core function tpl_action('register')
 *
 * @author Anika Henke <anika@selfthinker.org>
 */
function _tpl_register($link=0, $wrapper=0) {
    global $conf;
    global $lang;
    global $ID;
    $lang_register = !empty($lang['btn_register']) ? $lang['btn_register'] : $lang['register'];

    if ($_SERVER['REMOTE_USER'] || !$conf['useacl'] || !actionOK('register')) return;

    if ($wrapper) echo "<$wrapper>";

    if ($link)
        tpl_link(wl($ID, 'do=register'), $lang_register, 'class="action register" rel="nofollow"');
    else
        echo html_btn('register', $ID, '', array('do'=>'register'), 'get', 0, $lang_register);

    if ($wrapper) echo "</$wrapper>";
}

/**
 * Wrapper around custom template actions
 *
 * @author Anika Henke <anika@selfthinker.org>
 */
function _tpl_action($type, $link=0, $wrapper=0) {
    switch ($type) {
        case 'discussion':
            if (tpl_getConf('discussionPage')) {
                _tpl_discussion(tpl_getConf('discussionPage'), tpl_getLang('discussion'), tpl_getLang('back_to_article'), $link, $wrapper);
            }
            break;
        case 'userpage':
            if (tpl_getConf('userPage')) {
                _tpl_userpage(tpl_getConf('userPage'), tpl_getLang('userpage'), $link, $wrapper);
            }
            break;
        case 'register': // deprecated
            _tpl_register($link, $wrapper);
            break;
    }
}



/* fallbacks for things missing in older DokuWiki versions
********************************************************************/


/* if newer settings exist in the core, use them, otherwise fall back to template settings */

if (!isset($conf['tagline'])) {
    $conf['tagline'] = tpl_getConf('tagline');
}

if (!isset($conf['sidebar'])) {
    $conf['sidebar'] = tpl_getConf('sidebarID');
}

/* these $lang strings are now in the core */

if (!isset($lang['user_tools'])) {
    $lang['user_tools'] = tpl_getLang('user_tools');
}
if (!isset($lang['site_tools'])) {
    $lang['site_tools'] = tpl_getLang('site_tools');
}
if (!isset($lang['page_tools'])) {
    $lang['page_tools'] = tpl_getLang('page_tools');
}
if (!isset($lang['skip_to_content'])) {
    $lang['skip_to_content'] = tpl_getLang('skip_to_content');
}


/**
 * copied from core (available since Adora Belle)
 */
if (!function_exists('tpl_getMediaFile')) {
    function tpl_getMediaFile($search, $abs = false, &$imginfo = null) {
        $img     = '';
        $file    = '';
        $ismedia = false;
        // loop through candidates until a match was found:
        foreach($search as $img) {
            if(substr($img, 0, 1) == ':') {
                $file    = mediaFN($img);
                $ismedia = true;
            } else {
                $file    = tpl_incdir().$img;
                $ismedia = false;
            }

            if(file_exists($file)) break;
        }

        // fetch image data if requested
        if(!is_null($imginfo)) {
            $imginfo = getimagesize($file);
        }

        // build URL
        if($ismedia) {
            $url = ml($img, '', true, '', $abs);
        } else {
            $url = tpl_basedir().$img;
            if($abs) $url = DOKU_URL.substr($url, strlen(DOKU_REL));
        }

        return $url;
    }
}

/**
 * copied from core (available since Angua)
 */
if (!function_exists('tpl_favicon')) {
    function tpl_favicon($types = array('favicon')) {

        $return = '';

        foreach($types as $type) {
            switch($type) {
                case 'favicon':
                    $look = array(':wiki:favicon.ico', ':favicon.ico', 'images/favicon.ico');
                    $return .= '<link rel="shortcut icon" href="'.tpl_getMediaFile($look).'" />'.NL;
                    break;
                case 'mobile':
                    $look = array(':wiki:apple-touch-icon.png', ':apple-touch-icon.png', 'images/apple-touch-icon.png');
                    $return .= '<link rel="apple-touch-icon" href="'.tpl_getMediaFile($look).'" />'.NL;
                    break;
                case 'generic':
                    // ideal world solution, which doesn't work in any browser yet
                    $look = array(':wiki:favicon.svg', ':favicon.svg', 'images/favicon.svg');
                    $return .= '<link rel="icon" href="'.tpl_getMediaFile($look).'" type="image/svg+xml" />'.NL;
                    break;
            }
        }

        return $return;
    }
}

/**
 * copied from core (available since Adora Belle)
 */
if (!function_exists('tpl_includeFile')) {
    function tpl_includeFile($file) {
        global $config_cascade;
        foreach(array('protected', 'local', 'default') as $config_group) {
            if(empty($config_cascade['main'][$config_group])) continue;
            foreach($config_cascade['main'][$config_group] as $conf_file) {
                $dir = dirname($conf_file);
                if(file_exists("$dir/$file")) {
                    include("$dir/$file");
                    return;
                }
            }
        }

        // still here? try the template dir
        $file = tpl_incdir().$file;
        if(file_exists($file)) {
            include($file);
        }
    }
}

/**
 * copied from core (available since Adora Belle)
 */
if (!function_exists('tpl_incdir')) {
    function tpl_incdir() {
        global $conf;
        return DOKU_INC.'lib/tpl/'.$conf['template'].'/';
    }
}


/**
 * Print the search form
 *
 * If the first parameter is given a div with the ID 'qsearch_out' will
 * be added which instructs the ajax pagequicksearch to kick in and place
 * its output into this div. The second parameter controls the propritary
 * attribute autocomplete. If set to false this attribute will be set with an
 * value of "off" to instruct the browser to disable it's own built in
 * autocompletion feature (MSIE and Firefox)
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 * @param bool $ajax
 * @param bool $autocomplete
 * @return bool
 */
function _tpl_searchform($ajax = true, $autocomplete = true) {
    global $lang;
    global $ACT;
    global $QUERY;

    // don't print the search form if search action has been disabled
    if(!actionOK('search')) return false;

    print '<form action="'.wl().'" accept-charset="utf-8" class="navbar-form navbar-right" id="dw__search" method="get" role="search">';
    print '<input type="hidden" name="do" value="search" />';
    print '<div class="form-group">';
    print '<input type="text" ';
    if($ACT == 'search') print 'value="'.htmlspecialchars($QUERY).'" ';
    print ' autocomplete="off" ';
    print 'id="qsearch__in" accesskey="f" name="id" class="form-control col-lg-3" title="[F]" placeholder="' . $lang['btn_search'] . '" /> ';
    print '</div>';
    if($ajax) print '<div id="qsearch__out" class="ajax_qsearch"></div>';
    print '</form>';
    return true;
}

/* table of contents */
function _tpl_toc($return = false) {
    global $TOC;
    global $ACT;
    global $ID;
    global $REV;
    global $INFO;
    global $conf;
    global $INPUT;
    $toc = array();

    if(is_array($TOC)) {
        // if a TOC was prepared in global scope, always use it
        $toc = $TOC;
    } elseif(($ACT == 'show' || substr($ACT, 0, 6) == 'export') && !$REV && $INFO['exists']) {
        // get TOC from metadata, render if neccessary
        $meta = p_get_metadata($ID, false, METADATA_RENDER_USING_CACHE);
        if(isset($meta['internal']['toc'])) {
            $tocok = $meta['internal']['toc'];
        } else {
            $tocok = true;
        }
        $toc = $meta['description']['tableofcontents'];
        if(!$tocok || !is_array($toc) || !$conf['tocminheads'] || count($toc) < $conf['tocminheads']) {
            $toc = array();
        }
    } elseif($ACT == 'admin') {
        // try to load admin plugin TOC FIXME: duplicates code from tpl_admin
        $plugin = null;
        $class  = $INPUT->str('page');
        if(!empty($class)) {
            $pluginlist = plugin_list('admin');
            if(in_array($class, $pluginlist)) {
                // attempt to load the plugin
                /** @var $plugin DokuWiki_Admin_Plugin */
                $plugin =& plugin_load('admin', $class);
            }
        }
        if( ($plugin !== null) && (!$plugin->forAdminOnly() || $INFO['isadmin']) ) {
            $toc = $plugin->getTOC();
            $TOC = $toc; // avoid later rebuild
        }
    }

    trigger_event('TPL_TOC_RENDER', $toc, null, false);
    $html = bootstrap_html_TOC($toc);
    if($return) return $html;
    echo $html;
    return '';
}
/**
 * Return the TOC rendered to XHTML
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 */
function bootstrap_html_TOC($toc){
    if(!count($toc)) return '';
    global $lang;
    $out  = '<!-- TOC START -->'.DOKU_LF;
    $out .= '<div id="dw_toc" class="panel panel-default pull-right col-sm-4 col-md-3 col-xs-12">'.DOKU_LF;
    $out .= '<div class="panel-heading"><h3 class="panel-title" data-toggle="collapse" data-target="#toc_contents">';
    $out .= $lang['toc'];
    $out .= ' <b class="caret"></b></h3></div>'.DOKU_LF;
    $out .= '<div id="toc_contents" class="collapse in"><div class="panel-body">';
    $out .= bootstrap_toc_html_buildlist($toc,'','html_list_toc');
    $out .= '</div></div>';
    $out .= '</div>'.DOKU_LF;
    $out .= '<!-- TOC END -->'.DOKU_LF;
    return $out;
}
function bootstrap_toc_html_buildlist($data,$class,$func,$lifunc='html_li_default',$forcewrapper=false){
    if (count($data) === 0) {
        return '';
    }

    $start_level = $data[0]['level'];
    $level = $start_level;
    $ret   = '';
    $open  = 0;

    foreach ($data as $item){
        if( $item['level'] > $level ){
            //open new list
            for($i=0; $i<($item['level'] - $level); $i++){
                if ($i) $ret .= '<li class="">';
                $ret .= "\n<ul class=\"$class\">\n";
                $open++;
            }
            $level = $item['level'];

        }elseif( $item['level'] < $level ){
            //close last item
            $ret .= "</li>\n";
            while( $level > $item['level'] && $open > 0 ){
                //close higher lists
                $ret .= "</ul>\n</li>\n";
                $level--;
                $open--;
            }
        } elseif ($ret !== '') {
            //close previous item
            $ret .= "</li>\n";
        }

        //print item
        $ret .= call_user_func($lifunc,$item);

        $ret .= call_user_func($func,$item);
    }

    //close remaining items and lists
    $ret .= "</li>\n";
    while($open-- > 0) {
        $ret .= "</ul></li>\n";
    }

    if ($forcewrapper || $start_level < 2) {
        // Trigger building a wrapper ul if the first level is
        // 0 (we have a root object) or 1 (just the root content)
        $ret = "\n<ul class=\"$class\">\n".$ret."</ul>\n";
    }

    return $ret;
}

function _tpl_breadcrumbs() {
    global $lang;
    global $conf;

    // check if enabled
    if (!$conf['breadcrumbs']) return false;

    $crumbs = breadcrumbs();

    $last = count($crumbs);
    if ($last > 1) {
        print '<!-- BREADCRUMBS --><div class="row" id="breadcrumbs"><div class="col-lg-12"><ul class="breadcrumb">'.$lang['breadcrumb'].':&nbsp; ';
        $i = 0;
        foreach ($crumbs as $id => $name) {
            $i++;
            if ($i == $last - 1) {
                print '<li>';
                tpl_pagelink(':'.$id, hsc($name), 'title="' . $id . '"');
            } else if ($i != $last) {
                print '<li>';
                tpl_pagelink(':'.$id, hsc($name), 'title="' . $id . '"');
            }
            print '</li> ';
        }
        print '</ul></div></div>';
    }
    return true;
}

function bootstrap_tpl_youarehere() {
    global $lang;
    global $ID;
    global $conf;

    // check if enabled
    if (!$conf['youarehere']) return false;

    $parts = explode(':', $ID);
    $count = count($parts);

    print '<ul class="breadcrumb">' . $lang['youarehere'] . ':&nbsp; ';

    // always print the start page
    echo '<li class="home">';
    tpl_pagelink(':'.$conf['start']);
    echo '</li> ';

    // print intermediate namespace links
    $part = '';
    for ($i = 0; $i < $count - 1; $i++) {
        $part .= $parts[$i].':';
        $page = $part;
        if ($page == $conf['start']) continue; // skip startpage
        echo '<li>';
        tpl_pagelink($page);
        echo '</li> ';
    }

    // print current page, skipping start page, skipping for namespace index
    resolve_pageid('', $page, $exists);
    if (isset($page) && $page == $part.$parts[$i]) return true;
    $page = $part.$parts[$i];
    if ($page == $conf['start']) return true;
    echo '<li>';
    tpl_pagelink($page);
    echo '</li> ';
    print '</ul>';
    return true;
}

function bootstrap_tpl_userinfo() {
    global $lang;
    global $INFO;
    if(isset($_SERVER['REMOTE_USER'])) {
        print 'you are:'.hsc($INFO['userinfo']['name']);
        return true;
    }
    return false;
}


/**
 * prints the namespace tree in the mediamanger popup
 *
 * Only allowed in mediamanager.php
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 */
function bootstrap_tpl_mediaTree() {
    global $NS;
    ptln('<div id="media__tree" class="well well-sm">');
    bootstrap_media_nstree($NS);
    ptln('</div>');
}
/**
 * Build a tree outline of available media namespaces
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 */
function bootstrap_media_nstree($ns){
    global $conf;
    global $lang;

    // currently selected namespace
    $ns  = cleanID($ns);
    if(empty($ns)){
        global $ID;
        $ns = (string)getNS($ID);
    }

    $ns_dir  = utf8_encodeFN(str_replace(':','/',$ns));

    $data = array();
    search($data,$conf['mediadir'],'search_index',array('ns' => $ns_dir, 'nofiles' => true));

    // wrap a list with the root level around the other namespaces
    array_unshift($data, array('level' => 0, 'id' => '', 'open' =>'true', 'label' => '['.$lang['mediaroot'].']'));

    // insert the current ns into the hierarchy if it isn't already part of it
    $ns_parts = explode(':', $ns);
    $tmp_ns = '';
    $pos = 0;
    foreach ($ns_parts as $level => $part) {
        if ($tmp_ns) $tmp_ns .= ':'.$part;
        else $tmp_ns = $part;

        // find the namespace parts or insert them
        while ($data[$pos]['id'] != $tmp_ns) {
            if ($pos >= count($data) || ($data[$pos]['level'] <= $level+1 && strnatcmp(utf8_encodeFN($data[$pos]['id']), utf8_encodeFN($tmp_ns)) > 0)) {
                array_splice($data, $pos, 0, array(array('level' => $level+1, 'id' => $tmp_ns, 'open' => 'true')));
                break;
            }
            ++$pos;
        }
    }

    echo bootstrap_toc_html_buildlist($data,'','bootstrap_media_nstree_item','bootstrap_media_nstree_li');
}
/**
 * Userfunction for html_buildlist
 *
 * Prints a media namespace tree item
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 */
function bootstrap_media_nstree_item($item){
    global $INPUT;
    $pos   = strrpos($item['id'], ':');
    $label = substr($item['id'], $pos > 0 ? $pos + 1 : 0);
    if(!$item['label']) $item['label'] = $label;


    $class = 'level'.$item['level'];
    // TODO: only deliver an image if it actually has a subtree...
    if($item['open']){
        $class .= ' open';
        $icon  = '<i class="glyphicon glyphicon-minus"></i> ';
        $alt   = 'âˆ’';
    } else {
        $class .= ' closed';
        $icon  = '<i class="glyphicon glyphicon-plus"></i> ';
        $alt   = '+';
    }
    $ret = '<li class="'.$class.'">';

    if (!($INPUT->str('do') == 'media'))
    $ret .= '<a href="'.DOKU_BASE.'lib/exe/mediamanager.php?ns='.idfilter($item['id']).'" class="idx_dir">';
    else $ret .= '<a href="'.media_managerURL(array('ns' => idfilter($item['id'], false), 'tab_files' => 'files')).'>';
    $ret .= $icon;
    $ret .= $item['label'];
    $ret .= '</a>';
    return $ret;
}
function bootstrap_media_nstree_li($item){
}

/**
 * Get the sidebar html. Get cached sidebar if $cache param is true.
 *
 * @author Cameron Little <cameron@camlittle.com>
 */
function bootstrap_tpl_get_sidebar($pageid, $cache) {
    global $TOC;
    $oldtoc = $TOC;
    $html = '';
    $rev = '';
    $file = wikiFN($pageid, $rev);

    if($cache && !$rev){
        if(@file_exists($file)) {
            $html = p_cached_output($file,'xhtml',$pageid);
        }
    }else{
        if(@file_exists($file)) {
            $html = p_render('xhtml',p_get_instructions(io_readWikiPage($file,$pageid,$rev)),$info); //no caching on old revisions
        }
    }

    return $html;
}
