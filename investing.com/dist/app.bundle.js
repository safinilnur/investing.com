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

    //_investStocks.ctx.get('FavouriteStocksAnalyzer').loadData();
    //_investStocks.ctx.get('InvestingAvailablefunctions').getAll();
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

        add("NVIDIA", "nvidia-corp", true);
        add("Netflix", "netflix,-inc.", true);
        add("boeing", "boeing-co", true);
        add("Alibaba", "alibaba", true);
        add("AMD", "adv-micro-device", true);
        add("Micron", "micron-tech", true);
        add("Applied materials", "applied-matls-inc", true);
        add("DXC Technology", "comp-science", false);
        add("Transcontinental", "transcontinental-realty-investors", false);
        add("Nutrisystems", "nutrisystems", false);
        add("Extreme-networks", "extreme-networks", false);
        add("Tesla", "tesla-motors", true);
        add("paypal", "paypal-holdings-inc", true);
        add("google", "google-inc", true);
        add("apple", "apple-computer-inc", true);
        add("autodesk", "autodesk-inc", true);
        add("microsoft", "microsoft-corp", true);
        add("adobe", "adobe-sys-inc", true);
        add("facebook", "facebook-inc", true);
        add("visa", "visa-inc", true);
        add("activision", "activision-inc", true);
        add("salesforce", "salesforce-com", true);
        add("amazon", "amazon-com-inc", true);

        add("jp-morgan", "jp-morgan-chase", true);
        add("momo", "momo-inc", true);
        add("transocea", "transocea-ltd", true);
        add("celgene", "celgene-corp", true);
    }

    function add(name, url, isInFinam) {
        if (isInFinam) {
            var id = url.replace(/[.,]/g, "");
            _stocks.push({ name: name, url: urlBase + url, id: id });
        }
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
        if (hasNotLoadedItems("main")) {
            var itemToLoad = getNotLoadedItem("main");

            if (location.href != itemToLoad.url) {
                location.href = itemToLoad.url;
            } else {
                attachMainStockInfo(itemToLoad);
                if (hasNotLoadedItems("main")) {
                    var itemToLoad = getNotLoadedItem("main");
                    if (location.href != itemToLoad.url) {
                        location.href = itemToLoad.url;
                    }
                } else {
                    loadHistoricalData();
                }
            }
        } else {
            loadHistoricalData();
        }
    }

    function loadHistoricalData() {
        if (hasNotLoadedItems("historical")) {
            var itemToLoad = getNotLoadedItem("historical");

            if (location.href != itemToLoad.url + "-historical-data") {
                location.href = itemToLoad.url + "-historical-data";
            } else {
                attachHistoricalStockInfo(itemToLoad); // todo
                if (hasNotLoadedItems("historical")) {
                    var itemToLoad = getNotLoadedItem("historical");
                    if (location.href != itemToLoad.url + "-historical-data") {
                        location.href = itemToLoad.url + "-historical-data";
                    }
                } else {
                    setInitialDistribution();
                    showStatistics();
                    //clearPreviousData(); // comment for debug
                }
            }
        } else {
            showStatistics();
        } // uncomment for debug
    }

    function attachHistoricalStockInfo(item) {
        var rows = $('.historicalTbl tbody tr');
        if (rows.length < 15) throw "Rows count should be more than 15 for historical data. Something went wrong...";

        item.historicalData = {};

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            item.historicalData[i] = {
                maxPrice: parseFloat($($(row).find('td')[3]).html().replace(',', '.'))
            };
        }

        item.historicalData.maxLastTenDaysPrice = item.historicalData[0].maxPrice;
        for (var i = 1; i < 10; i++) {
            if (item.historicalData.maxLastTenDaysPrice < item.historicalData[i].maxPrice) item.historicalData.maxLastTenDaysPrice = item.historicalData[i].maxPrice;
        }

        debugger;
        item.historicalData.percentTenDaysFall = item.historicalData.maxLastTenDaysPrice > item.stockPrice ? Math.round((item.historicalData.maxLastTenDaysPrice - item.stockPrice) / item.stockPrice * 100 * 100) / 100 : 0;

        item.historicalDataCollected = true;
        saveItemInStorage(item);
    }

    function setInitialDistribution() {
        var items = getStorageData();

        if (!items || !items.length) {
            return;
        }

        items = items.sort(sortStocksByPriority);

        for (var i = 0; i < 5; i++) {
            items[i].inPortfolio = true;
        }saveData(items);
    }

    function showStatistics() {
        var items = getStorageData();

        if (!items.length) {
            return;
        }

        splitMoneyByChoosenStocks(items);

        var itemsHtml = items.map(function (i) {
            return "<tr>" + "<td><a href='" + i.url + "'>" + i.name + "</a></td>" + "<td>" + FinamStockRecommendationTypes.convertRecommendationToString(i.technicalSummary) + "</td>" + "<td>" + i.stockPrice + "</td>" + "<td>" + i.yearRate + "</td>" + "<td>" + i.historicalData.percentTenDaysFall + "</td>" + "<td>" + (i.countToBuy || "") + "</td>" + "<td><input type='checkbox' id='" + i.id + "'/></td>" + "</tr>";
        });
        var resultHtml = "<div class='stock-recommedations'><table>" + "<tr>" + "<th>Название</th>" + "<th>Тех. рекомендация</th>" + "<th>Цена</th>" + "<th>Годовой рост</th>" + "<th>10дн падение</th>" + "<th>Позиция</th>" + "<th>Участие</th>" + "</tr>" + itemsHtml + "<tr><td colspan='7'>Расчет по портфелю: " + FinamFavouriteStocks.portfolioVolume + "$</td></td></tr>" + "<tr><td colspan='7'>Остаток средств: " + parseInt(getAvailabeDollarsAmount(items)) + "$</td></td></tr>" + "<tr><td colspan='7'>" + "<button id='close-favourite-stocks-report'>Очистить</button>" + "</td></tr>" + "</table></div>";
        $('body').html(resultHtml);

        CssStockRecommendations.appendStyle();
        initializeCheckBoxes(items);
        initializeButtonsEvents();
    }

    function initializeButtonsEvents() {
        $('#close-favourite-stocks-report').unbind('click');
        $('#close-favourite-stocks-report').bind('click', function () {
            clearPreviousData();
        });
    }

    function initializeCheckBoxes(items) {
        items.forEach(function (i) {
            if (i.countToBuy) {
                $('#' + i.id).attr('checked', 'checked');
            }
            $('#' + i.id).unbind('click');
            $('#' + i.id).bind('click', function (el) {
                var items = getStorageData();
                var id = $(el.currentTarget).attr('id');
                var stock = items.find(function (e) {
                    return e.id == id;
                });
                stock.inPortfolio = $(el.currentTarget).is(':checked');
                saveItemInStorage(stock);
                showStatistics();
            });
        });
    }

    function sortStocksByPriority(a, b) {
        // todo move to extra module
        if (a.technicalSummary < b.technicalSummary) // sort by technicalSummary
            return 1;else if (a.technicalSummary > b.technicalSummary) return -1;else {
            if (a.percentTenDaysFall < b.percentTenDaysFall) // then by yearRate
                return 1;else if (a.percentTenDaysFall > b.percentTenDaysFall) return -1;else return 0;
        }
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

            for (var i = 0; i < items.length; i++) {
                var _item = items[i];

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

    function attachMainStockInfo(item) {
        var minimalEstimation = getMinimalEstimation();
        var stockPrice = getStockPrice();
        var yearRate = getYearRate();

        item.technicalSummary = minimalEstimation;
        item.stockPrice = stockPrice;
        item.mainDataCollected = true;
        item.yearRate = yearRate;
        saveItemInStorage(item);
    }

    function getYearRate() {
        if ($('#leftColumn > div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_1').html() == "Изменение за год") {
            var rateWithPercent = $('#leftColumn > div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_2.bold').html();
            var rate = parseFloat(rateWithPercent.slice(0, -1).replace(",", "."));

            return rate;
        }
    }

    function getStockPrice() {
        // todo move
        var stockPrice = parseFloat($('#last_last').html().replace(".", "").replace(",", "."));

        return stockPrice;
    }

    function getMinimalEstimation() {
        // todo move to separate module
        var hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        var dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();
        var minimalEstimation = FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);

        return minimalEstimation;
    }

    function hasNotLoadedItems(type) {
        return getNotLoadedItem(type) != null;
    }

    function getNotLoadedItem(type) {
        var propName = type + "DataCollected";
        return getStorageData().find(function (s) {
            return !s[propName];
        });
    }

    function setInitialData() {
        var dataToCollect = FinamFavouriteStocks.getAll().map(function (s) {
            s.mainDataCollected = false;
            return s;
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
        return '\n        .stock-recommedations tr {       font-size: 16px;   font-family: cursive;        }\n        .stock-recommedations td,.stock-recommedations th {\n                padding:5px 0 0 15px}\n\n            .stock-recommedations table {position: relative;text-align: left;margin: auto;}\n\n            .stock-recommedations  tr,.stock-recommedations th, .stock-recommedations td {\n                border: 1px solid;\n            }\n\n            .stock-recommedations th {\n                font-weight: 800;\n            }        \n        ';
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
        console.log("\n1) Sort your favourite list of stocks by technical recommendations. Run:\n_investStocks.ctx.get('FavouriteStocksAnalyzer').run();\n\n2) Get filtered USA stocks (filter by day, mont, year gain). \nGo to page Page: https://ru.investing.com/equities/united-states and run:\n_investStocks.ctx.get('LoadYearStatistics').load();  \n\n3) Get all stocks from spb exchange \nGo to page Page: http://www.spbexchange.ru/ru/stocks/inostrannye/Instruments.aspx and run:\n_investStocks.ctx.get('GetSpbStockList').getAllStocks(); \n\n4) get all usa stock list\nGo to page https://ru.investing.com/equities/united-states and run \n_investStocks.ctx.get('InvestingStockListRetreiver').getAllUsaStocks(); \n        ");
    }
}

/***/ }),
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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

/***/ })
/******/ ]);