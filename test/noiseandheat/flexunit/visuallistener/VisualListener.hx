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
     * Visual flexunit results listener. To use, add to the stage,
     * add it as a listener to the FlexUnitCore, and then run.
     *
     * Best enjoyed with a fine glass of single malt whisky.
     */
package noiseandheat.flexunit.visuallistener;

import noiseandheat.flexunit.visuallistener.components.Nugget;
import noiseandheat.flexunit.visuallistener.components.TwoToneLabel;
import org.flexunit.runner.IDescription;
import org.flexunit.runner.Result;
import org.flexunit.runner.notification.Failure;
import org.flexunit.runner.notification.IRunListener;
import flash.display.Sprite;
import flash.events.MouseEvent;
import flash.system.System;
import flash.utils.Dictionary;

class VisualListener extends Sprite, implements IRunListener {

	static var NUGGET_Y_START : Int = 32;
	var descriptionToNuggetIndex : Dictionary;
	var nuggets : Array<Nugget>;
	var nextNuggetY : Int;
	var nextNuggetX : Int;
	var tiptext : TwoToneLabel;
	var statustext : TwoToneLabel;
	public var logToTrace : Bool;
	var _maxWidth : Int;
	var _maxHeight : Int;
	public function new(maxWidth : Int, maxHeight : Int) {
		_maxWidth = maxWidth;
		_maxHeight = maxHeight;
		descriptionToNuggetIndex = new Dictionary();
		nuggets = new Array<Nugget>();
		tiptext = new TwoToneLabel(maxWidth, "<font color='#888888' size='-1'>[", "]</font> ");
		tiptext.visible = false;
		addChild(tiptext);
		statustext = new TwoToneLabel(maxWidth, "<font color='#000088'><b>", "</b></font> ");
		statustext.setText("Starting", "");
		statustext.wordWrap = false;
		addChild(statustext);
		nextNuggetY = NUGGET_Y_START;
	}

	function log(message : String) : Void {
		if(logToTrace)  {
			trace("[VisualListener log]" + message);
		}
	}

	function fetchNugget(description : IDescription) : Nugget {
		if(descriptionToNuggetIndex[description] == null)  {
			return createNugget(description);
		}

		else  {
			return nuggets[descriptionToNuggetIndex[description]];
		}

	}

	function createNugget(description : IDescription) : Nugget {
		var nugget : Nugget = new Nugget(description);
		nugget.x = nextNuggetX;
		nugget.y = nextNuggetY;
		nugget.addEventListener(MouseEvent.MOUSE_OVER, overNugget);
		nugget.addEventListener(MouseEvent.MOUSE_OUT, outNugget);
		nugget.addEventListener(MouseEvent.CLICK, clickNugget);
		addChild(nugget);
		nextNuggetX += Nugget.WIDTH;
		if(nextNuggetX + Nugget.WIDTH > _maxWidth)  {
			nextNuggetY += Nugget.HEIGHT;
			nextNuggetX = 0;
		}
		if(description) descriptionToNuggetIndex[description] = nuggets.length;
		nuggets.push(nugget);
		return nugget;
	}

	function showTipForNugget(nugget : Nugget) : Void {
		tiptext.setText(nugget.displayName, nugget.message);
		tiptext.x = nugget.x;
		tiptext.y = nugget.y - tiptext.height;
		if(tiptext.y < 0)  {
			tiptext.y = nugget.y + Nugget.HEIGHT + 8;
		}
		if(tiptext.x + tiptext.width > _maxWidth)  {
			tiptext.x = _maxWidth - tiptext.width;
		}
		setChildIndex(tiptext, numChildren - 1);
		dimNuggets();
		undimNugget(nugget);
		tiptext.visible = true;
	}

	function overNugget(event : MouseEvent) : Void {
		var nugget : Nugget = try cast(event.target, Nugget) catch(e) null;
		if(nugget != null)  {
			showTipForNugget(nugget);
		}

		else  {
			log("We don't seem to be targetting a nugget despite getting an event. Most peculiar.");
		}

	}

	function undimNugget(nugget : Nugget) : Void {
		nugget.alpha = 1.0;
	}

	function dimNugget(nugget : Nugget) : Void {
		nugget.alpha = 0.25;
	}

