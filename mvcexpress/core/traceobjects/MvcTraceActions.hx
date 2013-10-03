// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Trace action id's.
 * 
 * 
 */
package mvcexpress.core.traceobjects;

////import mvcexpress.core.namespace.PureLegsCore;

class MvcTraceActions {

	static public var MODULEMANAGER_CREATEMODULE : String = "ModuleManager.createModule";
	static public var MODULEMANAGER_DISPOSEMODULE : String = "ModuleManager.disposeModule";
	static public var MODULEMANAGER_REGISTERSCOPE : String = "ModuleManager.registerScope";
	static public var MODULEMANAGER_UNREGISTERSCOPE : String = "ModuleManager.unregisterScope";
	static public var COMMANDMAP_MAP : String = "CommandMap.map";
	static public var COMMANDMAP_UNMAP : String = "CommandMap.unmap";
	static public var COMMANDMAP_EXECUTE : String = "CommandMap.execute";
	static public var COMMANDMAP_HANDLECOMMANDEXECUTE : String = "CommandMap.handleCommandExecute";
	static public var MEDIATORMAP_MAP : String = "MediatorMap.map";
	static public var MEDIATORMAP_UNMAP : String = "MediatorMap.unmap";
	static public var MEDIATORMAP_MEDIATE : String = "MediatorMap.mediate";
	static public var MEDIATORMAP_UNMEDIATE : String = "MediatorMap.unmediate";
	static public var PROXYMAP_MAP : String = "ProxyMap.map";
	static public var PROXYMAP_UNMAP : String = "ProxyMap.unmap";
	static public var PROXYMAP_LAZYMAP : String = "ProxyMap.lazyMap";
	static public var PROXYMAP_SCOPEMAP : String = "ProxyMap.scopeMap";
	static public var PROXYMAP_SCOPEUNMAP : String = "ProxyMap.scopeUnmap";
	static public var PROXYMAP_INJECTPENDING : String = "ProxyMap.injectPending";
	static public var MESSENGER_ADDHANDLER : String = "Messenger.addHandler";
	static public var MESSENGER_REMOVEHANDLER : String = "Messenger.removeHandler";
	static public var MESSENGER_SEND : String = "Messenger.send";
	//----------------------------------
	//     For internal use
	//----------------------------------
	static public var PROXYMAP_INJECTSTUFF : String = "ProxyMap.injectStuff";
	static public var MESSENGER_SEND_HANDLER : String = "Messenger.send.HANDLER";
	static public var MODULEBASE_SENDMESSAGE : String = "ModuleBase.sendMessage";
	static public var MODULEBASE_SENDMESSAGE_CLEAN : String = "ModuleBase.sendMessage.CLEAN";
	static public var MODULEBASE_SENDSCOPEMESSAGE : String = "ModuleBase.sendScopeMessage";
	static public var MODULEBASE_SENDSCOPEMESSAGE_CLEAN : String = "ModuleBase.sendScopeMessage.CLEAN";
	static public var COMMAND_SENDMESSAGE : String = "Command.sendMessage";
	static public var COMMAND_SENDMESSAGE_CLEAN : String = "Command.sendMessage.CLEAN";
	static public var COMMAND_SENDSCOPEMESSAGE : String = "Command.sendScopeMessage";
	static public var COMMAND_SENDSCOPEMESSAGE_CLEAN : String = "Command.sendScopeMessage.CLEAN";
	static public var MEDIATOR_SENDMESSAGE : String = "Mediator.sendMessage";
	static public var MEDIATOR_SENDMESSAGE_CLEAN : String = "Mediator.sendMessage.CLEAN";
	static public var MEDIATOR_SENDSCOPEMESSAGE : String = "Mediator.sendScopeMessage";
	static public var MEDIATOR_SENDSCOPEMESSAGE_CLEAN : String = "Mediator.sendScopeMessage.CLEAN";
	static public var MEDIATOR_ADDHANDLER : String = "Mediator.addHandler";
	static public var PROXY_SENDMESSAGE : String = "Proxy.sendMessage";
	static public var PROXY_SENDMESSAGE_CLEAN : String = "Proxy.sendMessage.CLEAN";
	static public var PROXY_SENDSCOPEMESSAGE : String = "Proxy.sendScopeMessage";
	static public var PROXY_SENDSCOPEMESSAGE_CLEAN : String = "Proxy.sendScopeMessage.CLEAN";
}

