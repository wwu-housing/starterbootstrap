<?php
/* This entire page is adapted from the indexmenu2 plugin
 * https://www.dokuwiki.org/plugin:indexmenu2 */

function indexmenu_search_index(&$data, $base, $file, $type, $lvl, $opts) {
    global $conf;
    $ret = true;

    $item = array();
    if ($type == 'f' && !preg_match('#\.txt$#', $file)) {
        // don't add
        return false;
    }

    // get page id by filename
    $id = pathID($file);

    // check hiddens
    if ($type=='f' && isHiddenPage($id)) {
        return false;
    }

    //  bugfix for the
    //  /ns/
    //  /<ns>.txt
    //  case, need to force the 'directory' type
    if ($type == 'f' && file_exists(dirname(wikiFN($id.":".noNS($id))))) $type = 'd';

    // page target id = global id
    $target = $id;
    if ($type == 'd') {
        // this will check 3 kinds of headpage:
        // 1. /<ns>/<ns>.txt
        // 2. /<ns>/
        //    /<ns>.txt
        // 3. /<ns>/
        //    /<ns>/<start_page>
        $nsa = array( $id.":".noNS($id),
            $id,
            $id.":".$conf['start']
        );
        $nspage = false;
        foreach ($nsa as $nsp) {
            if (@file_exists(wikiFN($nsp)) && auth_quickaclcheck($nsp) >= AUTH_READ) {
                $nspage = $nsp;
                break;
            }
        }
        //headpage exists
        if ($nspage) {
            $target = $nspage;
        } else {
            // open namespace index, if headpage does not exists
            $target = $target.':';
        }
    }

    $data[]=array(
        'id'     => $id
        ,'date'   => @filectime(wikiFN($target))
        ,'type'   => $type
        ,'target' => $target  // id to be used in the menu
        ,'title'  => ($conf['useheading'] && ($title = p_get_first_heading($target)))?$title:$id // NS title
        ,'level'  => $lvl );
    if (substr_count($id, ":") > 2) $ret = 0;
    return $ret;
}

function array2tree($source_arr, $parent_id, $key_children='child_nodes', $key_id='id', $key_parent_id='parent_id') {
    $tree = array();
    if (empty($source_arr))
        return $tree;
    _array2treer($source_arr, $tree, $parent_id, $parent_id, $key_children, $key_id, $key_parent_id);
    return $tree;
}
function _array2treer($source_arr, &$_this, $parent_id, $_this_id, $key_children, $key_id, $key_parent_id) {
    // populate current children
    foreach ($source_arr as $value)
        if ($value[$key_parent_id]===$_this_id)
            $_this[$key_children][$value[$key_id]]=$value;
    if (isset($_this[$key_children])) {
        // populate children of the current children
        foreach ($_this[$key_children] as $value)
            _array2treer($source_arr, $_this[$key_children][$value[$key_id]], $parent_id, $value[$key_id], $key_children, $key_id, $key_parent_id);
        // make the tree root look pretty (more convenient to use such tree)
        if ($_this_id===$parent_id)
            $_this=$_this[$key_children];
    }
}

function _html_buildlist(&$data) {
    $ret = array();

    foreach ($data as $item) {
        $ret[] = "<li" . (($item['type'] == 'd') ? (" class=\"dir\" ") : '') . ">";
        $ret[] = preg_replace("#^<span[^>]+>(.+)</span>$#i", "$1", html_wikilink(":" . $item['target'], null));
        // append child nodes, if exists
        if ($item['type']=='d') { //isset($item['child_nodes'])) {
            if (isset($item['child_nodes'])) {
                $ret[] = "<ul>";
                // static method used to be able to make menu w/o make class object
                $ret[] = _html_buildlist($item['child_nodes']);
                $ret[] = "</ul>";
            }
        }
        $ret[] = "</li>";
    }
    return join("\n",$ret);
}

$data = array();

search($data, $conf['datadir'], "indexmenu_search_index", $opts, "/".utf8_encodeFN(str_replace(':','/',$ns)), 2);

foreach ($data as $k => $v) {
    $data[$k]['parent_id'] = (string)getNS($v['id']);
}

$data = array2tree($data,'');

$data = "<ul class=\"generated-index\">" . _html_buildlist($data) . "</ul>";
echo $data;

?>
