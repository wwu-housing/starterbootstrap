/* ===================================================
 * bootstrap-transition.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  jQuery.function () {

    jQuery.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        jQuery.el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var jQuery.his = jQuery.this)
      , selector = jQuery.his.attr('data-target')
      , jQuery.arent

    if (!selector) {
      selector = jQuery.his.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*jQuery./, '') //strip for ie7
    }

    jQuery.arent = jQuery.selector)

    e && e.preventDefault()

    jQuery.arent.length || (jQuery.arent = jQuery.his.hasClass('alert') ? jQuery.his : jQuery.his.parent())

    jQuery.arent.trigger(e = jQuery.Event('close'))

    if (e.isDefaultPrevented()) return

    jQuery.arent.removeClass('in')

    function removeElement() {
      jQuery.arent
        .trigger('closed')
        .remove()
    }

    jQuery.support.transition && jQuery.arent.hasClass('fade') ?
      jQuery.arent.on(jQuery.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = jQuery.fn.alert

  jQuery.fn.alert = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('alert')
      if (!data) jQuery.his.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call(jQuery.his)
    })
  }

  jQuery.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  jQuery.fn.alert.noConflict = function () {
    jQuery.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  jQuery.document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.jQuery.lement = jQuery.element)
    this.options = jQuery.extend({}, jQuery.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , jQuery.l = this.jQuery.lement
      , data = jQuery.l.data()
      , val = jQuery.l.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || jQuery.l.data('resetText', jQuery.l[val]())

    jQuery.l[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        jQuery.l.addClass(d).attr(d, d) :
        jQuery.l.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var jQuery.arent = this.jQuery.lement.closest('[data-toggle="buttons-radio"]')

    jQuery.arent && jQuery.arent
      .find('.active')
      .removeClass('active')

    this.jQuery.lement.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = jQuery.fn.button

  jQuery.fn.button = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('button')
        , options = typeof option == 'object' && option
      if (!data) jQuery.his.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  jQuery.fn.button.defaults = {
    loadingText: 'loading...'
  }

  jQuery.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  jQuery.fn.button.noConflict = function () {
    jQuery.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  jQuery.document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var jQuery.tn = jQuery.e.target)
    if (!jQuery.tn.hasClass('btn')) jQuery.tn = jQuery.tn.closest('.btn')
    jQuery.tn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.jQuery.lement = jQuery.element)
    this.jQuery.ndicators = this.jQuery.lement.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.jQuery.lement
      .on('mouseenter', jQuery.proxy(this.pause, this))
      .on('mouseleave', jQuery.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval(jQuery.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.jQuery.ctive = this.jQuery.lement.find('.item.active')
      this.jQuery.tems = this.jQuery.ctive.parent().children()
      return this.jQuery.tems.index(this.jQuery.ctive)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.jQuery.tems.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.jQuery.lement.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', jQuery.this.jQuery.tems[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.jQuery.lement.find('.next, .prev').length && jQuery.support.transition.end) {
        this.jQuery.lement.trigger(jQuery.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var jQuery.ctive = this.jQuery.lement.find('.item.active')
        , jQuery.ext = next || jQuery.ctive[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      jQuery.ext = jQuery.ext.length ? jQuery.ext : this.jQuery.lement.find('.item')[fallback]()

      e = jQuery.Event('slide', {
        relatedTarget: jQuery.ext[0]
      , direction: direction
      })

      if (jQuery.ext.hasClass('active')) return

      if (this.jQuery.ndicators.length) {
        this.jQuery.ndicators.find('.active').removeClass('active')
        this.jQuery.lement.one('slid', function () {
          var jQuery.extIndicator = jQuery.that.jQuery.ndicators.children()[that.getActiveIndex()])
          jQuery.extIndicator && jQuery.extIndicator.addClass('active')
        })
      }

      if (jQuery.support.transition && this.jQuery.lement.hasClass('slide')) {
        this.jQuery.lement.trigger(e)
        if (e.isDefaultPrevented()) return
        jQuery.ext.addClass(type)
        jQuery.ext[0].offsetWidth // force reflow
        jQuery.ctive.addClass(direction)
        jQuery.ext.addClass(direction)
        this.jQuery.lement.one(jQuery.support.transition.end, function () {
          jQuery.ext.removeClass([type, direction].join(' ')).addClass('active')
          jQuery.ctive.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.jQuery.lement.trigger('slid') }, 0)
        })
      } else {
        this.jQuery.lement.trigger(e)
        if (e.isDefaultPrevented()) return
        jQuery.ctive.removeClass('active')
        jQuery.ext.addClass('active')
        this.sliding = false
        this.jQuery.lement.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = jQuery.fn.carousel

  jQuery.fn.carousel = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('carousel')
        , options = jQuery.extend({}, jQuery.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) jQuery.his.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  jQuery.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  jQuery.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  jQuery.fn.carousel.noConflict = function () {
    jQuery.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  jQuery.document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var jQuery.his = jQuery.this), href
      , jQuery.arget = jQuery.jQuery.his.attr('data-target') || (href = jQuery.his.attr('href')) && href.replace(/.*(?=#[^\s]+jQuery./, '')) //strip for ie7
      , options = jQuery.extend({}, jQuery.arget.data(), jQuery.his.data())
      , slideIndex

    jQuery.arget.carousel(options)

    if (slideIndex = jQuery.his.attr('data-slide-to')) {
      jQuery.arget.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.jQuery.lement = jQuery.element)
    this.options = jQuery.extend({}, jQuery.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.jQuery.arent = jQuery.this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.jQuery.lement.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.jQuery.lement.hasClass('in')) return

      dimension = this.dimension()
      scroll = jQuery.camelCase(['scroll', dimension].join('-'))
      actives = this.jQuery.arent && this.jQuery.arent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.jQuery.lement[dimension](0)
      this.transition('addClass', jQuery.Event('show'), 'shown')
      jQuery.support.transition && this.jQuery.lement[dimension](this.jQuery.lement[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.jQuery.lement.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.jQuery.lement[dimension]())
      this.transition('removeClass', jQuery.Event('hide'), 'hidden')
      this.jQuery.lement[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.jQuery.lement
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.jQuery.lement[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.jQuery.lement.trigger(completeEvent)
          }

      this.jQuery.lement.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.jQuery.lement[method]('in')

      jQuery.support.transition && this.jQuery.lement.hasClass('collapse') ?
        this.jQuery.lement.one(jQuery.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.jQuery.lement.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = jQuery.fn.collapse

  jQuery.fn.collapse = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('collapse')
        , options = jQuery.extend({}, jQuery.fn.collapse.defaults, jQuery.his.data(), typeof option == 'object' && option)
      if (!data) jQuery.his.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.collapse.defaults = {
    toggle: true
  }

  jQuery.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  jQuery.fn.collapse.noConflict = function () {
    jQuery.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  jQuery.document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var jQuery.his = jQuery.this), href
      , target = jQuery.his.attr('data-target')
        || e.preventDefault()
        || (href = jQuery.his.attr('href')) && href.replace(/.*(?=#[^\s]+jQuery./, '') //strip for ie7
      , option = jQuery.target).data('collapse') ? 'toggle' : jQuery.his.data()
    jQuery.his[jQuery.target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    jQuery.target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var jQuery.l = jQuery.element).on('click.dropdown.data-api', this.toggle)
        jQuery.'html').on('click.dropdown.data-api', function () {
          jQuery.l.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var jQuery.his = jQuery.this)
        , jQuery.arent
        , isActive

      if (jQuery.his.is('.disabled, :disabled')) return

      jQuery.arent = getParent(jQuery.his)

      isActive = jQuery.arent.hasClass('open')

      clearMenus()

      if (!isActive) {
        jQuery.arent.toggleClass('open')
      }

      jQuery.his.focus()

      return false
    }

  , keydown: function (e) {
      var jQuery.his
        , jQuery.tems
        , jQuery.ctive
        , jQuery.arent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      jQuery.his = jQuery.this)

      e.preventDefault()
      e.stopPropagation()

      if (jQuery.his.is('.disabled, :disabled')) return

      jQuery.arent = getParent(jQuery.his)

      isActive = jQuery.arent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) jQuery.arent.find(toggle).focus()
        return jQuery.his.click()
      }

      jQuery.tems = jQuery.'[role=menu] li:not(.divider):visible a', jQuery.arent)

      if (!jQuery.tems.length) return

      index = jQuery.tems.index(jQuery.tems.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < jQuery.tems.length - 1) index++                        // down
      if (!~index) index = 0

      jQuery.tems
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    jQuery.toggle).each(function () {
      getParent(jQuery.this)).removeClass('open')
    })
  }

  function getParent(jQuery.his) {
    var selector = jQuery.his.attr('data-target')
      , jQuery.arent

    if (!selector) {
      selector = jQuery.his.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*jQuery./, '') //strip for ie7
    }

    jQuery.arent = selector && jQuery.selector)

    if (!jQuery.arent || !jQuery.arent.length) jQuery.arent = jQuery.his.parent()

    return jQuery.arent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = jQuery.fn.dropdown

  jQuery.fn.dropdown = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('dropdown')
      if (!data) jQuery.his.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call(jQuery.his)
    })
  }

  jQuery.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  jQuery.fn.dropdown.noConflict = function () {
    jQuery.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  jQuery.document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.jQuery.lement = jQuery.element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', jQuery.proxy(this.hide, this))
    this.options.remote && this.jQuery.lement.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = jQuery.Event('show')

        this.jQuery.lement.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = jQuery.support.transition && that.jQuery.lement.hasClass('fade')

          if (!that.jQuery.lement.parent().length) {
            that.jQuery.lement.appendTo(document.body) //don't move modals dom position
          }

          that.jQuery.lement.show()

          if (transition) {
            that.jQuery.lement[0].offsetWidth // force reflow
          }

          that.jQuery.lement
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.jQuery.lement.one(jQuery.support.transition.end, function () { that.jQuery.lement.focus().trigger('shown') }) :
            that.jQuery.lement.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = jQuery.Event('hide')

        this.jQuery.lement.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        jQuery.document).off('focusin.modal')

        this.jQuery.lement
          .removeClass('in')
          .attr('aria-hidden', true)

        jQuery.support.transition && this.jQuery.lement.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        jQuery.document).on('focusin.modal', function (e) {
          if (that.jQuery.lement[0] !== e.target && !that.jQuery.lement.has(e.target).length) {
            that.jQuery.lement.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.jQuery.lement.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.jQuery.lement.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.jQuery.lement.off(jQuery.support.transition.end)
              that.hideModal()
            }, 500)

        this.jQuery.lement.one(jQuery.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.jQuery.lement.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.jQuery.lement.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.jQuery.ackdrop && this.jQuery.ackdrop.remove()
        this.jQuery.ackdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.jQuery.lement.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = jQuery.support.transition && animate

          this.jQuery.ackdrop = jQuery.'<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.jQuery.ackdrop.click(
            this.options.backdrop == 'static' ?
              jQuery.proxy(this.jQuery.lement[0].focus, this.jQuery.lement[0])
            : jQuery.proxy(this.hide, this)
          )

          if (doAnimate) this.jQuery.ackdrop[0].offsetWidth // force reflow

          this.jQuery.ackdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.jQuery.ackdrop.one(jQuery.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.jQuery.ackdrop) {
          this.jQuery.ackdrop.removeClass('in')

          jQuery.support.transition && this.jQuery.lement.hasClass('fade')?
            this.jQuery.ackdrop.one(jQuery.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = jQuery.fn.modal

  jQuery.fn.modal = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('modal')
        , options = jQuery.extend({}, jQuery.fn.modal.defaults, jQuery.his.data(), typeof option == 'object' && option)
      if (!data) jQuery.his.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  jQuery.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  jQuery.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  jQuery.fn.modal.noConflict = function () {
    jQuery.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  jQuery.document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var jQuery.his = jQuery.this)
      , href = jQuery.his.attr('href')
      , jQuery.arget = jQuery.jQuery.his.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+jQuery./, ''))) //strip for ie7
      , option = jQuery.arget.data('modal') ? 'toggle' : jQuery.extend({ remote:!/#/.test(href) && href }, jQuery.arget.data(), jQuery.his.data())

    e.preventDefault()

    jQuery.arget
      .modal(option)
      .one('hide', function () {
        jQuery.his.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.jQuery.lement = jQuery.element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.jQuery.lement.on('click.' + this.type, this.options.selector, jQuery.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.jQuery.lement.on(eventIn + '.' + this.type, this.options.selector, jQuery.proxy(this.enter, this))
          this.jQuery.lement.on(eventOut + '.' + this.type, this.options.selector, jQuery.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = jQuery.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = jQuery.extend({}, jQuery.fn[this.type].defaults, this.jQuery.lement.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = jQuery.fn[this.type].defaults
        , options = {}
        , self

      this._options && jQuery.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = jQuery.e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = jQuery.e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var jQuery.ip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = jQuery.Event('show')

      if (this.hasContent() && this.enabled) {
        this.jQuery.lement.trigger(e)
        if (e.isDefaultPrevented()) return
        jQuery.ip = this.tip()
        this.setContent()

        if (this.options.animation) {
          jQuery.ip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, jQuery.ip[0], this.jQuery.lement[0]) :
          this.options.placement

        jQuery.ip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? jQuery.ip.appendTo(this.options.container) : jQuery.ip.insertAfter(this.jQuery.lement)

        pos = this.getPosition()

        actualWidth = jQuery.ip[0].offsetWidth
        actualHeight = jQuery.ip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.jQuery.lement.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var jQuery.ip = this.tip()
        , width = jQuery.ip[0].offsetWidth
        , height = jQuery.ip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      jQuery.ip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = jQuery.ip[0].offsetWidth
      actualHeight = jQuery.ip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          jQuery.ip.offset(offset)
          actualWidth = jQuery.ip[0].offsetWidth
          actualHeight = jQuery.ip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) jQuery.ip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var jQuery.ip = this.tip()
        , title = this.getTitle()

      jQuery.ip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      jQuery.ip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , jQuery.ip = this.tip()
        , e = jQuery.Event('hide')

      this.jQuery.lement.trigger(e)
      if (e.isDefaultPrevented()) return

      jQuery.ip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          jQuery.ip.off(jQuery.support.transition.end).detach()
        }, 500)

        jQuery.ip.one(jQuery.support.transition.end, function () {
          clearTimeout(timeout)
          jQuery.ip.detach()
        })
      }

      jQuery.support.transition && this.jQuery.ip.hasClass('fade') ?
        removeWithAnimation() :
        jQuery.ip.detach()

      this.jQuery.lement.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var jQuery. = this.jQuery.lement
      if (jQuery..attr('title') || typeof(jQuery..attr('data-original-title')) != 'string') {
        jQuery..attr('data-original-title', jQuery..attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.jQuery.lement[0]
      return jQuery.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.jQuery.lement.offset())
    }

  , getTitle: function () {
      var title
        , jQuery. = this.jQuery.lement
        , o = this.options

      title = jQuery..attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call(jQuery.[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.jQuery.ip = this.jQuery.ip || jQuery.this.options.template)
    }

  , arrow: function(){
      return this.jQuery.rrow = this.jQuery.rrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.jQuery.lement[0].parentNode) {
        this.hide()
        this.jQuery.lement = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? jQuery.e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().jQuery.lement.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = jQuery.fn.tooltip

  jQuery.fn.tooltip = function ( option ) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) jQuery.his.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.tooltip.Constructor = Tooltip

  jQuery.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  jQuery.fn.tooltip.noConflict = function () {
    jQuery.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = jQuery.extend({}, jQuery.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var jQuery.ip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      jQuery.ip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      jQuery.ip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      jQuery.ip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , jQuery. = this.jQuery.lement
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call(jQuery.[0]) :  o.content)
        || jQuery..attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.jQuery.ip) {
        this.jQuery.ip = jQuery.this.options.template)
      }
      return this.jQuery.ip
    }

  , destroy: function () {
      this.hide().jQuery.lement.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = jQuery.fn.popover

  jQuery.fn.popover = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('popover')
        , options = typeof option == 'object' && option
      if (!data) jQuery.his.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.popover.Constructor = Popover

  jQuery.fn.popover.defaults = jQuery.extend({} , jQuery.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  jQuery.fn.popover.noConflict = function () {
    jQuery.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = jQuery.proxy(this.process, this)
      , jQuery.lement = jQuery.element).is('body') ? jQuery.window) : jQuery.element)
      , href
    this.options = jQuery.extend({}, jQuery.fn.scrollspy.defaults, options)
    this.jQuery.crollElement = jQuery.lement.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = jQuery.element).attr('href')) && href.replace(/.*(?=#[^\s]+jQuery./, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.jQuery.ody = jQuery.'body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , jQuery.argets

        this.offsets = jQuery.[])
        this.targets = jQuery.[])

        jQuery.argets = this.jQuery.ody
          .find(this.selector)
          .map(function () {
            var jQuery.l = jQuery.this)
              , href = jQuery.l.data('target') || jQuery.l.attr('href')
              , jQuery.ref = /^#\w/.test(href) && jQuery.href)
            return ( jQuery.ref
              && jQuery.ref.length
              && [[ jQuery.ref.position().top + (!jQuery.isWindow(self.jQuery.crollElement.get(0)) && self.jQuery.crollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.jQuery.crollElement.scrollTop() + this.options.offset
          , scrollHeight = this.jQuery.crollElement[0].scrollHeight || this.jQuery.ody[0].scrollHeight
          , maxScroll = scrollHeight - this.jQuery.crollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        jQuery.this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = jQuery.selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = jQuery.fn.scrollspy

  jQuery.fn.scrollspy = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) jQuery.his.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.scrollspy.Constructor = ScrollSpy

  jQuery.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  jQuery.fn.scrollspy.noConflict = function () {
    jQuery.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  jQuery.window).on('load', function () {
    jQuery.'[data-spy="scroll"]').each(function () {
      var jQuery.py = jQuery.this)
      jQuery.py.scrollspy(jQuery.py.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = jQuery.element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var jQuery.his = this.element
        , jQuery.l = jQuery.his.closest('ul:not(.dropdown-menu)')
        , selector = jQuery.his.attr('data-target')
        , previous
        , jQuery.arget
        , e

      if (!selector) {
        selector = jQuery.his.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*jQuery./, '') //strip for ie7
      }

      if ( jQuery.his.parent('li').hasClass('active') ) return

      previous = jQuery.l.find('.active:last a')[0]

      e = jQuery.Event('show', {
        relatedTarget: previous
      })

      jQuery.his.trigger(e)

      if (e.isDefaultPrevented()) return

      jQuery.arget = jQuery.selector)

      this.activate(jQuery.his.parent('li'), jQuery.l)
      this.activate(jQuery.arget, jQuery.arget.parent(), function () {
        jQuery.his.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var jQuery.ctive = container.find('> .active')
        , transition = callback
            && jQuery.support.transition
            && jQuery.ctive.hasClass('fade')

      function next() {
        jQuery.ctive
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        jQuery.ctive.one(jQuery.support.transition.end, next) :
        next()

      jQuery.ctive.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = jQuery.fn.tab

  jQuery.fn.tab = function ( option ) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('tab')
      if (!data) jQuery.his.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  jQuery.fn.tab.noConflict = function () {
    jQuery.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  jQuery.document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    jQuery.this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function(jQuery.{

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.jQuery.lement = jQuery.element)
    this.options = jQuery.extend({}, jQuery.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.jQuery.enu = jQuery.this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.jQuery.enu.find('.active').attr('data-value')
      this.jQuery.lement
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = jQuery.extend({}, this.jQuery.lement.position(), {
        height: this.jQuery.lement[0].offsetHeight
      })

      this.jQuery.enu
        .insertAfter(this.jQuery.lement)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.jQuery.enu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.jQuery.lement.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = jQuery.isFunction(this.source) ? this.source(this.query, jQuery.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = jQuery.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^jQuery.#\s]/g, '\\jQuery.')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function (jQuery., match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = jQuery.items).map(function (i, item) {
        i = jQuery.that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.jQuery.enu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.jQuery.enu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = jQuery.this.jQuery.enu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.jQuery.enu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.jQuery.enu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.jQuery.lement
        .on('focus',    jQuery.proxy(this.focus, this))
        .on('blur',     jQuery.proxy(this.blur, this))
        .on('keypress', jQuery.proxy(this.keypress, this))
        .on('keyup',    jQuery.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.jQuery.lement.on('keydown', jQuery.proxy(this.keydown, this))
      }

      this.jQuery.enu
        .on('click', jQuery.proxy(this.click, this))
        .on('mouseenter', 'li', jQuery.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', jQuery.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.jQuery.lement
      if (!isSupported) {
        this.jQuery.lement.setAttribute(eventName, 'return;')
        isSupported = typeof this.jQuery.lement[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~jQuery.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.jQuery.lement.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.jQuery.enu.find('.active').removeClass('active')
      jQuery.e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = jQuery.fn.typeahead

  jQuery.fn.typeahead = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) jQuery.his.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  jQuery.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  jQuery.fn.typeahead.noConflict = function () {
    jQuery.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  jQuery.document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var jQuery.his = jQuery.this)
    if (jQuery.his.data('typeahead')) return
    jQuery.his.typeahead(jQuery.his.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function (jQuery. {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = jQuery.extend({}, jQuery.fn.affix.defaults, options)
    this.jQuery.indow = jQuery.window)
      .on('scroll.affix.data-api', jQuery.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  jQuery.proxy(function () { setTimeout(jQuery.proxy(this.checkPosition, this), 1) }, this))
    this.jQuery.lement = jQuery.element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.jQuery.lement.is(':visible')) return

    var scrollHeight = jQuery.document).height()
      , scrollTop = this.jQuery.indow.scrollTop()
      , position = this.jQuery.lement.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.jQuery.lement.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.jQuery.lement.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = jQuery.fn.affix

  jQuery.fn.affix = function (option) {
    return this.each(function () {
      var jQuery.his = jQuery.this)
        , data = jQuery.his.data('affix')
        , options = typeof option == 'object' && option
      if (!data) jQuery.his.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQuery.fn.affix.Constructor = Affix

  jQuery.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  jQuery.fn.affix.noConflict = function () {
    jQuery.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  jQuery.window).on('load', function () {
    jQuery.'[data-spy="affix"]').each(function () {
      var jQuery.py = jQuery.this)
        , data = jQuery.py.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      jQuery.py.affix(data)
    })
  })


}(window.jQuery);
