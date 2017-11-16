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

    __webpack_require__(16);
    __webpack_require__(17);
    __webpack_require__(18);
    __webpack_require__(19);
    __webpack_require__(20);
    __webpack_require__(21);
    __webpack_require__(22);
    __webpack_require__(23);
    __webpack_require__(24);
    __webpack_require__(25);

    _investStocks.ctx.get('FavouriteStocksAnalyzer').loadData();
    _investStocks.ctx.get('InvestingAvailablefunctions').getAll();
    _investStocks.ctx.get('InvestingStockListRetreiver').runGetAllUsaStocksTask();
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


_investStocks.ctx.register("FinamFavouriteStocks").asCtor(FinamFavouriteStocks).dependencies('SpbStockList, AllUsaStocks');

function FinamFavouriteStocks(SpbStockList, AllUsaStocks) {
    this.getAll = getAll;
    this.portfolioVolume = 4020; // amount of dollars to split between recommended stocks
    this.getChangesForStockList = getChangesForStockList;
    this.getByUrl = getByUrl;

    var _stocks = void 0;
    var urlBase = void 0;

    function getAll(isPositiveStock) {
        return isPositiveStock == undefined ? _stocks : _stocks.filter(function (e) {
            return e.isPositiveStock == isPositiveStock;
        });
    }

    function getByUrl(url) {
        var fullUrl = urlBase + url;
        return _stocks.find(function (e) {
            return e.url == url || e.url == fullUrl;
        });
    }

    function ctor() {
        urlBase = "https://ru.investing.com/equities/";
        _stocks = [];

        add("Dentsply", "dentsply-intl-inc-new", false);
        add("Aetna", "aetna-inc", true);
        add("activision", "activision-inc", true);
        add("Expeditors Washington", "expeditors-intl-wash-inc", false);
        add("Broadcom", "avago-technologies", true);
        add("Micron", "micron-tech", true);
        add("Newfield Exploration", "newfield-exploration-co.", false);
        add("Stryker", "stryker", true);
        add("KLA-Tencor", "kla-tencor-corp", true);
        add("Seagate Technology", "seagate-technology", false);
        add("National Oilwell Varco", "ntl-oilwell-varc", false);
        add("Murphy Oil", "murphy-oil-corp", false);
        add("Motorola", "motorola-inc", false);
        add("Anadarko Petroleum", "anadarko-petro", false);
        add("autodesk", "autodesk-inc", true);
        add("Southwestern Energy", "southwestern-energy-company", false);
        add("Pioneer Natural Resources", "pioneer-natural-resources", false);
        add("Halliburton", "halliburton-co", false);
        add("FMC", "fmc-corp", true);
        add("Mosaic", "mosaic-company", false);
        add("The Travelers", "the-travelers-co", true);
        add("Stanley Black Decker", "stanley-works", true);
        add("Robert Half", "robert-half-intl", true);
        add("Prudential Financial", "prudential-fin", true);
        add("transocea", "transocea-ltd", false);
        add("Garmin Ltd", "garmin-ltd", true);
        add("Estee Lauder", "estee-lauder", true);
        add("ConocoPhillips", "conoco-phillips", true);
        add("Oracle", "oracle-corp", true);
        add("Avery Dennison", "avery-dennison", true);
        add("Mastercard", "mastercard-cl-a", true);
        add("Allstate", "allstate-corporation", true);
        add("First Solar", "first-solar-inc", true);
        add("Air Products", "air-prods---chem", false);
        add("Raytheon", "raytheon-co", true);
        add("EQT", "eqt-corporation", false);
        add("Waste Management", "waste-managemnt", true);
        add("Dollar Tree", "dollar-tree-inc", true);
        add("Baxter", "baxter-intl", true);
        add("Helmerich&Payne", "helmerich---payne", false);
        add("WW Grainger", "w-w-grainger-inc", false);
        add("Monster Beverage 1990", "monster-beverage", true);
        add("Constellation Brands", "constellation-a", true);
        add("Analog Devices", "analog-devices", true);
        add("Roper Technologies", "roper-industries", true);
        add("Northrop Grumman", "northrop-grumman", true);
        add("Schlumberger", "schlumberger-ltd", false);
        add("CH Robinson", "c-h-robinson-worldwide-inc", false);
        add("Intuit", "intuit", true);
        add("Progressive", "the-progressive", true);
        add("paypal", "paypal-holdings-inc", true);
        add("boeing", "boeing-co", true);
        add("Texas Instruments", "texas-instru", true);
        add("Sealed Air", "sealed-air", false);
        add("Equinix", "equinix,-inc.", true);
        add("CBRE", "cbre", true);
        add("Yum! Brands", "yum!-brands-inc", true);
        add("Eversource Energy", "northeast-utilities", false);
        add("Hologic", "hologic-inc", false);
        add("Freeport-McMoran", "freeport-mcm", true);
        add("Honeywell", "honeywell-intl", true);
        add("Dover", "dover-corp", true);
        add("Boston Properties", "boston-ppty", false);
        add("DR Horton", "d.r.-horton-inc", true);
        add("ProLogis", "prologis", true);
        add("Red Hat", "red-hat-inc", true);
        add("google", "google-inc", true);
        add("Lennar", "lennar", true);
        add("NetApp", "network-appliance-inc", true);
        add("Corning", "corning-inc", true);
        add("Align", "align-technology", true);
        add("Sempra Energy", "sempra-energy", false);
        add("Marathon Petroleum", "marathon-petroleum-corp.", true);
        add("Amphenol", "amphenol-corp", true);
        add("visa", "visa-inc", true);
        add("salesforce", "salesforce-com", true);
        add("Starbucks", "starbucks-corp", false);
        add("PulteGroup", "pulte-homes-inc", true);
        add("AvalonBay", "avalonbay-comm", false);
        add("Consolidated Edison", "cocnsol-edison", false);
        add("Danaher", "danaher-corp", false);
        add("Hormel Foods", "hormel-foods-corp", false);
        add("Qualcomm", "qualcomm-inc", false);
        add("Kroger", "kroger-co", false);
        add("VeriSign", "verisign-inc", true);
        add("Textron", "textron-inc", true);
        add("CMS Energy", "cms-energy-corp", false);
        add("Wal-Mart Stores", "wal-mart-stores", true);
        add("Apartment Invest", "apt-inv-manage", false);
        add("Varian", "varian-medical", false);
        add("Weyerhaeuser", "weyerhaeuser", true);
        add("Tyson Foods", "tyson-foods", false);
        add("amazon", "amazon-com-inc", true);
        add("Praxair", "praxair-inc", true);
        add("Host Hotels Resorts", "host-hotels---res", true);
        add("Lam Research Corp", "lam-research-corp", true);
        add("Intuitive Surgical", "intuitive-surgical-inc", true);
        add("Costco", "costco-whsl-corp-new", false);
        add("Lockheed Martin", "lockheed-martin", true);
        add("apple", "apple-computer-inc", true);
        add("Xcel Energy", "xcel-energy", true);
        add("Accenture", "accenture-ltd", false);
        add("Fastenal", "fastenal-co", false);
        add("adobe", "adobe-sys-inc", true);
        add("Teradata", "teradata", true);
        add("F5 Networks", "f5-networks-inc", false);
        add("Eastman Chemical", "eastman-chem", true);
        add("Cabot Oil&Gas", "cabot-oil---gas", true);
        add("S&P Global", "mcgraw-hill", true);
        add("Baker Hughes A", "baker-hughes", false);
        add("O'Reilly", "oreilly-automotive", false);
        add("Hess", "hess-corp", false);
        add("TechnipFMC", "fmc-technologies-inc", false);
        add("VF", "vf-corp", true);
        add("Best Buy", "best-buy", true);
        add("Moodys", "moodys-corp", true);
        add("Fox Inc", "fox-inc", false);
        add("Kimco", "kimco-realty", false);
        add("DXC Technology", "comp-science", true);
        add("Walt Disney", "disney", false);
        add("Anthem Inc", "wellpoint-inc", true);
        add("facebook", "facebook-inc", true);
        add("Union Pacific", "union-pacific", true);
        add("J&J", "johnson-johnson", false);
        add("American Tower", "amer-tower-corp", true);
        add("Welltower Inc", "health-care-reit", false);
        add("Wynn Resorts", "wynn-resorts-ltd", true);
        add("NextEra Energy", "nextera-energy-inc", true);
        add("China Biologic", "china-biologic-products", false);
        add("Valero Energy", "valero-energy", true);
        add("Fiserv", "fiserv-inc", true);
        add("Citrix Systems", "citrix-sys-inc", false);
        add("ConAgra Foods", "conagra-foods", false);
        add("Kraft Heinz", "kraft-foods-inc", false);
        add("Public Service Enterprise", "publ-svc-enter", false);
        add("Clorox", "clorox-co", false);
        add("Iron Mountain", "iron-mountain-inc", true);
        add("Harris", "harris-corporation", true);
        add("Colgate-Palmolive", "colgate-palmo", false);
        add("Edison", "edison-intl", false);
        add("Public Storage", "public-stg-mld", false);
        add("PepsiCo", "pepsico", false);
        add("Ventas", "ventas-inc", false);
        add("Sohucom", "sohu-com-inc", true);
        add("Mylan", "mylan-inc", false);
        add("Chesapeake Energy", "chesapeake-ener", false);
        add("ADP", "auto-data-process", true);
        add("Electronic Arts", "electronic-arts-inc", true);
        add("Western Union", "western-union", false);
        add("Apache", "apache-corp", false);
        add("Eaton", "eaton", true);
        add("CF Industries", "cf-industries", true);
        add("Darden Restaurants", "dardem-rest", true);
        add("Range Resources", "range-resources-corp", false);
        add("Thermo Fisher Scientific", "thermo-fisher-sc", true);
        add("CBS", "cbs-corp-cl-b", false);
        add("Devon Energy", "devon-energy", false);
        add("Laboratory of America", "laboratory-corp-of-amer", true);
        add("Nike", "nike", false);
        add("Comcast", "comcast-corp-new", false);
        add("Goldman Sachs", "goldman-sachs-group", true);
        add("Cognizant", "cognizant-technology-solutio", true);
        add("News Corp A", "news-corp.", false);
        add("Parker-Hannifin", "parkerhannifin", true);
        add("Total System Services", "total-sys-svcs", true);
        add("News Corp", "news-corporation", false);
        add("AutoZone", "autozone-inc", false);
        add("HCP", "hcp-inc", false);
        add("ANSYS", "ansys", true);
        add("Chevron", "chevron", false);
        add("Fluor", "fluor-corp", false);
        add("HP Inc", "hewlett-pack", true);
        add("FLIR Systems", "flir-systems", true);
        add("Home Depot", "home-depot", true);
        add("Campbell Soup", "campbell-soup", false);
        add("Altria", "altria-group", false);
        add("PerkinElmer", "perkinelmer", true);
        add("Principal", "principal-fin", true);
        add("NRG", "nrg-energy-inc", true);
        add("L3 Tech", "l3-comms-hldgs", true);
        add("Walgreens Boots Alliance", "walgreen-co", false);
        add("Xilinx", "xilinx-inc", true);
        add("Aflac", "aflac-inc", true);
        add("Kellogg", "kellogg-co.", false);
        add("NVIDIA", "nvidia-corp", true);
        add("Cintas", "cintas-corp", true);
        add("Becton Dickinson", "becton-dickinsn", true);
        add("Akamai", "akamai-technologies-inc", false);
        add("Marsh&McLennan", "marsh---mclennan", true);
        add("Altaba", "yahoo-inc", true);
        add("Intel", "intel-corp", true);
        add("Unum", "unum-group", true);
        add("Wyndham", "wyndham-world", true);
        add("Vornado", "vornado-realty", false);
        add("Coca-Cola", "coca-cola-co", false);
        add("Torchmark", "torchmark-corp", true);
        add("Leucadia National", "leucadia-natl", true);
        add("Eli Lilly", "eli-lilly-and-co", false);
        add("Exxon Mobil", "exxon-mobil", false);
        add("Kimberly-Clark", "kimberly-clark", false);
        add("Caterpillar", "caterpillar", true);
        add("Bristol-Myers Squibb", "bristol-myer-squiib", false);
        add("Cisco", "cisco-sys-inc", false);
        add("Loews", "loews-corporation", false);
        add("Abbott Labs", "abbott-laboratories", true);
        add("CR Bard", "c-r-bard", true);
        add("Jacobs Engineering", "jacobs-engineer", true);
        add("McDonald’s", "mcdonalds", true);
        add("Applied materials", "applied-matls-inc", true);
        add("General Mills", "general-mills", false);
        add("CenterPoint Energy", "centerpoint", true);
        add("Hershey", "hershey-co", false);
        add("Aon", "aon-corp", true);
        add("Viacom B", "viacom-cl-b", false);
        add("AutoNation", "autonation-inc", true);
        add("Marathon Oil", "marathon-oil", false);
        add("H&R Block", "h---r-block-inc", false);
        add("Western Digital", "western-digital", true);
        add("Vulcan Materials", "vulcan-matrls", false);
        add("Chubb", "chubb-corp", true);
        add("EOG Resources", "eog-resources", false);
        add("Cigna", "cigna-corp", true);
        add("Noble Energy", "noble-energy", false);
        add("Alibaba", "alibaba", true);
        add("Newmont Mining", "newmont-mining", false);
        add("L Brands", "limited-brands", false);
        add("Biogen Inc", "biogen-idec-inc", false);
        add("microsoft", "microsoft-corp", true);
        add("Occidental", "occidental-petro", false);
        add("Deere&Company", "deere---co", true);
        add("UnitedHealth", "united-health-group", true);
        add("Andeavor", "tesoro", true);
        add("Illinois Tool Works", "illinois-tool-wk-r", true);
        add("WEC Energy", "wisconsin-energy-corp", false);
        add("Ameren", "ameren-corp", true);
        add("Exelon", "exelon-corp", true);
        add("Frontier Communications", "frontier-communications-corp", false);
        add("Under Armour A", "under-armour", false);
        add("Newell Brands", "newell-rubber", false);
        add("Pitney Bowes", "pitney-bowes-inc", false);
        add("Expedia", "expedia", false);
        add("Macy’s Inc", "macys", false);
        add("Henry Schein", "henry-schein", false);
        add("Patterson", "patterson-companies-inc", false);
        add("Mattel", "mattel-inc", false);
        add("CenturyLink", "centurylink", false);
        add("Priceline.com", "priceline.com-inc", false);
        add("Avon Products", "avon-products", false);
        add("The Goodyear Tire&Rubber", "goodyear-tire", false);
        add("DaVita", "davita-inc", false);
        add("McKesson", "mckesson-corp", false);
        add("Flowserve", "flowserve-corp", false);
        add("Alexion", "alexion-pharmaceuticals,-inc.", false);
        add("Zimmer Biomet", "zimmer-hldgs", false);
        add("Discovery", "discovery-holding-co", false);
        add("Cardinal Health", "cardinal-health", false);
        add("Leggett&Platt", "leggett---platt", false);
        add("Ralph Lauren", "polo-ralph-laur", false);
        add("Symantec", "symantec-corp", false);
        add("Time Warner", "time-warner", false);
        add("Nordstrom", "nordstrom-inc", false);
        add("Xerox", "xerox-corp", false);
        add("Scana", "scana-corp", false);
        add("CVS Health Corp", "cvs-corp", false);
        add("Merck&Co", "merck---co", false);
        add("Baidu", "baidu.com", true);
        add("Archer-Daniels-Midland", "archer-daniels-mid", false);
        add("Bed Bath&Beyond", "bed-bath---beyond-inc", false);
        add("Hasbro", "hasbro-inc", false);
        add("Cleveland-Cliffs", "cleveland-cliffs", false);
        add("momo", "momo-inc", false);
        add("Humana", "humana-inc", true);
        add("Omnicom", "omnicom-gp-inc", false);
        add("Cerner", "cerner-corporatio", true);
        add("IPG", "interpublic-grp", false);
        add("Verizon", "verizon-communications", false);
        add("Gilead", "gilead-sciences-inc", false);
        add("Tesla", "tesla-motors", true);
        add("Southwest Airlines", "sth-west-airlines", true);
        add("Rockwell Automation", "rockwell-automat", true);
        add("General Motors", "gen-motors", true);
        add("Emerson", "emerson-elec", true);
        add("Alcoa", "alcoa", true);
        add("Harley-Davidson", "harley-davidson", false);
        add("Ingersoll-Rand", "ingersoll-rand", true);
        add("Stericycle", "stericycle-inc", false);
        add("Allergan", "actavis", false);
        add("General Electric", "general-electric", false);
        add("United Parcel Service", "united-parcel", false);
        add("Gap", "gap.inc", false);
        add("Target", "target", false);
        add("AMD", "adv-micro-device", true);
        add("Tapestry", "coach", false);
        add("Delta Air Lines", "delta-air-lines-new", false);
        add("Charter Communications", "charter-communications", true);
        add("Zions", "zions-bancorp", true);
        add("Scripps Networks", "scripps-networks-interactive", true);
        add("Cummins", "cummins-inc", true);
        add("AIG", "american-intl-group", false);
        add("Ball", "ball-corp", false);
        add("Sysco", "sysco-corp", false);
        add("TJX", "tjx-co-inc", false);
        add("International Paper", "intl-paper-co", true);
        add("XL Group", "xl-capital-ltd", false);
        add("Invesco", "invesco-ltd", true);
        add("Comerica", "comerica-inc", true);
        add("Fidelity National Info", "fidelity-natl-in", false);
        add("MetLife", "metlife-inc", false);
        add("Ryder System", "ryder-system-inc", false);
        add("Tata Motors ADR", "tata-motors", false);
        add("Lowe’s", "lowes-companies", false);
        add("Huntington Bancshares", "huntgtn-bkshr", true);
        add("Cincinnati Financial", "cincinnati-fin", false);
        add("Simon Property", "simon-prop-grp", false);
        add("Franklin Resources", "franklin-res", true);
        add("jp-morgan", "jp-morgan-chase", true);
        add("Capital One Financial", "capital-one", true);
        add("M&T Bank", "m-t-bank-corp", true);
        add("Tiffany&Co", "tiffany---co", true);
        add("ONEOK", "oneok", false);
        add("The AES", "aes-corp", false);
        add("JB Hunt", "j.b.-hunt-transpo", true);
        add("Bank of America", "bank-of-america", true);
        add("State Street", "state-street", true);
        add("Wells Fargo&Co", "wells-fargo", true);
        add("FedEx", "fedex-corp", true);
        add("Morgan Stanley", "morgan-stanley", true);
        add("Philip Morris", "philip-morris-intl", false);
        add("CarMax", "carmax-inc", true);
        add("Medtronic", "medtronic", false);
        add("ICE", "intercontintlex", true);
        add("Urban Outfitters", "urban-outfitters", false);
        add("US Bancorp", "us-bancorp", false);
        add("Molson Coors Brewing", "molson-coors", false);
        add("Assurant", "assurant", true);
        add("BB&T", "bb-t-corp", true);
        add("Genuine Parts", "genuine-parts-co", false);
        add("IFF", "intl-flav---frag", false);
        add("Pacific Gas&Electric", "pacific-gas-electric", false);
        add("Boston Scientific", "boston-scien-cp", true);
        add("Dun&Bradstreet", "dun---bradstreet", false);
        add("United Continental", "united-continenta", false);
        add("Norfolk Southern", "norfolk-southern", true);
        add("KeyCorp", "keycorp-new", true);
        add("PNC Financial", "pnc-fin-serv", true);
        add("ICICI Bank ADR", "icici-bank", false);
        add("DuPont", "du-pont", true);
        add("McCormick&Co", "mccormick---co", false);
        add("Monsanto", "monsanto", true);
        add("T Rowe", "t-rowe-price-gp", true);
        add("Johnson Controls", "johnson-controls", false);
        add("Dr Reddys Labs", "dr.-reddys-laboratories", false);
        add("Nucor", "nucor", false);
        add("3M", "3m-co", true);
        add("Regions Financial", "regions-fin", true);
        add("Citigroup", "citigroup", true);
        add("Vertex Pharma", "vertex-pharm", true);
        add("Marriott Int", "marriott-intl", true);
        add("Fifth Third", "fifth-third-bk", true);
        add("Equifax", "equifax-inc", false);
        add("Northern Trust", "northern-trust", true);
        add("Microchip", "microchip-technology-inc", true);
        add("Ford Motor", "ford-motor-co", false);
        add("Netflix", "netflix,-inc.", true);
        add("Chipotle Mexican Grill", "chipotle-mexican-grill-inc", false);
        add("PPL", "ppl-corp", false);
        add("Republic Services", "republic-services-inc", true);
        add("AT&T", "at-t", false);
        add("Owens-Illinois", "owens-illinois-inc", true);
        add("Southern", "southern-co", false);
        add("PPG Industries", "ppg-industries", true);
        add("Masco", "masco-corp", true);
        add("Whirlpool", "whirl-pool-corp", false);
        add("The Charles Schwab", "charles-schwab", true);
        add("Quest Diagnostics", "quest-diag", false);
        add("PACCAR", "paccar-inc", true);
        add("eBay", "ebay-inc", true);
        add("Williams", "williams-cos", false);
        add("Discover", "discover-financl", false);
        add("General Dynamics", "general-dynam", true);
        add("Ecolab", "ecolab-inc", false);
        add("Bank of NY Mellon", "bk-of-ny", false);
        add("JM Smucker", "jm-smucker-co", false);
        add("Pfizer", "pfizer", false);
        add("CME Group", "cme-group-inc.", true);
        add("Snap-On", "snapon-inc", false);
        add("E-TRADE", "etrade-fincl-cp", true);
        add("IBM", "ibm", false);
        add("Dr Pepper Snapple", "dr-pepper-snapple", false);
        add("Amgen", "amgen-inc", true);
        add("Ameriprise Financial", "ameriprise-fincl", true);
        add("CA", "ca-inc", false);
        add("Hartford", "hartford-finl", true);
        add("American Express", "american-express", true);
        add("Juniper", "juniper-networks-inc", false);
        add("Waters", "waters-corp", true);
        add("Illumina Inc", "illumina,-inc.", true);
        add("BlackRock", "blackrock,-inc.-c", true);
        add("celgene", "celgene-corp", false);
        add("Rockwell Collins", "rockwe-coll", true);
        add("Ross Stores", "ross-stores-inc", false);
        add("United Technologies", "united-tech", false);
        add("Nasdaq Inc", "nasdaq-omx-group", false);
        add("Agilent Technologies", "agilent-tech", true);
        add("Sherwin-Williams", "sherwinwilliams", true);
        add("Procter&Gamble", "procter-gamble", false);
        add("Edwards Lifesciences", "edward-lifescience", false);
    }

    function add(name, url, isPositiveStock) {
        var id = url.replace(/[.,!]/g, "");
        _stocks.push({
            name: name,
            url: urlBase + url,
            id: id,
            isPositiveStock: isPositiveStock
        });
    }

    function getByUrl(url) {
        return _stocks.find(function (s) {
            return s.url == url;
        });
    }

    function getChangesForStockList() {
        var usaStocks = AllUsaStocks.getAll();
        var usaSpbStocks = [];

        usaStocks.forEach(function (usaStock) {
            if (SpbStockList.stockExistsByName(usaStock.shortName)) {
                usaSpbStocks.push(usaStock);
            }
        });

        showStockChanges(usaSpbStocks);
    }

    function showStockChanges(newStockList) {
        showStocksToRemove(newStockList);
        showStocksToAdd(newStockList);
    }

    function showStocksToRemove(newStockList) {
        console.log('\n\n Stocks to remove from File. Needt to investigate the reason \n\n');

        getAll().forEach(function (favouriteStock) {
            if (!newStockList.find(function (s) {
                return s.url == favouriteStock.url;
            })) {
                console.log("To remove: " + favouriteStock.url);
            }
        });
    }

    function showStocksToAdd(newStockList) {
        console.log('\n\n Stocks to add \n\n');

        var stocksToAddScript = "";

        newStockList.forEach(function (newStock) {
            if (!getByUrl(newStock.url)) {
                var shortUrl = newStock.url.replace(urlBase, "");
                stocksToAddScript += "add(\"" + newStock.name + "\", \"" + shortUrl + "\");\n";
            }
        });

        console.log(stocksToAddScript);
    }

    ctor();
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FavouriteStocksAnalyzerStorageHelper").asCtor(FavouriteStocksAnalyzerStorageHelper).dependencies("InvestingConsts");

function FavouriteStocksAnalyzerStorageHelper(InvestingConsts) {
    this.saveItemInStorage = saveItemInStorage;
    this.getStorageData = getStorageData;
    this.saveData = saveData;
    this.clearPreviousData = clearPreviousData;

    var storageKey = InvestingConsts.favouriteStocksStatisticsLocalStorageKey;

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


_investStocks.ctx.register("FinamMainStockInfoLoadingStrategy").asCtor(FinamMainStockInfoLoadingStrategy).dependencies("FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper");

function FinamMainStockInfoLoadingStrategy(FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper) {
    this.getStrategy = getStrategy;

    function getStrategy() {
        return {
            name: "main",
            getUrl: function getUrl(url) {
                return url;
            },
            loadData: attachMainStockInfo,
            getRate: getRate
        };
    }

    function getRate(stock) {
        var yearRate = stock.yearRate;
        var riskRate = 0.0125 * yearRate + 0.5;

        return yearRate * riskRate;
    }

    function attachMainStockInfo(item) {
        item.technicalSummary = getMinimalEstimation();
        item.stockPrice = getStockPrice();
        item.yearRate = getYearRate();

        item.mainDataCollected = true;
        FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(item);
    }

    function getMinimalEstimation() {
        // todo move to separate module
        var hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        var dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();

        return FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);
    }

    function getStockPrice() {
        return parseFloat($('#last_last').html().replace(".", "").replace(",", "."));
    }

    function getYearRate() {
        if ($('#leftColumn').find('> div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_1').html() == "Изменение за год") {
            var rateWithPercent = $('#leftColumn').find('> div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_2.bold').html();

            return parseFloat(rateWithPercent.slice(0, -1).replace(/[ ]/g, '').replace(",", "."));
        }
    }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FinamHistoricalStockInfoLoadingStrategy").asCtor(FinamHistoricalStockInfoLoadingStrategy).dependencies("FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper");

function FinamHistoricalStockInfoLoadingStrategy(FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper) {
    this.getStrategy = getStrategy;

    function getStrategy() {
        return {
            name: "historical",
            getUrl: function getUrl(url) {
                return url + "-historical-data";
            },
            loadData: attachHistoricalStockInfo,
            getRate: getRate
        };
    }

    function getRate(stock) {
        return stock.historicalData.percentTenDaysFall + 1;
    }

    function attachHistoricalStockInfo(item) {
        var rows = $('.historicalTbl tbody tr');
        if (rows.length < 15) throw "Rows count should be more than 15 for historical data. Something went wrong...";

        item.historicalData = {};

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            item.historicalData[i] = {
                maxPrice: parseFloat($($(row).find('td')[3]).html().replace('.', '').replace(',', '.'))
            };
        }

        item.historicalData.maxLastTenDaysPrice = item.historicalData[0].maxPrice;
        for (var _i = 1; _i < 10; _i++) {
            if (item.historicalData.maxLastTenDaysPrice < item.historicalData[_i].maxPrice) item.historicalData.maxLastTenDaysPrice = item.historicalData[_i].maxPrice;
        }

        item.historicalData.percentTenDaysFall = item.historicalData.maxLastTenDaysPrice > item.stockPrice ? Math.round((item.historicalData.maxLastTenDaysPrice - item.stockPrice) / item.stockPrice * 100 * 100) / 100 : 0;

        item.historicalDataCollected = true;
        FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(item);
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FavouriteStocksAnalyzer").asCtor(FavouriteStocksAnalyzer).dependencies("FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations," + "FinamMainStockInfoLoadingStrategy, FinamHistoricalStockInfoLoadingStrategy, FavouriteStocksAnalyzerStorageHelper");

function FavouriteStocksAnalyzer(FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations, FinamMainStockInfoLoadingStrategy, FinamHistoricalStockInfoLoadingStrategy, FavouriteStocksAnalyzerStorageHelper) {
    this.run = run;
    this.loadData = loadData;
    this.showStatistics = showStatistics;
    this.setInitialDistribution = setInitialDistribution;

    var loadingDataStrategies = [FinamMainStockInfoLoadingStrategy.getStrategy(), FinamHistoricalStockInfoLoadingStrategy.getStrategy()];

    function run(collectProfitableStock) {
        FavouriteStocksAnalyzerStorageHelper.clearPreviousData();
        setInitialData(collectProfitableStock);
        loadData();
    }

    function getNextStrategy() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = loadingDataStrategies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var strategy = _step.value;

                if (hasNotLoadedItems(strategy.name)) return strategy;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    function loadData() {
        var strategy = getNextStrategy();
        if (!strategy) {
            showStatistics();
            return;
        }

        var itemToLoad = getNotLoadedItem(strategy.name);

        if (location.href != strategy.getUrl(itemToLoad.url)) {
            location.href = strategy.getUrl(itemToLoad.url);
        } else {
            strategy.loadData(itemToLoad);

            var nextStrategy = getNextStrategy();

            if (nextStrategy) {
                itemToLoad = getNotLoadedItem(nextStrategy.name);
                location.href = nextStrategy.getUrl(itemToLoad.url);
            } else {
                setInitialDistribution();
                showStatistics();
            }
        }
    }

    function setInitialDistribution() {
        var items = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        if (!items || !items.length) {
            return;
        }

        items = items.sort(sortStocksByPriority);

        for (var i = 0; i < 5; i++) {
            items[i].inPortfolio = true;
        }FavouriteStocksAnalyzerStorageHelper.saveData(items);
    }

    function showStatistics() {
        var items = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        if (!items.length) {
            return;
        }

        splitMoneyByChoosenStocks(items);

        var itemsHtml = items.map(function (i) {
            return "<tr>" + "<td><a href='" + i.url + "'>" + i.name + "</a></td>" + "<td>" + FinamStockRecommendationTypes.convertRecommendationToString(i.technicalSummary) + "</td>" + "<td>" + i.stockPrice + "</td>" + "<td>" + i.yearRate + "</td>" + "<td>-" + i.historicalData.percentTenDaysFall + "%</td>" + "<td>" + (i.countToBuy || "") + "</td>" + "<td><input type='checkbox' id='" + i.id + "'/></td>" + "</tr>";
        });
        var resultHtml = "<div class='stock-recommedations'><table>" + "<tr>" + "<th>Название</th>" + "<th>Тех. рекомендация</th>" + "<th>Цена</th>" + "<th>Годовой рост</th>" + "<th>10дн падение</th>" + "<th>Позиция</th>" + "<th>Участие</th>" + "</tr>" + itemsHtml.join('') + "<tr><td colspan='7'>Расчет по портфелю: " + FinamFavouriteStocks.portfolioVolume + "$</td></td></tr>" + "<tr><td colspan='7'>Остаток средств: " + parseInt(getAvailabeDollarsAmount(items)) + "$</td></td></tr>" + "<tr><td colspan='7'>" + "<button id='close-favourite-stocks-report'>Очистить</button>" + "<button id='do-initial-sort'>Исходная сортировка</button>" + "</td></tr>" + "</table></div>";
        $('body').html(resultHtml);

        CssStockRecommendations.appendStyle();
        initializeCheckBoxes(items);
        initializeButtonsEvents();
    }

    function initializeButtonsEvents() {
        $('#close-favourite-stocks-report').unbind('click');
        $('#close-favourite-stocks-report').bind('click', function () {
            FavouriteStocksAnalyzerStorageHelper.clearPreviousData();
        });

        $('#do-initial-sort').unbind('click');
        $('#do-initial-sort').bind('click', function () {
            debugger;
            setInitialDistribution();
        });
    }

    function initializeCheckBoxes(items) {
        items.forEach(function (i) {
            if (i.countToBuy) {
                $('#' + i.id).attr('checked', 'checked');
            }
            $('#' + i.id).unbind('click');
            $('#' + i.id).bind('click', function (el) {
                var items = FavouriteStocksAnalyzerStorageHelper.getStorageData();
                var id = $(el.currentTarget).attr('id');
                var stock = items.find(function (e) {
                    return e.id == id;
                });
                stock.inPortfolio = $(el.currentTarget).is(':checked');
                FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(stock);
                showStatistics();
            });
        });
    }

    function sortStocksByPriority(a, b) {
        // todo move to extra module
        debugger;
        return getStockGainPriorityRate(a) < getStockGainPriorityRate(b) ? 1 : -1;
    }

    function getStockGainPriorityRate(stock) {
        return loadingDataStrategies.reduce(function (totalRate, currentStrategy) {
            return totalRate * currentStrategy.getRate(stock);
        }, 1);
    }

    function splitMoneyByChoosenStocks(items) {
        var curVolume = FinamFavouriteStocks.portfolioVolume;
        var positionsCount = items.filter(function (item) {
            return item.inPortfolio;
        }).length;
        var perStock = curVolume / positionsCount;

        var sum = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (!item.inPortfolio) continue;

            item.countToBuy = parseInt(perStock / item.stockPrice);
            sum += item.countToBuy * item.stockPrice;
        }

        var portfolioChanged = true;
        while (portfolioChanged) {
            portfolioChanged = false;

            for (var _i = 0; _i < items.length; _i++) {
                var _item = items[_i];

                if (!_item.inPortfolio) continue;

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

    function hasNotLoadedItems(type) {
        return getNotLoadedItem(type) != null;
    }

    function getNotLoadedItem(type) {
        var propName = type + "DataCollected";
        return FavouriteStocksAnalyzerStorageHelper.getStorageData().find(function (s) {
            return !s[propName];
        });
    }

    function setInitialData(collectProfitableStock) {
        var dataToCollect = FinamFavouriteStocks.getAll(collectProfitableStock).map(function (s) {
            s.mainDataCollected = false;
            return s;
        });

        FavouriteStocksAnalyzerStorageHelper.saveData(dataToCollect);
    }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FinamStockRecommendationTypes").asCtor(FinamStockRecommendationTypes);

function FinamStockRecommendationTypes() {
    var _this = this;

    this.recommendationTypes = getRecommendationTypes();
    this.getMinimalEstimation = getMinimalEstimation;
    this.convertRecommendationToString = convertRecommendationToString;

    function getMinimalEstimation(types) {
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
/* 17 */
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
        return '\n        .stock-recommedations tr {       font-size: 16px;   font-family: cursive;        }\n        .stock-recommedations td,.stock-recommedations th {\n                padding:5px 0 0 15px}\n\n            .stock-recommedations table {position: relative;text-align: left;margin: auto;}\n\n            .stock-recommedations  tr,.stock-recommedations th, .stock-recommedations td {\n                border: 1px solid;\n            }\n\n            .stock-recommedations th {\n                font-weight: 800;\n            }        \n        ';
    }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("InvestingAvailablefunctions").asCtor(InvestingAvailablefunctions);

function InvestingAvailablefunctions() {
    this.getAll = getAll;

    function getAll() {
        console.log("\n1) Sort your favourite list of stocks by technical recommendations. Run:\n_investStocks.ctx.get('FavouriteStocksAnalyzer').run(true);\n\n2) Get filtered USA stocks (filter by day, mont, year gain). \nGo to page Page: https://ru.investing.com/equities/united-states and run:\n_investStocks.ctx.get('LoadYearStatistics').load();  \n\n3) Get all stocks from spb exchange \nGo to page Page: http://www.spbexchange.ru/ru/stocks/inostrannye/Instruments.aspx and run:\n_investStocks.ctx.get('GetSpbStockList').getAllStocks(); \n\n4) get all usa stock list\nGo to page https://ru.investing.com/equities/united-states and run \n_investStocks.ctx.get('InvestingStockListRetreiver').getAllUsaStocks(); \n\n5) get cahnges on favourite stock list\nrun\n_investStocks.ctx.get('FinamFavouriteStocks').getChangesForStockList();\n\n6) to get new favourite stock list\nbuild statistics for all your favourite stocks\nrun\n_investStocks.ctx.get('FavouriteStocksFiltering').createRefreshedFavouriteStockList();\n        ");
    }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("GetSpbStockList").asCtor(GetSpbStockList);

function GetSpbStockList() {
    var _this = this;

    this.getAllStocks = getAllStocks;

    function getAllStocks() {
        var data = [];
        var urls = [];

        for (var i = 1; i < 10; i++) {
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl0' + i;
            urls.push(url);
        }
        for (var i = 10; i < 21; i++) {
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl' + i;
            urls.push(url);
        }
        for (var i = 2; i < 10; i++) {
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl0' + i;
            urls.push(url);
        }
        for (var i = 10; i < 17; i++) {
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl' + i;
            urls.push(url);
        }

        appendStocksData(data);
        debugger;
        collectByUrls(urls, data, urlsCollectedCallback);
    }

    function urlsCollectedCallback(data) {
        data = data.filter(function (e) {
            return e.name;
        });

        console.log(data);

        var scriptStockCreator = "";
        data.forEach(function (stock) {
            scriptStockCreator += "addStock(\"" + stock.shortName + "\", \"" + stock.name + "\");\n";
        });
        console.log(scriptStockCreator);
    }

    function collectByUrls(urls, data, callback) {

        if (!urls.length) {
            callback(data);

            return;
        }

        var url = urls.shift();
        __doPostBack(url, '');

        setTimeout(function () {
            appendStocksData(data);
            collectByUrls(urls, data, callback);
        }, 400);
    }

    function appendStocksData(data) {
        var rows = $('.izmen_info tbody tr');

        for (var i = 0; i < rows.length; i++) {
            var e = rows[i];
            var obj = {
                shortName: $($($(e).find('td')[1]).find('a')).html(),
                name: $($(e).find('td')[2]).html()
            };
            data.push(obj);
        }
    }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("SpbStockList").asCtor(SpbStockList);

function SpbStockList() {
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
        addStock("A", "Agilent Technologies, Inc.");
        addStock("AA", "Alcoa Corporation");
        addStock("AABA", "Altaba Inc.");
        addStock("AAL", "American Airlines Group Inc.");
        addStock("AAP", "Advance Auto Parts, Inc.");
        addStock("AAPL", "Apple Inc.");
        addStock("ABBN", "Акционерное общество Банк Астаны");
        addStock("ABBV", "AbbVie Inc.");
        addStock("ABT", "Abbott Laboratories");
        addStock("ACH", "The Bank of New York Mellon");
        addStock("ACN", "Accenture plc");
        addStock("ADBE", "Adobe Systems Incorporated");
        addStock("ADI", "Analog Devices, Inc.");
        addStock("ADM", "Archer-Daniels-Midland Company");
        addStock("ADP", "Automatic Data Processing, Inc.");
        addStock("ADS", "Alliance Data Systems Corporation");
        addStock("ADSK", "Autodesk, Inc.");
        addStock("AEE", "Ameren Corporation");
        addStock("AES", "The AES Corporation");
        addStock("AET", "Aetna Inc.");
        addStock("AFL", "Aflac Incorporated");
        addStock("AGN", "Allergan plc");
        addStock("AIG", "American International Group, Inc.");
        addStock("AIV", "Apartment Investment &amp; Management Company");
        addStock("AIZ", "Assurant, Inc.");
        addStock("AJG", "Arthur J. Gallagher &amp; Co.");
        addStock("AKAM", "Akamai Technologies, Inc.");
        addStock("AKZM", "“Aktobe Metalware Plant” JSC");
        addStock("ALB", "Albemarle Corporation");
        addStock("ALGN", "Align Technology, Inc.");
        addStock("ALK", "Alaska Air Group, Inc.");
        addStock("ALL", "The Allstate Corporation");
        addStock("ALLE", "Allegion Public Limited Company");
        addStock("ALXN", "Alexion Pharmaceuticals, Inc.");
        addStock("AMAT", "Applied Materials, Inc.");
        addStock("AMD", "Advanced Micro Devices, Inc.");
        addStock("AME", "AMETEK, Inc.");
        addStock("AMG", "Affiliated Managers Group, Inc.");
        addStock("AMGN", "Amgen Inc.");
        addStock("AMP", "Ameriprise Financial, Inc.");
        addStock("AMT", "American Tower Corporation");
        addStock("AMZN", "Amazon.com, Inc.");
        addStock("AN", "AutoNation, Inc.");
        addStock("ANDV", "Andeavor");
        addStock("ANSS", "ANSYS, Inc.");
        addStock("ANTM", "Anthem, Inc.");
        addStock("AON", "Aon plc");
        addStock("APA", "Apache Corporation");
        addStock("APC", "Anadarko Petroleum Corporation");
        addStock("APD", "Air Products &amp; Chemicals, Inc.");
        addStock("APH", "Amphenol Corporation");
        addStock("ARE", "Alexandria Real Estate Equities, Inc.");
        addStock("ARNC", "Arconic Inc.");
        addStock("ATVI", "Activision Blizzard, Inc.");
        addStock("AVB", "AvalonBay Communities, Inc.");
        addStock("AVGO", "Broadcom Limited");
        addStock("AVP", "Avon Products, Inc.");
        addStock("AVY", "Avery Dennison Corporation");
        addStock("AXP", "American Express Company");
        addStock("AYI", "Acuity Brands, Inc.");
        addStock("AZO", "AutoZone, Inc.");
        addStock("BA", "THE BOEING COMPANY");
        addStock("BABA", "Citibank, N.A.");
        addStock("BAC", "Bank of America Corporation");
        addStock("BAST", "JSC “BAST”");
        addStock("BAX", "Baxter International Inc.");
        addStock("BBBY", "Bed Bath &amp; Beyond Inc.");
        addStock("BBT", "BB&amp;T Corporation");
        addStock("BBY", "Best Buy Co., Inc.");
        addStock("BCR", "C.R. Bard, Inc.");
        addStock("BDX", "Becton, Dickinson and Company");
        addStock("BEN", "Franklin Resources, Inc.");
        addStock("BF.B", "Brown-Forman Corporation");
        addStock("BHF", "Brighthouse Financial, Inc.");
        addStock("BHGE", "Baker Hughes, a GE company");
        addStock("BIDU", "The Bank of New York Mellon");
        addStock("BIIB", "Biogen Inc.");
        addStock("BK", "The Bank of New York Mellon Corporation");
        addStock("BLK", "BlackRock, Inc.");
        addStock("BLL", "Ball Corporation");
        addStock("BMY", "Bristol-Myers Squibb Company");
        addStock("BRK.B", "Berkshire Hathaway Inc.");
        addStock("BSX", "Boston Scientific Corporation");
        addStock("BTI", "Citibank, N.A.");
        addStock("BWA", "BorgWarner Inc.");
        addStock("BXP", "Boston Properties, Inc.");
        addStock("C", "Citigroup Inc.");
        addStock("CA", "CA, Inc.");
        addStock("CAG", "Conagra Brands, Inc.");
        addStock("CAH", "Cardinal Health, Inc.");
        addStock("CAT", "Caterpillar Inc.");
        addStock("CB", "Chubb Limited");
        addStock("CBG", "CBRE Group, Inc.");
        addStock("CBOE", "Cboe Global Markets, Inc.");
        addStock("CBPO", "China Biologic Products Holdings, Inc.");
        addStock("CBS", "CBS Corporation");
        addStock("CCI", "Crown Castle International Corp.");
        addStock("CCL", "Carnival Corporation");
        addStock("CELG", "Celgene Corporation");
        addStock("CERN", "Cerner Corporation");
        addStock("CF", "CF Industries Holdings, Inc.");
        addStock("CFG", "Citizens Financial Group, Inc.");
        addStock("CHD", "Church &amp; Dwight Co., Inc.");
        addStock("CHK", "Chesapeake Energy Corporation");
        addStock("CHL", "The Bank of New York Mellon");
        addStock("CHRW", "C.H. Robinson Worldwide, Inc.");
        addStock("CHTR", "Charter Communications, Inc.");
        addStock("CI", "Cigna Corporation");
        addStock("CINF", "Cincinnati Financial Corporation");
        addStock("CL", "Colgate-Palmolive Company");
        addStock("CLF", "Cleveland-Cliffs Inc.");
        addStock("CLX", "The Clorox Company");
        addStock("CMA", "Comerica Incorporated");
        addStock("CMCSA", "Comcast Corporation");
        addStock("CME", "CME Group Inc.");
        addStock("CMG", "Chipotle Mexican Grill, Inc.");
        addStock("CMI", "Cummins Inc.");
        addStock("CMS", "CMS Energy Corporation");
        addStock("CNC", "Centene Corporation");
        addStock("CNP", "CenterPoint Energy, Inc.");
        addStock("COF", "Capital One Financial Corporation");
        addStock("COG", "Cabot Oil &amp; Gas Corporation");
        addStock("COL", "Rockwell Collins, Inc.");
        addStock("COO", "The Cooper Companies, Inc.");
        addStock("COP", "ConocoPhillips");
        addStock("COST", "Costco Wholesale Corporation");
        addStock("CPB", "Campbell Soup Company");
        addStock("CRM", "salesforce.com, inc.");
        addStock("CSCO", "Cisco Systems, Inc.");
        addStock("CSRA", "CSRA Inc.");
        addStock("CTAS", "Cintas Corporation");
        addStock("CTL", "CenturyLink, Inc.");
        addStock("CTSH", "Cognizant Technology Solutions Corporation");
        addStock("CTXS", "Citrix Systems, Inc.");
        addStock("CVS", "CVS Health Corporation");
        addStock("CVX", "Chevron Corporation");
        addStock("CXO", "Concho Resources Inc.");
        addStock("DAL", "Delta Air Lines Inc");
        addStock("DE", "Deere &amp; Company");
        addStock("DFS", "Discover Financial Services");
        addStock("DG", "Dollar General Corporation");
        addStock("DGX", "Quest Diagnostics Incorporated");
        addStock("DHI", "D.R. Horton, Inc.");
        addStock("DHR", "Danaher Corporation");
        addStock("DIS", "The Walt Disney Company");
        addStock("DISCA", "Discovery Communications, Inc.");
        addStock("DISCK", "Discovery Communications, Inc.");
        addStock("DLPH", "Delphi Automotive PLC");
        addStock("DLR", "Digital Realty Trust, Inc.");
        addStock("DLTR", "Dollar Tree, Inc.");
        addStock("DNB", "The Dun &amp; Bradstreet Corporation");
        addStock("DOV", "Dover Corporation");
        addStock("DPS", "Dr Pepper Snapple Group, Inc.");
        addStock("DRI", "Darden Restaurants, Inc.");
        addStock("DVA", "DaVita Inc.");
        addStock("DVN", "Devon Energy Corporation");
        addStock("DWDP", "DowDuPont Inc.");
        addStock("DXC", "DXC Technology Company");
        addStock("EA", "Electronic Arts Inc.");
        addStock("EBAY", "eBay Inc.");
        addStock("ECL", "Ecolab Inc.");
        addStock("ED", "Consolidated Edison, Inc.");
        addStock("EFX", "Equifax Inc.");
        addStock("EIX", "Edison International");
        addStock("EL", "The Estee Lauder Companies Inc.");
        addStock("EMN", "Eastman Chemical Company");
        addStock("EMR", "Emerson Electric Co.");
        addStock("ENDP", "Endo International PLC");
        addStock("EOG", "EOG Resources, Inc.");
        addStock("EQIX", "Equinix, Inc.");
        addStock("EQT", "EQT Corporation");
        addStock("ES", "Eversource Energy");
        addStock("ESS", "Essex Property Trust, Inc.");
        addStock("ETFC", "E*TRADE Financial Corporation");
        addStock("ETN", "Eaton Corporation plc");
        addStock("EVHC", "Envision Healthcare Corporation");
        addStock("EW", "Edwards Lifesciences Corporation");
        addStock("EXC", "Exelon Corporation");
        addStock("EXPD", "Expeditors International of Washington, Inc.");
        addStock("EXPE", "Expedia, Inc.");
        addStock("EXR", "Extra Space Storage Inc.");
        addStock("F", "Ford Motor Company");
        addStock("FAST", "Fastenal Company");
        addStock("FB", "Facebook, Inc.");
        addStock("FBHS", "Fortune Brands Home &amp; Security, Inc.");
        addStock("FCX", "Freeport-McMoRan Inc.");
        addStock("FDX", "FedEx Corporation");
        addStock("FFIV", "F5 Networks, Inc.");
        addStock("FIS", "Fidelity National Information Services, Inc.");
        addStock("FISV", "Fiserv, Inc.");
        addStock("FITB", "Fifth Third Bancorp");
        addStock("FLIR", "FLIR Systems, Inc.");
        addStock("FLR", "Fluor Corporation");
        addStock("FLS", "Flowserve Corporation");
        addStock("FMC", "FMC Corporation");
        addStock("FOX", "Twenty-First Century Fox, Inc.");
        addStock("FOXA", "Twenty-First Century Fox, Inc.");
        addStock("FSLR", "First Solar, Inc.");
        addStock("FTI", "TechnipFMC plc");
        addStock("FTR", "Frontier Communications Corporation");
        addStock("FTV", "Fortive Corporation");
        addStock("GD", "General Dynamics Corporation");
        addStock("GE", "General Electric Company");
        addStock("GGP", "GGP Inc.");
        addStock("GILD", "GILEAD SCIENCES, INC.");
        addStock("GIS", "General Mills, Inc.");
        addStock("GLW", "Corning Incorporated");
        addStock("GM", "General Motors Company");
        addStock("GOOG", "Alphabet Inc.");
        addStock("GOOGL", "Alphabet Inc.");
        addStock("GPC", "Genuine Parts Company");
        addStock("GPN", "Global Payments Inc.");
        addStock("GPS", "The Gap, Inc.");
        addStock("GRMN", "Garmin Ltd.");
        addStock("GS", "The Goldman Sachs Group, Inc.");
        addStock("GT", "The Goodyear Tire &amp; Rubber Company");
        addStock("GWW", "WW Grainger, Inc.");
        addStock("HAL", "Halliburton Company");
        addStock("HAS", "Hasbro, Inc.");
        addStock("HBAN", "Huntington Bancshares Incorporated");
        addStock("HBI", "Hanesbrands Inc.");
        addStock("HCA", "HCA Healthcare, Inc.");
        addStock("HCN", "Welltower Inc.");
        addStock("HCP", "HCP, Inc.");
        addStock("HD", "The Home Depot, Inc.");
        addStock("HES", "Hess Corporation");
        addStock("HIG", "The Hartford Financial Services Group, Inc.");
        addStock("HLT", "Hilton Worldwide Holdings Inc.");
        addStock("HOG", "Harley-Davidson, Inc.");
        addStock("HOLX", "Hologic, Inc.");
        addStock("HON", "Honeywell International Inc.");
        addStock("HP", "Helmerich &amp; Payne, Inc.");
        addStock("HPE", "Hewlett Packard Enterprise Company");
        addStock("HPQ", "HP Inc.");
        addStock("HRB", "H&amp;R Block, Inc.");
        addStock("HRL", "Hormel Foods Corporation");
        addStock("HRS", "Harris Corporation");
        addStock("HSIC", "Henry Schein, Inc.");
        addStock("HST", "Host Hotels &amp; Resorts, Inc.");
        addStock("HSY", "The Hershey Company");
        addStock("HUM", "Humana Inc.");
        addStock("IBM", "International Business Machines Corporation");
        addStock("IBN", "Deutsche Bank Trust Company Americas");
        addStock("ICE", "Intercontinental Exchange, Inc.");
        addStock("IDXX", "IDEXX Laboratories, Inc.");
        addStock("IFF", "International Flavors &amp; Fragrances Inc.");
        addStock("ILMN", "Illumina, Inc.");
        addStock("INCY", "Incyte Corporation");
        addStock("INFO", "IHS Markit Ltd.");
        addStock("INTC", "Intel Corporation");
        addStock("INTU", "Intuit Inc.");
        addStock("IP", "International Paper Company");
        addStock("IPG", "The Interpublic Group of Companies, Inc.");
        addStock("IR", "Ingersoll-Rand public limited company");
        addStock("IRM", "Iron Mountain Incorporated");
        addStock("ISRG", "Intuitive Surgical, Inc.");
        addStock("IT", "Gartner, Inc.");
        addStock("ITW", "Illinois Tool Works Inc.");
        addStock("IVZ", "Invesco Ltd.");
        addStock("JBHT", "JB Hunt Transport Services, Inc.");
        addStock("JCI", "Johnson Controls International plc");
        addStock("JD", "Deutsche Bank Trust Company Americas");
        addStock("JEC", "Jacobs Engineering Group Inc.");
        addStock("JNJ", "Johnson &amp; Johnson");
        addStock("JNPR", "Juniper Networks, Inc.");
        addStock("JPM", "JPMorgan Chase &amp; Co.");
        addStock("JWN", "Nordstrom, Inc.");
        addStock("K", "Kellogg Company");
        addStock("KEP", "Citibank, N.A.");
        addStock("KEY", "KeyCorp");
        addStock("KHC", "The Kraft Heinz Company");
        addStock("KIM", "Kimco Realty Corporation");
        addStock("KLAC", "KLA-Tencor Corporation");
        addStock("KMB", "Kimberly-Clark Corporation");
        addStock("KMI", "Kinder Morgan, Inc.");
        addStock("KMX", "CarMax, Inc.");
        addStock("KO", "THE COCA-COLA COMPANY");
        addStock("KORS", "Michael Kors Holdings Limited");
        addStock("KR", "The Kroger Co.");
        addStock("KSU", "Kansas City Southern");
        addStock("L", "Loews Corporation");
        addStock("LB", "L Brands, Inc.");
        addStock("LEG", "Leggett &amp; Platt, Incorporated");
        addStock("LEN", "Lennar Corporation");
        addStock("LH", "Laboratory Corporation of America Holdings");
        addStock("LKQ", "LKQ Corporation");
        addStock("LLL", "L3 Technologies, Inc.");
        addStock("LLY", "Eli Lilly and Company");
        addStock("LM", "Legg Mason, Inc.");
        addStock("LMT", "Lockheed Martin Corporation");
        addStock("LNT", "Alliant Energy Corporation");
        addStock("LOW", "Lowe's Companies, Inc.");
        addStock("LPL", "Citibank, N.A.");
        addStock("LRCX", "Lam Research Corporation");
        addStock("LUK", "Leucadia National Corporation");
        addStock("LUV", "Southwest Airlines Co.");
        addStock("LVLT", "Level 3 Communications, Inc.");
        addStock("LYB", "LyondellBasell Industries N.V.");
        addStock("M", "Macy's, Inc.");
        addStock("MA", "Mastercard Incorporated");
        addStock("MAA", "Mid-America Apartment Communities, Inc.");
        addStock("MAC", "The Macerich Company");
        addStock("MAR", "Marriott International, Inc.");
        addStock("MAS", "Masco Corporation");
        addStock("MAT", "Mattel, Inc.");
        addStock("MBT", "JPMorgan Chase Bank, N.A.");
        addStock("MCD", "Mc'DONALDS CORPORATION");
        addStock("MCHP", "Microchip Technology Incorporated");
        addStock("MCK", "McKesson Corporation");
        addStock("MCO", "Moody's Corporation");
        addStock("MDLZ", "Mondelez International, Inc.");
        addStock("MDT", "Medtronic Public Limited Company");
        addStock("MET", "MetLife, Inc.");
        addStock("MFGP", "Deutsche Bank Trust Company Americas");
        addStock("MHK", "Mohawk Industries, Inc.");
        addStock("MKC", "McCormick &amp; Company, Incorporated");
        addStock("MLCO", "Deutsche Bank Trust Company Americas");
        addStock("MLM", "Martin Marietta Materials, Inc.");
        addStock("MMC", "Marsh &amp; McLennan Companies, Inc.");
        addStock("MMM", "3M Company");
        addStock("MNK", "Mallinckrodt public limited company");
        addStock("MNST", "Monster Beverage Corporation");
        addStock("MO", "Altria Group, Inc.");
        addStock("MOMO", "Deutsche Bank Trust Company Americas");
        addStock("MON", "Monsanto Company");
        addStock("MOS", "The Mosaic Company");
        addStock("MPC", "Marathon Petroleum Corporation");
        addStock("MRK", "Merck &amp; Co., Inc.");
        addStock("MRO", "Marathon Oil Corporation");
        addStock("MS", "Morgan Stanley");
        addStock("MSFT", "Microsoft Corporation");
        addStock("MSI", "Motorola Solutions, Inc.");
        addStock("MTB", "M&amp;T Bank Corporation");
        addStock("MTD", "Mettler-Toledo International Inc.");
        addStock("undefined", "MTS International Funding Limited");
        addStock("MU", "Micron Technology, Inc.");
        addStock("MUR", "Murphy Oil Corporation");
        addStock("MYL", "Mylan N.V.");
        addStock("NAVI", "Navient Corporation");
        addStock("NBL", "Noble Energy, Inc.");
        addStock("NDAQ", "Nasdaq, Inc.");
        addStock("NEE", "NextEra Energy, Inc.");
        addStock("NEM", "NEWMONT MINING CORPORATION");
        addStock("NFLX", "Netflix, Inc.");
        addStock("NFX", "Newfield Exploration Company");
        addStock("NKE", "NIKE, Inc.");
        addStock("NLSN", "Nielsen Holdings plc");
        addStock("NOC", "Northrop Grumman Corporation");
        addStock("NOK", "Citibank, N.A.");
        addStock("NOV", "National Oilwell Varco, Inc.");
        addStock("NRG", "NRG Energy, Inc.");
        addStock("NSC", "Norfolk Southern Corporation");
        addStock("NTAP", "NetApp, Inc.");
        addStock("NTRS", "Northern Trust Corporation");
        addStock("NUE", "Nucor Corporation");
        addStock("NVDA", "NVIDIA Corporation");
        addStock("undefined", "Novatek Finance Designated Activity Company");
        addStock("NWL", "Newell Brands Inc.");
        addStock("NWS", "News Corporation");
        addStock("NWSA", "News Corporation");
        addStock("O", "Realty Income Corporation");
        addStock("OI", "Owens-Illinois, Inc.");
        addStock("OKE", "ONEOK, Inc.");
        addStock("OMC", "Omnicom Group Inc.");
        addStock("ORCL", "Oracle Corporation");
        addStock("ORLY", "O'Reilly Automotive, Inc.");
        addStock("OXY", "Occidental Petroleum Corporation");
        addStock("PBCT", "People's United Financial, Inc.");
        addStock("PBI", "Pitney Bowes Inc.");
        addStock("PCAR", "PACCAR Inc");
        addStock("PCG", "PG&amp;E Corporation");
        addStock("PCLN", "The Priceline Group Inc.");
        addStock("PDCO", "Patterson Companies, Inc.");
        addStock("PEG", "Public Service Enterprise Group Incorporated");
        addStock("PEP", "PepsiCo, Inc.");
        addStock("PFE", "Pfizer Inc.");
        addStock("PFG", "Principal Financial Group, Inc.");
        addStock("PG", "The Procter &amp; Gamble Company");
        addStock("PGR", "The Progressive Corporation");
        addStock("PH", "Parker-Hannifin Corporation");
        addStock("PHM", "PulteGroup, Inc.");
        addStock("PKI", "PerkinElmer, Inc.");
        addStock("PLD", "Prologis, Inc.");
        addStock("PM", "Philip Morris International Inc.");
        addStock("PNC", "The PNC Financial Services Group, Inc.");
        addStock("PPG", "PPG Industries, Inc.");
        addStock("PPL", "PPL Corporation");
        addStock("PRU", "Prudential Financial, Inc.");
        addStock("PSA", "Public Storage");
        addStock("PSX", "Phillips 66");
        addStock("PTR", "Citibank, N.A.");
        addStock("PVH", "PVH Corp.");
        addStock("PWR", "Quanta Services, Inc.");
        addStock("PX", "Praxair, Inc.");
        addStock("PXD", "Pioneer Natural Resources Company");
        addStock("PYPL", "PayPal Holdings, Inc.");
        addStock("QCOM", "QUALCOMM Incorporated");
        addStock("QRVO", "Qorvo, Inc.");
        addStock("R", "Ryder System, Inc.");
        addStock("RACE", "Ferrari N.V.");
        addStock("RCL", "Royal Caribbean Cruises Ltd.");
        addStock("RDY", "JPMorgan Chase Bank, N.A.");
        addStock("RE", "Everest Re Group, Ltd.");
        addStock("REG", "Regency Centers Corporation");
        addStock("REGN", "Regeneron Pharmaceuticals, Inc.");
        addStock("RF", "Regions Financial Corporation");
        addStock("RHI", "Robert Half International Inc.");
        addStock("RHT", "Red Hat, Inc.");
        addStock("RIG", "Transocean Ltd.");
        addStock("RJF", "Raymond James Financial, Inc.");
        addStock("RL", "Ralph Lauren Corporation");
        addStock("ROK", "Rockwell Automation, Inc.");
        addStock("ROP", "Roper Technologies, Inc.");
        addStock("ROST", "Ross Stores, Inc.");
        addStock("RRC", "Range Resources Corporation");
        addStock("RSG", "Republic Services, Inc.");
        addStock("RTN", "Raytheon Company");
        addStock("SBUX", "Starbucks Corporation");
        addStock("SCG", "SCANA Corporation");
        addStock("SCHW", "The Charles Schwab Corporation");
        addStock("SEE", "Sealed Air Corporation");
        addStock("SHW", "The Sherwin-Williams Company");
        addStock("SIG", "Signet Jewelers Limited");
        addStock("SJM", "The J.M. Smucker Company");
        addStock("SKM", "Citibank, N.A.");
        addStock("SLB", "Schlumberger Limited");
        addStock("SLG", "SL Green Realty Corp.");
        addStock("SNA", "Snap-on Incorporated");
        addStock("SNI", "Scripps Networks Interactive, Inc.");
        addStock("SNPS", "Synopsys, Inc.");
        addStock("SO", "The Southern Company");
        addStock("SOHU", "Sohu.com Inc.");
        addStock("SPG", "Simon Property Group, Inc.");
        addStock("SPGI", "S&amp;P Global Inc.");
        addStock("SRCL", "Stericycle, Inc.");
        addStock("SRE", "Sempra Energy");
        addStock("STT", "State Street Corporation");
        addStock("STX", "Seagate Technology Public Limited Company");
        addStock("STZ", "Constellation Brands, Inc.");
        addStock("SWK", "Stanley Black &amp; Decker, Inc.");
        addStock("SWKS", "Skyworks Solutions, Inc.");
        addStock("SWN", "Southwestern Energy Company");
        addStock("SYF", "Synchrony Financial");
        addStock("SYK", "Stryker Corporation");
        addStock("SYMC", "Symantec Corporation");
        addStock("SYY", "Sysco Corporation");
        addStock("T", "AT&amp;T INC.");
        addStock("TAP", "Molson Coors Brewing Company");
        addStock("TDC", "Teradata Corporation");
        addStock("TDG", "TransDigm Group Incorporated");
        addStock("TEL", "TE Connectivity Ltd.");
        addStock("TGNA", "TEGNA Inc.");
        addStock("TGT", "Target Corporation");
        addStock("TIF", "Tiffany &amp; Co.");
        addStock("TJX", "The TJX Companies, Inc.");
        addStock("TMK", "Torchmark Corporation");
        addStock("TMO", "Thermo Fisher Scientific Inc.");
        addStock("TPR", "Tapestry, Inc.");
        addStock("TRIP", "TripAdvisor, Inc.");
        addStock("TROW", "T. Rowe Price Group, Inc.");
        addStock("TRV", "The Travelers Companies, Inc.");
        addStock("TSCO", "Tractor Supply Company");
        addStock("TSLA", "Tesla, Inc.");
        addStock("TSN", "Tyson Foods, Inc.");
        addStock("TSS", "Total System Services, Inc.");
        addStock("TTM", "Citibank, N.A.");
        addStock("TWTR", "Twitter, Inc.&nbsp;");
        addStock("TWX", "Time Warner Inc.");
        addStock("TXN", "Texas Instruments Incorporated");
        addStock("TXT", "Textron Inc.");
        addStock("UA", "Under Armour, Inc.");
        addStock("UAA", "Under Armour, Inc.");
        addStock("UAL", "United Continental Holdings, Inc.");
        addStock("UDR", "UDR, Inc.");
        addStock("UHS", "Universal Health Services, Inc.");
        addStock("ULTA", "Ulta Beauty, Inc.");
        addStock("UNH", "UnitedHealth Group Incorporated");
        addStock("UNM", "Unum Group");
        addStock("UNP", "Union Pacific Corporation");
        addStock("UPS", "United Parcel Service, Inc.");
        addStock("URBN", "Urban Outfitters, Inc.");
        addStock("URI", "United Rentals, Inc.");
        addStock("USB", "U.S. Bancorp");
        addStock("UTX", "United Technologies Corporation");
        addStock("V", "Visa Inc.");
        addStock("VAR", "Varian Medical Systems, Inc.");
        addStock("VEON", "The Bank of New York Mellon");
        addStock("VFC", "V.F. Corporation");
        addStock("VIAB", "Viacom Inc.");
        addStock("VIPS", "Deutsche Bank Trust Company Americas");
        addStock("VLO", "Valero Energy Corporation");
        addStock("VMC", "Vulcan Materials Company");
        addStock("VNO", "Vornado Realty Trust");
        addStock("VRSK", "Verisk Analytics, Inc.");
        addStock("VRSN", "VeriSign, Inc.");
        addStock("VRTX", "Vertex Pharmaceuticals Incorporated");
        addStock("undefined", "VTB Capital S.A.");
        addStock("VTR", "Ventas, Inc.");
        addStock("VZ", "Verizon Communications Inc.");
        addStock("WAT", "Waters Corporation");
        addStock("WB", "JPMorgan Chase Bank, N.A.");
        addStock("WBA", "Walgreens Boots Alliance, Inc.");
        addStock("WDC", "Western Digital Corporation");
        addStock("WEC", "WEC Energy Group, Inc.");
        addStock("WFC", "Wells Fargo &amp; Company");
        addStock("WHR", "Whirlpool Corporation");
        addStock("WLTW", "Willis Towers Watson Public Limited Company");
        addStock("WM", "Waste Management, Inc.");
        addStock("WMB", "The Williams Companies, Inc.");
        addStock("WMT", "Wal-Mart Stores, Inc.");
        addStock("WRK", "WestRock Company");
        addStock("WU", "The Western Union Company");
        addStock("WY", "Weyerhaeuser Company");
        addStock("WYN", "Wyndham Worldwide Corporation");
        addStock("WYNN", "Wynn Resorts, Limited");
        addStock("XEC", "Cimarex Energy Co.");
        addStock("XEL", "Xcel Energy Inc.");
        addStock("XL", "XL Group Ltd.");
        addStock("XLNX", "Xilinx, Inc.");
        addStock("XOM", "Exxon Mobil Corporation");
        addStock("XRAY", "DENTSPLY SIRONA Inc.");
        addStock("XRX", "Xerox Corporation");
        addStock("XYL", "Xylem Inc.");
        addStock("YUM", "Yum! Brands, Inc.");
        addStock("YY", "Deutsche Bank Trust Company Americas");
        addStock("ZBH", "Zimmer Biomet Holdings, Inc.");
        addStock("ZION", "Zions Bancorporation");
        addStock("ZTS", "Zoetis Inc.");
    }

    function addStock(shortName, name) {
        _stocks.push({ name: name, shortName: shortName });
    }
    ctor();
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("InvestingStockListRetreiver").asCtor(InvestingStockListRetreiver).dependencies("LocalStorageHelper");

function InvestingStockListRetreiver(LocalStorageHelper) {
    this.getAllUsaStocks = getAllUsaStocks;
    this.runGetAllUsaStocksTask = runGetAllUsaStocksTask;

    function getAllUsaStocks() {
        debugger;

        if (location.href != "https://ru.investing.com/equities/united-states") {
            throw "use page https://ru.investing.com/equities/united-states to run this script";
        }

        var data = collectStockUrlsataFromPage();
        LocalStorageHelper.set("StockBaseInfoToCollect", data);

        runGetAllUsaStocksTask();
    }

    function runGetAllUsaStocksTask() {
        debugger;
        var stocks = LocalStorageHelper.get("StockBaseInfoToCollect");

        var stockToCollect = stocks && stocks.find(function (e) {
            return !e.dataCollected;
        });

        if (stockToCollect) {
            if (location.href.includes(stockToCollect.url)) {
                stockToCollect.shortName = getShortName();
                stockToCollect.dataCollected = true;

                LocalStorageHelper.set("StockBaseInfoToCollect", stocks);

                runGetAllUsaStocksTask();
            } else {
                location.href = "https://ru.investing.com/equities/" + stockToCollect.url;
            }
        } else {
            if (stocks && stocks.length) {
                var jsCode = jsStocksCreator(stocks);
                console.log(jsCode);

                LocalStorageHelper.remove("StockBaseInfoToCollect");
            }
        }
    }

    function jsStocksCreator(stocks) {
        var str = "";

        stocks.forEach(function (s) {
            s.name = s.name.replace('&amp;', '&').replace("'", "\'");

            str += "add('" + s.name + "', '" + s.url + "', '" + s.shortName + "');\n";
        });

        return str;
    }

    function getShortName() {
        return $('[itemprop="tickerSymbol"]').attr('content');
    }

    function collectStockUrlsataFromPage() {
        var rows = $('#marketInnerContent table tbody tr');

        var data = [];

        for (var i = 0; i < rows.length; i++) {
            data.push({
                name: $($(rows[i]).find('td:eq(1) a')).html(),
                url: $($(rows[i]).find('td:eq(1) a')).attr('href').replace('/equities/', '')
            });
        }

        return data;
    }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("LocalStorageHelper").asCtor(LocalStorageHelper);

function LocalStorageHelper() {
    this.get = get;
    this.set = set;
    this.remove = remove;

    function set(key, value) {
        var storageValue = value && JSON.stringify(value);

        localStorage.setItem(key, storageValue);
    }

    function get(key) {
        var data = localStorage.getItem(key);

        return data && JSON.parse(data);
    }

    function remove(key) {
        localStorage.removeItem(key);
    }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("AllUsaStocks").asCtor(AllUsaStocks);

function AllUsaStocks() {
    this.getAll = getAll;

    var _stocks = void 0;
    var urlBase = void 0;

    function getAll() {
        return _stocks;
    }

    function ctor() {
        urlBase = "https://ru.investing.com/equities/"; // todo remove to consts!!!
        _stocks = [];

        add('Boeing', 'boeing-co', 'BA');
        add('General Motors', 'gen-motors', 'GM');
        add('Chevron', 'chevron', 'CVX');
        add('Citigroup', 'citigroup', 'C');
        add('Bank of America', 'bank-of-america', 'BAC');
        add('AT&T', 'at-t', 'T');
        add('Caterpillar', 'caterpillar', 'CAT');
        add('Intel', 'intel-corp', 'INTC');
        add('Microsoft', 'microsoft-corp', 'MSFT');
        add('Alcoa', 'alcoa', 'AA');
        add('Ford Motor', 'ford-motor-co', 'F');
        add('eBay', 'ebay-inc', 'EBAY');
        add('Dell', 'dell-inc', 'DVMT');
        add('Walt Disney', 'disney', 'DIS');
        add('Cisco', 'cisco-sys-inc', 'CSCO');
        add('Deere&Company', 'deere---co', 'DE');
        add('FedEx', 'fedex-corp', 'FDX');
        add('General Mills', 'general-mills', 'GIS');
        add('Corning', 'corning-inc', 'GLW');
        add('The Goodyear Tire&Rubber', 'goodyear-tire', 'GT');
        add('Goldman Sachs', 'goldman-sachs-group', 'GS');
        add('JPMorgan', 'jp-morgan-chase', 'JPM');
        add('Kimberly-Clark', 'kimberly-clark', 'KMB');
        add('Kraft Heinz', 'kraft-foods-inc', 'KHC');
        add('Coca-Cola', 'coca-cola-co', 'KO');
        add('McDonald’s', 'mcdonalds', 'MCD');
        add('Eli Lilly', 'eli-lilly-and-co', 'LLY');
        add('Oracle', 'oracle-corp', 'ORCL');
        add('Merck&Co', 'merck---co', 'MRK');
        add('Motorola', 'motorola-inc', 'MSI');
        add('3M', '3m-co', 'MMM');
        add('Office Depot', 'office-depot', 'ODP');
        add('Puma SE', 'puma-se-cfd?cid=6309', 'PMMAF');
        add('Gagfah', 'gagfah-sa', 'GGFHF');
        add('Vertex Pharma', 'vertex-pharm', 'VRTX');
        add('Monster Beverage 1990', 'monster-beverage', 'MNST');
        add('Teva ADR', 'teva-pharmaceutical-inds-ltd', 'TEVA');
        add('Fifth Third', 'fifth-third-bk', 'FITB');
        add('Sears Holdings', 'sears-hldgs-corp', 'SHLD');
        add('Cintas', 'cintas-corp', 'CTAS');
        add('Autodesk', 'autodesk-inc', 'ADSK');
        add('DISH Network', 'dish-network', 'DISH');
        add('Gilead', 'gilead-sciences-inc', 'GILD');
        add('Express Scripts', 'express-scripts-inc', 'ESRX');
        add('aTyr Pharma', 'life-tech-corp', 'LIFE');
        add('Alphabet A', 'google-inc', 'GOOGL');
        add('Fiserv', 'fiserv-inc', 'FISV');
        add('Liberty Global', 'liberty-global-inc', 'LBTYA');
        add('PDL BioPharma', 'pdl-biopharma-inc', 'PDLI');
        add('Adobe', 'adobe-sys-inc', 'ADBE');
        add('BlackBerry', 'research-in-motion-ltd', 'BB');
        add('Qualcomm', 'qualcomm-inc', 'QCOM');
        add('SINA Corp', 'sina-corp', 'SINA');
        add('Baidu', 'baidu.com', 'BIDU');
        add('Sohucom', 'sohu-com-inc', 'SOHU');
        add('Discovery', 'discovery-holding-co', 'DISCA');
        add('Sonus Networks', 'sonus-networks', 'SONS');
        add('Applied Materials', 'applied-matls-inc', 'AMAT');
        add('Steel Dynamics', 'steel-dynamics', 'STLD');
        add('Cadence Design', 'cadence-design-system-inc', 'CDNS');
        add('Bed Bath&Beyond', 'bed-bath---beyond-inc', 'BBBY');
        add('Microchip', 'microchip-technology-inc', 'MCHP');
        add('Wynn Resorts', 'wynn-resorts-ltd', 'WYNN');
        add('Intuitive Surgical', 'intuitive-surgical-inc', 'ISRG');
        add('Nasdaq Inc', 'nasdaq-omx-group', 'NDAQ');
        add('Ryanair ADR', 'ryanair-hldgs', 'RYAAY');
        add('Apollo Bancorp', 'apollo-group-inc', 'APLO');
        add('Infosys ADR', 'infosy-tech', 'INFY');
        add('Altaba', 'yahoo-inc', 'AABA');
        add('JetBlue', 'jet-blue', 'JBLU');
        add('Spartan Motors', 'spartan-motors', 'SPAR');
        add('Henry Schein', 'henry-schein', 'HSIC');
        add('Paychex', 'paychex-inc', 'PAYX');
        add('VeriSign', 'verisign-inc', 'VRSN');
        add('Apple', 'apple-computer-inc', 'AAPL');
        add('Fastenal', 'fastenal-co', 'FAST');
        add('Dentsply', 'dentsply-intl-inc-new', 'XRAY');
        add('Crocs', 'crocs', 'CROX');
        add('Zions', 'zions-bancorp', 'ZION');
        add('Northern Trust', 'northern-trust', 'NTRS');
        add('Citrix Systems', 'citrix-sys-inc', 'CTXS');
        add('Lamar', 'lamar-advertising-co', 'LAMR');
        add('Patterson-UTI Energy', 'patterson-uti-energy-inc', 'PTEN');
        add('Atlanticuss', 'atlanticuss', 'ATLC');
        add('CH Robinson', 'c-h-robinson-worldwide-inc', 'CHRW');
        add('Sirius XM Hld Inc', 'sirius-satellite-radio-inc', 'SIRI');
        add('Alpine Immune Sciences', 'novellus-sys', 'ALPN');
        add('PACCAR', 'paccar-inc', 'PCAR');
        add('Pan American Silver', 'pan-american-silver-corp', 'PAAS');
        add('Amazon.com', 'amazon-com-inc', 'AMZN');
        add('Ross Stores', 'ross-stores-inc', 'ROST');
        add('Viavi Solutions', 'jds-uniphase-corp', 'VIAV');
        add('NetEase', 'netease.com', 'NTES');
        add('NetApp', 'network-appliance-inc', 'NTAP');
        add('E-TRADE', 'etrade-fincl-cp', 'ETFC');
        add('Garmin Ltd', 'garmin-ltd', 'GRMN');
        add('Costco', 'costco-whsl-corp-new', 'COST');
        add('Check Point Software Tech', 'check-point-software-tech-lt', 'CHKP');
        add('Lam Research Corp', 'lam-research-corp', 'LRCX');
        add('Ciena Corp', 'ciena', 'CIEN');
        add('IAC/InterActiveCorp', 'iac-interactivecorp', 'IAC');
        add('Intuit', 'intuit', 'INTU');
        add('Expedia', 'expedia', 'EXPE');
        add('Ctripcom', 'ctrip.com-international', 'CTRP');
        add('UTStarcom Holdings', 'utstarcom-inc', 'UTSI');
        add('Cognizant', 'cognizant-technology-solutio', 'CTSH');
        add('Rambus', 'rambus-inc', 'RMBS');
        add('NII Holdings', 'nii-hldgs-inc', 'NIHD');
        add('YRC Worldwide', 'yrc-worldwide', 'YRCW');
        add('Akamai', 'akamai-technologies-inc', 'AKAM');
        add('KLA-Tencor', 'kla-tencor-corp', 'KLAC');
        add('Juniper', 'juniper-networks-inc', 'JNPR');
        add('Activision Blizzard', 'activision-inc', 'ATVI');
        add('Flex', 'flextronics-intl-ltd', 'FLEX');
        add('Amgen', 'amgen-inc', 'AMGN');
        add('Xilinx', 'xilinx-inc', 'XLNX');
        add('Expeditors Washington', 'expeditors-intl-wash-inc', 'EXPD');
        add('Electronic Arts', 'electronic-arts-inc', 'EA');
        add('JA Solar', 'ja-solar-hld', 'JASO');
        add('Patterson', 'patterson-companies-inc', 'PDCO');
        add('T Rowe', 't-rowe-price-gp', 'TROW');
        add('Biogen Inc', 'biogen-idec-inc', 'BIIB');
        add('Liberty Interactive A', 'liberty-media-inter', 'QVCA');
        add('NutriSystem', 'nutrisystems', 'NTRI');
        add('The Charles Schwab', 'charles-schwab', 'SCHW');
        add('DryShips', 'dryships', 'DRYS');
        add('Huntington Bancshares', 'huntgtn-bkshr', 'HBAN');
        add('Symantec', 'symantec-corp', 'SYMC');
        add('NVIDIA', 'nvidia-corp', 'NVDA');
        add('Stericycle', 'stericycle-inc', 'SRCL');
        add('Starbucks', 'starbucks-corp', 'SBUX');
        add('Celgene', 'celgene-corp', 'CELG');
        add('Cincinnati Financial', 'cincinnati-fin', 'CINF');
        add('Extreme', 'extreme-networks', 'EXTR');
        add('Axon Enterprise', 'taser-intl', 'AAXN');
        add('Xcerra Corp', 'ltx-credence-corp', 'XCRA');
        add('CA', 'ca-inc', 'CA');
        add('Hologic', 'hologic-inc', 'HOLX');
        add('Comcast', 'comcast-corp-new', 'CMCSA');
        add('Capstone Turbine', 'capstone-turbine-corp', 'CPST');
        add('Marvell Technology Group', 'marvell-technology-group-ltd', 'MRVL');
        add('Ballard Power Systems', 'ballard-power-systems-inc', 'BLDP');
        add('Sify', 'sify-technologies', 'SIFY');
        add('Clean Diesel Tech', 'clean-diesel-tech', 'CDTI');
        add('Royal Imtech', 'imtech', 'IMTEF');
        add('Saft Groupe', 'saft-groupe', 'SGPEF');
        add('Fox Inc', 'fox-inc', 'FOX');
        add('Medtronic', 'medtronic', 'MDT');
        add('Dover', 'dover-corp', 'DOV');
        add('Ashland Global', 'ashland-inc', 'ASH');
        add('Northrop Grumman', 'northrop-grumman', 'NOC');
        add('MGM', 'mgm-mirage', 'MGM');
        add('Vornado', 'vornado-realty', 'VNO');
        add('Mastercard', 'mastercard-cl-a', 'MA');
        add('AutoNation', 'autonation-inc', 'AN');
        add('Fluor', 'fluor-corp', 'FLR');
        add('General Dynamics', 'general-dynam', 'GD');
        add('DTE Energy', 'dte-energy', 'DTE');
        add('Analog Devices', 'analog-devices', 'ADI');
        add('VF', 'vf-corp', 'VFC');
        add('Allergan', 'actavis', 'AGN');
        add('Cardinal Health', 'cardinal-health', 'CAH');
        add('Xcel Energy', 'xcel-energy', 'XEL');
        add('DR Horton', 'd.r.-horton-inc', 'DHI');
        add('IPG', 'interpublic-grp', 'IPG');
        add('SunTrust Banks', 'sun-trust-bk', 'STI');
        add('Bemis', 'bemis-company', 'BMS');
        add('Lockheed Martin', 'lockheed-martin', 'LMT');
        add('Waters', 'waters-corp', 'WAT');
        add('Accenture', 'accenture-ltd', 'ACN');
        add('XL Group', 'xl-capital-ltd', 'XL');
        add('Dominion Resources', 'dominion-res', 'D');
        add('Exxon Mobil', 'exxon-mobil', 'XOM');
        add('Cigna', 'cigna-corp', 'CI');
        add('Piper Jaffray', 'piper-jaffray-co', 'PJC');
        add('Kinross Gold', 'kinross-gold', 'KGC');
        add('Public Service Enterprise', 'publ-svc-enter', 'PEG');
        add('NiSource', 'ni-source-inc', 'NI');
        add('Walter Energy', 'walter-industries-inc', 'WLTGQ');
        add('Yingli Green Energy', 'yingli-green', 'YGE');
        add('Zimmer Biomet', 'zimmer-hldgs', 'ZBH');
        add('CSX', 'csx-corp', 'CSX');
        add('ICE', 'intercontintlex', 'ICE');
        add('L3 Tech', 'l3-comms-hldgs', 'LLL');
        add('Praxair', 'praxair-inc', 'PX');
        add('Southwest Airlines', 'sth-west-airlines', 'LUV');
        add('Illinois Tool Works', 'illinois-tool-wk-r', 'ITW');
        add('Darden Restaurants', 'dardem-rest', 'DRI');
        add('Mattel', 'mattel-inc', 'MAT');
        add('BB&T', 'bb-t-corp', 'BBT');
        add('Cameco', 'cameco-corp', 'CCJ');
        add('Halliburton', 'halliburton-co', 'HAL');
        add('ProLogis', 'prologis', 'PLD');
        add('McCormick&Co', 'mccormick---co', 'MKC');
        add('Gap', 'gap.inc', 'GPS');
        add('Terex', 'terex-corp', 'TEX');
        add('Host Hotels Resorts', 'host-hotels---res', 'HST');
        add('Estee Lauder', 'estee-lauder', 'EL');
        add('International Paper', 'intl-paper-co', 'IP');
        add('Emerson', 'emerson-elec', 'EMR');
        add('Clorox', 'clorox-co', 'CLX');
        add('Agrium', 'agrium-inc', 'AGU');
        add('ConocoPhillips', 'conoco-phillips', 'COP');
        add('Colgate-Palmolive', 'colgate-palmo', 'CL');
        add('Raytheon', 'raytheon-co', 'RTN');
        add('Noble Corporation', 'noble-corp', 'NE');
        add('Pinnacle West Capital', 'pinnacle-west', 'PNW');
        add('Regions Financial', 'regions-fin', 'RF');
        add('CenterPoint Energy', 'centerpoint', 'CNP');
        add('MetLife', 'metlife-inc', 'MET');
        add('Exelon', 'exelon-corp', 'EXC');
        add('Baxter', 'baxter-intl', 'BAX');
        add('Alpha Natural Pref A', 'alpha-natural-resources', 'ALHAP');
        add('Occidental', 'occidental-petro', 'OXY');
        add('Sprint Corp', 'sprint-nextel-corp', 'S');
        add('Southern', 'southern-co', 'SO');
        add('Tapestry', 'coach', 'TPR');
        add('Lennar', 'lennar', 'LEN');
        add('Campbell Soup', 'campbell-soup', 'CPB');
        add('CenturyLink', 'centurylink', 'CTL');
        add('State Street', 'state-street', 'STT');
        add('Progressive', 'the-progressive', 'PGR');
        add('Harmony Gold Mining', 'harmony-gold-mng', 'HMY');
        add('Cleveland-Cliffs', 'cleveland-cliffs', 'CLF');
        add('Vulcan Materials', 'vulcan-matrls', 'VMC');
        add('CONSOL Energy', 'consol-energy', 'CNX');
        add('Parker-Hannifin', 'parkerhannifin', 'PH');
        add('Anadarko Petroleum', 'anadarko-petro', 'APC');
        add('Teck Resources B', 'teck-cominco', 'TECK');
        add('Genuine Parts', 'genuine-parts-co', 'GPC');
        add('CBRE', 'cbre', 'CBG');
        add('DuPont', 'du-pont', 'DWDP');
        add('Orix', 'orix', 'IX');
        add('Sherwin-Williams', 'sherwinwilliams', 'SHW');
        add('Pfizer', 'pfizer', 'PFE');
        add('NTT DOCOMO', 'ntt-docomo', 'DCM');
        add('Wells Fargo&Co', 'wells-fargo', 'WFC');
        add('Manitowoc', 'manitowoc-co.', 'MTW');
        add('Wal-Mart Stores', 'wal-mart-stores', 'WMT');
        add('Edison', 'edison-intl', 'EIX');
        add('KB Home', 'kb-home', 'KBH');
        add('Snap-On', 'snapon-inc', 'SNA');
        add('Allegheny Technologies', 'allegheny-tech', 'ATI');
        add('Xerox', 'xerox-corp', 'XRX');
        add('Equifax', 'equifax-inc', 'EFX');
        add('Gold Fields ADR', 'gold-fields-lts', 'GFI');
        add('Konami Holdings', 'konami', 'KNMCY');
        add('McKesson', 'mckesson-corp', 'MCK');
        add('Entergy', 'entergy-corp', 'ETR');
        add('CMS Energy', 'cms-energy-corp', 'CMS');
        add('Honda Motor ADR', 'honda', 'HMC');
        add('Ameriprise Financial', 'ameriprise-fincl', 'AMP');
        add('AIG', 'american-intl-group', 'AIG');
        add('Ralph Lauren', 'polo-ralph-laur', 'RL');
        add('Leggett&Platt', 'leggett---platt', 'LEG');
        add('L Brands', 'limited-brands', 'LB');
        add('IFF', 'intl-flav---frag', 'IFF');
        add('Petroleo Brasileiro Petrobras ADR', 'petroleo-bras', 'PBR');
        add('M/I Homes', 'm-i-homes-inc', 'MHO');
        add('WW Grainger', 'w-w-grainger-inc', 'GWW');
        add('JC Penney', 'j-c-penney-co', 'JCP');
        add('Diamond Offshore Drilling', 'diamond-offshore', 'DO');
        add('Constellation Brands', 'constellation-a', 'STZ');
        add('China Digital TV', 'china-dig-tv-hld', 'STVVY');
        add('American Tower', 'amer-tower-corp', 'AMT');
        add('Grupo Televisa ADR', 'grupo-televisa-sa-adr', 'TV');
        add('Philip Morris', 'philip-morris-intl', 'PM');
        add('Fidelity National Info', 'fidelity-natl-in', 'FIS');
        add('Altria', 'altria-group', 'MO');
        add('El Paso Energy Capital Trust I', 'el-paso-corp', 'EP_pc');
        add('Stewart Information Services', 'stewart-information-services-corp', 'STC');
        add('CBS', 'cbs-corp-cl-b', 'CBS');
        add('Ball', 'ball-corp', 'BLL');
        add('Hartford', 'hartford-finl', 'HIG');
        add('AK Steel', 'ak-steel-holding-corp', 'AKS');
        add('Hershey', 'hershey-co', 'HSY');
        add('DDR', 'ddr', 'DDR');
        add('DXC Technology', 'comp-science', 'DXC');
        add('Morgan Stanley', 'morgan-stanley', 'MS');
        add('PNC Financial', 'pnc-fin-serv', 'PNC');
        add('Waste Management', 'waste-managemnt', 'WM');
        add('AmerisourceBergen', 'amerisourcebergn', 'ABC');
        add('Assurant', 'assurant', 'AIZ');
        add('Kroger', 'kroger-co', 'KR');
        add('Molson Coors Brewing', 'molson-coors', 'TAP');
        add('Home Depot', 'home-depot', 'HD');
        add('Becton Dickinson', 'becton-dickinsn', 'BDX');
        add('Arch Coal', 'arch-coal-inc', 'ARCH');
        add('JM Smucker', 'jm-smucker-co', 'SJM');
        add('CR Bard', 'c-r-bard', 'BCR');
        add('VMware', 'vm-ware-inc', 'VMW');
        add('Sealed Air', 'sealed-air', 'SEE');
        add('Best Buy', 'best-buy', 'BBY');
        add('Andeavor', 'tesoro', 'ANDV');
        add('Archer-Daniels-Midland', 'archer-daniels-mid', 'ADM');
        add('Brown Forman', 'brown-forman-b', 'BFb');
        add('IBM', 'ibm', 'IBM');
        add('Union Pacific', 'union-pacific', 'UNP');
        add('China Fund', 'china-fund-inc', 'CHN');
        add('Sony ADR', 'sony', 'SNE');
        add('Ryder System', 'ryder-system-inc', 'R');
        add('SLM', 'slm-corporation', 'SLM');
        add('Micron', 'micron-tech', 'MU');
        add('Avery Dennison', 'avery-dennison', 'AVY');
        add('Weatherford', 'weatherfgord-intl', 'WFT');
        add('Marathon Oil', 'marathon-oil', 'MRO');
        add('CF Industries', 'cf-industries', 'CF');
        add('Apache', 'apache-corp', 'APA');
        add('Duke Energy', 'duke-energy', 'DUK');
        add('KeyCorp', 'keycorp-new', 'KEY');
        add('Teradata', 'teradata', 'TDC');
        add('Synovus', 'synovus-finan', 'SNV');
        add('Wheaton Precious Metals', 'silver-wheaton-corp', 'WPM');
        add('ARO Liquidation', 'aeropostale', 'AROPQ');
        add('Laboratory of America', 'laboratory-corp-of-amer', 'LH');
        add('Boston Properties', 'boston-ppty', 'BXP');
        add('Western Digital', 'western-digital', 'WDC');
        add('PPG Industries', 'ppg-industries', 'PPG');
        add('S&P Global', 'mcgraw-hill', 'SPGI');
        add('Abercrombie&Fitch', 'aberc-fitch-a', 'ANF');
        add('Williams', 'williams-cos', 'WMB');
        add('Anthem Inc', 'wellpoint-inc', 'ANTM');
        add('Brunswick', 'brunswick-corp', 'BC');
        add('Jacobs Engineering', 'jacobs-engineer', 'JEC');
        add('Eastman Chemical', 'eastman-chem', 'EMN');
        add('Verizon', 'verizon-communications', 'VZ');
        add('Nucor', 'nucor', 'NUE');
        add('Omnicom', 'omnicom-gp-inc', 'OMC');
        add('NewYork Times', 'new-york-times', 'NYT');
        add('Lincoln National', 'lincoln-natl', 'LNC');
        add('UBS Group', 'ubs-group-n?cid=8132', 'UBS');
        add('National Oilwell Varco', 'ntl-oilwell-varc', 'NOV');
        add('AvalonBay', 'avalonbay-comm', 'AVB');
        add('Marriott Int', 'marriott-intl', 'MAR');
        add('Ingersoll-Rand', 'ingersoll-rand', 'IR');
        add('Bristol-Myers Squibb', 'bristol-myer-squiib', 'BMY');
        add('Genworth', 'genworth-finl', 'GNW');
        add('American Electric Power', 'american-electric', 'AEP');
        add('Thermo Fisher Scientific', 'thermo-fisher-sc', 'TMO');
        add('Kohl’s', 'kohls-corp', 'KSS');
        add('Newmont Mining', 'newmont-mining', 'NEM');
        add('Total System Services', 'total-sys-svcs', 'TSS');
        add('Varian', 'varian-medical', 'VAR');
        add('Graham Hld Co', 'washington-post-co.', 'GHC');
        add('Tata Motors ADR', 'tata-motors', 'TTM');
        add('Sunedison Inc', 'sunedison-inc', 'SUNEQ');
        add('Public Storage', 'public-stg-mld', 'PSA');
        add('The Travelers', 'the-travelers-co', 'TRV');
        add('Stanley Black Decker', 'stanley-works', 'SWK');
        add('Potash Saskatchewan', 'potash', 'POT');
        add('MBIA', 'mbia-inc', 'MBI');
        add('Aetna', 'aetna-inc', 'AET');
        add('HDFC Bank ADR', 'hdfc-bank', 'HDB');
        add('Nippon', 'nippon-telegraph', 'NTTYY');
        add('Franklin Resources', 'franklin-res', 'BEN');
        add('Rockwell Collins', 'rockwe-coll', 'COL');
        add('Humana', 'humana-inc', 'HUM');
        add('H&R Block', 'h---r-block-inc', 'HRB');
        add('Viacom B', 'viacom-cl-b', 'VIAB');
        add('Unum', 'unum-group', 'UNM');
        add('Chubb', 'chubb-corp', 'CB');
        add('Leucadia National', 'leucadia-natl', 'LUK');
        add('J&J', 'johnson-johnson', 'JNJ');
        add('Time Warner', 'time-warner', 'TWX');
        add('Tyson Foods', 'tyson-foods', 'TSN');
        add('Target', 'target', 'TGT');
        add('Jabil Circuit', 'jabil-circuit', 'JBL');
        add('American Express', 'american-express', 'AXP');
        add('America Movil ADR', 'america-movil', 'AMX');
        add('Masco', 'masco-corp', 'MAS');
        add('United States Steel', 'us-steel-corp', 'X');
        add('Stryker', 'stryker', 'SYK');
        add('Mitsubishi UFJ Financial ADR', 'mits-ufj-financial-grp', 'MTU');
        add('Discover', 'discover-financl', 'DFS');
        add('Prudential Financial', 'prudential-fin', 'PRU');
        add('Abbott Labs', 'abbott-laboratories', 'ABT');
        add('General Electric', 'general-electric', 'GE');
        add('Oi ADR Pref', 'oi', 'OIBRQ');
        add('Meredith', 'meredith-corp', 'MDP');
        add('Quest Diagnostics', 'quest-diag', 'DGX');
        add('United Parcel Service', 'united-parcel', 'UPS');
        add('Yamana Gold', 'yamana-gold', 'AUY');
        add('CVS Health Corp', 'cvs-corp', 'CVS');
        add('ITT', 'itt-corp', 'ITT');
        add('PPL', 'ppl-corp', 'PPL');
        add('Dean Foods', 'dean-foods-co', 'DF');
        add('Robert Half', 'robert-half-intl', 'RHI');
        add('Convergys', 'convergys-cp', 'CVG');
        add('Simon Property', 'simon-prop-grp', 'SPG');
        add('ICICI Bank ADR', 'icici-bank', 'IBN');
        add('Big Lots', 'big-lots-inc', 'BIG');
        add('Avon Products', 'avon-products', 'AVP');
        add('Johnson Controls', 'johnson-controls', 'JCI');
        add('Cummins', 'cummins-inc', 'CMI');
        add('Allstate', 'allstate-corporation', 'ALL');
        add('Sempra Energy', 'sempra-energy', 'SRE');
        add('Devon Energy', 'devon-energy', 'DVN');
        add('ConAgra Foods', 'conagra-foods', 'CAG');
        add('TJX', 'tjx-co-inc', 'TJX');
        add('Whirlpool', 'whirl-pool-corp', 'WHR');
        add('Range Resources', 'range-resources-corp', 'RRC');
        add('FirstEnergy', 'first-energy', 'FE');
        add('Hovnanian Enterprises', 'hovnanian-enter', 'HOV');
        add('Torchmark', 'torchmark-corp', 'TMK');
        add('United Technologies', 'united-tech', 'UTX');
        add('PulteGroup', 'pulte-homes-inc', 'PHM');
        add('Wyndham', 'wyndham-world', 'WYN');
        add('Valero Energy', 'valero-energy', 'VLO');
        add('IGT', 'intl-game-tech', 'IGT');
        add('Noble Energy', 'noble-energy', 'NBL');
        add('Supervalu', 'supervalu-inc', 'SVU');
        add('Boston Scientific', 'boston-scien-cp', 'BSX');
        add('Frontier Communications', 'frontier-communications-corp', 'FTR');
        add('Capital One Financial', 'capital-one', 'COF');
        add('Pacific Gas&Electric', 'pacific-gas-electric', 'PCG');
        add('Norfolk Southern', 'norfolk-southern', 'NSC');
        add('Aflac', 'aflac-inc', 'AFL');
        add('Chesapeake Energy', 'chesapeake-ener', 'CHK');
        add('Harley-Davidson', 'harley-davidson', 'HOG');
        add('Equity Residential', 'eq-resident', 'EQR');
        add('Pitney Bowes', 'pitney-bowes-inc', 'PBI');
        add('Air Products', 'air-prods---chem', 'APD');
        add('First Horizon National', 'first-horizon-ntl', 'FHN');
        add('Principal', 'principal-fin', 'PFG');
        add('Texas Instruments', 'texas-instru', 'TXN');
        add('Grupo Aeroportuario Sureste', 'grupo-aeroportuario-sur-adr', 'ASR');
        add('HP Inc', 'hewlett-pack', 'HPQ');
        add('Coca-Cola EU Partners', 'coca-cola-ent', 'CCE');
        add('Honeywell', 'honeywell-intl', 'HON');
        add('Nomura ADR', 'nomura-holdings', 'NMR');
        add('AMD', 'adv-micro-device', 'AMD');
        add('M&T Bank', 'm-t-bank-corp', 'MTB');
        add('NCR', 'ncr-corp', 'NCR');
        add('Mosaic', 'mosaic-company', 'MOS');
        add('PerkinElmer', 'perkinelmer', 'PKI');
        add('Las Vegas Sands', 'las-vegas-sands', 'LVS');
        add('Freeport-McMoran', 'freeport-mcm', 'FCX');
        add('AutoZone', 'autozone-inc', 'AZO');
        add('Nabors Industries', 'nabors-inds', 'NBR');
        add('Sysco', 'sysco-corp', 'SYY');
        add('Tenet Healthcare', 'tenet-healthcare', 'THC');
        add('Ameren', 'ameren-corp', 'AEE');
        add('Industrias Bachoco ADR', 'industrias-bachoco-sab-adr', 'IBA');
        add('Eaton', 'eaton', 'ETN');
        add('MFC', 'mfc-industrial', 'MFCB');
        add('Coca Cola Femsa ADR', 'coca-cola-femsa-adr', 'KOF');
        add('Salesforce.com', 'salesforce-com', 'CRM');
        add('Actuant', 'actuant-corp', 'ATU');
        add('Consolidated Edison', 'cocnsol-edison', 'ED');
        add('The AES', 'aes-corp', 'AES');
        add('Transocean', 'transocea-ltd', 'RIG');
        add('Apartment Invest', 'apt-inv-manage', 'AIV');
        add('Rowan', 'rowan-co-inc', 'RDC');
        add('Textron', 'textron-inc', 'TXT');
        add('Gruma SAB de CV', 'gruma-sab-adr', 'GPAGF');
        add('Unisys', 'unisys-corp', 'UIS');
        add('Federated Investors', 'fed-investors', 'FII');
        add('Viacom', 'viacom-inc', 'VIA');
        add('US Bancorp', 'us-bancorp', 'USB');
        add('Comerica', 'comerica-inc', 'CMA');
        add('Ensco PLC', 'ensco-intl', 'ESV');
        add('Tiffany&Co', 'tiffany---co', 'TIF');
        add('Visa', 'visa-inc', 'V');
        add('MGIC Investment', 'mgic-inv', 'MTG');
        add('Baker Hughes A', 'baker-hughes', 'BHGE');
        add('Toyota Motor ADR', 'toyota', 'TM');
        add('Western Union', 'western-union', 'WU');
        add('Canon ADR', 'canon', 'CAJ');
        add('Hess', 'hess-corp', 'HES');
        add('Yum! Brands', 'yum!-brands-inc', 'YUM');
        add('Marsh&McLennan', 'marsh---mclennan', 'MMC');
        add('Kyocera', 'kyocera', 'KYO');
        add('LDK Solar', 'ldk-solar-co', 'LDKYQ');
        add('Kellogg', 'kellogg-co.', 'K');
        add('Kimco', 'kimco-realty', 'KIM');
        add('Ecolab', 'ecolab-inc', 'ECL');
        add('Nordstrom', 'nordstrom-inc', 'JWN');
        add('EOG Resources', 'eog-resources', 'EOG');
        add('Newell Brands', 'newell-rubber', 'NWL');
        add('Aon', 'aon-corp', 'AON');
        add('Hasbro', 'hasbro-inc', 'HAS');
        add('Bank of NY Mellon', 'bk-of-ny', 'BK');
        add('Wipro ADR', 'wipro', 'WIT');
        add('Schlumberger', 'schlumberger-ltd', 'SLB');
        add('Walgreens Boots Alliance', 'walgreen-co', 'WBA');
        add('Rockwell Automation', 'rockwell-automat', 'ROK');
        add('PepsiCo', 'pepsico', 'PEP');
        add('UnitedHealth', 'united-health-group', 'UNH');
        add('Allergan Pref', 'allergan-inc', 'AGN_pa');
        add('Teradyne', 'teradyne-inc', 'TER');
        add('Murphy Oil', 'murphy-oil-corp', 'MUR');
        add('Mizuho Financial ADR', 'mizuho', 'MFG');
        add('Dillards', 'dillards', 'DDS');
        add('Danaher', 'danaher-corp', 'DHR');
        add('FLIR Systems', 'flir-systems', 'FLIR');
        add('SunPower', 'sunpower-corporation', 'SPWR');
        add('Seagate Technology', 'seagate-technology', 'STX');
        add('Agilent Technologies', 'agilent-tech', 'A');
        add('Cemex ADR', 'cemex-sab-de-cv-adr', 'CX');
        add('Delta Air Lines', 'delta-air-lines-new', 'DAL');
        add('Macy’s Inc', 'macys', 'M');
        add('Moodys', 'moodys-corp', 'MCO');
        add('Nike', 'nike', 'NKE');
        add('Dr Reddys Labs', 'dr.-reddys-laboratories', 'RDY');
        add('Lindsay', 'lindsay-corporation', 'LNN');
        add('Monsanto', 'monsanto', 'MON');
        add('Procter&Gamble', 'procter-gamble', 'PG');
        add('Weyerhaeuser', 'weyerhaeuser', 'WY');
        add('Empresas ICA ADR', 'empresas-ica-soc-con', 'ICAYY');
        add('ADP', 'auto-data-process', 'ADP');
        add('Red Hat', 'red-hat-inc', 'RHT');
        add('Denbury Resources', 'denbury-resources-inc', 'DNR');
        add('Allscripts', 'allscripts-misys-healthcre-solution', 'MDRX');
        add('Reliance Steel&Aluminum', 'reliance-steel---aluminum-co.', 'RS');
        add('SSR Mining', 'silver-standard-resources', 'SSRM');
        add('Southwestern Energy', 'southwestern-energy-company', 'SWN');
        add('Carters', 'carters-inc', 'CRI');
        add('Dr Pepper Snapple', 'dr-pepper-snapple', 'DPS');
        add('Lowe’s', 'lowes-companies', 'LOW');
        add('Ampal American Israel', 'ampal-am-israel', 'AMPLQ');
        add('The Middleby', 'the-middleby-corp', 'MIDD');
        add('VALE', 'vale-s.a.--americ', 'VALE');
        add('CPFL Energia ADR', 'cpfl-energia-s.a.', 'CPL');
        add('United Continental', 'united-continenta', 'UAL');
        add('Netflix', 'netflix,-inc.', 'NFLX');
        add('News Corp', 'news-corporation', 'NWS');
        add('Tupperware Brands', 'tupperware-brands', 'TUP');
        add('Equinix', 'equinix,-inc.', 'EQIX');
        add('Cerner', 'cerner-corporatio', 'CERN');
        add('China Green Agriculture', 'china-green', 'CGA');
        add('Priceline.com', 'priceline.com-inc', 'PCLN');
        add('O\'Reilly', 'oreilly-automotive', 'ORLY');
        add('Seattle Genetics', 'seattle-genetics,', 'SGEN');
        add('BlackRock', 'blackrock,-inc.-c', 'BLK');
        add('Cabot', 'cabot-microelectr', 'CCMP');
        add('CME Group', 'cme-group-inc.', 'CME');
        add('Illumina Inc', 'illumina,-inc.', 'ILMN');
        add('JB Hunt', 'j.b.-hunt-transpo', 'JBHT');
        add('Loews', 'loews-corporation', 'L');
        add('Maxim', 'maxim-integrated', 'MXIM');
        add('Rogers Communications', 'rogers-communicat', 'RCI');
        add('Urban Outfitters', 'urban-outfitters', 'URBN');
        add('EW Scripps', 'e.w.-scripps-comp', 'SSP');
        add('Oshkosh', 'oshkosh-corporati', 'OSK');
        add('NextEra Energy', 'nextera-energy-inc', 'NEE');
        add('Central Fund of Canada', 'central-fund-of-canada-limited', 'CEF');
        add('Sonic', 'sonic-corp.', 'SONC');
        add('First Solar', 'first-solar-inc', 'FSLR');
        add('Mylan', 'mylan-inc', 'MYL');
        add('Makita', 'makita-corp', 'MKTAY');
        add('Mitsui & Company', 'mitsui---company-ltd', 'MITSY');
        add('World Poker Fund Holdings', 'mmk_mm', 'WPFH');
        add('Polymetal International', 'polymetal?cid=13751', 'POYYF');
        add('F5 Networks', 'f5-networks-inc', 'FFIV');
        add('Edwards Lifesciences', 'edward-lifescience', 'EW');
        add('News Corp A', 'news-corp.', 'NWSA');
        add('Alexion', 'alexion-pharmaceuticals,-inc.', 'ALXN');
        add('Amphenol', 'amphenol-corp', 'APH');
        add('Berkshire Hathaway B', 'berkshire-hathaway', 'BRKb');
        add('Cabot Oil&Gas', 'cabot-oil---gas', 'COG');
        add('CarMax', 'carmax-inc', 'KMX');
        add('Chipotle Mexican Grill', 'chipotle-mexican-grill-inc', 'CMG');
        add('DaVita', 'davita-inc', 'DVA');
        add('Adtalem Education', 'devry-inc', 'ATGE');
        add('Dun&Bradstreet', 'dun---bradstreet', 'DNB');
        add('EQT', 'eqt-corporation', 'EQT');
        add('FMC', 'fmc-corp', 'FMC');
        add('TechnipFMC', 'fmc-technologies-inc', 'FTI');
        add('Flowserve', 'flowserve-corp', 'FLS');
        add('GameStop Corp', 'gamestop-corp', 'GME');
        add('Harris', 'harris-corporation', 'HRS');
        add('HCP', 'hcp-inc', 'HCP');
        add('Welltower Inc', 'health-care-reit', 'HCN');
        add('Helmerich&Payne', 'helmerich---payne', 'HP');
        add('Hormel Foods', 'hormel-foods-corp', 'HRL');
        add('Invesco', 'invesco-ltd', 'IVZ');
        add('Iron Mountain', 'iron-mountain-inc', 'IRM');
        add('Newfield Exploration', 'newfield-exploration-co.', 'NFX');
        add('Eversource Energy', 'northeast-utilities', 'ES');
        add('NRG', 'nrg-energy-inc', 'NRG');
        add('ONEOK', 'oneok', 'OKE');
        add('Owens-Illinois', 'owens-illinois-inc', 'OI');
        add('Pioneer Natural Resources', 'pioneer-natural-resources', 'PXD');
        add('QEP Resources', 'qep-resources', 'QEP');
        add('Republic Services', 'republic-services-inc', 'RSG');
        add('Roper Technologies', 'roper-industries', 'ROP');
        add('Scana', 'scana-corp', 'SCG');
        add('Scripps Networks', 'scripps-networks-interactive', 'SNI');
        add('Ventas', 'ventas-inc', 'VTR');
        add('WEC Energy', 'wisconsin-energy-corp', 'WEC');
        add('RR Donnelley & Sons', 'donnelley,-r.r.---sons', 'RRD');
        add('Barrick Gold', 'barrick-gold-corp.', 'ABX');
        add('Agnico Eagle Mines', 'agnico-eagle-mines', 'AEM');
        add('Autoliv', 'autoliv-inc.', 'ALV');
        add('The Blackstone', 'the-blackstone-group', 'BX');
        add('Chimera Investment', 'chimera-investment-corp', 'CIM');
        add('Cohn&Steers', 'cohen---steers-inc.', 'CNS');
        add('Carbo Ceramics', 'carbo-ceramics-inc.', 'CRR');
        add('3D Systems', '3d-systems-corporation', 'DDD');
        add('Interoil', 'interoil?cid=13940', 'IROIF');
        add('Lazard', 'lazard-ltd', 'LAZ');
        add('Magna International', 'magna-international', 'MGA');
        add('Marathon Petroleum', 'marathon-petroleum-corp.', 'MPC');
        add('Nustar', 'nustar-energy-l.p.', 'NS');
        add('Belmond', 'orient-express-hotels', 'BEL');
        add('Overseas Shipholding', 'overseas-shipholding-group', 'OSG');
        add('Pandora Media', 'pandora-media', 'P');
        add('RPC', 'rpc-inc.', 'RES');
        add('Southern Copper', 'southern-copper-corp.', 'SCCO');
        add('Sandridge Energy', 'sandridge-energy', 'SD');
        add('Titan', 'titan-international', 'TWI');
        add('Under Armour A', 'under-armour', 'UAA');
        add('Valeant Pharmaceuticals', 'valeant-pharma', 'VRX');
        add('Aqua America', 'aqua-america-inc.', 'WTR');
        add('ADTRAN', 'adtran-inc.', 'ADTN');
        add('Advanced Energy', 'advanced-energy', 'AEIS');
        add('AirMedia', 'airmedia-group', 'AMCN');
        add('Arena Pharma', 'arena-pharma', 'ARNA');
        add('ARRIS Group Inc', 'arris-group-inc.', 'ARRS');
        add('Broadcom', 'avago-technologies', 'AVGO');
        add('Brocade', 'brocade-communications', 'BRCD');
        add('Celsion', 'celsion-corp.', 'CLSN');
        add('Cree', 'cree-inc.', 'CREE');
        add('Cirrus', 'cirrus-logic-inc.', 'CRUS');
        add('Dunkin Brands', 'dunkin-brands-group', 'DNKN');
        add('Entegris', 'entegris-inc.', 'ENTG');
        add('The Hain Celestial', 'hain-celestial-group', 'HAIN');
        add('Internet Initiative Japan ADR', 'internet-initiative-japan', 'IIJI');
        add('IPG Photonics', 'ipg-photonics-corp.', 'IPGP');
        add('Ionis Pharma', 'isis-pharma', 'IONS');
        add('Itron', 'itron-inc.', 'ITRI');
        add('L&L Energy', 'l-l-energy', 'LLEN');
        add('ManTech', 'mantech-international', 'MANT');
        add('Merriman Inc', 'merriman-holdings', 'MERR');
        add('Motorcar Parts', 'motorcar-parts-of-america', 'MPAA');
        add('Nuance Communications', 'nuance-communications', 'NUAN');
        add('NXP', 'nxp-semiconductors', 'NXPI');
        add('QuickLogic', 'quicklogic-corp.', 'QUIK');
        add('Radware Ltd', 'radware-ltd.', 'RDWR');
        add('Royal Gold', 'royal-gold-inc.', 'RGLD');
        add('Tesla', 'tesla-motors', 'TSLA');
        add('Take-Two', 'take-two-interactive', 'TTWO');
        add('Wacoal', 'wacoal-holdings-corp.', 'WACLY');
        add('MecklerMedia Corp', 'webmediabrands-inc', 'MECK');
        add('Яндекс', 'yandex', 'YNDX');
        add('Brammer', 'brammer', 'BMMEF');
        add('New Zealand Oil Gas', 'new-zealand-oil---gas-ltd', 'NZEOF');
        add('Unilife ADR', 'unilife-corporation', 'UNISZ');
        add('Beadell Res Ltd', 'beadell-res-ltd?cid=14582', 'BDREF');
        add('Regis Resources Ltd', 'regis-resources-ltd?cid=14595', 'RGRNF');
        add('TNT Express', 'tnt-express', 'TNTEF');
        add('Dollar Tree', 'dollar-tree-inc', 'DLTR');
        add('Espirito Santo SA', 'espirito-santo-re', 'ESFOF');
        add('Kleinwort Benson', 'rhj-international', 'RHJIF');
        add('Atlantic American', 'atlantic-american', 'AAME');
        add('AAON', 'aaon', 'AAON');
        add('Atlas Air', 'atlas-air-worldwide', 'AAWW');
        add('ABAXIS', 'abaxis', 'ABAX');
        add('Ameris', 'ameris-bancorp', 'ABCB');
        add('Cambium', 'cambium-learning', 'ABCD');
        add('The Advisory Board', 'the-advisory-boar', 'ABCO');
        add('ArcBest Corp', 'arkansas-best-corp', 'ARCB');
        add('ARCA Biopharma', 'arca-biopharma', 'ABIO');
        add('ABIOMED', 'abiomed', 'ABMD');
        add('Autobytel', 'autobytel-inc', 'AUTO');
        add('ACADIA', 'acadia-pharmaceuticals', 'ACAD');
        add('Aceto', 'aceto-corp', 'ACET');
        add('Atlantic Coast Federal', 'atlantic-coast-federal-corp', 'ACFC');
        add('Acorn', 'acorn-energy', 'ACFN');
        add('Acadia Healthcare', 'acadia-healthcare', 'ACHC');
        add('Achillion', 'achillion-pharmaceuticals', 'ACHN');
        add('ACI Worldwide', 'aci-worldwide', 'ACIW');
        add('Axcelis', 'axcelis-tech', 'ACLS');
        add('ACNB', 'acnb-corp', 'ACNB');
        add('Acorda', 'acorda-therapeutics', 'ACOR');
        add('AcelRx', 'acelrx-pharmaceuticals', 'ACRX');
        add('Acacia Research', 'acacia-research-corp', 'ACTG');
        add('Acura Pharma', 'acura-pharmaceuticals', 'ACUR');
        add('Acxiom', 'acxiom-inc', 'ACXM');
        add('Authentidate', 'authentidate-hold', 'ADAT');
        add('ADES', 'ada-es', 'ADES');
        add('Addus', 'addus-homecare', 'ADUS');
        add('Aegion', 'aegion-corp', 'AEGN');
        add('Aehr Test Systems', 'aehr-test-systems', 'AEHR');
        add('LiNiu Tech', 'iao-kun-group-hld', 'LINU');
        add('American Electric', 'american-electric-tech', 'AETI');
        add('ADDvantage', 'addvantage-technologies', 'AEY');
        add('Aeterna Zentaris', 'aeterna-zentaris-inc?cid=15348', 'AEZS');
        add('Almost Family', 'almost-family-inc', 'AFAM');
        add('Athens Bancshares', 'athens-bancshares', 'AFCB');
        add('AmTrust', 'amtrust-financial', 'AFSI');
        add('Agenus', 'agenus-inc', 'AGEN');
        add('Argo Group Int', 'argo-group-intern', 'AGII');
        add('AGNC Invest', 'american-capital-agency', 'AGNC');
        add('Agilysys', 'agilysys', 'AGYS');
        add('Alliances', 'alliance-holdings', 'AHGP');
        add('Allied Healthcare', 'allied-healthcare', 'AHPI');
        add('Altra', 'altra-holdings', 'AIMC');
        add('Air T', 'air-t', 'AIRT');
        add('Akorn', 'akorn', 'AKRX');
        add('Alico', 'alico', 'ALCO');
        add('Align', 'align-technology', 'ALGN');
        add('Allegiant', 'allegiant-travel', 'ALGT');
        add('Alimera', 'alimera-sciences', 'ALIM');
        add('Alkermes Plc', 'alkermes-plc', 'ALKS');
        add('Allot Communications', 'allot-communications-ta?cid=15373', 'ALLT');
        add('Alnylam', 'alnylam-pharmaceuticals', 'ALNY');
        add('Analogic', 'analogic-corp', 'ALOG');
        add('AstroNova', 'astro-med', 'ALOT');
        add('Alaska Communications', 'alaska-communications', 'ALSK');
        add('AMAG', 'amag-pharm', 'AMAG');
        add('Ambient', 'ambient-corp', 'AMBTQ');
        add('Andatee China Marine', 'andatee-china-marine', 'AMCF');
        add('Amedisys', 'amedisys-inc', 'AMED');
        add('Amkor', 'amkor-technology', 'AMKR');
        add('American National Bankshares', 'american-national-bankshares', 'AMNB');
        add('Allied Motion', 'allied-motion-tech', 'AMOT');
        add('America Movil ADR A', 'america-movil-sab-de-cv', 'AMOV');
        add('American River', 'american-river-bankshares', 'AMRB');
        add('Amyris', 'amyris', 'AMRS');
        add('American Superconductor', 'american-superconductor', 'AMSC');
        add('AMERISAFE', 'amerisafe', 'AMSF');
        add('American Software', 'american-software', 'AMSWA');
        add('Ameritrans Capital', 'ameritrans-capital', 'AMTCQ');
        add('TD Ameritrade', 'td-ameritrade-hol', 'AMTD');
        add('American Woodmark', 'american-woodmark', 'AMWD');
        add('American National Insurance', 'american-national-insurance', 'ANAT');
        add('Anchor', 'anchor-bancorp', 'ANCB');
        add('American Caresource', 'american-caresource', 'GNOW');
        add('Access National', 'access-national-corp', 'ANCX');
        add('The Andersons', 'the-andersons', 'ANDE');
        add('MGC Diagnostics', 'mgc-diagnostics', 'MGCD');
        add('AngioDynamics', 'angiodynamics', 'ANGO');
        add('Anika', 'anika-therapeutics', 'ANIK');
        add('ANSYS', 'ansys', 'ANSS');
        add('Anthera Pharma', 'anthera-pharmaceuticals', 'ANTH');
        add('Alpha & Omega Semiconductor', 'alpha-and-omega', 'AOSL');
        add('American Public Education', 'american-public-education', 'APEI');
        add('Apogee', 'apogee-enterprise', 'APOG');
        add('Riot Blockchain', 'venaxis', 'RIOT');
        add('Apricus Biosciences', 'apricus-biosciences', 'APRI');
        add('IRSA Propiedades ADR', 'alto-palermo-sa', 'IRCP');
        add('Asia Pacific Wire & Cable', 'asia-pacific-wire', 'APWC');
        add('Accuray', 'accuray-incorped', 'ARAY');
        add('Appliance Recycling', 'appliance-recycling', 'ARCI');
        add('Vereit', 'american-realty-c', 'VER');
        add('ARC Group', 'arc-wireless', 'ARCW');
        add('Approach Resources', 'approach-resource', 'AREX');
        add('Gentherm', 'gentherm', 'THRM');
        add('American Railcar', 'american-railcar', 'ARII');
        add('Ark Restaurants', 'ark-restaurants-corp', 'ARKR');
        add('Alliance Resource', 'alliance-resource', 'ARLP');
        add('Arrow', 'arrow-financial-corp', 'AROW');
        add('ArQule', 'arqule', 'ARQL');
        add('Array BioPharma', 'array-biopharma-inc', 'ARRY');
        add('Trecora Resources', 'arabian-american', 'TREC');
        add('Artesian', 'artesian-resource', 'ARTNA');
        add('Arts-Way', 'arts-way-manufacturing', 'ARTW');
        add('Arotech', 'arotech-corp', 'ARTX');
        add('Arrowhead Pharma', 'arrowhead-research-corp', 'ARWR');
        add('Associated Banc-Corp', 'associated-banc-corp', 'ASB');
        add('Ascent Capital', 'ascent-capital', 'ASCMA');
        add('Asta Funding', 'asta-funding', 'ASFI');
        add('On Assignment, Inc', 'on-assignment', 'ASGN');
        add('ASM ADR', 'asm-international-nv', 'ASMIY');
        add('Ascena Retail', 'ascena-retail', 'ASNA');
        add('AmeriServ', 'ameriserv', 'ASRV');
        add('Astrotech', 'astrotech-corp', 'ASTC');
        add('Astec', 'astec-industries', 'ASTE');
        add('Ascent Solar', 'ascent-solar-tech', 'ASTI');
        add('Vericel Corp Ord', 'aastrom-bioscienc', 'VCEL');
        add('Asure', 'asure-software-inc', 'ASUR');
        add('Amtech', 'amtech-systems', 'ASYS');
        add('ATA', 'ata-inc', 'ATAI');
        add('America First Tax', 'america-first-tax', 'ATAX');
        add('Astea', 'astea--international', 'ATEA');
        add('Alphatecs', 'alphatec-holdings', 'ATEC');
        add('athenahealth', 'athenahealth', 'ATHN');
        add('Athersys', 'athersys', 'ATHX');
        add('Ames', 'ames-national-corp', 'ATLO');
        add('ATN Int', 'atlantic-tele-net', 'ATNI');
        add('AtriCure', 'atricure', 'ATRC');
        add('ATRION', 'atrion-corp', 'ATRI');
        add('ATRM Holdings', 'aetrium-inc', 'ATRM');
        add('Astronics', 'astronics-corp', 'ATRO');
        add('Auburn', 'auburn-national-b', 'AUBN');
        add('AudioCodes', 'audiocodes?cid=15499', 'AUDC');
        add('AeroVironment', 'aerovironment', 'AVAV');
        add('Diversicare', 'diversicare', 'DVCR');
        add('AVEO', 'aveo-pharmaceuticals', 'AVEO');
        add('Avid', 'avid-technology', 'AVID');
        add('Sarepta', 'sarepta', 'SRPT');
        add('Aviat', 'aviat-networks', 'AVNW');
        add('A V Homes', 'a-v-homes', 'AVHI');
        add('Aware', 'aware', 'AWRE');
        add('Abraxas Petroleum', 'abraxas-petroleum', 'AXAS');
        add('AXT', 'axt-inc', 'AXTI');
        add('Natus', 'natus-medical-inc', 'BABY');
        add('Banc of California', 'banc-of-california', 'BANC');
        add('BancFirst', 'bancfirst-corp', 'BANF');
        add('Banner', 'banner-corp', 'BANR');
        add('Bioanalytical Systems', 'bioanalytical-sys', 'BASI');
        add('Hope Bancorp', 'bbcn-bancorp', 'HOPE');
        add('BreitBurn', 'breitburn-energy', 'BBEPQ');
        add('Beasley', 'beasley-broadcast', 'BBGI');
        add('Black Box', 'black-box-corp', 'BBOX');
        add('Bravo Brio', 'bravo-brio-restau', 'BBRG');
        add('Barrett', 'barrett-business', 'BBSI');
        add('BCB Bancorp', 'bcb-bancorp', 'BCBP');
        add('B Communications', 'b-communication?cid=15533', 'BCOM');
        add('Balchem', 'balchem-corp', 'BCPC');
        add('BioCryst', 'biocryst-pharmaceuticals', 'BCRX');
        add('Black Diamond', 'black-diamond', 'CLAR');
        add('Bridge Bancorp', 'bridge-bancorp', 'BDGE');
        add('Birner', 'birner-dental-man', 'BDMS');
        add('BioDelivery Sciences', 'biodelivery', 'BDSI');
        add('BioTelemetry', 'cardionet', 'BEAT');
        add('bebe stores', 'bebe-stores', 'BEBE');
        add('Beacon Roofing', 'beacon-roofing', 'BECN');
        add('Bel Fuse A', 'bel-fuse-inc-(a)', 'BELFA');
        add('Bel Fuse B', 'bel-fuse-inc-(b)', 'BELFB');
        add('Berkshire', 'berkshire-bancorp', 'BERK');
        add('BankFinancial', 'bankfinancial-corp', 'BFIN');
        add('BGC Partners', 'bgc-partners', 'BGCP');
        add('Big 5', 'big-5-sporting-go', 'BGFV');
        add('BG Medicine', 'bg-medicine', 'BGMD');
        add('Berkshire Hills Bancorp', 'berkshire-hills-b', 'BHLB');
        add('Biocept Inc', 'bioclinica', 'BIOC');
        add('Albireo Pharma', 'biodel-inc', 'ALBO');
        add('Green Brick Partners Inc', 'biofuel-energy', 'GRBK');
        add('BioScrip', 'bioscrip', 'BIOS');
        add('BJs Restaurants', 'bjs-restaurants', 'BJRI');
        add('Blueknight', 'blueknight-energy', 'BKEP');
        add('Bank Mutual', 'bank-mutual-corp', 'BKMU');
        add('Oak Ridge', 'oak-ridge-financial', 'BKOR');
        add('Bank of South Carolina', 'bank-of-south-car', 'BKSC');
        add('Builders FirstSource', 'builders-firstsou', 'BLDR');
        add('Bridgeline Digital', 'bridgeline-digita', 'BLIN');
        add('Blackbaud', 'blackbaud', 'BLKB');
        add('BSB Bancorp', 'bsb-bancorp', 'BLMT');
        add('BioLineRx', 'biolinerx-ltd', 'BLRX');
        add('Biolase', 'biolase-tech', 'BIOL');
        add('Bank of Marin', 'bank-of-marin-ban', 'BMRC');
        add('Biomarin Pharma', 'biomarin-pharmaceuticals', 'BMRN');
        add('Bryn Mawr Bank', 'bryn-mawr-bank-co', 'BMTC');
        add('Beneficial Mutual', 'beneficial-mutual', 'BNCL');
        add('Bonso Electronics Int', 'bonso-electronics', 'BNSO');
        add('Bob Evans', 'bob-evans-farms', 'BOBE');
        add('Bank of Commerce', 'bank-of-commerce', 'BOCH');
        add('BofI Holding', 'bofi-holding', 'BOFI');
        add('BOK Financial', 'bok-financial-corp', 'BOKF');
        add('The Bon-Ton', 'the-bon-ton-store', 'BONT');
        add('Dmc Global', 'dynamic-materials', 'BOOM');
        add('BOS', 'b.o.s.-better-onl', 'BOSC');
        add('Boston Private', 'boston-private-fi', 'BPFH');
        add('Modsys', 'bluephoenix-solut', 'MDSYF');
        add('Bridgford', 'bridgford-foods-c', 'BRID');
        add('Brookline Bancorp', 'brookline-bancorp', 'BRKL');
        add('Brooks Automation', 'brooks-automation', 'BRKS');
        add('Bassett', 'bassett-furniture', 'BSET');
        add('BroadSoft', 'broadsoft', 'BSFT');
        add('Biostar', 'biostar-pharmaceuticals', 'BSPM');
        add('BSQUARE', 'bsquare-corp', 'BSQR');
        add('Sierra Bancorp', 'sierra-bancorp', 'BSRR');
        add('BioSpecifics', 'biospecifics-tech', 'BSTC');
        add('Burcon Nutrascience Corp', 'burcon-nutrascience-corp?cid=15617', 'BUR');
        add('First Busey', 'first-busey-corp', 'BUSE');
        add('BroadVision', 'broadvision', 'BVSN');
        add('Broadwind', 'broadwind-energy', 'BWEN');
        add('Baldwin&Lyons A', 'baldwin---lyons-(a)', 'BWINA');
        add('Baldwin&Lyons B', 'baldwin---lyons-(b)', 'BWINB');
        add('Broadway Financial', 'broadway-financial', 'BYFC');
        add('China Automotive', 'china-automotive', 'CAAS');
        add('Camden', 'camden-national', 'CAC');
        add('Credit Acceptance', 'credit-acceptance', 'CACC');
        add('Cache', 'cache', 'CACH');
        add('China Construction Materials', 'china-advanced', 'CADC');
        add('The Cheesecake', 'the-cheesecake-factory', 'CAKE');
        add('Callidus', 'callidus-software', 'CALD');
        add('China Auto Logistics', 'china-auto-logist', 'CALI');
        add('magicJack VocalTec', 'magicjack-vocalte', 'CALL');
        add('Cal-Maine', 'cal-maine-foods', 'CALM');
        add('CalAmp', 'calamp-corp', 'CAMP');
        add('Camtek Ltd', 'camtek?cid=15640', 'CAMT');
        add('Carbonite', 'carbonite', 'CARB');
        add('Carolina Trust Bank', 'carolina-trust', 'CART');
        add('Carver', 'carver-bancorp', 'CARV');
        add('Meta Financial', 'meta-financial', 'CASH');
        add('CAS Medical', 'cas-medical-systems-inc', 'CASM');
        add('Cass', 'cass-information', 'CASS');
        add('Caseys', 'caseys-general', 'CASY');
        add('Cardtronics', 'cardtronics', 'CATM');
        add('Cathay', 'cathay-general', 'CATY');
        add('Cavium', 'cavium', 'CAVM');
        add('Net Element', 'net-element-inc', 'NETE');
        add('China Bak Battery', 'china-bak-battery', 'CBAK');
        add('Colony Bankcorp', 'colony-bankcorp', 'CBAN');
        add('Cleveland BioLabs', 'cleveland-biolabs', 'CBLI');
        add('CombiMatrix', 'combimatrix-corp', 'CBMX');
        add('China Biologic', 'china-biologic-products', 'CBPO');
        add('Cracker Barrel Old', 'cracker-barrelold-country', 'CBRL');
        add('Juniper Pharma', 'columbialaboratories', 'JNP');
        add('Commerce Bancshares', 'commerce-bancshar', 'CBSH');
        add('Capital City Bank', 'capital-city-bank', 'CCBG');
        add('China Ceramics Co', 'china-ceramics', 'CCCL');
        add('ChinaCaches', 'chinacache', 'CCIH');
        add('CNB Financial', 'cnb-financial-corp', 'CCNE');
        add('Cogent', 'cogent-communications', 'CCOI');
        add('Cross Country', 'cross-country', 'CCRN');
        add('Concurrent Computer', 'concurrent-comput', 'CCUR');
        add('Codexis', 'codexis', 'CDXS');
        add('Cadiz', 'cadiz', 'CDZI');
        add('CECO Environmental', 'ceco-environmenta', 'CECE');
        add('Career', 'career-education', 'CECO');
        add('Central Garden&Pet', 'central-garden---pet-co.', 'CENT');
        add('Central Garden&Pet A', 'central-garden-pet-a', 'CENTA');
        add('Cereplast Inc', 'cereplast', 'CERPQ');
        add('Cerus', 'cerus-corp', 'CERS');
        add('Central European Media', 'cent-euro-medi?cid=15692', 'CETV');
        add('CEVA', 'ceva', 'CEVA');
        add('Central Federal', 'central-federal', 'CFBK');
        add('C&F Financial', 'c-f-financial-corp', 'CFFI');
        add('Capitol Federal', 'capitol-federal-financial', 'CFFN');
        add('California First National', 'california-first', 'CFNB');
        add('Pingtan Marine', 'pingtan-marine', 'PME');
        add('Compugen Ltd', 'compugen?cid=15702', 'CGEN');
        add('Cognex', 'cognex-corp', 'CGNX');
        add('Comstock', 'comstock-homebuil', 'CHCI');
        add('City Holding', 'city-holding-comp', 'CHCO');
        add('Churchill Downs', 'churchill-downs', 'CHDN');
        add('The Chefs Warehouse', 'the-chefs-warehouse', 'CHEF');
        add('Chemical', 'chemical-financial', 'CHFC');
        add('Charter Financial', 'charter-financial', 'CHFN');
        add('Cherokee', 'cherokee-inc', 'CHKE');
        add('China Natural Resources', 'china-natural', 'CHNR');
        add('China Gerui Advanced Materials', 'china-gerui', 'CHOPF');
        add('Coherus BioSciences', 'charming-shoppes', 'CHRS');
        add('Charter Communications', 'charter-communications', 'CHTR');
        add('Cinedigm', 'cinedigm-digital', 'CIDM');
        add('Fanhua', 'cninsure-inc', 'FANH');
        add('Citizens', 'citizens-holding', 'CIZN');
        add('China Jo-Jo Drugstores', 'china-jo-jo-drugs', 'CJJD');
        add('Collectors Universe', 'collectors-univer', 'CLCT');
        add('Celldex', 'celldex-therapeutics', 'CLDX');
        add('Clearfield', 'clearfield', 'CLFD');
        add('Calumet', 'calumet-specialty', 'CLMT');
        add('Clean Energy', 'clean-energy-fuel', 'CLNE');
        add('Cleantech Solutions Int', 'cleantech', 'CLNT');
        add('ClearOne', 'clearone-communications', 'CLRO');
        add('Town Sportss', 'town-sports-international', 'CLUB');
        add('Clovis', 'clovis-oncology', 'CLVS');
        add('Euro Tech', 'euro-tech-holding', 'CLWT');
        add('Columbus McKinnon', 'columbus-mckinnon', 'CMCO');
        add('Cumulus', 'cumulus-media-inc', 'CMLS');
        add('Destination XL Group', 'destination-xl', 'DXLG');
        add('Comtech', 'comtech-tele', 'CMTL');
        add('Commercial National Financial', 'commercial-nation', 'CNAF');
        add('Century Bancorp', 'century-bancorp', 'CNBKA');
        add('Fortress Biotech', 'coronado-bioscien', 'FBIO');
        add('Chinanet Online', 'chinanet-online', 'CNET');
        add('China Information Tech', 'china-information', 'CNIT');
        add('CONMED', 'conmed-corp', 'CNMD');
        add('Consolidated Communications', 'consolidated-comm', 'CNSL');
        add('China Techfaith', 'china-techfaith', 'CNTF');
        add('Century Casinos', 'century-casinos', 'CNTY');
        add('CoBiz', 'cobiz-financial', 'COBZ');
        add('Viewtran Group Inc', 'cogo-group', 'VIEWF');
        add('Coherent', 'coherent', 'COHR');
        add('Cohu', 'cohu', 'COHU');
        add('Coca-Cola Bottling', 'coca-cola-bottlin', 'COKE');
        add('Columbia Banking', 'columbia-banking', 'COLB');
        add('Columbia Sportswear', 'columbia-sportswear', 'COLM');
        add('Conns', 'conns', 'CONN');
        add('Polarityte', 'majesco-entertainment', 'COOL');
        add('Core-Mark', 'core-mark-holding', 'CORE');
        add('Corcept', 'corcept-therapeutics', 'CORT');
        add('Cowen Group', 'cowen-group', 'COWN');
        add('Two Rivers Bancorp', 'two-rivers-bancorp', 'TRCB');
        add('Canterbury Park', 'canterbury-park', 'CPHC');
        add('Cumberland', 'cumberland-pharma', 'CPIX');
        add('Capella', 'capella-education', 'CPLA');
        add('Capital Product Partners', 'capital-product-partners', 'CPLP');
        add('Catalyst Pharmaceuticals', 'catalyst-pharmaceuticals', 'CPRX');
        add('Computer Programs&Systems', 'computer-programs', 'CPSI');
        add('China Precision Steel', 'china-precision', 'CPSL');
        add('Consumer Portfolio Services', 'consumer-portfolio', 'CPSS');
        add('CRA', 'cra-international', 'CRAI');
        add('Cray', 'cray-inc', 'CRAY');
        add('Dextera Surgical', 'cardica', 'DXTR');
        add('China Recycling Energy', 'china-recycling', 'CREG');
        add('Cresud SACIF', 'cresud-s.a.c.i.f.', 'CRESY');
        add('Curis', 'curis', 'CRIS');
        add('Crumbs', 'crumbs-bake-shop', 'CRMBQ');
        add('Cardiome Pharma Corp', 'cardiome-pharma-corp?cid=15813', 'CRME');
        add('Americas Car-Mart', 'americas-car-mart', 'CRMT');
        add('Ceragon Networks Ltd', 'ceragon?cid=15815', 'CRNT');
        add('Bay Bancorp Inc', 'carrollton-bancor', 'BYBK');
        add('CorVel', 'corvel-corp', 'CRVL');
        add('Crown Crafts', 'crown-crafts', 'CRWS');
        add('Carrizo Oil&Gas', 'carrizo-oil---gas', 'CRZO');
    }

    function add(name, url, shortName) {
        _stocks.push({
            name: name,
            url: urlBase + url,
            shortName: shortName
        });
    }

    ctor();
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


_investStocks.ctx.register("FavouriteStocksFiltering").asCtor(FavouriteStocksFiltering).dependencies("FinamFavouriteStocks, FavouriteStocksAnalyzer, LocalStorageHelper, InvestingConsts");

function FavouriteStocksFiltering(FinamFavouriteStocks, FavouriteStocksAnalyzer, LocalStorageHelper, InvestingConsts) {
    this.createRefreshedFavouriteStockList = createRefreshedFavouriteStockList;

    function createRefreshedFavouriteStockList() {
        var statistics = LocalStorageHelper.get(InvestingConsts.favouriteStocksStatisticsLocalStorageKey);
        var currentFavouriteStocks = FinamFavouriteStocks.getAll();

        if (!statistics || !statistics.length) {
            throw "You should run favouriteStocksAnalyzer to collect stocks statistics before fixing favourite stock list";
            return;
        }

        if (statistics.length != currentFavouriteStocks.length) {
            throw 'current favourite stock list is not equal to collected statistics';
            return;
        }

        var newFavouriteStocksScript = "";

        statistics.forEach(function (stockWithStatistics) {
            var currentStock = FinamFavouriteStocks.getByUrl(stockWithStatistics.url);

            if (!currentStock) {
                throw 'could not find related stock by url ' + stockWithStatistics.url;
                return;
            }

            var stockIsGood = isGoodStock(stockWithStatistics);

            var url = currentStock.url.replace(InvestingConsts.stockBaseUrl, '');
            newFavouriteStocksScript += 'add("' + currentStock.name + '", "' + url + '", ' + stockIsGood + ');\n';
        });

        console.log(newFavouriteStocksScript);
    }

    function isGoodStock(stockWithStatistics) {
        return stockWithStatistics.yearRate > 20;
    }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InvestingConsts = {
    favouriteStocksStatisticsLocalStorageKey: "favouriteStocksAnalitycs",
    stockBaseUrl: "https://ru.investing.com/equities/"
};

_investStocks.ctx.register("InvestingConsts").asInstance(InvestingConsts);

/***/ })
/******/ ]);