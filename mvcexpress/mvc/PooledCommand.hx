// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Command that is automatically pooled.
 * All PooledCommand's are automatically pooled after execution - unless lock() is used.
 * 
 */
package mvcexpress.mvc;

////import mvcexpress.core.namespace.PureLegsCore;

class PooledCommand extends Command {
	public var isLocked(get_isLocked, never) : Bool;

	/**
	 * Stores information if command is locked from automatic pooling by user.
	 */
	var _isLocked : Bool;
	// = false;
	/**
	 * Shows if command is locked, and will not be automatically pooling after execution, or not.
	 * Asynchronous PooledCommand must be locked then used, and unlocked then they are done with there work.
	 */
	public function get_isLocked() : Bool {
		return _isLocked;
	}

	/**
	 * Locks PooledCommand to avoid automatic pooling after execution.
	 * Command lock(), unlock() functions are used with asynchronous commands.
	 */
	public function lock() : Void {
		_isLocked = true;
	}

	/**
	 * Unlock and pool PooledCommand.
	 * Only previously locked commands can be unlocked, or error will be thrown.
	 * Command lock(), unlock() functions are used with asynchronous commands.
	 */
	public function unlock() : Void {
		if(_isLocked)  {
			_isLocked = false;
			//use namespace pureLegsCore
			if(isExecuting)  {
				commandMap.poolCommand(this);
			}
		}

		else  {
			throw cast(("You are trying to unlock PooledCommand that was never locked. lock() it first."), Error);
		}

	}

}

