function checkPaymentOption(paymentoption)
{
  //var paymentoption=document.getElementById("mySelect");
  if(paymentoption[paymentoption.selectedIndex].value != "1")
  {
      var rbtn = document.getElementById('rdgroup');
      var lblgiving = document.getElementById('lblgiving');
      rbtn.style.display = 'none';
      lblgiving.style.display = 'none';
  }
  else
  {
    var rbtn = document.getElementById('rdgroup');
    var lblgiving = document.getElementById('lblgiving');
    rbtn.style.display = 'block';
    lblgiving.style.display = 'block';
  }
}

$(document).ready(function(){
  var rbtn = document.getElementById('rdgroup');
  var lblgiving = document.getElementById('lblgiving');
  rbtn.style.display = 'none';
  lblgiving.style.display = 'none';

    $("#firstname").focusout(function(){
      if($(this).val()==''){
          $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled',true);
             $("#error_firstname").text("* You have to enter your first name!");
        }
        else
        {
          $(this).css("border-color", "#2eb82e");
          $('#submit').attr('disabled',false);
          $("#error_firstname").text("");

        }
     });
      $("#lastname").focusout(function(){
      if($(this).val()==''){
          $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled',true);
            $("#error_lastname").text("* You have to enter your Last name!");
        }
        else
        {
          $(this).css("border-color", "#2eb82e");
          $('#submit').attr('disabled',false);
          $("#error_lastname").text("");
        }
     });
    $("#email").focusout(function(){
      state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val());
      if($(this).val()==''){
          $(this).css("border-color", "#FF0000");
          $('#submit').attr('disabled',true);
          $("#error_email").text("* You have to enter an email!");
      }
      else if (!state) {
        $(this).css("border-color", "#FF0000");
        $('#submit').attr('disabled',true);
        $("#error_email").text("* You have to enter a valid email!");
      }
      else
      {
        $(this).css("border-color", "#2eb82e");
        $('#submit').attr('disabled',false);
        $("#error_email").text("");
      }
    });
    $("#amount_display").focusout(function(){
        var valid = ($(this).val().match(/^-?\d*(\.\d+)?$/));
        if($(this).val()==''){
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled',true);
            $("#error_amount").text("* You have to enter an amount!");
        }
        else if (!valid)
        {
          $(this).css("border-color", "#FF0000");
          $('#submit').attr('disabled',true);
          $("#error_amount").text("* You have to enter a valid amount!");
        }
        else
        {
                var currencytxt = $("#currency option:selected").text();
                var amt = $('#amount_display').val();
                
                
                var converter = function(data) {
                fx.rates = data.rates;
                //fx.base = data.base;
                //fx.settings = {to: "USD"};
                //var rate = fx.convert(1, {from: "GBP", to: "HKD"})
                //alert("£1 = $" + rate.toFixed(4))
                if(currencytxt == 'AUD'){
                  // From any currency, to any currency:
                  var curr_amount = fx.convert(amt, {from: "AUD", to: "USD"});

                  $('#amount').val(curr_amount.toFixed(2));
                  $("#error_currency").text(amt + " AUD = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
                  $("#error_currency").css("color", "blue");

                }
                else if(currencytxt == 'CAD'){
                  // From any currency, to any currency:
                  var curr_amount = fx.convert(amt, {from: "CAD", to: "USD"});
                  $('#amount').val(curr_amount.toFixed(2));
                  $("#error_currency").text(amt + " CAD = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
                  $("#error_currency").css("color", "blue");
                }
                else if(currencytxt == 'EUR'){
                  // From any currency, to any currency:
                  var curr_amount = fx.convert(amt, {from: "EUR", to: "USD"});
                  $('#amount').val(curr_amount.toFixed(2));
                  $("#error_currency").text(amt + " EUR = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
                  $("#error_currency").css("color", "blue");
                }
                else if(currencytxt == 'NGN'){
                  // From any currency, to any currency:
                  //var curr_amount = fx.convert(amt, {from: "AUD", to: "USD"});
                  $('#amount').val(amt);
                  $("#error_currency").text("");
                }
                else if(currencytxt == 'Other Currencies' || currencytxt == 'USD'){
                  $('#amount').val(amt);
                  if(currencytxt == 'Other Currencies')
                  {
                  	$("#error_currency").text("Please note you will be charged in USD");
                  	$("#error_currency").css("color", "blue");
                  }
                  else
                  {
                  	$("#error_currency").text("");
                  }
                  
                }

                $(this).css("border-color", "#2eb82e");
                $('#submit').attr('disabled',false);

              }
              
                

              //$.getJSON("https://api.fixer.io/latest?base=ZAR", converter);
              $.getJSON("https://data.fixer.io/api/latest?access_key=c1e8eaf101aeedf06b27838315502462&base=ZAR",converter)

              $(this).css({"border-color":"#2eb82e"});
              $('#submit').attr('disabled',false);
              //$("#error_amount").text("");

        }
      });
      $("#phone").focusout(function(){
          $pho =$("#phone").val();
          if($(this).val()==''){
              $(this).css("border-color", "#FF0000");
                $('#submit').attr('disabled',true);
                $("#error_phone").text("* You have to enter your Phone Number!");
            }
            // else if ($pho.length!=10)
            // {
            //     $(this).css("border-color", "#FF0000");
            // 		$('#submit').attr('disabled',true);
            // 		$("#error_phone").text("* Lenght of Phone Number Should Be Ten");
            // }
            else if(!$.isNumeric($pho))
            {
                $(this).css("border-color", "#FF0000");
                $('#submit').attr('disabled',true);
                $("#error_phone").text("* Phone Number Should Be Numeric");
            }
            else{
              $(this).css({"border-color":"#2eb82e"});
              $('#submit').attr('disabled',false);
              $("#error_phone").text("");
            }

       });


      $("#currency").focusout(function(){

        var currencytxt = $("#currency option:selected").text();
        var amt = $('#amount_display').val();

        if($(this).val() == ''){
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled',true);
            $("#error_currency").text("* You have to choose a currency!");
        }else if(amt == ''){
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled',true);
            $("#error_currency").text("* You have to enter an amount!");
        }
        else
        {
            
            
          var converter = function(data) {
            fx.rates = data.rates;
            //fx.base = data.base;
            //fx.settings = {to: "USD"};
            //var rate = fx.convert(1, {from: "GBP", to: "HKD"})
            //alert("£1 = $" + rate.toFixed(4))
            if(currencytxt == 'AUD'){
              // From any currency, to any currency:
              var curr_amount = fx.convert(amt, {from: "AUD", to: "USD"});

              $('#amount').val(curr_amount.toFixed(2));
              $("#error_currency").text(amt + " AUD = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
              $("#error_currency").css("color", "blue");

            }
            else if(currencytxt == 'GBP'){
              // From any currency, to any currency:
              var curr_amount = fx.convert(amt, {from: "GBP", to: "USD"});
              $('#amount').val(curr_amount.toFixed(2));
              $("#error_currency").text(amt + " GBP = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
              $("#error_currency").css("color", "blue");
            }
            else if(currencytxt == 'CAD'){
              // From any currency, to any currency:
              var curr_amount = fx.convert(amt, {from: "CAD", to: "USD"});
              $('#amount').val(curr_amount.toFixed(2));
              $("#error_currency").text(amt + " CAD = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
              $("#error_currency").css("color", "blue");
            }
            else if(currencytxt == 'EUR'){
              // From any currency, to any currency:
              var curr_amount = fx.convert(amt, {from: "EUR", to: "USD"});
              $('#amount').val(curr_amount.toFixed(2));
              $("#error_currency").text(amt + " EUR = " + curr_amount.toFixed(2) + " USD. Please note you will be charged in USD");
              $("#error_currency").css("color", "blue");
            }
            else if(currencytxt == 'NGN'){
              // From any currency, to any currency:
              //var curr_amount = fx.convert(amt, {from: "AUD", to: "USD"});
              $('#amount').val(amt);
              $("#error_currency").text("");
            }
            else if(currencytxt == 'Other Currencies' || currencytxt == 'USD'){
              $('#amount').val(amt);
                  if(currencytxt == 'Other Currencies')
                  {
                  	$("#error_currency").text("Please note you will be charged in USD");
                  	$("#error_currency").css("color", "blue");
                  }
                  else
                  {
                  	$("#error_currency").text("");
                  }
            }

            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled',false);

          }
                

          //$.getJSON("https://api.fixer.io/latest?base=ZAR", converter);
          $.getJSON("https://data.fixer.io/api/latest?access_key=c1e8eaf101aeedf06b27838315502462&base=ZAR",converter)

        }
      });

      $("#description").focusout(function(){
      if($(this).val()==''){
          $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled',true);
            $("#error_description").text("* You have to choose a description!");
        }
        else
        {
          $(this).css("border-color", "#2eb82e");
          $('#submit').attr('disabled',false);
          $("#error_description").text("");
        }
     });

     $("#recurring").focusout(function(){
     if($(this).val()==''){
         $(this).css("border-color", "#FF0000");
           $('#submit').attr('disabled',true);
           $("#error_recurring").text("* You have to choose a payment option!");
       }
       else
       {
         $(this).css("border-color", "#2eb82e");
         $('#submit').attr('disabled',false);
         $("#error_recurring").text("");
       }
    });

    $("#submit").click(function() {
        $flag=1;

        if($("#firstname").val()==''){
            $("#firstname").css("border-color", "#FF0000");
             $("#error_firstname").text("* You have to enter your first name!");
             $flag = 0;
        }

        if($("#lastname").val()==''){
            $("#lastname").css("border-color", "#FF0000");
            $("#error_lastname").text("* You have to enter your Last name!");
            $flag = 0;
        }


        if($("#email").val()==''){
            $("#email").css("border-color", "#FF0000");
            $("#error_email").text("* You have to enter an email!");
            $flag = 0;
        }

        if($("#amount_display").val()==''){
            $("#amount").css("border-color", "#FF0000");
            $("#error_amount").text("* You have to enter an amount!");
            $flag = 0;
        }
        else
        {
          var number = $("#amount").val();
          if($("#currency").val()=='NGN')
          {
             if (!(number > 29 && number < 500001))
             {
               $("#amount").css("border-color", "#FF0000");
               $("#error_amount").text("* Please enter an amount between N30 and N500,000 !");
               $flag = 0;
             }
          }
          else //if ($("#currency").val()=='USD')
          {
            if (!(number > 0.99 && number < 10001))
            {
              $("#amount").css("border-color", "#FF0000");
              $("#error_amount").text("* Please enter an amount between $1 and $10,000 !");
              $flag = 0;
            }
          }
        }

        if($("#phone").val()==''){
            $("#phone").css("border-color", "#FF0000");
            $("#error_phone").text("* You have to enter your Phone Number!");
            $flag = 0;
        }

        if($("#currency").val()==''){
            $("#currency").css("border-color", "#FF0000");
            $("#error_currency").text("* You have to choose a currency!");
            $flag = 0;
        }

        if($("#description").val()==''){
            $("#description").css("border-color", "#FF0000");
            $("#error_description").text("* You have to choose a description!");
            $flag = 0;
        }

       if($("#recurring").val()==''){
           $("#recurring").css("border-color", "#FF0000");
           $("#error_recurring").text("* You have to choose a payment option!");
           $flag = 0;
       }
       
     

       if (!$flag){
         event.preventDefault();
       }


    });



});
