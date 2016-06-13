	var scene = 
	{
		bgImgURL: '/potg/res/graphics/genji.jpg',
		caption:
		{
			top: '32%',
			left: '14%',
			offsetLeft: '0',
			offsetTop: '0',
			lines:
			[
				{
					text: 'Play of the Game',
					top: '0',
					left: '0'
				},
				{
					text: 'Guyshook',
					top: '0',
					left: '30px'
				},
				{
					text: 'As Genji',
					top: '0',
					left: '65px'
				}
			],
		}
	};
	
			
	var uploadImgPrev = '/potg/res/graphics/camera.jpg';
	console.log(uploadImgPrev);

(function(angular)
{

	'use strict';
	/* Define module */
	var app = angular.module('potg', ['imageupload']);
	
	/* Image uploading controller */
	app.controller('ImgUplController', function($scope, $http)
	{
        $scope.single = function(image) {
            var formData = new FormData();
            formData.append('image', image, image.name);

            $http.post('upload', formData, {
                headers: { 'Content-Type': false },
                transformRequest: angular.identity
            }).success(function(result) {
                $scope.uploadedImgSrc = result.src;
                $scope.sizeInBytes = result.size;
            });
        };
	});
	
	/* Scene Var controller */
	app.controller('PotgController', function()
	{
		this.scene = scene;
		this.backgroundImages = backgroundImages;
		this.lineNames = lineNames;
	});
	
	/* Draggable directive */
	app.directive('draggable', function($document) 
	{
		return function(scope, element, attr) 
		{
			var startX = 0,
				startY = 0,
				x = 0,
				y = 0;
			element.on('mousedown', function(event) 
			{
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.screenX - x;
				startY = event.screenY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event) 
			{
				y = event.screenY - startY;
				x = event.screenX - startX;
				element.css(
				{
					transform: 'translate(' + x + 'px, ' + y + 'px)'
				});
			}

			function mouseup() 
			{
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		};
	});
	
	
	var lineNames = 
	[
		'uno',
		'dos',
		'tres'
	];
	
	
			
	var backgroundImages = 
	[
		'genji',
		'nm0',
		'kr0',
		'kr1',
		'vk0',
		'vk1',
		'ha0',
		'ha1',
		'dva',
		'mei',
		'tracer',
		'edgelord',
		'monkey',
		'cancer-buddies',
		'emo',
		'phara',
		'bastion',
		'mercy',
	];
	
	//Format backgroundImages
	for(var i = backgroundImages.length; i > -1; i--)
	{
		backgroundImages[i] = '/potg/res/graphics/' + backgroundImages[i] + '.jpg';
	}
	
})(window.angular);