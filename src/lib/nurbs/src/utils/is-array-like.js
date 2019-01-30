
define (function ()
{
'use strict';
	
	return function isArrayLike (data)
	{
		return Array .isArray (data) || ArrayBuffer .isView (data) || data .length !== undefined;
	};
});
