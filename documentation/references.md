<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [BaseView](#baseview)
    -   [className](#classname)
    -   [setDefaultsOptions](#setdefaultsoptions)
    -   [setState](#setstate)
    -   [getState](#getstate)
    -   [addEvents](#addevents)
    -   [addSubView](#addsubview)
    -   [getSubView](#getsubview)
    -   [removeSubView](#removesubview)
    -   [requestAnimationFrame](#requestanimationframe)
    -   [cancelAnimationFrame](#cancelanimationframe)
    -   [setZindex](#setzindex)
    -   [getZindex](#getzindex)
    -   [debounce](#debounce)
    -   [render](#render)
    -   [onRender](#onrender)
    -   [onAfterRender](#onafterrender)
    -   [scrollToElement](#scrolltoelement)
    -   [destroy](#destroy)
    -   [onDestroy](#ondestroy)
-   [ImageView](#imageview)
    -   [load](#load)
    -   [setSource](#setsource)
    -   [setPlaceholder](#setplaceholder)
    -   [refresh](#refresh)
    -   [width](#width)
    -   [height](#height)
-   [ImageView#loaded](#imageviewloaded)
-   [ImageView#error](#imageviewerror)
-   [PageView](#pageview)
    -   [render](#render-1)
    -   [setNavigationView](#setnavigationview)
    -   [getNavigationView](#getnavigationview)
    -   [getNavigationBar](#getnavigationbar)
    -   [getBarView](#getbarview)
    -   [getAnimationPushDuration](#getanimationpushduration)
    -   [getAnimationPopDuration](#getanimationpopduration)
-   [ModalView](#modalview)
    -   [onRender](#onrender-1)
    -   [setButtons](#setbuttons)
    -   [setButtonEnabled](#setbuttonenabled)
    -   [isButtonEnabled](#isbuttonenabled)
    -   [close](#close)
-   [NavigationModalView](#navigationmodalview)

## BaseView

**Extends Backbone.View**

BaseView extends Backbone.View to add a destroy chain, defer the rendering
using requestAnimationFrame and add helper methods.
Every view in the project should extends BaseView to preserve the destroy
chain and prevent memory leaks.
It's also important to bind DOM events through addEvents() that prevents
a Backbone.View issue on extending views.

**Parameters**

-   `options`  

**Examples**

```javascript
import { BaseView } from 'backbone.uikit';
export default class MyView extends BaseView {
  addClass() {
    return 'my-view';
  }

  constructor(options) {
    super(options);

    this.setDefaultsOptions({
      message: '42!'
    });

   this.addEvents({
     'click': 'onClick'
   });

    // Adding a sub view width state
    this.addSubView('label', new LabelView({ message: this.options.message }), this.getState());
  }

  onRender(rendered) {
    if (rendered)
      return this;

    let labelView = this.getSubView('label');
    this.$el.empty().append(labelView.el);
    labelView.render();

    return this;
  }

  onClick() {
    console.log('click');
  }

  onDestroy(options) {
    console.log('on destroy My View!');
    super.onDestroy(options);
  }
}
```

_HTML Output_

```javascript
<div class="ui-base-view my-view">
  <label>41!</label>
</div>
```

### className

Override this method to change the default class applied to the view

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The complete CSS class property

**Meta**

-   **version**: 2.0.0

### setDefaultsOptions

Helper method to set default view options. Use it in the constructor.

**Parameters**

-   `defaults` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** JSON object with the view options.
-   `moreDefaults` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Another object used for the options.

**Examples**

```javascript
constructor(options) {
  this.setDefaultsOptions(options, {
    foo: 'Bar'
  });
}
```

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### setState

Set the state object to the view.

**Parameters**

-   `state` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** State object.

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### getState

Get the state object.

Returns **State** State object.

**Meta**

-   **version**: 2.0.0

### addEvents

Attach events to the DOM.
It's important to bind DOM events through addEvents() that prevents a
Backbone.View issue on extending views.

**Parameters**

-   `events`  

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### addSubView

Add a subview to this.views object. Does not add it to the DOM or call render.
On view destroy every subview.destroy() method is called automatically,
it's useful to prevent memory leaks.

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the subview.
-   `view` **[BaseView](#baseview)** An instance of a BaseView.
-   `state`  

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### getSubView

Return a sub view from it's name.

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the sub view.

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### removeSubView

Remove a subview. It also stop listening his events and remove it from
the DOM.

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the sub view.

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### requestAnimationFrame

Wrapper of window.requestAnimationFrame

**Parameters**

-   `callback` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to call

Returns **integer** requestAnimationFrame handler id useful to cancel the animation

**Meta**

-   **version**: 2.0.0

### cancelAnimationFrame

Wrapper of window.requestAnimationFrame

**Parameters**

-   `id`  
-   `callback` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to call

Returns **integer** cancelAnimationFrame

**Meta**

-   **version**: 2.0.0

### setZindex

Helper function to set z-index

**Parameters**

-   `zIndex` **integer** New z-index.

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### getZindex

Get z-index

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### debounce

Helper method to debounce a function

**Parameters**

-   `method` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Method name.
-   `delay` **integer** Timeing for debounce.

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### render

Render the view. It use requestAnimationFrame to increase the performance.
On the sub view override the method onRender to insert your code.

Returns **[BaseView](#baseview)** Returns this.

**Meta**

-   **version**: 2.0.0

### onRender

Override this method to insert your render logic.
Optionally add a done callback to create an async rendering.
Only when done() is called your BaseView calls onAfterRender.

**Parameters**

-   `rendered`  

**Examples**

_Syncronous rendering_

```javascript
onRender(rendered) {
  if (!rendered) {
    this.$el.html(this.template({ model: this.model.toJSON() }));
  }
}
```

_Asyncronous rendering_

```javascript
onRender(rendered, done) {
  if (!rendered) {
    this.$el.html(this.template({ model: this.model.toJSON() }));
    new Swiper({
      ...,
      onInit: () => {
        done();
      }
    });
  }
}
onAfterRender() {
  console.log('Swiper is ready!');
}
```

**Meta**

-   **version**: 2.0.0

### onAfterRender

Override this method to insert your render logic after async onRender
is happended. It's callend only if onRender has two parameters (rendered, done).

**Meta**

-   **version**: 2.0.0

### scrollToElement

Helper function that scroll a view, or a div, to an element.

**Parameters**

-   `scroller` **([HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) | jQuery)** [this] - Element that scroll.
-   `el` **([HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) | jQuery)** Element to scroll to.
-   `animated` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** [false] - Indicates if the scroll should be enabled or not. Based on device performance it could be overwritten to false.

**Meta**

-   **version**: 2.0.0

### destroy

Remove the view from the DOM and switch off all events.
Calls onDestroy().

**Meta**

-   **version**: 2.0.0

### onDestroy

Propagates the command to destroy all the subview.
Override this method to create custom destroy logic.
When overwritten it's important to call super.onDestroy() after custom code.

**Examples**

```javascript
onDestroy() {
  const swiper = this.cache.swiper;
  if (swiper) {
    swiper.destroy();
  }
  super.onDestroy();
}
```

**Meta**

-   **version**: 2.0.0

## ImageView

**Extends BaseView**

Class rappresenting an image. It support placeholder, resize and positioning.
Always use this class to prevent memory leaks.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Page options.
    -   `options.url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Specifies the URL of an image.
    -   `options.placeholder` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** ['empty.gif'] - Temporary image, default is a transparent one pixel image named 'empty.gif' that should be placed on the root of the build dir.
    -   `options.autoload` **bool?** [true] - Load image immediatly. If false the method load() must be called manually.
    -   `options.size` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** ['auto'] - Specify how to resize the image based on the container.<br />
          `normal`: the image is not resized.<br />
          `contain`: the image is scaled by the longest side.<br />
          `cover`: the image is scaled by the shortest side.<br />
          `auto`: if the image is vertical applies the `cover` style, if horizontal it applies the `contain` style.
    -   `options.className` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** ['image'] - Name of CSS class added to the image
    -   `options.position` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** ['center'] - It indicates how to place the image. It will be used as `className`. The values are `center` or `top-left`.
    -   `options.viewport` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** It's the size of the image container. If not provided it will be calculated but with performance issue, try to always fulfill 'viewport'.
        -   `options.viewport.width` **integer** Width of the container.
        -   `options.viewport.height` **integer** Height of the container.
    -   `options.orientation` **integer?** [0] - Orientation in degrees of the image.

**Examples**

```javascript
import { BaseView, ImageView } from 'backbone.uikit';
export default class MyView extends BaseView {
  constructor(options) {
    super(options);
    this.addSubView('coverImage', new ImageView({
      src: 'http://placehold.it/350x150',
      placeholder: 'img/placeholder-cover-image.png',
      size: 'auto',
      viewport: { width: 250, height: 100 }
    });
  }

  onRender(rendered) {
    if (rendered)
      return this;
    let coverImage = this.getSubView('coverImage');
    this.$el.append(coverImage.el);
    coverImage.render();
    return this;
  }
}
```

_HTML Output_

```javascript
<div class="my-view">
  <figure class="ui-base-view ui-image">
    <img src="http://placehold.it/350x150" style="position: absolute; top: 50%; left: 50%; width: 250; height: 100px; margin-top: -50px; margin-left: -125px; opacity: 1;">
  </figure>
</div>
```

**Meta**

-   **version**: 2.0.0

### load

Load image.

**Meta**

-   **version**: 2.0.0

### setSource

Set a new image with orientation.

**Parameters**

-   `src` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL of the new image.
-   `orientation` **integer** [options.orientation] - Orientation of the new image. Default use options.orientation.

**Meta**

-   **version**: 2.0.0

### setPlaceholder

Set a new placeholder with orientation.

**Parameters**

-   `src` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL of the new image.
-   `orientation` **integer** [options.orientation] - Orientation of the new image. Default use options.orientation.

**Meta**

-   **version**: 2.0.0

### refresh

Force an image refresh.

**Meta**

-   **version**: 2.0.0

### width

Change the image width.

**Parameters**

-   `val` **integer** The new width of the image

**Meta**

-   **version**: 2.0.0

### height

Change the image height.

**Parameters**

-   `val` **integer** The new height of the image

**Meta**

-   **version**: 2.0.0

## ImageView#loaded

Triggered when an image is successfully loaded.

## ImageView#error

Triggered when an image fail to load.

**Properties**

-   `src` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Source of the image

## PageView

**Extends BaseView**

Class rappresenting a page in the app. It support entering animation and remove

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Page options
    -   `options.swipeBack` **bool?** [true] - Enable swipe back gesture to close the page. Usually only the first page of a stack should has it false.
    -   `options.animated` **bool?** [true] - Should enter with an animation or not. Usually only the first page of a stack should has it false.
    -   `options.duration` **integer?** [300] - Animation duration in ms.
    -   `options.deltaPageRender` **integer?** [100] - Delay the content rendering of deltaPageRender ms. It provides a smooth animation.
    -   `options.viewstack` **Viewstack?** [state.viewstack] - Instance of Backbone.Viewstack where the page is pushed. Default is the state viewstack, fallback the context.viewstack.
    -   `options.navigation` **NavigationView?** [state.navigation] - Instance of NavigationView, the top navigation bar. Default is the state navigation, fallback the context.navigation.
    -   `options.swipeBackDirection` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** [horizontal] - Direction of the swipe back gesture. It could be: 'horizontal', 'vertical', 'all'.
    -   `options.swipeBackClassName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** [swipe-back] - CSS class appended to the page when a swipe back is occurring.
    -   `options.swipeBackBoundaryLeft` **integer?** [0] - Left position of the area that triggers the swipe back.
    -   `options.swipeBackBoundaryTop` **integer?** [0] - Top position of the area that triggers the swipe back.
    -   `options.swipeBackBoundaryWidth` **integer?** [40] - Width of the area that triggers the swipe back.
    -   `options.swipeBackBoundaryHeight` **integer?** [viewport.height] - Height of the area that triggers the swipe back.
    -   `options.swipeBackVelocityLimit` **float?** [0.4] - Velocity of the swipe back that triggers the anticipated closure of the page.
    -   `options.pageAnimation` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** [PageView.ANIMATION_PUSH_LEFT] - Type of animation. It could be: PageView.ANIMATION_PUSH_LEFT, PageView.ANIMATION_ZOOM_IN. They represents iOS and Android standard animations.

**Examples**

```javascript
import context from 'contex-utils';
import { PageView, OSBarView } from 'backbone.uikit';

class ProductPageView extends PageView {
  construtor(options) {
    super(options);
    this.setSubView('bar', new OSBarView({
      addClass: 'back-bar',
      left: 'f',
      center: null
    }));
    this.model.fetch({
      network: 'product:' + this.model.id
    });
    this.listenTo(this.model, 'change', this.render);
  }
  getBarView() {
    return this.getSubView('bar');
  }
  onRender(rendered) {
    if (!rendered) {
      this.$el.html(this.template());
      this.cache.$name = this.$el.find('js-name');
    }
    if (this.model) {
      this.cache.$name.text(this.model.get('name'));
    } else {
      this.cache.$name.text('');
    }
  }
  onBeforePop() {
    super.onBeforePop();
    // Abort current fetch
    context.network.close('product' + this.model.id);
  }
}

// In the controller
const productPageView = new ProductPageView({ model: product });
context.viewstack.pushView(productPageView, { animated: true });
```

**Meta**

-   **version**: 2.0.0

### render

Draw the content of the page. If the page is moving due to a gesture the
onRender method is not fired.
PageView add a customizable delay to the render to prevent animation
flickering. Use options.deltaPageRender parameter to change this behaviour.

**Meta**

-   **version**: 2.0.0

### setNavigationView

Set a navigation view after initialization

**Parameters**

-   `navigation` **NavigationView** Instance of NavigationView

**Meta**

-   **version**: 2.0.0

### getNavigationView

Get the navigation view

Returns **NavigatinView** The instance of the NavigationView associated with the current page

**Meta**

-   **version**: 2.0.0

### getNavigationBar

Returns the page bar view.

Returns **BarView** The instance of the BarView

**Meta**

-   **version**: 2.0.0
-   **deprecated**: since version 2.0.0, use and override getBarView instead


### getBarView

Returns the page bar view. It's an instantiated BarView created in the
page constructor used by NavigationView to show buttons and titles.

Returns **BarView** The instance of the BarView

**Meta**

-   **version**: 2.0.0

### getAnimationPushDuration

Returns the push animation duration of the page. Used by Viewstack to regulate
push and pop events

Returns **integer** The options.duration in ms or null if options.animated == false

**Meta**

-   **version**: 2.0.0

### getAnimationPopDuration

Returns the pop animation duration of the page. Used by Viewstack to regulate
push and pop events

Returns **integer** The options.duration in ms or null

**Meta**

-   **version**: 2.0.0

## ModalView

**Extends Backbone.View**

Modal view with overlay, toolbar and container for custom views.
If you define `options.buttons = { pay: 'Pay' }` you have to create a callback
function named `onPay` that will be called on relative button click.
A smart way to use a ModalView is to create a static method (`showModal` for
convention) that creates and push a new ModalView instance and return the result
on a callback function.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options object
    -   `options.buttons` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** [{ cancel: 'Cancel', confirm: 'Ok' }] - Object that describe toolbar buttons, use key as event name and value as label. `{}` if no buttons are wanted.
    -   `options.enables` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Object that describe which button should be enabled or not. If `undefined` all buttons will be enabled.

**Examples**

```javascript
import _ from "underscore";
import context from "context-utils";
import { NavigationModalView } from "backbone.uikit";
import SignInPage from "./SignInPage";

export default class SignInModalView extends NavigationModalView {
  static showModal(done) {
    // If the user is already logged in call done immediatly
    if (context.auth.isLoggedIn()) {
      _.defer(() => {
        return done(true);
      });
      return;
    }
    let signInModalView = new SignInModalView({
      viewstack: context.viewstack
    });
    signInModalView.once('login', function() {
      signInModalView.close();
      return done(true);
    });
    signInModalView.once('cancel', function() {
      signInModalView.close();
      return done(false);
    });
    context.viewstack.pushView(signInModalView, { animated: true });
    return signInModalView;
  }

  addClass() {
    return 'sign-in';
  }

  constructor(options) {
    super(options);
    // Create the first page of the navigation modal
    let signInPage = new SignInPage({
      state: this.getState(),
      animated: false,
      swipeBack: false
    });
    this.addSubView('signIn', signInPage);
    this.listenTo(signInPage, 'cancel', this.onLoginCancel);
    this.listenTo(signInPage, 'login', this.onLogin);
  }

  onRender(rendered) {
    super.onRender(rendered);
    if (!rendered) {
      this.getSubView('viewstack').pushView(this.getSubView('signIn'));
    }
  }

  onLogin() {
    this.trigger('login', true);
  }

  onLoginCancel() {
    this.trigger('cancel');
  }
}
```

_HTML Output_

```javascript
<div class="ui-modal ui-navigation-modal sign-in" style="z-index: 400;">
  <div class="js-overlay overlay new-modal"></div>
  <div class="js-container container">
    <div class="ui-navigation negate-text-color" style="background-color: rgb(80, 71, 94);">
      ...
    </div>
    <div class="viewstack">
      <div class="ui-page signin-page overflow-scroll" style="z-index: 100;">
        ...
      </div>
    </div>
  </div>
</div>
```

### onRender

Render the view content. If overwritter the super.onRender(rendered) should
be called.

**Parameters**

-   `rendered` **bool** Indicates if it's the view first render.

**Examples**

```javascript
onRender(rendered) {
  super.onRender(rendered);
  if (!rendered) {
    // Add here your additional rendering logic using cached elements:
    // this.cache.$container
    // this.cache.$content
  }
}
```

**Meta**

-   **version**: 2.0.0

### setButtons

Set new buttons.

**Parameters**

-   `buttons` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object that describe toolbar buttons, use key as event name and value as label. `{}` if no buttons are wanted.
-   `enables` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Object that describe which button should be enabled or not. If `undefined` all buttons will be enabled.

**Examples**

```javascript
const buttons = {
  pay: 'Pay',
  cancel: 'Cancel'
};
const enableButtons = {
  pay: false,
  cancel: true
};
modalView.setButtons(buttons, enableButtons);
```

**Meta**

-   **version**: 2.0.0

### setButtonEnabled

Enable or disable a single button.

**Parameters**

-   `buttonName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Button key to enable or disable.
-   `enabled` **bool** \-

**Meta**

-   **version**: 2.0.0

### isButtonEnabled

Check if a button is enabled.

**Parameters**

-   `buttonName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Button key.

**Meta**

-   **version**: 2.0.0

### close

Close the modal view.

**Meta**

-   **version**: 2.0.0

## NavigationModalView

**Extends ModalView**

NavigationModalView is a modal view with a viewstack and a navigation bar.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options object
    -   `options.navigationViewClass` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** [NavigationView] - Class definition of the NavigationView instantiated in the constructor.

**Examples**

```javascript
import _ from "underscore";
import { ModalView } from "backbone.uikit";
export default class NewModal extends ModalView {
  static showModal(done) {
    const construtor = this;
    const newModal = new construtor();
    newModal.once('pay', (success) => {
      return done(null, success);
    });
    newModal.once('close', () => {
      return done(false);
    });
    context.viewstack.pushView(newModal, { animated: true });
  }

  addClass() {
    return 'new-modal';
  }

  constructor(options) {
    options = _.defaults(options || {}, {
      buttons: {
        cancel: 'Cancel',
        pay: 'Pay'
      }
    });
    super(options);
  }

  onRender(rendered) {
    super.onRender(rendered);
    if (!rendered) {
      // this.cache.$container
      // this.cache.$content
    }
  }

  onClose(e) {
    this.trigger('close');
    return super.onClose(e);
  }

  onPay() {
    this.trigger('pay');
    this.close();
  }
}
```

_HTML Output_

```javascript
<div class="ui-modal has-toolbar">
  <div class="js-overlay overlay"></div>
  <div class="js-container container">
    <div class="js-content content"></div>
    <div class="toolbar">
      <button class="button pay">Pay</button>
      <button class="button close">Cancel</button>
    </div>
  </div>
</div>
```
