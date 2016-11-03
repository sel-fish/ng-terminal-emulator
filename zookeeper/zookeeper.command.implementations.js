angular.module('ng-terminal-zookeeper.command.implementations', ['ng-terminal-zookeeper.command.tools'])

.config(['commandBrokerProvider', function (commandBrokerProvider) {

    commandBrokerProvider.appendCommandHandler({
        command: 'ls',
        description: ['Show children of a node.', 'Example: ls /'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'ls2',
        description: ['Show children of a node and other details.', 'Example: ls2 /'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'delete',
        description: ['Delete a node with no children.', 'Example: delete /a-node-with-no-children'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'rmr',
        description: ['Delete a node recursively.', 'Example: rmr /a-node-i-dont-need-anymore'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'create',
        description: ['Create a node', 'Example: create /a-node-i-want-to-create'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'set',
        description: ['Set the data of a node', 'Example: set /a-node-i-want-to-set-data zk-is-fun'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'get',
        description: ['Get the data of node', 'Example: get /a-node-i-want-to-get-data'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Not support yet, coming soon ...'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'version',
        description: ['Shows this software version.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Version 0.1 Beta'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'clear',
        description: ['Clears the screen.'],
        handle: function (session) {
            session.commands.push({ command: 'clear' });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'eval',
        description: ['Evaluates input as javascript.','Example: eval alert(1)'],
        handle: function (session, param) {
            var a = Array.prototype.slice.call(arguments, 1);
            var param = eval(a.join(' '));
            param = param ? param.toString() : '';
            session.output.push({ output: true, text: [param], breakLine: true });
        }
    });

    // this must be the last
    var helpCommandHandler = function () {
        var me = {};
        
        me.command = 'help';
        me.description = ['Provides instructions about how to use this terminal'];
        me.handle = function (session, cmd) {
            var list = commandBrokerProvider.describe();
            var outText = [];
            if (cmd) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].command == cmd) {
                        var l = list[i];
                        // outText.push("Command help for: " + cmd);
                        outText.push("");
                        for (var j = 0; j < l.description.length; j++) {
                            outText.push(l.description[j]);
                        }
                        break;
                    }
                }
                if(!outText.length)
                    outText.push("There is no command help for: " + cmd);
            } else {
                outText.push("Available commands:");
                for (var i = 0; i < list.length; ) {
                    var str = "  ";
                    for (var j = 0; j < 4 && i < list.length; j++) {
                        var cmd = list[i++].command;
                        str += cmd + (cmd.length > 6 ? "\t" : (cmd.length < 3 ? "\t\t\t" : "\t\t"));
                    }
                    outText.push(str);
                }
                outText.push("");
                outText.push("Enter 'help <command>' to get help for a particular command.");
            }
            session.output.push({ output: true, text: outText, breakLine: true });
        };
        return me;
    };
    commandBrokerProvider.appendCommandHandler(helpCommandHandler());
}]);
