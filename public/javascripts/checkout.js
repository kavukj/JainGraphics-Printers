var Stripe		= require("stripe");
Stripe.setPublishableKey('sk_test_51HRLTCIdaFBNhAviJlBLqbGY572FktXLPeyv4Xo0UxIJYvUaSYssNo7MryVPr0Ct8Khb2ZHBnFcSvbVxq6OrX8Eb00wXqPmpHp');

var $form = $('#checkout'); //Store form in a variable

$form.submit(function(event){ //This function triggers everytime we press submit
	//To not let user use submit button while validation, we disable it.
	$("#payment-error").addClass("d-none");
	$form.find('button').prop('disabled',true);
	Stripe.card.createToken({
		number:$('#cdnum').val(),
		cvc:$('#cvc').val(),
		month:$("#month").val(),
		year:$("#year").val(),
		name:$("#cdname").val()
	},stripeResponseHandler);
	return false;
});

function stripeResponseHandler(status, response){
	if(response.error){ //Means data is invalid
		//show error on form
		$("payment-error").text(response.error.message);
		$("payment-error").removeClass("d-none");
		$form.find("button").prop("disabled",false); //Re Enable submission
	}
	else{ //Token created by stripe
		//Get token Id
		var token = response.token.id;
		//Insert token to form to let it be submitted to server
		$form.append($('<input type="hidden" name="stripeToken" />').val(token));
		
		//submit the $form
		$form.get(0).submit();
	}
}