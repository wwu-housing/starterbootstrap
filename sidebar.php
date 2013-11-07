<?php
/**
 * Table of content-function that will
 * create a hierarchical TOC for the site (by namespace)
 * and highlight the current page
 * The startpage if it exists, will always
 * be shown first in the menu
 */

function tpl_processStartPage($ns,$context) {
    // Check if a start page exists and add it first
    global $conf;
    $pageExists = false;
    $startPageName = $conf['start'];
    if ($ns == "") {
        $startPageID = $startPageName;
    } else {
        $startPageID = $ns . ":" . $startPageName;
    }

    $startPagePath = $startPageID;

    resolve_pageid($ns, $startPagePath,$pageExists);

    if ($pageExists) {
        // Check if page is visible

        $perm = auth_quickaclcheck($startPageID);
        if ($perm > 0) {

            // Determine Page Title from first heading
            $firstHeading = p_get_first_heading($startPageID);

            if ($conf['useheading'] && !empty($firstHeading)) {
                $linkName = $firstHeading;
            } else {
                $linkName = $startPageName;
            }
            // echo "<b>" . $conf['useheading'] ."</b>";
            tpl_pageLinkCreate($startPageID, '<i class="icon-home"></i>'.$linkName, "tpl_processStartPage:$context");
        }

    }
}
function tpl_pageLinkCreate($fileToLinkID, $linkName, $calledFrom) {
        global $ID;

        echo "<li";
        if ($fileToLinkID == $ID) {
            // highlight current page
            echo ' class="active"';
        }
        echo ">";
        if ($_REQUEST["do"] == "admin" && $_REQUEST["page"] == "acl") {
            $path = wl($fileToLinkID, "do=admin&amp;page=acl");
        } else {
            $path = wl($fileToLinkID);
        }
        // echo "<em>$fileToLinkID, $linkName, $calledFrom</em>";
        tpl_link($path,$linkName);
}
function tpl_list_folder($dataList, $findAndProcessStartpage) {
    global $conf;
    global $ID;
    global $INFO;

    require_once(DOKU_INC.'inc/auth.php');

    $currentLevel = 1;

    $pathinfo = pathinfo($_SERVER['REQUEST_URI']);
    $url = $pathinfo['dirname'];

    echo "<div class='well well-nav'><ul class=\"nav nav-list\">\n";

    tpl_processStartPage("","tof");

    for($i=0; $i<count($dataList); $i++) {

        // Check if page is visible
        if ($dataList[$i]["type"] == "d") {
            $perm = auth_quickaclcheck($dataList[$i]["id"].":*");
        } else {
            $perm = auth_quickaclcheck($dataList[$i]["id"]);
        }
        // process only visible pages
        if ($perm > 0) {

            // don't show start page in normal order
            if (noNS($dataList[$i]["id"]) != $conf['start']) {

                 // FIXME not sure if this is actually needed
                 // Could we not use noNS($dataList[$i]["id"]) instead???
                 $pageFileName = split(":", $dataList[$i]["id"]);
                 $pageFileName = $pageFileName[count($pageFileName) - 1];
                 $pageFileName = str_replace("_", " ", $pageFileName);

                    // Determine Page Title from first heading
                    $firstHeading = p_get_first_heading($dataList[$i]["id"]);
                    if ($conf['useheading'] && $dataList[$i]["type"] == "f" && !empty($firstHeading)) {
                        $linkName = $firstHeading;
                    } else {
                        $linkName = $pageFileName;
                    }

                    // Adjust the level. If level of page is higher than current level
                    // close list-item and list
                    // FIXME: Why is this needed when the same happens down below?
                    if ($currentLevel > $dataList[$i]["level"]) {
                        echo str_repeat("</ul></li>\n", $currentLevel - $dataList[$i]["level"]);
                        $currentLevel = $dataList[$i]["level"];
                    }

                    // if entry is a folder
                    if ($dataList[$i]["type"] == "d") {

                        if ($dataList[$i]["open"]) {
                            $folder_status = 'open';
                        } else {
                            $folder_status = 'close';
                        }
                        echo '<li class="folder-status-' . $folder_status . '">';

                        if ($_REQUEST["do"] == "admin" && $_REQUEST["page"] == "acl") {
                            $path = wl($dataList[$i]["id"].":".$conf['start'], "do=admin&amp;page=acl");
                        } else {
                            $path = wl($dataList[$i]["id"].":".$conf['start']);
                        }
                        // echo "<p>Path: $path, LinkName: $linkName</p>";
                        tpl_link($path, '<i class="icon-folder-' . $folder_status . '"></i>' . $linkName);
                    } else {
                        // entry is a file
                        // echo "<p>Path: $path, LinkName: $linkName, id: ". $dataList[$i]["id"] . "</p>";
                        tpl_pageLinkCreate ($dataList[$i]["id"], '<i class="icon-file"></i>' . $linkName, "direkt:tpl_list_folder");
                    }

                    if ($dataList[$i+1]["level"] == $currentLevel) {
                        // current folder (just close list-item)
                        echo "</li>\n";
                    } else if ($dataList[$i+1]["level"] > $currentLevel) {
                        // new sub-folder (start new sub-list)
                        echo '<ul class="nav nav-list">';
                        // Check if a start page exists and add it first

                        tpl_processStartPage($dataList[$i]["id"],"");
                    } else if ($dataList[$i+1]["level"] < $currentLevel) {
                        // end of sub-folder (close open sublists)
                        if (!empty($dataList[$i+1]["level"])) {
                            echo str_repeat("</ul></li>\n", $currentLevel - $dataList[$i+1]["level"]);
                        }
                    }
                    $currentLevel = $dataList[$i+1]["level"];
            }
        }
    }
    echo "</ul></div>\n";
}
    global $ID;
    global $ACT;
    global $conf;


    $folder = getNS($ID);

    require_once(DOKU_INC.'inc/search.php');
    require_once(DOKU_INC.'inc/html.php');

    $ns = cleanID($ID);
    if (empty($ns)) {
        $ns = dirname(str_replace(':','/',$ID));
        if ($ns == '.') $ns ='';
    }
    $ns = utf8_encodeFN(str_replace(':','/',$ns));

    $list = array();
    search($list,$conf['datadir'],'search_index',array('ns' => $ns));

    tpl_list_folder($list,true);
?>
