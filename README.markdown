Starter Bootstrap Dokuwiki Template
======

[Bootstrap](http://twitter.github.io/bootstrap/) [Dokuwiki](https://www.dokuwiki.org/dokuwiki) template
based on the [starter template](https://www.dokuwiki.org/template:starter).

This template is designed to be responsive on all modern devices, accessable, and good looking.
It aims to replace most of the default Dokuwiki styling with equivalents from available Bootstrap styles.

Created by [Cameron Little](http://camlittle.com) for [WWU ResTek](http://restek.wwu.edu).

Features
----

  * Insert table toolbar button.
  * Viewing, editing, and detail pages styled with bootstrap.
  * Built in wiki structure (navigation) sidebar.
  * Supports collapsible dokuwiki sidebar menu.
  * Collapsible table of contents.

Javascript
----

Since dokuwiki uses jQuery 1.6 and bootstrap uses jQuery 1.9, this theme has to use both. ``jQuery`` should be used
instead of ``$`` when referencing jQuery 1.6 and ``jQNew`` should be used when referencing 1.9. This is enabled using
``$.noConflict(true)``.

Installation
----

Install as you would a normal dokuwiki template, but if you want your Config page to be pretty, you'll need to do delete the `./lib/plugins/config/style.css` file and move the `core_files/admin.php` file into your `./lib/plugins/config/` directory.
