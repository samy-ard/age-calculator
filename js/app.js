(function($) {

	function checkDate($field) {
		switch ( $field.attr('id') ) {
			case 'day' :
				if( $field.val() > 31 ) {
					$field.parent().find('.error').remove();
					$field.addClass('field-error');
					$field.parent().addClass('has-error');
					$field.parent().append('<p class="error">Must be a valid day</p>');
				} else {
					if( $field.val() < 10 && $field.val().length == 1) {
						var $dayVal = '0' + $field.val();
						$field.val($dayVal);
					}

					$field.parent().find('.error').remove();
					$field.parent().removeClass('has-error');
					$field.removeClass('field-error');	
				}
			break;
			case 'month' :
				if( $field.val() > 12 ) {
					$field.parent().find('.error').remove();
					$field.addClass('field-error');
					$field.parent().addClass('has-error');
					$field.parent().append('<p class="error">Must be a valid month</p>');
				} else {
					if( $field.val() < 10 && $field.val().length == 1) {
						var $monthVal = '0' + $field.val();
						$field.val($monthVal);
					}
					$field.parent().find('.error').remove();
					$field.parent().removeClass('has-error');
					$field.removeClass('field-error');	
				}
			break;
			case 'year' :
				if( $field.val() > (new Date()).getFullYear() ) {
					$field.parent().find('.error').remove();
					$field.addClass('field-error');
					$field.parent().addClass('has-error');
					$field.parent().append('<p class="error">Must be in the past</p>');
				} else {
					$field.parent().find('.error').remove();
					$field.parent().removeClass('has-error');
					$field.removeClass('field-error');	
				}
			break;
		}
		
		var data = $('#day').val() + '/' + $('#month').val() + '/' + $('#year').val();
		if( data.length == 10 && $('.has-error').length == 0 ) {
			calculateTimeDiff(data);
		}
	}

	function calculateTimeDiff(data) {
		if( moment(data, 'DD/MM/YYYY').isValid() === true ) {
			var now = new Date();
			var today = moment(now.getDate().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getFullYear().toString(), 'DD/MM/YYYY');
			var birthday = moment(data, 'DD/MM/YYYY');
			var years = today.diff(birthday, 'years');
			$('#rYears').text(years.toString());
			var months = today.diff(birthday.add(years, 'years'), 'months');
			$('#rMonths').text(months.toString());
			var days = today.diff(birthday.add(months, 'months'), 'days');
			$('#rDays').text(days.toString());
			
			$('.highlight').each(function() {
				$(this).prop('Counter',0).animate({
		      Counter: $(this).text()
		    }, {
		      duration: 1500,
		      easing: 'linear',
		      step: function (now) {
		         $(this).text(Math.ceil(now));
		      }
		    });
			}); 
		} else {
			$('.form-group:first-child').parent().find('.error').remove();
			$('.form-field').addClass('field-error');
			$('.form-group').addClass('has-error');
			$('.form-group:first-child').append('<p class="error">Must be a valid date</p>');
		}
	}

	$(document).ready(function() {

		$('.form-field').on('change', function(e) {
			let $field = $(this);
			checkDate($field);
		});

		$('.form-field').on('focusin', function(e) {
			let $field = $(this);
			$field.parent().find('.error').remove();
			$field.parent().removeClass('has-error');
			$field.removeClass('field-error');	
		});

		$('.form-field').on('focusout', function(e) {
			let $field = $(this);
			if( $field.val() == '' ) {
				$field.parent().find('.error').remove();
				$field.addClass('field-error');
				$field.parent().addClass('has-error');
				$field.parent().append('<p class="error">This field is required</p>');
			}
		});

		$('.divider-icon').on('click', function(e) {
			e.preventDefault();
			var data = $('#day').val() + '/' + $('#month').val() + '/' + $('#year').val();
			if( data.length == 10 && $('.error').length == 0 ) {
				calculateTimeDiff(data);
			}
		});
	});
})(jQuery);
