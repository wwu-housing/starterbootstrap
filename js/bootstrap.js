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


!function (jQNew) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  jQNew(function () {

    jQNew.support.transition = (function () {

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

}(window.jQNew);/* ==========================================================
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        jQNew(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var jQNewthis = jQNew(this)
      , selector = jQNewthis.attr('data-target')
      , jQNewparent

    if (!selector) {
      selector = jQNewthis.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*jQNew)/, '') //strip for ie7
    }

    jQNewparent = jQNew(selector)

    e && e.preventDefault()

    jQNewparent.length || (jQNewparent = jQNewthis.hasClass('alert') ? jQNewthis : jQNewthis.parent())

    jQNewparent.trigger(e = jQNew.Event('close'))

    if (e.isDefaultPrevented()) return

    jQNewparent.removeClass('in')

    function removeElement() {
      jQNewparent
        .trigger('closed')
        .remove()
    }

    jQNew.support.transition && jQNewparent.hasClass('fade') ?
      jQNewparent.on(jQNew.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = jQNew.fn.alert

  jQNew.fn.alert = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('alert')
      if (!data) jQNewthis.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call(jQNewthis)
    })
  }

  jQNew.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  jQNew.fn.alert.noConflict = function () {
    jQNew.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  jQNew(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQNew);/* ============================================================
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.jQNewelement = jQNew(element)
    this.options = jQNew.extend({}, jQNew.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , jQNewel = this.jQNewelement
      , data = jQNewel.data()
      , val = jQNewel.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || jQNewel.data('resetText', jQNewel[val]())

    jQNewel[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        jQNewel.addClass(d).attr(d, d) :
        jQNewel.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var jQNewparent = this.jQNewelement.closest('[data-toggle="buttons-radio"]')

    jQNewparent && jQNewparent
      .find('.active')
      .removeClass('active')

    this.jQNewelement.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = jQNew.fn.button

  jQNew.fn.button = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('button')
        , options = typeof option == 'object' && option
      if (!data) jQNewthis.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  jQNew.fn.button.defaults = {
    loadingText: 'loading...'
  }

  jQNew.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  jQNew.fn.button.noConflict = function () {
    jQNew.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  jQNew(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var jQNewbtn = jQNew(e.target)
    if (!jQNewbtn.hasClass('btn')) jQNewbtn = jQNewbtn.closest('.btn')
    jQNewbtn.button('toggle')
  })

}(window.jQNew);/* ==========================================================
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.jQNewelement = jQNew(element)
    this.jQNewindicators = this.jQNewelement.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.jQNewelement
      .on('mouseenter', jQNew.proxy(this.pause, this))
      .on('mouseleave', jQNew.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval(jQNew.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.jQNewactive = this.jQNewelement.find('.item.active')
      this.jQNewitems = this.jQNewactive.parent().children()
      return this.jQNewitems.index(this.jQNewactive)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.jQNewitems.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.jQNewelement.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', jQNew(this.jQNewitems[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.jQNewelement.find('.next, .prev').length && jQNew.support.transition.end) {
        this.jQNewelement.trigger(jQNew.support.transition.end)
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
      var jQNewactive = this.jQNewelement.find('.item.active')
        , jQNewnext = next || jQNewactive[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      jQNewnext = jQNewnext.length ? jQNewnext : this.jQNewelement.find('.item')[fallback]()

      e = jQNew.Event('slide', {
        relatedTarget: jQNewnext[0]
      , direction: direction
      })

      if (jQNewnext.hasClass('active')) return

      if (this.jQNewindicators.length) {
        this.jQNewindicators.find('.active').removeClass('active')
        this.jQNewelement.one('slid', function () {
          var jQNewnextIndicator = jQNew(that.jQNewindicators.children()[that.getActiveIndex()])
          jQNewnextIndicator && jQNewnextIndicator.addClass('active')
        })
      }

      if (jQNew.support.transition && this.jQNewelement.hasClass('slide')) {
        this.jQNewelement.trigger(e)
        if (e.isDefaultPrevented()) return
        jQNewnext.addClass(type)
        jQNewnext[0].offsetWidth // force reflow
        jQNewactive.addClass(direction)
        jQNewnext.addClass(direction)
        this.jQNewelement.one(jQNew.support.transition.end, function () {
          jQNewnext.removeClass([type, direction].join(' ')).addClass('active')
          jQNewactive.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.jQNewelement.trigger('slid') }, 0)
        })
      } else {
        this.jQNewelement.trigger(e)
        if (e.isDefaultPrevented()) return
        jQNewactive.removeClass('active')
        jQNewnext.addClass('active')
        this.sliding = false
        this.jQNewelement.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = jQNew.fn.carousel

  jQNew.fn.carousel = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('carousel')
        , options = jQNew.extend({}, jQNew.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) jQNewthis.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  jQNew.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  jQNew.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  jQNew.fn.carousel.noConflict = function () {
    jQNew.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  jQNew(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var jQNewthis = jQNew(this), href
      , jQNewtarget = jQNew(jQNewthis.attr('data-target') || (href = jQNewthis.attr('href')) && href.replace(/.*(?=#[^\s]+jQNew)/, '')) //strip for ie7
      , options = jQNew.extend({}, jQNewtarget.data(), jQNewthis.data())
      , slideIndex

    jQNewtarget.carousel(options)

    if (slideIndex = jQNewthis.attr('data-slide-to')) {
      jQNewtarget.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQNew);/* =============================================================
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.jQNewelement = jQNew(element)
    this.options = jQNew.extend({}, jQNew.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.jQNewparent = jQNew(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.jQNewelement.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.jQNewelement.hasClass('in')) return

      dimension = this.dimension()
      scroll = jQNew.camelCase(['scroll', dimension].join('-'))
      actives = this.jQNewparent && this.jQNewparent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.jQNewelement[dimension](0)
      this.transition('addClass', jQNew.Event('show'), 'shown')
      jQNew.support.transition && this.jQNewelement[dimension](this.jQNewelement[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.jQNewelement.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.jQNewelement[dimension]())
      this.transition('removeClass', jQNew.Event('hide'), 'hidden')
      this.jQNewelement[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.jQNewelement
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.jQNewelement[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.jQNewelement.trigger(completeEvent)
          }

      this.jQNewelement.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.jQNewelement[method]('in')

      jQNew.support.transition && this.jQNewelement.hasClass('collapse') ?
        this.jQNewelement.one(jQNew.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.jQNewelement.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = jQNew.fn.collapse

  jQNew.fn.collapse = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('collapse')
        , options = jQNew.extend({}, jQNew.fn.collapse.defaults, jQNewthis.data(), typeof option == 'object' && option)
      if (!data) jQNewthis.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.collapse.defaults = {
    toggle: true
  }

  jQNew.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  jQNew.fn.collapse.noConflict = function () {
    jQNew.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  jQNew(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var jQNewthis = jQNew(this), href
      , target = jQNewthis.attr('data-target')
        || e.preventDefault()
        || (href = jQNewthis.attr('href')) && href.replace(/.*(?=#[^\s]+jQNew)/, '') //strip for ie7
      , option = jQNew(target).data('collapse') ? 'toggle' : jQNewthis.data()
    jQNewthis[jQNew(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    jQNew(target).collapse(option)
  })

}(window.jQNew);/* ============================================================
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var jQNewel = jQNew(element).on('click.dropdown.data-api', this.toggle)
        jQNew('html').on('click.dropdown.data-api', function () {
          jQNewel.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var jQNewthis = jQNew(this)
        , jQNewparent
        , isActive

      if (jQNewthis.is('.disabled, :disabled')) return

      jQNewparent = getParent(jQNewthis)

      isActive = jQNewparent.hasClass('open')

      clearMenus()

      if (!isActive) {
        jQNewparent.toggleClass('open')
      }

      jQNewthis.focus()

      return false
    }

  , keydown: function (e) {
      var jQNewthis
        , jQNewitems
        , jQNewactive
        , jQNewparent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      jQNewthis = jQNew(this)

      e.preventDefault()
      e.stopPropagation()

      if (jQNewthis.is('.disabled, :disabled')) return

      jQNewparent = getParent(jQNewthis)

      isActive = jQNewparent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) jQNewparent.find(toggle).focus()
        return jQNewthis.click()
      }

      jQNewitems = jQNew('[role=menu] li:not(.divider):visible a', jQNewparent)

      if (!jQNewitems.length) return

      index = jQNewitems.index(jQNewitems.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < jQNewitems.length - 1) index++                        // down
      if (!~index) index = 0

      jQNewitems
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    jQNew(toggle).each(function () {
      getParent(jQNew(this)).removeClass('open')
    })
  }

  function getParent(jQNewthis) {
    var selector = jQNewthis.attr('data-target')
      , jQNewparent

    if (!selector) {
      selector = jQNewthis.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*jQNew)/, '') //strip for ie7
    }

    jQNewparent = selector && jQNew(selector)

    if (!jQNewparent || !jQNewparent.length) jQNewparent = jQNewthis.parent()

    return jQNewparent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = jQNew.fn.dropdown

  jQNew.fn.dropdown = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('dropdown')
      if (!data) jQNewthis.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call(jQNewthis)
    })
  }

  jQNew.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  jQNew.fn.dropdown.noConflict = function () {
    jQNew.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  jQNew(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQNew);
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.jQNewelement = jQNew(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', jQNew.proxy(this.hide, this))
    this.options.remote && this.jQNewelement.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = jQNew.Event('show')

        this.jQNewelement.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = jQNew.support.transition && that.jQNewelement.hasClass('fade')

          if (!that.jQNewelement.parent().length) {
            that.jQNewelement.appendTo(document.body) //don't move modals dom position
          }

          that.jQNewelement.show()

          if (transition) {
            that.jQNewelement[0].offsetWidth // force reflow
          }

          that.jQNewelement
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.jQNewelement.one(jQNew.support.transition.end, function () { that.jQNewelement.focus().trigger('shown') }) :
            that.jQNewelement.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = jQNew.Event('hide')

        this.jQNewelement.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        jQNew(document).off('focusin.modal')

        this.jQNewelement
          .removeClass('in')
          .attr('aria-hidden', true)

        jQNew.support.transition && this.jQNewelement.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        jQNew(document).on('focusin.modal', function (e) {
          if (that.jQNewelement[0] !== e.target && !that.jQNewelement.has(e.target).length) {
            that.jQNewelement.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.jQNewelement.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.jQNewelement.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.jQNewelement.off(jQNew.support.transition.end)
              that.hideModal()
            }, 500)

        this.jQNewelement.one(jQNew.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.jQNewelement.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.jQNewelement.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.jQNewbackdrop && this.jQNewbackdrop.remove()
        this.jQNewbackdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.jQNewelement.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = jQNew.support.transition && animate

          this.jQNewbackdrop = jQNew('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.jQNewbackdrop.click(
            this.options.backdrop == 'static' ?
              jQNew.proxy(this.jQNewelement[0].focus, this.jQNewelement[0])
            : jQNew.proxy(this.hide, this)
          )

          if (doAnimate) this.jQNewbackdrop[0].offsetWidth // force reflow

          this.jQNewbackdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.jQNewbackdrop.one(jQNew.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.jQNewbackdrop) {
          this.jQNewbackdrop.removeClass('in')

          jQNew.support.transition && this.jQNewelement.hasClass('fade')?
            this.jQNewbackdrop.one(jQNew.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = jQNew.fn.modal

  jQNew.fn.modal = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('modal')
        , options = jQNew.extend({}, jQNew.fn.modal.defaults, jQNewthis.data(), typeof option == 'object' && option)
      if (!data) jQNewthis.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  jQNew.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  jQNew.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  jQNew.fn.modal.noConflict = function () {
    jQNew.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  jQNew(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var jQNewthis = jQNew(this)
      , href = jQNewthis.attr('href')
      , jQNewtarget = jQNew(jQNewthis.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+jQNew)/, ''))) //strip for ie7
      , option = jQNewtarget.data('modal') ? 'toggle' : jQNew.extend({ remote:!/#/.test(href) && href }, jQNewtarget.data(), jQNewthis.data())

    e.preventDefault()

    jQNewtarget
      .modal(option)
      .one('hide', function () {
        jQNewthis.focus()
      })
  })

}(window.jQNew);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQNew.tipsy by Jason Frame
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


!function (jQNew) {

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
      this.jQNewelement = jQNew(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.jQNewelement.on('click.' + this.type, this.options.selector, jQNew.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.jQNewelement.on(eventIn + '.' + this.type, this.options.selector, jQNew.proxy(this.enter, this))
          this.jQNewelement.on(eventOut + '.' + this.type, this.options.selector, jQNew.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = jQNew.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = jQNew.extend({}, jQNew.fn[this.type].defaults, this.jQNewelement.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = jQNew.fn[this.type].defaults
        , options = {}
        , self

      this._options && jQNew.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = jQNew(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = jQNew(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var jQNewtip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = jQNew.Event('show')

      if (this.hasContent() && this.enabled) {
        this.jQNewelement.trigger(e)
        if (e.isDefaultPrevented()) return
        jQNewtip = this.tip()
        this.setContent()

        if (this.options.animation) {
          jQNewtip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, jQNewtip[0], this.jQNewelement[0]) :
          this.options.placement

        jQNewtip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? jQNewtip.appendTo(this.options.container) : jQNewtip.insertAfter(this.jQNewelement)

        pos = this.getPosition()

        actualWidth = jQNewtip[0].offsetWidth
        actualHeight = jQNewtip[0].offsetHeight

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
        this.jQNewelement.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var jQNewtip = this.tip()
        , width = jQNewtip[0].offsetWidth
        , height = jQNewtip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      jQNewtip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = jQNewtip[0].offsetWidth
      actualHeight = jQNewtip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          jQNewtip.offset(offset)
          actualWidth = jQNewtip[0].offsetWidth
          actualHeight = jQNewtip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) jQNewtip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var jQNewtip = this.tip()
        , title = this.getTitle()

      jQNewtip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      jQNewtip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , jQNewtip = this.tip()
        , e = jQNew.Event('hide')

      this.jQNewelement.trigger(e)
      if (e.isDefaultPrevented()) return

      jQNewtip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          jQNewtip.off(jQNew.support.transition.end).detach()
        }, 500)

        jQNewtip.one(jQNew.support.transition.end, function () {
          clearTimeout(timeout)
          jQNewtip.detach()
        })
      }

      jQNew.support.transition && this.jQNewtip.hasClass('fade') ?
        removeWithAnimation() :
        jQNewtip.detach()

      this.jQNewelement.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var jQNewe = this.jQNewelement
      if (jQNewe.attr('title') || typeof(jQNewe.attr('data-original-title')) != 'string') {
        jQNewe.attr('data-original-title', jQNewe.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.jQNewelement[0]
      return jQNew.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.jQNewelement.offset())
    }

  , getTitle: function () {
      var title
        , jQNewe = this.jQNewelement
        , o = this.options

      title = jQNewe.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call(jQNewe[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.jQNewtip = this.jQNewtip || jQNew(this.options.template)
    }

  , arrow: function(){
      return this.jQNewarrow = this.jQNewarrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.jQNewelement[0].parentNode) {
        this.hide()
        this.jQNewelement = null
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
      var self = e ? jQNew(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().jQNewelement.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = jQNew.fn.tooltip

  jQNew.fn.tooltip = function ( option ) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) jQNewthis.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.tooltip.Constructor = Tooltip

  jQNew.fn.tooltip.defaults = {
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

  jQNew.fn.tooltip.noConflict = function () {
    jQNew.fn.tooltip = old
    return this
  }

}(window.jQNew);
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = jQNew.extend({}, jQNew.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var jQNewtip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      jQNewtip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      jQNewtip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      jQNewtip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , jQNewe = this.jQNewelement
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call(jQNewe[0]) :  o.content)
        || jQNewe.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.jQNewtip) {
        this.jQNewtip = jQNew(this.options.template)
      }
      return this.jQNewtip
    }

  , destroy: function () {
      this.hide().jQNewelement.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = jQNew.fn.popover

  jQNew.fn.popover = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('popover')
        , options = typeof option == 'object' && option
      if (!data) jQNewthis.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.popover.Constructor = Popover

  jQNew.fn.popover.defaults = jQNew.extend({} , jQNew.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  jQNew.fn.popover.noConflict = function () {
    jQNew.fn.popover = old
    return this
  }

}(window.jQNew);
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = jQNew.proxy(this.process, this)
      , jQNewelement = jQNew(element).is('body') ? jQNew(window) : jQNew(element)
      , href
    this.options = jQNew.extend({}, jQNew.fn.scrollspy.defaults, options)
    this.jQNewscrollElement = jQNewelement.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = jQNew(element).attr('href')) && href.replace(/.*(?=#[^\s]+jQNew)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.jQNewbody = jQNew('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , jQNewtargets

        this.offsets = jQNew([])
        this.targets = jQNew([])

        jQNewtargets = this.jQNewbody
          .find(this.selector)
          .map(function () {
            var jQNewel = jQNew(this)
              , href = jQNewel.data('target') || jQNewel.attr('href')
              , jQNewhref = /^#\w/.test(href) && jQNew(href)
            return ( jQNewhref
              && jQNewhref.length
              && [[ jQNewhref.position().top + (!jQNew.isWindow(self.jQNewscrollElement.get(0)) && self.jQNewscrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.jQNewscrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.jQNewscrollElement[0].scrollHeight || this.jQNewbody[0].scrollHeight
          , maxScroll = scrollHeight - this.jQNewscrollElement.height()
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

        jQNew(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = jQNew(selector)
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

  var old = jQNew.fn.scrollspy

  jQNew.fn.scrollspy = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) jQNewthis.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.scrollspy.Constructor = ScrollSpy

  jQNew.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  jQNew.fn.scrollspy.noConflict = function () {
    jQNew.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  jQNew(window).on('load', function () {
    jQNew('[data-spy="scroll"]').each(function () {
      var jQNewspy = jQNew(this)
      jQNewspy.scrollspy(jQNewspy.data())
    })
  })

}(window.jQNew);/* ========================================================
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = jQNew(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var jQNewthis = this.element
        , jQNewul = jQNewthis.closest('ul:not(.dropdown-menu)')
        , selector = jQNewthis.attr('data-target')
        , previous
        , jQNewtarget
        , e

      if (!selector) {
        selector = jQNewthis.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*jQNew)/, '') //strip for ie7
      }

      if ( jQNewthis.parent('li').hasClass('active') ) return

      previous = jQNewul.find('.active:last a')[0]

      e = jQNew.Event('show', {
        relatedTarget: previous
      })

      jQNewthis.trigger(e)

      if (e.isDefaultPrevented()) return

      jQNewtarget = jQNew(selector)

      this.activate(jQNewthis.parent('li'), jQNewul)
      this.activate(jQNewtarget, jQNewtarget.parent(), function () {
        jQNewthis.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var jQNewactive = container.find('> .active')
        , transition = callback
            && jQNew.support.transition
            && jQNewactive.hasClass('fade')

      function next() {
        jQNewactive
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
        jQNewactive.one(jQNew.support.transition.end, next) :
        next()

      jQNewactive.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = jQNew.fn.tab

  jQNew.fn.tab = function ( option ) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('tab')
      if (!data) jQNewthis.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  jQNew.fn.tab.noConflict = function () {
    jQNew.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  jQNew(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    jQNew(this).tab('show')
  })

}(window.jQNew);/* =============================================================
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


!function(jQNew){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.jQNewelement = jQNew(element)
    this.options = jQNew.extend({}, jQNew.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.jQNewmenu = jQNew(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.jQNewmenu.find('.active').attr('data-value')
      this.jQNewelement
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = jQNew.extend({}, this.jQNewelement.position(), {
        height: this.jQNewelement[0].offsetHeight
      })

      this.jQNewmenu
        .insertAfter(this.jQNewelement)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.jQNewmenu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.jQNewelement.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = jQNew.isFunction(this.source) ? this.source(this.query, jQNew.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = jQNew.grep(items, function (item) {
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
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^jQNew|#\s]/g, '\\jQNew&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function (jQNew1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = jQNew(items).map(function (i, item) {
        i = jQNew(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.jQNewmenu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.jQNewmenu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = jQNew(this.jQNewmenu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.jQNewmenu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.jQNewmenu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.jQNewelement
        .on('focus',    jQNew.proxy(this.focus, this))
        .on('blur',     jQNew.proxy(this.blur, this))
        .on('keypress', jQNew.proxy(this.keypress, this))
        .on('keyup',    jQNew.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.jQNewelement.on('keydown', jQNew.proxy(this.keydown, this))
      }

      this.jQNewmenu
        .on('click', jQNew.proxy(this.click, this))
        .on('mouseenter', 'li', jQNew.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', jQNew.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.jQNewelement
      if (!isSupported) {
        this.jQNewelement.setAttribute(eventName, 'return;')
        isSupported = typeof this.jQNewelement[eventName] === 'function'
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
      this.suppressKeyPressRepeat = ~jQNew.inArray(e.keyCode, [40,38,9,13,27])
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
      this.jQNewelement.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.jQNewmenu.find('.active').removeClass('active')
      jQNew(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = jQNew.fn.typeahead

  jQNew.fn.typeahead = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) jQNewthis.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  jQNew.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  jQNew.fn.typeahead.noConflict = function () {
    jQNew.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  jQNew(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var jQNewthis = jQNew(this)
    if (jQNewthis.data('typeahead')) return
    jQNewthis.typeahead(jQNewthis.data())
  })

}(window.jQNew);
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


!function (jQNew) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = jQNew.extend({}, jQNew.fn.affix.defaults, options)
    this.jQNewwindow = jQNew(window)
      .on('scroll.affix.data-api', jQNew.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  jQNew.proxy(function () { setTimeout(jQNew.proxy(this.checkPosition, this), 1) }, this))
    this.jQNewelement = jQNew(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.jQNewelement.is(':visible')) return

    var scrollHeight = jQNew(document).height()
      , scrollTop = this.jQNewwindow.scrollTop()
      , position = this.jQNewelement.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.jQNewelement.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.jQNewelement.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = jQNew.fn.affix

  jQNew.fn.affix = function (option) {
    return this.each(function () {
      var jQNewthis = jQNew(this)
        , data = jQNewthis.data('affix')
        , options = typeof option == 'object' && option
      if (!data) jQNewthis.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  jQNew.fn.affix.Constructor = Affix

  jQNew.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  jQNew.fn.affix.noConflict = function () {
    jQNew.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  jQNew(window).on('load', function () {
    jQNew('[data-spy="affix"]').each(function () {
      var jQNewspy = jQNew(this)
        , data = jQNewspy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      jQNewspy.affix(data)
    })
  })


}(window.jQNew);
