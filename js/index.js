$(function () {
    var Facade = Backbone.Model.extend({
        path: "mock.php?type=",
        defaults:{
            allTasks:0,
            doneTasks:0
        },
        newTask: function(){
            this.set({"allTasks" : this.get("allTasks")+1});
         
        },
        doneTask:function(){
            this.set({"doneTasks" : this.get("doneTasks")+1});
        },
        percent: function(){
            var percent=0;
            if (this.get("allTasks")!=0){
                percent= (this.get("doneTasks")/this.get("allTasks"))*100;
            }
            return percent;
            
        },
        zero: function(){
          this.set({allTasks:0,doneTasks:0});  
        },
        ask: function(type, data, sender, receiver){
            this.newTask();
            var senderIN=sender;
            var receiverIN=receiver;
            var tasksIN=this;
            $.ajax({
                url: this.path+type,
                type: "post",
                data: data,


                success: function( data ) {
                    senderIN.answerFacade(data, receiverIN);
                    tasksIN.doneTask();   
                },
                error:function(){
                    tasksIN.doneTask();

                }
            });
        }
    });
    
  
    
    
    
    
    _.templateSettings = {interpolate : /\{\{(.+?)\}\}/g};
    //Block models
    var Parametrs= Backbone.Model.extend({
       defaults: {
           number:0
           
       } 
    });
    
    var Station= Backbone.Model.extend({ 
        defaults: {
            "title": "",
            "station_id": 0
        }
    });
    
    var Stations= Backbone.Collection.extend({
        model: Station
    });
    
    var Date = Backbone.Model.extend({ 
        defaults: {
            "date": "" 
        }
    });
    
    var Dates = Backbone.Collection.extend({
        model: Date
    });
    
    var Trip= Backbone.Model.extend({
        defaults: {
            "parametrs" : Parametrs,
            "stationsFrom": Stations,
            "stationsTo": Stations,
            "dates": Dates
        },
        constructFrom:function (obj){
               var parametrs = new Parametrs(obj.parametrs);
               var stationsFrom = new Stations(obj.stationsFrom);
               var stationsTo = new Stations(obj.stationsTo);
               var dates = new Dates(obj.dates);
               this.set({
                   "parametrs" : parametrs,
                   "stationsFrom": stationsFrom,
                   "stationsTo": stationsTo,
                   "dates": dates
                                  
               });
               
               
               
               
       
        },
        combinated: function(tid){
            var arr =  new Array();
            this.get("dates").each(function(date){
                this.get("stationsFrom").each(function(stationFrom){
                    this.get("stationsTo").each(function(stationTo){
                        arr[arr.length]={
                            datestart: date.get("date"),
                            station_id_from: stationFrom.get("station_id"),
                            station_from: stationFrom.get("title"),
                            station_id_till: stationTo.get("station_id"),
                            station_till: stationTo.get("title")
                        };
                       
                    },this)
                    
                },this)
                
                
            },this);
            return arr;
            
        }

    });
    
    var Travel= Backbone.Collection.extend({
       model: Trip,
       constructFrom:function (obj){
           _.each(obj, function (one){
               var trip=new Trip();
               trip.constructFrom(one);
               this.add(trip);
               
               
           },this );
       }
       
    });
    
    var History= Backbone.Collection.extend({
       collection: Travel 
    });
    //End block models
   /* //Block model search
    var Coach = Backbone.Model.extend({
        defaults:{
            "num":9,
            "service":true,
            "places_cnt":4,
            "places":[],
            "price":13638,
            "reserve_price":1700,
            "station_id_from":"2210700",
            "station_id_till":"2210770",
            "train":"226\u0428",
            "date_start":"2012-07-21",
            "coach_type_id":"3"
        }
        
    });
    var Coaches=Backbone.Collection.extend({
        model: Coach,
        initialize: function () { 
            this.on('add', this.buildOne, this);
        },
        buildOne: function(one){
            //var tasksIN=tasks;
            tasks.newTask();
            $.ajax({
                    url: "mock.php?type=coach/",
                    type: "post",
                    data:{
                        "station_id_from": one.get("station_id_from"),
                        "station_id_till": one.get("station_id_till"),
                        "train": one.get("train"),
                        "coach_num": one.get("num"),
                        "coach_type_id": one.get("coach_type_id"),
                        "date_start": one.get("date_start")
           	  
                    },

                    success: function( data ) {                        
                        one.set({"places" : data.value});
                        tasks.doneTask();
                            
                    },
                    error: function(){
                        tasks.doneTask();
                    }
                        
            });
        }
    });
    
    var Type = Backbone.Model.extend({
        defaults:{
            coaches: Coaches
            
            
                
        }
        
       
    }) ;
    
    var Types=Backbone.Collection.extend({
        model: Type
    });
    
    var Train = Backbone.Model.extend({
        defaults:{
            "num":"226\u0428",
            "model":0,
            "from":{},
            "till": {},
            "dateForSearch":"",
            "typesForSearch": {},
            "station_id_from": 2210700,
            "station_id_till": 2210770,
            "types": null

        }
        
        
        
        
    });
    var Trains=Backbone.Collection.extend({
        model: Train,
        initialize: function () { 
            this.on('add', this.buildOne, this);
        },
        buildOne: function (one){
            var types=new Types();
            one.set("types", types);
            _.each(one.get("typesForSearch"),function(eachType){
                //var tasksIN=tasks;
                tasks.newTask();
                $.ajax({
                    url: "mock.php?type=coaches/",
                    type: "post",
                    data:{                    
                        "station_id_from":	one.get("station_id_from"),
                        "station_id_till":	one.get("station_id_till"),
                        "train":	one.get("num"),
                        "coach_type_id": eachType.type_id,
                        "date_start": one.get("dateForSearch"),
                        "round_trip":0	  
                    },



                    success: function( data ) {
                        
                        var type=new Type();
                        var coaches=new Coaches();
                        
                        _.each(data.value.coaches,function(eachCoach){
                            
                            var coach=new Coach();
                            coach.set({
                                "num": eachCoach.num,
                                "service":eachCoach.service,
                                "places_cnt":eachCoach.places_cnt,
                                "places":[],
                                "price": eachCoach.price,
                                "reserve_price":eachCoach.reserve_price,
                                "station_id_from":eachCoach.station_id_from,
                                "station_id_till":eachCoach.station_id_till,
                                "train":eachCoach.train,
                                "date_start":eachCoach.date_start,
                                "coach_type_id":eachCoach.coach_type_id


                            });
                            coaches.add(coach);
                            
                        },this)
                        type.set({"coaches":coaches});
                        one.get("types").add(type);
                        tasks.doneTask();
                    },
                    error: function(){
                        tasks.doneTask();
                    }
                });
            },this);
                
        }
        
        
    });
    
    var SimpleTrip=Backbone.Model.extend({
        defaults:{
          "stationFrom": Station,
          "stationTo": Station,
          "date": Date,
          "trains": Trains
             
        }
        
        
    });
    
    var SimplesTrip=Backbone.Collection.extend({
       model: SimpleTrip,
       initialize: function () { 
            this.on('add', this.buildOne, this);
            
        },
        buildOne: function (one){
            var trains=new Trains();
            one.set("trains", trains);
            //var tasksIN=tasks;
            tasks.newTask();
            $.ajax({
                url: "mock.php?type=search/",
                type: "post",
                data:{                    
                    "station_id_from": one.get("stationFrom").get("station_id"),
                    "station_id_till": one.get("stationTo").get("station_id"),
                    "station_from": one.get("stationFrom").get("title"),
                    "station_till": one.get("stationTo").get("title"),
                    "date_start": one.get("date").get("date"),
                    "time_from": "00:00",
                    "search" : ""	  
                },



                success: function( data ) {
                    _.each(data.value,function(eachTrain){
                        var train=new Train();
                        train.set({
                            "station_id_from": one.get("stationFrom").get("station_id"),
                            "station_id_till": one.get("stationTo").get("station_id"),
                            "num": eachTrain.num,
                            "model":eachTrain.model,
                            "from": eachTrain.from,
                            "till": eachTrain.till,
                            "dateForSearch": eachTrain.from.date,
                            "typesForSearch": eachTrain.types
            
                            
                        });
                        one.get("trains").add(train);
                        
                        
                    },this)
                    tasks.doneTask();
                },
                error: function(){
                        tasks.doneTask();
                    }
            });
                
        }
            
        
       
    });
    
    var TripResult=Backbone.Model.extend({
        defaults: {
            "trip": "Trip",
            "simplesTrip": "SimplesTrip"

        }

    });
    
    var TravelResult= Backbone.Collection.extend({
        model: TripResult,
        initialize: function () { 
            this.on('add', this.buildOne, this);
            
        },
        build: function (travel) {
              travel.each(function(one){
                
                this.add({trip:one})
            },this);
        },
        buildOne: function (one) {
            var simplesTrip= one.get("trip").combinated();
            one.set("simplesTrip", simplesTrip);
            
            
            
        }
        
    }); 
  */
    //End block model search
    //Block AppViews
    var AppView=Backbone.View.extend({
        initialize: function (options) {
            var testString='[{"parametrs":{"number":"1"},"stationsFrom":[{"title":"Днепропетровск Главный","station_id":2210700}],"stationsTo":[{"title":"Евпатория-Курорт","station_id":2210770},{"title":"Симферополь","station_id":2210001}],"dates":[{"date":"24.08.2012"},{"date":"25.08.2012"},{"date":"26.08.2012"}]},{"parametrs":{"number":"1"},"stationsFrom":[{"title":"Евпатория-Курорт","station_id":2210770},{"title":"Симферополь","station_id":2210001}],"stationsTo":[{"title":"Днепропетровск Главный","station_id":2210700}],"dates":[{"date":"29.08.2012"},{"date":"30.08.2012"},{"date":"31.08.2012"}]}]';
            
            
            this.render();
            
            travel= new Travel();
            var travelView = new TravelView({collection: travel, el :$(this.el).children($(".TravelView"))});
            
            
            travel.constructFrom(JSON.parse(testString));
            
        },
        events: {
           
            "click .search" : "search",
            "click .console" : "consoleShow"
        },
        
        template: _.template($('#AppView').html()),
        search: function(){
            facade.zero();
            var tasksView= new TasksView({model:facade, el :$(this.el).find($(".Result"))});

            travelResult=new TravelResult();
            
            travelResult.downloadPlaces(travel);

            
        },
        consoleShow: function(){
            
            console.log(JSON.stringify(travel));
            console.log(travel);
            console.log(JSON.stringify(travelResult));

            
        },
        render: function(){
            $(this.el).html(this.template());
            $(this.el).children("button").button();
            
        }
        
            
        
    });
    //End block AppViews
    // Block views
    var ParametrsView = Backbone.View.extend({
        template: _.template($('#Parametrs').html()),
        events: {
            "change .number" : "changeNumber"
        },
        initialize: function () { 
            this.model.on('change', this.render, this);
        },
        changeNumber:function(){
            this.model.set("number", $(this.el).find(".number").val());
        },
        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
            
            
        }
        
    });
    
    
    var InputView = Backbone.View.extend({
        tagName: "span",
        events: {        
            "click .del" : "deleteOne"
        },
        initialize: function (options) { 
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
 
            this.model.trigger("change");
        },
        deleteOne: function() {
            this.model.destroy();
            return false;
        },
        remove: function() {
            $(this.el).fadeOut('slow', function() {$(this).remove()});
	}      
    });
    
    var DateView = InputView.extend({
        template: _.template($('#DateView').html()),
        render: function () {
            var modelIN=this.model;
            $(this.el).html(this.template(this.model.toJSON()));
            $(this.el).children("input").datepicker( {
                dateFormat: "dd.mm.yy",
                firstDay:1,
                onSelect: function(dateText, inst) {
                    modelIN.set( {"date": dateText}) 
                }
            });
            $(this.el).children("button").button();    
            return this;  
        }
           
    });
    
    var StationView = InputView.extend({
        template: _.template($('#StationView').html()),
        render: function () {
            var modelIN=this.model;
            $(this.el).html(this.template(this.model.toJSON()));
            $(this.el).children("input").autocomplete({
                        source: function( request, response ) {
                            request.answerFacade= function(data, response){
                                response( $.map( data.value, function( item ) {
                                    return {
                                            label: item.title,
                                            value: item.title,
                                            station_id: item.station_id
                                    }
                                }));
                            
                            };
                            facade.ask("station/"+request.term+"/", null, request, response);
                            
                        },
                        minLength: 3,
                        
                        select: function( event, ui ) {
                            modelIN.set( {"title": ui.item.label, "station_id" : ui.item.station_id});
                        }
            });
            $(this.el).children("button").button();
            return this;
        }
    });
    
    
    var EnumsView = Backbone.View.extend({

        events: {
            "click .add" : "createOne"
        },
        initialize: function() {
            

            this.collection.on('add', this.addOne, this);

        },   
        render: function() {
            $(this.el).html(this.template());
            $(this.el).children("button").button();
            this.collection.each(this.addOne, this)
            return this;
        },
        createOne: function() {
            this.collection.add();
        }


    });
    

    var StationsView = EnumsView.extend({
        template: _.template($('#StationsView').html()),
        addOne: function(one) {
            var oneView = new StationView({model: one});
            $(this.el).children("span").append(oneView.render().el);
        }
        
        
    });
    
    var DatesView = EnumsView.extend({
        template: _.template($('#DatesView').html()),
        addOne: function(one) {
            var oneView = new DateView({model: one});
            $(this.el).children("span").append(oneView.render().el);
        }

    });

    var TripView= Backbone.View.extend({
        tagName: "div",
        className: "Trip",
        template: _.template($('#TripView').html()),
        initialize: function(){
            this.model.on('destroy', this.remove, this);
            this.model.on('change', this.render, this);
            this.model.trigger("change");
            //this.render();

        },
        events: {        
            "click .del" : "deleteOne"
        },

        render: function(one){
            $(this.el).html(this.template());
            var parametrsView = new ParametrsView ({model: this.model.get("parametrs")});
            var stationsFromView = new StationsView({collection: this.model.get("stationsFrom")});
            var stationsToView = new StationsView({collection: this.model.get("stationsTo")});   
            var datesView = new DatesView({collection: this.model.get("dates")});
            
            $(this.el).children(".parametrsView").append(parametrsView.render().el);
            $(this.el).children(".stationsFromView").append(stationsFromView.render().el);
            $(this.el).children(".stationsToView").append(stationsToView.render().el);
            $(this.el).children(".datesView").append(datesView.render().el);
            $(this.el).children("button").button();
            return this;
        
        
        
        },
        deleteOne: function() {
            this.model.destroy();
            return false;
        },
        remove: function() {
            $(this.el).fadeOut('slow', function() {$(this).remove()});
	}  
        
        
    });
    
    var TravelView = EnumsView.extend({
        template: _.template($('#TravelView').html()),
        events: {
            "click .addTrip" : "createOne"
        },
        initialize: function() {

            this.collection.on('add', this.addOne, this);
            $(this.el).html(this.template());
            $(this.el).children("button").button();
            

        },
        createOne: function() {
            var parametrs = new Parametrs();
            var newStationsFrom = new Stations();
            var newStationsTo = new Stations();
            var newDates = new Dates();
            
            this.collection.add({parametrs: parametrs, stationsFrom:newStationsFrom,stationsTo:newStationsTo,dates:newDates});
        },
        addOne: function(one){
            var oneView = new TripView({model: one});
            $(this.el).children("div").append(oneView.render().el);
        }
        

            
        
        
        
        
        
        
    });
    
    
   
  //End block views
  //Block TasksView
      
    
    var TasksView = Backbone.View.extend({
        template: _.template($('#Progress').html()),
        initialize: function() {
            $(this.el).html(this.template());
            this.progress=$(this.el).find(".progressBar").progressbar({
			value: 0
		});

            this.model.on('change', this.render, this);
        

        },
        render: function(){
            var percent=this.model.percent();
            if (percent>this.progress.progressbar( "option", "value" )){
               this.progress.progressbar( "option", "value", percent );
            }
        }
        
    })
  //End block TasksView
  //Block SearchResult
  //Relation Logic
   var TravelResult = Backbone.Model.extend({
       defaults:{
           tableTrips:TableTrips,
           tableSimpleTrips:TableSimpleTrips,
           tableTrains:TableTrains,
           tableTypes:TableTypes,
           tableCoaches:TableCoaches,
           tablePlaces:TablePlaces
       },
       initialize: function(){
           var tableTrips =  new TableTrips();
           var tableSimpleTrips = new TableSimpleTrips();
           var tableTrains = new TableTrains();
           var tableTypes = new TableTypes();
           var tableCoaches = new TableCoaches();
           var tablePlaces = new TablePlaces();
           
           this.set({
               
               "tableTrips": tableTrips,
               "tableSimpleTrips": tableSimpleTrips,
               "tableTrains": tableTrains,
               "tableTypes": tableTypes,
               "tableCoaches": tableCoaches,
               "tablePlaces": tablePlaces
               
           });
           
           
       },
       downloadPlaces:function (){
           travel.each(function(one){
               this.addRowTrip();
               
               
                
           
           },this);
        },
       addRowTrip:function(){
           
           var l=this.get("tableTrips").length;
           var test=this.get("tableTrips");
           test.add({tid:l});
           
           
       }
       
       
   });
   var RowTrip = Backbone.Model.extend({
       defaults:{
           "tid":0
       }
   });
   
   
   var TableTrips = Backbone.Collection.extend({
       model: RowTrip,
       initialize: function(){
           this.on('add', this.buildNext, this);
           
       },
       buildNext:function(one){
           var tid=one.get("tid");
           var arr=travel.models[tid].combinated();
           _.each(arr, function(one){
               one.tidTrip=tid;
               var l=travelResult.get("tableSimpleTrips").length;
               one.tid=l;
               travelResult.get("tableSimpleTrips").add(one);
               
           },this);
       }
   });
   
   
   var RowSimpleTrip = Backbone.Model.extend({
      defaults:{
          tid: 0,
          tidTrip: 0,
          station_id_from:0,
          station_id_till:0,
          station_from: "",
          station_till: "",
          date_start: ""
      } 
   });
   
   
   var TableSimpleTrips = Backbone.Collection.extend({
       model: RowSimpleTrip
   });
   
   var RowTrain = Backbone.Model.extend({
       defaults: {
           tid:0,
           tidSimpleTrip:0,
           num:0,
           model:0,
           from_station_id:0,
           from_station: "",
           from_date: 0,
           till_station_id:0,
           till_station:"",
           till_date: 0
       }
   });
   
   var TableTrains = Backbone.Collection.extend({
       model: RowTrain
   });
   
   var RowType= Backbone.Model.extend({
       defaults:{
           tid:0,
           tidTrain:0,
           type_id:0
       }
   });
   
   var TableTypes = Backbone.Collection.extend({
       model: RowType
   });
   
   var RowCoach = Backbone.Model.extend({
       defaults:{
           tid:0,
           tidTrain:0,
           num:0,
           service: true,
           price: 0,
           reserve_price:0,
           station_id_from:0,
           station_id_till:0,
           train: "",
           date_start:"",
           coach_type_id:0,
           goodPlaces:0
               
       }
   });
   
   var TableCoaches = Backbone.Collection.extend({
       model: RowCoach
   });
   
   
   var RowPlace = Backbone.Model.extend({
       defaults:{
           tid:0,
           tidCoach:0,
           place:0,
           order:false
       }
   })
   var TablePlaces = Backbone.Collection.extend({
       model: RowPlace
   });
   
   
   
        
        
  //End Relation Logic      
    //End block SearchResult
    var travel;
    var travelResult;
    
    var facade= new Facade();
    //Init application
    //var travel= new Travel();
    //var travelView = new TravelView({ collection: travel, el :$("#app") });
    var appView=new AppView({el :$("#app")});
    //End init application
    //  var trip= new Trip();
    //  var tripView = new TripView({ model: trip, el :$("#app") });






});