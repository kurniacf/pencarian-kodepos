$(document).ready(function() {
	
	$.ajaxSetup({ cache: false });

	function searchEng() {
		var searchField = $.trim($('#search').val());
		var caseExp = new RegExp(searchField, "i");
		$.getJSON('kodepos.json', function(data) {
			var output = '<div class="list-group">';
			$.each(data, function(key, val) {
				if(
					(val.urban.search(caseExp) !== -1) || 
					(val.city.search(caseExp) !== -1) || 
					(val.province_code.search(caseExp) !== -1) ||
					(val.postal_code.search(caseExp) !== -1) ||
					((val.urban + ' ' + val.city + ' ' + val.province_code).search(caseExp) !== -1)
				) {
					output += '<div class="list-group-item"><h4 class="list-group-item-heading">' + val.urban + '</h4>' + 
						'<h5 class="list-group-item-heading">' + 'PROVINSI: ' + val.province_code + '</h5>';  
					output += '<p>' + val.city + '</p>' + '<p class="small">' + val.postal_code + '</p>' + '</div>';
				}
			});
			output += '</div>';
			$('#searchUpdate').html(output);
		}); // Get JSON
	}
	
	function _noResult() {
		if($('.list-group').is(':empty')) {
			$('#searchUpdate').html('<div class="list-group"><div style="text-align:center" class="list-group-item"><h4 class="list-group-item-heading">No Result!</h4><p>Sorry, your search query returned no results. Help us make this tool better by clicking <a href="#0">here</a> to email the service desk with the term you would like to have added.</p></div></div>');
		}
	}
	
	$('#searchButton').click(function() {
		searchEng();
		setTimeout(_noResult, 1000);
	});
	
	$('#search').keypress(function (e) {
		if(e.which ===13) {
			searchEng();
			setTimeout(_noResult, 1000);
			return false;
		}
	});
	
	$('#clearButton').click(function() {
		$('#search').val('');
		$('#nameOnly').prop('checked', false);
		$('#acronymOnly').prop('checked', false);
		$('#searchUpdate').html('');
	});
	
});