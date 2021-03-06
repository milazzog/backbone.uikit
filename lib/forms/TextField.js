import _        from "underscore";
import $        from "jquery";
import context  from "context-utils";
import BaseView from "../BaseView";

export default class TextField extends BaseView {

	className(){
		return 'ui-input ui-input-text ' + (_.result(this, "addClass") || '');
	}

	constructor(options) {
		super(options);

		if (!options || !_.isObject(options) )
			throw new Error('No options provided');

		if (!options.field)
			throw new Error('The field option is required');

		this.options = _.defaults(this.options, {
			field:                null,
			fieldId:              null,
			multiline:            false,
			label:                '',
			maxLength:            null,
			id:                   null, // Deprecated
			type:                 'text',
			addClass:             null,
			filled:               false ,
			autocorrect:          false,
			spellcheck:           null,
			autocomplete:         null, // off, on, name, ecc @Ref: https://developer.mozilla.org/it/docs/Web/HTML/Element/input
			inputmode:            null,
			invalid:              null,
			formatCharacterCount: null,
			accessoryBar:         true,
			placeholder:          null,
			value:                null,
			disabled:             false,
			selectAll:            false,
			autocapitalize:       null,   // off, characters, words, sentences. @Ref: https://developers.google.com/web/updates/2015/04/autocapitalize
			step:                 null,
			min:                  null,
			max:                  null,
			tabindex:             null,
			pattern:              null
		});

		this.isAndroid = false;
		this.enableCharacterCount = false;
		this.textFieldAttributes = {
			'data-field': this.options.field
		};

		let os = context.device.getOS();
		if (os.name == 'Android' ){
			this.isAndroid = true;
			if ( os.version < 5 )
				this.options.filled = true;
		}

		if (this.options.fieldId && !this.options.id) {
			this.options.id = this.options.fieldId;
		}

		if (!this.options.id && this.options.field) {
			this.options.id = this.options.field;
		}

		if (this.options.id) {
			this.textFieldAttributes['id'] = this.options.id;
		}

		if (this.options.maxLength) {
			this.textFieldAttributes['maxlength'] = this.options.maxLength;
		}

		if (this.options.step) {
			this.textFieldAttributes['step'] = this.options.step;
		}

		if ( _.isFunction(this.options.formatCharacterCount) ){
			var cbFormatCharacterCount = _.bind(this.options.formatCharacterCount, this);
			this.formatCharacterCount = _.bind(function (fieldLength) {
				if ( this.formatCharacterCount )
					cbFormatCharacterCount(fieldLength);
			}, this);
		}

		if ( this.options.addClass )
			this.$el.addClass( this.options.addClass );

		if ( !this.options.autocorrect )
			this.textFieldAttributes['autocorrect'] = 'off';

		if ( this.options.autocomplete )
			this.textFieldAttributes['autocomplete'] = this.options.autocomplete;

		if ( _.isBoolean(this.options.spellcheck) )
			this.textFieldAttributes['spellcheck'] = this.options.spellcheck.toString();

		if (this.options.pattern){
			this.textFieldAttributes['pattern'] = this.options.pattern;
		}

		if (this.options.inputmode) {
			this.textFieldAttributes['inputmode'] = this.options.inputmode;
			if (this.options.inputmode == 'numeric')
				this.textFieldAttributes['pattern'] = '[0-9]*';
		}


		// Events
		let events = {
			'touchstart':    'onTouchStart',
			'click label': 'onClickLabel'
		};
		if ( this.options.multiline ){
			events['focus textarea']  = 'onFocus';
			events['blur textarea']   = 'onBlur';
			events['change textarea'] = 'onChange';
			events['keyup textarea']  = 'onChange';
		}else{
			events['focus input']  = 'onFocus';
			events['blur input']   = 'onBlur';
			events['change input'] = 'onChange';
			events['keyup input']  = 'onChange';
		}

		this.addEvents(events);

	}

	onRender(rendered) {
		if ( rendered ) return this;
		this.$characterCount = null;
		this.$label = null;

		// this.$el.empty();

		if (this.options.label) {
			this.$label = $("<label>").attr({ "for": this.options.id }).text(this.options.label);
			this.$el.append(this.$label);
		}

		if (this.options.multiline)
			this.$textfield = $('<textarea>').attr(this.textFieldAttributes);
		else
			this.$textfield = $('<input type="' + this.options.type + '">').attr(this.textFieldAttributes);

		if (this.options.placeholder)
			this.$textfield.attr('placeholder', this.options.placeholder);

		if ( this.options.disabled ){
			this.$textfield.attr( 'disabled', 'disabled' );
			this.el.classList.add('disabled');
		}

		if ( this.options.autocapitalize )
			this.$textfield.attr( 'autocapitalize', this.options.autocapitalize );

		if ( !_.isUndefined(this.options.min) || !_.isNull(this.options.min) )
			this.$textfield.attr('min', this.options.min);

		if ( !_.isUndefined(this.options.max) || !_.isNull(this.options.max) )
			this.$textfield.attr('max', this.options.max);

		if ( !_.isUndefined(this.options.tabindex) || !_.isNull(this.options.tabindex) )
			this.$textfield.attr('tabindex', this.options.tabindex);

		this.$el.append(this.$textfield);

		if(this.options.maxLength) {
			this.enableCharacterCount = true;
			this.$characterCount = $('<span>').addClass('ui-input-character-count');
			this.$el.addClass('ui-input-character-count-enabled').append(this.$characterCount);
			this.formatCharacterCount(0);
		}

		if(this.options.invalid)
			this.$el.append($('<div>').addClass('ui-input-invalid').attr('data-invalid-field', this.options.field));

		if (this.options.filled) {
			this.$el.addClass("filled");
		}

		this.setValue( this.options.value );

		return this;
	}

