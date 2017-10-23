/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function registerInfrastructure() {
    if (!window._investStocks) window._investStocks = {};

    __webpack_require__(1);

    var ctx = _investStocks.ctx;

    __webpack_require__(3);
    __webpack_require__(4);
    __webpack_require__(5);
    __webpack_require__(6);
    __webpack_require__(7);
    __webpack_require__(8);
    __webpack_require__(9);
    __webpack_require__(10);
    __webpack_require__(11);
    __webpack_require__(12);
    __webpack_require__(13);
    __webpack_require__(14);
    __webpack_require__(15);

    _investStocks.ctx.get('FavouriteStocksAnalyzer').loadData();
    _investStocks.ctx.get('InvestingAvailablefunctions').getAll();
}

registerInfrastructure();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!window._investStocks.ctx) {
    __webpack_require__(2)(window._investStocks);
}

module.exports = _investStocks.ctx;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
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
    var di = function (di) {
        di = di || {};
        di.version = "0.3.3";
        var diWalkmeVersion = "1";
        di.logger = function (msg, logLevel) {
            /*** DEBUG REMOVE START ***/
            if (window.console) console.log(msg);
            /*** DEBUG REMOVE END ***/
        };
        di.log = function (msg, entry, logLevel) {
            if (entry) msg = "[class=" + entry.name() + "] " + msg;
            di.logger("DI - " + msg, logLevel || 4);
        };
        di.error = function (msg, entry, logLevel) {
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
                var entry = di.entry(name, ctx).type(type).args(args);
                ctx.map[name] = entry;
                return entry;
            };

            ctx.has = function (name) {
                return ctx.entry(name) != null;
            };

            ctx.remove = function (name) {
                if (ctx.has(name)) {
                    ctx.map[name] = null;
                    return true;
                }
                return false;
            };

            ctx.isEntryRemoved = function (name) {
                return ctx.entry(name) === null;
            };

            ctx.get = function (name, load) {
                if (ctx.isEntryRemoved(name)) di.error("Object[" + name + "] was removed");

                if (!ctx.has(name)) di.error("Object[" + name + "] is not registered");

                return ctx.entry(name).getObject(load);
            };

            ctx.create = function (name, args) {
                if (ctx.entry(name).strategy() == di.strategy.singleton) di.error("Attempt to create singleton object [" + name + "]");

                if (ctx.has(name)) return ctx.entry(name).create(args);else di.error("Object[" + name + "] is not registered");
            };

            ctx.initialize = function () {
                function innerInit(name) {
                    var entry = ctx.entry(name);
                    if (!entry) {
                        di.error("Object[" + name + "] is not registered");
                    } else if (entry.initialize() && entry.strategy().initialize()) {
                        ctx.get(name);
                    }
                }

                return function (name) {
                    if (name) {
                        innerInit(name);
                    } else {
                        for (var name in ctx.map) {
                            innerInit(name);
                        }
                    }
                };
            }();

            ctx.clear = function () {
                this.map = {};
                this.decorators = {};
            };

            function removeSpaces(s) {
                while (s.indexOf(" ") >= 0) {
                    s = s.replace(" ", "");
                }return s;
            }

            ctx.resolve = function (entry) {
                var load = entry.load();
                var depsDictionary = {};
                ctx.eachDependency(entry.dependencies(), function (name, property) {
                    var dep = ctx.get(name, load);
                    ctx.ready(dep, ctx.entry(name));

                    if (dep == null) di.error("Dependency [" + entry.name() + "." + property + "]->[" + name + "] can not be satisfied", entry);

                    depsDictionary[property] = dep;
                });
                return depsDictionary;
            };

            ctx.eachDependency = function (dependencies, func) {
                if (dependencies) {
                    var depExpList = removeSpaces(dependencies).split(",");
                    for (var i = 0; i < depExpList.length; i++) {
                        var depExp = depExpList[i];
                        if (depExp) {
                            var exp = di.dependencyExpression(depExp);
                            try {
                                func(exp.name, exp.property, i);
                            } catch (err) {
                                di.error("An exception was thrown while the DI tried to resolve class '" + exp.name + "'. Check the class name, or if it was registred correctly. \r\n inner exception: \r\n" + err.message);
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
                    if (o && typeof o.ready === 'function' && o != window && o != window.document && o != window.document.body) {

                        entry.wasReady(true);
                        o.ready.apply(o, entry.injector().ready(o, entry) || []);
                    }
                }

                return o;
            };

            ctx.createCallback = function () {
                var callback;
                return function (v) {
                    if (arguments.length == 0) return callback;
                    callback = v;
                    return ctx;
                };
            }();

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

            entry.name = function () {
                return name;
            };

            var propertyNames = ['load', 'wasReady', 'strategy', 'injector', 'type', 'dependencies', 'args', 'factory', 'initialize'];
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

            entry.depsDictionary = function (d) {
                if (!arguments.length) {
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
                if (test) return needToInject;
                if (needToInject) newArgs = properties.injector.create(newArgs ? newArgs : properties.args, entry, ctx, load);
                var o = properties.strategy.create(object, properties.factory, properties.type, newArgs, ctx, entry, load);
                return ctx.ready(o, entry);
            };

            entry.getObject = function (load) {
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

            entry.asFunction = function (type) {
                return asFactory(di.factory.func, type);
            };

            entry.asInstance = function (type) {
                return asFactory(di.factory.instance, type);
            };

            entry.asCtor = function (type) {
                return asFactory(di.factory.constructor, type);
            };

            entry.asSingleton = function () {
                return entry.strategy(di.strategy.singleton);
            };

            entry.asProto = function () {
                return entry.strategy(di.strategy.proto);
            };

            entry.injectToCtor = function () {
                return entry.injector(di.injector.ctor);
            };

            entry.injectToReady = function () {
                return entry.injector(di.injector.ready);
            };

            entry.injectToProperty = function () {
                return entry.injector(di.injector.property);
            };

            function loadDependencies(load, dependencies) {
                if (dependencies != undefined) {
                    entry.dependencies(dependencies);
                }
                entry.load(load);
                return entry;
            }

            entry.flatDependencies = function (dependencies) {
                return loadDependencies(di.load.flat, dependencies);
            };

            entry.recursiveDependencies = function (dependencies) {
                return loadDependencies(di.load.recursive, dependencies);
            };

            entry.useOnce = function () {
                var originalGetObject = entry.getObject;

                entry.getObject = function () {
                    ctx.remove(entry.name());

                    return originalGetObject.apply(this, arguments);
                };

                return entry;
            };

            return entry;
        };

        di.strategy = {
            proto: {
                test: function test(object, load) {
                    return true && (!load || load());
                },
                initialize: function initialize() {
                    return false;
                },
                create: function create(object, factory, type, args, ctx, entry, load) {
                    object = decorate(factory, type, args, ctx, entry);
                    load() && entry.injector().ready(object, entry);
                    entry.depsDictionary(undefined);
                    entry.wasReady(false);
                    return object;
                }
            },
            singleton: {
                test: function test(object, load) {
                    return !object && (!load || load());
                },
                initialize: function initialize() {
                    return true;
                },
                create: function create(object, factory, type, args, ctx, entry, load) {
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

        function decorate(factory, type, args, ctx, entry) {
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
            constructor: function constructor(type, args, entry) {
                if (args instanceof Array) {
                    // This is a performance optimization!
                    // Passing only 10 arguments is x2 times faster than 50
                    if (args.length <= 10) {
                        return new type(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
                    } else if (args.length <= 30) {
                        return new type(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18], args[19], args[20], args[21], args[22], args[23], args[24], args[25], args[26], args[27], args[28], args[29]);
                    } else {
                        di.error("trying to create a class with too many args!", entry);
                    }
                } else {
                    return new type(args);
                }
            },

            func: function func(type, args, entry) {
                if (args instanceof Array) {
                    return type.apply(type, args);
                } else {
                    return type(args);
                }
            },

            instance: function instance(type, args, entry) {
                return type;
            }
        };

        di.injector = {
            property: {
                create: function create(args, entry, ctx) {
                    return args;
                },
                ready: function ready(o, entry) {
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

            ready: {
                create: function create(args, entry, ctx) {
                    return args;
                },
                ready: function ready(o, entry) {
                    var args = entry.args();
                    var depsArgs = [];
                    var depsDictionary = entry.depsDictionary();
                    ctx.eachDependency(entry.dependencies(), function (name, property, i) {
                        depsArgs[i] = depsDictionary[property];
                    });
                    if (args) {
                        args = args instanceof Array ? args : [args];
                        for (var i = 0; i < args.length; i++) {
                            depsArgs.push(args[i]);
                        }
                    }
                    return depsArgs;
                }
            },

            ctor: {
                create: function create(args, entry, ctx) {
                    var depsArgs = [];
                    var depsDictionary = entry.depsDictionary();
                    ctx.eachDependency(entry.dependencies(), function (name, property, i) {
                        depsArgs[i] = depsDictionary[property];
                    });
                    if (args) {
                        args = args instanceof Array ? args : [args];
                        for (var i = 0; i < args.length; i++) {
                            depsArgs.push(args[i]);
                        }
                    }
                    return depsArgs;
                },
                ready: function ready(o, entry) {}
            }
        };

        di.load = {
            flat: function flat(name, ctx, entry) {
                return false;
            },
            recursive: function recursive(name, ctx, entry) {
                return true;
            }
        };

        di.defaults = {
            strategy: di.strategy.singleton,
            factory: di.factory.constructor,
            injector: di.injector.ctor,
            load: di.load.recursive
        };

        return di;
    }();
    var ctx = di.createContext();

    module.exports = function (window) {
        window.di = di;
        window.ctx = ctx;
    };
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("InvestingStockExchanges").asCtor(InvestingStockExchanges);

function InvestingStockExchanges() {
    this.stockList = {
        NYSE_AMEX_COMPOSITE: "NYSE Composite",
        NASDAQ_COMPOSITE: "NASDAQ Composite",
        USA_STOCKS: "США - все акции"
    };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FinamStockList").asCtor(FinamStockList);

function FinamStockList() {
    this.getStocks = getStocks;
    this.getByName = getByName;
    this.getByShortName = getByShortName;

    var _stocks = [];

    function getStocks() {
        return _stocks;
    }

    function getByName(name) {
        return _stocks.find(function (s) {
            return s.name == name;
        });
    }

    function getByShortName(name) {
        return _stocks.find(function (s) {
            return s.shortName == name;
        });
    }

    function ctor() {
        addStock("BA", "Boeing");
        addStock("MTW", "Manitowoc");
        addStock("KBH", "KB Home");
        addStock("DXC", "DXC Technology");
        addStock("COL", "Rockwell Collins");
        addStock("TER", "Teradyne");
        addStock("OSK", "Oshkosh");
        addStock("TCI", "Transcontinental");
        addStock("AGM", "Federal Agricultural Mortg.");
        addStock("MTD", "Mettler-Toledo");
        addStock("MLP", "Maui Land&Pineapple");
        addStock("GDOT", "Green Dot");

        addStock("AMAT", "Applied Materials");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
    }

    function addStock(shortName, name) {
        _stocks.push({ name: name, shortName: shortName });
    }
    ctor();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("TinkoffStockList").asCtor(TinkoffStockList);

function TinkoffStockList() {
    this.getStocks = getStocks;
    this.getByName = getByName;
    this.getByShortName = getByShortName;

    var _stocks = [];

    function getStocks() {
        return _stocks;
    }

    function getByName(name) {
        return _stocks.find(function (s) {
            return s.name == name;
        });
    }

    function getByShortName(name) {
        return _stocks.find(function (s) {
            return s.shortName == name;
        });
    }

    function ctor() {
        addStock("BA", "Boeing");
    }

    function addStock(shortName, name) {
        _stocks.push({ name: name, shortName: shortName });
    }
    ctor();
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("InvestingStockList").asCtor(InvestingStockList);

function InvestingStockList() {
    this.getStocks = getStocks;
    this.getByName = getByName;
    this.getByShortName = getByShortName;
    this.stockExistsByName = stockExistsByName;

    var _stocks = [];

    function getStocks() {
        return _stocks;
    }

    function stockExistsByName(name) {
        return !!this.getByShortName(name);
    }

    function getByShortName(name) {
        return _stocks.find(function (s) {
            return s.shortName == name;
        });
    }

    function getByName(name) {
        return _stocks.find(function (s) {
            return s.name == name;
        });
    }

    function ctor() {
        addStock("BA", "Boeing");
        addStock("MTW", "Manitowoc");
        addStock("KBH", "KB Home");
        addStock("DXC", "DXC Technology");
        addStock("COL", "Rockwell Collins");
        addStock("TER", "Teradyne");
        addStock("OSK", "Oshkosh");
        addStock("TCI", "Transcontinental");
        addStock("AGM", "Federal Agricultural Mortg.");
        addStock("MTD", "Mettler-Toledo");
        addStock("MLP", "Maui Land&Pineapple");
        addStock("GDOT", "Green Dot");

        addStock("AMAT", "Applied Materials");
    }

    function addStock(shortName, name) {
        _stocks.push({ name: name, shortName: shortName });
    }
    ctor();
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("BrokersFactory").asCtor(BrokersFactory).dependencies("BrokersList");

function BrokersFactory(BrokersList) {
    this.getBrokerLogic = getBrokerLogic;
    this.getBrokersLogic = getBrokersLogic;

    function getBrokerLogic(brokerName) {
        var broker = BrokersList.find(function (b) {
            return b.name == brokerName;
        });
        return {
            brokerName: brokerName,
            stockList: _investStocks.ctx.get(broker.stockList)
        };
    }

    function getBrokersLogic() {
        return BrokersList.map(function (b) {
            return getBrokerLogic(b.name);
        });
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("BrokersList").asCtor(BrokersList);

function BrokersList() {
    return [{
        name: "Finam",
        stockList: "FinamStockList"
    }, {
        name: "Tinkoff",
        stockList: "TinkoffStockList"
    }];
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("LoadYearStatistics").asProto().asCtor(LoadYearStatistics).dependencies('BrokersFactory, FinamStockList, HtmlDecoder');

function LoadYearStatistics(brokersFactory, finamStockList, htmlDecoder) {
    this.load = load;

    var _searchParams = void 0;

    // Page: https://ru.investing.com/equities/united-states
    // How to use: _investStocks.ctx.get('LoadYearStatistics').load()

    function load(searchParams) {
        _searchParams = searchParams || getDefaultSearchParams();

        run();
    }

    function getDefaultSearchParams() {
        return {
            market: stockMarket.USA_STOCKS,
            minRateDay: 0,
            minRateYear: 80,
            maxRateYear: 600,
            minRateMonth: 0,
            minRateThreeYear: 150,
            minRateWeek: 0
        };
    }

    function run() {
        chooseStockMarket(openPerformance);
        waitUntilLoaded(isPerformanceLoaded, afterPerformanceLoaded);
    }

    function afterPerformanceLoaded() {
        var rows = $('#marketsPerformance>tbody>tr');

        for (var i = 0; i < rows.length; i++) {
            if (lowEquity(rows[i])) {
                $(rows[i]).remove();
            }

            if (!notBrokerStocks(rows[i])) {
                addBrokerInfo(rows[i]);
            }
        }
    }

    function notBrokerStocks(row) {
        var brokersWithThisStock = getStockByBroker(getStockName(row));

        return !brokersWithThisStock.length;
    }

    function getStockName(row) {
        debugger;
        return htmlDecoder.decode($($(row).find('td')[1]).find('a').html());
    }

    function getStockByBroker(name) {
        var finamStock = finamStockList.getByName(name);
        var shortName = finamStock && finamStock.shortName;

        return brokersFactory.getBrokersLogic().map(function (broker) {
            return {
                brokerName: broker.brokerName,
                stock: broker.stockList.getByShortName(shortName)
            };
        }).filter(function (broker) {
            return broker.stock;
        });
    }

    function addBrokerInfo(row) {
        var brokersWithThisStock = getStockByBroker(getStockName(row));

        if (brokersWithThisStock.length) {
            var brokersTitle = brokersWithThisStock.map(function (broker) {
                return broker.brokerName;
            }).join(" ,");
            debugger;
            $($(row).find('td')[1]).append("<span> (" + brokersTitle + ")</span>");
        }
    }

    function isPerformanceLoaded() {
        // ??????? ?????????? 
        return $('#marketsPerformance>tbody>tr') && $('#marketsPerformance>tbody>tr').length;
    }

    function isRateLoaded() {
        // ??????? ????????? 
        return $('#cross_rate_markets_stocks_1>tbody>tr') && $('#cross_rate_markets_stocks_1>tbody>tr').length;
    }

    function lowEquity(row) {
        var dayEq = getColumnValue(row, 2);
        var weekEq = getColumnValue(row, 3);
        var monthEq = getColumnValue(row, 4);
        var yearEq = getColumnValue(row, 6);
        var threeYearEq = getColumnValue(row, 7);

        return _searchParams.minRateThreeYear && threeYearEq < _searchParams.minRateThreeYear || _searchParams.minRateYear && yearEq < _searchParams.minRateYear || _searchParams.minRateDay && dayEq < _searchParams.minRateDay || _searchParams.minRateWeek && weekEq < _searchParams.minRateWeek || _searchParams.minRateMonth && monthEq < _searchParams.minRateMonth;
        //|| (_searchParams.maxRateYear && yearEq > maxRateYear);
    }

    function getColumnValue(row, colIndex) {
        var strValPercent = $($(row).find('td')[colIndex]).html();
        var strVal = strValPercent.substring(0, strValPercent.length - 1);
        var intVal = parseInt(strVal);
        return intVal;
    }

    function waitUntilLoaded(condition, callback) {
        var bool = condition();
        if (!bool) {
            setTimeout(waitUntilLoaded, 100, condition, callback); // setTimeout(func, timeMS, params...)
        } else {
            callback();
        }
    }

    function openPerformance() {
        if (!$('#filter_performance.toggled').length) {
            $('#filter_performance').click();
        }
    }

    function chooseStockMarket(callback) {
        if ($('#stocksFilter').val() == _searchParams.market) {
            callback();
        } else {
            $('#stocksFilter').val(_searchParams.market);
            doStocksFilter('select', $('#stocksFilter'));
            setTimeout(waitUntilLoaded, 100, isRateLoaded, callback);
        }
    }

    var stockMarket = _investStocks.ctx.get('InvestingStockExchanges').stockList;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("HtmlDecoder").asCtor(HtmlDecoder);

function HtmlDecoder() {
    var _this = this;
    _this.decode = decode;

    function decode(encodedStr) {
        var parser = new DOMParser();
        var dom = parser.parseFromString('<!doctype html><body>' + encodedStr, 'text/html');
        var decodedString = dom.body.textContent;
        return decodedString;
    }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FinamFavouriteStocks").asCtor(FinamFavouriteStocks);

function FinamFavouriteStocks() {
    this.getAll = getAll;
    this.portfolioVolume = 4020; // amount of dollars to split between recommended stocks

    var _stocks = void 0;
    var urlBase = void 0;

    function getAll() {
        return _stocks;
    }

    function ctor() {
        urlBase = "https://ru.investing.com/equities/";
        _stocks = [];

        add("NVIDIA", "nvidia-corp");
        add("Netflix", "netflix,-inc.");
        add("boeing", "boeing-co");
        add("Alibaba", "alibaba");
        add("AMD", "adv-micro-device");
        add("Micron", "micron-tech");
        add("Applied materials", "applied-matls-inc");
        add("DXC Technology", "comp-science");
        add("Transcontinental", "transcontinental-realty-investors");
        add("Nutrisystems", "nutrisystems");
        add("Extreme-networks", "extreme-networks");
    }

    function add(name, url) {
        _stocks.push({ name: name, url: urlBase + url });
    }

    ctor();
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FavouriteStocksAnalyzer").asCtor(FavouriteStocksAnalyzer).dependencies("FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations");

function FavouriteStocksAnalyzer(FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations) {
    this.run = run;
    this.loadData = loadData;
    this.showStatistics = showStatistics;

    var storageKey = "favouriteStocksAnalitycs";

    function run() {
        clearPreviousData();
        setInitialData();
        loadData();
    }

    function loadData() {
        debugger;
        if (hasNotLoadedItems()) {
            var itemToLoad = getNotLoadedItem();

            if (location.href != itemToLoad.url) {
                location.href = itemToLoad.url;
            } else {
                attachStockInfo(itemToLoad);
                if (hasNotLoadedItems()) {
                    var itemToLoad = getNotLoadedItem();
                    if (location.href != itemToLoad.url) {
                        location.href = itemToLoad.url;
                    }
                } else {
                    showStatistics();
                    clearPreviousData(); // comment for debug
                }
            }
        } // else { showStatistics(); } // uncomment for debug
    }

    function showStatistics() {
        var items = getStorageData();

        items = items.sort(function (a, b) {
            return b.technicalSummary - a.technicalSummary;
        });

        debugger;
        splitPorfolioByFiveStocks(items);

        var itemsHtml = items.map(function (i) {
            return "<tr>" + "<td>" + i.name + "</td>" + "<td>" + FinamStockRecommendationTypes.convertRecommendationToString(i.technicalSummary) + "</td>" + "<td>" + i.stockPrice + "</td>" + "<td>" + (i.countToBuy || "") + "</td>" + "</tr>";
        });
        var resultHtml = "<div class='stock-recommedations'><table>" + "<tr><th>Название</th><th>Тех. рекомендация</th><th>Цена</th><th>Позиция</th></tr>" + itemsHtml + "<tr><td colspan='4'>Расчет по портфелю: " + FinamFavouriteStocks.portfolioVolume + "$</td></td></tr>" + "<tr><td colspan='4'>Остаток средств: " + parseInt(getAvailabeDollarsAmount(items)) + "$</td></td></tr>" + "</table></div>";
        $('body').html(resultHtml);

        CssStockRecommendations.appendStyle();
    }

    function splitPorfolioByFiveStocks(items) {
        var curVolume = FinamFavouriteStocks.portfolioVolume;
        var perStock = curVolume / 5;

        var sum = 0;
        for (var i = 0; i < 5; i++) {
            var item = items[i];
            item.countToBuy = parseInt(perStock / item.stockPrice);
            sum += item.countToBuy * item.stockPrice;
        }

        var portfolioChanged = true;
        while (portfolioChanged) {
            portfolioChanged = false;

            for (var i = 0; i < 5; i++) {
                var _item = items[i];
                if (_item.stockPrice < getAvailabeDollarsAmount(items)) {
                    _item.countToBuy++;
                    portfolioChanged = true;
                }
            }
        }
    }

    function getAvailabeDollarsAmount(items) {
        var total = items.reduce(function (sum, item) {
            return sum + (item.countToBuy || 0) * (item.stockPrice || 0);
        }, 0);

        return FinamFavouriteStocks.portfolioVolume - total;
    }

    function attachStockInfo(item) {
        var hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        var dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();
        var minimalEstimation = FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);

        var stockPrice = parseFloat($('#last_last').html().replace(",", "."));

        item.technicalSummary = minimalEstimation;
        item.stockPrice = stockPrice;
        item.dataCollected = true;
        saveItemInStorage(item);
    }

    function hasNotLoadedItems() {
        return getNotLoadedItem() != null;
    }

    function getNotLoadedItem() {
        return getStorageData().find(function (s) {
            return !s.dataCollected;
        });
    }

    function setInitialData() {
        var dataToCollect = FinamFavouriteStocks.getAll().map(function (s) {
            return {
                name: s.name,
                url: s.url,
                dataCollected: false
            };
        });

        saveData(dataToCollect);
    }

    function saveItemInStorage(itemToSave) {
        var items = getStorageData();

        items.forEach(function (item, i) {
            if (item.name == itemToSave.name) {
                items[i] = itemToSave;
            }
        });

        saveData(items);
    }

    function getStorageData() {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }

    function saveData(data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function clearPreviousData() {
        localStorage.removeItem(storageKey);
    }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FinamStockRecommendationTypes").asCtor(FinamStockRecommendationTypes);

function FinamStockRecommendationTypes() {
    var _this = this;

    this.recommendationTypes = getRecommendationTypes();
    this.getMinimalEstimation = getMinimalEstimation;
    this.convertRecommendationToString = convertRecommendationToString;

    function getMinimalEstimation(types) {
        debugger;
        if (!types || !types.length) {
            return -2;
        }

        var minimalRecommendation = types.map(function (type) {
            return _this.recommendationTypes.find(function (e) {
                return e.type == type;
            });
        }).sort(function (a, b) {
            return a.id - b.id;
        })[0].id;
        return minimalRecommendation;
    }

    function convertRecommendationToString(id) {
        return _this.recommendationTypes.find(function (e) {
            return e.id == id;
        })["type"];
    }

    function getRecommendationTypes() {
        return [{ id: -2, type: "Активно продавать" }, { id: -1, type: "Продавать" }, { id: 0, type: "Нейтрально" }, { id: 1, type: "Покупать" }, { id: 2, type: "Активно покупать" }];
    }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("CssStockRecommendations").asCtor(CssStockRecommendations);

function CssStockRecommendations() {
    this.appendStyle = appendStyle;

    function appendStyle() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = getCssContent();
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function getCssContent() {
        return '\n        .stock-recommedations tr {       font-size: 16px;   font-family: cursive;        }\n        .stock-recommedations td,.stock-recommedations th {\n                min-width: 300px;\n                padding:5px 0 0 15px}\n\n            .stock-recommedations table {position: relative;text-align: left;margin: auto;}\n\n            .stock-recommedations  tr,.stock-recommedations th, .stock-recommedations td {\n                border: 1px solid;\n            }\n\n            .stock-recommedations th {\n                font-weight: 800;\n            }        \n        ';
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("InvestingAvailablefunctions").asCtor(InvestingAvailablefunctions);

function InvestingAvailablefunctions() {
    this.getAll = getAll;

    function getAll() {
        console.log("\n1) Sort your favourite list of stocks by technical recommendations. Run:\n_investStocks.ctx.get('FavouriteStocksAnalyzer').run();\n\n2) Get filtered USA stocks (filter by day, mont, year gain). \nGo to page Page: https://ru.investing.com/equities/united-states and run:\n_investStocks.ctx.get('LoadYearStatistics').load();     \n        ");
    }
}

/***/ })
/******/ ]);