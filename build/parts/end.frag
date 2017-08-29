
	for (var key in xiteNoConfict)
	{
		if (xiteNoConfict [key] === undefined)
			delete window [key];
		else
			window [key] = xiteNoConfict [key];
	}

}());