
	for (var key in exciteNoConfict)
	{
		if (exciteNoConfict [key] === undefined)
			delete window [key];
		else
			window [key] = exciteNoConfict [key];
	}

}());