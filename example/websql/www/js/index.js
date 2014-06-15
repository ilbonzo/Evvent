/* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var app = {

    db: null,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        setTimeout(function () {
            var appElement = document.getElementById('app');
            appElement.setAttribute('style', 'display:none');
        }, 500);
        this.db = window.openDatabase('evvent', '1.0', 'Evvent', 5242880);
        this.db.transaction(this.runTransaction, this.onError, this.onSuccess);

    },
    runTransaction: function (t){
        // t.executeSql('DROP TABLE events');
        t.executeSql('CREATE TABLE IF NOT EXISTS events (name unique)');
    },
    onError: function (error){
        console.log('Error creating tables: ' + error);
    },
    onSuccess: function (){
        console.log('Successfully created tables');
        app.listEvent();
    },
    saveEvent: function (event){
        var self = this;
        console.log(event);
        event.preventDefault();

        var input = document.getElementById('event');
        var eventName = input.value;
        console.log(eventName);

        self.db.transaction(function (tx) {
            tx.executeSql('INSERT INTO events (name) VALUES (?)', [eventName], function(t, results){
                self.successSave(results)
            }, self.error);
        });

    },
    successSave: function (t, results) {
        this.listEvent();
    },
    error: function (t, errorHandler) {
        console.log('error');
        console.log(errorHandler);
    },
    listEvent: function () {
        var self = this;

        var el = document.getElementById('events');
        el.innerHTML = '';

        self.db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM events', [], function(t, results){
                for(var i = 0; i < results.rows.length; i++){
                    var element = document.createElement('li');
                    var text = document.createTextNode(results.rows.item(i).name);
                    element.appendChild(text);
                    el.appendChild(element);
                }
            }, self.error);
        });
    }

};
