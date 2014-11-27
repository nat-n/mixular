
angular.module('mixularApp')

  .service('optionLists', function ($rootScope, $log) {
    'use strict';

    var directory = {
      yesOrNo: {
        options: [
          {value: 'yes', lavel: 'Yes'},
          {value: 'no',  label: 'No'}
        ]
      }
    };


    /*
     * Manages watching of options lists
     */
    var listenerSetFactory = (function () {

      function addListener(cb, conditionFunc) {
        var self = this;
        self.push({
          condition: conditionFunc,
          callback: cb
        })

        // If there is now one listener then create a new watcher.
        // Tolerate the option list not yet existing.
        if (self.length === 1) {
          self.watcher = $rootScope.$watch(
            function () { return (directory[self.listName] || {}).options; },
            self.cb
          )
        }
      };

      // For each registered listener,
      //  if the condition is still met, then call the associated callback,
      //  otherwise deregister the listener
      function listenerSetCallback(listeners) {
        var listenersAlive = _.map(listeners, function(listener) {
          if (listener.condition()) {
            listener.callback(angular.copy(directory[listeners.listName].options));
            return true;
          }
        });
        for (var i = listenersAlive.length - 1; i >= 0; i--) {
          if (!listenersAlive[i]) { listeners.splice(i,1); }
        };

        // if there are no listeners left then kill the watcher
        if (listeners.length === 0) {listeners.watcher()}
      };

      return function listenerSetFactory (listName) {
        var listeners = [];
        listeners.listName = listName;
        listeners.watcher = null;
        listeners.add = addListener;
        listeners.cb = function() { listenerSetCallback.call(listName, listeners) };
        return listeners;
      }
    })()


    function registerOptionList (listName, optionsArray) {
      directory[listName] = {
        options: optionsArray,
        watcher: new listenerSetFactory(listName)
      };
    }


    /*
     * Watch the named option list, and call the callback with it everytime it
     * changes until conditionFunc returns false
     */
    function watchOptionList (listName, callBack, conditionFunc) {
      if (!directory.hasOwnProperty(listName)) {
        $log.error('No known option list with name: ', listName);
        return;
      }

      directory[listName].watcher.add(callBack, conditionFunc);
    }

    /*
     * Synchronously retireve the named list of options
     */
    function getOptionList (listName) {
      if (!directory.hasOwnProperty(listName)) {
        $log.error('No known option list with name: ', listName);
        return;
      }
      return angular.copy(directory[listName].options);
    }


    /*
     * Update the contents of an optionList.
     * The updateFunc will be passed the options array and expected to return
     * a new options array or falsey for null effect.
     */
    function updateOptionList (listName, updateFunc) {
      var newOptions;

      if (!directory.hasOwnProperty(listName)) {
        $log.error('No known option list with name: ', listName);
        return;
      }

      newOptions = updateFunc(angular.copy(directory[listName].options));

      if (newOptions) {
        directory[listName] = {
          options: newOptions
        };

        // delete lookup property, assuming it is no longer valid
        if (!directory[listName].hasOwnProperty('lookup')) {
          delete directory[listName].lookup;
        }
      }
    }


    /*
     * Efficiently lookup the label associated with a certain value.
     */
    function lookupOptionLabel (listName, value) {
      if (!directory.hasOwnProperty(listName)) {
        $log.error('No known option list with name: ', listName);
        return;
      }

      // Generate lookup object if it doesn't already exist
      if (!directory[listName].hasOwnProperty('lookup')) {
        directory[listName] = {};
        _.each(directory[listName].options, function (opt) {
          directory[listName].lookup[opt.value] = opt.label;
        });
        Object.freeze(directory[listName]);
      }

      // Perform lookup
      return directory[listName].lookup[value];
    }

    var optionLists = {
      register: registerOptionList,
      get: getOptionList,
      watch: watchOptionList,
      update: updateOptionList,
      lookup: lookupOptionLabel
    };
    Object.freeze(optionLists);
    return optionLists;
  })
