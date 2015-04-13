function showTooltip(d) 
{
	// Close tooltip
	d3.select("tooltipInfo").style("visiblity", "visible");

	// Set original location for tooltip
	var xpos = d.range + d.range/2 + 3;
	/*var ypos = d.y + d.y/2 - 5;*/

	// Change opacity
	d3.select("#tooltip")
		.style('top', ypos+"px")
		.style('left', xpos+"px")
		.transition().duration(500)
		.style('opacity', 1);

	// Make tooltip continuously move with the NEO it is detailing
	d3.timer(function()
	{
		var currentTime = (Date.now() - d.tempTime);

		xpos = d.range + d.range/2 + 100;
		/*ypos = d.y + d.y/2 + 100;*/

		d3.select("#tooltip")
			/*.style('top', ypos+"px")
			.style('left', xpos+"px");*/
			.attr("transform", function() {
          		return "rotate(" + d.phi + currentTime * d.speed/200 + ")";
        	});

		// When stopTooltip is true
		if(stopTooltip == true)
		{
			// Hide tooltip info
			d3.select("#tooltipInfo").style("visiblity", "hidden");
			// Hide tooltip
			d3.select("#tooltip")
				.transition()
				.duration(300)
					.style('opacity', 0)
					.call(endall, function()
					{
						// Move tooltip out of view
						d3.select("#tooltip")
							.style('top', 0+"px")
							.style('left', 0+"px");
					});

			return stopTooltip;
		}
	});

	// Modify the tooltip information
	d3.select("#tooltip .tooltip-neo").text(d.name);
	d3.select("#tooltip .tooltip-distance").html(d.distance+" Astronomical Units")

	function endall(transition, callback) { 
	var n = 0; 
	transition 
		.each(function() { ++n; }) 
		.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
}
}