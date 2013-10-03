/**
 * Licensed under the MIT license:
 *
 *     http://www.opensource.org/licenses/mit-license.php
 *
 * (c) Copyright 2011 David Wagner.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
     * Test result nugget. Used to display the current state of a test.
     */
package noiseandheat.flexunit.visuallistener.components;

import org.flexunit.runner.IDescription;
import flash.display.LineScaleMode;
import flash.display.Sprite;

class Nugget extends Sprite {
	public var state(getState, setState) : Int;
	public var message(getMessage, setMessage) : String;
	public var stackTrace(getStackTrace, setStackTrace) : String;
	public var displayName(getDisplayName, setDisplayName) : String;

	static var INNER_X : Int = 2;
	static var INNER_Y : Int = 2;
	static var INNER_W : Int = 12;
	static var INNER_H : Int = 12;
	static public var WIDTH : Int = INNER_W + INNER_X + INNER_X;
	static public var HEIGHT : Int = INNER_W + INNER_Y + INNER_Y;
	static public var STATE_UNCERTAIN : Int = 0;
	static public var STATE_IGNORED : Int = 1;
	static public var STATE_STARTED : Int = 2;
	static public var STATE_FINISHED_SUCCESS : Int = 3;
	static public var STATE_FINISHED_FAILURE : Int = 4;
	static public var STATE_RUN_STARTED : Int = 5;
	static public var STATE_RUN_FINISHED_SUCCESS : Int = 6;
	static public var STATE_RUN_FINISHED_FAILURE : Int = 7;
	static public var STATE_FAILURE : Int = 8;
	static public var STATE_ASSUMPTION_FAILURE : Int = 9;
	static public var STATE_SUITE : Int = 10;
	static public var STATE_FINISHED : Int = 10;
	var description : IDescription;
	var _state : Int;
	var _message : String;
	var _stackTrace : String;
	var _overrideDisplayName : String;
	public function new(description : IDescription) {
		mouseChildren = false;
		_message = "";
		_stackTrace = "";
		this._state = STATE_UNCERTAIN;
		this.description = description;
		_message = "";
		_stackTrace = "";
		drawBase();
		update();
	}

	public function setState(value : Int) : Int {
		if(value != _state)  {
			_state = value;
			update();
		}
		return value;
	}

	public function getState() : Int {
		return _state;
	}

	function drawBase() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xffffff, 1.0);
		graphics.drawRect(INNER_X - 2, INNER_Y - 2, INNER_W + 4, INNER_H + 4);
		graphics.endFill();
		graphics.beginFill(0x000000, 1.0);
		graphics.drawRect(INNER_X - 1, INNER_Y - 1, INNER_W + 2, INNER_H + 2);
		graphics.endFill();
	}

	function drawUncertain() : Void {
	}

	function drawIgnored() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xcccccc, 1.0);
		graphics.drawRect(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	function drawStarted() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0x00ff00, 1.0);
		graphics.drawEllipse(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	function drawFinishedSuccess() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0x00ff00, 1.0);
		graphics.drawEllipse(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	function drawFinishedFailure() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xff0000, 1.0);
		graphics.drawEllipse(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	function drawRunStarted() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xffcc00, 1.0);
		graphics.drawRect(INNER_X + INNER_W / 2, INNER_Y, INNER_W / 2, INNER_H);
		graphics.endFill();
	}

	function drawRunFinishedSuccess() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0x00ff00, 1.0);
		graphics.drawRect(INNER_X, INNER_Y, INNER_W / 2, INNER_H);
		graphics.endFill();
		graphics.beginFill(0x000000, 1.0);
		graphics.drawRect(INNER_X + INNER_W / 2, INNER_Y, INNER_W / 2, INNER_H);
		graphics.endFill();
	}

	function drawRunFinishedFailure() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xff0000, 1.0);
		graphics.drawRect(INNER_X, INNER_Y, INNER_W / 2, INNER_H);
		graphics.endFill();
		graphics.beginFill(0x000000, 1.0);
		graphics.drawRect(INNER_X + INNER_W / 2, INNER_Y, INNER_W / 2, INNER_H);
		graphics.endFill();
	}

	function drawFailure() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xff0000, 1.0);
		graphics.drawEllipse(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	function drawAssumptionFailure() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xff0000, 1.0);
		graphics.drawRect(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	function drawSuite() : Void {
	}

	function drawFinished() : Void {
		graphics.lineStyle(1, 0x000000, 0, true, LineScaleMode.NONE);
		graphics.beginFill(0xffffff, 1.0);
		graphics.drawRect(INNER_X, INNER_Y, INNER_W, INNER_H);
		graphics.endFill();
	}

	public function update() : Void {
		switch(_state) {
		case STATE_IGNORED:
			drawIgnored();
		case STATE_STARTED:
			drawStarted();
		case STATE_FINISHED_SUCCESS:
			drawFinishedSuccess();
		case STATE_FINISHED_FAILURE:
			drawFinishedFailure();
		case STATE_RUN_STARTED:
			drawRunStarted();
		case STATE_RUN_FINISHED_SUCCESS:
			drawRunFinishedSuccess();
		case STATE_RUN_FINISHED_FAILURE:
			drawRunFinishedFailure();
		case STATE_FAILURE:
			drawFailure();
		case STATE_ASSUMPTION_FAILURE:
			drawAssumptionFailure();
		case STATE_SUITE:
			drawSuite();
		case STATE_FINISHED:
			drawFinished();
		case STATE_UNCERTAIN:
			drawUncertain();
		default:
			drawUncertain();
		}
	}

	public function getMessage() : String {
		return _message;
	}

	public function setMessage(message : String) : String {
		_message = message || "";
		return message;
	}

	public function getStackTrace() : String {
		return _stackTrace;
	}

	public function setStackTrace(stackTrace : String) : String {
		_stackTrace = stackTrace || "";
		return stackTrace;
	}

	public function setDisplayName(name : String) : String {
		_overrideDisplayName = name;
		return name;
	}

	public function getDisplayName() : String {
		if(_overrideDisplayName)  {
			return _overrideDisplayName;
		}

		else if(description && description.displayName)  {
			return description.displayName;
		}

		else  {
			return "No display name";
		}

	}

	override public function toString() : String {
		return "[" + displayName + "] " + message;
	}

	public function toFullString() : String {
		var message : String = toString();
		if(_stackTrace)  {
			message += "
";
			message += ((_stackTrace) ? ": " + _stackTrace : "");
			message += "
";
		}
		return message;
	}

}

