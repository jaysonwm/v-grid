(function(){
	var gap,
			item_per_row,
			parent_node,
			target_node;

	var initGrid = function(){

		document.getElementById(parent_node).className = 'grid_parent';

		var item_width = (document.getElementById(parent_node).clientWidth / item_per_row) - gap;
		var grid_item = document.getElementById(parent_node).getElementsByClassName(target_node);

		var item_top = 0,
				item_left = 0;

		for(var i = 0; i < grid_item.length; i++){
			if(i > 0){
				if( i % item_per_row == 0 ){
					item_left = 0;
				} else {
					item_left += item_width + gap;
				}

				if(i - item_per_row >= 0){
					var num = i,
							item_top = 0;
					while(num - item_per_row >= 0){
						item_top += grid_item[num - item_per_row].clientHeight + gap;
						num -= item_per_row;	
					}
				}
			}

			grid_item[i].style.width = item_width + 'px';
			grid_item[i].style.margin = (gap / 2) + 'px';
			grid_item[i].style.top = item_top + 'px';
			grid_item[i].style.left = item_left + 'px';
		}
	}

	vgrid = function(parent, target, config){
		try{
			if(parent){
				parent_node = parent;
			} else {
				throw 'parent_node not declared';
			}

			if(target){
				target_node = target;
			} else {
				throw 'target_node not declared';
			}

			if(config){
				if(config.gap){
					if(typeof config.gap === 'number'){
						gap = config.gap;
					} else {
						throw 'gap is not type number.'
					}
				}
				
				if(config.item_per_row){
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

		initGrid();
	}
}());