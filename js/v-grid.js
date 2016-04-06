// jQuery
(function(){
	var gap,
			item_per_row,
			parent_node,
			target_node;

	var initGrid = function(){
		// Calculate item width according to item per row
		var item_width = (parent_node.width() / item_per_row) - gap;
		var grid_item = $(parent_node.selector + ' ' + target_node);

		var item_top = 0,
				item_left = 0,
				max_height = [];

		for(var i = 0; i < grid_item.length; i++){
			// if i = 0 (first item), top = 0, left = 0, so can skip first item.
			if(i > 0){
				// if item is first in its row, left = 0
				if( i % item_per_row == 0 ){
					item_left = 0;
				} else {
					item_left += item_width + gap;
				}

				// 2nd row and so on
				if(i - item_per_row >= 0){
					var num = i,
							item_top = 0;

					// Calculate 'top' for each item after the first row.
					while(num - item_per_row >= 0){
						item_top += grid_item.eq(num - item_per_row).outerHeight(true);
						num -= item_per_row;	
					}
				}
			}

			// get item left and right padding, left and right border width, to be deducted with item width
			var item_padding_r = parseInt(grid_item.eq(i).css('padding-right'));
			var item_padding_l = parseInt(grid_item.eq(i).css('padding-left'));

			if(grid_item.eq(i)[0].nodeName.toLowerCase() !== 'table'){
				var item_border_width_r = parseInt(grid_item.eq(i).css('border-right-width'));
				var item_border_width_l = parseInt(grid_item.eq(i).css('border-left-width'));
			}

			var final_item_width = item_width - item_padding_l - item_padding_r - item_border_width_r - item_border_width_l;

			// set item css
			grid_item.eq(i).css({
				'width' : final_item_width + 'px',
				'margin': (gap / 2) + 'px',
				'top' : item_top + 'px',
				'left': item_left + 'px'
			});

			// measure height needed for parent node according to each item in every column
			if(max_height.length < item_per_row){
				max_height.push(grid_item.eq(i).outerHeight(true));
			} else {
				max_height[i % item_per_row] += grid_item.eq(i).outerHeight(true);
			}
		}

		// apply longest height to parent node
		parent_node.height(Math.max.apply(null, max_height));

		// animation
		// grid_item.fadeIn(1000);
	}

	$.fn.vgrid = function(target, config){
		// Validate parameters
		try{
			if(this){
				parent_node = this;
			} else {
				throw 'parent_node not declared';
			}

			if(target && typeof target === 'string'){
					target_node = target;
				} else {
					throw 'target_node not declared';
				}

			if(config){
				if(config.gap !== undefined){
					if(typeof config.gap === 'number'){
						gap = config.gap;
					} else {
						throw 'gap is not type number.'
					}
				}
				
				if(config.item_per_row !== undefined){
					if(typeof config.item_per_row === 'number'){
						item_per_row = config.item_per_row;
					} else {
						throw 'item_per_row is not type number.' ;
					}
				}
			} else{
				gap = 10;
				item_per_row = 6;
			}
		} catch (err){
			console.warn(parent + ' : ' + err + ' Rollback');
			return;
		}

		// initialize grid
		initGrid();

		// log after successful initialization 
		console.log(this.selector + ' grid loaded!');
	};
})();