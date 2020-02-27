import * as request from "request-promise-native";
import * as $ from "jquery";
class Currency {
    id: string;
    name: string;
    min_size: number;
    constructor(id: string, name: string, min_size: number) {
        this.id = id;
        this.name = name;
        this.min_size = min_size;
    }

}


request('https://api.coinbase.com/v2/currencies', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      var content = $.parseJSON(body);
      var cs = new Array();
      content['data'].forEach(function (value: Currency) {
        $('#sel1').append('<option value="'+value.id+'">'+value.name+'</option>');
        $('#sel2').append('<option value="'+value.id+'">'+value.name+'</option>');
        cs.push(value);
    });
/*
    cs.forEach(function (){
      $('#sel1').append('<option value="'+id+'">'+this.name+'</option>');
      $('#sel2').append('<option value="'+this.id+'">'+this.name+'</option>');
    });*/

    //$('#content').text(cs[0].name); // Print the google web page.
  }
});