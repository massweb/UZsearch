$(function () {
    //Block models
    var Station= Backbone.Model.extend({ 
        defaults: {
            "title": "Станция неизвестная",
            "station_id": 111111
        }
    });
    
    var Stations= Backbone.Collection.extend({
        model: Station,
        
        build: function(options){
            this.add({title: options });
            this.add({title: options, station_id: 4545453 });
            this.add({title: options, station_id: 4545453 });
            
            
        }
    });
    
    
        

  var stations=new Stations();
  stations.build("name");
  

  console.log(JSON.stringify(stations))

  



});