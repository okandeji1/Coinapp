//[custom Javascript]

//Project:	Crypto Admin - Responsive Admin Template
//Primary use:	Crypto Admin - Responsive Admin Template

//should be included in all pages. It controls some layout



// Fullscreen
$(function () {
	'use strict'
	// Composite line charts, the second using values supplied via javascript
    		
		$("#linechart").sparkline([1,4,3,7,6,4,8,9,6,8,12], {
			type: 'line',
			width: '100',
			height: '38',
			lineColor: '#ffffff',
			fillColor: '#ab8ce4',
			lineWidth: 2,
			minSpotColor: '#0fc491',
			maxSpotColor: '#0fc491',
		});
		
		$("#barchart").sparkline([1,4,3,7,6,4,8,9,6,8,12], {
			type: 'bar',
			height: '38',
			barWidth: 6,
			barSpacing: 4,
			barColor: '#ffffff',
		});
		$("#discretechart").sparkline([1,4,3,7,6,4,8,9,6,8,12], {
			type: 'discrete',
			width: '50',
			height: '38',
			lineColor: '#ffffff',
		});
		
		$("#linearea").sparkline([1,3,5,4,6,8,7,9,7,8,10,16,14,10], {
			type: 'line',
			width: '339',
			height: '80',
			lineColor: '#06d79c',
			fillColor: '#06d79c',
			lineWidth: 2,
		});
		
		$("#baralc").sparkline([2,4,3,7,6,4,8,9,6,8,12,6,7,9,4,8,5,7,9,13,10,9,9,8], {
			type: 'bar',
			height: '80',
			barWidth: 6,
			barSpacing: 4,
			barColor: '#e9ab2e',
		});
		
		$("#lineIncrease").sparkline([1,8,6,5,6,8,7,9,7,8,10,16,14,10], {
			type: 'line',
			width: '100%',
			height: '140',
			lineWidth: 2,
			lineColor: '#ffffff',
			fillColor: "#398bf7",
			spotColor: '#ffffff',
			minSpotColor: '#ffffff',
			maxSpotColor: '#ffffff',
			spotRadius: 3,
		});
		
		$("#lineToday").sparkline([1,4,3,7,6,4,8,9,6,8,12], {
			type: 'line',
			width: '100%',
			height: '70',
			lineColor: '#ffffff',
			fillColor: '#398bf7',
			lineWidth: 2,
			spotRadius: 3,
		});
		
		$("#baranl").sparkline([1,4,3,7,6,4,8,9,6,8,12,6,7,9,4,8,5,7,9,13,10,9,9,8], {
			type: 'bar',
			height: '70',
			barColor: '#ef5350',
			barWidth: 7,
    		barSpacing: 5,
		});
		
		$("#lineTo").sparkline([1,4,3,7,6,4,8,9,6,8,12], {
			type: 'line',
			width: '100%',
			height: '70',
			lineColor: '#ffffff',
			fillColor: '#398bf7',
			lineWidth: 3,
			spotColor: '#ffffff',
			highlightSpotColor: '#ffffff',
			highlightLineColor: '#ffffff',
			spotRadius: 3,
		});
		
		// donut chart
		$('.donut').peity('donut');
		
		// bar chart
		$(".bar").peity("bar");	
}); // End of use strict
		
// easypie chart
	$(function() {
		'use strict'
		$('.easypie').easyPieChart({
			easing: 'easeOutBounce',
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		});
		var chart = window.chart = $('.easypie').data('easyPieChart');
		$('.js_update').on('click', function() {
			chart.update(Math.random()*200-100);
		});
	});// End of use strict