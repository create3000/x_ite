
	for (var key in x_iteNoConfict)
	{
		if (x_iteNoConfict [key] === undefined)
			delete window [key];
		else
			window [key] = x_iteNoConfict [key];
	}

}());