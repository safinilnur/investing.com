(function() {
    /*
     *  Copyright 2013 the original author or authors.
     *  Licensed under the Apache License, Version 2.0 (the "License");
     *  You may obtain a copy of the License at
     *
     *		http://www.apache.org/licenses/LICENSE-2.0
     *
     *  Unless required by applicable law or agreed to in writing, software
     *  distributed under the License is distributed on an "AS IS" BASIS,
     *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     *  See the License for the specific language governing permissions and
     *  limitations under the License.
     */
    var di = (function (di) {
        di = di || {};
        di.version = "0.3.3";
        var diWalkmeVersion = "1";
        di.logger = function(msg, logLevel) {
            /*** DEBUG REMOVE START ***/
            if (window.console)
                console.log(msg);
            /*** DEBUG REMOVE END ***/
        };
        di.log = function(msg, entry, logLevel) {
            if (entry) msg = "[class=" + entry.name() + "] " + msg;
            di.logger("DI - " + msg, logLevel || 4);
        };
        di.error = function(msg, entry, logLevel) {
            di.log(msg, entry, logLevel);
            /*** DEBUG REMOVE START ***/
            msg += "\r\n Stack: " + new Error().stack;
            throw new Error(msg);
            /*** DEBUG REMOVE END ***/
        };
        di.createContext = function () {
            var ctx = {
                map: {},
                decorators: {}
            };

            ctx.decorate = function (name, decorator) {
                if (!ctx.decorators[name]) {
                    ctx.decorators[name] = [];
                }

                ctx.decorators[name].push(decorator);
            };

            ctx.entry = function (name) {
                return ctx.map[name];
            };

            ctx.register = function (name, type, args) {
                var entry = di.entry(name, ctx)
                    .type(type)
                    .args(args);
                ctx.map[name] = entry;
                return entry;
            };

            ctx.has = function (name) {
                return ctx.entry(name) != null;
            }

            ctx.remove = function (name) {
                if(ctx.has(name)) {
                    ctx.map[name] = null;
                    return true;
                }
                return false;
            }

            ctx.isEntryRemoved = function(name) {
                return ctx.entry(name) === null;
            }

            ctx.get = function (name, load) {
                if (ctx.isEntryRemoved(name))
                    di.error("Object[" + name + "] was removed");

                if (!ctx.has(name))
                    di.error("Object[" + name + "] is not registered");

                return ctx.entry(name).getObject(load);
            };

            ctx.create = function (name, args) {
                if (ctx.entry(name).strategy() == di.strategy.singleton)
                    di.error("Attempt to create singleton object [" + name + "]");

                if (ctx.has(name))
                    return ctx.entry(name).create(args);
                else
                    di.error("Object[" + name + "] is not registered");
            };

            ctx.initialize = (function(){
                function innerInit(name) {
                    var entry = ctx.entry(name);
                    if(!entry) {
                        di.error("Object[" + name + "] is not registered");
                    }
                    else if (entry.initialize() && entry.strategy().initialize()) {
                        ctx.get(name);
                    }
                }

                return  function (name) {
                    if (name) {
                        innerInit(name);
                    } else {
                        for (var name in ctx.map) {
                            innerInit(name);
                        }
                    }
                };
            }());

            ctx.clear = function () {
                this.map = {};
                this.decorators = {};
            };

            function removeSpaces(s) {
                while (s.indexOf(" ") >= 0) s = s.replace(" ", "")
                return s;
            }

            ctx.resolve = function(entry) {
                var load = entry.load();
                var depsDictionary = {};
                ctx.eachDependency(entry.dependencies(), function(name, property) {
                    var dep = ctx.get(name, load);
                    ctx.ready(dep, ctx.entry(name));

                    if (dep == null)
                        di.error("Dependency [" + entry.name() + "." + property + "]->[" + name + "] can not be satisfied", entry);

                    depsDictionary[property] = dep;
                });
                return depsDictionary;
            };

            ctx.eachDependency = function(dependencies, func) {
                if (dependencies) {
                    var depExpList = removeSpaces(dependencies).split(",");
                    for (var i = 0; i < depExpList.length; i++) {
                        var depExp = depExpList[i];
                        if (depExp) {
                            var exp = di.dependencyExpression(depExp);
                            try {
                                func(exp.name, exp.property, i);
                            } catch(err){
                                di.error("An exception was thrown while the DI tried to resolve class '" + exp.name +
                                    "'. Check the class name, or if it was registred correctly. \r\n inner exception: \r\n" + err.message);
                            }

                        }
                    }
                }
            };

            ctx.ready = function (o, entry) {
                // After entry removle, entry will be === null
                if (entry === null && o) {
                    return o;
                }

                var wasReady = entry.wasReady();
                entry.wasReady(true);

                if (!wasReady) {
                    // di.log("created class", entry);
                    var callback = ctx.createCallback();
                    callback && callback(entry.name(), o);

                    // Added the != window/body/documents, as client can add ready function to those
                    // And we don't want to call them
                    if (o && typeof o.ready === 'function' &&
                        o != window && o != window.document && o != window.document.body) {

                        entry.wasReady(true);
                        o.ready.apply(o, entry.injector().ready(o, entry) || []);
                    }
                }

                return o;
            };

            ctx.createCallback = (function() {
                var callback;
                return function(v) {
                    if (arguments.length == 0) return callback;
                    callback = v;
                    return ctx;
                };
            }());

            return ctx;
        };

        di.dependencyExpression = function (depExp) {
            var expression = {};

            var property = depExp;
            var name = depExp;

            if (depExp.indexOf("=") > 0) {
                var depExpParts = depExp.split("=");
                property = depExpParts[0];
                name = depExpParts[1];
            }

            expression.name = name;
            expression.property = property;

            return expression;
        };

        di.entry = function (name, ctx) {
            var entry = {};
            var object;

            entry.name = function() {
                return name;
            }

            var propertyNames = ['load', 'wasReady', 'strategy', 'injector', 'type',
                'dependencies', 'args', 'factory', 'initialize'];
            var properties = {};
            for (var i = 0; i < propertyNames.length; i++) {
                var propName = propertyNames[i];
                createProperty(propName);
            }
            function createProperty(propName) {
                entry[propName] = function (p) {
                    if (!arguments.length) return properties[propName];
                    properties[propName] = p;
                    return entry;
                };
            };

            entry.depsDictionary = function(d) {
                if (!arguments.length){
                    if (!properties.depsDictionary) {
                        entry.depsDictionary(ctx.resolve(entry));
                    }
                    return properties.depsDictionary;
                }
                properties.depsDictionary = d;
                return entry;
            };

            properties.strategy = di.defaults.strategy;
            properties.factory = di.defaults.factory;
            properties.injector = di.defaults.injector;
            properties.load = di.defaults.load;
            properties.wasReady = false;
            properties.initialize = true;

            entry.create = function (newArgs, test, load) {
                load = load || di.load.recursive;
                var needToInject = properties.strategy.test(object, load);
                if (test)
                    return needToInject;
                if (needToInject)
                    newArgs = properties.injector.create(newArgs ? newArgs : properties.args, entry, ctx, load);
                var o = properties.strategy.create(object, properties.factory, properties.type, newArgs, ctx, entry, load);
                return ctx.ready(o, entry);
            };

            entry.getObject = function(load) {
                return entry.create(undefined, undefined, load);
            };

            entry.object = function (o) {
                if (!arguments.length) {
                    return entry.create();
                } else {
                    object = o;
                    return entry;
                }
            };

            function asFactory(factory, type) {
                if (type != undefined) {
                    entry.type(type);
                }
                entry.factory(factory);
                return entry;
            }

            entry.asFunction = function(type) {
                return asFactory(di.factory.func, type);
            };

            entry.asInstance = function(type) {
                return asFactory(di.factory.instance, type);
            };

            entry.asCtor = function(type) {
                return asFactory(di.factory.constructor, type);
            };

            entry.asSingleton = function() {
                return entry.strategy(di.strategy.singleton);
            };

            entry.asProto = function() {
                return entry.strategy(di.strategy.proto);
            };

            entry.injectToCtor = function() {
                return entry.injector(di.injector.ctor);
            };

            entry.injectToReady = function() {
                return entry.injector(di.injector.ready);
            };

            entry.injectToProperty = function() {
                return entry.injector(di.injector.property);
            };

            function loadDependencies(load, dependencies) {
                if (dependencies != undefined) {
                    entry.dependencies(dependencies);
                }
                entry.load(load);
                return entry;
            }

            entry.flatDependencies = function(dependencies) {
                return loadDependencies(di.load.flat, dependencies);
            };

            entry.recursiveDependencies = function(dependencies) {
                return loadDependencies(di.load.recursive, dependencies);
            };

            entry.useOnce = function() {
                var originalGetObject = entry.getObject;

                entry.getObject = function() {
                    ctx.remove(entry.name());

                    return originalGetObject.apply(this, arguments);
                }

                return entry;
            };

            return entry;
        };

        di.strategy = {
            proto: {
                test : function(object, load) {
                    return true && (!load || load());
                },
                initialize : function() {
                    return false;
                },
                create : function (object, factory, type, args, ctx, entry, load) {
                    object = decorate(factory, type, args, ctx, entry);
                    load() && entry.injector().ready(object, entry);
                    entry.depsDictionary(undefined);
                    entry.wasReady(false);
                    return object;
                }
            },
            singleton: {
                test : function(object, load) {
                    return (!object) && (!load || load());
                },
                initialize : function() {
                    return true;
                },
                create : function (object, factory, type, args, ctx, entry, load) {
                    if (!object) {
                        object = decorate(factory, type, args, ctx, entry);
                        entry.object(object);
                        // here we are "cheating" the DI into thinking the ready function was already called
                        // this is to support circular dependency and prevent the ready function from being called from inside the dependency
                        entry.wasReady(true);
                        load() && entry.injector().ready(object, entry);
                        entry.wasReady(false);
                    }

                    return object;
                }
            }
        };

        function decorate(factory, type, args, ctx, entry){
            var object = factory(type, args, entry);
            var decorators = ctx.decorators[entry.name()];

            if (decorators) {
                for (var i = 0; i < decorators.length; i++) {
                    object = decorators[i](object);
                }
            }

            return object;
        }

        di.factory = {
            constructor: function (type, args, entry) {
                if (args instanceof Array) {
                    // This is a performance optimization!
                    // Passing only 10 arguments is x2 times faster than 50
                    if (args.length <= 10) {
                        return new type(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);
                    }
                    else if (args.length <= 30) {
                        return new type(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],
                            args[11],args[12],args[13],args[14],args[15],args[16],args[17],args[18],args[19],args[20],
                            args[21],args[22],args[23],args[24],args[25],args[26],args[27],args[28],args[29]);
                    }
                    else {
                        di.error("trying to create a class with too many args!", entry);
                    }
                } else {
                    return new type(args);
                }
            },

            func: function (type, args, entry) {
                if (args instanceof Array) {
                    return type.apply(type, args);
                } else {
                    return type(args);
                }
            },

            instance: function (type, args, entry) {
                return type;
            }
        };

        di.injector = {
            property: {
                create : function(args, entry, ctx) {
                    return args;
                },
                ready : function(o, entry) {
                    var depsDictionary = entry.depsDictionary();
                    for (var property in depsDictionary) {
                        o[property] = depsDictionary[property];
                    }
                    var args = entry.args();
                    if (args != undefined && !depsDictionary.hasOwnProperty('args')) {
                        o.args = args;
                    }
                }
            },

            ready : {
                create : function(args, entry, ctx) {
                    return args;
                },
                ready : function(o, entry) {
                    var args = entry.args();
                    var depsArgs = [];
                    var depsDictionary = entry.depsDictionary();
                    ctx.eachDependency(entry.dependencies(), function(name, property, i) {
                        depsArgs[i] = depsDictionary[property];
                    });
                    if (args) {
                        args = (args instanceof Array) ? args : [args];
                        for (var i = 0; i < args.length; i++) {
                            depsArgs.push(args[i]);
                        }
                    }
                    return depsArgs;
                }
            },

            ctor : {
                create : function(args, entry, ctx) {
                    var depsArgs = [];
                    var depsDictionary = entry.depsDictionary();
                    ctx.eachDependency(entry.dependencies(), function(name, property, i) {
                        depsArgs[i] = depsDictionary[property];
                    });
                    if (args) {
                        args = (args instanceof Array) ? args : [args];
                        for (var i = 0; i < args.length; i++) {
                            depsArgs.push(args[i]);
                        }
                    }
                    return depsArgs;
                },
                ready : function(o, entry) {
                }
            }
        };

        di.load = {
            flat : function (name, ctx, entry) {
                return false;
            },
            recursive : function (name, ctx, entry) {
                return true;
            }
        };

        di.defaults = {
            strategy : di.strategy.singleton,
            factory : di.factory.constructor,
            injector : di.injector.ctor,
            load : di.load.recursive
        };

        return di;
    }());
    var ctx = di.createContext();

    module.exports = function(window) {
        window.di = di;
        window.ctx = ctx;
    }
})();
