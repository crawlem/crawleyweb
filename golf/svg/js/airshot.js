define(['dojo/_base/declare', 'dojox/gfx', 'dojox/gfx/Moveable', 'dojox/gfx/Mover'], function(declare, gfx, Moveable, Mover) {
	var CourseMapProperties = declare(null, {
		CONTROL_BG_COLOUR: '#FFF',
		CONTROL_LINE_COLOUR: '#000',
		CONTROL_FG_COLOUR: '#000',
		
		COURSE_BG_COLOUR: '#DBE7AD',
		
		HOLE_BG_COLOUR: [255, 255, 255, 0],
		HOLE_LINE_COLOUR: '#DBE7AD',
		HOLE_LINE_HOVER_COLOUR: '#227300'
	});
	
	var SmoothMover = declare(Mover, {
		onMouseMove: function(e){
			var limits = { xmin: 0, xmax: 640, ymin: 0, ymax: 150};
			
			// getTransform() will tell us how far the shape has been moved from its initial position
			transform = this.shape.getTransform();
			// If this.shape hasn't been transformed yet getTransform() will return null, so we need to handle the special case of the first mouse movement.
			if (transform==null) { 
				// We aren't dealing with rotations here, so we will just define initial values for the translations dx and dy.
				transform = { dx: 0, dy: 0 };
			}
			// event.layerX is the mouse position in the coordinate system of the layer that was clicked on, the shape in this case
			var layerx = e.layerX;  
			var layery = e.layerY;
			if (this.click_on_rectangle==null) { 
				// we need to find where in the shape the mouse pointer is otherwise the shape will drag untill the mouse pointer hits the limits, rather than when the shape hits the limits
				this.click_on_rectangle  = {  
					x: layerx - this.shape.shape.x - transform.dx,
					y: layery - this.shape.shape.y - transform.dy
				}  // x,y of initial mouse click in coordinate system of shape
			}
			var click_on_surface = {
				x: layerx - this.click_on_rectangle.x,
				y: layery - this.click_on_rectangle.y 
			};   // x,y of mouse click in coordinate system of drawing surface
			var x = e.clientX;
			var y = e.clientY;
			// check to see if the edges of the shape are within the limits of movement, if so, allow the shape to be moved
			//              if (click_on_surface.x > limits.xmin 
			//                & click_on_surface.y > limits.ymin 
			//                & click_on_surface.x < limits.xmax - areaofinterest.shape.width
			//                & click_on_surface.y < limits.ymax - areaofinterest.shape.height
			//                 ) { 
			// move the shape by applying a translation
			this.shape.applyLeftTransform({ 
				dx: (x - this.lastX) / 10, 
				dy: (y - this.lastY) / 10
			});
			// store the last position of the shape
			this.lastX = x;
			this.lastY = y;
			//              } 
			dojo.stopEvent(e);
		}
	});
	
	var CourseHolePath = declare(null, {
		path: null,
		fill: null,
		stroke: null,
		
		constructor: function(path, fill, stroke) {
			this.path = path;
			this.fill = fill;
			this.stroke = stroke;
		}
	});
	
	var CourseHole = declare(null, {
		id: null,
		paths: null,
		_props: null,
	
		constructor: function(holeId) {
			this.id = holeId;
			this.paths = [];
			this._props = new CourseMapProperties();
		},
		
		addPath: function(path) {
			this.paths.push(new CourseHolePath(path, this._props.HOLE_BG_COLOUR, this._props.HOLE_LINE_COLOUR));
		}
	});
	
	var CourseMap = declare(null, {
		id: null,
		name: null,
		holes: null,
		
		constructor: function(id) {
			this.id = id;
			this.holes = [];
		},
		
		addHole: function(hole) {
			this.holes.push(hole);
		}
	});
	
	var CourseMapRenderer = declare(null, {
		_surface: null,
		_width: null,
		_height: null,
		_bg: null,
		_map: null,
		_controls: null,
		_courseMap: null,
		_props: null,
		
		constructor: function(id, width, height, courseMap) {
			// Initialise the surface and groups
			_surface = gfx.createSurface(id, width, height);
			_controls = _surface.createGroup();
			_map = _surface.createGroup();
			
			// Set instance variables
			this._width = width;
			this._height = height;
			this._courseMap = courseMap;
			this._props = new CourseMapProperties();
		},
		
		zoomIn: function(e) {
			_map.applyTransform(dojox.gfx.matrix.scale({ x: 1.5, y: 1.5 }));
		},
		
		zoomOut: function(e) {
			_map.applyTransform(dojox.gfx.matrix.scale({ x: 0.666, y: 0.666 }));
		},
		
		render: function() {
			// Create the hole background
			_bg = _map.createImage({src: './img/courses/' + this._courseMap.id + '.png', width: 1500, height: 1319, x: -639, y: -475});
			
			// Create a zoom in button
			var zIn = _controls.createGroup();
			zIn.createRect({ x: 20, y: 20, width: 20, height: 20 }).setStroke(this._props.CONTROL_LINE_COLOUR).setFill(this._props.CONTROL_BG_COLOUR);
			zIn.createRect({ x: 29, y: 25, width: 2, height: 10 }).setFill(this._props.CONTROL_FG_COLOUR);
			zIn.createRect({ x: 25, y: 29, width: 10, height: 2 }).setFill(this._props.CONTROL_FG_COLOUR);
			zIn.connect('onclick', this.zoomIn);
			
			// Create a zoom out button
			var zOut = _controls.createGroup();
			zOut.createRect({ x: 20, y: 45, width: 20, height: 20 }).setStroke(this._props.CONTROL_LINE_COLOUR).setFill(this._props.CONTROL_BG_COLOUR);
			zOut.createRect({ x: 25, y: 54, width: 10, height: 2 }).setFill(this._props.CONTROL_FG_COLOUR);
			zOut.connect('onclick', this.zoomOut);
			
			_controls.moveToFront();
			
			// Render holes of courseMap
			dojo.forEach(this._courseMap.holes, function(hole, i) {
				var holeGroup = _map.createGroup();
				var holeBgPath;
				dojo.forEach(hole.paths, function(path, y) {
					holeBgPath = holeGroup.createPath(path.path).setFill(path.fill).setStroke(path.stroke);
				});
				_map.add(holeGroup);
				new dojox.gfx.Moveable(_map, {mover: SmoothMover});
				
				holeGroup.connect('onclick', function(e) {
					// Go to hole page
					alert('clicked on hole ' + hole.id);
				});
				
				holeGroup.connect('onmouseenter', function(e) {
					holeBgPath.setStroke('#000');
				});
				
				holeGroup.connect('onmouseleave', function(e) {
					holeBgPath.setStroke('#CCC');
				});
			});
			
			// Position course a bit better (hack)
			this.zoomOut();
			_map.applyLeftTransform({ 
				dx: 400, 
				dy: 300
			});
		}
	});
	
	return {
		CourseHolePath: CourseHolePath,
		CourseHole: CourseHole,
		CourseMap: CourseMap,
		CourseMapProperties: CourseMapProperties,
		CourseMapRenderer: CourseMapRenderer,
		SmoothMover: SmoothMover
	};
});
