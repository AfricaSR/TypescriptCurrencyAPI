//Se importan los paquetes para hacer las request y para implementar jQuery
import * as request from "request-promise-native";

import * as $ from "jquery";

//Se genera un objeto "Currency" que guardará los datos de la API para poderlos procesar
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

//Se hace la request a la API y se generan las opciones en el formulario
request('https://api.coinbase.com/v2/currencies', function (error, response, body) {

  if (!error && response.statusCode == 200) {

      var content = $.parseJSON(body);

      $('#sel1').append('<option value="BTC" selected>BitCoin</option>');

      $('#sel2').append('<option value="BTC">BitCoin</option>');

      content['data'].forEach(function (value: Currency) {

        $('#sel1').append('<option value="'+value.id+'">'+value.name+'</option>');

        if (value.id == 'EUR'){

          $('#sel2').append('<option value="'+value.id+'" selected>'+value.name+'</option>');

        }else{

          $('#sel2').append('<option value="'+value.id+'">'+value.name+'</option>');

        }

    });

    //Se leen los datos introducidos y se vuelve a hacer una request 
    $(document).ready(function(){

      $('#conversor').click(function(){

        var m1: any = $('#sel1').val();

        var m2: any = $('#sel2').val();

        var cant: any = $('#cantidad').val();

        request('https://api.coinbase.com/v2/exchange-rates?currency='+m1, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var convert = $.parseJSON(body);

            //Este objeto permite formatear las monedas
            const formater = new Intl.NumberFormat('es-ES', {

              style: 'currency',

              currency: m2,

              minimumFractionDigits: 2

            });

            //Se imprime en la página los datos calculados y formateados
            $('#resultado').text(formater.format(parseFloat(convert.data.rates[m2]) * parseFloat(cant)));
            
        }});

      });

    })

  }

});