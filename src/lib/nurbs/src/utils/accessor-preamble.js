
define ([
	'nurbs/src/utils/infer-type',
],
function (inferType)
{
'use strict';

	return function (nurbs, variableName, propertyName, data)
	{
		var code = [ ];
		
		switch (inferType (data))
		{
			case inferType .NDARRAY:
			{
				code .push ('  var ' + variableName + ' = ' + propertyName + '.data;');
				code .push ('  var ' + variableName + 'Offset = ' + propertyName + '.offset;');
			
				for (var i = 0; i < data .dimension; i++) {
					code .push ('  var ' + variableName + 'Stride' + i + ' = ' + propertyName + '.stride[' + i + '];');
				}

				break;
			}
			case inferType .ARRAY_OF_ARRAYS:
				code .push ('  var ' + variableName + ' = ' + propertyName + ';');
		}

		return code .join ('\n');
	};
});
