
	for (var key in x-iteNoConfict)
	{
		if (x-iteNoConfict [key] === undefined)
			delete window [key];
		else
			window [key] = x-iteNoConfict [key];
	}

}());