	function dimNuggets() : Void {
		var i : Int = 0;
		while(i < nuggets.length) {
			dimNugget(nuggets[i]);
			i++;
		}
	}

	function undimNuggets() : Void {
		var i : Int = 0;
		while(i < nuggets.length) {
			undimNugget(nuggets[i]);
			i++;
		}
	}

	function outNugget(event : MouseEvent) : Void {
		var nugget : Nugget = try cast(event.target, Nugget) catch(e) null;
		if(nugget != null)  {
			undimNuggets();
			tiptext.visible = false;
		}

		else  {
			log("We don't seem to be targetting a nugget despite getting an event. Most peculiar.");
		}

	}

	function clickNugget(event : MouseEvent) : Void {
		var nugget : Nugget = try cast(event.target, Nugget) catch(e) null;
		if(nugget != null)  {
			System.setClipboard(nugget.toFullString());
			tiptext.visible = false;
		}

		else  {
			log("We don't seem to be targetting a nugget despite getting an event. Most peculiar.");
		}

	}

	public function testIgnored(description : IDescription) : Void {
		var n : Nugget = fetchNugget(description);
		if(description.isSuite)  {
			n.state = Nugget.STATE_SUITE;
		}

		else  {
			n.state = Nugget.STATE_IGNORED;
		}

		n.message = "Ignored";
		log("testIgnored: " + n);
		statustext.setText("Ignored", description.displayName);
	}

	public function testFinished(description : IDescription) : Void {
		var n : Nugget = fetchNugget(description);
		if(description.isSuite)  {
			n.state = Nugget.STATE_SUITE;
		}

		else  {
			n.state = Nugget.STATE_FINISHED;
		}

		if(!n.message)  {
			n.message = "Finished";
		}
		log("testFinished: " + n);
		statustext.setText("Finished", description.displayName);
	}

	public function testStarted(description : IDescription) : Void {
		var n : Nugget = fetchNugget(description);
		if(description.isSuite)  {
			n.state = Nugget.STATE_SUITE;
		}

		else  {
			n.state = Nugget.STATE_STARTED;
		}

		log("testStarted: " + n);
		statustext.setText("Started", description.displayName);
	}

	public function testRunStarted(description : IDescription) : Void {
		var n : Nugget = fetchNugget(description);
		if(description.isSuite)  {
			n.state = Nugget.STATE_SUITE;
		}

		else  {
			n.state = Nugget.STATE_RUN_STARTED;
		}

		n.displayName = "Test run started";
		log("testRunStarted: " + n);
		statustext.setText("Test run started", description.displayName);
	}

	public function testRunFinished(result : Result) : Void {
		var n : Nugget = createNugget(null);
		var message : String;
		var runTime : Float = result.runTime / 1000;
		if(result.successful)  {
			n.state = Nugget.STATE_RUN_FINISHED_SUCCESS;
			message = "Success!";
			message += " Tests: " + result.runCount;
			message += " Time: " + runTime + " second" + (runTime == (1) ? "" : "s");
			statustext.backgroundColor = 0x00ff00;
		}

		else  {
			n.state = Nugget.STATE_RUN_FINISHED_FAILURE;
			message = "Failures!";
			message += " " + result.failureCount + " out of " + result.runCount + " failed!";
			message += " Time: " + runTime + " second" + (runTime == (1) ? "" : "s");
			statustext.backgroundColor = 0xff0000;
		}

		n.displayName = "Test run finished";
		n.message = message;
		log("testRunFinished: " + n);
		statustext.setText("Test run finished", message);
	}

	public function testAssumptionFailure(failure : Failure) : Void {
		var n : Nugget = fetchNugget(failure.description);
		if(failure.description.isSuite)  {
			n.state = Nugget.STATE_SUITE;
		}

		else  {
			n.state = Nugget.STATE_ASSUMPTION_FAILURE;
		}

		n.message = failure.message;
		n.stackTrace = failure.stackTrace;
		log("testAssumptionFailure: " + n);
	}

	public function testFailure(failure : Failure) : Void {
		var n : Nugget = fetchNugget(failure.description);
		if(failure.description.isSuite)  {
			n.state = Nugget.STATE_SUITE;
		}

		else  {
			n.state = Nugget.STATE_FAILURE;
		}

		n.message = failure.message;
		n.stackTrace = failure.stackTrace;
		log("testFailure: " + n);
	}

}

