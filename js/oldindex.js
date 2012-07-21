jQuery.noConflict( );
var allTrip=0;

jQuery(
    function()
    {
                
        

		
        
        
        
       jQuery( "button" ).button();
       jQuery( "#buttonAddTrip").click(function() {addTrip();});
       jQuery( "#buttonSearch").click(function() {search();});
        
    }
);
   
   
function addTrip()
{
    allTrip++;
 
    var divTrip = jQuery('<div>', 
    {
	id: 'tripId'+allTrip
    });
    var divFrom=jQuery('<div>', 
    {
        class: "From"
	
    });
    var divTo=jQuery('<div>', 
    {
        class: "To"
	
    });
    var divDate=jQuery('<div>', 
    {
	class: "Date"
    });
    
    jQuery(divFrom).append(jQuery('<button>',{click:function(e){addStation(this);}}).button({label:"Добавить станцию"}));
   
    jQuery(divFrom).append(createStation());
	
		
		
    
    
    jQuery(divTo).append(jQuery('<button>',{click:function(e){addStation(this);}}).button({label:"Добавить станцию"}));
    jQuery(divTo).append(createStation());
    //jQuery(divParams).append(jQuery('<p>Параметры</p>'));
    
    jQuery(divDate).append(jQuery('<button>',{click:function(e){addDate(this);}}).button({label:"Добавить дату"}));
    var date=jQuery('<input>').datepicker( {dateFormat: "dd.mm.yy",firstDay:1});
    jQuery(divDate).append(date);
    
    jQuery(divTrip).append(divFrom);
    jQuery(divTrip).append(divTo);
    jQuery(divTrip).append(divDate);
    jQuery('#route').append(divTrip);
    
    
   
}

function search()
{
    jQuery('#result').empty();
    
    for (var i=1; i<=allTrip;i++)
    {


        var arFrom=jQuery('#tripId'+i).children('.From').children("input");

        var arTo=jQuery('#tripId'+i).children('.To').children("input");
        var arDate=jQuery('#tripId'+i).children('.Date').children("input");
        for (var D=0;D<arDate.length;D++)
        {
            for (var F=0;F<arFrom.length;F++ )
            {
                for (var T=0;T<arTo.length;T++)
                {
                    var text='<p>'+arFrom[F].value+' '+arFrom[F].getAttribute("station_id")+'--'+arTo[T].value+' '+arTo[T].getAttribute("station_id")+' '+arDate[D].value+'</p>';

                    jQuery('#result').append(text);
                    debugger;
                }
            }
        }
            jQuery('#result').append('<hr>');
    }
        
}

function addStation(e)
{
    jQuery(e).parent().append(createStation());
}

function addDate(e)
{
        var date=jQuery('<input>').datepicker({dateFormat: "dd.mm.yy",firstDay:1} );
    jQuery(e).parent().append(date);
    
}

function createStation()
{
   var test;
   return test=jQuery('<input>').autocomplete({
			source: function( request, response ) {
				jQuery.ajax({
					url: "proxy.php?ajax_url=http://booking.uz.gov.ua/ru/purchase/station/"+request.term+"/",
					type: "post",
					
					success: function( data ) {
						response( jQuery.map( data.value, function( item ) {
                                                        
							return {
								label: item.title,
								value: item.title,
                                                                station_id: item.station_id
							}
						}));
					}
				});
			},
			minLength: 3,
			select: function( event, ui ) {
                            
				test.attr("station_id",ui.item.station_id);
			}
			
		});
    
}