	onTouchStart() {
		let hideFormAccessoryBar;
		if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.Keyboard && cordova.plugins.Keyboard.hideKeyboardAccessoryBar ) {
			hideFormAccessoryBar = cordova.plugins.Keyboard.hideKeyboardAccessoryBar;
		}else if ( window.Keyboard && window.Keyboard.hideFormAccessoryBar ){
			hideFormAccessoryBar = window.Keyboard.hideFormAccessoryBar;
		}
		if (!_.isFunction(hideFormAccessoryBar))
			hideFormAccessoryBar = ()=>{};
		hideFormAccessoryBar(!this.options.accessoryBar);
	}

	onFocus(e) {
		if (e) e.preventDefault();

		if (this.options.selectAll) {
			$(e.currentTarget).select();
		}

		this.$el.addClass('active');
		this.trigger('focus', this);
	}

	onBlur() {
		this.$el.removeClass('active');
		if ( this.textFieldLength() > 0 || this.options.filled)
			this.$el.addClass('filled');
		else
			this.$el.removeClass('filled');
		this.trigger('blur', this);
	}

	onChange(e) {
		let fieldLength = this.textFieldLength();
		this.formatCharacterCount( this.textFieldLength() );

		if ( fieldLength > 0 )
			this.$el.addClass('filled');
		else
			this.$el.removeClass('filled');

		// FIX: Android non interpreta maxlength pertanto lo controllo via javascript
		if ( this.isAndroid && _.isNumber(this.options.maxLength) ) {
			let max = this.options.maxLength;
			if (this.$textfield.val().length > max) {
				this.$textfield.val(this.$textfield.val().substr(0, max));
			}
		}

		this.trigger('change', e, this );
	}

	onClickLabel(){
		this.focus();
	}

	focus(delay){
		if ( !delay )
			delay = 0;
		if ( this.cache.focusTO )
			clearTimeout(this.cache.focusTO);
		this.cache.focusTO =
			setTimeout(() => {
				this.$textfield.focus();
				this.cache.focusTO = null;
			}, delay);
		return this;
	}

	blur() {
		if (this.$textfield)
			this.$textfield.blur();
	}

	formatCharacterCount(fieldLength) {
		if ( this.enableCharacterCount )
			this.$characterCount.text(this.textFieldAttributes.maxlength - fieldLength);
	}

	textFieldLength() {
		let str = this.$textfield.val();
		if (!str)
			return 0;
		let lns = str.match(/\n/g);
		if (lns)
			return str.length + lns.length;
		return str.length;
	}

	setLabel(newLabel) {
		this.options.label = newLabel;
		if (!this.$label) {
			this.$label = $('<label>').attr({ 'for': this.options.id }).text(this.options.label);
			this.$el.prepend(this.$label);
		} else {
			this.$label.text(this.options.label);
		}
	}

	setValue(value, options) {
		options = _.defaults(options || {}, {
			silent: false
		});

		this.$textfield.val( value );
		// let event = document.createEvent("KeyboardEvent");
		// event.initKeyboardEvent("keypress",
		let event = new KeyboardEvent("keypress", {
			"ctrlKey": false,
			"shiftKey": false,
			"altKey": false,
			"metaKey": false,
			"repeat": false,
			"isComposing": false,
			"charCode": 0,
			"keyCode": 115,
		});

		if (!options.silent) this.onChange(event);

		return this;
	}

	getValue() {
		if (!this.$textfield) return null;
		return this.$textfield.val();
	}

	getFieldName(){
		return this.options.field;
	}

	enable(action) {
		this.disabled(!action);
	}

	disabled(value) {
		this.options.disabled = value;
		if (this.$textfield) {
			this.requestAnimationFrame(() => {
				if (value) {
					this.$textfield.attr('disabled', true);
					this.el.classList.add('disabled');
				} else {
					this.$textfield.removeAttr('disabled');
					this.el.classList.remove('disabled');
				}
			});
		}
	}

	clear() {
		if (this.$textfield) {
			this.$textfield.val('');
		}
	}

};
