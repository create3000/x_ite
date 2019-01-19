
define ([
	'nurbs/src/utils/infer-type',
	'nurbs/src/utils/variable',
],
function (inferType,
          createVariable)
{
'use strict';
	
	function wrapAccessor (callback)
	{
		return function (i, period)
		{
			if (i !== undefined && ! Array .isArray(i))
				i = [i];

			var dimAccessors = [ ];

			for (var j = 0; j < i .length; j ++)
				dimAccessors .push (createVariable .sum (i [j]));

			if (period)
			{
				for (i = 0; i < dimAccessors .length; i++)
				{
					if (period [i] === undefined)
						continue;

					dimAccessors [i] = '(' + dimAccessors [i] + ' + ' + period [i] + ') % ' + period [i];
				}
			}
			return callback (dimAccessors);
		};
	}
	
//	function elementAccessor (e)
//	{
//		return ['.x', '.y', '.z'] [e] || '[' + e + ']';
//	}

	function createAccessor (name, data)
	{
		if (!data)
			return undefined;
		
		switch (inferType(data))
		{
			case inferType.ARRAY_OF_ARRAYS:
			{
				return wrapAccessor (function (accessors)
				{
					return name + '[' + accessors .join ('][') + ']';
				});
			}
			case inferType.GENERIC_NDARRAY:
			{
				return wrapAccessor(function (accessors)
				{
					return name + '.get(' + accessors.join(',') + ')';
				});
			}
			case inferType.NDARRAY:
			{
				return wrapAccessor(function (accessors)
				{
					var code = [name + 'Offset'];

					for (var i = 0; i < accessors.length; i++)
					{
						code.push(name + 'Stride' + i + ' * (' + accessors[i] + ')');
					}

					return name + '[' + code.join(' + ') + ']';
				});
			}
			case inferType.PACKED:
			default:
				return undefined;
		}
	}
	
	return function (nurbs)
	{
		var accessors = { };
		
		var accessor = createAccessor ('x', nurbs .points);

		if (accessor)
			accessors .point = accessor;
		
		var accessor = createAccessor ('w', nurbs .weights);

		if (accessor)
			accessors .weight = accessor;
		
		var accessor = createAccessor ('k', nurbs .knots);

		if (accessor)
			accessors .knot = accessor;
		
		return accessors;
	};
});
