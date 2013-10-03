/**
     * Copyright (C) 2011 David Wagner
     */
package noiseandheat.flexunit.visuallistener.components;

import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFormat;

class TwoToneLabel extends Sprite {
	public var backgroundColor(getBackgroundColor, setBackgroundColor) : Int;
	public var wordWrap(getWordWrap, setWordWrap) : Bool;

	var _prefixA : String;
	var _postfixA : String;
	var _textA : String;
	var _prefixB : String;
	var _postfixB : String;
	var _textB : String;
	var field : TextField;
	var _maxWidth : Int;
	public function new(maxWidth : Int, prefixA : String = "", postfixA : String = "", prefixB : String = "", postfixB : String = "") {
		mouseEnabled = false;
		mouseChildren = false;
		_maxWidth = maxWidth;
		_prefixA = prefixA || "";
		_textA = "";
		_postfixA = postfixA || "";
		_prefixB = prefixB || "";
		_textB = "";
		_postfixB = postfixB || "";
		field = new TextField();
		wordWrap = true;
		field.background = true;
		backgroundColor = 0xffffff;
		var tf : TextFormat = field.defaultTextFormat;
		tf.font = "Arial";
		tf.size = 14;
		field.defaultTextFormat = tf;
		addChild(field);
	}

	public function getBackgroundColor() : Int {
		return field.backgroundColor;
	}

	public function setBackgroundColor(color : Int) : Int {
		field.backgroundColor = color;
		return color;
	}

	public function getWordWrap() : Bool {
		return field.wordWrap;
	}

	public function setWordWrap(wrap : Bool) : Bool {
		field.wordWrap = wrap;
		if(wrap)  {
			field.multiline = true;
		}

		else  {
			field.multiline = false;
		}

		return wrap;
	}

	function updateText() : Void {
		var fullText : String = _prefixA + _textA + _postfixA + _prefixB + _textB + _postfixB;
		field.width = int.MAX_VALUE;
		field.htmlText = fullText;
		field.width = field.textWidth + 5;
		if(!wordWrap)  {
			field.width = _maxWidth;
		}

		else if(field.width > _maxWidth)  {
			field.width = _maxWidth;
		}
		field.height = field.textHeight + 5;
	}

	public function setDecorationA(prefix : String, postfix : String) : Void {
		_prefixA = prefix || "";
		_postfixA = postfix || "";
		updateText();
	}

	public function setDecorationB(prefix : String, postfix : String) : Void {
		_prefixB = prefix || "";
		_postfixB = postfix || "";
		updateText();
	}

	function cleanText(text : String) : String {
		var cleaned : String = text.replace(new EReg("\<", "g"), "&lt;");
		cleaned = cleaned.replace(new EReg("\>", "g"), "&gt;");
		return cleaned;
	}

	public function setText(a : String, b : String) : Void {
		_textA = a || "";
		_textB = b || "";
		_textA = cleanText(_textA);
		_textB = cleanText(_textB);
		updateText();
	}

}

